import { NextResponse } from "next/server";
import {
  buildChangelogPrompt,
  buildLinkedinPrompt,
  buildTwitterPrompt,
  buildEmailPrompt,
  buildInstagramCaptionPrompt,
  buildReelScriptPrompt,
} from "@/lib/prompts";
import { generateAsset, AiError } from "@/lib/mistral";
import type { ApiGenerateResponse, GeneratedAsset, RepositorySummary } from "@/types";

const SYSTEM_ROLE = "You are a founder who writes launch content. Natural, specific, opinionated. No marketing fluff. No AI clichés. Return only the requested content, no markdown fences, no explanations.";

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function parseBody(body: unknown): RepositorySummary {
  if (!body || typeof body !== "object") throw new Error("Request body must be a JSON object.");
  const b = body as Record<string, unknown>;
  const summary = b.summary;
  if (!summary || typeof summary !== "object") throw new Error("Missing 'summary' object.");
  const s = summary as Record<string, unknown>;
  if (!s.repository || typeof s.repository !== "object") throw new Error("Missing 'summary.repository'.");
  const r = s.repository as Record<string, unknown>;
  if (typeof r.owner !== "string") throw new Error("Missing 'summary.repository.owner'.");
  if (typeof r.repo !== "string") throw new Error("Missing 'summary.repository.repo'.");
  if (!Array.isArray(s.commits)) throw new Error("Missing 'summary.commits'.");
  if (!Array.isArray(s.pullRequests)) throw new Error("Missing 'summary.pullRequests'.");
  return summary as RepositorySummary;
}

interface AssetGen {
  type: GeneratedAsset["type"];
  title: string;
  buildPrompt: (s: RepositorySummary) => string;
  parse: (text: string) => { content: string };
}

const ASSETS: AssetGen[] = [
  {
    type: "changelog",
    title: "Customer Changelog",
    buildPrompt: buildChangelogPrompt,
    parse: (t) => ({ content: t }),
  },
  {
    type: "linkedin",
    title: "LinkedIn Post",
    buildPrompt: buildLinkedinPrompt,
    parse: (t) => ({ content: t }),
  },
  {
    type: "twitter",
    title: "X Thread",
    buildPrompt: buildTwitterPrompt,
    parse: (t) => ({ content: t }),
  },
  {
    type: "email",
    title: "Product Update Email",
    buildPrompt: buildEmailPrompt,
    parse: (t) => {
      const subjectMatch = t.match(/^Subject:\s*(.+)/m);
      const subject = subjectMatch ? subjectMatch[1].trim() : "New update";
      const body = t
        .replace(/^Subject:\s*.+(\r?\n|$)/, "")
        .replace(/^Preview:\s*.+(\r?\n|$)/, "")
        .trim();
      return { content: `Subject: ${subject}\n\n${body}` };
    },
  },
  {
    type: "instagram-caption",
    title: "Instagram Caption",
    buildPrompt: buildInstagramCaptionPrompt,
    parse: (t) => ({ content: t }),
  },
  {
    type: "instagram-reel-script",
    title: "Instagram Reel Script",
    buildPrompt: buildReelScriptPrompt,
    parse: (t) => ({ content: t }),
  },
];

export async function POST(request: Request) {
  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    let summary: RepositorySummary;
    try {
      summary = parseBody(rawBody);
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }

    const assetPromises = ASSETS.map(async (asset) => {
      try {
        const prompt = asset.buildPrompt(summary);
        const text = await generateAsset(SYSTEM_ROLE, prompt);
        const { content } = asset.parse(text);
        return {
          fulfilled: true as const,
          result: {
            type: asset.type,
            title: asset.title,
            content,
            characterCount: content.length,
            wordCount: wordCount(content),
          },
        };
      } catch (err) {
        const msg = err instanceof AiError ? err.message : "Generation failed";
        return {
          fulfilled: false as const,
          type: asset.type,
          title: asset.title,
          error: msg,
        };
      }
    });

    const settled = await Promise.allSettled(assetPromises);

    const results: GeneratedAsset[] = [];
    const errors: { asset: string; error: string }[] = [];

    for (const s of settled) {
      if (s.status === "fulfilled") {
        const r = s.value;
        if (r.fulfilled) {
          results.push(r.result);
        } else {
          errors.push({ asset: r.type, error: r.error });
          results.push({
            type: r.type as GeneratedAsset["type"],
            title: r.title,
            content: "Generation failed for this asset.",
            characterCount: 0,
            wordCount: 0,
          });
        }
      } else {
        const reason = s.reason;
        errors.push({ asset: "unknown", error: reason?.message ?? "Unexpected failure" });
      }
    }

    return NextResponse.json<ApiGenerateResponse>({ assets: results });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

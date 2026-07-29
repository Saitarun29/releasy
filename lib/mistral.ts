import { getEnv } from "@/lib/env";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatChoice {
  message: { content: string };
}

export class AiError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly rawResponse?: string
  ) {
    super(message);
    this.name = "AiError";
  }
}

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";
const TIMEOUT_MS = 60_000;
const MAX_RETRIES = 2;

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function callModel(messages: ChatMessage[], config: { apiKey: string; model: string }): Promise<string> {
  const { apiKey, model } = config;

  const response = await fetchWithTimeout(MISTRAL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (response.status === 401) throw new AiError("Invalid API key. Check your MISTRAL_API_KEY.", "UNAUTHORIZED");
  if (response.status === 403) throw new AiError("Access forbidden. Check your API key permissions.", "FORBIDDEN");
  if (response.status === 429) throw new AiError("Rate limited. Wait and try again.", "RATE_LIMITED");
  if (response.status === 500) throw new AiError("Mistral API server error. Try again later.", "SERVER_ERROR");

  if (!response.ok) {
    throw new AiError(`Generation failed (HTTP ${response.status}).`, "API_ERROR");
  }

  const data = await response.json() as Record<string, unknown>;
  const choices = data.choices as ChatChoice[] | undefined;
  const content = choices?.[0]?.message?.content;

  if (!content) throw new AiError("Empty response.", "EMPTY_RESPONSE");

  return content;
}

export async function generateAsset(systemRole: string, prompt: string): Promise<string> {
  const env = getEnv();
  if (!env.ok) throw new AiError(env.error, "MISSING_KEY");
  const { config } = env;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callModel([
        { role: "system", content: systemRole },
        { role: "user", content: prompt },
      ], config);

      const cleaned = raw.trim();
      const fenceMatch = cleaned.match(/```(?:markdown|text)?\s*([\s\S]*?)```/);
      return fenceMatch ? fenceMatch[1].trim() : cleaned;
    } catch (error) {
      if (error instanceof AiError && (error.code === "RATE_LIMITED" || error.code === "SERVER_ERROR")) {
        if (attempt < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, (attempt + 1) * 1000));
          continue;
        }
      }
      throw error;
    }
  }

  throw new AiError("Generation failed after retries.", "MAX_RETRIES");
}

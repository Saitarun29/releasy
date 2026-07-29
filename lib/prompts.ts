import type { RepositorySummary } from "@/types";

function contextBlock(summary: RepositorySummary): string {
  const { repository } = summary;
  const lines: string[] = [];
  lines.push(`Repository: ${repository.owner}/${repository.repo}`);
  lines.push(`Description: ${repository.description || "N/A"}`);
  lines.push(`Language: ${repository.language || "N/A"}`);
  lines.push(`Stars: ${repository.stars}`);
  if (summary.release) {
    lines.push(`Release: ${summary.release.tagName} — ${summary.release.name}`);
  }
  return lines.join("\n");
}

function commitsBlock(summary: RepositorySummary): string {
  const lines: string[] = [];
  lines.push(`Commits (${summary.commits.length} total):`);
  for (const commit of summary.commits.slice(0, 25)) {
    const cat = commit.category;
    const prefix =
      cat === "features" ? "✨" :
      cat === "bugfixes" ? "🐛" :
      cat === "performance" ? "⚡" :
      cat === "refactoring" ? "♻️" :
      cat === "documentation" ? "📝" :
      cat === "dependencies" ? "📦" : "🛠";
    lines.push(`  ${prefix} ${commit.message.split("\n")[0]}`);
  }
  if (summary.commits.length > 25) {
    lines.push(`  … and ${summary.commits.length - 25} more`);
  }
  return lines.join("\n");
}

function buildBase(summary: RepositorySummary): string {
  return `${contextBlock(summary)}

${commitsBlock(summary)}

${summary.release ? `Release notes: ${summary.release.body.slice(0, 800)}` : "No release notes available."}`;
}

export function buildChangelogPrompt(summary: RepositorySummary): string {
  return `Write a customer changelog for this release.

${buildBase(summary)}

Rules:
- Open with the most valuable change for users.
- Group under: ## 🚀 New, ## 🔧 Improved, ## 🐛 Fixed
- One bullet per change. Name it. Say what it does. One sentence.
- Add "Why it matters:" under the top 1-2 items.
- Under 300 words. Markdown format.
- Never use: "we're excited", "thrilled", "seamless", "robust", "enhance".
- Sound like a founder who ships every week.

Return ONLY the changelog content. No markdown fences. No explanations.`;
}

export function buildLinkedinPrompt(summary: RepositorySummary): string {
  return `Write a LinkedIn post announcing this release.

${buildBase(summary)}

Rules:
- First sentence: a strong, specific statement. Stop the scroll.
- Share a personal observation from building or talking to users.
- Describe the problem that existed. Be specific.
- Explain how this release fixes it. Name actual features from the commits.
- Close with a question only another builder would have an opinion on.
- 3 industry hashtags on the final line.
- Under 250 words.
- Sound like an indie hacker, not a brand.
- Never use: "game-changer", "thrilled", "paradigm shift", "thought leadership", "we're excited".

Return ONLY the post text. No markdown fences. No explanations.`;
}

export function buildTwitterPrompt(summary: RepositorySummary): string {
  return `Write an X thread announcing this release.

${buildBase(summary)}

Rules:
- Tweet 1: a strong take or surprising result. Never "we just shipped".
- Tweets 2-4: one distinct point each. Under 260 chars. Use the release as evidence.
- Final tweet: a direct ask. Try it. Build something. Reply.
- No hashtags. Max one emoji per tweet.
- Sound opinionated. Like a founder whose posts are worth reading.

Format: one tweet per line, with a blank line between tweets.
Return ONLY the thread text. No markdown fences. No explanations.`;
}

export function buildEmailPrompt(summary: RepositorySummary): string {
  return `Write a product update email for this release.

${buildBase(summary)}

Rules:
- Subject line: a concrete benefit. Under 50 chars.
- Preview text: one specific outcome. Under 90 chars.
- Body: greeting → single headline → 2-3 brief sections (what changed + why it matters) → one CTA.
- Under 250 words total.
- Respect the reader's inbox. No fluff. No "I hope this finds you well".
- One CTA only. Not three.

Format:
Subject: <subject line>
Preview: <preview text>

<body content>

Return ONLY the formatted text above. No markdown fences. No explanations.`;
}

export function buildInstagramCaptionPrompt(summary: RepositorySummary): string {
  return `Write an Instagram caption for this release.

${buildBase(summary)}

Rules:
- Open with a story beat. A moment. A specific frustration you noticed while building.
- Short paragraphs. 1-3 sentences each. Separated by blank lines.
- 3-6 emojis total, placed naturally where a person would gesture.
- The release is the middle of the story, not the headline.
- Explain what changed and why it matters to users.
- End with one clear CTA.
- 5-7 hashtags on the final line only (one branded, one community, one niche, one general, one format).
- 150-200 words.
- Conversational founder voice. Like telling a friend what you built.
- Never use: "game-changer", "the wait is over", "unlock your potential", hashtags in the body.

Return ONLY the caption text with hashtags. No markdown fences. No explanations.`;
}

export function buildReelScriptPrompt(summary: RepositorySummary): string {
  return `Write an Instagram Reel shooting script for this release.

${buildBase(summary)}

Rules:
- 30-45 seconds total. Fast-paced.
- Structure each shot with: camera direction, voiceover line, screen/visual direction.
- Use these 5 shots:

SHOT 1 — HOOK (0-3s)
Camera: founder, direct eye contact, tight frame.
Voiceover: one blunt sentence. A problem or a take so specific it stops the scroll.

SHOT 2 — PROBLEM (3-10s)
Camera: founder talking or screen recording.
Voiceover: what was broken, what was frustrating.
Visual: show the old experience or the pain point.

SHOT 3 — SOLUTION (10-25s)
Camera: screen recording of the fix working cleanly.
Voiceover: "So we built X." What it does + why it's different. One sentence each.

SHOT 4 — WHAT CHANGED (25-35s)
Camera: founder back on camera, quick cuts.
Voiceover: 2-3 rapid-fire benefits. "Takes 10 seconds. No config. Ships today."

SHOT 5 — CTA (35-45s)
Camera: founder, relaxed, one beat of eye contact.
Voiceover: one clear next step.
On-screen text: action text, 2-3 words.

- No shot longer than 12 seconds.
- Under 100 words spoken total.
- Sound like an indie founder showing what they built.
- Never use: "imagine", "what if", "game changer", "revolutionary", AI voice.

Return ONLY the script. No markdown fences. No explanations.`;
}

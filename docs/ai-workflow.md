# AI Workflow

## Overview

Releasy uses Mistral AI to transform structured repository data into marketing content. The system prompt and per-asset prompt templates are carefully engineered to produce content that reads like a founder wrote it — not like AI.

## Prompt Architecture

### System Prompt

Every generation call begins with a system prompt that establishes the voice:

```
You are a founder who writes launch content. Natural, specific, opinionated.
No marketing fluff. No AI clichés. Return only the requested content,
no markdown fences, no explanations.
```

This prompt:
- Personifies the AI as a **founder** (not a copywriter or marketer)
- Requires **specificity** (avoids generic praise)
- Enforces **opinionated writing** (avoids neutral corporate tone)
- Bans **marketing fluff** (explicitly: seamless, robust, enhanced, thrilled, game-changer)
- Eliminates **formatting overhead** (no markdown fences, no explanations)

### Per-Asset Prompt Structure

Each asset prompt follows a consistent template:

1. **Role reminder** — Reinforces the founder voice
2. **Context block** — Repository name, description, language, stars, release info
3. **Commit data** — Up to 25 categorized commits with emoji prefixes
4. **Release notes** — Raw release body (truncated to 800 chars)
5. **Format rules** — Length, structure, banned words, output format

### Context Injection

The `buildBase()` function in `lib/prompts.ts` assembles a structured context block:

```
Repository: vercel/next.js
Description: The React Framework
Language: TypeScript
Stars: 130000
Release: v15.0.0 — Next.js 15

Commits (30 total):
  ✨ Add server component support
  🐛 Fix hydration error in edge runtime
  ⚡ Optimize bundle size for app router
  ♻️ Refactor middleware pipeline
  … and 5 more
```

This gives the AI enough context to write specific, accurate content without hallucinating.

## Generation Pipeline

```
┌──────────────┐
│ Fetch Data    │  GitHub API: repo info, commits, releases, PRs
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Build Context │  categorizeCommits() → groupCommits() → buildBase()
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Build Prompts │  6 parallel prompt constructors
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Call Mistral  │  Promise.allSettled with retry logic
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Parse Output  │  Strip markdown fences, extract subject lines
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Return Assets │  Structured {type, title, content, charCount}
└──────────────┘
```

## Prompt Engineering Decisions

### Why Not One Prompt for All Assets?

Each platform has different norms:
- **LinkedIn** favors professional storytelling with a hook
- **X (Twitter)** requires ultra-concise takes under 260 chars
- **Email** needs subject line, preview text, and scannable body
- **Instagram** uses short paragraphs with natural emoji placement
- **Reel scripts** require camera directions and timing

A single prompt would produce generic content that works everywhere but excels nowhere.

### Banned Words List

Each prompt includes a platform-specific banned words list:

| Asset | Banned Words |
|-------|-------------|
| Changelog | we're excited, thrilled, seamless, robust, enhance |
| LinkedIn | game-changer, thrilled, paradigm shift, thought leadership, we're excited |
| X Thread | No hashtags. Max 1 emoji per tweet. |
| Email | I hope this finds you well, more than one CTA |
| Instagram | game-changer, the wait is over, unlock your potential, hashtags in body |
| Reel Script | imagine, what if, game changer, revolutionary, AI voice |

### Output Parsing

After generation, each asset undergoes light post-processing:

```typescript
// Strip markdown code fences if the AI wraps output anyway
const fenceMatch = cleaned.match(/```(?:markdown|text)?\s*([\s\S]*?)```/);
return fenceMatch ? fenceMatch[1].trim() : cleaned;

// Email: extract Subject: line from the body
const subjectMatch = text.match(/^Subject:\s*(.+)/m);
const subject = subjectMatch ? subjectMatch[1].trim() : "New update";
const body = text.replace(/^Subject:\s*.+(\r?\n|$)/, "")
                 .replace(/^Preview:\s*.+(\r?\n|$)/, "")
                 .trim();
```

## Retry Strategy

Mistral API calls use exponential backoff:

- **Max retries**: 2
- **Retryable errors**: Rate limited (429), Server error (500)
- **Non-retryable errors**: Invalid key (401), Forbidden (403)
- **Backoff**: (attempt + 1) × 1000ms
- **Timeout**: 60 seconds per request

## Quality Considerations

- **Token limit**: 1024 `max_tokens` per asset — keeps responses focused
- **Temperature**: 0.7 — balances creativity with coherence
- **Commit truncation**: Only 25 most recent commits are included in prompts
- **Release truncation**: Release notes are capped at 800 characters

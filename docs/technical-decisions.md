# Technical Decisions

## Why Next.js 16 (App Router)

**Decision**: Use Next.js 16 with the App Router and React Server Components.

**Rationale**: The App Router provides:
- Route-level code splitting by default (each page is its own bundle)
- React Server Components for zero-JS static pages (About, Blog, Features, etc.)
- API routes co-located with pages in the same project
- Static generation for most routes with dynamic rendering only where needed (the AI generation endpoint)

**Trade-off**: The App Router has a steeper learning curve than Pages Router, but the performance benefits and alignment with React's future direction make it the right choice for a modern project.

## Why Mistral AI Over OpenAI

**Decision**: Use Mistral AI as the generation provider.

**Rationale**:
- **Cost**: Mistral's API is significantly cheaper than OpenAI GPT-4 for comparable quality
- **Speed**: Mistral's `mistral-small-latest` model responds in 2-5 seconds for the prompt lengths used
- **Quality**: For structured marketing content (changelogs, social posts), Mistral's output quality matches or exceeds GPT-3.5
- **Privacy**: Mistral does not train on API inputs by default

**Trade-off**: Mistral's ecosystem is smaller. No function calling, no vision, fewer third-party integrations. For this use case (text generation only), none of those matter.

## Why No Authentication

**Decision**: No user accounts or authentication.

**Rationale**: This is a portfolio project, not a SaaS. Authentication adds:
- Database requirements (PostgreSQL, MongoDB, or similar)
- Session management complexity
- OAuth integration
- Password hashing and security concerns
- Ongoing maintenance burden

Without authentication, the app works immediately — just add an API key and go. This dramatically simplifies deployment and evaluation.

## Why localStorage for Persistence

**Decision**: Store recent repos, favorites, and history in `localStorage`.

**Rationale**:
- **Zero infrastructure** — no database, no API, no server-side state
- **Privacy** — user data stays in the browser
- **Simplicity** — serializable JSON, synchronous reads, no latency
- **Portfolio focus** — demonstrates frontend state management without backend complexity

**Trade-off**: Data is device-specific. Clearing browser data loses history. Acceptable for a demo/portfolio app.

## Why Client-Side GitHub API Calls

**Decision**: Fetch GitHub data from the browser, not the server.

**Rationale**:
- GitHub's REST API is public for public repos — no token required
- Avoids proxying all traffic through a server (cost savings)
- Simpler architecture (no need for a GitHub token in env vars)
- Client-side caching via browser network cache

**Trade-off**: Rate limits are per-IP (60 requests/hour unauthenticated). The app includes clear rate limit messaging and examples that work with small repos to minimize requests.

## Why Promise.allSettled for AI Generation

**Decision**: Use `Promise.allSettled` instead of `Promise.all` for parallel Mistral calls.

**Rationale**: Six independent AI calls run in parallel. With `Promise.all`, a single failure (rate limit, timeout, server error) would fail all 6 assets. With `Promise.allSettled`, failed assets return a placeholder message while successful ones are preserved. This provides a better user experience — partial results are better than no results.

## Why Custom Error Classes

**Decision**: Define `GitHubError` and `AiError` classes instead of using plain `Error`.

**Rationale**:
- **Type discrimination** — `instanceof` checks allow different error handling per source
- **Rich context** — Each error carries `code` (machine-readable) and `status` (HTTP status) in addition to the message
- **Clean catch blocks** — No need to parse error messages with regex

```typescript
if (err instanceof GitHubError) {
  // Specific GitHub error handling
} else if (err instanceof TypeError) {
  // Network error
} else {
  // Generic fallback
}
```

## Why Categorize Commits Locally

**Decision**: Classify commits into categories (features, bugs, performance, etc.) on the client side with regex patterns instead of using AI.

**Rationale**:
- **Deterministic** — Regex patterns produce consistent, predictable results
- **Zero cost** — No API calls needed for categorization
- **Instant** — Millisecond-level processing for 30+ commits
- **Transparent** — Users can see exactly why a commit was categorized a certain way

**Trade-off**: Regex patterns miss unconventional commit messages. The system falls back to "other" for unrecognized formats, and the AI generation step can still understand the commit content even without a perfect category match.

## Why Framer Motion for Animations

**Decision**: Use Framer Motion for all client-side animations.

**Rationale**: Framer Motion provides:
- Declarative animation API (`motion.div`, `AnimatePresence`)
- Layout animations for smooth reordering
- Spring physics for natural-feeling motion
- `whileInView` for scroll-triggered entrance animations
- Ripple effects on buttons via `motion.span`

CSS animations are used for shimmer/loading effects where continuous animation loops are needed.

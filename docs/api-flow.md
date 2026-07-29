# API Flow

## Endpoints

### `POST /api/generate`

The only API endpoint. Generates 6 marketing assets from a repository summary.

#### Request

```json
{
  "summary": {
    "repository": {
      "owner": "vercel",
      "repo": "next.js",
      "url": "https://github.com/vercel/next.js",
      "description": "The React Framework",
      "stars": 130000,
      "language": "TypeScript"
    },
    "release": {
      "tagName": "v15.0.0",
      "name": "Next.js 15",
      "body": "...",
      "url": "...",
      "publishedAt": "2025-07-01T00:00:00Z"
    },
    "commits": [
      {
        "sha": "abc123",
        "message": "feat: add server actions",
        "author": "John",
        "date": "2025-07-01T00:00:00Z",
        "category": "features"
      }
    ],
    "pullRequests": [],
    "groupedCommits": {}
  }
}
```

#### Response (200)

```json
{
  "assets": [
    {
      "type": "changelog",
      "title": "Customer Changelog",
      "content": "...",
      "characterCount": 1240,
      "wordCount": 210
    }
  ]
}
```

#### Response (400 — Validation Error)

```json
{
  "error": "Missing 'summary.repository.owner'."
}
```

#### Response (500 — Server Error)

```json
{
  "error": "Something went wrong."
}
```

## Sequence Diagram

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌───────────┐
│  User   │     │  Client  │     │  Next.js │     │  Mistral  │
│         │     │          │     │  Server  │     │  AI API   │
└────┬────┘     └────┬─────┘     └────┬─────┘     └─────┬─────┘
     │               │                │                  │
     │  Paste repo   │                │                  │
     │──────────────►│                │                  │
     │               │                │                  │
     │               │  Fetch repo    │                  │
     │               │  data from     │                  │
     │               │  GitHub API    │                  │
     │               │  (client-side) │                  │
     │               │───────┬───────►│                  │
     │               │       │        │                  │
     │               │       │        │                  │
     │               │  Return        │                  │
     │               │  Repository    │                  │
     │               │  Summary       │                  │
     │               │◄──────┴───────│                  │
     │               │                │                  │
     │               │  POST /api/generate               │
     │               │────────────────►                  │
     │               │                │                  │
     │               │                │  6 parallel      │
     │               │                │  Mistral API     │
     │               │                │  calls           │
     │               │                │─────────────────►│
     │               │                │                  │
     │               │                │◄─────────────────│
     │               │                │  (all settled)   │
     │               │                │                  │
     │               │  Return        │                  │
     │               │  Assets Array  │                  │
     │               │◄───────────────│                  │
     │               │                │                  │
     │               │  Render tabs   │                  │
     │               │  with content  │                  │
     │               │───────┬───────►│                  │
     │               │       │        │                  │
     │               │       │        │                  │
     │   See         │       │        │                  │
     │   results     │       │        │                  │
     │◄──────────────│       │        │                  │
     │               │                │                  │
```

### Client-Side Flow

1. **Parse Input** — `parseRepoInput()` validates URL or `owner/repo` format
2. **Fetch Data** — `fetchRepositorySummary()` calls GitHub API for repo info, releases, commits, PRs
3. **Call API** — `POST /api/generate` with the structured summary
4. **Display Results** — Tabbed asset viewer with copy/download/ZIP

### Error States

| Scenario | User Message |
|----------|-------------|
| Invalid repo format | "Use github.com/owner/repo or owner/repo format" |
| Repo not found (404) | "We couldn't find that repository" |
| Rate limited (403) | "GitHub API rate limit reached" |
| Network error | "Network error. Check your connection." |
| AI generation failure | Per-asset: "Generation failed for this asset." |

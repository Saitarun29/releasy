# Architecture

## High-Level Overview

Releasy is a Next.js 16 application that follows the App Router convention. It acts as a bridge between the GitHub REST API and the Mistral AI API, transforming raw repository data into polished marketing content.

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                         │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Landing  │  │ Dashboard │  │  Static  │  │  Toaster  │ │
│  │  Page    │  │   (App)   │  │  Pages   │  │           │ │
│  └────┬─────┘  └─────┬─────┘  └────┬─────┘  └───────────┘ │
│       │              │             │                        │
└───────┼──────────────┼─────────────┼────────────────────────┘
        │              │             │
        │       ┌──────┴──────┐      │
        │       │  Next.js    │      │
        └──────►│  App Router │◄─────┘
                │   (RSC)     │
                └──────┬──────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │  GitHub  │ │  Mistral │ │  Static  │
   │  REST    │ │  AI API  │ │  Assets  │
   │  API     │ │          │ │          │
   └──────────┘ └──────────┘ └──────────┘
```

## Key Architectural Decisions

### 1. Server Components by Default
All static pages (About, Blog, Contact, Features, Pricing, Privacy, Terms) are React Server Components. They render to static HTML at build time, requiring zero JavaScript for the initial view.

### 2. Client Components Only Where Needed
Interactive components use the `"use client"` directive only when necessary:
- Dashboard page (form state, API calls, localStorage)
- UI primitives (tabs, toasts, buttons with ripple effects)
- Animated sections (Framer Motion entrance animations)

### 3. API Route as AI Proxy
The `/api/generate` route runs on the server, keeping the Mistral API key secure. It:
- Validates the request body shape
- Calls Mistral AI in parallel for all 6 asset types
- Uses `Promise.allSettled` so one failure doesn't block others
- Returns structured responses with character/word counts

### 4. GitHub API Without Authentication
Public repository data is fetched without authentication. The client respects rate limits and provides clear error messages for 403 (rate limit / forbidden) and 404 (not found) responses.

### 5. Browser-Local Storage
User preferences (recent repos, favorites, history) are stored entirely in `localStorage`. No user data ever reaches the server.

## Data Flow

```
User Input (repo URL)
       │
       ▼
┌──────────────────┐
│  parseRepoInput   │  Validates URL or owner/repo format
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  fetchRepository  │  Parallel: repo info + releases + commits + PRs
│  Summary          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  /api/generate    │  Server-side: 6 parallel Mistral AI calls
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  6 Generated      │  Rendered in AssetTabs with copy/download
│  Assets           │
└──────────────────┘
```

## Error Handling Strategy

| Layer | Approach |
|-------|----------|
| GitHub API | Custom `GitHubError` class with status codes. Rate limit detection via `X-RateLimit-Remaining` header. |
| Mistral AI | Custom `AiError` class. Retry logic (2 attempts) for rate limits and server errors. Timeout at 60s. |
| API Route | `Promise.allSettled` per asset. Individual asset failures return placeholder content instead of failing the entire request. |
| Client | Error boundary per state: `ErrorState` component with retry button. `TypeError` catch for network failures. |

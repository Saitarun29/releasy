# System Design

## Overview

Releasy is a zero-backend, serverless-compatible web application. It runs entirely on Vercel's edge network with no persistent server infrastructure.

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │              Next.js 16 Runtime                   │    │
│  │                                                   │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌───────────┐│    │
│  │  │ Static      │  │ Server      │  │ API       ││    │
│  │  │ Pages (CDN) │  │ Components  │  │ Route     ││    │
│  │  │             │  │ (Edge)      │  │ (Lambda)  ││    │
│  │  │ • /         │  │             │  │           ││    │
│  │  │ • /about    │  │ • /app      │  │ /api/     ││    │
│  │  │ • /features │  │             │  │ generate  ││    │
│  │  │ • /pricing  │  │             │  │           ││    │
│  │  │ • /blog     │  │             │  │           ││    │
│  │  │ • /contact  │  │             │  │           ││    │
│  │  │ • /privacy  │  │             │  │           ││    │
│  │  │ • /terms    │  │             │  │           ││    │
│  │  └─────────────┘  └─────────────┘  └───────────┘│    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
         │                     │                  │
         │                     │                  │
         ▼                     ▼                  ▼
   ┌──────────┐         ┌──────────┐       ┌──────────┐
   │ Browser  │         │ GitHub   │       │ Mistral  │
   │ Cache    │         │ REST API │       │ AI API   │
   └──────────┘         └──────────┘       └──────────┘
```

## Component Architecture

### Page Hierarchy

```
app/
├── layout.tsx           # Root layout: fonts, metadata, global CSS
├── page.tsx             # Landing page (Server Component + client children)
├── app/page.tsx         # Dashboard (Client Component)
├── api/generate/route.ts # API endpoint (Server)
├── about/page.tsx       # Static page (Server Component)
├── blog/page.tsx        # Static page (Server Component)
├── contact/page.tsx     # Static page (Server Component)
├── features/page.tsx    # Static page (Server Component)
├── pricing/page.tsx     # Static page (Server Component)
├── privacy/page.tsx     # Static page (Server Component)
└── terms/page.tsx       # Static page (Server Component)
```

### Component Dependency Tree

```
layout.tsx (RSC)
├── page.tsx (Landing — RSC with client sub-trees)
│   ├── Navbar (client) — scroll nav, mobile menu, "Get Started" CTA
│   ├── LandingHero (client) — headline, gradient text, CTA buttons
│   ├── TrustedTechnologies (client) — tech grid
│   ├── FeaturesSection (client) — 12 feature cards
│   ├── InteractiveDemo (client) — animated demo with typing effect
│   ├── HowItWorksSection (client) — 3-step workflow
│   ├── AILaunchKit (client) — 11 asset type cards
│   ├── FAQ (client) — accordion FAQ
│   ├── CTASection (RSC) — final CTA
│   └── Footer (client) — multi-column footer
│
├── app/page.tsx (Dashboard — client)
│   ├── Navbar (client)
│   ├── Celebration (client) — confetti particles
│   ├── RepositoryForm (client) — input with validation
│   ├── LoadingState (client) — progress bar + skeleton cards
│   ├── EmptyState (client) — onboarding prompt
│   ├── ErrorState (client) — error with retry
│   ├── RepositorySummary (client) — repo info card
│   ├── ReleaseTimeline (client) — categorized commit display
│   ├── AssetTabs (client) — categorized tab navigation
│   │   └── OutputCard (client) — content viewer + copy/download
│   ├── DashboardSidebar (client) — recent/favorites/history
│   └── Toaster (client) — toast notifications
│
└── Static pages (about, blog, contact, features, pricing, privacy, terms)
    ├── Navbar (client)
    └── Footer (client)
```

## Data Flow Architecture

### Request Lifecycle

```
1. User enters "github.com/vercel/next.js"
2. parseRepoInput() validates format
3. fetchRepositorySummary() runs:
   ├── getRepository()         → GET /repos/vercel/next.js
   ├── getLatestRelease()      → GET /repos/vercel/next.js/releases/latest
   ├── getRecentCommits(30)    → GET /repos/vercel/next.js/commits?per_page=30
   └── getPullRequests(20)     → GET /repos/vercel/next.js/pulls?state=closed&per_page=20
4. Results combined into RepositorySummary object
5. POST /api/generate with RepositorySummary
6. Server validates body shape via parseBody()
7. 6 parallel Mistral AI calls (Promise.allSettled)
8. Responses parsed: content cleaned, subject lines extracted
9. Assets returned to client with character/word counts
10. Client renders tabs, enables copy/download/ZIP
```

### State Machine (Dashboard)

```
           ┌─────────┐
           │  idle   │
           └────┬────┘
                │ submit form
                ▼
           ┌─────────┐
    ┌──────│ loading │──────┐
    │      └─────────┘      │
    │                       │
    ▼                       ▼
┌─────────┐           ┌─────────┐
│ success │           │  error  │
└────┬────┘           └────┬────┘
     │                     │
     │  "Generate another" │ "Try Again"
     └──────┐   ┌─────────┘
            ▼   ▼
           ┌─────────┐
           │  idle   │
           └─────────┘
```

## Performance Considerations

- **Static generation**: 12 of 13 routes are statically generated at build time
- **Parallel API calls**: GitHub data (4 calls) and Mistral generation (6 calls) use `Promise.all`/`Promise.allSettled`
- **Font optimization**: Geist and Geist Mono loaded via `next/font` — self-hosted, subsetted, no layout shift
- **Bundle splitting**: Each route only loads JavaScript for its client components
- **Image optimization**: No heavy images. Favicons only. Screenshots are small PNGs.

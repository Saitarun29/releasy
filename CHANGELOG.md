# Changelog

## 1.0.0 (2025-07-29)

### 🚀 Features

- **GitHub Repository Analysis** — Fetch repository metadata, releases, commits, and pull requests via the GitHub REST API
- **Commit Categorization** — Automatically group commits into Features, Bug Fixes, Performance, Refactoring, Documentation, Dependencies, and Other using regex-based pattern matching
- **AI Content Generation** — Generate 6 marketing assets simultaneously from a single repository analysis via Mistral AI (changelog, LinkedIn post, X thread, product update email, Instagram caption, Instagram reel script)
- **Parallel Generation** — All 6 assets are generated concurrently with `Promise.allSettled` so partial failures don't block successful results
- **Smart Prompt Engineering** — Per-asset prompts with platform-specific tone, structure, banned words, and output parsing
- **Export Options** — Copy to clipboard, download individual Markdown files, or download all assets as a ZIP archive

### 🎨 UI/UX

- **Glassmorphism Design** — Dark theme with glass cards, gradient accents, and subtle animations
- **Animated Loading States** — Skeleton cards, progress bar, and step indicators during generation
- **Interactive Demo** — Auto-playing landing page demo showing the full workflow
- **Celebration Effect** — Particle burst animation on successful generation
- **Responsive Layout** — Full support for mobile, tablet, and desktop viewports
- **Dark Mode** — System-preference-aware dark theme as default

### 🔧 Infrastructure

- **Next.js 16** with App Router, React Server Components, and Turbopack
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with custom theme tokens and glass utilities
- **Framer Motion** for declarative animations and page transitions
- **Mistral AI** for content generation with retry logic and timeout handling
- **GitHub REST API** for public repository data fetching
- **Vercel-ready** — Zero-config deployment, no database required, no filesystem writes

### 📦 Dependencies

- **@radix-ui/react-tabs** — Accessible tab primitives
- **@radix-ui/react-toast** — Toast notification primitives
- **@radix-ui/react-slot** — Polymorphic component support
- **class-variance-authority** — Component variant management
- **framer-motion** — Animation library
- **jszip** — Client-side ZIP file creation
- **lucide-react** — Icon library
- **tailwind-merge** — Tailwind class conflict resolution

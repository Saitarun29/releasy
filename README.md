<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Releasy-6366f1?style=for-the-badge&logo=github&logoColor=white">
    <img alt="Releasy" src="https://img.shields.io/badge/Releasy-6366f1?style=for-the-badge&logo=github&logoColor=white">
  </picture>
</p>

<h1 align="center">Releasy 🚀</h1>

<p align="center">
  <strong>Turn every code release into an AI-powered launch campaign.</strong>
</p>

<p align="center">
  Paste a GitHub repository → Get 6 launch-ready assets that sound like you, not like AI.
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4"></a>
  <a href="https://mistral.ai"><img src="https://img.shields.io/badge/Mistral%20AI-FF6F00?style=flat-square&logo=mistral&logoColor=white" alt="Mistral AI"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License"></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Deployed on Vercel"></a>
</p>

---

## ✨ Features

- **GitHub Deep Integration** — Fetches releases, commits, and pull requests via the GitHub REST API
- **AI-Powered Content** — Generates 6 assets simultaneously using Mistral AI
- **Smart Categorization** — Automatically groups commits into Features, Bug Fixes, Performance, and more
- **One-Click Generation** — All assets generated from a single repository analysis
- **Multiple Export Formats** — Copy to clipboard, download individual Markdown, or export all as ZIP
- **Production UI** — Beautiful glassmorphism design, responsive, dark mode

### Generated Assets

| Asset | Description |
|-------|------------|
| 📋 **Customer Changelog** | Benefit-driven markdown for users |
| 💼 **LinkedIn Post** | Professional launch stories |
| 🐦 **X Thread** | Multi-tweet engagement threads |
| 📧 **Launch Email** | Subject + preview + body |
| 📸 **Instagram Caption** | Founder-style with hashtags |
| 🎬 **Reel Script** | 30-60s spoken scripts |

---

## 📸 Screenshots

> Screenshots coming soon. Once deployed, add images here to showcase the UI.

---

## 🎬 Demo

> Demo GIF coming soon. Show the full flow: paste repo → analyze → generate → copy.

---

## 🏗️ Architecture

```
┌─────────────┐    ┌───────────────┐    ┌───────────────┐
│  User Input  │───▶│  GitHub API   │───▶│  AI Analysis  │
│  (repo URL)  │    │  (commits,    │    │  (Mistral AI) │
│              │    │   releases,   │    │               │
│              │    │   PRs)        │    │               │
└─────────────┘    └───────────────┘    └───────┬───────┘
                                                │
                                                ▼
                                       ┌───────────────┐
                                       │  6 Generated   │
                                       │    Assets      │
                                       │                │
                                       │ • Changelog    │
                                       │ • LinkedIn     │
                                       │ • X Thread     │
                                       │ • Email        │
                                       │ • IG Caption   │
                                       │ • Reel Script  │
                                       └───────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Animation** | [Framer Motion](https://www.framer.com/motion) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **AI Provider** | [Mistral AI](https://mistral.ai) |
| **Data Source** | [GitHub REST API](https://docs.github.com/en/rest) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 📦 Installation

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/releasy.git
cd releasy

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

---

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MISTRAL_API_KEY` | ✅ Yes | — | Your Mistral AI API key |
| `MISTRAL_MODEL` | ❌ No | `mistral-small-latest` | Mistral model to use |

Get your free API key at [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys/).

---

## 🚀 Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## ▲ Deployment on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push the repository to GitHub
2. Import into [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `MISTRAL_API_KEY` — your Mistral AI key
   - `MISTRAL_MODEL` — (optional) model override
4. Deploy — no database, no filesystem writes required

---

## 🔧 How It Works

1. **Connect** — Paste any public GitHub URL (e.g., `github.com/vercel/next.js`) or `owner/repo` format
2. **Analyze** — Releasy fetches commit history, release tags, and pull requests via the GitHub API
3. **Generate** — Mistral AI processes the repository summary and creates 6 launch-ready assets
4. **Export** — Copy individual assets, download as Markdown, or export everything as a ZIP archive

---

## 📁 Folder Structure

```
releasy/
├── app/
│   ├── api/generate/route.ts   # AI generation endpoint
│   ├── app/page.tsx            # Main dashboard (client)
│   ├── layout.tsx              # Root layout + SEO metadata
│   ├── globals.css             # Tailwind v4 theme + utilities
│   ├── page.tsx                # Landing page
│   ├── about/                  # About page
│   ├── blog/                   # Blog page
│   ├── contact/                # Contact page
│   ├── features/               # Features page
│   ├── pricing/                # Pricing page
│   ├── privacy/                # Privacy policy
│   └── terms/                  # Terms of service
├── components/
│   ├── ui/                     # Primitives (button, card, input, etc.)
│   ├── AssetTabs.tsx           # Tabbed asset viewer
│   ├── Celebration.tsx         # Particle celebration effect
│   ├── DashboardSidebar.tsx    # Recent repos, favorites, history
│   ├── EmptyState.tsx          # Onboarding state
│   ├── ErrorState.tsx          # Error with retry
│   ├── Footer.tsx              # Site footer
│   ├── LoadingState.tsx        # Animated loading progress
│   ├── Navbar.tsx              # Navigation
│   ├── OutputCard.tsx          # Asset with copy/download
│   ├── ReleaseTimeline.tsx     # Commit/PR/release display
│   ├── RepositoryForm.tsx      # Input form with validation
│   ├── RepositorySummary.tsx   # Repo info card
│   └── Toaster.tsx             # Toast notifications
├── constants/index.ts          # Labels, loading statuses
├── hooks/use-toast.ts          # Toast hook
├── lib/
│   ├── commits.ts              # Commit categorization
│   ├── env.ts                  # Environment variable loader
│   ├── github.ts               # GitHub API client
│   ├── mistral.ts              # Mistral AI client
│   ├── prompts.ts              # AI prompt templates
│   ├── storage.ts              # localStorage helpers
│   ├── utils.ts                # cn() utility
│   └── zip.ts                  # ZIP download utility
├── types/index.ts              # TypeScript interfaces
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint config
├── LICENSE                     # MIT license
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

---

## 🗺️ Future Roadmap

- [ ] Private repository support
- [ ] Custom writing tones and templates
- [ ] Team workspaces and sharing
- [ ] API access for programmatic generation
- [ ] Webhook-based auto-generation on release
- [ ] Multi-language content support
- [ ] Direct publishing to GitHub, LinkedIn, X
- [ ] Custom brand voice training

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development setup guide
- Code style and conventions
- Pull request process
- Commit message guidelines

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Credits

Built with:

- [Next.js](https://nextjs.org) — React framework
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion) — Animation library
- [Mistral AI](https://mistral.ai) — AI generation
- [Lucide](https://lucide.dev) — Open source icons
- [JSZip](https://stuk.github.io/jszip) — ZIP file creation
- Inspired by [shadcn/ui](https://ui.shadcn.com) component design

---

<p align="center">
  Made with ❤️ for developers who ship.
  <br>
  <a href="https://github.com/your-username/releasy">GitHub</a> ·
  <a href="https://releasy.sh">Website</a>
</p>

import type { AssetType } from "@/types";

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Connect GitHub Repository",
    description: "Paste your repository URL or owner/repo name and optionally specify a release tag.",
  },
  {
    step: 2,
    title: "Analyze Repository",
    description: "We fetch repository metadata, commits, and pull requests.",
  },
  {
    step: 3,
    title: "AI Understands Changes",
    description: "Our AI processes the diff and identifies key highlights.",
  },
  {
    step: 4,
    title: "Generate Marketing Assets",
    description: "Get polished changelogs, social posts, and emails instantly.",
  },
] as const;

export const LOADING_STATUSES = [
  "Connecting GitHub...",
  "Reading Release...",
  "Understanding Changes...",
  "Writing Changelog...",
  "Writing LinkedIn Post...",
  "Writing X Thread...",
  "Writing Email...",
  "Finalizing...",
];

export const ASSET_LABELS: Record<AssetType, string> = {
  changelog: "Customer Changelog",
  linkedin: "LinkedIn Post",
  twitter: "X Thread",
  email: "Product Update Email",
  "instagram-caption": "Instagram Caption",
  "instagram-reel-script": "Instagram Reel Script",
  "instagram": "Instagram Caption",
  "reel": "Instagram Reel Script",
  "release-notes": "Release Notes",
  "github-release": "GitHub Release Description",
  "threads": "Threads Post",
  "product-hunt": "Product Hunt Description",
  "newsletter": "Newsletter",
};

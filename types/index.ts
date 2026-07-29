export type AssetType = "changelog" | "linkedin" | "twitter" | "email" | "instagram-caption" | "instagram-reel-script" | "instagram" | "reel" | "release-notes" | "github-release" | "threads" | "product-hunt" | "newsletter";

export type GenerationStatus = "idle" | "loading" | "success" | "error";

export type CommitCategory =
  | "features"
  | "bugfixes"
  | "performance"
  | "refactoring"
  | "documentation"
  | "dependencies"
  | "other";

export interface RepositoryInfo {
  owner: string;
  repo: string;
  url: string;
  description: string;
  stars: number;
  language: string | null;
}

export interface ReleaseInfo {
  tagName: string;
  name: string;
  body: string;
  url: string;
  publishedAt: string;
}

export interface CommitInfo {
  sha: string;
  message: string;
  author: string;
  date: string;
  category: CommitCategory;
}

export interface PullRequestInfo {
  number: number;
  title: string;
  body: string | null;
  url: string;
}

export interface RepositorySummary {
  repository: RepositoryInfo;
  release: ReleaseInfo | null;
  commits: CommitInfo[];
  pullRequests: PullRequestInfo[];
  groupedCommits: Record<CommitCategory, CommitInfo[]>;
}

export interface GeneratedAsset {
  type: AssetType;
  title: string;
  content: string;
  characterCount: number;
  wordCount: number;
}

export interface ApiGenerateResponse {
  assets: GeneratedAsset[];
}



import { categorizeCommit, groupCommits } from "@/lib/commits";
import type {
  RepositoryInfo,
  ReleaseInfo,
  CommitInfo,
  PullRequestInfo,
  RepositorySummary,
} from "@/types";

const GITHUB_API_BASE = "https://api.github.com";

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  owner: { login: string };
}

interface RawRelease {
  tag_name: string;
  name: string;
  body: string | null;
  html_url: string;
  published_at: string;
}

interface RawCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    } | null;
  };
}

interface RawPullRequest {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
}

export class GitHubError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

async function githubFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "releasy",
    },
  });

  if (response.status === 404) {
    throw new GitHubError(
      "We couldn't find that repository. Please check the name and try again.",
      "NOT_FOUND",
      404
    );
  }

  if (response.status === 403) {
    const rateLimit = response.headers.get("X-RateLimit-Remaining");
    if (rateLimit === "0") {
      throw new GitHubError(
        "GitHub API rate limit reached. Please wait a moment and try again.",
        "RATE_LIMITED",
        403
      );
    }
    throw new GitHubError(
      "Access denied. The repository may be private or restricted.",
      "FORBIDDEN",
      403
    );
  }

  if (response.status === 451) {
    throw new GitHubError(
      "This repository is not available due to legal reasons.",
      "UNAVAILABLE",
      451
    );
  }

  if (!response.ok) {
    throw new GitHubError(
      "Something went wrong while fetching data from GitHub. Please try again.",
      "API_ERROR",
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export function parseRepoInput(input: string): { owner: string; repo: string } {
  const trimmed = input.trim();

  const urlMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/([^/#]+)\/([^/#]+?)(?:\.git|\/|$)/
  );
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2].replace(".git", "") };
  }

  const shorthandMatch = trimmed.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (shorthandMatch) {
    return { owner: shorthandMatch[1], repo: shorthandMatch[2] };
  }

  throw new GitHubError(
    "Please enter a valid GitHub URL (e.g., github.com/owner/repo) or owner/repo format.",
    "INVALID_INPUT"
  );
}

export async function getRepository(input: string): Promise<RepositoryInfo> {
  const { owner, repo } = parseRepoInput(input);
  const data = await githubFetch<RawRepo>(`/repos/${owner}/${repo}`);

  return {
    owner: data.owner.login,
    repo: data.name,
    url: data.html_url,
    description: data.description || "",
    stars: data.stargazers_count,
    language: data.language,
  };
}

export async function getLatestRelease(
  owner: string,
  repo: string
): Promise<ReleaseInfo | null> {
  try {
    const data = await githubFetch<RawRelease>(
      `/repos/${owner}/${repo}/releases/latest`
    );
    return {
      tagName: data.tag_name,
      name: data.name || data.tag_name,
      body: data.body || "",
      url: data.html_url,
      publishedAt: data.published_at,
    };
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getReleaseByTag(
  owner: string,
  repo: string,
  tag: string
): Promise<ReleaseInfo | null> {
  try {
    const data = await githubFetch<RawRelease>(
      `/repos/${owner}/${repo}/releases/tags/${encodeURIComponent(tag)}`
    );
    return {
      tagName: data.tag_name,
      name: data.name || data.tag_name,
      body: data.body || "",
      url: data.html_url,
      publishedAt: data.published_at,
    };
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getRecentCommits(
  owner: string,
  repo: string,
  limit = 30
): Promise<CommitInfo[]> {
  const data = await githubFetch<RawCommit[]>(
    `/repos/${owner}/${repo}/commits?per_page=${Math.min(limit, 100)}`
  );

  return data.map((c) => ({
    sha: c.sha,
    message: c.commit.message,
    author: c.commit.author?.name || "Unknown",
    date: c.commit.author?.date || new Date().toISOString(),
    category: categorizeCommit(c.commit.message),
  }));
}

export async function getPullRequests(
  owner: string,
  repo: string,
  limit = 20
): Promise<PullRequestInfo[]> {
  const data = await githubFetch<RawPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=closed&per_page=${Math.min(limit, 100)}&sort=updated&direction=desc`
  );

  return data
    .filter((pr) => pr.html_url.includes("/pull/"))
    .map((pr) => ({
      number: pr.number,
      title: pr.title,
      body: pr.body,
      url: pr.html_url,
    }));
}

export async function fetchRepositorySummary(
  input: string,
  tag?: string
): Promise<RepositorySummary> {
  const { owner, repo } = parseRepoInput(input);

  const repository = await getRepository(input);

  const release = tag
    ? await getReleaseByTag(owner, repo, tag)
    : await getLatestRelease(owner, repo);

  const [commits, pullRequests] = await Promise.all([
    getRecentCommits(owner, repo),
    getPullRequests(owner, repo),
  ]);

  const groupedCommits = groupCommits(commits);

  return {
    repository,
    release,
    commits,
    pullRequests,
    groupedCommits,
  };
}

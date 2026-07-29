export interface RecentRepo {
  fullName: string;
  owner: string;
  repo: string;
  tag?: string;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  fullName: string;
  owner: string;
  repo: string;
  tag?: string;
  timestamp: number;
  assetCount: number;
}

const RECENT_KEY = "releasy-recent";
const FAVORITES_KEY = "releasy-favorites";
const HISTORY_KEY = "releasy-history";
const MAX_RECENT = 8;
const MAX_HISTORY = 20;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* localStorage full or unavailable */
  }
}

export function getRecentRepos(): RecentRepo[] {
  return read<RecentRepo[]>(RECENT_KEY, []);
}

export function addRecentRepo(repo: { owner: string; repo: string; tag?: string }) {
  const list = getRecentRepos().filter(
    (r) => r.fullName !== `${repo.owner}/${repo.repo}`
  );
  list.unshift({
    fullName: `${repo.owner}/${repo.repo}`,
    owner: repo.owner,
    repo: repo.repo,
    tag: repo.tag,
    timestamp: Date.now(),
  });
  write(RECENT_KEY, list.slice(0, MAX_RECENT));
}

export function clearRecentRepos() {
  write(RECENT_KEY, []);
}

export function getFavorites(): string[] {
  return read<string[]>(FAVORITES_KEY, []);
}

export function toggleFavorite(fullName: string): boolean {
  const list = getFavorites();
  const idx = list.indexOf(fullName);
  if (idx >= 0) {
    list.splice(idx, 1);
    write(FAVORITES_KEY, list);
    return false;
  }
  list.push(fullName);
  write(FAVORITES_KEY, list);
  return true;
}

export function isFavorite(fullName: string): boolean {
  return getFavorites().includes(fullName);
}

export function getHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>(HISTORY_KEY, []);
}

export function addToHistory(entry: Omit<HistoryEntry, "id" | "timestamp">) {
  const list = getHistory();
  list.unshift({
    ...entry,
    id: `${entry.fullName}-${Date.now()}`,
    timestamp: Date.now(),
  });
  write(HISTORY_KEY, list.slice(0, MAX_HISTORY));
}

export function clearHistory() {
  write(HISTORY_KEY, []);
}

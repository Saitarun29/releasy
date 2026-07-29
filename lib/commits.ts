import type { CommitInfo, CommitCategory } from "@/types";

const CATEGORY_RULES: Array<[RegExp, CommitCategory]> = [
  [/^feat(?:ure)?[\(:\/\s]/i, "features"],
  [/^(?:add|new|implement|introduce|create|support)/i, "features"],
  [/^fix(?:es)?[\(:\/\s]/i, "bugfixes"],
  [/^bug(?:fix)?[\(:\/\s]/i, "bugfixes"],
  [/^hotfix[\(:\/\s]/i, "bugfixes"],
  [/^patch[\(:\/\s]/i, "bugfixes"],
  [/^(?:correct|resolve|repair|address)/i, "bugfixes"],
  [/^perf(?:ormance)?[\(:\/\s]/i, "performance"],
  [/^optimize[\(:\/\s]/i, "performance"],
  [/^(?:speed|fast|faster|latency)/i, "performance"],
  [/^refactor[\(:\/\s]/i, "refactoring"],
  [/^(?:restructure|cleanup|rework|redesign)/i, "refactoring"],
  [/^docs[\(:\/\s]/i, "documentation"],
  [/^doc[\(:\/\s]/i, "documentation"],
  [/^(?:readme|documentation)/i, "documentation"],
  [/^deps[\(:\/\s]/i, "dependencies"],
  [/^chore[\(:\/\s]?.*(?:dep|bump|upgrade|downgrade|version)/i, "dependencies"],
  [/^build[\(:\/\s]?.*(?:dep|bump|upgrade)/i, "dependencies"],
  [/^ci[\(:\/\s]?.*(?:dep|bump|upgrade)/i, "dependencies"],
];

export function categorizeCommit(message: string): CommitCategory {
  const firstLine = message.split("\n")[0];
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(firstLine)) {
      return category;
    }
  }
  return "other";
}

export function groupCommits(
  commits: CommitInfo[]
): Record<CommitCategory, CommitInfo[]> {
  const groups: Record<CommitCategory, CommitInfo[]> = {
    features: [],
    bugfixes: [],
    performance: [],
    refactoring: [],
    documentation: [],
    dependencies: [],
    other: [],
  };

  for (const commit of commits) {
    groups[commit.category].push(commit);
  }

  return groups;
}

export const CATEGORY_LABELS: Record<CommitCategory, string> = {
  features: "Features",
  bugfixes: "Bug Fixes",
  performance: "Performance",
  refactoring: "Refactoring",
  documentation: "Documentation",
  dependencies: "Dependencies",
  other: "Other",
};

export const CATEGORY_EMOJIS: Record<CommitCategory, string> = {
  features: "🚀",
  bugfixes: "🐛",
  performance: "⚡",
  refactoring: "🔄",
  documentation: "📝",
  dependencies: "📦",
  other: "🔧",
};

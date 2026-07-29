"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  GitCommitHorizontal,
  GitPullRequest,
  Sparkles,
  Bug,
  Zap,
  RefreshCw,
  BookOpen,
  Package,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "@/lib/commits";
import type { RepositorySummary, CommitCategory } from "@/types";

interface ReleaseTimelineProps {
  summary: RepositorySummary;
}

const CATEGORY_META: Record<CommitCategory, { icon: typeof Sparkles; gradient: string; border: string; badge: string }> = {
  features: {
    icon: Sparkles,
    gradient: "from-emerald-500/10 to-emerald-500/5",
    border: "border-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  bugfixes: {
    icon: Bug,
    gradient: "from-red-500/10 to-red-500/5",
    border: "border-red-500/20",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  performance: {
    icon: Zap,
    gradient: "from-amber-500/10 to-amber-500/5",
    border: "border-amber-500/20",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  refactoring: {
    icon: RefreshCw,
    gradient: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/20",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  documentation: {
    icon: BookOpen,
    gradient: "from-purple-500/10 to-purple-500/5",
    border: "border-purple-500/20",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  dependencies: {
    icon: Package,
    gradient: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/20",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  other: {
    icon: Wrench,
    gradient: "from-zinc-500/10 to-zinc-500/5",
    border: "border-zinc-500/20",
    badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  },
};

export function ReleaseTimeline({ summary }: ReleaseTimelineProps) {
  const { release, commits, pullRequests, groupedCommits } = summary;

  const nonEmptyCategories = (
    Object.entries(groupedCommits) as [CommitCategory, typeof commits][]
  ).filter(([, group]) => group.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="space-y-5"
    >
      <div className="rounded-2xl border border-border/50 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Rocket className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Release Overview</h3>
              <p className="text-xs text-muted-foreground">
                {release ? release.tagName : "No release tag detected"} · {commits.length} commits · {pullRequests.length} PRs
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
              <Rocket className="h-3 w-3 text-primary" />
              {release ? release.tagName : "No release"}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
              <GitCommitHorizontal className="h-3 w-3 text-primary" />
              {commits.length} commits
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
              <GitPullRequest className="h-3 w-3 text-primary" />
              {pullRequests.length} PRs
            </div>
          </div>

          {nonEmptyCategories.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Detected Changes</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {nonEmptyCategories.map(([category, group], idx) => {
                  const meta = CATEGORY_META[category];
                  const Icon = meta.icon;
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className={`rounded-xl border ${meta.border} relative overflow-hidden hover:scale-[1.01] transition-transform duration-200`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} pointer-events-none`} />
                      <div className="relative p-4">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-foreground" />
                            <span className="text-sm font-semibold">{CATEGORY_LABELS[category]}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-2 py-0.5 ${meta.badge}`}
                          >
                            {group.length}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {group.slice(0, 3).map((commit) => (
                            <div
                              key={commit.sha}
                              className="flex items-start gap-2 text-xs text-muted-foreground"
                            >
                              <span className="font-mono text-[9px] text-muted mt-0.5 shrink-0 opacity-60">
                                {commit.sha.slice(0, 7)}
                              </span>
                              <span className="line-clamp-1 leading-snug">
                                {commit.message.split("\n")[0]}
                              </span>
                            </div>
                          ))}
                          {group.length > 3 && (
                            <p className="text-[10px] text-muted-foreground/60 pt-0.5">
                              +{group.length - 3} more {category === "features" ? "features" : category === "bugfixes" ? "fixes" : "changes"}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {release && (
            <div className="mt-5 pt-4 border-t border-border/50">
              <h4 className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2 flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" />
                Release Notes
              </h4>
              <pre className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans max-h-36 overflow-y-auto rounded-xl bg-black/20 p-3 border border-border/30">
                {release.body || "No release notes provided."}
              </pre>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, GitBranch, Calendar, Tag, Heart, GitCommitHorizontal, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isFavorite, toggleFavorite } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";
import type { RepositorySummary as RepoSummary } from "@/types";

interface RepositorySummaryProps {
  summary: RepoSummary;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function pluralize(n: number, word: string): string {
  return `${n.toLocaleString()} ${word}${n !== 1 ? "s" : ""}`;
}

export function RepositorySummary({ summary }: RepositorySummaryProps) {
  const { repository, release, commits, pullRequests } = summary;
  const fullName = `${repository.owner}/${repository.repo}`;
  const [faved, setFaved] = useState(() => isFavorite(fullName));

  function handleToggleFavorite() {
    const now = toggleFavorite(fullName);
    setFaved(now);
    toast({
      title: now ? "Added to favorites" : "Removed from favorites",
      variant: "success",
    });
  }

  const stats = [
    { icon: Star, label: "Stars", value: formatStars(repository.stars), color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
    { icon: GitCommitHorizontal, label: "Commits", value: pluralize(commits.length, "commit"), color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { icon: GitFork, label: "PRs", value: pluralize(pullRequests.length, "PR"), color: "text-accent", bg: "bg-accent/10", border: "border-accent/20" },
    { icon: Code2, label: "Language", value: repository.language || "N/A", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="rounded-2xl border border-border/50 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border">
                <GitBranch className="h-7 w-7 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold truncate">
                    {repository.owner}/<span className="text-primary">{repository.repo}</span>
                  </h2>
                  {faved && (
                    <Heart className="h-4 w-4 text-red-500 fill-red-500 shrink-0" />
                  )}
                </div>
                {repository.description && (
                  <p className="text-sm text-muted mt-1 leading-relaxed line-clamp-2 max-w-xl">
                    {repository.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleToggleFavorite}
                className={`h-9 w-9 flex items-center justify-center rounded-lg border transition-all duration-200 hover:scale-105 ${
                  faved
                    ? "bg-red-500/10 border-red-500/20 text-red-500"
                    : "bg-white/[0.04] border-border/50 text-muted-foreground hover:bg-white/[0.08] hover:border-border"
                }`}
                title={faved ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-4 w-4 transition-all ${faved ? "fill-red-500" : ""}`} />
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 gap-1.5 h-9 bg-white/[0.04] border border-border/50 hover:bg-white/[0.08]"
                onClick={() => window.open(repository.url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Open</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`rounded-xl ${stat.bg} border ${stat.border} p-3 hover:scale-[1.02] transition-transform duration-200`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-3.5 w-3.5 ${stat.color}`} />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold">{stat.value}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-border/50">
            {release && (
              <>
                <Badge variant="accent" className="gap-1.5 text-[11px] px-2.5 py-1">
                  <Tag className="h-3 w-3" />
                  {release.tagName}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  {formatDate(release.publishedAt)}
                </span>
              </>
            )}
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto flex items-center gap-1"
            >
              <GitBranch className="h-3 w-3" />
              View on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

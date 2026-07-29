"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, History, Clock, ArrowRight, Trash2, Heart, Sparkles } from "lucide-react";
import { getRecentRepos, getFavorites, getHistory, clearRecentRepos, clearHistory, type RecentRepo, type HistoryEntry } from "@/lib/storage";

interface DashboardSidebarProps {
  onExampleClick: (input: string) => void;
}

export function DashboardSidebar({ onExampleClick }: DashboardSidebarProps) {
  const [recentRepos, setRecentRepos] = useState<RecentRepo[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const id = setTimeout(() => {
      setRecentRepos(getRecentRepos());
      setFavorites(getFavorites());
      setHistory(getHistory());
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const favoriteRepos = recentRepos.filter((r) => favorites.includes(r.fullName));

  function handleClearRecent() {
    clearRecentRepos();
    setRecentRepos([]);
    setFavorites(getFavorites());
  }

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemAnim = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {favoriteRepos.length > 0 && (
        <div className="glass rounded-2xl p-5 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            </div>
            <span className="text-sm font-semibold">Favorites</span>
          </div>
          <div className="space-y-1.5">
            {favoriteRepos.map((repo) => (
              <motion.button
                key={repo.fullName}
                variants={itemAnim}
                onClick={() => onExampleClick(repo.fullName)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-left text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 group"
              >
                <Heart className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                <span className="truncate flex-1 font-mono text-xs">{repo.fullName}</span>
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {recentRepos.length > 0 && (
        <div className="glass rounded-2xl p-5 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Clock className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm font-semibold">Recent</span>
            </div>
            <button
              onClick={handleClearRecent}
              className="text-[10px] text-muted-foreground/50 hover:text-error transition-colors"
              title="Clear recent"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-1.5">
            {recentRepos.map((repo) => (
              <motion.button
                key={`${repo.fullName}-${repo.timestamp}`}
                variants={itemAnim}
                onClick={() => onExampleClick(repo.fullName)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-left text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 group"
              >
                <div className="h-6 w-6 rounded-md bg-white/[0.04] border border-border/50 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {repo.owner[0]}{repo.repo[0]}
                  </span>
                </div>
                <span className="truncate flex-1 font-mono text-xs">{repo.fullName}</span>
                {repo.tag && (
                  <span className="text-[10px] text-muted-foreground/50 font-mono">{repo.tag}</span>
                )}
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="glass rounded-2xl p-5 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <History className="h-3.5 w-3.5 text-accent" />
              </div>
              <span className="text-sm font-semibold">History</span>
            </div>
            <button
              onClick={handleClearHistory}
              className="text-[10px] text-muted-foreground/50 hover:text-error transition-colors"
              title="Clear history"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-1.5">
            {history.slice(0, 10).map((entry) => (
              <motion.button
                key={entry.id}
                variants={itemAnim}
                onClick={() => onExampleClick(`${entry.owner}/${entry.repo}`)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-left text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all duration-200 group"
              >
                <div className="h-6 w-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Sparkles className="h-3 w-3 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="truncate block font-mono text-xs">{entry.fullName}</span>
                  <span className="text-[10px] text-muted-foreground/50 block">
                    {new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    {entry.assetCount > 0 && ` · ${entry.assetCount} assets`}
                  </span>
                </div>
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {recentRepos.length === 0 && history.length === 0 && (
        <div className="glass rounded-2xl p-6 text-center border-border/50">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
            <History className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">No recent activity</p>
          <p className="text-xs text-muted-foreground/50 mt-1">
            Your recent repos and history will appear here.
          </p>
        </div>
      )}
    </motion.div>
  );
}

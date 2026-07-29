"use client";

import { motion } from "framer-motion";
import { LOADING_STATUSES } from "@/constants";

interface LoadingStateProps {
  statusIndex: number;
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/50 bg-card overflow-hidden ${className}`}>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/[0.06] animate-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-white/[0.06] animate-shimmer" />
            <div className="h-3 w-1/3 rounded bg-white/[0.04] animate-shimmer" />
          </div>
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full rounded bg-white/[0.04] animate-shimmer" />
          <div className="h-3 w-5/6 rounded bg-white/[0.04] animate-shimmer" />
          <div className="h-3 w-4/6 rounded bg-white/[0.03] animate-shimmer" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-16 rounded-full bg-white/[0.04] animate-shimmer" />
          <div className="h-6 w-14 rounded-full bg-white/[0.04] animate-shimmer" />
          <div className="h-6 w-20 rounded-full bg-white/[0.03] animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

function SkeletonCodeBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/50 bg-card overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 px-5 py-3 border-b border-border/40">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        <div className="h-3 w-24 rounded bg-white/[0.04] animate-shimmer ml-3" />
      </div>
      <div className="p-5 space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.04] animate-shimmer" />
        <div className="h-3 w-11/12 rounded bg-white/[0.04] animate-shimmer" />
        <div className="h-3 w-4/5 rounded bg-white/[0.04] animate-shimmer" />
        <div className="h-3 w-3/4 rounded bg-white/[0.03] animate-shimmer" />
        <div className="h-3 w-5/6 rounded bg-white/[0.03] animate-shimmer" />
      </div>
    </div>
  );
}

export function LoadingState({ statusIndex }: LoadingStateProps) {
  const progressPercent = Math.min(Math.round((statusIndex + 1) / LOADING_STATUSES.length * 100), 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mx-auto w-full max-w-3xl space-y-6"
    >
      <div className="rounded-2xl border border-primary/20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="relative p-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>
              <span className="text-sm font-medium">Generating your assets</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono tabular-nums">{progressPercent}%</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {LOADING_STATUSES.map((status, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium transition-all duration-300 ${
                  i < statusIndex
                    ? "bg-success/10 text-success border border-success/20"
                    : i === statusIndex
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-white/[0.03] text-muted-foreground/40 border border-transparent"
                }`}
              >
                {i < statusIndex ? (
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : i === statusIndex ? (
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-current" />
                )}
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SkeletonCard />
        <div className="grid grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCodeBlock />
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, GitBranch, Check, Loader2, FileText, MessageSquareText, Hash, Mail, Camera, Video, ScrollText, Tag, MessageCircle, Rocket, Newspaper, Terminal } from "lucide-react";

const ASSETS = [
  { icon: FileText, name: "Customer Changelog" },
  { icon: MessageSquareText, name: "LinkedIn Post" },
  { icon: Hash, name: "X Thread" },
  { icon: Mail, name: "Email" },
  { icon: Camera, name: "Instagram Caption" },
  { icon: Video, name: "Reel Script" },
  { icon: ScrollText, name: "Release Notes" },
  { icon: Tag, name: "GitHub Release" },
  { icon: MessageCircle, name: "Threads Post" },
  { icon: Rocket, name: "Product Hunt" },
  { icon: Newspaper, name: "Newsletter" },
];

type Stage = "typing" | "analyzing" | "generating" | "complete";

const TYPING_REPO = "vercel/next.js";

export function InteractiveDemo({ loop = true }: { loop?: boolean }) {
  const [stage, setStage] = useState<Stage>("typing");
  const [typedChars, setTypedChars] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const reset = useCallback(() => {
    setStage("typing");
    setTypedChars(0);
    setProgress(0);
    setShowHint(false);
  }, []);

  useEffect(() => {
    if (stage !== "typing") return;
    if (typedChars < TYPING_REPO.length) {
      const t = setTimeout(() => setTypedChars((c) => c + 1), 60);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStage("analyzing"), 600);
    return () => clearTimeout(t);
  }, [stage, typedChars]);

  useEffect(() => {
    if (stage !== "analyzing") return;
    const t1 = setTimeout(() => setProgress(28), 400);
    const t2 = setTimeout(() => setProgress(55), 1000);
    const t3 = setTimeout(() => { setProgress(100); setStage("generating"); }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [stage]);

  useEffect(() => {
    if (stage !== "generating") return;
    const t1 = setTimeout(() => setProgress(30), 300);
    const t2 = setTimeout(() => setProgress(60), 900);
    const t3 = setTimeout(() => setProgress(85), 1600);
    const t4 = setTimeout(() => { setProgress(100); setStage("complete"); setShowHint(true); }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [stage]);

  useEffect(() => {
    if (!loop || stage !== "complete") return;
    const t = setTimeout(reset, 5000);
    return () => clearTimeout(t);
  }, [loop, stage, reset]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Interactive Demo</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Watch it <span className="gradient-text">work</span>
          </h2>
          <p className="mt-3 text-sm text-muted max-w-lg mx-auto">
            See how a single repository URL becomes 6 launch-ready assets — no account needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-3xl border border-border/50 bg-card relative overflow-hidden shadow-2xl shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/40 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <span className="ml-3 text-[11px] text-muted-foreground/60 font-mono">releasy.sh/app</span>
                <div className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground/40 font-mono">
                  <Terminal className="h-3 w-3" />
                  {stage === "typing" && "ready"}
                  {stage === "analyzing" && "analyzing..."}
                  {stage === "generating" && "generating..."}
                  {stage === "complete" && "done"}
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="rounded-2xl border border-border/40 bg-black/30 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative flex-1">
                      <GitBranch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <div className="h-11 pl-10 pr-3 rounded-xl bg-white/[0.04] border border-border/50 flex items-center">
                        <span className="text-sm font-mono text-muted-foreground">
                          github.com/
                          {typedChars > 0 ? TYPING_REPO.slice(0, typedChars) : ""}
                          <AnimatePresence>
                            {stage === "typing" && typedChars < TYPING_REPO.length && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-[2px] h-4 bg-primary ml-0.5 align-middle"
                              />
                            )}
                          </AnimatePresence>
                        </span>
                      </div>
                    </div>
                    <motion.div
                      className={`h-11 px-5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium shrink-0 ${
                        stage === "typing"
                          ? "bg-gradient-to-r from-primary to-accent text-white"
                          : stage === "complete"
                          ? "bg-success/10 text-success border border-success/20"
                          : "bg-primary/10 text-primary border border-primary/20"
                      }`}
                      animate={stage === "complete" ? { scale: [1, 1.04, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {stage === "typing" && (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate
                        </>
                      )}
                      {stage === "analyzing" && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing
                        </>
                      )}
                      {stage === "generating" && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating
                        </>
                      )}
                      {stage === "complete" && (
                        <>
                          <Check className="h-4 w-4" />
                          Done
                        </>
                      )}
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    {stage !== "typing" && (
                      <motion.div
                        key="progress"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {stage === "analyzing" && "Fetching repository data..."}
                              {stage === "generating" && "Writing 6 assets..."}
                              {stage === "complete" && "All assets generated!"}
                            </span>
                            <span className="font-mono text-muted-foreground tabular-nums">{progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        {stage === "analyzing" && (
                          <div className="mt-4 space-y-2">
                            {["Reading release data", "Analyzing 30+ commits", "Categorizing changes"].map((step, i) => (
                              <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.3 }}
                                className="flex items-center gap-2.5 text-xs text-muted-foreground"
                              >
                                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Loader2 className="h-2.5 w-2.5 animate-spin text-primary" />
                                </div>
                                {step}
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {stage === "generating" && (
                          <div className="mt-4 space-y-2">
                            {["Writing Customer Changelog", "Writing LinkedIn Post", "Writing X Thread"].map((step, i) => (
                              <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.25 }}
                                className="flex items-center gap-2.5 text-xs text-muted-foreground"
                              >
                                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Loader2 className="h-2.5 w-2.5 animate-spin text-primary" />
                                </div>
                                {step}
                              </motion.div>
                            ))}
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                              className="text-[10px] text-muted-foreground/50 pl-6"
                            >
                              + 8 more assets
                            </motion.p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {stage === "complete" && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-5"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-5 w-5 rounded-md bg-success/10 border border-success/20 flex items-center justify-center">
                          <Check className="h-3 w-3 text-success" />
                        </div>
                        <span className="text-xs font-medium">6 assets generated</span>
                        <span className="text-[10px] text-muted-foreground/50">from vercel/next.js</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {ASSETS.map((asset, i) => {
                          const Icon = asset.icon;
                          return (
                            <motion.div
                              key={asset.name}
                              initial={{ opacity: 0, y: 12, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.04 }}
                              className="rounded-xl bg-white/[0.03] border border-border/50 p-3 hover:bg-white/[0.06] hover:border-border hover:scale-[1.03] transition-all duration-200 cursor-default group"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                                  <Icon className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">
                                  {asset.name}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                  Demo auto-plays
                </span>
                <button
                  onClick={reset}
                  className="text-primary hover:text-primary-hover underline underline-offset-4 transition-colors"
                >
                  Replay
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

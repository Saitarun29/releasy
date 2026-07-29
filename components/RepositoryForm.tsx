"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Hash, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RepositoryFormProps {
  onSubmit: (input: string, tag: string) => void;
  isDisabled: boolean;
  onExampleClick: (input: string) => void;
}

const EXAMPLES = ["vercel/next.js", "facebook/react", "openai/openai-node", "microsoft/typescript"];

export function RepositoryForm({ onSubmit, isDisabled, onExampleClick }: RepositoryFormProps) {
  const [input, setInput] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (isDisabled) return;
      setError("");

      const value = input.trim();
      if (!value) {
        setError("Please enter a GitHub repository");
        return;
      }

      const isUrl = value.includes("github.com");
      const isShorthand = /^[\w.-]+\/[\w.-]+$/.test(value);

      if (!isUrl && !isShorthand) {
        setError("Use github.com/owner/repo or owner/repo format");
        return;
      }

      onSubmit(value, tag.trim());
    },
    [input, tag, onSubmit, isDisabled]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mx-auto w-full max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl border transition-all duration-300 ${
            focused
              ? "border-primary/50 shadow-lg shadow-primary/10"
              : error
              ? "border-error/50 shadow-lg shadow-error/10"
              : "border-border/60 hover:border-border"
          }`}
        >
          <div className="rounded-2xl bg-card backdrop-blur-sm p-1">
            <div className="flex flex-col sm:flex-row gap-2 p-3">
              <div className="relative flex-1">
                <GitBranch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="github.com/owner/repo"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="h-12 pl-10 text-sm border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl"
                  disabled={isDisabled}
                />
              </div>
              <div className="relative w-full sm:w-36">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="h-12 pl-9 text-sm border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl"
                  disabled={isDisabled}
                />
              </div>
              <motion.div whileHover={{ scale: isDisabled ? 1 : 1.02 }} whileTap={{ scale: isDisabled ? 1 : 0.97 }}>
                <Button
                  type="submit"
                  disabled={isDisabled}
                  className="h-12 px-6 gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-primary-foreground border-0 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shrink-0"
                >
                  {isDisabled ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-sm text-error text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="hidden sm:inline">Try:</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {EXAMPLES.map((name) => (
              <motion.button
                key={name}
                type="button"
                disabled={isDisabled}
                onClick={() => onExampleClick(name)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-border/50 hover:bg-white/[0.08] hover:border-border hover:text-foreground transition-colors duration-200 disabled:opacity-50"
              >
                {name}
              </motion.button>
            ))}
          </div>
          <motion.kbd
            className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground bg-white/[0.04] border border-border rounded"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[9px]">⌘</span>↵
          </motion.kbd>
        </div>
      </form>
    </motion.div>
  );
}

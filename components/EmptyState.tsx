"use client";

import { motion } from "framer-motion";
import { GitBranch, Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-lg text-center py-12"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-transparent blur-2xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl glass border-border/50">
          <div className="relative">
            <GitBranch className="h-10 w-10 text-foreground/80" />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <h3 className="text-xl font-semibold mb-2">Launch content that sounds like you</h3>
      <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
        Paste a GitHub repository URL above and get 6 assets that read like you wrote them — not like AI.
      </p>
    </motion.div>
  );
}

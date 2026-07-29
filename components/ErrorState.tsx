"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const isRateLimit =
    message.toLowerCase().includes("rate limit") ||
    message.toLowerCase().includes("rate limited");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto w-full max-w-lg"
    >
      <div className="rounded-2xl border border-error/20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-error/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: [0, -6, 6, -4, 4, 0],
            }}
            transition={{ scale: { duration: 0.3 }, x: { duration: 0.5, ease: "easeInOut" } }}
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10 border border-error/20"
          >
            <AlertTriangle className="h-8 w-8 text-error" />
          </motion.div>

          <h3 className="text-lg font-semibold mb-2">
            {isRateLimit ? "Rate limit reached" : "Generation failed"}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-sm mx-auto">
            {message}
          </p>

          {isRateLimit && (
            <div className="mb-6 p-3 rounded-xl bg-warning/5 border border-warning/10 text-xs text-muted-foreground leading-relaxed text-left">
              <p className="font-medium text-warning mb-1">💡 Tip</p>
              GitHub API limits unauthenticated requests to 60/hour. Wait a few minutes or authenticate via a GitHub token.
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={onRetry} className="gap-2 h-10">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

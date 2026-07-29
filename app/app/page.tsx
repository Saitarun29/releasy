"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { RepositoryForm } from "@/components/RepositoryForm";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { RepositorySummary } from "@/components/RepositorySummary";
import { ReleaseTimeline } from "@/components/ReleaseTimeline";
import { AssetTabs } from "@/components/AssetTabs";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Celebration } from "@/components/Celebration";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";
import { toast } from "@/hooks/use-toast";
import { fetchRepositorySummary, GitHubError } from "@/lib/github";
import { addRecentRepo, addToHistory } from "@/lib/storage";
import type { GenerationStatus, RepositorySummary as RepoSummary, GeneratedAsset } from "@/types";

const TOTAL_STEPS = 8;

export default function AppPage() {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [summary, setSummary] = useState<RepoSummary | null>(null);
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  const [error, setError] = useState("");
  const [statusIndex, setStatusIndex] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  const generate = useCallback(async (input: string, tag: string) => {
    setStatus("loading");
    setError("");
    setSummary(null);
    setAssets([]);
    setStatusIndex(0);
    setCelebrate(false);

    const timer = setInterval(() => {
      setStatusIndex((prev) => Math.min(prev + 1, TOTAL_STEPS - 2));
    }, 1500);

    try {
      setStatusIndex(1);
      const result = await fetchRepositorySummary(input, tag || undefined);

      setStatusIndex(2);
      setSummary(result);

      setStatusIndex(3);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: result }),
      });

      clearInterval(timer);

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Generation failed" }));
        throw new Error(err.error || "Generation failed");
      }

      setStatusIndex(TOTAL_STEPS - 1);

      const data = await response.json();
      setAssets(data.assets);
      setSummary(result);
      setStatus("success");

      addRecentRepo({
        owner: result.repository.owner,
        repo: result.repository.repo,
        tag: tag || undefined,
      });
      addToHistory({
        fullName: `${result.repository.owner}/${result.repository.repo}`,
        owner: result.repository.owner,
        repo: result.repository.repo,
        tag: tag || undefined,
        assetCount: data.assets.length,
      });

      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2500);
      toast({
        title: "6 assets generated",
        description: "Ready to copy, download, or share",
        variant: "success",
      });
    } catch (err) {
      clearInterval(timer);
      if (err instanceof GitHubError) {
        setError(err.message);
      } else if (err instanceof TypeError) {
        setError("Network error. Check your connection and try again.");
      } else {
        setError(err instanceof Error ? err.message : "Something unexpected happened. Please try again.");
      }
      setStatus("error");
    }
  }, []);

  const handleExampleClick = useCallback(
    (input: string) => {
      generate(input, "");
    },
    [generate]
  );

  const handleRetry = useCallback(() => {
    setStatus("idle");
    setError("");
    setSummary(null);
    setAssets([]);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && status === "success") {
        handleRetry();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status, handleRetry]);

  return (
    <>
      <Navbar />
      <Celebration show={celebrate} />
      <main className="flex-1 pt-20">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center pt-12 pb-8"
            >
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                Write content that{" "}
                <span className="gradient-text">sounds like you</span>
              </h1>
              <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-2xl mx-auto">
                Paste a GitHub repository and get launch assets that read like you wrote them — changelogs, social posts, emails, and more.
              </p>
            </motion.div>

            <RepositoryForm onSubmit={generate} isDisabled={status === "loading"} onExampleClick={handleExampleClick} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-8 items-start">
              <div>
                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <LoadingState key="loading" statusIndex={statusIndex} />
                  )}
                  {status === "error" && (
                    <ErrorState key="error" message={error} onRetry={handleRetry} />
                  )}
                  {status === "idle" && (
                    <EmptyState key="empty" />
                  )}
                  {status === "success" && summary && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <RepositorySummary summary={summary} />
                      <ReleaseTimeline summary={summary} />
                      {assets.length > 0 && (
                        <AssetTabs
                          assets={assets}
                          repoName={`${summary.repository.owner}/${summary.repository.repo}`}
                        />
                      )}
                      <div className="text-center pt-4">
                        <button
                          onClick={handleRetry}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                        >
                          Generate another repository
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <DashboardSidebar onExampleClick={handleExampleClick} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

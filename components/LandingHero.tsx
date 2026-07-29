"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GRID_CARDS = [
  { label: "Changelog", col: "1", row: "1" },
  { label: "LinkedIn", col: "2", row: "1" },
  { label: "X Thread", col: "3", row: "1" },
  { label: "Email", col: "1", row: "2" },
  { label: "Instagram", col: "2", row: "2" },
  { label: "Reel Script", col: "3", row: "2" },
  { label: "Release Notes", col: "1", row: "3" },
  { label: "Product Hunt", col: "2", row: "3" },
  { label: "Newsletter", col: "3", row: "3" },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-glass px-4 py-1.5 text-sm text-muted-foreground"
          >
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            AI Launch Kit — Ship Code. Launch Everywhere.
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
            Write launch content that
            <br />
            <span className="gradient-text">sounds like you</span>
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-muted-foreground/80 font-medium">
            Not like AI.
          </p>

          <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto text-balance leading-relaxed">
            Paste your GitHub repository and instantly generate launch-ready content —
            changelogs, release notes, LinkedIn posts, X threads, Instagram captions,
            Reel scripts, emails, Product Hunt descriptions, newsletters, and more.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/app">
              <Button size="lg" className="w-full sm:w-auto text-base gap-2 h-12 px-8 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-primary-foreground border-0 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base gap-2 h-12 px-8"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 mx-auto max-w-4xl"
        >
          <div className="glass rounded-3xl p-6 border-border/50 glow">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="h-3 w-3 rounded-full bg-error/80" />
              <div className="h-3 w-3 rounded-full bg-warning/80" />
              <div className="h-3 w-3 rounded-full bg-success/80" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">releasy.sh — Generated Assets</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {GRID_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl bg-white/[0.03] border border-border/50 p-3 text-center hover:bg-white/[0.06] transition-colors"
                >
                  <span className="text-xs text-muted-foreground">{card.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

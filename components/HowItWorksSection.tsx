"use client";

import { motion } from "framer-motion";
import { Link2, Brain, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Connect Repository",
    description: "Paste any public GitHub URL or owner/repo name. Optionally specify a release tag to target a specific version.",
    detail: "No auth required. Works with any public repository.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "We fetch commits, releases, and pull requests. Our AI categorizes every change and identifies key highlights.",
    detail: "Commit categorization + release parsing in real time.",
  },
  {
    icon: Sparkles,
    title: "Get Your Assets",
    description: "All 11 marketing assets are generated simultaneously. Copy individual items, download as Markdown, or export all as ZIP.",
    detail: "Changelog, social posts, email, scripts, and more.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Workflow</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            How it <span className="gradient-text">Works</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-xl mx-auto">
            Three steps from repository to published content.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="hidden lg:block absolute top-28 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card gradient-border mb-6">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-3">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-xs">{step.description}</p>
                <p className="text-xs text-muted-foreground/60 mt-3 max-w-xs">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquareText, Hash, Mail, Camera, Video, ScrollText, Tag, MessageCircle, Rocket, Newspaper, Wand2 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Customer Changelog",
    description: "Benefit-driven changelogs your users actually read. Warm, transparent, and focused on what changed for them.",
  },
  {
    icon: MessageSquareText,
    title: "LinkedIn Post",
    description: "Professional launch posts with sharp openings, mini-story structure, and engagement-driving questions.",
  },
  {
    icon: Hash,
    title: "X Thread",
    description: "High-engagement multi-tweet threads. Each tweet makes one point, under 260 characters.",
  },
  {
    icon: Mail,
    title: "Launch Email",
    description: "Benefit-first subject lines, skimmable bullet sections, and a clear call to action for busy readers.",
  },
  {
    icon: Camera,
    title: "Instagram Caption",
    description: "Founder-style captions with natural emoji use, clear CTAs, and relevant hashtags. Max 2200 characters.",
  },
  {
    icon: Video,
    title: "Reel Script",
    description: "30-60 second spoken scripts with Hook → Problem → Solution → What's New → CTA structure. Natural delivery.",
  },
  {
    icon: ScrollText,
    title: "Release Notes",
    description: "Developer-friendly changelogs grouped under Added, Changed, Fixed, Removed. Technical, no fluff.",
  },
  {
    icon: Tag,
    title: "GitHub Release",
    description: "GitHub-flavored Markdown release descriptions. Summary + What's Changed + Full Changelog reference.",
  },
  {
    icon: MessageCircle,
    title: "Threads Post",
    description: "Casual, personal-first posts that look like text messages. Short paragraphs, open-ended questions.",
  },
  {
    icon: Rocket,
    title: "Product Hunt",
    description: "Launch posts with maker intro, problem/solution, outcome-driven feature bullets, and launch-day CTA.",
  },
  {
    icon: Newspaper,
    title: "Newsletter",
    description: "Founder-written weekly updates with what shipped, why it matters, and what's coming next.",
  },
  {
    icon: Wand2,
    title: "One-Click Generation",
    description: "All 6 assets generated simultaneously from a single repository analysis. Copy, download, or ZIP export.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
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
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="gradient-text">launch</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
             6 assets from one repository. Copy, download, or export as ZIP.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="glass rounded-2xl p-5 transition-all duration-300 hover:bg-glass-hover hover:border-border-hover hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-3">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

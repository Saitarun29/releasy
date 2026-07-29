"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquareText, Hash, Mail, Camera, Video, ScrollText, Tag, MessageCircle, Rocket, Newspaper } from "lucide-react";

const assets = [
  { icon: FileText, title: "Customer Changelog", desc: "Benefit-driven markdown for users" },
  { icon: MessageSquareText, title: "LinkedIn Post", desc: "Professional launch stories" },
  { icon: Hash, title: "X Thread", desc: "5-8 tweet engagement threads" },
  { icon: Mail, title: "Launch Email", desc: "Subject + preview + body" },
  { icon: Camera, title: "Instagram Caption", desc: "Founder-style with hashtags" },
  { icon: Video, title: "Reel Script", desc: "30-60s spoken scripts" },
  { icon: ScrollText, title: "Release Notes", desc: "Developer-friendly changelogs" },
  { icon: Tag, title: "GitHub Release", desc: "GFM release descriptions" },
  { icon: MessageCircle, title: "Threads Post", desc: "Casual text-style updates" },
  { icon: Rocket, title: "Product Hunt", desc: "Launch posts that convert" },
  { icon: Newspaper, title: "Newsletter", desc: "Founder-written updates" },
];

export function AILaunchKit() {
  return (
    <section id="ai-kit" className="relative py-24 sm:py-32">
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
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">AI Launch Kit</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
             6 assets. One <span className="gradient-text">repository</span>.
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Every asset is written for its specific channel with a distinct voice, structure, and format.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 rounded-3xl pointer-events-none" />
          <div className="relative glass rounded-3xl p-6 sm:p-8 border-border/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {assets.map((asset, i) => (
                <motion.div
                  key={asset.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="rounded-xl bg-white/[0.03] border border-border/50 p-4 hover:bg-white/[0.06] hover:border-border-hover transition-all duration-200"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-3">
                    <asset.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold mb-0.5">{asset.title}</h4>
                  <p className="text-xs text-muted-foreground">{asset.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

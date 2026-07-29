import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  FileText,
  UserPlus,
  MessageCircle,
  Mail,
  Camera,
  Video,
  Hash,
  Megaphone,
  Newspaper,
  MessageSquare,
  Rocket,
  GitBranch,
  Download,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Releasy",
  description: "Discover how Releasy turns one GitHub analysis into 6 launch-ready assets in seconds.",
};

const FEATURES = [
  {
    icon: GitBranch,
    title: "GitHub Deep Analysis",
    description: "Parse any public repository — commits, pull requests, release tags — and extract meaningful context for content generation.",
  },
  {
    icon: Zap,
    title: "11 Assets, One Click",
    description: "Generate changelogs, LinkedIn posts, X threads, Instagram captions, Reel scripts, emails, release notes, GitHub releases, Threads posts, Product Hunt descriptions, and newsletters simultaneously.",
    assets: [
      { icon: FileText, label: "Changelog" },
      { icon: UserPlus, label: "LinkedIn" },
      { icon: MessageCircle, label: "X Thread" },
      { icon: Mail, label: "Email" },
      { icon: Camera, label: "Instagram" },
      { icon: Video, label: "Reel Script" },
      { icon: Hash, label: "Release Notes" },
      { icon: GitBranch, label: "GitHub Release" },
      { icon: MessageSquare, label: "Threads" },
      { icon: Megaphone, label: "Product Hunt" },
      { icon: Newspaper, label: "Newsletter" },
    ],
  },
  {
    icon: Sparkles,
    title: "AI-Powered Copywriting",
    description: "Each asset is crafted with a unique tone and structure — professional for LinkedIn, casual for Instagram, technical for release notes, and persuasive for Product Hunt.",
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Copy individual assets to your clipboard or download all assets as a ZIP archive with formatted text and markdown files.",
  },
  {
    icon: Rocket,
    title: "Launch-Ready Content",
    description: "Every output is formatted and structured for immediate publishing — no editing required. From email preview text to Instagram line breaks, everything is production-ready.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Features</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Everything you need to{" "}
              <span className="gradient-text">launch faster</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              One repository URL. Eleven assets. Zero friction.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                {"assets" in feature && feature.assets && (
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {feature.assets.map((asset: { icon: React.ComponentType<{ className?: string }>; label: string }) => {
                      const Icon = asset.icon;
                      return (
                        <div
                          key={asset.label}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-border/30 text-sm"
                        >
                          <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="truncate">{asset.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

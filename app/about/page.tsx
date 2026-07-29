import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, Heart, GitBranch, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Releasy",
  description: "Releasy turns one GitHub repository into a full launch kit. Learn about the team and mission.",
};

const VALUES = [
  {
    icon: Rocket,
    title: "Ship Faster",
    description: "We believe developers should spend time building, not writing marketing copy. Releasy removes the friction from launch communication.",
  },
  {
    icon: Heart,
    title: "Open by Default",
    description: "Built for the open-source community. Public repos are first-class citizens, and our own code is open source.",
  },
  {
    icon: GitBranch,
    title: "Developer First",
    description: "Every design decision prioritizes developer experience — from the CLI-like interface to markdown-native exports.",
  },
];

export default function AboutPage() {
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
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">About</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Our mission: <span className="gradient-text">ship code, launch everywhere</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Releasy was born from a simple observation: developers ship amazing work, but the launch
              communication — changelogs, social posts, emails — is tedious and often skipped. We set out
              to make it instant.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border/50 bg-card p-8 mb-8">
              <h2 className="text-lg font-semibold mb-4">The Story</h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Every time we shipped a release, we found ourselves writing the same content in different
                  formats — a changelog for docs, a tweet for X, a post for LinkedIn, an email for users.
                  Each platform demanded a different tone, structure, and length.
                </p>
                <p>
                  We realized AI could do this instantly if it understood the code changes. So we built
                  Releasy: a tool that reads your repository, understands what changed, and generates a
                  complete launch kit.
                </p>
                <p>
                  What started as a weekend project became the tool we wish we had from day one.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-border/50 bg-card p-6 text-center transition-all duration-300 hover:border-border hover:-translate-y-0.5"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold mb-2">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
              <h2 className="text-lg font-semibold mb-2">Built with ❤️ for developers</h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Releasy is maintained by a small team of developers who believe launching should be as fun as building.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

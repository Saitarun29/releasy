import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, Newspaper, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Releasy",
  description: "Tips, guides, and stories about shipping great software releases.",
};

const PLACEHOLDER_POSTS = [
  {
    title: "Why Every Release Needs a Launch Kit",
    description: "Stop writing the same update five times. Here's how one analysis powers every channel.",
    date: "Coming Soon",
    category: "Guides",
  },
  {
    title: "The Art of the Changelog",
    description: "Great changelogs keep users coming back. Learn the structure that works.",
    date: "Coming Soon",
    category: "Best Practices",
  },
  {
    title: "From Commit to Social Post",
    description: "How we turn git history into launch-ready copy with AI.",
    date: "Coming Soon",
    category: "Engineering",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Newspaper className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Articles & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Tips, guides, and stories about shipping great software releases.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border/50 bg-card p-8 mb-10 text-center">
              <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Blog coming soon</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                We&apos;re writing articles about release strategy, AI-generated content, and developer marketing.
                Check back soon!
              </p>
            </div>

            <div className="space-y-4">
              {PLACEHOLDER_POSTS.map((post) => (
                <div
                  key={post.title}
                  className="rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-border opacity-60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-accent font-medium">{post.category}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

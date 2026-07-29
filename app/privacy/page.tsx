import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Releasy",
  description: "How Releasy handles your data. We believe in transparency and privacy-first design.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p>
                When you use Releasy, we collect the minimum data needed to provide the service:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>GitHub repository URLs and names you submit for analysis</li>
                <li>Public repository metadata fetched via the GitHub API (commits, releases, pull requests)</li>
                <li>Local storage data (recent repositories, favorites, history) — stored entirely in your browser</li>
                <li>Basic usage analytics (page views, feature usage) to improve the product</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Data</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To generate AI-powered content based on your repository</li>
                <li>To improve generation quality and model prompts</li>
                <li>To diagnose technical issues</li>
              </ul>
              <p className="mt-2">We never sell your data or use it for advertising.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. Data Storage</h2>
              <p>
                Your preferences (favorites, history) are stored in your browser&apos;s localStorage and never sent to our servers.
                Repository data fetched from GitHub is processed in memory during your session and not permanently stored unless
                explicitly saved by you.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Third-Party Services</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>GitHub API</strong> — We fetch public repository data on your behalf</li>
                <li><strong>Mistral AI</strong> — AI generation is performed via the Mistral API, which processes repository summaries to generate content. No raw code is sent</li>
                <li><strong>Vercel</strong> — Our application is hosted on Vercel; standard server logs may include IP addresses and request metadata</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Your Rights</h2>
              <p>
                You can clear all local data at any time via your browser settings. To request deletion of any server-side data,
                contact us at privacy@releasy.sh.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Changes</h2>
              <p>
                We may update this policy occasionally. Material changes will be notified via our website or GitHub repository.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Contact</h2>
              <p>
                Questions? Email us at privacy@releasy.sh.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

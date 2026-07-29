import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Releasy",
  description: "Simple, transparent pricing for every team. Start free, upgrade as you grow.",
};

const TIERS = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for indie developers experimenting with launch content.",
    features: [
      "1 repository analysis per day",
      "All 11 asset types",
      "Basic markdown export",
      "Public repositories only",
      "Community support",
    ],
    cta: "Get Started",
    href: "/app",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For developers and small teams shipping regularly.",
    features: [
      "50 repository analyses per day",
      "All 11 asset types",
      "Copy + Download (ZIP, TXT, MD)",
      "Private repository support",
      "Priority email support",
      "Custom branding on assets",
      "Release tag history",
    ],
    cta: "Start Free Trial",
    href: "/app",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For teams and organizations managing multiple repos.",
    features: [
      "Unlimited repository analyses",
      "All 11 asset types",
      "All export formats + API access",
      "Private & organization repos",
      "Dedicated Slack support",
      "Custom branding & templates",
      "Team workspaces & sharing",
      "SSO & audit logs",
      "99.9% uptime SLA",
    ],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
];

export default function PricingPage() {
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
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Pricing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Simple pricing,{" "}
              <span className="gradient-text">no surprises</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              Start free and upgrade when you need more. All plans include access to all 11 AI-generated assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] ${
                  tier.featured
                    ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/50 bg-card hover:border-border"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.period && <span className="text-muted-foreground text-sm">{tier.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    tier.featured
                      ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/25"
                      : "bg-white/[0.06] border border-border/50 text-foreground hover:bg-white/[0.1]"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

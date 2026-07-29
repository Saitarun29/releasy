import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, GitBranch, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Releasy",
  description: "Get in touch with the Releasy team. We'd love to hear from you.",
};

const CONTACT_OPTIONS = [
  {
    icon: Mail,
    title: "Email",
    description: "For general inquiries and support.",
    action: "hello@releasy.sh",
    href: "mailto:hello@releasy.sh",
  },
  {
    icon: MessageSquare,
    title: "Support",
    description: "Need help using Releasy? Open an issue or start a discussion.",
    action: "GitHub Discussions",
    href: "https://github.com/releasy/discussions",
  },
  {
    icon: GitBranch,
    title: "Report a Bug",
    description: "Found something broken? File an issue on GitHub.",
    action: "Open an Issue",
    href: "https://github.com/releasy/issues",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Contact</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Get in <span className="gradient-text">touch</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Have a question, suggestion, or just want to say hi? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {CONTACT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <a
                  key={opt.title}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-border/50 bg-card p-6 text-center transition-all duration-300 hover:border-border hover:-translate-y-0.5 group"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{opt.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{opt.description}</p>
                  <span className="text-xs text-primary font-medium">{opt.action} &rarr;</span>
                </a>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-border/50 bg-card p-8">
            <h2 className="text-lg font-semibold mb-6 text-center">Send us a message</h2>
            <form
              action="mailto:hello@releasy.sh"
              method="post"
              encType="text/plain"
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-muted-foreground mb-1.5">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

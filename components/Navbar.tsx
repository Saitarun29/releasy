"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PAGE_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/app");
  const isLanding = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkClass =
    "text-sm text-muted-foreground transition-all duration-200 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass mt-4 rounded-2xl px-6 py-3">
          <nav className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="flex items-center gap-3">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20"
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <span className="text-lg font-semibold tracking-tight">Releasy</span>
              </Link>
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {isLanding ? (
                <>
                  <button onClick={() => scrollTo("features")} className={linkClass}>
                    Features
                  </button>
                  <button onClick={() => scrollTo("how-it-works")} className={linkClass}>
                    How it Works
                  </button>
                  <button onClick={() => scrollTo("ai-kit")} className={linkClass}>
                    AI Launch Kit
                  </button>
                  <button onClick={() => scrollTo("faq")} className={linkClass}>
                    FAQ
                  </button>
                </>
              ) : (
                PAGE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${linkClass} ${pathname === link.href ? "text-foreground after:w-full" : ""}`}
                  >
                    {link.label}
                  </Link>
                ))
              )}
              {!isApp && !isLanding && (
                <Link
                  href="/"
                  className={`${linkClass} ${pathname === "/" ? "text-foreground after:w-full" : ""}`}
                >
                  Home
                </Link>
              )}
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground inline-flex items-center gap-1.5"
                whileHover={{ scale: 1.03 }}
              >
                <GitBranch className="h-3.5 w-3.5" />
                GitHub
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-5 bg-foreground transition-all ${mobileOpen ? "rotate-45 translate-y-1" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-all ${mobileOpen ? "-rotate-45 -translate-y-1" : ""}`} />
            </button>

            <Link href="/app" className="hidden sm:block">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button size="sm">Get Started</Button>
              </motion.div>
            </Link>
          </nav>

          {/* Mobile menu */}
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pt-4 pb-2 border-t border-border/50 mt-3 space-y-2"
            >
              {isLanding ? (
                <>
                  <button onClick={() => { scrollTo("features"); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.04]">
                    Features
                  </button>
                  <button onClick={() => { scrollTo("how-it-works"); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.04]">
                    How it Works
                  </button>
                  <button onClick={() => { scrollTo("ai-kit"); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.04]">
                    AI Launch Kit
                  </button>
                  <button onClick={() => { scrollTo("faq"); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.04]">
                    FAQ
                  </button>
                </>
              ) : null}
              {PAGE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/app"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-primary font-medium rounded-lg hover:bg-primary/10"
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}

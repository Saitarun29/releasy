"use client";

import { motion } from "framer-motion";
import { Sparkles, GitBranch } from "lucide-react";
import Link from "next/link";

const stagger = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <motion.div
            custom={0}
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-4 sm:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent"
                whileHover={{ rotate: -5, scale: 1.05 }}
              >
                <Sparkles className="h-4 w-4 text-white" />
              </motion.div>
              <span className="font-semibold">Releasy</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Ship code. Launch everywhere. AI-powered launch kit for every release.
            </p>
          </motion.div>

          <motion.div
            custom={1}
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Dashboard", href: "/app" },
                { label: "About", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            custom={2}
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "FAQ", href: "/#faq" },
                { label: "How it Works", href: "/#how-it-works" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            custom={3}
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground inline-flex items-center gap-1.5"
                  whileHover={{ scale: 1.03, x: 2 }}
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  GitHub
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Releasy. MIT License.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

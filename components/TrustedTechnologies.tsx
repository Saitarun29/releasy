"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "GitHub", desc: "Repository Hosting" },
  { name: "Next.js", desc: "React Framework" },
  { name: "TypeScript", desc: "Type System" },
  { name: "Tailwind CSS", desc: "Styling" },
  { name: "Mistral AI", desc: "AI Provider" },
  { name: "Framer Motion", desc: "Animation" },
];

export function TrustedTechnologies() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8"
        >
          Built with modern technology
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl p-4 text-center hover:bg-glass-hover transition-all duration-300"
            >
              <div className="text-sm font-semibold text-foreground">{tech.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{tech.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

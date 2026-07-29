"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  rotation: number;
  midX: number;
  endX: number;
}

const COLORS = ["#6366f1", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444", "#a78bfa"];

function generateParticles(): Particle[] {
  return Array.from({ length: 40 }, (_, i) => {
    const baseX = Math.random() * 100;
    return {
      id: i,
      x: baseX,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 6 + 4,
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
      midX: baseX + (Math.random() - 0.5) * 20,
      endX: baseX + (Math.random() - 0.5) * 30,
    };
  });
}

interface CelebrationProps {
  show: boolean;
}

export function Celebration({ show }: CelebrationProps) {
  const particles = useMemo(() => (show ? generateParticles() : null), [show]);

  return (
    <AnimatePresence>
      {show && particles && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: 1,
                y: "100vh",
                x: `${p.x}vw`,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                y: ["100vh", "50vh", "-10vh"],
                x: [`${p.x}vw`, `${p.midX}vw`, `${p.endX}vw`],
                scale: [0, 1, 0.5],
                rotate: [0, p.rotation, p.rotation * 2],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.8,
                delay: p.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="absolute rounded-sm"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-2xl shadow-primary/30">
              ✨ Assets generated!
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

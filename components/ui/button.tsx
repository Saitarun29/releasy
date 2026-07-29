"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/20",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent-hover shadow-lg shadow-accent/20",
        outline:
          "border border-border bg-transparent hover:bg-card-hover hover:border-border-hover text-foreground",
        ghost: "hover:bg-card-hover text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3 py-1.5 text-xs",
        lg: "h-13 rounded-xl px-8 py-3 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);
    const Comp = asChild ? Slot : "button";

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
        onClick?.(e);
      },
      [onClick]
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute pointer-events-none rounded-full bg-white/25"
              style={{
                left: ripple.x - 8,
                top: ripple.y - 8,
                width: 16,
                height: 16,
              }}
            />
          ))}
        </AnimatePresence>
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

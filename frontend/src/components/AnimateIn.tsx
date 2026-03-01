"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type AnimationVariant = "fade-up" | "fade-left" | "fade-right" | "fade" | "zoom";

interface AnimateInProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variantStyles: Record<AnimationVariant, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  zoom: {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
};

export default function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
}: AnimateInProps) {
  const { ref, isVisible } = useScrollReveal();
  const { hidden, visible } = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? visible : hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

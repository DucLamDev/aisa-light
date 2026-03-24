"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type AnimationType = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "zoom-in" | "slide-up";

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  className = ""
}: {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseStyles = "transform-gpu will-change-transform transition-all duration-700 ease-out";

  const animationStyles: Record<AnimationType, { hidden: string; visible: string }> = {
    "fade-up": {
      hidden: "translate-y-8 opacity-0",
      visible: "translate-y-0 opacity-100"
    },
    "fade-in": {
      hidden: "opacity-0",
      visible: "opacity-100"
    },
    "fade-left": {
      hidden: "-translate-x-8 opacity-0",
      visible: "translate-x-0 opacity-100"
    },
    "fade-right": {
      hidden: "translate-x-8 opacity-0",
      visible: "translate-x-0 opacity-100"
    },
    "zoom-in": {
      hidden: "scale-95 opacity-0",
      visible: "scale-100 opacity-100"
    },
    "slide-up": {
      hidden: "translate-y-12 opacity-0",
      visible: "translate-y-0 opacity-100"
    }
  };

  const styles = animationStyles[animation];

  return (
    <div
      className={`${baseStyles} ${isVisible ? styles.visible : styles.hidden} ${className}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

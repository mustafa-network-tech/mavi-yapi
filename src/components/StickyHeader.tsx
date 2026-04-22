"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; className?: string };

/**
 * Aşağı kayınca gölve + hafif cam; üst bar yok, tek menü şeridi
 */
export function StickyHeader({ children, className }: Props) {
  const [elevated, setElevated] = useState(false);
  const onScroll = useCallback(() => {
    setElevated(window.scrollY > 4);
  }, []);
  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300",
        elevated
          ? "border-brand-100/80 bg-white/85 shadow-[0_4px_24px_-4px_rgba(234,88,12,0.12)] supports-[backdrop-filter]:bg-white/75 supports-[backdrop-filter]:backdrop-blur-xl"
          : "border-brand-100/40 bg-white/95 supports-[backdrop-filter]:backdrop-blur-md",
        className,
      )}
    >
      {children}
    </header>
  );
}

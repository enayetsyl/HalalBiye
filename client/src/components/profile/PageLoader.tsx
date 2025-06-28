"use client";

/**
 * PageLoader
 *
 * A full-screen loading indicator component.
 *
 * Renders a centered, animated spinner on a subtle gradient background
 * to signal that page content is loading.
 *
 * This is a client component so that browser-only APIs (e.g. DOM measurements,
 * hooks) can be used if needed.
 *
 * @example
 * <PageLoader />
 */
import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div
      className="
        min-h-screen 
        flex items-center justify-center
        bg-gradient-to-tr
        from-secondary/30
        via-neutral/60
        to-accent/60
        relative
      "
    >
      {/*
        The Loader2 icon from lucide-react, spun
        via Tailwind’s animate-spin utility.
      */}
      <Loader2 className="animate-spin w-8 h-8 text-primary" />
    </div>
  );
}

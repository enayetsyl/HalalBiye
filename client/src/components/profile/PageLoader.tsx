"use client";

import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative">
      <Loader2 className="animate-spin w-8 h-8 text-primary" />
    </div>
  );
}

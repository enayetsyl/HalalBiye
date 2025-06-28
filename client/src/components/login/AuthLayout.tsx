// components/login/AuthLayout.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AuthLayoutProps } from "@/types";

/**
 * AuthLayout
 *
 * A wrapper layout for authentication pages (e.g., Login, Register).
 * It displays a full-screen gradient background with a semi-transparent image overlay,
 * and centers its children in a styled card.
 *
 * @param {AuthLayoutProps} props
 * @param {React.ReactNode} props.children - The authentication form or other content to render.
 * @param {string} [props.backgroundImage="/login.png"] - Path to the background image used behind the layout.
 * @returns {JSX.Element}
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  backgroundImage = "/login.png",
}) => {
  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60
        relative overflow-hidden
      "
    >
      {/* Decorative background image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none select-none"
        priority
      />

      {/* Content container: holds the children (forms, etc.) */}
      <div className="relative z-10 mx-5 w-xl bg-white/95 rounded-2xl shadow-lg p-8 backdrop-blur-sm my-12 md:my-20">
        {children}
      </div>
    </div>
  );
};

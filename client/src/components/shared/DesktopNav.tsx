import Link from "next/link";
import { AuthButtons } from "./AuthButtons";
import { navLinks } from "@/constant";
import { JSX } from "react";

/**
 * DesktopNav
 *
 * Renders the main navigation bar for desktop screens (md breakpoint and above).
 * Iterates over the `navLinks` array to generate a Next.js `<Link>` for each route,
 * and displays authentication controls via the `<AuthButtons>` component.
 *
 * Uses utility classes to hide on smaller viewports, apply spacing, typography, and hover transitions.
 *
 * @returns {JSX.Element} The desktop navigation menu.
 */
export function DesktopNav(): JSX.Element {
  return (
    <div className="hidden md:flex items-center gap-4 font-sans text-base">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary transition"
        >
          {link.label}
        </Link>
      ))}
      <AuthButtons />
    </div>
  );
}

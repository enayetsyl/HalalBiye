"use client";

import { JSX } from "react";
import { LogoLink } from "./LogoLink";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

/**
 * Navbar
 *
 * Renders the main site navigation bar, including:
 *  - LogoLink: clickable logo that routes to the home page
 *  - DesktopNav: horizontal navigation links for desktop viewports
 *  - MobileMenu: hamburger menu for mobile viewports
 *
 * Uses the neutral background, padding, flex layout, and shadow styles
 * defined in the design system’s theme.
 *
 * @returns {JSX.Element} The navigation bar element
 */
export function Navbar(): JSX.Element {
  return (
    <nav className="bg-neutral px-4 py-2 flex items-center justify-between shadow">
      <LogoLink />
      <DesktopNav />
      <MobileMenu />
    </nav>
  );
}

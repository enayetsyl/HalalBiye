/**
 * LogoLink.tsx
 *
 * Renders the application logo alongside its name,
 * wrapped in a Next.js Link component that navigates to the homepage.
 */

import Link from "next/link";
import Image from "next/image";
import { JSX } from "react";

/**
 * LogoLink component.
 *
 * A clickable logo that routes users to the root path ("/").
 *
 * @component
 * @example
 *   <LogoLink />
 *
 * @returns {JSX.Element} A link containing the logo image and site title.
 */
export function LogoLink(): JSX.Element {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="HalalBiye logo"
        width={36}
        height={36}
        className="rounded-2xl"
        priority
      />
      <span className="font-serif text-xl font-bold text-primary tracking-wide">
        HalalBiye
      </span>
    </Link>
  );
}

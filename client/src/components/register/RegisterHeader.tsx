// components/register/RegisterHeader.tsx

/**
 * RegisterHeader
 *
 * Renders the header section for the registration page.
 * Includes the HalalBiye logo, a primary heading, and a subtitle
 * to prompt new users to create their account.
 */

import Image from "next/image";
import { JSX } from "react";

/**
 * RegisterHeader component
 *
 * @returns JSX.Element - The registration page header UI consisting of:
 *   - Logo image
 *   - Main title ("Create Your Account")
 *   - Subtitle prompting the halal journey
 */
export function RegisterHeader(): JSX.Element {
  return (
    <div className="flex flex-col items-center mb-4">
      <Image
        src="/logo.png"
        alt="HalalBiye logo"
        width={60}
        height={60}
        className="rounded-2xl mb-2"
        priority
      />
      <h1 className="text-2xl font-serif font-bold text-primary mb-1">
        Create Your Account
      </h1>
      <p className="text-base text-gray-500 mb-2 font-sans">
        Start your halal journey today!
      </p>
    </div>
  );
}

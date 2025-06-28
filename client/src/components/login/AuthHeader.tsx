// components/login/AuthHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AuthHeaderProps } from "@/types";

/**
 * AuthHeader.tsx
 *
 * Displays the application logo, page title, and optional subtitle
 * for authentication-related pages (e.g. Login, Register).
 */

/**
 * Props for the AuthHeader component.
 *
 * @typedef {Object} AuthHeaderProps
 * @property {string} logoSrc     - Source URL/path for the logo image.
 * @property {string} logoAlt     - Alt text for the logo image.
 * @property {string} title       - Main heading text to display.
 * @property {string} [subtitle]  - Optional subheading text.
 * @property {number} [logoSize=60] - Width and height (in px) of the logo image.
 */

/**
 * Renders a centered header with a logo, title, and optional subtitle
 * for authentication screens.
 *
 * @param {AuthHeaderProps} props
 * @returns {JSX.Element}
 */
export const AuthHeader: React.FC<AuthHeaderProps> = ({
  logoSrc,
  logoAlt,
  title,
  subtitle,
  logoSize = 60,
}) => (
  <div className="flex flex-col items-center mb-4">
    <Image
      src={logoSrc}
      alt={logoAlt}
      width={logoSize}
      height={logoSize}
      className="rounded-2xl mb-2"
      priority
    />
    <h1 className="text-2xl font-serif font-bold text-primary mb-1">
      {title}
    </h1>
    {subtitle && (
      <p className="text-base text-gray-500 mb-2 font-sans">
        {subtitle}
      </p>
    )}
  </div>
);

// components/login/AuthHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AuthHeaderProps } from "@/types";



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
    <h1 className="text-2xl font-serif font-bold text-primary mb-1">{title}</h1>
    {subtitle && (
      <p className="text-base text-gray-500 mb-2 font-sans">{subtitle}</p>
    )}
  </div>
);

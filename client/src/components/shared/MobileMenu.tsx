"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import { AuthButtons } from "./AuthButtons";
import { navLinks } from "@/constant";

/**
 * MobileMenu
 *
 * @description
 * A responsive navigation component for mobile screens. Renders a hamburger icon
 * that, when clicked, opens a side sheet containing the site logo, navigation links,
 * and authentication buttons (login/register or logout).
 *
 * This component leverages shadcn-ui’s Sheet for the slide-in panel, Lucide-React for
 * the menu icon, and Next.js Link/Image for navigation and logo display.
 *
 * @component
 */
export function MobileMenu() {
  /**
   * Controls whether the mobile sheet menu is open.
   */
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Trigger button to open the mobile menu */}
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open Menu">
            <Menu className="w-6 h-6 text-primary" />
          </Button>
        </SheetTrigger>

        {/* Side sheet content */}
        <SheetContent side="left" className="bg-neutral font-sans p-0">
          {/** Logo and close link */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="HalalBiye logo"
                width={30}
                height={30}
                className="rounded-2xl"
                priority
              />
              <span className="font-serif text-lg font-bold text-primary tracking-wide">
                HalalBiye
              </span>
            </Link>
          </div>

          {/** Navigation links */}
          <div className="flex-1 flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-base hover:text-primary transition"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/** Authentication buttons (Login/Register or Logout) */}
          <div className="flex flex-col gap-2 px-4 py-4 mt-auto w-full">
            <AuthButtons />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

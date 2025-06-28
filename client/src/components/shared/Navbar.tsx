"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// You can get isAuthenticated from context or props in a real app
export function Navbar({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [open, setOpen] = useState(false);

  // Main links to show in nav and in drawer
  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/profile", label: "My Profile" },
    { href: "/requests", label: "Requests" },
  ];

  return (
    <nav className="bg-neutral px-4 py-2 flex items-center justify-between shadow">
      {/* Logo + Site Name */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="HalalBiye logo"
            width={36}
            height={36}
            className="rounded-2xl"
            priority
          />
          <span className="font-serif text-xl font-bold text-primary tracking-wide">HalalBiye</span>
        </Link>
      </div>

      {/* Desktop Nav */}
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

        {!isAuthenticated ? (
          <>
            <Link href="/login">
              <Button variant="outline" className="ml-2">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="ml-2 bg-primary text-white">Register</Button>
            </Link>
          </>
        ) : (
          <Button variant="ghost" className="ml-2">Logout</Button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open Menu">
              <Menu className="w-6 h-6 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-neutral font-sans p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="HalalBiye logo"
                  width={30}
                  height={30}
                  className="rounded-2xl"
                />
                <span className="font-serif text-lg font-bold text-primary tracking-wide">HalalBiye</span>
              </Link>
              
            </div>
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
            {/* Auth buttons at bottom */}
            <div className="flex flex-col gap-2 px-4 py-4 mt-auto w-full">
              {!isAuthenticated ? (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-primary text-white">Register</Button>
                  </Link>
                </>
              ) : (
                <Button variant="ghost" className="w-full">Logout</Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

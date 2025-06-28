/**
 * RegisterPage.tsx
 *
 * This component renders the registration page for new users. It displays:
 * - A full-screen, subtle background image
 * - A white, rounded container with:
 *   • RegisterHeader (logo/title)
 *   • RegisterForm (email/password/name/etc. inputs)
 *   • A link to the login page for existing users
 *
 * It uses Next.js’s `Image` for optimized backgrounds and Shadcn UI classes
 * for styling. No props are required.
 */

"use client";

import Image from "next/image";
import { RegisterHeader } from "@/components/register/RegisterHeader";
import { RegisterForm } from "@/components/register/RegisterForm";

/**
 * RegisterPage
 *
 * @component
 * @returns {JSX.Element} The full registration page layout
 */
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative overflow-hidden">
      {/* Subtle background image for visual interest */}
      <Image
        src="/register.png"
        alt="Registration background"
        fill
        className="object-cover opacity-30 pointer-events-none select-none"
        priority
      />

      {/* Foreground card containing header, form, and login link */}
      <div className="relative z-10 min-w-[90vw] lg:min-w-3xl bg-white/95 rounded-2xl shadow-lg p-8 backdrop-blur-sm my-12 md:my-20">
        <RegisterHeader />

        {/* User registration form */}
        <RegisterForm />

        {/* Footer link for users who already have an account */}
        <div className="mt-6 text-center font-sans text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

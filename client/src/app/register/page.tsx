"use client";
import Image from "next/image";
import { RegisterHeader } from "@/components/register/RegisterHeader";
import { RegisterForm } from "@/components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative overflow-hidden">
      {/* Subtle background image, can use unsplash, svg, or your own illustration */}
      <Image
        src="/register.png"
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none select-none"
        priority
      />
      <div className="relative z-10  min-w-[90vw] lg:min-w-3xl bg-white/95 rounded-2xl shadow-lg p-8 backdrop-blur-sm my-12 md:my-20">
        <RegisterHeader />
        <RegisterForm />
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and Password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // If using cookies for auth
      });

      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          data = { message: await res.text() };
        }
        toast.error(data.message || "Login failed.");
        if (data.errorSources && Array.isArray(data.errorSources)) {
          data.errorSources.forEach((src: { path: string; message: string }) => {
            toast.error(src.path ? `${src.path}: ${src.message}` : src.message);
          });
        }
        setLoading(false);
        return;
      }

      toast.success("Login successful! Redirecting...");
      router.push("/profile"); // or your post-login route
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred.";
      if (err && typeof err === "object" && "message" in err) {
        errorMessage = (err as { message: string }).message;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary/30 via-neutral/60 to-accent/60 relative overflow-hidden">
      {/* Subtle background image */}
      <Image
        src="/login.png"
        alt=""
        fill
        className="object-cover opacity-30 pointer-events-none select-none"
        priority
      />
      <div className="">
        <div className="relative z-10 w-full mx-auto min-w-[90vw] lg:min-w-xl bg-white/95 rounded-2xl shadow-lg p-8 backdrop-blur-sm my-12 md:my-20">
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/logo.png"
              alt="HalalBiye logo"
              width={60}
              height={60}
              className="rounded-2xl mb-2"
              priority
            />
            <h1 className="text-2xl font-serif font-bold text-primary mb-1">Sign In</h1>
            <p className="text-base text-gray-500 mb-2 font-sans">Welcome back to HalalBiye!</p>
          </div>
          <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="">
              <Label htmlFor="email" className="mb-2 block font-medium">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Password */}
            <div className="">
              <Label htmlFor="password" className="mb-2 block font-medium">Password*</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="font-sans"
              />
            </div>
            {/* Button: spans both columns on desktop */}
            <div className="col-span-1 md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-primary text-white font-semibold mt-2"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center font-sans text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-primary underline">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

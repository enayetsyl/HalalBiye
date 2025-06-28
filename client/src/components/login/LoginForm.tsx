// components/login/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/lib/api";
import { ApiError } from "@/types/api";
import { TextInputField } from "./TextInputField";
import { Button } from "@/components/ui/button";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
      await loginUser(form.email, form.password);
      toast.success("Login successful! Redirecting…");
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("authChanged"));
      router.push("/profile");
    } catch (err) {
      const apiErr = err as ApiError;
      toast.error(apiErr.message);
      apiErr.errorSources?.forEach((src) =>
        toast.error(src.path ? `${src.path}: ${src.message}` : src.message)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <TextInputField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={form.email}
        onChange={handleChange}
      />
      <TextInputField
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={form.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full bg-primary text-white font-semibold mt-2"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
};

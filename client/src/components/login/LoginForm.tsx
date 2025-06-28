// components/login/LoginForm.tsx

/**
 * LoginForm component renders a controlled login form
 * with email and password fields. It handles input changes,
 * client-side validation, and form submission via the loginUser API.
 * On successful login, it updates the global auth state
 * (via localStorage and a custom event) and navigates to the profile page.
 *
 * @component
 * @returns {JSX.Element} The login form markup.
 */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/lib/api";
import { ApiError } from "@/types/api";
import { TextInputField } from "./TextInputField";
import { Button } from "@/components/ui/button";

export const LoginForm: React.FC = () => {
  // Router for navigating after successful login
  const router = useRouter();

  // Form state: email and password values
  const [form, setForm] = useState({ email: "", password: "" });

  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  /**
   * Handle changes on text inputs and update form state.
   *
   * @param e - Change event from the email or password input
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Handle form submission:
   * - Prevent default browser behavior
   * - Validate that both email and password are provided
   * - Call loginUser API helper
   * - On success: show toast, update auth flag, emit auth event, and redirect
   * - On error: display API error messages via toasts
   *
   * @param e - FormEvent from the login form
   */
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

      // Persist auth flag and notify listeners
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("authChanged"));

      // Navigate to the user's profile page
     setTimeout(() => {
  router.push('/profile'); 
}, 100); 
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

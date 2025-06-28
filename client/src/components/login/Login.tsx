"use client";

import { AuthLayout } from "./AuthLayout";
import { AuthHeader } from "./AuthHeader";
import { LoginForm } from "./LoginForm";
import Link from "next/link";
import { JSX } from "react";

/**
 * Login page component.
 *
 * Wraps the login form and header inside the shared authentication layout.
 * Displays a background image, logo, title, subtitle, and a link to register.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 *
 * @returns {JSX.Element} The rendered login page.
 */
const Login = (): JSX.Element => {
  return (
    <AuthLayout backgroundImage="/login.png">
      <AuthHeader
        logoSrc="/logo.png"
        logoAlt="HalalBiye logo"
        title="Sign In"
        subtitle="Welcome back to HalalBiye!"
      />
      <LoginForm />
      <div className="mt-6 text-center font-sans text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary underline">
          Register
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;

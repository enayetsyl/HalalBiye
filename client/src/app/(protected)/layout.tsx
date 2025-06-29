"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
 const { logout } = useAuth();
  useEffect(() => {
    // Only run on client side
    const token = localStorage.getItem("token");
    console.log('token', token)
    if (!token) {
      logout()
      router.replace("/login"); // replace so user can't go back
    }
  }, [router]);

  return <>{children}</>;
}

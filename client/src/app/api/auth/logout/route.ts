// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // Optionally: Call your backend to clear the cookie there too
  await fetch(`${process.env.BACKEND_URL}/api/v1/users/logout`, {
    method: "POST",
    credentials: "include", // for cross-origin session cookies
  });

  // Now remove the cookie on the frontend domain as well
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expire immediately
  });

  return response;
}

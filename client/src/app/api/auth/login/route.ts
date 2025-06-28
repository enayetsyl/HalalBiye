// app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Call your Express backend to authenticate user and get token
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    // Do NOT send credentials here, just get the JSON back
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // Get the JWT token from backend's response (either from data or from header)
  // If your Express API sends the token in the response body:
  const token = data.data?.token; // <== Make sure to include token in body when logging in!

  if (!token) {
    return NextResponse.json({ message: "No token returned from backend." }, { status: 500 });
  }

  // Set the cookie on the same domain as your Next.js app
  const response = NextResponse.json({ success: true, user: data.data });
  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

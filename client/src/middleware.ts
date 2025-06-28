// middleware.ts

/**
 * Middleware to protect certain routes by ensuring the user is authenticated.
 * If a request to a protected path does not include a valid JWT cookie named "token",
 * the user is redirected to the login page.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * List of URL path prefixes that require authentication.
 * Any route whose pathname starts with one of these will be checked.
 */
const PROTECTED_PATHS = ['/browse', '/profile', '/requests']

/**
 * Next.js middleware function that runs on every request matching the `matcher` config.
 *
 * @param req - The incoming Next.js request object
 * @returns A NextResponse that either continues (`next()`) or redirects to `/login`
 */
export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  // Only enforce auth on the specified protected paths
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    // Retrieve the JWT token from cookies; adjust the name if your cookie is named differently
    const token = req.cookies.get('token')?.value

    // If there's no token, redirect the user to the login page
    if (!token) {
      return NextResponse.redirect(`${origin}/login`)
    }
  }

  // If the path is not protected or a token exists, allow the request to proceed
  return NextResponse.next()
}

/**
 * Configuration object for this middleware.
 * The `matcher` field specifies which routes this middleware should apply to.
 */
export const config = {
  matcher: [
    '/browse/:path*',    // all subpaths under /browse
    '/profile/:path*',   // all subpaths under /profile
    '/requests/:path*',  // all subpaths under /requests
  ],
}

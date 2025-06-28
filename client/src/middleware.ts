// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// any route under these prefixes will be protected
const PROTECTED_PATHS = ['/browse', '/profile', '/requests']

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  // only run on our protected routes
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    // assume your JWT cookie is named "token" — adjust if yours is different
    const token = req.cookies.get('token')?.value

    if (!token) {
      // not logged in → redirect to /login
      return NextResponse.redirect(`${origin}/login`)
    }
  }

  // allow through
  return NextResponse.next()
}

export const config = {
  // match all sub-paths under /browse, /profile and /requests
  matcher: ['/browse/:path*', '/profile/:path*', '/requests/:path*'],
}

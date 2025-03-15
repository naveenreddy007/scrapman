import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Development-only middleware that doesn't check authentication
export async function middleware(req: NextRequest) {
  // Just pass through all requests without authentication checks
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
}


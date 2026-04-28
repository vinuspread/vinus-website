import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Edge-compatible lightweight check: verify Supabase session cookie exists.
// Full token validation happens in server components via lib/supabase/server.ts.
export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  const projectRef = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '')
    .replace('https://', '')
    .split('.')[0]

  // @supabase/ssr stores tokens as "sb-{ref}-auth-token" (may be chunked as ".0")
  const hasSession =
    request.cookies.has(`sb-${projectRef}-auth-token`) ||
    request.cookies.has(`sb-${projectRef}-auth-token.0`)

  if (!isLoginPage && !hasSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && hasSession) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}

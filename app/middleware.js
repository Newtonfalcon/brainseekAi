import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('auth-token')
  const { pathname } = request.nextUrl

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/message') || pathname.startsWith('/chat')
  
  // Define auth routes
  const isAuthRoute = pathname === '/login' || pathname === '/register'

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/message', request.url))
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|brainseek.jpg|vr-human.png).*)',
  ],
}
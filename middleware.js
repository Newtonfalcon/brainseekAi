import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Get authentication token from cookies
  // Adjust the cookie name based on what your backend sets
  const token = request.cookies.get('token') || request.cookies.get('connect.sid')
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register']
  
  // Define protected routes that require authentication
  const protectedRoutes = ['/message', '/chat']
  
  // Check if current path is a public route
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // Check if current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // If user is authenticated and trying to access login/register, redirect to message
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/message', request.url))
  }
  
  // If user is not authenticated and trying to access protected route, redirect to login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url)
    // Optional: Add a redirect query param to return user after login
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Allow the request to proceed
  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif).*)',
  ],
}
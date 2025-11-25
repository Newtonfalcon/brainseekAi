import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/message') || pathname.startsWith('/chat')
  
  // Define auth routes
  const isAuthRoute = pathname === '/login' || pathname === '/register'
  
  // Define public routes (allow these always)
  const isPublicRoute = pathname === '/' || 
                        pathname.startsWith('/_next') || 
                        pathname.startsWith('/api') ||
                        pathname.includes('.') // Allow static files

  // Allow public routes without checks
  if (isPublicRoute) {
    return NextResponse.next()
  }

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
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, brainseek.jpg, vr-human.png (static files)
     */
    '/((?!_next/static|_next/image|favicon.ico|brainseek.jpg|vr-human.png).*)',
  ],
}
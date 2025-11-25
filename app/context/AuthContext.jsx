'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import api from '../lib/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading') // Changed from 'pending'
  const [error, setError] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let isMounted = true

    const getUser = async () => {
      // Skip auth check on public pages
      if (pathname === '/' || pathname === '/login' || pathname === '/register') {
        setStatus('not authenticated')
        setIsInitialized(true)
        return
      }

      try {
        const res = await api.get('/auth/user')
        if (isMounted) {
          setUser(res.data)
          setStatus('authenticated')
        }
      } catch (err) {
        if (isMounted) {
          setUser(null)
          setStatus('not authenticated')
          
          // Only redirect if we're on a protected page
          const isProtectedPage = pathname?.startsWith('/message') || pathname?.startsWith('/chat')
          if (isProtectedPage && pathname !== '/login') {
            router.push('/login')
          }
        }
      } finally {
        if (isMounted) {
          setIsInitialized(true)
        }
      }
    }

    if (!isInitialized) {
      getUser()
    }

    return () => {
      isMounted = false
    }
  }, [pathname, isInitialized, router])

  const register = async (name, email, password) => {
    setStatus('pending')
    setError('')
    try {
      const res = await api.post('/auth/register', { name, email, password })
      setUser(res.data)
      setStatus('authenticated')
      router.push('/message')
    } catch (err) {
      setStatus('error')
      setError(err.response?.data?.error || err.message)
      throw err
    }
  }

  const login = async (email, password) => {
    setStatus('pending')
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      setUser(res.data)
      setStatus('authenticated')
      router.push('/message')
    } catch (err) {
      setStatus('error')
      setError(err.response?.data?.message || err.response?.data?.error || 'Login failed')
      throw err
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setUser(null)
      setStatus('not authenticated')
      setError('')
      router.push('/login')
    }
  }

  const value = { user, status, error, register, login, logout, isInitialized }

  // Don't render children until auth is initialized on protected pages
  const isProtectedPage = pathname?.startsWith('/message') || pathname?.startsWith('/chat')
  if (!isInitialized && isProtectedPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
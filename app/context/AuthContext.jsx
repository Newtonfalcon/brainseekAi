'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import api from '../lib/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('pending')
  const [error, setError] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let ignore = false

    const getUser = async () => {
      // Don't check auth on public pages
      const publicPages = ['/', '/login', '/register']
      if (publicPages.includes(pathname)) {
        setStatus('not authenticated')
        return
      }

      try {
        const res = await api.get('/auth/user')
        if (!ignore) {
          setUser(res.data)
          setStatus('authenticated')
        }
      } catch (err) {
        if (!ignore) {
          setUser(null)
          setStatus('not authenticated')
          // Middleware will handle the redirect, no need to do it here
        }
      }
    }

    getUser()

    return () => {
      ignore = true
    }
  }, [pathname])

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
    setUser(null)
    setStatus('not authenticated')
    setError('')

    try {
      await api.post('/auth/logout')
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const value = { user, status, error, register, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
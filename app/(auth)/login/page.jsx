'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, status, error } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get the redirect URL from query params
  const redirectTo = searchParams.get('redirect') || '/message'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      // Redirect to the intended page or default to /message
      router.push(redirectTo)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow py-5 px-8 border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl font-bold">
            BS
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-center mb-6">
          Login your BrainSeek Account
        </h1>

        {redirectTo !== '/message' && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            Please log in to continue
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'pending'}
            className="w-full py-3 mt-4 bg-black hover:bg-gray-900 text-white font-medium rounded-xl transition disabled:opacity-50"
          >
            {status === 'pending' ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-gray-600 text-center text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-black font-medium hover:underline">
            Register Here
          </Link>
        </p>

        {error && (
          <p className="text-red-600 text-sm text-center font-light py-2">{error}</p>
        )}
      </div>
    </div>
  )
}
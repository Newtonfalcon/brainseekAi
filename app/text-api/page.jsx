'use client'

import { useState } from 'react'
import api from '../lib/api'

export default function TestAPI() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testHealth = async () => {
    setLoading(true)
    setResult('Testing...')
    try {
      const response = await fetch('https://brainseekapi.onrender.com/health', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testRegister = async () => {
    setLoading(true)
    setResult('Testing registration...')
    try {
      const response = await api.post('/auth/register', {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'Test123456'
      })
      setResult(JSON.stringify(response.data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}\n${JSON.stringify(error.response?.data || {}, null, 2)}`)
    }
    setLoading(false)
  }

  const showConfig = () => {
    setResult(JSON.stringify({
      apiBaseURL: process.env.NEXT_PUBLIC_API_URL || 'https://brainseekapi.onrender.com/api',
      currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'SSR',
      apiDefault: api.defaults.baseURL,
      withCredentials: api.defaults.withCredentials
    }, null, 2))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
        
        <div className="space-y-4">
          <button
            onClick={showConfig}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show Configuration
          </button>

          <button
            onClick={testHealth}
            disabled={loading}
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Test Health Endpoint (No Auth)
          </button>

          <button
            onClick={testRegister}
            disabled={loading}
            className="w-full py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            Test Register Endpoint
          </button>

          <div className="mt-6">
            <h2 className="font-bold mb-2">Result:</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-96">
              {result || 'Click a button to test...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
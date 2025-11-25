import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://brainseekapi.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Add timeout to prevent hanging requests
  timeout: 30000 // 30 seconds
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Debug log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        method: config.method,
        url: config.url,
        baseURL: config.baseURL,
        withCredentials: config.withCredentials
      })
    }
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Debug log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url
      })
    }
    return response
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      })
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          // Clear any stale state
          localStorage.removeItem('user')
          window.location.href = '/login'
        }
      }
    } else if (error.request) {
      // Request was made but no response received (CORS/Network error)
      console.error('API Network Error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      })
      
      // This is likely your CORS error
      if (error.message === 'Network Error') {
        console.error('🔴 CORS or Network issue detected!')
        console.error('Check:')
        console.error('1. Backend CORS allows:', process.env.NEXT_PUBLIC_API_URL)
        console.error('2. Frontend origin:', typeof window !== 'undefined' ? window.location.origin : 'SSR')
        console.error('3. Backend is running and accessible')
      }
    } else {
      // Something else happened
      console.error('API Setup Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api
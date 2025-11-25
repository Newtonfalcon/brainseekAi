import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://brainseekapi.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
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
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      })
      
      // Handle 401 Unauthorized - but ONLY redirect if not already on auth pages
      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname
          
          // Only redirect to login if we're NOT already on an auth page
          if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
            localStorage.removeItem('user')
            window.location.href = '/login'
          }
        }
      }
    } else if (error.request) {
      console.error('API Network Error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      })
      
      if (error.message === 'Network Error') {
        console.error('🔴 CORS or Network issue detected!')
        console.error('Check:')
        console.error('1. Backend CORS allows:', process.env.NEXT_PUBLIC_API_URL)
        console.error('2. Frontend origin:', typeof window !== 'undefined' ? window.location.origin : 'SSR')
        console.error('3. Backend is running and accessible')
      }
    } else {
      console.error('API Setup Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [titles, setTitles] = useState([])
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await api.get('/chat')
        setTitles([...res?.data])
      } catch (error) {
        console.error('Failed to fetch chats:', error)
      }
    }
    fetchChats()
  }, [])

  const createChat = async (title) => {
    try {
      const res = await api.post('/chat', { title })
      const newId = res?.data._id
      setCurrentId(newId)
      
      // Update titles list
      setTitles(prev => [...prev, res.data])
      
      return newId
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message)
    }
  }

  return (
    <ChatContext.Provider value={{ createChat, titles, currentId, setTitles }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return context
}
'use client'

import { Menu, X, LogOut, MessageCircle, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const { titles } = useChat()
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  function shortUsername(name) {
    if (!name) return 'Us'
    if (name.length <= 2) return name
    return name.slice(0, 2)
  }

  async function handleLogout() {
    try {
      await logout()
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  function handleNewChat() {
    setIsOpen(false)
    router.push('/message')
  }

  const isActive = (path) => pathname === path

  return (
    <>
      <header className="fixed top-0 w-full bg-white/5 backdrop-blur-2xl z-30 flex items-center justify-between px-4 py-2 shadow-sm">
        <motion.button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {!isOpen ? <Menu size={22} /> : <X size={22} />}
        </motion.button>

        <h1 className="text-lg text-slate-700 font-semibold tracking-tight">
          BrainSeek
        </h1>

        <div className="text-green-700">
          <Link href="/message">
            <MessageCircle size={24} />
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="w-[80%] max-w-sm bg-gray-50 p-3 h-screen fixed top-12 left-0 z-20 shadow-lg overflow-hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full">
                {/* User Info */}
                <div className="flex flex-row gap-4 justify-between px-4 mb-4 text-gray-900 text-center items-center">
                  <div className="flex items-center gap-3">
                    <div className="animate-pulse text-white bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
                      {shortUsername(user?.name)}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                  >
                    <LogOut size={20} />
                  </button>
                </div>

                {/* New Chat Button */}
                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-2 w-full py-3 px-4 bg-black text-white rounded-lg mb-4 hover:bg-gray-800 transition"
                >
                  <Plus size={20} />
                  <span>New Chat</span>
                </button>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase px-4 mb-2">
                    Recent Chats
                  </h3>
                  <ul className="space-y-1">
                    {titles?.length > 0 ? (
                      titles.map((title, index) => (
                        <li key={title?._id || index}>
                          <Link
                            href={`/chat/${title?._id}`}
                            onClick={() => setIsOpen(false)}
                            className={`flex flex-row text-gray-800 font-medium py-3 px-4 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition ${
                              isActive(`/chat/${title?._id}`)
                                ? 'bg-gray-200'
                                : 'bg-transparent'
                            }`}
                          >
                            <span className="truncate">{title?.title}</span>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 text-sm px-4 py-2">
                        No chats yet. Start a new conversation!
                      </li>
                    )}
                  </ul>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    BrainSeek v1.0
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
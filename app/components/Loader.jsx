'use client'

import { motion } from 'framer-motion'

export default function NebulaLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer glow */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Middle layer */}
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.5, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Inner core */}
        <motion.div
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <p className="absolute mt-32 font-display text-white/90 text-sm opacity-60">
          Loading...
        </p>
      </div>
    </div>
  )
}
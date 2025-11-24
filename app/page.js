'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-32 py-10 min-h-screen w-full bg-black text-white">
      {/* LEFT SECTION */}
      <div className="max-w-xl z-10 text-center md:text-left space-y-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center md:justify-start gap-3"
        >
          <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center">
            <Image
              src="/brainseek.jpg"
              alt="Brainseek logo"
              width={40}
              height={40}
              className="rounded-md"
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-wide text-indigo-400">
            Brainseek
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
        >
          Your Academic AI Partner
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-gray-400 text-lg md:text-xl max-w-md mx-auto md:mx-0"
        >
          Brainseek helps students research, write, and perfect academic projects using the power of AI — smarter, faster, and effortlessly.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/register">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 mx-auto md:mx-0">
              Get Started <ArrowRight size={20} />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* RIGHT SECTION (VR IMAGE) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-12 md:mt-0"
      >
        <div className="relative w-[300px] md:w-[450px] lg:w-[550px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700/20 to-purple-500/10 blur-3xl rounded-full" />
          <Image
            src="/vr-human.png"
            alt="Human wearing VR headset"
            width={600}
            height={600}
            className="transform scale-x-[-1] relative rounded-2xl drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
          />
        </div>
      </motion.div>
    </section>
  )
}
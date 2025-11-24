import { Montserrat, Orbitron } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-poppin',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata = {
  title: 'BrainSeek — Intelligent Knowledge Search',
  description: 'BrainSeek — fast, intelligent knowledge search powered by AI. Discover information quickly with semantic search and real-time insights.',
  keywords: 'BrainSeek, AI search, semantic search, knowledge engine, research tools, intelligent discovery',
  openGraph: {
    title: 'BrainSeek',
    description: 'BrainSeek — fast, intelligent knowledge search powered by AI. Discover information quickly with semantic search and real-time insights.',
    url: 'https://brainseek.vercel.app/',
    siteName: 'BrainSeek',
    images: [
      {
        url: 'https://brainseek.vercel.app/brainseek.jpg',
        width: 1200,
        height: 630,
        alt: 'BrainSeek logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrainSeek — Intelligent Knowledge Search',
    description: 'Discover information instantly with BrainSeek\'s AI-enhanced semantic search.',
    images: ['https://brainseek.vercel.app/brainseek.jpg'],
  },
  icons: {
    icon: '/brainseek.jpg',
    apple: '/brainseek.jpg',
  },
  themeColor: '#0b5cff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${orbitron.variable}`}>
      <body className={montserrat.className}>
        <AuthProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
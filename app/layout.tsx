import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CodeStreak - Ücretsiz Kod Öğren',
  description: 'Etkileşimli dersler ve yol haritası ile programlama dillerini öğrenin. Python, JavaScript, TypeScript ve daha fazlası!',
  keywords: ['programlama öğren', 'kod öğren', 'ücretsiz programlama', 'python', 'javascript', 'türkçe programlama'],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

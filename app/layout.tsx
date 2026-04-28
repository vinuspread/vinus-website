import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/motion/LenisProvider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '디자인스튜디오 바이너스프레드',
    template: '%s | 바이너스프레드',
  },
  description: '웹 개발 및 디자인 전문 스튜디오, 맞춤형 웹사이트 제작과 창의적인 디자인 솔루션 제공',
  metadataBase: new URL('https://vinus.co.kr'),
  openGraph: {
    siteName: '바이너스프레드',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}

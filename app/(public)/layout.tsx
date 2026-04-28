import { Geist, Geist_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/motion/LenisProvider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}>
      <LenisProvider>
        <Header />
        <main className="flex-1" style={{ paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
        <Footer />
      </LenisProvider>
    </div>
  )
}

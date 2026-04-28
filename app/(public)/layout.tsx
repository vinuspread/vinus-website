import localFont from 'next/font/local'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/motion/LenisProvider'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
})

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${pretendard.variable} ${pretendard.className} min-h-full flex flex-col antialiased`}>
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

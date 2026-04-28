import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/motion/LenisProvider'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col antialiased">
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

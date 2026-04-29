import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/motion/LenisProvider'
import { CursorProvider } from '@/components/ui/CustomCursor'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <div className="flex flex-col antialiased">
        <LenisProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </div>
    </CursorProvider>
  )
}

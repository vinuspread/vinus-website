import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Cursor } from '@/components/layout/Cursor'
import { SmoothScroll } from '@/components/common/SmoothScroll'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Header />
      {children}
      <Footer />
    </>
  )
}

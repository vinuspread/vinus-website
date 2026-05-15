import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/common/CustomCursor'
import { SmoothScroll } from '@/components/common/SmoothScroll'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

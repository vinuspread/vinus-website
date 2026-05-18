import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/common/CustomCursor'
import { SmoothScroll } from '@/components/common/SmoothScroll'
import { PageTransition } from '@/components/common/PageTransition'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <PageTransition />
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

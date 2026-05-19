import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/common/CustomCursor'
import { SmoothScroll } from '@/components/common/SmoothScroll'
// [개발팀 추가] ui-design 동기화 후 복원 필요: PageTransition import + JSX 사용
import { PageTransition } from '@/components/common/PageTransition'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {/* [개발팀 추가] ui-design 동기화 후 복원 필요 */}
      <PageTransition />
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

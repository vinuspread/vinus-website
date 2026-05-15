import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Cursor } from '@/components/layout/Cursor'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <Header />
      {children}
      <Footer />
    </>
  )
}

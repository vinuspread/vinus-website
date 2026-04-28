import localFont from 'next/font/local'
import Sidebar from '@/components/admin/Sidebar'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
})

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${pretendard.variable} ${pretendard.className} bg-white flex min-h-screen min-w-[1024px]`}>
      <Sidebar />
      <main className="flex-1 px-12 py-10 overflow-auto">{children}</main>
    </div>
  )
}

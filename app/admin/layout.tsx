import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white flex min-h-screen min-w-[1024px]">
      <Sidebar />
      <main className="flex-1 px-12 py-10 overflow-x-clip">{children}</main>
    </div>
  )
}

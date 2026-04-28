import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AdminsManager from '@/components/admin/AdminsManager'

export default async function AdminAdminsPage() {
  const [authClient, adminSupabase] = await Promise.all([
    createClient(),
    Promise.resolve(createAdminClient()),
  ])

  const { data: { user } } = await authClient.auth.getUser()
  const { data: { users } } = await adminSupabase.auth.admin.listUsers()

  const adminUsers = (users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? '',
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
  }))

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Admins</h1>
      <AdminsManager users={adminUsers} currentUserId={user?.id ?? ''} />
    </div>
  )
}

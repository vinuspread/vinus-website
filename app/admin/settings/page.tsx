import { createClient } from '@/lib/supabase/server'
import SettingsEditor from '@/components/admin/SettingsEditor'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('settings')
    .select('key, value')
    .order('key', { ascending: true })

  const entries = (rows ?? []).map((r) => ({
    key: r.key as string,
    value: (r.value ?? '') as string,
  }))

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Settings</h1>
      <SettingsEditor initialEntries={entries} />
    </div>
  )
}

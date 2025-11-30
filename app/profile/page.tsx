import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfilePageClient } from './profile-page-client'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <ProfilePageClient user={user} />
}

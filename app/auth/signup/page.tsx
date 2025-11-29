import { redirect } from 'next/navigation'

export default function SignupPage() {
  // 此頁面改為純粹轉回首頁，實際註冊體驗在 SiteHeader 的 Dialog 中處理
  redirect('/')
}


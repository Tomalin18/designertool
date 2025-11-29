import { redirect } from 'next/navigation'

export default function LoginPage() {
  // 此頁面改為純粹轉回首頁，實際登入體驗在 SiteHeader 的 Dialog 中處理
  redirect('/')
}


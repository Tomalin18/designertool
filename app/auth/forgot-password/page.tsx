import { redirect } from 'next/navigation'

export default function ForgotPasswordPage() {
  // 忘記密碼流程現在從 Header 的 Login Dialog 觸發，這裡僅作備援導回首頁
  redirect('/')
}


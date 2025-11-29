'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const forgotPasswordSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件地址'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

interface ForgotPasswordFormProps {
  onSwitchToLogin?: () => void
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const supabase = createClient()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        toast.error('發送失敗', {
          description: error.message,
        })
        return
      }

      setIsSubmitted(true)
      toast.success('已發送重設密碼郵件', {
        description: '請檢查您的電子郵件信箱',
      })
    } catch (error) {
      toast.error('發生錯誤', {
        description: '請稍後再試',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">檢查您的電子郵件</h1>
          <p className="text-muted-foreground">
            我們已發送重設密碼連結至您的電子郵件信箱
          </p>
        </div>
        <div className="text-center">
          {onSwitchToLogin ? (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:underline"
            >
              返回登入頁面
            </button>
          ) : (
            <Link href="/auth/login" className="text-primary hover:underline">
              返回登入頁面
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">忘記密碼</h1>
        <p className="text-muted-foreground">
          請輸入您的電子郵件地址，我們將發送重設密碼連結給您
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>電子郵件</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  我們將發送重設密碼連結至這個電子郵件地址
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            發送重設密碼連結
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline"
          >
            返回登入頁面
          </button>
        ) : (
          <Link href="/auth/login" className="text-primary hover:underline">
            返回登入頁面
          </Link>
        )}
      </div>
    </div>
  )
}


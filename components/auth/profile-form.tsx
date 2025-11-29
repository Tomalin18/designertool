'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '@supabase/supabase-js'

const profileSchema = z.object({
  email: z.string().email('請輸入有效的電子郵件地址').optional(),
  fullName: z.string().min(2, '姓名至少需要 2 個字元').optional().or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: User | null
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || '',
      fullName: '',
    },
  })

  useEffect(() => {
    if (user) {
      form.setValue('email', user.email || '')
      // 可以從 user_metadata 或其他地方載入 fullName
      form.setValue('fullName', user.user_metadata?.full_name || '')
    }
  }, [user, form])

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: data.fullName,
        },
      })

      if (error) {
        toast.error('更新失敗', {
          description: error.message,
        })
        return
      }

      toast.success('個人資料已更新')
    } catch (error) {
      toast.error('發生錯誤', {
        description: '請稍後再試',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>個人資料</CardTitle>
        <CardDescription>更新您的個人資訊</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || ''} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{user?.user_metadata?.full_name || '未設定'}</p>
              {(() => {
                const isPaid =
                  (user?.user_metadata as any)?.is_paid === true ||
                  (user?.user_metadata as any)?.isPaid === true ||
                  (user?.user_metadata as any)?.is_pro === true ||
                  (user?.user_metadata as any)?.plan === "pro" ||
                  (user?.user_metadata as any)?.plan === "paid" ||
                  (user?.user_metadata as any)?.tier === "pro" ||
                  (user?.user_metadata as any)?.tier === "paid"

                return (
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${isPaid
                      ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                      : "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20"
                    }`}>
                    {isPaid ? "Pro Member" : "Free Plan"}
                  </span>
                )
              })()}
            </div>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
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
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    電子郵件地址無法修改
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="請輸入您的姓名"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              儲存變更
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


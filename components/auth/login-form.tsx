'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
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
} from '@/components/ui/form'
import { Github, Chrome, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSwitchToSignup?: () => void
  onSwitchToForgotPassword?: () => void
  onSuccess?: () => void
}

export function LoginForm({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onSuccess,
}: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setAuthError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        const raw = error.message || 'Sign in failed'
        // 轉成對使用者比較友善、訊息更完整的說明
        const friendly =
          raw.includes('Invalid login credentials')
            ? 'Invalid email or password. Make sure this email is registered, the password is correct, or try signing in with Google/GitHub if you created your account with social login.'
            : raw

        setAuthError(friendly)
        toast.error('Sign in failed', {
          description: friendly,
        })
        return
      }

      toast.success('Signed in successfully')

      // 如果有外部 onSuccess（例如 Dialog），讓父層決定關閉或更新 UI
      if (onSuccess) {
        onSuccess()
      } else {
        // 預設：導回首頁並 refresh
        router.push('/')
        router.refresh()
      }
    } catch (error: any) {
      const raw = error?.message || 'Something went wrong'
      const friendly =
        raw.includes('Invalid login credentials')
          ? 'Invalid email or password. Make sure this email is registered, the password is correct, or try signing in with Google/GitHub if you created your account with social login.'
          : raw

      setAuthError(friendly)
      toast.error('Something went wrong', {
        description: friendly,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        const raw = error.message || 'Sign in failed'
        const friendly =
          raw.includes('Invalid login credentials')
            ? 'Login failed. If you originally signed up with email and password, please use the email form. If you created your account with Google or GitHub, make sure you are using the same provider.'
            : raw

        setAuthError(friendly)
        toast.error('Sign in failed', {
          description: friendly,
        })
        setIsLoading(false)
      }
    } catch (error: any) {
      const raw = error?.message || 'Something went wrong'
      const friendly =
        raw.includes('Invalid login credentials')
          ? 'Login failed. If you originally signed up with email and password, please use the email form. If you created your account with Google or GitHub, make sure you are using the same provider.'
          : raw

      setAuthError(friendly)
      toast.error('Something went wrong', {
        description: friendly,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Sign in to your account to continue</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {authError && (
            <p className="text-sm text-red-500">
              {authError}
            </p>
          )}

          <div className="flex items-center justify-between">
            {onSwitchToForgotPassword ? (
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </button>
            ) : (
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('github')}
          disabled={isLoading}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Don&apos;t have an account?</span>{' '}
        {onSwitchToSignup ? (
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-primary hover:underline"
          >
            Sign up
          </button>
        ) : (
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        )}
      </div>
    </div>
  )
}


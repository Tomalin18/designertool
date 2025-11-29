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
import { Github, Chrome, Loader2, Mail, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type SignupFormValues = z.infer<typeof signupSchema>

interface SignupFormProps {
  onSwitchToLogin?: () => void
  onSuccess?: () => void
}

export function SignupForm({ onSwitchToLogin, onSuccess }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [waitingForVerification, setWaitingForVerification] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState<string>('')
  const [isCheckingVerification, setIsCheckingVerification] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.error('Sign up failed', {
          description: error.message,
        })
        return
      }

      // 註冊成功後，切換到「等待驗證」狀態，不立刻關閉 Dialog
      setRegisteredEmail(data.email)
      setWaitingForVerification(true)
      
      toast.info('Verification email sent', {
        description: `We've sent a verification email to ${data.email}. Please check your inbox (including spam folder).`,
      })
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later',
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
        toast.error('Sign in failed', {
          description: error.message,
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later',
      })
      setIsLoading(false)
    }
  }

  const handleCheckVerification = async () => {
    setIsCheckingVerification(true)
    try {
      // 重新取得最新的 session 和 user 資料
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        toast.error('Failed to check verification status', {
          description: sessionError.message,
        })
        return
      }

      if (!session?.user) {
        toast.warning('Not signed in', {
          description: 'Please make sure you clicked the verification link in your email.',
        })
        return
      }

      // 檢查 email 是否已驗證
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        toast.error('Failed to check verification status', {
          description: userError.message,
        })
        return
      }

      // Supabase 的 email_confirmed_at 欄位表示 email 是否已驗證
      const isEmailConfirmed = user.email_confirmed_at !== null

      if (isEmailConfirmed) {
        toast.success('Email verified successfully!', {
          description: 'Your account has been activated. You can now sign in.',
        })
        
        // 驗證成功：關閉 Dialog 或執行成功回呼
        if (onSuccess) {
          onSuccess()
        } else if (onSwitchToLogin) {
          onSwitchToLogin()
        } else {
          router.push('/')
        }
      } else {
        toast.warning('Email not verified yet', {
          description: 'Please make sure you clicked the verification link in your email. If you already did, wait a moment and try again.',
        })
      }
    } catch (error: any) {
      toast.error('Something went wrong', {
        description: error?.message || 'Please try again later',
      })
    } finally {
      setIsCheckingVerification(false)
    }
  }

  // 如果正在等待驗證，顯示「等待驗證信」的 UI
  if (waitingForVerification) {
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-muted-foreground">
              We've sent a verification email to
            </p>
            <p className="font-medium text-foreground">{registeredEmail}</p>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
          <div className="space-y-2 text-sm">
            <p className="font-medium">Next steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Open your email inbox (check spam or promotions folder if needed)</li>
              <li>Click the verification link in the email</li>
              <li>Come back here and click the button below</li>
            </ol>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleCheckVerification}
          disabled={isCheckingVerification}
          className="w-full"
        >
          {isCheckingVerification ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              I've verified my email
            </>
          )}
        </Button>

        {onSwitchToLogin && (
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setWaitingForVerification(false)
                setRegisteredEmail('')
                if (onSwitchToLogin) {
                  onSwitchToLogin()
                }
              }}
              className="text-primary hover:underline"
            >
              Back to sign in
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">Enter your details to get started</p>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
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
        <span className="text-muted-foreground">Already have an account?</span>{' '}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline"
          >
            Sign in
          </button>
        ) : (
          <Link href="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        )}
      </div>
    </div>
  )
}


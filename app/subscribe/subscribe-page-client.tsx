"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Crown, Loader2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { PricingCard } from "@/components/customize/cards"
import { SidebarNav } from "@/components/sidebar-nav"
import { componentsData } from "@/lib/components-data"
import { buttonSections } from "@/lib/button-sections"
import { cardSections } from "@/lib/card-sections"
import { badgeSections } from "@/lib/badge-sections"
import { inputSections } from "@/lib/input-sections"
import { dialogSections } from "@/lib/dialog-sections"
import { toggleSections } from "@/lib/toggle-sections"
import { tabsSections } from "@/lib/tabs-sections"
import { sidebarSections } from "@/lib/sidebar-sections"
import { tabbarSections } from "@/lib/tabbar-sections"
import { sheetSections } from "@/lib/sheet-sections"
import { tableSections } from "@/lib/table-sections"
import { chartSections } from "@/lib/chart-sections"
import { heroSections } from "@/lib/hero-sections"
import { featureSections } from "@/lib/feature-sections"
import { paymentSections } from "@/lib/payment-sections"
import { ctaSections } from "@/lib/cta-sections"
import { footerSections } from "@/lib/footer-sections"
import { headerSections } from "@/lib/header-sections"

interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  period: 'month' | 'year' | 'forever'
  features: string[]
  popular?: boolean
  stripePriceId?: string
  stripeProductId?: string
}

interface PricingPlan extends Product {
  icon: React.ReactNode
  buttonText: string
  buttonVariant: "default" | "outline"
  displayPrice: string
}

const getIcon = (id: string) => {
  if (id.includes('enterprise')) return <Crown className="h-6 w-6" />
  if (id.includes('pro')) return <Zap className="h-6 w-6" />
  return <Sparkles className="h-6 w-6" />
}

const formatPrice = (price: number, currency: string, period: string): string => {
  if (price === 0 && period === 'forever') return 'Free'
  if (price === 0) return 'Custom'

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  return formattedPrice
}

export function SubscribePageClient() {
  const { user, loading: authLoading } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/products')

        const data = await response.json()

        // 檢查是否有錯誤訊息
        if (data.error) {
          console.error('API Error:', data.error, data.message)
          toast.error('Configuration Error', {
            description: data.message || data.error,
          })
          setProducts([])
          return
        }

        setProducts(data.products || [])

        // 如果沒有商品，顯示提示
        if (!data.products || data.products.length === 0) {
          console.warn('No products returned from API')
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        toast.error('Failed to load products', {
          description: error instanceof Error ? error.message : 'Please check your console for details.',
        })
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // 判斷用戶是否為付費用戶
  const isPaidUser =
    !!user &&
    (
      (user.user_metadata as any)?.is_paid === true ||
      (user.user_metadata as any)?.isPaid === true ||
      (user.user_metadata as any)?.is_pro === true ||
      (user.user_metadata as any)?.plan === "pro" ||
      (user.user_metadata as any)?.plan === "paid" ||
      (user.user_metadata as any)?.tier === "pro" ||
      (user.user_metadata as any)?.tier === "paid"
    )

  // 轉換 API 商品資料為顯示用的方案格式
  const plans: PricingPlan[] = products.map((product) => ({
    ...product,
    icon: getIcon(product.id),
    displayPrice: formatPrice(product.price, product.currency, product.period),
    buttonText: product.id === 'enterprise'
      ? 'Contact Sales'
      : product.id === 'free'
        ? 'Current Plan'
        : `Try ${product.name}`,
    buttonVariant: product.id === 'free' || product.id === 'enterprise'
      ? 'outline'
      : 'default',
  }))

  const handleSubscribe = async (planId: string, stripePriceId?: string) => {
    if (!user) {
      toast.error("Please sign in first", {
        description: "You need to be signed in to subscribe to a plan.",
      })
      return
    }

    setIsProcessing(true)
    setSelectedPlan(planId)

    try {
      if (planId === "enterprise") {
        toast.info("Contact our sales team", {
          description: "We'll reach out to you shortly to discuss enterprise options.",
        })
        return
      }

      if (planId === "free") {
        toast.info("You're already on the free plan")
        return
      }

      // 呼叫後端 API 創建支付會話
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: stripePriceId,
          planId: planId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const data = await response.json()

      if (data.checkoutUrl) {
        // 導向支付頁面
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again later or contact support.",
      })
    } finally {
      setIsProcessing(false)
      setSelectedPlan(null)
    }
  }

  // Premium components that require paid subscription
  const premiumComponents = ["MediaPlayer", "ChatInterface"]

  // Check if a component is premium
  const isPremiumComponent = (name: string) => premiumComponents.includes(name)

  // Build component list for sidebar
  const rawCustomComponents = [
    {
      name: "MediaPlayer",
      href: "/components/media-player",
      category: "Card",
    },
    {
      name: "ChatInterface",
      href: "/components/chat-interface",
      category: "Card",
    },
    ...buttonSections.map(button => ({
      name: button.name,
      href: `/components/${button.slug}`,
      category: "Button",
    })),
    ...cardSections.map(card => ({
      name: card.name,
      href: `/components/${card.slug}`,
      category: "Card",
    })),
    ...badgeSections.map(badge => ({
      name: badge.name,
      href: `/components/${badge.slug}`,
      category: "Badge",
    })),
    ...inputSections.map(input => ({
      name: input.name,
      href: `/components/${input.slug}`,
      category: "Input",
    })),
    ...dialogSections.map(dialog => ({
      name: dialog.name,
      href: `/components/${dialog.slug}`,
      category: "Dialog",
    })),
    ...toggleSections.map(toggle => ({
      name: toggle.name,
      href: `/components/${toggle.slug}`,
      category: "Toggle",
    })),
    ...tabsSections.map(tab => ({
      name: tab.name,
      href: `/components/${tab.slug}`,
      category: "Tabs",
    })),
    ...sidebarSections.map(sidebar => ({
      name: sidebar.name,
      href: `/components/${sidebar.slug}`,
      category: "Sidebar",
    })),
    ...tabbarSections.map(tabbar => ({
      name: tabbar.name,
      href: `/components/${tabbar.slug}`,
      category: "Tabbar",
    })),
    ...sheetSections.map(sheet => ({
      name: sheet.name,
      href: `/components/${sheet.slug}`,
      category: "Sheet",
    })),
    ...tableSections.map(table => ({
      name: table.name,
      href: `/components/${table.slug}`,
      category: "Table",
    })),
    ...chartSections.map(chart => ({
      name: chart.name,
      href: `/components/${chart.slug}`,
      category: "Chart",
    })),
    ...componentsData.map(component => ({
      name: component.name,
      href: component.href,
      category: component.category,
    })),
    ...heroSections.map(hero => ({
      name: hero.name,
      href: `/components/${hero.slug}`,
      category: "Hero",
    })),
    ...featureSections.map(feature => ({
      name: feature.name,
      href: `/components/${feature.slug}`,
      category: "Feature",
    })),
    ...paymentSections.map(payment => ({
      name: payment.name,
      href: `/components/${payment.slug}`,
      category: "Payment",
    })),
    ...ctaSections.map(cta => ({
      name: cta.name,
      href: `/components/${cta.slug}`,
      category: "CTA",
    })),
    ...footerSections.map(footer => ({
      name: footer.name,
      href: `/components/${footer.slug}`,
      category: "Footer",
    })),
    ...headerSections.map(header => ({
      name: header.name,
      href: `/components/${header.slug}`,
      category: "Header",
    })),
  ]

  // Deduplicate components by href to avoid "duplicate key" errors
  const customComponents = Array.from(
    new Map(rawCustomComponents.map((item) => [item.href, item])).values()
  )

  // Group components by category
  const componentsByCategory = customComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = []
    }
    acc[component.category].push(component)
    return acc
  }, {} as Record<string, typeof customComponents>)

  // Build sidebar items with premium indicators
  const sidebarItems = Object.entries(componentsByCategory)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, components]) => ({
      title: category,
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=${encodeURIComponent(category)}`,
          isPremium: false,
        },
        ...components
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((component) => ({
            title: component.name,
            href: component.href,
            isPremium: isPremiumComponent(component.name),
          })),
      ],
    }))

  if (isLoading || authLoading) {
    return (
      <div className="w-full flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
            <SidebarNav items={sidebarItems} />
          </div>
        </aside>
        <div className="py-8 md:py-12 w-full">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="w-full flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
            <SidebarNav items={sidebarItems} />
          </div>
        </aside>
        <div className="py-8 md:py-12 w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">No Plans Available</h1>
            <p className="text-xl text-muted-foreground">
              Please configure your payment provider (e.g., Stripe) to display subscription plans.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
          <SidebarNav items={sidebarItems} />
        </div>
      </aside>

      <div className="py-8 md:py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Unlock the full potential of our component library
          </p>
        </div>

        <div className={cn(
          "grid gap-8 mb-12",
          plans.length === 1 ? "grid-cols-1 max-w-md mx-auto" :
            plans.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" :
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === "free" && !isPaidUser
            const isUserPlan = plan.id === "pro" && isPaidUser

            // 格式化價格顯示
            const displayPrice = plan.price === 0 && plan.period === 'forever'
              ? 0
              : plan.price

            // 格式化週期顯示
            let periodDisplay = ""
            if (plan.period === 'month') {
              periodDisplay = "/mo"
            } else if (plan.period === 'year') {
              periodDisplay = "/yr"
            } else if (plan.period === 'forever' && plan.price === 0) {
              periodDisplay = ""
            }

            // 決定按鈕文字
            let buttonText = plan.buttonText
            if (isProcessing && selectedPlan === plan.id) {
              buttonText = "Processing..."
            } else if (isCurrentPlan) {
              buttonText = "Current Plan"
            } else if (isUserPlan) {
              buttonText = "Active Plan"
            }

            return (
              <div key={plan.id} className={cn("relative", plan.popular && "md:scale-105")}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <PricingCard
                  planName={plan.name}
                  price={displayPrice}
                  period={periodDisplay}
                  features={plan.features}
                  buttonText={buttonText}
                  accentColor={plan.popular ? "#6366f1" : "#6366f1"}
                  buttonColor={isCurrentPlan || isUserPlan ? "#6b7280" : (plan.popular ? "#6366f1" : "#6366f1")}
                  className={cn(
                    "transition-all hover:scale-105"
                  )}
                  onClick={() => {
                    if (!isCurrentPlan && !isUserPlan && !isProcessing) {
                      handleSubscribe(plan.id, plan.stripePriceId)
                    }
                  }}
                  disabled={isCurrentPlan || isUserPlan || isProcessing}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


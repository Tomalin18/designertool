"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Crown, Loader2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
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
import { isComponentPremium } from "@/lib/component-access"

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const status = searchParams.get("status")
    const plan = searchParams.get("plan")

    if (status === "success") {
      toast.success("Subscription Successful!", {
        description: "Thank you for subscribing. Your account has been upgraded.",
        duration: 5000,
      })

      // Refresh session to update user metadata
      const refreshSession = async () => {
        await supabase.auth.refreshSession()
        // Wait a bit for the toast to be seen
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }

      refreshSession()
    } else if (status === "cancelled") {
      toast.info("Subscription Cancelled", {
        description: "You have not been charged.",
      })
    }
  }, [searchParams, router, supabase.auth])

  useEffect(() => {
    const fetchProducts = async () => {
      // ... (rest of the fetchProducts logic)
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

      // Find the selected plan to determine the mode
      const plan = plans.find(p => p.id === planId)
      const isSubscription = plan?.period === 'month' || plan?.period === 'year'
      const mode = isSubscription ? 'subscription' : 'payment'

      // 呼叫後端 API 創建支付會話
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: stripePriceId,
          planId: planId,
          mode: mode,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Checkout API Error:', errorData)
        throw new Error(errorData.message || errorData.error || 'Failed to create checkout session')
      }

      const data = await response.json()

      if (data.checkoutUrl) {
        // 導向支付頁面
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error("Subscription failed", {
        description: error instanceof Error ? error.message : "Please try again later or contact support.",
      })
    } finally {
      setIsProcessing(false)
      setSelectedPlan(null)
    }
  }

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

  const customComponents = Array.from(
    new Map(rawCustomComponents.map((item) => [item.href, item])).values()
  )

  const getSpecialComponents = () => {
    return customComponents.filter(c =>
      c.name === "MediaPlayer" ||
      c.name === "ChatInterface" ||
      c.name === "SocialProfileCard" ||
      c.name === "GlassAuthForm"
    )
  }

  const getButtonComponents = () => customComponents.filter(c => c.category === "Button")
  const getCardComponents = () => customComponents.filter(c => c.category === "Card")
  const getInputComponents = () => customComponents.filter(c => c.category === "Input")
  const getDialogComponents = () => customComponents.filter(c => c.category === "Dialog")
  const getToggleComponents = () => customComponents.filter(c => c.category === "Toggle")
  const getTabsComponents = () => customComponents.filter(c => c.category === "Tabs")
  const getSidebarComponents = () => customComponents.filter(c => c.category === "Sidebar")
  const getTabbarComponents = () => customComponents.filter(c => c.category === "Tabbar")
  const getBadgeComponents = () => customComponents.filter(c => c.category === "Badge")
  const getSheetComponents = () => customComponents.filter(c => c.category === "Sheet")
  const getTableComponents = () => customComponents.filter(c => c.category === "Table")
  const getChartComponents = () => customComponents.filter(c => c.category === "Chart")

  const sectionsByType = {
    header: headerSections,
    hero: heroSections,
    feature: featureSections,
    payment: paymentSections,
    cta: ctaSections,
    footer: footerSections,
  } as const

  type SectionType = keyof typeof sectionsByType

  const getSectionComponentsByType = (type: SectionType) => {
    const sections = sectionsByType[type] || []
    return sections.map(section => ({
      name: section.name,
      href: `/components/${section.slug}`,
      category: type,
    }))
  }

  const toSidebarItem = (
    component: { name: string; href: string; category?: string }
  ) => ({
    title: component.name,
    href: component.href,
    isPremium: isComponentPremium(component.name, component.category),
  })

  const sidebarItems = [
    {
      title: "Special",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Special`,
          count: getSpecialComponents().length,
        },
        ...getSpecialComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Button",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Button`,
          count: getButtonComponents().length,
        },
        ...getButtonComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Card",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Card`,
          count: getCardComponents().length,
        },
        ...getCardComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Badge",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Badge`,
          count: componentsData.filter(c => c.name === "Badge").length + getBadgeComponents().length,
        },
        ...componentsData.filter(c => c.name === "Badge").map((component) => toSidebarItem(component)),
        ...getBadgeComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Input",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Input`,
          count: getInputComponents().length,
        },
        ...getInputComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Dialog",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Dialog`,
          count: componentsData.filter(c => c.name === "Dialog").length + getDialogComponents().length,
        },
        ...componentsData.filter(c => c.name === "Dialog").map((component) => toSidebarItem(component)),
        ...getDialogComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Toggle",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Toggle`,
          count: getToggleComponents().length,
        },
        ...getToggleComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Tabs",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Tabs`,
          count: componentsData.filter(c => c.name === "Tabs").length + getTabsComponents().length,
        },
        ...componentsData.filter(c => c.name === "Tabs").map((component) => toSidebarItem(component)),
        ...getTabsComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Sidebar",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Sidebar`,
          count: getSidebarComponents().length,
        },
        ...getSidebarComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Tabbar",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Tabbar`,
          count: getTabbarComponents().length,
        },
        ...getTabbarComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Sheet",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Sheet`,
          count: getSheetComponents().length,
        },
        ...getSheetComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Table",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Table`,
          count: getTableComponents().length,
        },
        ...getTableComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Chart",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=components&category=Chart`,
          count: getChartComponents().length,
        },
        ...getChartComponents().map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Header",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=section&category=Header`,
          count: getSectionComponentsByType("header").length,
        },
        ...getSectionComponentsByType("header").map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Hero",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=section&category=Hero`,
          count: getSectionComponentsByType("hero").length,
        },
        ...getSectionComponentsByType("hero").map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Feature",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=section&category=Feature`,
          count: getSectionComponentsByType("feature").length,
        },
        ...getSectionComponentsByType("feature").map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Payment",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=section&category=Payment`,
          count: getSectionComponentsByType("payment").length,
        },
        ...getSectionComponentsByType("payment").map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "CTA",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=section&category=CTA`,
          count: getSectionComponentsByType("cta").length,
        },
        ...getSectionComponentsByType("cta").map((component) => toSidebarItem(component)),
      ],
    },
    {
      title: "Footer",
      href: "/components",
      items: [
        {
          title: "All",
          href: `/components?tab=section&category=Footer`,
          count: getSectionComponentsByType("footer").length,
        },
        ...getSectionComponentsByType("footer").map((component) => toSidebarItem(component)),
      ],
    },
  ]

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


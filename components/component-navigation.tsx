"use client"

import { useState, MouseEvent as ReactMouseEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { heroSections } from "@/lib/hero-sections"
import { featureSections } from "@/lib/feature-sections"
import { paymentSections } from "@/lib/payment-sections"
import { ctaSections } from "@/lib/cta-sections"
import { footerSections } from "@/lib/footer-sections"
import { headerSections } from "@/lib/header-sections"
import { buttonSections } from "@/lib/button-sections"
import { cardSections } from "@/lib/card-sections"
import { badgeSections } from "@/lib/badge-sections"
import { inputSections } from "@/lib/input-sections"
import { toggleSections } from "@/lib/toggle-sections"
import { tabsSections } from "@/lib/tabs-sections"
import { sidebarSections } from "@/lib/sidebar-sections"
import { tabbarSections } from "@/lib/tabbar-sections"
import { sheetSections } from "@/lib/sheet-sections"
import { tableSections } from "@/lib/table-sections"
import { chartSections } from "@/lib/chart-sections"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { isComponentPremium } from "@/lib/component-access"

interface ComponentNavigationProps {
  currentSlug: string
  heroMeta?: typeof heroSections[number]
  featureMeta?: typeof featureSections[number]
  paymentMeta?: typeof paymentSections[number]
  ctaMeta?: typeof ctaSections[number]
  footerMeta?: typeof footerSections[number]
  headerMeta?: typeof headerSections[number]
  buttonMeta?: typeof buttonSections[number]
  cardMeta?: typeof cardSections[number]
  badgeMeta?: typeof badgeSections[number]
  inputMeta?: typeof inputSections[number]
  toggleMeta?: typeof toggleSections[number]
  tabsMeta?: typeof tabsSections[number]
  sidebarMeta?: typeof sidebarSections[number]
  tabbarMeta?: typeof tabbarSections[number]
  sheetMeta?: typeof sheetSections[number]
  tableMeta?: typeof tableSections[number]
  chartMeta?: typeof chartSections[number]
}

export function ComponentNavigation({
  currentSlug,
  heroMeta,
  featureMeta,
  paymentMeta,
  ctaMeta,
  footerMeta,
  headerMeta,
  buttonMeta,
  cardMeta,
  badgeMeta,
  inputMeta,
  toggleMeta,
  tabsMeta,
  sidebarMeta,
  tabbarMeta,
  sheetMeta,
  tableMeta,
  chartMeta,
}: ComponentNavigationProps) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)

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

  // Determine which section array to use
  let currentSection: typeof heroSections[number] | undefined
  let sectionArray: typeof heroSections | typeof featureSections | typeof paymentSections | typeof ctaSections | typeof footerSections | typeof headerSections | typeof buttonSections | typeof cardSections | typeof badgeSections | typeof inputSections | typeof toggleSections | typeof tabsSections | typeof sidebarSections | typeof tabbarSections | typeof sheetSections | typeof tableSections | typeof chartSections
  let sectionCategory: string | undefined

  if (heroMeta) {
    currentSection = heroMeta
    sectionArray = heroSections
    sectionCategory = "Hero"
  } else if (featureMeta) {
    currentSection = featureMeta
    sectionArray = featureSections
    sectionCategory = "Feature"
  } else if (paymentMeta) {
    currentSection = paymentMeta
    sectionArray = paymentSections
    sectionCategory = "Payment"
  } else if (ctaMeta) {
    currentSection = ctaMeta
    sectionArray = ctaSections
    sectionCategory = "CTA"
  } else if (footerMeta) {
    currentSection = footerMeta
    sectionArray = footerSections
    sectionCategory = "Footer"
  } else if (headerMeta) {
    currentSection = headerMeta
    sectionArray = headerSections
    sectionCategory = "Header"
  } else if (buttonMeta) {
    currentSection = buttonMeta
    sectionArray = buttonSections
    sectionCategory = "Button"
  } else if (cardMeta) {
    currentSection = cardMeta
    sectionArray = cardSections
    sectionCategory = "Card"
  } else if (badgeMeta) {
    currentSection = badgeMeta
    sectionArray = badgeSections
    sectionCategory = "Badge"
  } else if (inputMeta) {
    currentSection = inputMeta
    sectionArray = inputSections
    sectionCategory = "Input"
  } else if (toggleMeta) {
    currentSection = toggleMeta
    sectionArray = toggleSections
    sectionCategory = "Toggle"
  } else if (tabsMeta) {
    currentSection = tabsMeta
    sectionArray = tabsSections
    sectionCategory = "Tabs"
  } else if (sidebarMeta) {
    currentSection = sidebarMeta
    sectionArray = sidebarSections
    sectionCategory = "Sidebar"
  } else if (tabbarMeta) {
    currentSection = tabbarMeta
    sectionArray = tabbarSections
    sectionCategory = "Tabbar"
  } else if (sheetMeta) {
    currentSection = sheetMeta
    sectionArray = sheetSections
    sectionCategory = "Sheet"
  } else if (tableMeta) {
    currentSection = tableMeta
    sectionArray = tableSections
    sectionCategory = "Table"
  } else if (chartMeta) {
    currentSection = chartMeta
    sectionArray = chartSections
    sectionCategory = "Chart"
  } else {
    return null
  }

  // Find current index
  const currentIndex = sectionArray.findIndex((item) => item.slug === currentSlug)
  
  if (currentIndex === -1) return null

  // Get previous and next components
  const prevComponent = currentIndex > 0 ? sectionArray[currentIndex - 1] : null
  const nextComponent = currentIndex < sectionArray.length - 1 ? sectionArray[currentIndex + 1] : null

  const handleNavigation = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    targetSlug: string,
    targetName: string
  ) => {
    event.preventDefault()

    if (loading) {
      return
    }

    if (!user) {
      setAuthMode("login")
      setAuthDialogOpen(true)
      return
    }

    const targetIsPremium = isComponentPremium(targetName, sectionCategory)
    if (targetIsPremium && !isPaidUser) {
      setUpgradeDialogOpen(true)
      return
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
    router.push(`/components/${targetSlug}`)
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 pt-4 mt-6 border-t">
        {prevComponent ? (
          <Link
            href={`/components/${prevComponent.slug}`}
            scroll={true}
            onClick={(event) => handleNavigation(event, prevComponent.slug, prevComponent.name)}
          >
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm font-medium">{prevComponent.name}</span>
            </Button>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextComponent ? (
          <Link
            href={`/components/${nextComponent.slug}`}
            className={prevComponent ? "" : "ml-auto"}
            scroll={true}
            onClick={(event) => handleNavigation(event, nextComponent.slug, nextComponent.name)}
          >
            <Button variant="outline" className="flex items-center gap-2">
              <span className="text-sm font-medium">{nextComponent.name}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {authMode === "login" ? "Sign in to view this component" : "Create an account to view this component"}
            </DialogTitle>
          </DialogHeader>
          {authMode === "login" ? (
            <LoginForm
              onSwitchToSignup={() => setAuthMode("signup")}
              onSuccess={() => {
                setAuthDialogOpen(false)
                setAuthMode("login")
              }}
            />
          ) : (
            <SignupForm
              onSwitchToLogin={() => setAuthMode("login")}
              onSuccess={() => {
                setAuthDialogOpen(false)
                setAuthMode("login")
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent
          className="max-w-md border-0 bg-transparent p-0 shadow-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Premium Access Required</DialogTitle>
          <div className="w-full max-w-sm rounded-xl border border-red-900/50 bg-neutral-900 p-6 shadow-2xl shadow-red-900/20">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-900/30 text-red-500">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Premium Access Required</h3>
                <p className="mt-1 text-base text-neutral-400">
                  This component is only available for premium members. Please upgrade your account to unlock this feature.
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className="flex-1 rounded-lg border border-neutral-800 bg-transparent py-2.5 text-base font-medium text-white hover:bg-neutral-800"
                onClick={() => setUpgradeDialogOpen(false)}
              >
                Maybe Later
              </button>
              <button
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-base font-bold text-white hover:bg-red-500"
                onClick={() => {
                  setUpgradeDialogOpen(false)
                  window.scrollTo({ top: 0, behavior: 'instant' })
                  router.push('/subscribe')
                }}
              >
                Upgrade Account
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


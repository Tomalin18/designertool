"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
}: ComponentNavigationProps) {
  // Determine which section array to use
  let currentSection: typeof heroSections[number] | undefined
  let sectionArray: typeof heroSections | typeof featureSections | typeof paymentSections | typeof ctaSections | typeof footerSections | typeof headerSections | typeof buttonSections | typeof cardSections | typeof badgeSections | typeof inputSections | typeof toggleSections | typeof tabsSections | typeof sidebarSections

  if (heroMeta) {
    currentSection = heroMeta
    sectionArray = heroSections
  } else if (featureMeta) {
    currentSection = featureMeta
    sectionArray = featureSections
  } else if (paymentMeta) {
    currentSection = paymentMeta
    sectionArray = paymentSections
  } else if (ctaMeta) {
    currentSection = ctaMeta
    sectionArray = ctaSections
  } else if (footerMeta) {
    currentSection = footerMeta
    sectionArray = footerSections
  } else if (headerMeta) {
    currentSection = headerMeta
    sectionArray = headerSections
  } else if (buttonMeta) {
    currentSection = buttonMeta
    sectionArray = buttonSections
  } else if (cardMeta) {
    currentSection = cardMeta
    sectionArray = cardSections
  } else if (badgeMeta) {
    currentSection = badgeMeta
    sectionArray = badgeSections
  } else if (inputMeta) {
    currentSection = inputMeta
    sectionArray = inputSections
  } else if (toggleMeta) {
    currentSection = toggleMeta
    sectionArray = toggleSections
  } else if (tabsMeta) {
    currentSection = tabsMeta
    sectionArray = tabsSections
  } else if (sidebarMeta) {
    currentSection = sidebarMeta
    sectionArray = sidebarSections
  } else {
    return null
  }

  // Find current index
  const currentIndex = sectionArray.findIndex((item) => item.slug === currentSlug)
  
  if (currentIndex === -1) return null

  // Get previous and next components
  const prevComponent = currentIndex > 0 ? sectionArray[currentIndex - 1] : null
  const nextComponent = currentIndex < sectionArray.length - 1 ? sectionArray[currentIndex + 1] : null

  return (
    <div className="flex items-center justify-between gap-4 pt-4 mt-6 border-t">
      {prevComponent ? (
        <Link href={`/components/${prevComponent.slug}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm font-medium">{prevComponent.name}</span>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      
      {nextComponent ? (
        <Link href={`/components/${nextComponent.slug}`} className={prevComponent ? "" : "ml-auto"}>
          <Button variant="outline" className="flex items-center gap-2">
            <span className="text-sm font-medium">{nextComponent.name}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}


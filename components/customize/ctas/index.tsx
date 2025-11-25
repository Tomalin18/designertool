"use client"

import React, { useState } from "react"
import {
  ArrowRight,
  Mail,
  Download,
  Smartphone,
  Github,
  CheckCircle2,
  Play,
  Zap,
  MessageCircle,
  Clock,
  Shield,
  Gift,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ctaSections } from "@/lib/cta-sections"
import { ShinyButton } from "@/components/customize/ShinyButton"

type CtaDefinition = (typeof ctaSections)[number]
export type CtaSlug = CtaDefinition["slug"]

export const ctaDefaultProps: Record<CtaSlug, Record<string, string | number | boolean>> =
  ctaSections.reduce((acc, cta) => {
    acc[cta.slug] = Object.fromEntries(
      Object.entries(cta.props).map(([key, definition]) => [key, definition.default])
    )
    return acc
  }, {} as Record<CtaSlug, Record<string, string | number | boolean>>)

// --- 1. Simple Centered CTA ---
export interface SimpleCenteredCtaProps {
  heading?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  showSecondaryButton?: boolean
  backgroundColor?: string
  headingColor?: string
  descriptionColor?: string
}
export function SimpleCenteredCta({
  heading = "Ready to get started?",
  description = "Join thousands of developers building the future with Lumina. Free forever for personal projects.",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Contact Sales",
  showSecondaryButton = true,
  backgroundColor = "#0a0a0a",
  headingColor = "#ffffff",
  descriptionColor = "#a3a3a3",
}: SimpleCenteredCtaProps) {
  return (
    <div className="py-24 px-6 text-center" style={{ backgroundColor }}>
      <h2 className="text-4xl font-bold mb-6" style={{ color: headingColor }}>
        {heading}
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-lg" style={{ color: descriptionColor }}>
        {description}
      </p>
      <div className="flex justify-center gap-4">
        <ShinyButton>{primaryButtonText}</ShinyButton>
        {showSecondaryButton && (
          <ShinyButton variant="outline">{secondaryButtonText}</ShinyButton>
        )}
      </div>
    </div>
  )
}

// --- 2. Split Image CTA ---
export interface SplitImageCtaProps {
  heading?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  imageUrl?: string
  backgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  primaryButtonBackgroundColor?: string
  primaryButtonTextColor?: string
  secondaryButtonBorderColor?: string
  secondaryButtonTextColor?: string
  secondaryButtonHoverBackgroundColor?: string
}
export function SplitImageCta({
  heading = "Transform your workflow.",
  description = "Stop wasting time on repetitive tasks. Automate your entire process with our AI-driven pipelines.",
  primaryButtonText = "Start Now",
  secondaryButtonText = "Learn More",
  imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
  backgroundColor = "#ffffff",
  headingColor = "#171717",
  descriptionColor = "#525252",
  primaryButtonBackgroundColor = "#000000",
  primaryButtonTextColor = "#ffffff",
  secondaryButtonBorderColor = "#e5e5e5",
  secondaryButtonTextColor = "#171717",
  secondaryButtonHoverBackgroundColor = "#fafafa",
}: SplitImageCtaProps) {
  return (
    <div style={{ backgroundColor }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-12 lg:p-24">
          <h2 className="text-3xl font-bold mb-4" style={{ color: headingColor }}>
            {heading}
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: descriptionColor }}>
            {description}
          </p>
          <div className="flex gap-4">
            <button
              className="rounded-full px-8 py-3 font-bold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: primaryButtonBackgroundColor, color: primaryButtonTextColor }}
            >
              {primaryButtonText}
            </button>
            <button
              className="rounded-full border px-8 py-3 font-bold transition-colors"
              style={{ 
                borderColor: secondaryButtonBorderColor,
                color: secondaryButtonTextColor,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryButtonHoverBackgroundColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {secondaryButtonText}
            </button>
          </div>
        </div>
        <div
          className="h-64 lg:h-auto bg-neutral-100 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      </div>
    </div>
  )
}

// --- 3. Glow Gradient CTA ---
export interface GlowGradientCtaProps {
  heading?: string
  highlightText?: string
  description?: string
  buttonText?: string
  backgroundColor?: string
  glowColor?: string
  gradientFromColor?: string
  gradientToColor?: string
  headingColor?: string
  descriptionColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  buttonGradientFromColor?: string
  buttonGradientToColor?: string
}
export function GlowGradientCta({
  heading = "Unleash the Power.",
  highlightText = "Power.",
  description = "The most advanced UI kit on the market.",
  buttonText = "Get Access",
  backgroundColor = "#000000",
  glowColor = "#4f46e5",
  gradientFromColor = "#818cf8",
  gradientToColor = "#22d3ee",
  headingColor = "#ffffff",
  descriptionColor = "#818cf8",
  buttonBackgroundColor = "#0f172a",
  buttonTextColor = "#ffffff",
  buttonGradientFromColor = "#E2CBFF",
  buttonGradientToColor = "#393BB2",
}: GlowGradientCtaProps) {
  const renderHeading = () => {
    if (!highlightText) return <span style={{ color: headingColor }}>{heading}</span>
    const index = heading.toLowerCase().indexOf(highlightText.toLowerCase())
    if (index === -1) return <span style={{ color: headingColor }}>{heading}</span>
    const before = heading.slice(0, index)
    const match = heading.slice(index, index + highlightText.length)
    const after = heading.slice(index + highlightText.length)
    return (
      <>
        <span style={{ color: headingColor }}>{before}</span>
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: `linear-gradient(to right, ${gradientFromColor}, ${gradientToColor})` }}
        >
          {match}
        </span>
        <span style={{ color: headingColor }}>{after}</span>
      </>
    )
  }

  return (
    <div className="relative overflow-hidden py-24 px-6 text-center" style={{ backgroundColor }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ backgroundColor: `${glowColor}4d` }}
      />
      <div className="relative z-10">
        <h2 className="text-5xl font-black mb-6 tracking-tight">
          {renderHeading()}
        </h2>
        <p className="text-xl mb-10" style={{ color: descriptionColor }}>
          {description}
        </p>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span 
            className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
            style={{ 
              background: `conic-gradient(from 90deg at 50% 50%, ${buttonGradientFromColor} 0%, ${buttonGradientToColor} 50%, ${buttonGradientFromColor} 100%)`
            }}
          />
          <span 
            className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium backdrop-blur-3xl"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            {buttonText}
          </span>
        </button>
      </div>
    </div>
  )
}

// --- 4. App Store CTA ---
export interface AppStoreCtaProps {
  heading?: string
  description?: string
  showAppStore?: boolean
  showGooglePlay?: boolean
  backgroundColor?: string
  cardBackgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  buttonBorderColor?: string
  cardBorderColor?: string
}
export function AppStoreCta({
  heading = "Take it with you.",
  description = "Download our mobile app for iOS and Android.",
  showAppStore = true,
  showGooglePlay = true,
  backgroundColor = "#1a1a1a",
  cardBackgroundColor = "#262626",
  headingColor = "#ffffff",
  descriptionColor = "#a3a3a3",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
  buttonBorderColor = "#404040",
  cardBorderColor = "#404040",
}: AppStoreCtaProps) {
  return (
    <div className="py-20 px-6" style={{ backgroundColor }}>
      <div
        className="mx-auto max-w-4xl rounded-3xl p-12 text-center md:text-left md:flex md:items-center md:justify-between border"
        style={{ backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: headingColor }}>
            {heading}
          </h2>
          <p className="mb-8 md:mb-0" style={{ color: descriptionColor }}>
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {showAppStore && (
            <button 
              className="flex items-center gap-3 rounded-xl px-4 py-2 border transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: buttonBackgroundColor, 
                color: buttonTextColor,
                borderColor: buttonBorderColor
              }}
            >
              <Smartphone size={24} />
              <div className="text-left">
                <div className="text-[10px] uppercase">Download on the</div>
                <div className="text-sm font-bold leading-none">App Store</div>
              </div>
            </button>
          )}
          {showGooglePlay && (
            <button 
              className="flex items-center gap-3 rounded-xl px-4 py-2 border transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: buttonBackgroundColor, 
                color: buttonTextColor,
                borderColor: buttonBorderColor
              }}
            >
              <Play size={24} className="fill-current" />
              <div className="text-left">
                <div className="text-[10px] uppercase">Get it on</div>
                <div className="text-sm font-bold leading-none">Google Play</div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// --- 5. Newsletter Bar CTA ---
export interface NewsletterBarCtaProps {
  heading?: string
  description?: string
  placeholder?: string
  buttonText?: string
  backgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  inputBackgroundColor?: string
  inputBorderColor?: string
  inputTextColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
}
export function NewsletterBarCta({
  heading = "Stay in the loop",
  description = "Get the latest updates and resources sent to your inbox weekly.",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  backgroundColor = "#4f46e5",
  headingColor = "#ffffff",
  descriptionColor = "#c7d2fe",
  inputBackgroundColor = "#ffffff",
  inputBorderColor = "#e5e7eb",
  inputTextColor = "#171717",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
}: NewsletterBarCtaProps) {
  return (
    <div className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold" style={{ color: headingColor }}>
            {heading}
          </h2>
          <p style={{ color: descriptionColor }}>{description}</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input
            type="email"
            placeholder={placeholder}
            className="w-full md:w-64 rounded-lg px-4 py-3 text-sm outline-none shadow-lg"
            style={{ 
              backgroundColor: inputBackgroundColor,
              borderColor: inputBorderColor,
              color: inputTextColor,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          />
          <button 
            className="rounded-lg px-6 py-3 font-bold hover:opacity-90 shadow-lg whitespace-nowrap transition-opacity"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- 6. Card Overlay CTA ---
export interface CardOverlayCtaProps {
  heading?: string
  description?: string
  buttonText?: string
  footerText?: string
  backgroundImage?: string
  cardBackgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  footerTextColor?: string
  buttonBackgroundColor?: string
  overlayColor?: string
  overlayOpacity?: number
  buttonTextColor?: string
}
export function CardOverlayCta({
  heading = "Start your free trial today",
  description = "No credit card required. 14-day free trial on all premium plans.",
  buttonText = "Create Account",
  footerText = "By signing up, you agree to our Terms.",
  backgroundImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  cardBackgroundColor = "#ffffff",
  headingColor = "#171717",
  descriptionColor = "#525252",
  footerTextColor = "#a3a3a3",
  buttonBackgroundColor = "#4f46e5",
  overlayColor = "#000000",
  overlayOpacity = 50,
  buttonTextColor = "#ffffff",
}: CardOverlayCtaProps) {
  const overlayOpacityHex = Math.round((overlayOpacity / 100) * 255).toString(16).padStart(2, '0')
  
  return (
    <div
      className="relative h-[400px] flex items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div 
        className="absolute inset-0 backdrop-blur-sm" 
        style={{ backgroundColor: `${overlayColor}${overlayOpacityHex}` }}
      />
      <div className="relative z-10 max-w-lg w-full rounded-2xl p-8 text-center shadow-2xl" style={{ backgroundColor: cardBackgroundColor }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: headingColor }}>{heading}</h2>
        <p className="mb-8" style={{ color: descriptionColor }}>{description}</p>
        <button
          className="w-full rounded-lg py-3 font-bold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonText}
        </button>
        <p className="mt-4 text-xs" style={{ color: footerTextColor }}>{footerText}</p>
      </div>
    </div>
  )
}

// --- 7. Developer Terminal CTA ---
export interface DeveloperTerminalCtaProps {
  heading?: string
  command?: string
  footnote?: string
  showGithubLink?: boolean
  showDocsLink?: boolean
  backgroundColor?: string
  terminalBackgroundColor?: string
  headingColor?: string
  promptColor?: string
  commandTextColor?: string
  footnoteColor?: string
  linkColor?: string
  linkHoverColor?: string
  terminalBorderColor?: string
  buttonColor?: string
}
export function DeveloperTerminalCta({
  heading = "Install in seconds",
  command = "npm install @lumina/ui",
  footnote = "Requires React 18+ and Tailwind CSS",
  showGithubLink = true,
  showDocsLink = true,
  backgroundColor = "#000000",
  terminalBackgroundColor = "#0d1117",
  headingColor = "#ffffff",
  promptColor = "#22c55e",
  commandTextColor = "#ffffff",
  footnoteColor = "#a3a3a3",
  linkColor = "#a3a3a3",
  linkHoverColor = "#ffffff",
  terminalBorderColor = "#404040",
  buttonColor = "#a3a3a3",
}: DeveloperTerminalCtaProps) {
  return (
    <div className="py-24 px-6 font-mono" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-8" style={{ color: headingColor }}>
          {heading}
        </h2>
        <div
          className="mx-auto max-w-lg rounded-xl border p-6 text-left shadow-2xl"
          style={{ backgroundColor: terminalBackgroundColor, borderColor: terminalBorderColor }}
        >
          <div className="flex gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg border" style={{ borderColor: terminalBorderColor }}>
            <code className="text-sm" style={{ color: commandTextColor }}>
              <span style={{ color: promptColor }}>$</span> {command}
            </code>
            <button className="transition-colors" style={{ color: buttonColor }}>
              <CheckCircle2 size={16} />
            </button>
          </div>
          <div className="mt-4 text-xs text-center" style={{ color: footnoteColor }}>{footnote}</div>
        </div>
        <div className="mt-8 flex justify-center gap-6">
          {showGithubLink && (
            <a 
              href="#" 
              className="flex items-center gap-2 transition-colors"
              style={{ color: linkColor }}
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
            >
              <Github size={18} /> View on GitHub
            </a>
          )}
          {showDocsLink && (
            <a 
              href="#" 
              className="flex items-center gap-2 transition-colors"
              style={{ color: linkColor }}
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
            >
              <MessageCircle size={18} /> Read Docs
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// --- 8. SaaS Peek CTA ---
export interface SaasPeekCtaProps {
  heading?: string
  description?: string
  buttonText?: string
  backgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  previewBorderColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  previewBackgroundColor?: string
}
export function SaasPeekCta({
  heading = "Master your analytics.",
  description = "Get a bird's eye view of your entire operation with our customizable dashboard.",
  buttonText = "Try Demo",
  backgroundColor = "#171717",
  headingColor = "#ffffff",
  descriptionColor = "#a3a3a3",
  previewBorderColor = "#404040",
  buttonBackgroundColor = "#6366f1",
  buttonTextColor = "#ffffff",
  previewBackgroundColor = "#171717",
}: SaasPeekCtaProps) {
  return (
    <div className="pt-24 px-6 overflow-hidden" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: headingColor }}>
          {heading}
        </h2>
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: descriptionColor }}>
          {description}
        </p>
        <ShinyButton className="mb-12" style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}>{buttonText}</ShinyButton>

        <div
          className="relative mx-auto max-w-3xl rounded-t-2xl border-x border-t p-2 shadow-2xl"
          style={{ borderColor: previewBorderColor, backgroundColor: previewBackgroundColor }}
        >
          <div
            className="h-64 w-full rounded-t-xl border"
            style={{ backgroundColor: previewBackgroundColor, borderColor: `${previewBorderColor}80` }}
          />
        </div>
      </div>
    </div>
  )
}

// --- 9. Social Proof CTA ---
export interface SocialProofCtaProps {
  heading?: string
  description?: string
  buttonText?: string
  avatarCount?: number
  backgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  avatarBorderColor?: string
}
export function SocialProofCta({
  heading = "Join 10,000+ designers",
  description = "See why leading design teams choose Lumina for their systems.",
  buttonText = "Get Started for Free",
  avatarCount = 5,
  backgroundColor = "#ffffff",
  headingColor = "#171717",
  descriptionColor = "#525252",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
  avatarBorderColor = "#ffffff",
}: SocialProofCtaProps) {
  return (
    <div className="py-24 px-6 text-center" style={{ backgroundColor }}>
      <div className="flex justify-center -space-x-4 mb-6">
        {[...Array(avatarCount)].map((_, i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/100?img=${i + 20}`}
            className="h-12 w-12 rounded-full border-4"
            style={{ borderColor: avatarBorderColor }}
            alt="User"
          />
        ))}
      </div>
      <h2 className="text-3xl font-bold mb-4" style={{ color: headingColor }}>
        {heading}
      </h2>
      <p className="mb-8" style={{ color: descriptionColor }}>
        {description}
      </p>
      <button
        className="rounded-full px-8 py-3 font-bold shadow-lg hover:-translate-y-1 transition-transform"
        style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
      >
        {buttonText}
      </button>
    </div>
  )
}

// --- 10. Countdown CTA ---
export interface CountdownCtaProps {
  badgeText?: string
  heading?: string
  buttonText?: string
  days?: string
  hours?: string
  minutes?: string
  seconds?: string
  gradientFromColor?: string
  gradientToColor?: string
  badgeBackgroundColor?: string
  badgeTextColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  timeUnitBackgroundColor?: string
  timeUnitTextColor?: string
}
export function CountdownCta({
  badgeText = "Limited Time Offer",
  heading = "Black Friday Sale",
  buttonText = "Claim 50% Off",
  days = "02",
  hours = "14",
  minutes = "45",
  seconds = "12",
  gradientFromColor = "#dc2626",
  gradientToColor = "#e11d48",
  badgeBackgroundColor = "#ffffff",
  badgeTextColor = "#ffffff",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#dc2626",
  timeUnitBackgroundColor = "#ffffff",
  timeUnitTextColor = "#ffffff",
}: CountdownCtaProps) {
  const timeUnits = [
    { val: days, label: "Days" },
    { val: hours, label: "Hours" },
    { val: minutes, label: "Mins" },
    { val: seconds, label: "Secs" },
  ]

  return (
    <div
      className="py-16 px-6 text-white text-center"
      style={{ backgroundImage: `linear-gradient(to right, ${gradientFromColor}, ${gradientToColor})` }}
    >
      <div 
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6"
        style={{ backgroundColor: `${badgeBackgroundColor}33`, color: badgeTextColor }}
      >
        <Clock size={14} /> {badgeText}
      </div>
      <h2 className="text-4xl font-black mb-8 uppercase italic">{heading}</h2>

      <div className="flex justify-center gap-4 mb-10">
        {timeUnits.map((t, i) => (
          <div key={i} className="flex flex-col items-center">
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold backdrop-blur-sm"
              style={{ backgroundColor: `${timeUnitBackgroundColor}33`, color: timeUnitTextColor }}
            >
              {t.val}
            </div>
            <span className="mt-2 text-xs font-medium opacity-80">{t.label}</span>
          </div>
        ))}
      </div>

      <button 
        className="px-8 py-3 rounded-lg font-bold hover:opacity-90 shadow-xl transition-opacity" 
        style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
      >
        {buttonText}
      </button>
    </div>
  )
}

// --- 11. Pricing Teaser CTA ---
export interface PricingTeaserCtaProps {
  heading?: string
  priceText?: string
  priceDescription?: string
  feature1?: string
  feature2?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  headingColor?: string
  priceTextColor?: string
  priceDescriptionColor?: string
  featureTextColor?: string
  featureIconColor?: string
  secondaryButtonBorderColor?: string
  secondaryButtonTextColor?: string
  secondaryButtonHoverBackgroundColor?: string
}
export function PricingTeaserCta({
  heading = "Simple, transparent pricing.",
  priceText = "$19/mo",
  priceDescription = "Plans start at just",
  feature1 = "No setup fees",
  feature2 = "14-day trial",
  primaryButtonText = "View Pricing",
  secondaryButtonText = "Talk to Sales",
  backgroundColor = "#fafafa",
  cardBackgroundColor = "#ffffff",
  accentColor = "#4f46e5",
  headingColor = "#171717",
  priceTextColor = "#171717",
  priceDescriptionColor = "#737373",
  featureTextColor = "#525252",
  featureIconColor = "#22c55e",
  secondaryButtonBorderColor = "#e5e5e5",
  secondaryButtonTextColor = "#525252",
  secondaryButtonHoverBackgroundColor = "#fafafa",
}: PricingTeaserCtaProps) {
  return (
    <div className="py-20 px-6" style={{ backgroundColor }}>
      <div
        className="mx-auto max-w-5xl rounded-3xl p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ backgroundColor: cardBackgroundColor }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: headingColor }}>{heading}</h2>
          <p className="text-lg" style={{ color: priceDescriptionColor }}>
            {priceDescription} <span className="font-bold" style={{ color: priceTextColor }}>{priceText}</span>. Cancel anytime.
          </p>
          <div className="mt-6 flex gap-4 text-sm" style={{ color: featureTextColor }}>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} style={{ color: featureIconColor }} /> {feature1}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} style={{ color: featureIconColor }} /> {feature2}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button
            className="rounded-xl px-8 py-4 font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accentColor, boxShadow: `0 10px 25px -5px ${accentColor}40` }}
          >
            {primaryButtonText}
          </button>
          <button 
            className="rounded-xl border px-8 py-4 font-bold transition-colors"
            style={{ 
              borderColor: secondaryButtonBorderColor,
              color: secondaryButtonTextColor,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = secondaryButtonHoverBackgroundColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- 12. Video Background CTA ---
export interface VideoBackgroundCtaProps {
  heading?: string
  buttonText?: string
  backgroundImage?: string
  overlayColor?: string
  headingColor?: string
  overlayOpacity?: number
  buttonBackgroundColor?: string
  buttonTextColor?: string
  buttonBorderColor?: string
  playIconColor?: string
}
export function VideoBackgroundCta({
  heading = "See it in action.",
  buttonText = "Watch Showreel",
  backgroundImage = "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
  overlayColor = "#312e81",
  headingColor = "#ffffff",
  overlayOpacity = 20,
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#ffffff",
  buttonBorderColor = "#ffffff",
  playIconColor = "#312e81",
}: VideoBackgroundCtaProps) {
  const overlayOpacityHex = Math.round((overlayOpacity / 100) * 255).toString(16).padStart(2, '0')
  
  return (
    <div className="relative py-32 px-6 text-center overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }}>
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          style={{ 
            backgroundImage: `url('${backgroundImage}')`,
            opacity: overlayOpacity / 100
          }}
        />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-6" style={{ color: headingColor }}>
          {heading}
        </h2>
        <button 
          className="group relative flex items-center justify-center gap-4 backdrop-blur-md rounded-full px-8 py-4 hover:opacity-90 transition-all border mx-auto"
          style={{ 
            backgroundColor: `${buttonBackgroundColor}1a`,
            color: buttonTextColor,
            borderColor: `${buttonBorderColor}33`
          }}
        >
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white group-hover:scale-110 transition-transform"
            style={{ color: playIconColor }}
          >
            <Play size={16} fill="currentColor" className="ml-0.5" />
          </div>
          <span className="font-bold">{buttonText}</span>
        </button>
      </div>
    </div>
  )
}

// --- 13. Community CTA ---
export interface CommunityCtaProps {
  heading?: string
  description?: string
  buttonText?: string
  statCount?: number
  backgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  statCardBackgroundColor?: string
  statCardTextColor?: string
  statCardLabelColor?: string
}
export function CommunityCta({
  heading = "Join the Community",
  description = "Connect with 50,000+ developers, share your work, and get help from the team.",
  buttonText = "Join Discord Server",
  statCount = 4,
  backgroundColor = "#5865F2",
  headingColor = "#ffffff",
  descriptionColor = "#c7d2fe",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#5865F2",
  statCardBackgroundColor = "#ffffff",
  statCardTextColor = "#ffffff",
  statCardLabelColor = "#c7d2fe",
}: CommunityCtaProps) {
  return (
    <div className="py-20 px-6 text-center" style={{ backgroundColor, color: headingColor }}>
      <h2 className="text-3xl font-bold mb-4">{heading}</h2>
      <p className="mb-8 max-w-xl mx-auto" style={{ color: descriptionColor }}>
        {description}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
        {[...Array(statCount)].map((_, i) => (
          <div 
            key={i} 
            className="rounded-xl p-4 backdrop-blur-sm"
            style={{ backgroundColor: `${statCardBackgroundColor}1a` }}
          >
            <div className="text-2xl font-bold" style={{ color: statCardTextColor }}>{12 + i}k</div>
            <div className="text-xs opacity-80" style={{ color: statCardLabelColor }}>
              Online Now
            </div>
          </div>
        ))}
      </div>
      <button
        className="px-8 py-3 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all"
        style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
      >
        {buttonText}
      </button>
    </div>
  )
}

// --- 14. Brutalist CTA ---
export interface BrutalistCtaProps {
  line1?: string
  line2?: string
  line3?: string
  buttonText?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  buttonColor?: string
  buttonTextColor?: string
  buttonBorderColor?: string
}
export function BrutalistCta({
  line1 = "Ship",
  line2 = "It",
  line3 = "Fast.",
  buttonText = "Get the Kit",
  backgroundColor = "#f2f2f2",
  borderColor = "#000000",
  textColor = "#000000",
  buttonColor = "#ff00ff",
  buttonTextColor = "#ffffff",
  buttonBorderColor = "#000000",
}: BrutalistCtaProps) {
  return (
    <div
      className="border-y-4 py-20 px-6 text-center"
      style={{ backgroundColor, borderColor, color: textColor }}
    >
      <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8">
        {line1}
        <br />
        {line2}
        <br />
        {line3}
      </h2>
      <button
        className="border-4 px-12 py-4 text-xl font-bold uppercase shadow-[8px_8px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-[2px_2px_0px_0px_#000] transition-all"
        style={{ 
          backgroundColor: buttonColor, 
          borderColor: buttonBorderColor,
          color: buttonTextColor
        }}
      >
        {buttonText}
      </button>
    </div>
  )
}

// --- 15. Interactive Slider CTA ---
export interface InteractiveSliderCtaProps {
  heading?: string
  sliderLabel?: string
  savingsLabel?: string
  buttonText?: string
  multiplier?: number
  maxHours?: number
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  sliderAccentColor?: string
  headingColor?: string
  sliderLabelColor?: string
  savingsLabelColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
}
export function InteractiveSliderCta({
  heading = "See how much you save",
  sliderLabel = "Hours saved / week",
  savingsLabel = "saved per week",
  buttonText = "Start Saving Today",
  multiplier = 150,
  maxHours = 40,
  backgroundColor = "#ffffff",
  cardBackgroundColor = "#171717",
  accentColor = "#22c55e",
  sliderAccentColor = "#6366f1",
  headingColor = "#ffffff",
  sliderLabelColor = "#ffffff",
  savingsLabelColor = "#a3a3a3",
  buttonBackgroundColor = "#6366f1",
  buttonTextColor = "#ffffff",
}: InteractiveSliderCtaProps) {
  const [hours, setHours] = useState(10)

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div
        className="mx-auto max-w-4xl rounded-3xl p-12 text-center shadow-2xl"
        style={{ backgroundColor: cardBackgroundColor }}
      >
        <h2 className="text-2xl font-bold mb-8" style={{ color: headingColor }}>{heading}</h2>

        <div className="mb-12">
          <div className="text-5xl font-bold mb-2" style={{ color: accentColor }}>
            ${hours * multiplier}
          </div>
          <div style={{ color: savingsLabelColor }}>{savingsLabel}</div>
        </div>
        <div className="max-w-md mx-auto mb-10">
          <div className="flex justify-between text-sm font-medium mb-4" style={{ color: sliderLabelColor }}>
            <span>{sliderLabel}</span>
            <span style={{ color: sliderAccentColor }}>{hours} hrs</span>
          </div>
          <input
            type="range"
            min="1"
            max={maxHours}
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="h-2 w-full appearance-none rounded-lg bg-neutral-700 cursor-pointer"
            style={{ accentColor: sliderAccentColor }}
          />
        </div>
        <ShinyButton className="w-full md:w-auto px-8" style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}>{buttonText}</ShinyButton>
      </div>
    </div>
  )
}

// --- 16. Two Column Benefits CTA ---
export interface TwoColumnBenefitsCtaProps {
  heading?: string
  benefit1?: string
  benefit2?: string
  benefit3?: string
  benefit4?: string
  benefit5?: string
  buttonText?: string
  imageUrl?: string
  backgroundColor?: string
  headingColor?: string
  checkColor?: string
  benefitTextColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  imageOverlayColor?: string
}
export function TwoColumnBenefitsCta({
  heading = "Everything you need to succeed.",
  benefit1 = "Unlimited projects",
  benefit2 = "Team collaboration",
  benefit3 = "Analytics dashboard",
  benefit4 = "Custom domain support",
  benefit5 = "Priority email support",
  buttonText = "Get Full Access",
  imageUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop",
  backgroundColor = "#fafafa",
  headingColor = "#171717",
  checkColor = "#22c55e",
  benefitTextColor = "#525252",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
  imageOverlayColor = "#e5e5e5",
}: TwoColumnBenefitsCtaProps) {
  const benefits = [benefit1, benefit2, benefit3, benefit4, benefit5].filter(Boolean)

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6" style={{ color: headingColor }}>
            {heading}
          </h2>
          <div className="space-y-4 mb-8">
            {benefits.map((item, i) => (
              <div key={i} className="flex items-center gap-3" style={{ color: benefitTextColor }}>
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${checkColor}20`, color: checkColor }}
                >
                  <CheckCircle2 size={14} />
                </div>
                {item}
              </div>
            ))}
          </div>
          <button 
            className="rounded-lg px-6 py-3 font-bold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            {buttonText}
          </button>
        </div>
        <div
          className="h-full min-h-[300px] rounded-2xl bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${imageUrl}')`,
            backgroundColor: imageOverlayColor
          }}
        />
      </div>
    </div>
  )
}

// --- 17. Floating Banner CTA ---
export interface FloatingBannerCtaProps {
  message?: string
  buttonText?: string
  showIndicator?: boolean
  backgroundColor?: string
  bannerBackgroundColor?: string
  indicatorColor?: string
  buttonBackgroundColor?: string
  messageTextColor?: string
  buttonTextColor?: string
  bannerBorderColor?: string
  bannerTextColor?: string
}
export function FloatingBannerCta({
  message = "Get 20% off your first month",
  buttonText = "Claim Offer",
  showIndicator = true,
  backgroundColor = "#f5f5f5",
  bannerBackgroundColor = "#ffffff",
  indicatorColor = "#22c55e",
  buttonBackgroundColor = "#000000",
  messageTextColor = "#171717",
  buttonTextColor = "#ffffff",
  bannerBorderColor = "#e5e5e5",
  bannerTextColor = "#171717",
}: FloatingBannerCtaProps) {
  return (
    <div
      className="relative py-32 px-6 flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <div className="text-neutral-400 text-center">(Scroll content placeholder)</div>

      {/* The Banner */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl rounded-full border p-2 shadow-2xl backdrop-blur-lg flex items-center justify-between pl-6 pr-2"
        style={{ 
          backgroundColor: `${bannerBackgroundColor}cc`,
          borderColor: bannerBorderColor
        }}
      >
        <div className="flex items-center gap-3">
          {showIndicator && (
            <div
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: indicatorColor }}
            />
          )}
          <span className="text-sm font-medium" style={{ color: messageTextColor || bannerTextColor }}>{message}</span>
        </div>
        <button
          className="rounded-full px-6 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

// --- 18. Abstract 3D CTA ---
export interface Abstract3dCtaProps {
  heading?: string
  buttonText?: string
  backgroundColor?: string
  headingColor?: string
  glowColor1?: string
  glowColor2?: string
  iconColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  descriptionColor?: string
}
export function Abstract3dCta({
  heading = "Supercharge your workflow.",
  buttonText = "Start Building",
  backgroundColor = "#171717",
  headingColor = "#ffffff",
  glowColor1 = "#9333ea",
  glowColor2 = "#2563eb",
  iconColor = "#facc15",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#000000",
  descriptionColor = "#a3a3a3",
}: Abstract3dCtaProps) {
  return (
    <div className="relative overflow-hidden py-24 px-6 text-center" style={{ backgroundColor }}>
      <div
        className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full blur-[80px]"
        style={{ backgroundColor: glowColor1 }}
      />
      <div
        className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full blur-[80px]"
        style={{ backgroundColor: glowColor2 }}
      />

      <div className="relative z-10">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rotate-12">
          <Zap size={48} className="fill-current" style={{ color: iconColor }} />
        </div>
        <h2 className="text-4xl font-bold mb-6" style={{ color: headingColor }}>
          {heading}
        </h2>
        <button 
          className="px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

// --- 19. Enterprise Trust CTA ---
export interface EnterpriseTrustCtaProps {
  heading?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  showSecondaryButton?: boolean
  backgroundColor?: string
  headingColor?: string
  descriptionColor?: string
  iconColor?: string
  primaryButtonBackgroundColor?: string
  primaryButtonTextColor?: string
  secondaryButtonBorderColor?: string
  secondaryButtonTextColor?: string
  secondaryButtonHoverBackgroundColor?: string
}
export function EnterpriseTrustCta({
  heading = "Trusted by the Fortune 500",
  description = "Security, scalability, and dedicated support. Lumina Enterprise is built for mission-critical applications.",
  primaryButtonText = "Contact Sales",
  secondaryButtonText = "Read Case Studies",
  showSecondaryButton = true,
  backgroundColor = "#ffffff",
  headingColor = "#171717",
  descriptionColor = "#737373",
  iconColor = "#171717",
  primaryButtonBackgroundColor = "#171717",
  primaryButtonTextColor = "#ffffff",
  secondaryButtonBorderColor = "#e5e5e5",
  secondaryButtonTextColor = "#171717",
  secondaryButtonHoverBackgroundColor = "#fafafa",
}: EnterpriseTrustCtaProps) {
  return (
    <div className="py-20 px-6 border-t border-neutral-100" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl text-center">
        <Shield size={48} className="mx-auto mb-6" style={{ color: iconColor }} />
        <h2 className="text-3xl font-bold mb-4" style={{ color: headingColor }}>
          {heading}
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: descriptionColor }}>
          {description}
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="rounded-lg px-6 py-3 font-bold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryButtonBackgroundColor, color: primaryButtonTextColor }}
          >
            {primaryButtonText}
          </button>
          {showSecondaryButton && (
            <button
              className="rounded-lg border px-6 py-3 font-bold transition-colors"
              style={{ 
                borderColor: secondaryButtonBorderColor,
                color: secondaryButtonTextColor,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = secondaryButtonHoverBackgroundColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// --- 20. Referral CTA ---
export interface ReferralCtaProps {
  heading?: string
  description?: string
  referralLink?: string
  buttonText?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  headingColor?: string
  descriptionColor?: string
}
export function ReferralCta({
  heading = "Give $50, Get $50",
  description = "Refer a friend to Lumina and you'll both receive $50 in credit when they subscribe.",
  referralLink = "lumina.ui/refer/alex-291",
  buttonText = "Copy",
  backgroundColor = "#eef2ff",
  cardBackgroundColor = "#ffffff",
  accentColor = "#9333ea",
  headingColor = "#171717",
  descriptionColor = "#737373",
}: ReferralCtaProps) {
  return (
    <div
      className="py-24 px-6"
      style={{ background: `linear-gradient(to bottom right, ${backgroundColor}, #f3e8ff)` }}
    >
      <div
        className="mx-auto max-w-3xl rounded-3xl p-8 md:p-12 shadow-xl text-center border"
        style={{ backgroundColor: cardBackgroundColor, borderColor: `${accentColor}20` }}
      >
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          <Gift size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: headingColor }}>
          {heading}
        </h2>
        <p className="mb-8" style={{ color: descriptionColor }}>
          {description}
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <div className="flex-1 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-500 truncate">
            {referralLink}
          </div>
          <button
            className="rounded-lg px-6 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Export component map
export const ctaComponentMap: Record<CtaSlug, React.FC<Record<string, string | number | boolean>>> = {
  "simple-centered-cta": SimpleCenteredCta as React.FC<Record<string, string | number | boolean>>,
  "split-image-cta": SplitImageCta as React.FC<Record<string, string | number | boolean>>,
  "glow-gradient-cta": GlowGradientCta as React.FC<Record<string, string | number | boolean>>,
  "app-store-cta": AppStoreCta as React.FC<Record<string, string | number | boolean>>,
  "newsletter-bar-cta": NewsletterBarCta as React.FC<Record<string, string | number | boolean>>,
  "card-overlay-cta": CardOverlayCta as React.FC<Record<string, string | number | boolean>>,
  "developer-terminal-cta": DeveloperTerminalCta as React.FC<Record<string, string | number | boolean>>,
  "saas-peek-cta": SaasPeekCta as React.FC<Record<string, string | number | boolean>>,
  "social-proof-cta": SocialProofCta as React.FC<Record<string, string | number | boolean>>,
  "countdown-cta": CountdownCta as React.FC<Record<string, string | number | boolean>>,
  "pricing-teaser-cta": PricingTeaserCta as React.FC<Record<string, string | number | boolean>>,
  "video-background-cta": VideoBackgroundCta as React.FC<Record<string, string | number | boolean>>,
  "community-cta": CommunityCta as React.FC<Record<string, string | number | boolean>>,
  "brutalist-cta": BrutalistCta as React.FC<Record<string, string | number | boolean>>,
  "interactive-slider-cta": InteractiveSliderCta as React.FC<Record<string, string | number | boolean>>,
  "two-column-benefits-cta": TwoColumnBenefitsCta as React.FC<Record<string, string | number | boolean>>,
  "floating-banner-cta": FloatingBannerCta as React.FC<Record<string, string | number | boolean>>,
  "abstract-3d-cta": Abstract3dCta as React.FC<Record<string, string | number | boolean>>,
  "enterprise-trust-cta": EnterpriseTrustCta as React.FC<Record<string, string | number | boolean>>,
  "referral-cta": ReferralCta as React.FC<Record<string, string | number | boolean>>,
}

export const ctaComponentsByName = ctaSections.reduce<Record<string, React.FC<Record<string, string | number | boolean>>>>(
  (acc, cta) => {
    acc[cta.componentName] = ctaComponentMap[cta.slug]
    return acc
  },
  {}
)


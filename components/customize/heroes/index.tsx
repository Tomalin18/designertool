"use client"

import React, { useState } from "react"
import {
  ArrowRight,
  Bitcoin,
  Calendar,
  CheckCircle2,
  Command,
  Heart,
  Layout,
  Mail,
  MapPin,
  Mic,
  Play,
  PlayCircle,
  Search,
  Star,
  Terminal,
  Zap,
  Quote,
  Shield,
  CreditCard,
  Smartphone,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { heroSections, HeroPropDefinition } from "@/lib/hero-sections"
import { ShinyButton } from "@/components/customize/ShinyButton"

type HeroDefinition = (typeof heroSections)[number]
export type HeroSlug = HeroDefinition["slug"]

type ExtractHeroDefinition<Slug extends HeroSlug> = Extract<HeroDefinition, { slug: Slug }>
type ExtractHeroProps<Slug extends HeroSlug> = ExtractHeroDefinition<Slug>["props"]

type HeroPropValue<T extends HeroPropDefinition> = T["default"] extends boolean
  ? boolean
  : T["default"] extends number
  ? number
  : string

export type HeroComponentProps<Slug extends HeroSlug> = {
  [K in keyof ExtractHeroProps<Slug>]: HeroPropValue<ExtractHeroProps<Slug>[K]>
}

export const heroDefaultProps: Record<HeroSlug, Record<string, string | number | boolean>> =
  heroSections.reduce((acc, hero) => {
    acc[hero.slug] = Object.fromEntries(
      Object.entries(hero.props).map(([key, definition]) => [key, definition.default])
    )
    return acc
  }, {} as Record<HeroSlug, Record<string, string | number | boolean>>)

const iconMap = {
  layout: Layout,
  zap: Zap,
  command: Command,
}

const highlightText = (
  text: string,
  highlight: string,
  options?: { className?: string; style?: React.CSSProperties }
) => {
  if (!highlight) return text
  const index = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (index === -1) {
    return (
      <>
        {text}{" "}
        <span className={options?.className} style={options?.style}>
          {highlight}
        </span>
      </>
    )
  }
  const before = text.slice(0, index)
  const match = text.slice(index, index + highlight.length)
  const after = text.slice(index + highlight.length)
  return (
    <>
      {before}
      <span className={options?.className} style={options?.style}>
        {match}
      </span>
      {after}
    </>
  )
}

export type SimpleCenteredHeroProps = HeroComponentProps<"simple-centered-hero">
export function SimpleCenteredHero({
  pillText,
  heading,
  highlightText: highlight,
  description,
  primaryCtaLabel,
  secondaryCtaLabel,
  showPill = true,
  showPrimaryCta = true,
  showSecondaryCta = true,
  backgroundColor = "#050505",
  headingColor = "#ffffff",
  descriptionColor = "#9ca3af",
  highlightColor = "#6366f1",
  pillBackgroundColor = "#111827",
  pillBorderColor = "#4c1d95",
  pillTextColor = "#a5b4fc",
}: SimpleCenteredHeroProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      style={{ backgroundColor }}
    >
      {showPill && pillText && (
        <div
          className="mb-4 rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: pillBackgroundColor,
            borderColor: pillBorderColor,
            color: pillTextColor,
          }}
        >
          {pillText}
        </div>
      )}
      <h1
        className="mb-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl"
        style={{ color: headingColor }}
      >
        {highlightText(heading, highlight, { style: { color: highlightColor } })}
      </h1>
      <p className="mb-8 max-w-xl text-lg" style={{ color: descriptionColor }}>
        {description}
      </p>
      {(showPrimaryCta || showSecondaryCta) && (
        <div className="flex flex-wrap justify-center gap-4">
          {showPrimaryCta && <ShinyButton>{primaryCtaLabel}</ShinyButton>}
          {showSecondaryCta && <ShinyButton variant="outline">{secondaryCtaLabel}</ShinyButton>}
        </div>
      )}
    </div>
  )
}

export type SaaSDashboardHeroProps = HeroComponentProps<"saas-dashboard-hero">
export function SaaSDashboardHero({
  heading,
  description,
  featureOne,
  featureTwo,
  featureThree,
  showFeatureList = true,
  showPreviewPanel = true,
  backgroundColor = "#050505",
  headingColor = "#ffffff",
  descriptionColor = "#a1a1aa",
  featureTextColor = "#d4d4d8",
  previewGlowFromColor = "#6366f1",
  previewGlowToColor = "#a855f7",
  previewCardBackground = "#111827",
  previewBorderColor = "#1f2937",
}: SaaSDashboardHeroProps) {
  const features = [featureOne, featureTwo, featureThree].filter(Boolean)
  return (
    <div
      className="grid gap-12 px-6 py-12 lg:grid-cols-2 lg:items-center"
      style={{ backgroundColor }}
    >
      <div>
        <h1 className="mb-6 text-4xl font-bold" style={{ color: headingColor }}>
          {heading}
        </h1>
        <p className="mb-8" style={{ color: descriptionColor }}>
          {description}
        </p>
        {showFeatureList && (
          <div className="space-y-4">
            {features.map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-3" style={{ color: featureTextColor }}>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                  <CheckCircle2 size={12} />
                </div>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {showPreviewPanel && (
        <div className="relative">
          <div
            className="absolute -inset-1 rounded-xl opacity-30 blur-lg"
            style={{
              backgroundImage: `linear-gradient(90deg, ${previewGlowFromColor}, ${previewGlowToColor})`,
            }}
          />
          <div
            className="relative rounded-xl border p-4 shadow-2xl"
            style={{ backgroundColor: previewCardBackground, borderColor: previewBorderColor }}
          >
            <div className="mb-4 flex gap-2 border-b pb-2" style={{ borderColor: previewBorderColor }}>
              <div className="h-3 w-3 rounded-full bg-red-500/20" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
              <div className="h-3 w-3 rounded-full bg-green-500/20" />
            </div>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="h-24 flex-1 rounded-lg bg-neutral-800/50" />
                <div className="h-24 flex-1 rounded-lg bg-neutral-800/50" />
              </div>
              <div className="h-32 w-full rounded-lg bg-neutral-800/50" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export type DevCodeHeroProps = HeroComponentProps<"dev-code-hero">
export function DevCodeHero({
  heading,
  description,
  commandText,
  shellLabel = "bash",
  statusMessage = "... installing dependencies",
  promptSymbol = "$",
  showIcon = true,
  backgroundColor = "#0d1117",
  terminalBackgroundColor = "#161b22",
  terminalBorderColor = "#1f2933",
  promptColor = "#22c55e",
}: DevCodeHeroProps) {
  return (
    <div
      className="flex flex-col items-center px-4 py-16 text-center"
      style={{ backgroundColor }}
    >
      {showIcon && <Terminal className="mb-6 h-12 w-12 text-neutral-500" />}
      <h1 className="mb-6 font-mono text-3xl font-bold text-white">{heading}</h1>
      <p className="mb-8 max-w-lg text-neutral-400">{description}</p>
      <div
        className="w-full max-w-lg rounded-xl border p-4 text-left shadow-2xl"
        style={{ backgroundColor: terminalBackgroundColor, borderColor: terminalBorderColor }}
      >
        <div className="mb-2 text-xs text-neutral-500">{shellLabel}</div>
        <div className="font-mono text-sm text-neutral-300">
          <span style={{ color: promptColor }}>{promptSymbol}</span> {commandText}
          <br />
          <span className="text-neutral-500">{statusMessage}</span>
          <br />
          <span style={{ color: promptColor }}>{promptSymbol}</span>{" "}
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  )
}

export type ModernEcommerceHeroProps = HeroComponentProps<"modern-ecommerce-hero">
export function ModernEcommerceHero({
  collectionLabel,
  title,
  ctaLabel,
  backgroundImage,
  showCollectionLabel = true,
  overlayColor = "#0a0a0a",
  overlayOpacity = 70,
  titleColor = "#ffffff",
  ctaColor = "#ffffff",
}: ModernEcommerceHeroProps) {
  const overlayStyle: React.CSSProperties = {
    backgroundColor: overlayColor,
    opacity: Math.min(1, Math.max(0, overlayOpacity / 100)),
  }
  return (
    <div className="relative flex h-[400px] items-center justify-center overflow-hidden bg-neutral-900">
      <img src={backgroundImage} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0" style={overlayStyle} />
      <div className="relative z-10 text-center">
        {showCollectionLabel && (
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-400">{collectionLabel}</h2>
        )}
        <h1 className="my-4 text-5xl font-serif" style={{ color: titleColor }}>
          {title}
        </h1>
        <button
          className="border-b pb-1 text-sm font-medium transition-all hover:opacity-80"
          style={{ color: ctaColor, borderColor: ctaColor }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}

export type AppShowcaseHeroProps = HeroComponentProps<"app-showcase-hero">
export function AppShowcaseHero({
  heading,
  highlightText: highlight,
  description,
  primaryStoreLabel,
  secondaryStoreLabel,
  backgroundColor = "#050505",
  headingColor = "#ffffff",
  highlightColor = "#3b82f6",
  descriptionColor = "#9ca3af",
  showPhoneMockup = true,
  primaryStoreBackgroundColor = "#ffffff",
  primaryStoreTextColor = "#000000",
  secondaryStoreBorderColor = "#4b5563",
  secondaryStoreTextColor = "#ffffff",
  phoneAccentColor = "#2563eb",
  phoneBorderColor = "#1f2937",
}: AppShowcaseHeroProps) {
  return (
    <div
      className="flex flex-col items-center gap-12 py-16 lg:flex-row lg:justify-between lg:px-12"
      style={{ backgroundColor }}
    >
      <div className="text-center lg:text-left">
        <h1 className="mb-4 text-4xl font-bold" style={{ color: headingColor }}>
          {highlightText(heading, highlight, { style: { color: highlightColor } })}
        </h1>
        <p className="mx-auto mb-8 max-w-xs lg:mx-0" style={{ color: descriptionColor }}>
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
          <button
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold hover:opacity-80"
            style={{ backgroundColor: primaryStoreBackgroundColor, color: primaryStoreTextColor }}
          >
            <Smartphone size={16} /> {primaryStoreLabel}
          </button>
          <button
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-colors hover:bg-white/5"
            style={{ borderColor: secondaryStoreBorderColor, color: secondaryStoreTextColor, borderWidth: 1, borderStyle: "solid" }}
          >
            <Smartphone size={16} /> {secondaryStoreLabel}
          </button>
        </div>
      </div>
      {showPhoneMockup && (
        <div
          className="relative h-[300px] w-[160px] rounded-[2rem] border-[6px] bg-neutral-900 shadow-2xl"
          style={{ borderColor: phoneBorderColor }}
        >
          <div className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-neutral-800" />
          <div className="h-full w-full overflow-hidden rounded-[1.6rem] bg-neutral-800">
            <div className="space-y-3 p-4 pt-10">
              <div className="h-8 w-12 rounded bg-neutral-700/50" />
              <div className="h-24 w-full rounded-xl" style={{ backgroundColor: `${phoneAccentColor}33` }} />
              <div className="h-24 w-full rounded-xl bg-neutral-700/20" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export type EmailCaptureHeroProps = HeroComponentProps<"email-capture-hero">
export function EmailCaptureHero({
  heading,
  description,
  placeholder,
  buttonLabel,
  helperText,
  backgroundColor = "#111827",
  borderColor = "#1f2937",
  headingColor = "#ffffff",
  descriptionColor = "#9ca3af",
  inputBackgroundColor = "#1f2937",
  inputBorderColor = "#374151",
  buttonBackgroundColor = "#4f46e5",
  buttonTextColor = "#ffffff",
  showHelperText = true,
  helperTextColor = "#6b7280",
  showMailIcon = true,
}: EmailCaptureHeroProps) {
  return (
    <div
      className="border-y px-6 py-20 text-center"
      style={{ backgroundColor, borderColor }}
    >
      <h1 className="mb-4 text-3xl font-bold" style={{ color: headingColor }}>
        {heading}
      </h1>
      <p className="mb-8" style={{ color: descriptionColor }}>
        {description}
      </p>
      <div className="mx-auto flex max-w-sm flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          {showMailIcon && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />}
          <input
            type="email"
            placeholder={placeholder}
            className="w-full rounded-lg py-2.5 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{
              backgroundColor: inputBackgroundColor,
              borderColor: inputBorderColor,
              borderWidth: 1,
              borderStyle: "solid",
              paddingLeft: showMailIcon ? 40 : 16,
            }}
          />
        </div>
        <button
          className="rounded-lg px-6 py-2.5 text-sm font-medium transition-colors"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonLabel}
        </button>
      </div>
      {showHelperText && (
        <p className="mt-4 text-xs" style={{ color: helperTextColor }}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export type VideoBackgroundHeroProps = HeroComponentProps<"video-background-hero">
export function VideoBackgroundHero({
  title,
  backgroundImage,
  showPlayLabel,
  overlayColor = "#000000",
  overlayOpacity = 40,
  titleColor = "#ffffff",
  playButtonBackgroundColor = "#ffffff",
  playIconColor = "#000000",
}: VideoBackgroundHeroProps) {
  const overlayStyle: React.CSSProperties = {
    backgroundColor: overlayColor,
    opacity: Math.min(1, Math.max(0, overlayOpacity / 100)),
  }
  return (
    <div className="group relative flex h-[350px] items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={overlayStyle} />
      <div className="relative z-10 flex flex-col items-center">
        {showPlayLabel && (
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: playButtonBackgroundColor }}
          >
            <Play size={24} fill={playIconColor} className="ml-1" color={playIconColor} />
          </div>
        )}
        <h1 className="text-3xl font-bold" style={{ color: titleColor }}>
          {title}
        </h1>
      </div>
    </div>
  )
}

export type SplitScreenHeroProps = HeroComponentProps<"split-screen-hero">
export function SplitScreenHero({
  heading,
  description,
  primaryLinkLabel,
  secondaryLinkLabel,
  imageUrl,
  leftBackgroundColor = "#050505",
  textColor = "#ffffff",
  descriptionColor = "#a3a3a3",
  primaryLinkColor = "#ffffff",
  secondaryLinkColor = "#9ca3af",
  showSecondaryLink = true,
  imageOverlayColor = "#0a0a0a",
  imageOverlayOpacity = 30,
}: SplitScreenHeroProps) {
  return (
    <div className="grid h-[400px] w-full grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center p-12" style={{ backgroundColor: leftBackgroundColor }}>
        <h1 className="text-4xl font-bold" style={{ color: textColor }}>
          {heading}
        </h1>
        <p className="mt-4 leading-relaxed" style={{ color: descriptionColor }}>
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#" className="text-sm font-medium underline underline-offset-4" style={{ color: primaryLinkColor }}>
            {primaryLinkLabel}
          </a>
          {showSecondaryLink && (
            <a href="#" className="text-sm font-medium hover:opacity-80" style={{ color: secondaryLinkColor }}>
              {secondaryLinkLabel}
            </a>
          )}
        </div>
      </div>
      <div
        className="relative h-full w-full bg-cover bg-center grayscale transition-all hover:grayscale-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: imageOverlayColor,
            opacity: Math.min(1, Math.max(0, imageOverlayOpacity / 100)),
          }}
        />
      </div>
    </div>
  )
}

export type Web3CryptoHeroProps = HeroComponentProps<"web3-crypto-hero">
export function Web3CryptoHero({
  heading,
  description,
  buttonLabel,
  backgroundColor = "#050505",
  glowTopColor = "#2563eb",
  glowBottomColor = "#8b5cf6",
  headingGradientFrom = "#60a5fa",
  headingGradientTo = "#c084fc",
  buttonGradientFrom = "#2563eb",
  buttonGradientTo = "#4c1d95",
  showBitcoinIcon = true,
}: Web3CryptoHeroProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden py-20 text-center"
      style={{ backgroundColor }}
    >
      <div
        className="absolute top-1/2 h-[200px] w-[200px] -translate-y-1/2 rounded-full blur-[100px]"
        style={{ backgroundColor: glowTopColor }}
      />
      <div
        className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full blur-[100px]"
        style={{ backgroundColor: glowBottomColor }}
      />
      <div className="relative z-10 px-4">
        <h1
          className="text-5xl font-bold text-transparent"
          style={{ backgroundImage: `linear-gradient(90deg, ${headingGradientFrom}, ${headingGradientTo})`, WebkitBackgroundClip: "text" }}
        >
          {heading}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-neutral-400">{description}</p>
        <div className="mt-8 flex justify-center">
          <button
            className="flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white hover:opacity-90"
            style={{ backgroundImage: `linear-gradient(90deg, ${buttonGradientFrom}, ${buttonGradientTo})` }}
          >
            {showBitcoinIcon && <Bitcoin size={18} />}
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export type SearchFocusedHeroProps = HeroComponentProps<"search-focused-hero">
export function SearchFocusedHero({
  heading,
  placeholder,
  buttonLabel,
  backgroundImage,
  overlayColor = "#000000",
  overlayOpacity = 30,
  cardBackgroundColor = "#0d0d0d",
  headingColor = "#ffffff",
  buttonColor = "#f43f5e",
  buttonIconColor = "#ffffff",
  showLocationIcon = true,
}: SearchFocusedHeroProps) {
  return (
    <div
      className="relative bg-cover bg-center py-24 text-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: Math.min(1, Math.max(0, overlayOpacity / 100)),
        }}
      />
      <div className="relative z-10 inline-block rounded-2xl border border-white/10 p-8 backdrop-blur-md" style={{ backgroundColor: cardBackgroundColor }}>
        <h1 className="mb-6 text-3xl font-bold" style={{ color: headingColor }}>
          {heading}
        </h1>
        <div className="flex w-full max-w-md items-center rounded-full bg-white p-2 shadow-xl">
          {showLocationIcon && (
            <div className="pl-4 pr-2">
              <MapPin size={20} className="text-neutral-400" />
            </div>
          )}
          <input
            type="text"
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none"
            style={{ paddingLeft: showLocationIcon ? undefined : 16 }}
          />
          <button
            className="rounded-full p-3 transition-colors hover:opacity-90"
            style={{ backgroundColor: buttonColor, color: buttonIconColor }}
          >
            <Search size={20} color={buttonIconColor} />
          </button>
        </div>
        <div className="mt-4 text-sm font-medium text-white">{buttonLabel}</div>
      </div>
    </div>
  )
}

export type EventConferenceHeroProps = HeroComponentProps<"event-conference-hero">
export function EventConferenceHero({
  badgeText,
  title,
  location,
  buttonLabel,
  footnote,
  backgroundColor = "#050505",
  badgeBackgroundColor = "#7c2d12",
  badgeBorderColor = "#ea580c",
  badgeTextColor = "#f97316",
  showBadge = true,
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#000000",
  footnoteColor = "#a3a3a3",
}: EventConferenceHeroProps) {
  return (
    <div
      className="border px-6 py-16 text-center"
      style={{ backgroundColor, borderColor: "#262626" }}
    >
      {showBadge && (
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: badgeBackgroundColor, borderColor: badgeBorderColor, borderWidth: 1, borderStyle: "solid", color: badgeTextColor }}
        >
          <Calendar size={16} /> {badgeText}
        </div>
      )}
      <h1 className="mb-4 text-5xl font-black uppercase tracking-tight text-white">{title}</h1>
      <p className="mb-8 text-xl text-neutral-400">{location}</p>
      <div className="flex flex-col items-center gap-4">
        <button
          className="w-full max-w-xs rounded-none px-8 py-4 text-lg font-bold uppercase hover:opacity-90"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonLabel}
        </button>
        <span className="text-xs" style={{ color: footnoteColor }}>
          {footnote}
        </span>
      </div>
    </div>
  )
}

export type SocialProofHeroProps = HeroComponentProps<"social-proof-hero">
export function SocialProofHero({
  heading,
  quote,
  ratingLabel,
  backgroundColor = "#111827",
  headingColor = "#ffffff",
  quoteColor = "#94a3b8",
  showAvatarStack = true,
  avatarAccentColor = "#1f2937",
  starColor = "#facc15",
  ratingLabelColor = "#e2e8f0",
}: SocialProofHeroProps) {
  return (
    <div className="px-6 py-16 text-center" style={{ backgroundColor }}>
      {showAvatarStack && (
        <div className="mb-6 flex justify-center -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-10 rounded-full border-2"
              style={{ borderColor: backgroundColor, backgroundColor: avatarAccentColor }}
            />
          ))}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-medium"
            style={{ borderColor: backgroundColor, backgroundColor: avatarAccentColor, color: ratingLabelColor }}
          >
            +2k
          </div>
        </div>
      )}
      <h1 className="mb-4 text-3xl font-bold" style={{ color: headingColor }}>
        {heading}
      </h1>
      <p className="mx-auto mb-8 max-w-lg" style={{ color: quoteColor }}>
        {quote}
      </p>
      <div className="flex items-center justify-center gap-1" style={{ color: starColor }}>
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={16} fill="currentColor" color={starColor} />
        ))}
        <span className="ml-2 text-sm" style={{ color: ratingLabelColor }}>
          {ratingLabel}
        </span>
      </div>
    </div>
  )
}

export type ModernBrutalistHeroProps = HeroComponentProps<"modern-brutalist-hero">
export function ModernBrutalistHero({
  badgeText,
  titleLineOne,
  titleLineTwo,
  titleLineThree,
  collectionLabel,
  backgroundColor = "#ffde59",
  borderColor = "#000000",
  textColor = "#000000",
  showBadge = true,
  indicatorColor = "#000000",
  arrowColor = "#000000",
  collectionLabelColor = "#000000",
}: ModernBrutalistHeroProps) {
  return (
    <div
      className="flex flex-col border-4 p-8 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      style={{ backgroundColor, borderColor }}
    >
      <div className="mb-8 flex items-start justify-between">
        {showBadge && (
          <div
            className="rounded-full border-2 px-4 py-1 font-bold uppercase"
            style={{ borderColor, color: textColor }}
          >
            {badgeText}
          </div>
        )}
        <div className="h-8 w-8 rounded-full border-2" style={{ borderColor, backgroundColor: indicatorColor }} />
      </div>
      <h1 className="text-6xl font-black uppercase leading-[0.9]" style={{ color: textColor }}>
        {titleLineOne}
        <br />
        {titleLineTwo}
        <br />
        {titleLineThree}
      </h1>
      <div
        className="mt-8 flex items-center justify-between border-t-4 pt-4"
        style={{ borderColor }}
      >
        <span className="font-bold uppercase" style={{ color: collectionLabelColor }}>
          {collectionLabel}
        </span>
        <ArrowRight size={32} strokeWidth={3} color={arrowColor} />
      </div>
    </div>
  )
}

export type PodcastMediaHeroProps = HeroComponentProps<"podcast-media-hero">
export function PodcastMediaHero({
  badgeText,
  title,
  description,
  buttonLabel,
  coverImage,
  backgroundColor = "#111827",
  borderColor = "#1f2937",
  badgeColor = "#818cf8",
  titleColor = "#ffffff",
  descriptionColor = "#9ca3af",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#000000",
  showEqualizer = true,
  equalizerColor = "#374151",
  showMicBadge = true,
  micBadgeColor = "#4f46e5",
}: PodcastMediaHeroProps) {
  return (
    <div
      className="flex items-center gap-6 rounded-2xl border p-8"
      style={{ backgroundColor, borderColor }}
    >
      <div className="relative shrink-0">
        <div className="h-32 w-32 overflow-hidden rounded-xl">
          <img src={coverImage} alt={title} className="h-full w-full object-cover" />
        </div>
        {showMicBadge && (
          <div
            className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg"
            style={{ backgroundColor: micBadgeColor }}
          >
            <Mic size={18} />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: badgeColor }}>
          {badgeText}
        </div>
        <h1 className="truncate text-2xl font-bold" style={{ color: titleColor }}>
          {title}
        </h1>
        <p className="truncate text-sm" style={{ color: descriptionColor }}>
          {description}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <button
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold hover:opacity-90"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            <Play size={14} fill={buttonTextColor} /> {buttonLabel}
          </button>
          {showEqualizer && (
            <div className="flex h-6 items-end gap-0.5">
              {[40, 70, 50, 90, 60, 30, 80, 40].map((height, index) => (
                <div key={index} className="w-1" style={{ height: `${height}%`, backgroundColor: equalizerColor }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export type GradientMeshHeroProps = HeroComponentProps<"gradient-mesh-hero">
export function GradientMeshHero({
  title,
  subtitle,
  backgroundColor = "#ffffff",
  meshGradientFrom = "#ff0080",
  meshGradientTo = "#7928ca",
  titleGradientFrom = "#ec4899",
  titleGradientTo = "#8b5cf6",
  subtitleColor = "#1f2937",
  showBlurOverlay = true,
}: GradientMeshHeroProps) {
  return (
    <div className="relative flex h-[300px] items-center justify-center overflow-hidden" style={{ backgroundColor }}>
      <div
        className="absolute inset-0 opacity-80 blur-[60px]"
        style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${meshGradientFrom}, ${meshGradientTo})` }}
      />
      {showBlurOverlay && <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl" />}
      <div className="relative z-10 text-center">
        <h1
          className="text-6xl font-black text-transparent"
          style={{ backgroundImage: `linear-gradient(90deg, ${titleGradientFrom}, ${titleGradientTo})`, WebkitBackgroundClip: "text" }}
        >
          {title}
        </h1>
        <p className="mt-2 font-medium" style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export type FeatureGridBackgroundHeroProps = HeroComponentProps<"feature-grid-background-hero">
export function FeatureGridBackgroundHero({
  heading,
  description,
  icon,
  backgroundColor = "#050505",
  iconBackgroundColor = "#4f46e5",
  iconColor = "#ffffff",
  headingColor = "#ffffff",
  descriptionColor = "#a3a3a3",
  showGridIcons = true,
  gridIconSymbol = "zap",
  gridIconOpacity = 3,
}: FeatureGridBackgroundHeroProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] ?? Layout
  const GridIconComponent = iconMap[gridIconSymbol as keyof typeof iconMap] ?? Layout
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden py-20 text-center" style={{ backgroundColor }}>
      {showGridIcons && (
        <div
          className="pointer-events-none absolute inset-0 grid grid-cols-6 gap-8 p-4"
          style={{ opacity: Math.min(1, Math.max(0, gridIconOpacity / 100)) }}
        >
          {[...Array(24)].map((_, index) => (
            <div key={index} className="flex items-center justify-center text-white">
              <GridIconComponent size={32} />
            </div>
          ))}
        </div>
      )}
      <div className="relative z-10 max-w-2xl px-6">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg shadow-indigo-500/25"
          style={{ backgroundColor: iconBackgroundColor }}
        >
          <IconComponent size={32} style={{ color: iconColor }} />
        </div>
        <h1 className="mb-4 text-4xl font-bold" style={{ color: headingColor }}>
          {heading}
        </h1>
        <p style={{ color: descriptionColor }}>{description}</p>
      </div>
    </div>
  )
}

export type KineticTypeHeroProps = HeroComponentProps<"kinetic-type-hero">
export function KineticTypeHero({
  lineOne,
  lineTwo,
  lineThree,
  backgroundColor = "#000000",
  textColor = "#ffffff",
  textStrokeColor = "#ffffff",
}: KineticTypeHeroProps) {
  return (
    <div
      className="flex h-[350px] w-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="flex w-full -rotate-6 transform flex-col gap-0 font-black uppercase leading-none opacity-90">
        <div
          className="whitespace-nowrap text-8xl tracking-tighter mix-blend-difference"
          style={{ color: textColor }}
        >
          {lineOne}
        </div>
        <div
          className="whitespace-nowrap text-8xl tracking-tighter text-transparent text-stroke-2 translate-x-20"
          style={{ WebkitTextStrokeColor: textStrokeColor }}
        >
          {lineTwo}
        </div>
        <div
          className="whitespace-nowrap text-8xl tracking-tighter mix-blend-difference -translate-x-10"
          style={{ color: textColor }}
        >
          {lineThree}
        </div>
      </div>
    </div>
  )
}

export type InteractiveToggleHeroProps = HeroComponentProps<"interactive-toggle-hero">
export function InteractiveToggleHero({
  devHeading,
  devDescription,
  designerHeading,
  designerDescription,
  backgroundColor = "#000000",
  toggleBackgroundColor = "#1f2937",
  activeToggleColor = "#3b82f6",
  headingColor = "#ffffff",
  descriptionColor = "#9ca3af",
}: InteractiveToggleHeroProps) {
  const [role, setRole] = useState<"dev" | "designer">("dev")
  const isDev = role === "dev"
  return (
    <div className="flex flex-col items-center px-4 py-16" style={{ backgroundColor }}>
      <div className="mb-8 flex rounded-full p-1" style={{ backgroundColor: toggleBackgroundColor }}>
        <button
          onClick={() => setRole("dev")}
          className={cn("rounded-full px-6 py-2 text-sm font-medium transition-all")}
          style={
            isDev
              ? { backgroundColor: activeToggleColor, color: "#ffffff", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }
              : { color: descriptionColor }
          }
        >
          Developer
        </button>
        <button
          onClick={() => setRole("designer")}
          className={cn("rounded-full px-6 py-2 text-sm font-medium transition-all")}
          style={
            !isDev
              ? { backgroundColor: activeToggleColor, color: "#ffffff", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }
              : { color: descriptionColor }
          }
        >
          Designer
        </button>
      </div>
      <h1
        className="mb-4 text-4xl font-bold transition-all duration-300"
        style={{ color: headingColor }}
      >
        {isDev ? devHeading : designerHeading}
      </h1>
      <p
        className="max-w-md text-center transition-all duration-300"
        style={{ color: descriptionColor }}
      >
        {isDev ? devDescription : designerDescription}
      </p>
    </div>
  )
}

export type CodeIdeHeroProps = HeroComponentProps<"code-ide-hero">
export function CodeIdeHero({
  fileName,
  importLine,
  commentLine,
  componentLine,
  backgroundColor = "#050505",
  editorBackgroundColor = "#1e1e1e",
  fileNameColor = "#ffffff",
  textColor = "#d4d4d8",
  accentColor = "#60a5fa",
}: CodeIdeHeroProps) {
  return (
    <div className="p-8 font-mono text-sm" style={{ backgroundColor: editorBackgroundColor, color: textColor }}>
      <div className="mb-6 flex items-center justify-between text-neutral-400">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div style={{ color: fileNameColor }}>{fileName}</div>
        <div />
      </div>
      <div className="space-y-1">
        <div className="flex">
          <span className="w-8 select-none text-neutral-600">1</span>
          <span>{importLine}</span>
        </div>
        <div className="flex">
          <span className="w-8 select-none text-neutral-600">2</span>
          <span>
            export default function Hero() {"{"}
          </span>
        </div>
        <div className="flex">
          <span className="w-8 select-none text-neutral-600">3</span>
          <span className="pl-4" style={{ color: "#c586c0" }}>
            return
          </span>{" "}
          (
        </div>
        <div className="flex">
          <span className="w-8 select-none text-neutral-600">4</span>
          <span className="pl-8 text-[#808080]">&lt;!-- {commentLine} --&gt;</span>
        </div>
        <div className="flex">
          <span className="w-8 select-none text-neutral-600">5</span>
          <span className="pl-8 text-[#808080]">
            <span style={{ color: accentColor }}>{componentLine}</span>
          </span>
        </div>
        <div className="flex">
          <span className="w-8 select-none text-neutral-600">6</span>
          <span className="pl-4">);</span>
        </div>
        <div className="flex">
          <span className="w-8 select-none text-neutral-600">7</span>
          <span>{"}"}</span>
        </div>
        <div className="flex animate-pulse">
          <span className="w-8 select-none text-neutral-600">8</span>
          <span className="h-4 w-2" style={{ backgroundColor: accentColor }} />
        </div>
      </div>
    </div>
  )
}

export type VerticalSplitHeroProps = HeroComponentProps<"vertical-split-hero">
export function VerticalSplitHero({
  collectionLabel,
  title,
  buttonLabel,
  leftImage,
  rightImage,
  backgroundColor = "#ffffff",
  titleColor = "#000000",
  collectionLabelColor = "#737373",
  buttonColor = "#000000",
  buttonBorderColor = "#e5e5e5",
}: VerticalSplitHeroProps) {
  return (
    <div className="grid h-[400px] grid-cols-3 bg-neutral-950">
      <div className="bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${leftImage})` }} />
      <div
        className="flex flex-col items-center justify-center border-x border-neutral-800 p-6 text-center"
        style={{ backgroundColor }}
      >
        <h2
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: collectionLabelColor }}
        >
          {collectionLabel}
        </h2>
        <h1 className="my-6 text-4xl font-serif" style={{ color: titleColor }}>
          {title}
        </h1>
        <button
          className="rounded-none border px-6 py-2 text-xs uppercase transition-colors hover:opacity-70"
          style={{ color: buttonColor, borderColor: buttonBorderColor }}
        >
          {buttonLabel}
        </button>
      </div>
      <div className="bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${rightImage})` }} />
    </div>
  )
}

export type CyberpunkGlitchHeroProps = HeroComponentProps<"cyberpunk-glitch-hero">
export function CyberpunkGlitchHero({
  headline,
  subheading,
  buttonLabel,
  backgroundColor = "#000000",
  headlineColor = "#ffffff",
  subheadingColor = "#22c55e",
  buttonBackgroundColor = "#ef4444",
  buttonTextColor = "#000000",
  glitchColor1 = "#ef4444",
  glitchColor2 = "#3b82f6",
}: CyberpunkGlitchHeroProps) {
  return (
    <div
      className="relative flex h-[350px] items-center justify-center overflow-hidden font-mono"
      style={{ backgroundColor }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="z-20 text-center">
        <h1
          className="text-6xl font-bold tracking-tighter"
          style={{
            color: headlineColor,
            textShadow: `2px 2px ${glitchColor1}, -2px -2px ${glitchColor2}`,
          }}
        >
          {headline}
        </h1>
        <p
          className="mt-2 text-xs uppercase tracking-[0.5em] animate-pulse"
          style={{ color: subheadingColor }}
        >
          {subheading}
        </p>
        <button
          className="mt-8 border border-transparent px-8 py-3 text-sm uppercase transition-colors hover:opacity-90"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export type MinimalDataHeroProps = HeroComponentProps<"minimal-data-hero">
export function MinimalDataHero({
  referenceCode,
  statusText,
  lineOne,
  lineTwo,
  lineThree,
  speedValue,
  uptimeValue,
  nodesValue,
  backgroundColor = "#f5f5f5",
  textColor = "#171717",
  accentColor = "#ef4444",
}: MinimalDataHeroProps) {
  return (
    <div className="flex h-[300px] flex-col justify-between p-6 font-mono" style={{ backgroundColor, color: textColor }}>
      <div className="flex justify-between border-b pb-2 text-xs" style={{ borderColor: textColor }}>
        <span>{referenceCode}</span>
        <span>{statusText}</span>
      </div>
      <div className="flex-1">
        <h1 className="text-5xl font-bold leading-none tracking-tighter">
          {lineOne}
          <br />
          {lineTwo}
          <br />
          <span style={{ color: accentColor }}>{lineThree}</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 border-t pt-4 text-xs md:grid-cols-4" style={{ borderColor: textColor }}>
        <div>
          <span className="block opacity-60">SPEED</span>
          {speedValue}
        </div>
        <div>
          <span className="block opacity-60">UPTIME</span>
          {uptimeValue}
        </div>
        <div>
          <span className="block opacity-60">NODES</span>
          {nodesValue}
        </div>
        <div className="text-right">
          <span className="underline">EXPORT CSV</span>
        </div>
      </div>
    </div>
  )
}

export type RestaurantLuxuryHeroProps = HeroComponentProps<"restaurant-luxury-hero">
export function RestaurantLuxuryHero({
  establishedText,
  restaurantName,
  tagline,
  buttonLabel,
  backgroundImage,
  overlayColor = "#000000",
  overlayOpacity = 40,
  headingColor = "#ffffff",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#000000",
}: RestaurantLuxuryHeroProps) {
  return (
    <div className="relative flex h-[400px] items-center justify-center text-center" style={{ color: headingColor }}>
      <div className="pointer-events-none absolute inset-0 border-[16px] z-20" style={{ borderColor: "#1c1917" }} />
      <div className="pointer-events-none absolute inset-4 border opacity-20 z-20" style={{ borderColor: headingColor }} />
      <div className="absolute inset-0 bg-black" />
      <img src={backgroundImage} alt={restaurantName} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }}
      />
      <div className="relative z-10 px-6">
        <h2 className="mb-2 font-serif text-sm italic opacity-80">{establishedText}</h2>
        <h1 className="mb-6 font-serif text-5xl">{restaurantName}</h1>
        <p className="mb-8 font-serif text-lg italic opacity-80">{tagline}</p>
        <button
          className="px-6 py-2 font-serif text-sm uppercase tracking-widest hover:opacity-90"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export type RealEstateHeroProps = HeroComponentProps<"real-estate-hero">
export function RealEstateHero({
  heading,
  locationPlaceholder,
  propertyTypeLabel,
  buttonLabel,
  backgroundImage,
  headingColor = "#ffffff",
  cardBackgroundColor = "#ffffff",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
}: RealEstateHeroProps) {
  return (
    <div className="relative flex h-[400px] flex-col justify-end bg-neutral-900 p-6">
      <img src={backgroundImage} alt={heading} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="relative z-10">
        <h1 className="mb-4 text-3xl font-bold" style={{ color: headingColor }}>
          {heading}
        </h1>
        <div className="flex flex-col gap-2 rounded-xl p-2 shadow-xl md:flex-row" style={{ backgroundColor: cardBackgroundColor }}>
          <div className="flex flex-1 items-center gap-2 border-b px-4 py-2 text-sm md:border-b-0 md:border-r border-neutral-200">
            <MapPin className="text-neutral-400" size={18} />
            <input type="text" placeholder={locationPlaceholder} className="w-full outline-none bg-transparent" />
          </div>
          <div className="flex flex-1 items-center gap-2 border-b px-4 py-2 text-sm md:border-b-0 md:border-r border-neutral-200">
            <Layout className="text-neutral-400" size={18} />
            <select className="w-full bg-transparent outline-none">
              <option>{propertyTypeLabel}</option>
              <option>House</option>
              <option>Apartment</option>
            </select>
          </div>
          <button
            className="rounded-lg px-8 py-3 font-semibold hover:opacity-90"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export type CourseCreatorHeroProps = HeroComponentProps<"course-creator-hero">
export function CourseCreatorHero({
  badgeText,
  heading,
  description,
  instructorName,
  instructorTitle,
  priceLabel,
  backgroundColor = "#18181b",
  badgeBackgroundColor = "#3f3f46",
  badgeTextColor = "#ffffff",
  headingColor = "#ffffff",
  descriptionColor = "#a1a1aa",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#000000",
  cardBackgroundColor = "#27272a",
  cardBorderColor = "#3f3f46",
}: CourseCreatorHeroProps) {
  return (
    <div className="px-6 py-16" style={{ backgroundColor }}>
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className="flex-1">
          <div
            className="mb-4 inline-block rounded px-3 py-1 text-xs font-bold uppercase tracking-wide"
            style={{ backgroundColor: badgeBackgroundColor, color: badgeTextColor }}
          >
            {badgeText}
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight" style={{ color: headingColor }}>
            {heading}
          </h1>
          <p className="mb-6" style={{ color: descriptionColor }}>
            {description}
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border-2 border-indigo-400 bg-indigo-800" />
            <div>
              <div className="font-bold" style={{ color: headingColor }}>
                {instructorName}
              </div>
              <div className="text-xs" style={{ color: descriptionColor }}>
                {instructorTitle}
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full max-w-sm rounded-xl border p-6 backdrop-blur-sm"
          style={{ backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }}
        >
          <h3 className="mb-4 font-semibold" style={{ color: headingColor }}>
            Course Curriculum
          </h3>
          <div className="space-y-3 text-sm" style={{ color: descriptionColor }}>
            {["Hooks Deep Dive", "State Management", "Server Components"].map((lesson) => (
              <div key={lesson} className="flex items-center gap-3">
                <PlayCircle size={16} /> <span>{lesson}</span>
              </div>
            ))}
          </div>
          <button
            className="mt-6 w-full rounded-lg py-3 font-bold hover:opacity-90"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            {priceLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export type NewsletterStackHeroProps = HeroComponentProps<"newsletter-stack-hero">
export function NewsletterStackHero({
  title,
  subtitle,
  issueTitle,
  issueDescription,
  buttonLabel,
  backgroundColor = "#f4f4f5",
  titleColor = "#18181b",
  subtitleColor = "#71717a",
  cardBackgroundColor = "#ffffff",
  cardBorderColor = "#e4e4e7",
  buttonBackgroundColor = "#18181b",
  buttonTextColor = "#ffffff",
}: NewsletterStackHeroProps) {
  return (
    <div className="flex flex-col items-center py-20" style={{ backgroundColor }}>
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-serif font-bold" style={{ color: titleColor }}>
          {title}
        </h1>
        <p className="mt-2" style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      </div>
      <div className="relative mt-8 h-48 w-64">
        {[6, -6, 0].map((rotation, index) => (
          <div
            key={rotation}
            className={cn(
              "absolute top-0 left-0 h-full w-full rounded-xl border p-6 shadow-sm",
              index === 2 && "shadow-lg transition-transform hover:-translate-y-2"
            )}
            style={{
              transform: `rotate(${rotation}deg)`,
              backgroundColor: cardBackgroundColor,
              borderColor: cardBorderColor,
            }}
          >
            {index === 2 ? (
              <>
                <div className="mb-4 text-xs font-bold text-orange-500">ISSUE #42</div>
                <h3 className="mb-2 font-serif text-lg font-bold" style={{ color: titleColor }}>
                  {issueTitle}
                </h3>
                <p className="text-xs" style={{ color: subtitleColor }}>
                  {issueDescription}
                </p>
              </>
            ) : (
              <>
                <div className="mb-4 h-2 w-12 bg-neutral-100" />
                <div className="mb-2 h-2 w-full bg-neutral-100" />
                <div className="h-2 w-2/3 bg-neutral-100" />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-2">
        <input
          type="email"
          placeholder="Email address"
          className="rounded border border-neutral-300 bg-white px-4 py-2 text-sm outline-none focus:border-black"
        />
        <button
          className="rounded px-4 py-2 text-sm font-bold hover:opacity-90"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export type MobileFanHeroProps = HeroComponentProps<"mobile-fan-hero">
export function MobileFanHero({
  heading,
  subheading,
  backgroundColor = "#8b5cf6",
  headingColor = "#ffffff",
  subheadingColor = "#e9d5ff",
}: MobileFanHeroProps) {
  return (
    <div
      className="relative flex h-[400px] flex-col items-center justify-start overflow-hidden pt-16"
      style={{ backgroundColor }}
    >
      <h1 className="relative z-10 mb-2 text-3xl font-bold" style={{ color: headingColor }}>
        {heading}
      </h1>
      <p className="relative z-10 mb-12" style={{ color: subheadingColor }}>
        {subheading}
      </p>
      <div className="relative flex justify-center">
        <div className="absolute top-4 -left-20 h-[300px] w-[150px] -rotate-12 rounded-[24px] border-4 border-black bg-white shadow-2xl" />
        <div className="absolute top-4 -right-20 h-[300px] w-[150px] rotate-12 rounded-[24px] border-4 border-black bg-white shadow-2xl" />
        <div className="absolute top-0 z-10 h-[300px] w-[150px] rounded-[24px] border-4 border-black bg-white shadow-2xl" />
      </div>
    </div>
  )
}

export type NonprofitHeroProps = HeroComponentProps<"nonprofit-hero">
export function NonprofitHero({
  heading,
  description,
  progressLabel,
  progressPercent,
  buttonLabel,
  backgroundColor = "#022c22",
  headingColor = "#ffffff",
  descriptionColor = "#a7f3d0",
  progressColor = "#34d399",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#064e3b",
  backgroundImage,
}: NonprofitHeroProps) {
  return (
    <div className="flex h-[400px] flex-col md:flex-row">
      <div className="flex-1 p-10" style={{ backgroundColor }}>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-black/20">
          <Heart className="fill-white" size={24} />
        </div>
        <h1 className="mb-4 text-3xl font-bold" style={{ color: headingColor }}>
          {heading}
        </h1>
        <p className="mb-8" style={{ color: descriptionColor }}>
          {description}
        </p>
        <div className="mb-2 flex justify-between text-xs font-bold uppercase" style={{ color: headingColor }}>
          <span>{progressLabel}</span>
          <span>{progressPercent}</span>
        </div>
        <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-black/20">
          <div className="h-full" style={{ width: progressPercent, backgroundColor: progressColor }} />
        </div>
        <button
          className="w-full rounded py-3 font-bold hover:opacity-90"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonLabel}
        </button>
      </div>
      <div
        className="flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"})` }}
      />
    </div>
  )
}

export type TravelSearchHeroProps = HeroComponentProps<"travel-search-hero">
export function TravelSearchHero({
  heading,
  destinationLabel,
  dateLabel,
  buttonLabel,
  backgroundImage,
  headingColor = "#ffffff",
  cardBackgroundColor = "#ffffff",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
}: TravelSearchHeroProps) {
  return (
    <div
      className="relative flex h-[350px] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 w-full max-w-2xl px-4">
        <h1 className="mb-8 text-center text-4xl font-bold shadow-sm" style={{ color: headingColor }}>
          {heading}
        </h1>
        <div className="flex flex-col gap-2 rounded-2xl p-2 backdrop-blur-md md:flex-row" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
          <div
            className="flex flex-1 items-center gap-2 rounded-xl px-4 py-3"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <MapPin size={18} className="text-neutral-500" />
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-500">Destination</span>
              <div className="text-sm font-medium text-black">{destinationLabel}</div>
            </div>
          </div>
          <div
            className="flex flex-1 items-center gap-2 rounded-xl px-4 py-3"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <Calendar size={18} className="text-neutral-500" />
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-500">Dates</span>
              <div className="text-sm font-medium text-black">{dateLabel}</div>
            </div>
          </div>
          <button
            className="rounded-xl px-6 py-3 font-medium hover:opacity-90"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export type AgencyReelHeroProps = HeroComponentProps<"agency-reel-hero">
export function AgencyReelHero({
  heading,
  reelTitle,
  reelDuration,
  backgroundImage,
  backgroundColor = "#000000",
  headingColor = "#ffffff",
  overlayOpacity = 60,
}: AgencyReelHeroProps) {
  return (
    <div className="px-6 py-20 text-center" style={{ backgroundColor }}>
      <h1 className="mx-auto mb-12 max-w-4xl text-5xl font-bold leading-tight" style={{ color: headingColor }}>
        {heading}
      </h1>
      <div className="group relative mx-auto aspect-video w-full max-w-4xl cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
        <img
          src={backgroundImage}
          alt={reelTitle}
          className="h-full w-full object-cover transition-opacity"
          style={{ opacity: overlayOpacity / 100 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform group-hover:scale-110">
            <Play size={32} fill="white" className="ml-1 text-white" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-left text-white">
          <div className="text-sm font-bold">{reelTitle}</div>
          <div className="text-xs text-neutral-400">{reelDuration}</div>
        </div>
      </div>
    </div>
  )
}

export type ReviewFocusedHeroProps = HeroComponentProps<"review-focused-hero">
export function ReviewFocusedHero({
  quote,
  authorName,
  authorTitle,
  backgroundColor = "#f0f9ff",
  quoteColor = "#0c4a6e",
  authorNameColor = "#0369a1",
  authorTitleColor = "#38bdf8",
  accentColor = "#bae6fd",
}: ReviewFocusedHeroProps) {
  return (
    <div className="px-6 py-20 text-center" style={{ backgroundColor }}>
      <Quote size={48} className="mx-auto mb-6" style={{ color: accentColor }} />
      <h1 className="mx-auto mb-8 max-w-3xl text-3xl font-medium leading-relaxed md:text-4xl" style={{ color: quoteColor }}>
        {quote}
      </h1>
      <div className="flex items-center justify-center gap-4">
        <div className="h-12 w-12 rounded-full" style={{ backgroundColor: authorNameColor }} />
        <div className="text-left">
          <div className="font-bold" style={{ color: authorNameColor }}>
            {authorName}
          </div>
          <div className="text-sm" style={{ color: authorTitleColor }}>
            {authorTitle}
          </div>
        </div>
      </div>
    </div>
  )
}

export type WaitlistViralHeroProps = HeroComponentProps<"waitlist-viral-hero">
export function WaitlistViralHero({
  badgeText,
  heading,
  subheading,
  buttonLabel,
  peopleAheadText,
  backgroundColor = "#171717",
  headingColor = "#ffffff",
  subheadingColor = "#a3a3a3",
  badgeGradientFrom = "#ec4899",
  badgeGradientTo = "#8b5cf6",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#000000",
}: WaitlistViralHeroProps) {
  return (
    <div className="flex flex-col items-center px-6 py-20 text-center" style={{ backgroundColor }}>
      <div
        className="mb-6 rounded-full p-[1px]"
        style={{ backgroundImage: `linear-gradient(to right, ${badgeGradientFrom}, ${badgeGradientTo})` }}
      >
        <div className="rounded-full px-4 py-1 text-xs font-medium text-white" style={{ backgroundColor }}>
          {badgeText}
        </div>
      </div>
      <h1 className="mb-4 text-4xl font-bold" style={{ color: headingColor }}>
        {heading}
      </h1>
      <p className="mb-8" style={{ color: subheadingColor }}>
        {subheading}
      </p>
      <div className="w-full max-w-md space-y-4">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter email"
            className="flex-1 rounded-lg border-none bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            className="rounded-lg px-6 py-3 font-bold hover:opacity-90"
            style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
          >
            {buttonLabel}
          </button>
        </div>
        <p className="text-sm text-neutral-500">
          <span className="font-bold text-green-500">{peopleAheadText}</span> people ahead of you.
        </p>
      </div>
    </div>
  )
}

export type GradientBorderHeroProps = HeroComponentProps<"gradient-border-hero">
export function GradientBorderHero({
  heading,
  description,
  badgeOne,
  badgeTwo,
  backgroundColor = "#0a0a0a",
  cardBackgroundColor = "#171717",
  headingColor = "#ffffff",
  descriptionColor = "#a3a3a3",
  gradientColor = "#6366f1",
  badgeColor = "#818cf8",
}: GradientBorderHeroProps) {
  return (
    <div className="p-6" style={{ backgroundColor }}>
      <div className="relative overflow-hidden rounded-3xl p-[1px]">
        <div
          className="absolute inset-0 animate-spin-slow opacity-50"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${gradientColor} 180deg, transparent 360deg)`,
          }}
        />
        <div className="relative rounded-[23px] py-20 px-8 text-center" style={{ backgroundColor: cardBackgroundColor }}>
          <h1 className="mb-6 text-4xl font-bold" style={{ color: headingColor }}>
            {heading}
          </h1>
          <p className="mx-auto mb-8 max-w-xl" style={{ color: descriptionColor }}>
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: badgeColor }}>
            <div className="flex items-center gap-2">
              <Shield size={16} /> {badgeOne}
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={16} /> {badgeTwo}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export type BentoGridHeroProps = HeroComponentProps<"bento-grid-hero">
export function BentoGridHero({
  titleLeft,
  titleRight,
  statValue,
  statLabel,
  ctaLabel,
  backgroundColor = "#f5f5f5",
  cardOneBackgroundColor = "#000000",
  cardTwoBackgroundImage,
  cardThreeBackgroundColor = "#ffffff",
  cardFourBackgroundColor = "#4f46e5",
  titleColor = "#ffffff",
  secondaryTitleColor = "#737373",
}: BentoGridHeroProps) {
  return (
    <div className="flex h-[500px] flex-col justify-center p-8" style={{ backgroundColor }}>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
        <div
          className="col-span-2 row-span-2 flex flex-col justify-between rounded-3xl p-8"
          style={{ backgroundColor: cardOneBackgroundColor }}
        >
          <div className="h-10 w-10 rounded-full bg-white/20" />
          <div>
            <h1 className="text-3xl font-bold" style={{ color: titleColor }}>
              {titleLeft}
            </h1>
            <h1 className="text-3xl font-bold" style={{ color: secondaryTitleColor }}>
              {titleRight}
            </h1>
          </div>
        </div>
        <div
          className="col-span-1 rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(${cardTwoBackgroundImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"})` }}
        />
        <div
          className="col-span-1 flex flex-col items-center justify-center rounded-3xl p-6 shadow-sm"
          style={{ backgroundColor: cardThreeBackgroundColor }}
        >
          <span className="text-4xl font-bold text-black">{statValue}</span>
          <span className="text-xs text-neutral-500">{statLabel}</span>
        </div>
        <div
          className="col-span-2 flex items-center justify-between rounded-3xl p-6 text-white"
          style={{ backgroundColor: cardFourBackgroundColor }}
        >
          <span className="font-bold">{ctaLabel}</span>
          <div className="rounded-full bg-white/20 p-2">
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export type ComparisonHeroProps = HeroComponentProps<"comparison-hero">
export function ComparisonHero({
  heading,
  themPointOne,
  themPointTwo,
  themPointThree,
  usPointOne,
  usPointTwo,
  usPointThree,
  backgroundColor = "#f9fafb",
  headingColor = "#171717",
  themBackgroundColor = "#ffffff",
  usBackgroundColor = "#eef2ff",
}: ComparisonHeroProps) {
  const themPoints = [themPointOne, themPointTwo, themPointThree]
  const usPoints = [usPointOne, usPointTwo, usPointThree]
  return (
    <div className="px-6 py-16 text-center" style={{ backgroundColor }}>
      <h1 className="mb-12 text-3xl font-bold" style={{ color: headingColor }}>
        {heading}
      </h1>
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
        <div className="p-8 text-left" style={{ backgroundColor: themBackgroundColor }}>
          <h3 className="mb-6 text-sm font-bold uppercase text-neutral-400">Other UI Kits</h3>
          <ul className="space-y-4 text-sm text-neutral-500">
            {themPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                  ×
                </div>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 text-left" style={{ backgroundColor: usBackgroundColor }}>
          <h3 className="mb-6 text-sm font-bold uppercase text-indigo-600">Lumina UI</h3>
          <ul className="space-y-4 text-sm text-neutral-800">
            {usPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={12} />
                </div>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export const heroComponentMap: Record<HeroSlug, React.FC<Record<string, string | number | boolean>>> = {
  "simple-centered-hero": SimpleCenteredHero as React.FC<Record<string, string | number | boolean>>,
  "saas-dashboard-hero": SaaSDashboardHero as React.FC<Record<string, string | number | boolean>>,
  "dev-code-hero": DevCodeHero as React.FC<Record<string, string | number | boolean>>,
  "modern-ecommerce-hero": ModernEcommerceHero as React.FC<Record<string, string | number | boolean>>,
  "app-showcase-hero": AppShowcaseHero as React.FC<Record<string, string | number | boolean>>,
  "email-capture-hero": EmailCaptureHero as React.FC<Record<string, string | number | boolean>>,
  "video-background-hero": VideoBackgroundHero as React.FC<Record<string, string | number | boolean>>,
  "split-screen-hero": SplitScreenHero as React.FC<Record<string, string | number | boolean>>,
  "web3-crypto-hero": Web3CryptoHero as React.FC<Record<string, string | number | boolean>>,
  "search-focused-hero": SearchFocusedHero as React.FC<Record<string, string | number | boolean>>,
  "event-conference-hero": EventConferenceHero as React.FC<Record<string, string | number | boolean>>,
  "social-proof-hero": SocialProofHero as React.FC<Record<string, string | number | boolean>>,
  "modern-brutalist-hero": ModernBrutalistHero as React.FC<Record<string, string | number | boolean>>,
  "podcast-media-hero": PodcastMediaHero as React.FC<Record<string, string | number | boolean>>,
  "gradient-mesh-hero": GradientMeshHero as React.FC<Record<string, string | number | boolean>>,
  "feature-grid-background-hero": FeatureGridBackgroundHero as React.FC<Record<string, string | number | boolean>>,
  "kinetic-type-hero": KineticTypeHero as React.FC<Record<string, string | number | boolean>>,
  "interactive-toggle-hero": InteractiveToggleHero as React.FC<Record<string, string | number | boolean>>,
  "code-ide-hero": CodeIdeHero as React.FC<Record<string, string | number | boolean>>,
  "vertical-split-hero": VerticalSplitHero as React.FC<Record<string, string | number | boolean>>,
  "cyberpunk-glitch-hero": CyberpunkGlitchHero as React.FC<Record<string, string | number | boolean>>,
  "minimal-data-hero": MinimalDataHero as React.FC<Record<string, string | number | boolean>>,
  "restaurant-luxury-hero": RestaurantLuxuryHero as React.FC<Record<string, string | number | boolean>>,
  "real-estate-hero": RealEstateHero as React.FC<Record<string, string | number | boolean>>,
  "course-creator-hero": CourseCreatorHero as React.FC<Record<string, string | number | boolean>>,
  "newsletter-stack-hero": NewsletterStackHero as React.FC<Record<string, string | number | boolean>>,
  "mobile-fan-hero": MobileFanHero as React.FC<Record<string, string | number | boolean>>,
  "nonprofit-hero": NonprofitHero as React.FC<Record<string, string | number | boolean>>,
  "travel-search-hero": TravelSearchHero as React.FC<Record<string, string | number | boolean>>,
  "agency-reel-hero": AgencyReelHero as React.FC<Record<string, string | number | boolean>>,
  "review-focused-hero": ReviewFocusedHero as React.FC<Record<string, string | number | boolean>>,
  "waitlist-viral-hero": WaitlistViralHero as React.FC<Record<string, string | number | boolean>>,
  "gradient-border-hero": GradientBorderHero as React.FC<Record<string, string | number | boolean>>,
  "bento-grid-hero": BentoGridHero as React.FC<Record<string, string | number | boolean>>,
  "comparison-hero": ComparisonHero as React.FC<Record<string, string | number | boolean>>,
}

export const heroComponentsByName = heroSections.reduce<Record<string, React.FC<Record<string, string | number | boolean>>>>(
  (acc, hero) => {
    acc[hero.componentName] = heroComponentMap[hero.slug]
    return acc
  },
  {}
)


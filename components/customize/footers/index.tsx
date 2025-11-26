"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Globe,
  Heart,
  Shield,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Command,
  Sun,
  Moon,
  Send,
  Slack,
  Dribbble,
  Figma,
  Disc,
  ArrowUpRight,
  Zap,
  Terminal
} from "lucide-react"
import { ShinyButton } from "../ShinyButton"
import { footerSections, FooterPropDefinition } from "@/lib/footer-sections"

type FooterDefinition = (typeof footerSections)[number]
export type FooterSlug = FooterDefinition["slug"]

type ExtractFooterDefinition<Slug extends FooterSlug> = Extract<FooterDefinition, { slug: Slug }>
type ExtractFooterProps<Slug extends FooterSlug> = ExtractFooterDefinition<Slug>["props"]

type FooterPropValue<T extends FooterPropDefinition> = T["default"] extends boolean
  ? boolean
  : T["default"] extends number
  ? number
  : string

export type FooterComponentProps<Slug extends FooterSlug> = {
  [K in keyof ExtractFooterProps<Slug>]: any
}

export const footerDefaultProps: Record<FooterSlug, Record<string, string | number | boolean>> =
  footerSections.reduce((acc, footer) => {
    acc[footer.slug] = Object.fromEntries(
      Object.entries(footer.props).map(([key, definition]) => [key, definition.default])
    )
    return acc
  }, {} as Record<FooterSlug, Record<string, string | number | boolean>>)

// --- 1. Simple Centered Footer ---
export type SimpleCenteredFooterProps = FooterComponentProps<"simple-centered-footer">
export function SimpleCenteredFooter({
  companyName = "Lumina UI Inc.",
  copyrightYear = "2024",
  showSocialIcons = true,
  backgroundColor = "#ffffff",
  textColor = "#737373",
  copyrightTextColor = "#737373",
  iconColor = "#a3a3a3",
  borderColor = "#f5f5f5",
}: SimpleCenteredFooterProps) {
  return (
    <footer className="py-12 px-6 border-t" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center gap-6" style={{ color: textColor }}>
          <a href="#" className="hover:text-black transition-colors">About</a>
          <a href="#" className="hover:text-black transition-colors">Blog</a>
          <a href="#" className="hover:text-black transition-colors">Jobs</a>
          <a href="#" className="hover:text-black transition-colors">Press</a>
          <a href="#" className="hover:text-black transition-colors">Accessibility</a>
        </div>
        {showSocialIcons && (
          <div className="flex justify-center gap-6 mb-8" style={{ color: iconColor }}>
            <a href="#" className="hover:text-black"><Twitter size={20} /></a>
            <a href="#" className="hover:text-black"><Instagram size={20} /></a>
            <a href="#" className="hover:text-black"><Github size={20} /></a>
          </div>
        )}
        <p className="text-sm" style={{ color: copyrightTextColor }}>
          &copy; {copyrightYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// --- 2. Multi-Column Large Footer ---
export type MultiColumnLargeFooterProps = FooterComponentProps<"multi-column-large-footer">
export function MultiColumnLargeFooter({
  companyName = "Lumina",
  tagline = "Making the world a better place through constructing elegant hierarchies.",
  copyrightYear = "2024",
  backgroundColor = "#0a0a0a",
  textColor = "#a3a3a3",
  headingColor = "#ffffff",
  logoAccentColor = "#6366f1",
  borderColor = "#262626",
}: MultiColumnLargeFooterProps) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor, color: textColor }}>
      <div className="mx-auto max-w-6xl grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4 font-bold text-xl" style={{ color: headingColor }}>
            <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: logoAccentColor }} /> {companyName}
          </div>
          <p className="mb-6 max-w-xs text-sm">
            {tagline}
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Github size={20} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={20} /></a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold" style={{ color: headingColor }}>Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Marketing</a></li>
            <li><a href="#" className="hover:text-white">Analytics</a></li>
            <li><a href="#" className="hover:text-white">Commerce</a></li>
            <li><a href="#" className="hover:text-white">Insights</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold" style={{ color: headingColor }}>Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Documentation</a></li>
            <li><a href="#" className="hover:text-white">Guides</a></li>
            <li><a href="#" className="hover:text-white">API Status</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold" style={{ color: headingColor }}>Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Jobs</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t pt-8 text-sm flex flex-col md:flex-row justify-between gap-4" style={{ borderColor }}>
        <p>&copy; {copyrightYear} {companyName} Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}


// --- 3. Newsletter Footer ---
export type NewsletterFooterProps = FooterComponentProps<"newsletter-footer">
export function NewsletterFooter({
  heading = "Subscribe to our newsletter",
  description = "The latest news, articles, and resources, sent to your inbox weekly.",
  buttonText = "Subscribe",
  copyrightYear = "2024",
  backgroundColor = "#4338ca",
  headingColor = "#ffffff",
  descriptionColor = "#c7d2fe",
  buttonColor = "#5145cd",
  borderColor = "#5145cd",
}: NewsletterFooterProps) {
  return (
    <footer className="py-12 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: headingColor }}>
            {heading}
          </h2>
          <p className="text-sm" style={{ color: descriptionColor }}>
            {description}
          </p>
        </div>
        <div className="flex gap-2 max-w-md mx-auto mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button
            className="px-6 py-2 rounded-lg font-medium text-white"
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </button>
        </div>
        <div className="border-t pt-6 text-center text-sm" style={{ borderColor, color: descriptionColor }}>
          <p>&copy; {copyrightYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// --- 4. Social Heavy Footer ---
export type SocialHeavyFooterProps = FooterComponentProps<"social-heavy-footer">
export function SocialHeavyFooter({
  heading = "Follow our journey",
  backgroundColor = "#ffffff",
  headingColor = "#171717",
  iconBackgroundColor = "#f5f5f5",
  iconColor = "#737373",
  linkColor = "#737373",
}: SocialHeavyFooterProps) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-xl font-bold mb-8" style={{ color: headingColor }}>
          {heading}
        </h2>
        <div className="flex justify-center gap-6 mb-12">
          {[Twitter, Facebook, Instagram, Linkedin, Youtube, Github].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center justify-center w-14 h-14 rounded-full hover:opacity-80 transition-opacity"
              style={{ backgroundColor: iconBackgroundColor, color: iconColor }}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-sm" style={{ color: linkColor }}>
          <a href="#" className="hover:opacity-70">About</a>
          <a href="#" className="hover:opacity-70">Blog</a>
          <a href="#" className="hover:opacity-70">Careers</a>
          <a href="#" className="hover:opacity-70">Contact</a>
        </div>
      </div>
    </footer>
  )
}

// --- 5. App Download Footer ---
export type AppDownloadFooterProps = FooterComponentProps<"app-download-footer">
export function AppDownloadFooter({
  heading = "Get the app",
  description = "Download our mobile app to manage your projects on the go. Available for iOS and Android devices.",
  backgroundColor = "#fafafa",
  headingColor = "#171717",
  descriptionColor = "#525252",
  buttonBackgroundColor = "#000000",
  borderColor = "#e5e5e5",
}: AppDownloadFooterProps) {
  return (
    <footer className="py-12 px-6 border-t" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3" style={{ color: headingColor }}>
            {heading}
          </h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: descriptionColor }}>
            {description}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium"
            style={{ backgroundColor: buttonBackgroundColor }}
          >
            <Smartphone size={20} />
            App Store
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium"
            style={{ backgroundColor: buttonBackgroundColor }}
          >
            <Smartphone size={20} />
            Google Play
          </button>
        </div>
      </div>
    </footer>
  )
}


// --- 6. Dark Mode Toggle Footer ---
export type DarkModeToggleFooterProps = FooterComponentProps<"dark-mode-toggle-footer">
export function DarkModeToggleFooter({
  companyName = "CMD+UI",
  copyrightYear = "2024",
  copyrightText = "Command UI Labs. Built with precision.",
  backgroundColor = "#171717",
  textColor = "#a3a3a3",
  logoColor = "#ffffff",
  toggleBackgroundColor = "#262626",
  borderColor = "#262626",
}: DarkModeToggleFooterProps) {
  const [isDark, setIsDark] = useState(true)

  return (
    <footer className="py-8 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          <div className="font-bold text-lg" style={{ color: logoColor }}>
            {companyName}
          </div>
          <div className="flex gap-6" style={{ color: textColor }}>
            <a href="#" className="hover:text-white">Product</a>
            <a href="#" className="hover:text-white">Features</a>
            <a href="#" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">Docs</a>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ backgroundColor: toggleBackgroundColor, color: textColor }}
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
            <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
          </button>
        </div>
        <div className="border-t pt-6 text-sm text-center" style={{ borderColor, color: textColor }}>
          <p>&copy; {copyrightYear} {copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

// --- 7. Brutalist Footer ---
export type BrutalistFooterProps = FooterComponentProps<"brutalist-footer">
export function BrutalistFooter({
  email = "hello@studio.com",
  location = "NEW YORK, NY",
  establishedYear = "2024",
  backgroundColor = "#ffde59",
  textColor = "#000000",
  borderColor = "#000000",
  accentColor = "#fbbf24",
}: BrutalistFooterProps) {
  return (
    <footer className="py-12 px-6 border-4" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-black text-sm mb-4 uppercase" style={{ color: textColor }}>
              Contact
            </h3>
            <a
              href={`mailto:${email}`}
              className="text-2xl font-bold underline decoration-4 hover:opacity-70"
              style={{ color: textColor, textDecorationColor: accentColor }}
            >
              {email}
            </a>
          </div>
          <div>
            <h3 className="font-black text-sm mb-4 uppercase" style={{ color: textColor }}>
              Location
            </h3>
            <p className="text-2xl font-bold" style={{ color: textColor }}>
              {location}
            </p>
          </div>
          <div>
            <h3 className="font-black text-sm mb-4 uppercase" style={{ color: textColor }}>
              Est.
            </h3>
            <p className="text-2xl font-bold" style={{ color: textColor }}>
              {establishedYear}
            </p>
          </div>
        </div>
        <div className="border-t-4 pt-6 flex justify-between items-center" style={{ borderColor }}>
          <div className="flex gap-4">
            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="hover:opacity-70" style={{ color: textColor }}>
                <Icon size={24} strokeWidth={3} />
              </a>
            ))}
          </div>
          <p className="font-bold" style={{ color: textColor }}>
            © {establishedYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

// --- 8. Sitemap Footer ---
export type SitemapFooterProps = FooterComponentProps<"sitemap-footer">
export function SitemapFooter({
  backgroundColor = "#fafafa",
  headingColor = "#171717",
  linkColor = "#525252",
  linkHoverColor = "#6366f1",
}: SitemapFooterProps) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {["Product", "Features", "Resources", "Company", "Legal", "Support"].map((section) => (
            <div key={section}>
              <h3 className="font-bold mb-4 text-sm" style={{ color: headingColor }}>
                {section}
              </h3>
              <ul className="space-y-2 text-sm">
                {["Overview", "Features", "Tutorials", "Pricing", "Releases"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:underline transition-colors"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

// --- 9. Logo Showcase Footer ---
export type LogoShowcaseFooterProps = FooterComponentProps<"logo-showcase-footer">
export function LogoShowcaseFooter({
  heading = "Trusted by market leaders",
  copyrightYear = "2024",
  backgroundColor = "#0a0a0a",
  headingColor = "#737373",
  textColor = "#737373",
  dividerColor = "#262626",
}: LogoShowcaseFooterProps) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm mb-8 uppercase tracking-wider" style={{ color: headingColor }}>
          {heading}
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12 items-center justify-items-center opacity-50">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-20 h-12 rounded bg-neutral-800"
            />
          ))}
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between gap-4" style={{ borderColor: dividerColor }}>
          <p className="text-sm" style={{ color: textColor }}>
            &copy; {copyrightYear} All rights reserved.
          </p>
          <div className="flex gap-6 text-sm" style={{ color: textColor }}>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// --- 10. Legal Compliance Footer ---
export type LegalComplianceFooterProps = FooterComponentProps<"legal-compliance-footer">
export function LegalComplianceFooter({
  companyName = "Apple Inc.",
  copyrightYear = "2024",
  backgroundColor = "#ffffff",
  linkColor = "#171717",
  textColor = "#737373",
  badgeColor = "#a3a3a3",
  borderColor = "#e5e5e5",
}: LegalComplianceFooterProps) {
  return (
    <footer className="py-8 px-6 border-t" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs" style={{ color: linkColor }}>
          {["Privacy Policy", "Terms of Use", "Sales Policy", "Legal", "Site Map", "Cookie Settings", "Accessibility"].map((link) => (
            <a key={link} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: textColor }}>
            &copy; {copyrightYear} {companyName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Shield, CreditCard, CheckCircle2].map((Icon, i) => (
              <Icon key={i} size={20} style={{ color: badgeColor }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}


// --- 11. Interactive Hover Footer ---
export type InteractiveHoverFooterProps = FooterComponentProps<"interactive-hover-footer">
export function InteractiveHoverFooter({
  location = "Based in Berlin",
  copyrightYear = "2024",
  backgroundColor = "#000000",
  linkColor = "#404040",
  linkHoverColor = "#ffffff",
  textColor = "#737373",
}: InteractiveHoverFooterProps) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {["Work", "Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-6xl md:text-8xl font-bold transition-colors duration-300"
              style={{ color: linkColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm" style={{ color: textColor }}>
          <p>{location}</p>
          <p>&copy; {copyrightYear}</p>
        </div>
      </div>
    </footer>
  )
}

// --- 12. Background Image Footer ---
export type BackgroundImageFooterProps = FooterComponentProps<"background-image-footer">
export function BackgroundImageFooter({
  heading = "Ready to grow your business?",
  description = "Join 20,000+ companies already using our platform to power their growth.",
  buttonText = "Start Free Trial",
  backgroundImage = "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
  overlayColor = "#000000",
  overlayOpacity = 80,
  headingColor = "#ffffff",
  descriptionColor = "#d4d4d8",
  buttonBackgroundColor = "#ffffff",
  buttonTextColor = "#000000",
}: BackgroundImageFooterProps) {
  return (
    <footer
      className="relative py-20 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity / 100,
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-4" style={{ color: headingColor }}>
          {heading}
        </h2>
        <p className="text-lg mb-8" style={{ color: descriptionColor }}>
          {description}
        </p>
        <button
          className="px-8 py-3 rounded-lg font-medium"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonText}
        </button>
      </div>
    </footer>
  )
}

// --- 13. Gradient Footer ---
export type GradientFooterProps = FooterComponentProps<"gradient-footer">
export function GradientFooter({
  companyName = "LoveUI",
  tagline = "Hand-crafted UI components for your next project. Made with love and passion.",
  copyrightYear = "2024",
  gradientFrom = "#4338ca",
  gradientVia = "#7c3aed",
  gradientTo = "#db2777",
  textColor = "#ffffff",
  linkColor = "#c7d2fe",
  iconColor = "#ec4899",
}: GradientFooterProps) {
  return (
    <footer
      className="py-16 px-6"
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-xl font-bold" style={{ color: textColor }}>
              <Heart size={24} fill={iconColor} style={{ color: iconColor }} />
              {companyName}
            </div>
            <p className="text-sm" style={{ color: linkColor }}>
              {tagline}
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4" style={{ color: textColor }}>
              Product
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: linkColor }}>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4" style={{ color: textColor }}>
              Company
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: linkColor }}>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm" style={{ color: linkColor }}>
          <p>&copy; {copyrightYear} {companyName}. Made with <Heart size={14} className="inline" fill={iconColor} style={{ color: iconColor }} /> for developers.</p>
        </div>
      </div>
    </footer>
  )
}

// --- 14. Minimal Split Footer ---
export type MinimalSplitFooterProps = FooterComponentProps<"minimal-split-footer">
export function MinimalSplitFooter({
  companyName = "monolith.",
  copyrightYear = "2024",
  copyrightText = "Monolith Studio",
  backgroundColor = "#ffffff",
  logoColor = "#000000",
  linkColor = "#525252",
  copyrightColor = "#a3a3a3",
  borderColor = "#f5f5f5",
}: MinimalSplitFooterProps) {
  return (
    <footer className="py-8 px-6 border-t" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold" style={{ color: logoColor }}>
          {companyName}
        </div>
        <div className="flex gap-8 text-sm" style={{ color: linkColor }}>
          <a href="#" className="hover:opacity-70">Work</a>
          <a href="#" className="hover:opacity-70">About</a>
          <a href="#" className="hover:opacity-70">Contact</a>
        </div>
        <p className="text-sm" style={{ color: copyrightColor }}>
          &copy; {copyrightYear} {copyrightText}
        </p>
      </div>
    </footer>
  )
}

// --- 15. Status Indicator Footer ---
export type StatusIndicatorFooterProps = FooterComponentProps<"status-indicator-footer">
export function StatusIndicatorFooter({
  statusText = "System Operational",
  backgroundColor = "#171717",
  textColor = "#a3a3a3",
  statusBackgroundColor = "#0a0a0a",
  statusTextColor = "#22c55e",
  statusDotColor = "#22c55e",
  statusBorderColor = "#262626",
}: StatusIndicatorFooterProps) {
  return (
    <footer className="py-8 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 text-sm" style={{ color: textColor }}>
          <a href="#" className="hover:text-white">Status</a>
          <a href="#" className="hover:text-white">Docs</a>
          <a href="#" className="hover:text-white">Support</a>
          <a href="#" className="hover:text-white">API</a>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm"
          style={{
            backgroundColor: statusBackgroundColor,
            borderColor: statusBorderColor,
            color: statusTextColor,
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusDotColor }} />
          {statusText}
        </div>
      </div>
    </footer>
  )
}


// --- 16. Architectural Footer ---
export type ArchitecturalFooterProps = FooterComponentProps<"architectural-footer">
export function ArchitecturalFooter({
  companyName = "Arkitekt",
  backgroundColor = "#fafafa",
  headingColor = "#000000",
  textColor = "#525252",
  companyNameColor = "#d4d4d8",
  dividerColor = "#e5e5e5",
}: ArchitecturalFooterProps) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b pb-12" style={{ borderColor: dividerColor }}>
          <div className="md:col-span-2">
            <h2 className="text-6xl font-bold mb-4" style={{ color: companyNameColor }}>
              {companyName}
            </h2>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: headingColor }}>
              Studio
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: textColor }}>
              <li><a href="#" className="hover:opacity-70">Projects</a></li>
              <li><a href="#" className="hover:opacity-70">Process</a></li>
              <li><a href="#" className="hover:opacity-70">Team</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: headingColor }}>
              Contact
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: textColor }}>
              <li><a href="#" className="hover:opacity-70">Email</a></li>
              <li><a href="#" className="hover:opacity-70">Instagram</a></li>
              <li><a href="#" className="hover:opacity-70">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs" style={{ color: textColor }}>
          <p>Berlin, Germany</p>
          <p className="text-center">© 2024 All Rights Reserved</p>
          <p className="md:text-right">Privacy · Terms</p>
        </div>
      </div>
    </footer>
  )
}

// --- 17. CTA Attached Footer ---
export type CtaAttachedFooterProps = FooterComponentProps<"cta-attached-footer">
export function CtaAttachedFooter({
  ctaHeading = "Ready to get started?",
  ctaDescription = "Create your account today and start building.",
  ctaButtonText = "Sign Up Free",
  companyName = "Bolt",
  copyrightYear = "2024",
  ctaBackgroundColor = "#6366f1",
  ctaTextColor = "#ffffff",
  ctaButtonBackgroundColor = "#ffffff",
  ctaButtonTextColor = "#6366f1",
  footerBackgroundColor = "#171717",
  footerTextColor = "#a3a3a3",
  logoColor = "#ffffff",
}: CtaAttachedFooterProps) {
  return (
    <>
      <div className="py-16 px-6" style={{ backgroundColor: ctaBackgroundColor }}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: ctaTextColor }}>
            {ctaHeading}
          </h2>
          <p className="text-lg mb-8 opacity-90" style={{ color: ctaTextColor }}>
            {ctaDescription}
          </p>
          <button
            className="px-8 py-3 rounded-lg font-medium"
            style={{ backgroundColor: ctaButtonBackgroundColor, color: ctaButtonTextColor }}
          >
            {ctaButtonText}
          </button>
        </div>
      </div>
      <footer className="py-8 px-6" style={{ backgroundColor: footerBackgroundColor }}>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg" style={{ color: logoColor }}>
            <Zap size={20} />
            {companyName}
          </div>
          <div className="flex gap-6 text-sm" style={{ color: footerTextColor }}>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <p className="text-sm" style={{ color: footerTextColor }}>
            &copy; {copyrightYear} {companyName}
          </p>
        </div>
      </footer>
    </>
  )
}

// --- 18. Developer Focus Footer ---
export type DeveloperFocusFooterProps = FooterComponentProps<"developer-focus-footer">
export function DeveloperFocusFooter({
  companyName = "DevTools",
  version = "v2.4.0",
  githubStars = "12.5k",
  backgroundColor = "#0d1117",
  textColor = "#8b949e",
  headingColor = "#ffffff",
  badgeBackgroundColor = "#161b22",
  badgeBorderColor = "#30363d",
  versionDotColor = "#22c55e",
}: DeveloperFocusFooterProps) {
  return (
    <footer className="py-12 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono font-bold" style={{ color: headingColor }}>
              <Terminal size={20} />
              {companyName}
            </div>
            <div className="flex gap-2">
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-mono"
                style={{ backgroundColor: badgeBackgroundColor, borderColor: badgeBorderColor, color: textColor }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: versionDotColor }} />
                {version}
              </div>
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-mono"
                style={{ backgroundColor: badgeBackgroundColor, borderColor: badgeBorderColor, color: textColor }}
              >
                <Github size={12} />
                {githubStars}
              </div>
            </div>
          </div>
          {["Docs", "API", "Community"].map((section) => (
            <div key={section}>
              <h3 className="font-bold mb-4 text-sm" style={{ color: headingColor }}>
                {section}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: textColor }}>
                <li><a href="#" className="hover:text-white">Getting Started</a></li>
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">Reference</a></li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

// --- 19. Magazine Footer ---
export type MagazineFooterProps = FooterComponentProps<"magazine-footer">
export function MagazineFooter({
  companyName = "WIRED",
  copyrightYear = "2024",
  copyrightText = "Condé Nast. All rights reserved.",
  backgroundColor = "#ffffff",
  headingColor = "#000000",
  linkColor = "#000000",
  categoryColor = "#dc2626",
  companyNameColor = "#000000",
  copyrightColor = "#737373",
  borderColor = "#000000",
  tagBorderColor = "#e5e5e5",
}: MagazineFooterProps) {
  return (
    <footer className="py-12 px-6 border-t-4" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {["Latest", "Culture", "Business", "Science"].map((section) => (
            <div key={section}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: headingColor }}>
                {section}
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <div className="text-xs mb-1 px-2 py-0.5 border rounded-full inline-block" style={{ color: categoryColor, borderColor: tagBorderColor }}>
                      {section}
                    </div>
                    <a href="#" className="text-sm hover:opacity-70 block" style={{ color: linkColor }}>
                      Article Title Goes Here
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t" style={{ borderColor: tagBorderColor }}>
          <div className="text-3xl font-black" style={{ color: companyNameColor }}>
            {companyName}
          </div>
          <p className="text-xs" style={{ color: copyrightColor }}>
            &copy; {copyrightYear} {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}

// --- 20. Ecommerce Trust Footer ---
export type EcommerceTrustFooterProps = FooterComponentProps<"ecommerce-trust-footer">
export function EcommerceTrustFooter({
  companyName = "Luxe.",
  copyrightYear = "2024",
  backgroundColor = "#fafafa",
  headingColor = "#171717",
  textColor = "#737373",
  iconBackgroundColor = "#e5e5e5",
  iconColor = "#525252",
  companyNameColor = "#000000",
  dividerColor = "#e5e5e5",
}: EcommerceTrustFooterProps) {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { icon: Shield, title: "Secure Payments", desc: "SSL Encrypted" },
            { icon: CreditCard, title: "Easy Returns", desc: "30-Day Policy" },
            { icon: CheckCircle2, title: "Authentic Products", desc: "100% Genuine" },
            { icon: Globe, title: "Worldwide Shipping", desc: "Fast Delivery" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: iconBackgroundColor }}
              >
                <item.icon size={20} style={{ color: iconColor }} />
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: headingColor }}>
                {item.title}
              </h3>
              <p className="text-xs" style={{ color: textColor }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: dividerColor }}>
          <div className="text-2xl font-bold" style={{ color: companyNameColor }}>
            {companyName}
          </div>
          <div className="flex gap-6 text-sm" style={{ color: textColor }}>
            <a href="#" className="hover:opacity-70">Privacy</a>
            <a href="#" className="hover:opacity-70">Terms</a>
            <a href="#" className="hover:opacity-70">Shipping</a>
            <a href="#" className="hover:opacity-70">Returns</a>
          </div>
          <p className="text-sm" style={{ color: textColor }}>
            &copy; {copyrightYear} {companyName}
          </p>
        </div>
      </div>
    </footer>
  )
}

// Export all components by name for the component library
export const footerComponentsByName: Record<string, React.ComponentType<any>> = {
  SimpleCenteredFooter,
  MultiColumnLargeFooter,
  NewsletterFooter,
  SocialHeavyFooter,
  AppDownloadFooter,
  DarkModeToggleFooter,
  BrutalistFooter,
  SitemapFooter,
  LogoShowcaseFooter,
  LegalComplianceFooter,
  InteractiveHoverFooter,
  BackgroundImageFooter,
  GradientFooter,
  MinimalSplitFooter,
  StatusIndicatorFooter,
  ArchitecturalFooter,
  CtaAttachedFooter,
  DeveloperFocusFooter,
  MagazineFooter,
  EcommerceTrustFooter,
}


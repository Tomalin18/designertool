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

export type FooterComponentProps<Slug extends FooterSlug> = Record<string, any>;

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
  link1Text = "About",
  link1Url = "#",
  link2Text = "Blog",
  link2Url = "#",
  link3Text = "Jobs",
  link3Url = "#",
  link4Text = "Press",
  link4Url = "#",
  link5Text = "Accessibility",
  link5Url = "#",
  showSocialIcons = true,
  showTwitter = true,
  showInstagram = true,
  showGithub = true,
  twitterUrl = "#",
  instagramUrl = "#",
  githubUrl = "#",
  backgroundColor = "#ffffff",
  textColor = "#737373",
  linkHoverColor = "#000000",
  copyrightTextColor = "#737373",
  iconColor = "#a3a3a3",
  iconHoverColor = "#000000",
  borderColor = "#f5f5f5",
}: SimpleCenteredFooterProps) {
  return (
    <footer className="py-12 px-6 border-t" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center gap-6" style={{ color: textColor }}>
          <a
            href={link1Url}
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = textColor}
          >
            {link1Text}
          </a>
          <a
            href={link2Url}
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = textColor}
          >
            {link2Text}
          </a>
          <a
            href={link3Url}
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = textColor}
          >
            {link3Text}
          </a>
          <a
            href={link4Url}
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = textColor}
          >
            {link4Text}
          </a>
          <a
            href={link5Url}
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = textColor}
          >
            {link5Text}
          </a>
        </div>
        {showSocialIcons && (
          <div className="flex justify-center gap-6 mb-8">
            {showTwitter && (
              <a
                href={twitterUrl}
                className="transition-colors"
                style={{ color: iconColor }}
                onMouseEnter={(e) => e.currentTarget.style.color = iconHoverColor}
                onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
              >
                <Twitter size={20} />
              </a>
            )}
            {showInstagram && (
              <a
                href={instagramUrl}
                className="transition-colors"
                style={{ color: iconColor }}
                onMouseEnter={(e) => e.currentTarget.style.color = iconHoverColor}
                onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
              >
                <Instagram size={20} />
              </a>
            )}
            {showGithub && (
              <a
                href={githubUrl}
                className="transition-colors"
                style={{ color: iconColor }}
                onMouseEnter={(e) => e.currentTarget.style.color = iconHoverColor}
                onMouseLeave={(e) => e.currentTarget.style.color = iconColor}
              >
                <Github size={20} />
              </a>
            )}
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
  solutionsTitle = "Solutions",
  solutionsLink1 = "Marketing",
  solutionsLink2 = "Analytics",
  solutionsLink3 = "Commerce",
  solutionsLink4 = "Insights",
  supportTitle = "Support",
  supportLink1 = "Pricing",
  supportLink2 = "Documentation",
  supportLink3 = "Guides",
  supportLink4 = "API Status",
  companyTitle = "Company",
  companyLink1 = "About",
  companyLink2 = "Blog",
  companyLink3 = "Jobs",
  companyLink4 = "Press",
  showTwitter = true,
  showGithub = true,
  showLinkedin = true,
  privacyLinkText = "Privacy Policy",
  termsLinkText = "Terms of Service",
  backgroundColor = "#0a0a0a",
  textColor = "#a3a3a3",
  linkHoverColor = "#ffffff",
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
            {showTwitter && (
              <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>
                <Twitter size={20} />
              </a>
            )}
            {showGithub && (
              <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>
                <Github size={20} />
              </a>
            )}
            {showLinkedin && (
              <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold" style={{ color: headingColor }}>{solutionsTitle}</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{solutionsLink1}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{solutionsLink2}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{solutionsLink3}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{solutionsLink4}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold" style={{ color: headingColor }}>{supportTitle}</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{supportLink1}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{supportLink2}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{supportLink3}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{supportLink4}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold" style={{ color: headingColor }}>{companyTitle}</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{companyLink1}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{companyLink2}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{companyLink3}</a></li>
            <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{companyLink4}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t pt-8 text-sm flex flex-col md:flex-row justify-between gap-4" style={{ borderColor }}>
        <p>&copy; {copyrightYear} {companyName} Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{privacyLinkText}</a>
          <a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor} onMouseLeave={(e) => e.currentTarget.style.color = textColor}>{termsLinkText}</a>
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
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  copyrightYear = "2024",
  backgroundColor = "#4338ca",
  headingColor = "#ffffff",
  descriptionColor = "#c7d2fe",
  inputBackgroundColor = "rgba(255, 255, 255, 0.1)",
  inputBorderColor = "rgba(255, 255, 255, 0.2)",
  inputTextColor = "#ffffff",
  inputPlaceholderColor = "rgba(255, 255, 255, 0.6)",
  buttonColor = "#5145cd",
  buttonTextColor = "#ffffff",
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
            placeholder={placeholder}
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-white/40"
            style={{
              backgroundColor: inputBackgroundColor,
              borderColor: inputBorderColor,
              color: inputTextColor,
            }}
            onFocus={(e) => {
              e.target.style.setProperty('--placeholder-color', inputPlaceholderColor)
            }}
          />
          <style jsx>{`
            input::placeholder {
              color: ${inputPlaceholderColor};
            }
          `}</style>
          <button
            className="px-6 py-2 rounded-lg font-medium"
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
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
  link1Text = "About",
  link2Text = "Blog",
  link3Text = "Careers",
  link4Text = "Contact",
  showTwitter = true,
  showFacebook = true,
  showInstagram = true,
  showLinkedin = true,
  showYoutube = true,
  showGithub = true,
  backgroundColor = "#ffffff",
  headingColor = "#171717",
  iconBackgroundColor = "#f5f5f5",
  iconColor = "#737373",
  iconHoverColor = "#000000",
  linkColor = "#737373",
  linkHoverColor = "#000000",
}: SocialHeavyFooterProps) {
  const socialIcons = [
    { show: showTwitter, Icon: Twitter },
    { show: showFacebook, Icon: Facebook },
    { show: showInstagram, Icon: Instagram },
    { show: showLinkedin, Icon: Linkedin },
    { show: showYoutube, Icon: Youtube },
    { show: showGithub, Icon: Github },
  ].filter(item => item.show)

  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-xl font-bold mb-8" style={{ color: headingColor }}>
          {heading}
        </h2>
        <div className="flex justify-center gap-6 mb-12">
          {socialIcons.map(({ Icon }, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center justify-center w-14 h-14 rounded-full transition-colors"
              style={{ backgroundColor: iconBackgroundColor, color: iconColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = iconHoverColor
                e.currentTarget.style.backgroundColor = iconHoverColor === "#000000" ? "#f5f5f5" : iconBackgroundColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = iconColor
                e.currentTarget.style.backgroundColor = iconBackgroundColor
              }}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
        <div className="flex justify-center gap-8 text-sm" style={{ color: linkColor }}>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
          >
            {link1Text}
          </a>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
          >
            {link2Text}
          </a>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
          >
            {link3Text}
          </a>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
          >
            {link4Text}
          </a>
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
  appStoreButtonText = "App Store",
  googlePlayButtonText = "Google Play",
  showAppStore = true,
  showGooglePlay = true,
  backgroundColor = "#fafafa",
  headingColor = "#171717",
  descriptionColor = "#525252",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
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
          {showAppStore && (
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
            >
              <Smartphone size={20} />
              {appStoreButtonText}
            </button>
          )}
          {showGooglePlay && (
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
            >
              <Smartphone size={20} />
              {googlePlayButtonText}
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}


// --- 6. Dark Mode Toggle Footer ---
export type DarkModeToggleFooterProps = FooterComponentProps<"dark-mode-toggle-footer">
export function DarkModeToggleFooter({
  companyName = "CMD+UI",
  link1Text = "Product",
  link2Text = "Features",
  link3Text = "Pricing",
  link4Text = "Docs",
  copyrightYear = "2024",
  copyrightText = "Command UI Labs. Built with precision.",
  backgroundColor = "#171717",
  textColor = "#a3a3a3",
  linkHoverColor = "#ffffff",
  logoColor = "#ffffff",
  toggleBackgroundColor = "#262626",
  toggleTextColor = "#a3a3a3",
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
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link1Text}
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link2Text}
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link3Text}
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link4Text}
            </a>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: toggleBackgroundColor, color: toggleTextColor }}
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
  showTwitter = true,
  showInstagram = true,
  showLinkedin = true,
  backgroundColor = "#ffde59",
  textColor = "#000000",
  borderColor = "#000000",
  accentColor = "#fbbf24",
  iconHoverColor = "#000000",
}: BrutalistFooterProps) {
  const socialIcons = [
    { show: showTwitter, Icon: Twitter },
    { show: showInstagram, Icon: Instagram },
    { show: showLinkedin, Icon: Linkedin },
  ].filter(item => item.show)

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
              className="text-2xl font-bold underline decoration-4 transition-opacity hover:opacity-70"
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
            {socialIcons.map(({ Icon }, i) => (
              <a
                key={i}
                href="#"
                className="transition-colors"
                style={{ color: textColor }}
                onMouseEnter={(e) => e.currentTarget.style.color = iconHoverColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textColor}
              >
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
  section1Title = "Product",
  section2Title = "Features",
  section3Title = "Resources",
  section4Title = "Company",
  section5Title = "Legal",
  section6Title = "Support",
  link1Text = "Overview",
  link2Text = "Features",
  link3Text = "Tutorials",
  link4Text = "Pricing",
  link5Text = "Releases",
  backgroundColor = "#fafafa",
  headingColor = "#171717",
  linkColor = "#525252",
  linkHoverColor = "#6366f1",
}: SitemapFooterProps) {
  const sections = [section1Title, section2Title, section3Title, section4Title, section5Title, section6Title]
  const links = [link1Text, link2Text, link3Text, link4Text, link5Text]

  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {sections.map((section) => (
            <div key={section}>
              <h3 className="font-bold mb-4 text-sm" style={{ color: headingColor }}>
                {section}
              </h3>
              <ul className="space-y-2 text-sm">
                {links.map((item) => (
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
  link1Text = "Privacy",
  link2Text = "Terms",
  link3Text = "Cookies",
  backgroundColor = "#0a0a0a",
  headingColor = "#737373",
  textColor = "#737373",
  linkHoverColor = "#ffffff",
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
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link1Text}
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link2Text}
            </a>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link3Text}
            </a>
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
  link1Text = "Privacy Policy",
  link2Text = "Terms of Use",
  link3Text = "Sales Policy",
  link4Text = "Legal",
  link5Text = "Site Map",
  link6Text = "Cookie Settings",
  link7Text = "Accessibility",
  showShield = true,
  showCreditCard = true,
  showCheckCircle = true,
  backgroundColor = "#ffffff",
  linkColor = "#171717",
  linkHoverColor = "#000000",
  textColor = "#737373",
  badgeColor = "#a3a3a3",
  borderColor = "#e5e5e5",
}: LegalComplianceFooterProps) {
  const links = [link1Text, link2Text, link3Text, link4Text, link5Text, link6Text, link7Text]
  const badges = [
    { show: showShield, Icon: Shield },
    { show: showCreditCard, Icon: CreditCard },
    { show: showCheckCircle, Icon: CheckCircle2 },
  ].filter(item => item.show)

  return (
    <footer className="py-8 px-6 border-t" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs" style={{ color: linkColor }}>
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="transition-colors hover:underline"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: textColor }}>
            &copy; {copyrightYear} {companyName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {badges.map(({ Icon }, i) => (
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
  link1Text = "Work",
  link2Text = "Services",
  link3Text = "About",
  link4Text = "Contact",
  location = "Based in Berlin",
  copyrightYear = "2024",
  backgroundColor = "#000000",
  linkColor = "#404040",
  linkHoverColor = "#ffffff",
  textColor = "#737373",
}: InteractiveHoverFooterProps) {
  const links = [link1Text, link2Text, link3Text, link4Text]

  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {links.map((item) => (
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
  productLink1 = "Features",
  productLink2 = "Pricing",
  productLink3 = "Changelog",
  companyLink1 = "About",
  companyLink2 = "Blog",
  companyLink3 = "Careers",
  gradientFrom = "#4338ca",
  gradientVia = "#7c3aed",
  gradientTo = "#db2777",
  textColor = "#ffffff",
  linkColor = "#c7d2fe",
  linkHoverColor = "#ffffff",
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
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                >
                  {productLink1}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                >
                  {productLink2}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                >
                  {productLink3}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4" style={{ color: textColor }}>
              Company
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: linkColor }}>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                >
                  {companyLink1}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                >
                  {companyLink2}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
                >
                  {companyLink3}
                </a>
              </li>
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
  link1Text = "Work",
  link2Text = "About",
  link3Text = "Contact",
  copyrightYear = "2024",
  copyrightText = "Monolith Studio",
  backgroundColor = "#ffffff",
  logoColor = "#000000",
  linkColor = "#525252",
  linkHoverColor = "#000000",
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
          <a 
            href="#" 
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
          >
            {link1Text}
          </a>
          <a 
            href="#" 
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
          >
            {link2Text}
          </a>
          <a 
            href="#" 
            className="transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = linkColor}
          >
            {link3Text}
          </a>
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
  link1Text = "Status",
  link2Text = "Docs",
  link3Text = "Support",
  link4Text = "API",
  statusText = "System Operational",
  backgroundColor = "#171717",
  textColor = "#a3a3a3",
  linkHoverColor = "#ffffff",
  statusBackgroundColor = "#0a0a0a",
  statusTextColor = "#22c55e",
  statusDotColor = "#22c55e",
  statusBorderColor = "#262626",
}: StatusIndicatorFooterProps) {
  const links = [link1Text, link2Text, link3Text, link4Text]

  return (
    <footer className="py-8 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 text-sm" style={{ color: textColor }}>
          {links.map((link) => (
            <a 
              key={link}
              href="#" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              {link}
            </a>
          ))}
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
  studioTitle = "Studio",
  studioLink1 = "Projects",
  studioLink2 = "Process",
  studioLink3 = "Team",
  contactTitle = "Contact",
  contactLink1 = "Email",
  contactLink2 = "Instagram",
  contactLink3 = "LinkedIn",
  location = "Berlin, Germany",
  copyrightText = "© 2024 All Rights Reserved",
  legalLinks = "Privacy · Terms",
  backgroundColor = "#fafafa",
  headingColor = "#000000",
  textColor = "#525252",
  linkHoverColor = "#000000",
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
              {studioTitle}
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: textColor }}>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                >
                  {studioLink1}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                >
                  {studioLink2}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                >
                  {studioLink3}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: headingColor }}>
              {contactTitle}
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: textColor }}>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                >
                  {contactLink1}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                >
                  {contactLink2}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                >
                  {contactLink3}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs" style={{ color: textColor }}>
          <p>{location}</p>
          <p className="text-center">{copyrightText}</p>
          <p className="md:text-right">{legalLinks}</p>
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
  link1Text = "Privacy",
  link2Text = "Terms",
  link3Text = "Contact",
  copyrightYear = "2024",
  ctaBackgroundColor = "#6366f1",
  ctaTextColor = "#ffffff",
  ctaButtonBackgroundColor = "#ffffff",
  ctaButtonTextColor = "#6366f1",
  footerBackgroundColor = "#171717",
  footerTextColor = "#a3a3a3",
  linkHoverColor = "#ffffff",
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
            <a 
              href="#" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = footerTextColor}
            >
              {link1Text}
            </a>
            <a 
              href="#" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = footerTextColor}
            >
              {link2Text}
            </a>
            <a 
              href="#" 
              className="transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = footerTextColor}
            >
              {link3Text}
            </a>
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
  section1Title = "Docs",
  section2Title = "API",
  section3Title = "Community",
  sectionLink1 = "Getting Started",
  sectionLink2 = "Guides",
  sectionLink3 = "Reference",
  backgroundColor = "#0d1117",
  textColor = "#8b949e",
  linkHoverColor = "#ffffff",
  headingColor = "#ffffff",
  badgeBackgroundColor = "#161b22",
  badgeBorderColor = "#30363d",
  versionDotColor = "#22c55e",
}: DeveloperFocusFooterProps) {
  const sections = [section1Title, section2Title, section3Title]
  const links = [sectionLink1, sectionLink2, sectionLink3]

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
          {sections.map((section) => (
            <div key={section}>
              <h3 className="font-bold mb-4 text-sm" style={{ color: headingColor }}>
                {section}
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: textColor }}>
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = textColor}
                    >
                      {link}
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

// --- 19. Magazine Footer ---
export type MagazineFooterProps = FooterComponentProps<"magazine-footer">
export function MagazineFooter({
  companyName = "WIRED",
  copyrightYear = "2024",
  copyrightText = "Condé Nast. All rights reserved.",
  section1Title = "Latest",
  section2Title = "Culture",
  section3Title = "Business",
  section4Title = "Science",
  articleTitle = "Article Title Goes Here",
  backgroundColor = "#ffffff",
  headingColor = "#000000",
  linkColor = "#000000",
  linkHoverColor = "#000000",
  categoryColor = "#dc2626",
  companyNameColor = "#000000",
  copyrightColor = "#737373",
  borderColor = "#000000",
  tagBorderColor = "#e5e5e5",
}: MagazineFooterProps) {
  const sections = [section1Title, section2Title, section3Title, section4Title]

  return (
    <footer className="py-12 px-6 border-t-4" style={{ backgroundColor, borderColor }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {sections.map((section) => (
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
                    <a 
                      href="#" 
                      className="text-sm block transition-opacity"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                      {articleTitle}
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
  badge1Title = "Secure Payments",
  badge1Description = "SSL Encrypted",
  badge2Title = "Easy Returns",
  badge2Description = "30-Day Policy",
  badge3Title = "Authentic Products",
  badge3Description = "100% Genuine",
  badge4Title = "Worldwide Shipping",
  badge4Description = "Fast Delivery",
  link1Text = "Privacy",
  link2Text = "Terms",
  link3Text = "Shipping",
  link4Text = "Returns",
  backgroundColor = "#fafafa",
  headingColor = "#171717",
  textColor = "#737373",
  linkHoverColor = "#000000",
  iconBackgroundColor = "#e5e5e5",
  iconColor = "#525252",
  companyNameColor = "#000000",
  dividerColor = "#e5e5e5",
}: EcommerceTrustFooterProps) {
  const badges = [
    { icon: Shield, title: badge1Title, desc: badge1Description },
    { icon: CreditCard, title: badge2Title, desc: badge2Description },
    { icon: CheckCircle2, title: badge3Title, desc: badge3Description },
    { icon: Globe, title: badge4Title, desc: badge4Description },
  ]
  const links = [link1Text, link2Text, link3Text, link4Text]

  return (
    <footer className="py-16 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {badges.map((item, i) => (
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
            {links.map((link) => (
              <a 
                key={link}
                href="#" 
                className="transition-opacity"
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                {link}
              </a>
            ))}
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


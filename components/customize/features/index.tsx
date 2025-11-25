"use client"

import React, { useState } from "react"
import {
  Zap,
  Shield,
  BarChart,
  Smartphone,
  Globe,
  Code,
  Terminal,
  Layout,
  Lock,
  Search,
  Check,
  ArrowRight,
  PlayCircle,
  Cpu,
  Layers,
  MessageSquare,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { featureSections } from "@/lib/feature-sections"
import { ShinyButton } from "@/components/customize/ShinyButton"

type FeatureDefinition = (typeof featureSections)[number]
export type FeatureSlug = FeatureDefinition["slug"]

// Simplified props type - using Record for flexibility
export type FeatureComponentProps = Record<string, string | number | boolean | undefined>

export const featureDefaultProps: Record<FeatureSlug, Record<string, string | number | boolean>> =
  featureSections.reduce((acc, feature) => {
    acc[feature.slug] = Object.fromEntries(
      Object.entries(feature.props).map(([key, definition]) => [key, definition.default])
    )
    return acc
  }, {} as Record<FeatureSlug, Record<string, string | number | boolean>>)

// --- 1. Bento Grid Features ---
export interface BentoGridFeaturesProps {
  sectionTitle?: string
  sectionSubtitle?: string
  mainFeatureTitle?: string
  mainFeatureDescription?: string
  feature1Title?: string
  feature1Description?: string
  feature2Title?: string
  feature2Description?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  textColor?: string
  mutedTextColor?: string
}
export function BentoGridFeatures({
  sectionTitle = "Everything you need",
  sectionSubtitle = "Packed with features for your next big idea.",
  mainFeatureTitle = "Advanced Analytics",
  mainFeatureDescription = "Get deep insights into user behavior with our real-time tracking dashboard.",
  feature1Title = "Bank-grade Security",
  feature1Description = "AES-256 encryption for all your data at rest.",
  feature2Title = "Lightning Fast",
  feature2Description = "Edge network deployment for 12ms latency.",
  backgroundColor = "#0a0a0a",
  cardBackgroundColor = "#171717",
  accentColor = "#6366f1",
  textColor = "#ffffff",
  mutedTextColor = "#a3a3a3",
}: BentoGridFeaturesProps) {
  return (
    <div className="py-20 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold" style={{ color: textColor }}>{sectionTitle}</h2>
          <p className="mt-4" style={{ color: mutedTextColor }}>{sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Large Block */}
          <div
            className="col-span-1 md:col-span-2 md:row-span-2 rounded-3xl border border-neutral-800 p-8 flex flex-col justify-between overflow-hidden relative group"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart size={200} style={{ color: accentColor }} />
            </div>
            <div>
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
              >
                <BarChart size={20} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: textColor }}>{mainFeatureTitle}</h3>
              <p className="mt-2 max-w-sm" style={{ color: mutedTextColor }}>{mainFeatureDescription}</p>
            </div>
            <div className="mt-8 h-48 rounded-xl bg-neutral-800/50 border border-neutral-700/50 relative overflow-hidden">
              <div className="absolute inset-x-4 bottom-0 h-32 rounded-t-lg" style={{ backgroundColor: `${accentColor}20` }} />
              <div className="absolute inset-x-8 bottom-0 h-20 rounded-t-lg" style={{ backgroundColor: `${accentColor}40` }} />
              <div className="absolute inset-x-12 bottom-0 h-10 rounded-t-lg" style={{ backgroundColor: `${accentColor}60` }} />
            </div>
          </div>
          {/* Small Block 1 */}
          <div
            className="col-span-1 rounded-3xl border border-neutral-800 p-6 group hover:border-neutral-700 transition-colors"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <Shield className="mb-4 text-green-400" size={32} />
            <h3 className="text-lg font-bold" style={{ color: textColor }}>{feature1Title}</h3>
            <p className="mt-2 text-sm" style={{ color: mutedTextColor }}>{feature1Description}</p>
          </div>
          {/* Small Block 2 */}
          <div
            className="col-span-1 rounded-3xl border border-neutral-800 p-6 group hover:border-neutral-700 transition-colors"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <Zap className="mb-4 text-yellow-400" size={32} />
            <h3 className="text-lg font-bold" style={{ color: textColor }}>{feature2Title}</h3>
            <p className="mt-2 text-sm" style={{ color: mutedTextColor }}>{feature2Description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 2. Alternating Side-by-Side ---
export interface AlternatingSideBySideFeaturesProps {
  feature1Badge?: string
  feature1Title?: string
  feature1Description?: string
  feature1Check1?: string
  feature1Check2?: string
  feature2Badge?: string
  feature2Title?: string
  feature2Description?: string
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  accentColor?: string
}
export function AlternatingSideBySideFeatures({
  feature1Badge = "Global Scale",
  feature1Title = "Deploy to the edge in seconds.",
  feature1Description = "Our global CDN ensures your content is delivered from the server closest to your users, reducing latency and improving experience.",
  feature1Check1 = "35+ Data Centers",
  feature1Check2 = "99.99% Uptime SLA",
  feature2Badge = "Developer First",
  feature2Title = "Powerful API for total control.",
  feature2Description = "Automate your workflow with our comprehensive API. Typed SDKs available for TS, Python, and Go.",
  backgroundColor = "#ffffff",
  textColor = "#171717",
  mutedTextColor = "#525252",
  accentColor = "#3b82f6",
}: AlternatingSideBySideFeaturesProps) {
  return (
    <div className="py-24 px-6" style={{ backgroundColor, color: textColor }}>
      <div className="mx-auto max-w-5xl space-y-24">
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
            >
              <Globe size={14} /> {feature1Badge}
            </div>
            <h3 className="text-4xl font-bold tracking-tight">{feature1Title}</h3>
            <p className="text-lg" style={{ color: mutedTextColor }}>{feature1Description}</p>
            <ul className="space-y-2" style={{ color: textColor }}>
              <li className="flex items-center gap-2"><Check size={16} style={{ color: accentColor }} /> {feature1Check1}</li>
              <li className="flex items-center gap-2"><Check size={16} style={{ color: accentColor }} /> {feature1Check2}</li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl bg-neutral-100 p-8 shadow-xl">
              <div className="aspect-square rounded-xl p-1" style={{ background: `linear-gradient(to bottom right, ${accentColor}, #6366f1)` }}>
                <div className="h-full w-full rounded-lg bg-white/90 p-4 flex items-center justify-center">
                  <Globe size={64} style={{ color: accentColor }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-1 space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: "#f3e8ff", color: "#9333ea" }}
            >
              <Code size={14} /> {feature2Badge}
            </div>
            <h3 className="text-4xl font-bold tracking-tight">{feature2Title}</h3>
            <p className="text-lg" style={{ color: mutedTextColor }}>{feature2Description}</p>
            <div className="rounded-lg bg-neutral-900 p-4 font-mono text-sm text-white">
              <span className="text-purple-400">const</span> <span className="text-white">client</span> = <span className="text-yellow-300">new</span> Client();
              <br />
              <span className="text-purple-400">await</span> client.deploy(<span className="text-green-400">&quot;prod&quot;</span>);
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl bg-neutral-100 p-8 shadow-xl">
              <div className="aspect-square rounded-xl p-1" style={{ background: "linear-gradient(to bottom left, #9333ea, #ec4899)" }}>
                <div className="h-full w-full rounded-lg bg-white/90 p-4 flex items-center justify-center">
                  <Terminal size={64} className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 3. Three Column Cards ---
export interface ThreeColumnCardsFeaturesProps {
  sectionTitle?: string
  showAllCards?: boolean
  backgroundColor?: string
  cardBackgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  accentColor?: string
}
export function ThreeColumnCardsFeatures({
  sectionTitle = "Designed for modern teams",
  showAllCards = true,
  backgroundColor = "#fafafa",
  cardBackgroundColor = "#ffffff",
  textColor = "#171717",
  mutedTextColor = "#737373",
  accentColor = "#6366f1",
}: ThreeColumnCardsFeaturesProps) {
  const features = [
    { icon: Layout, title: "Intuitive Interface", desc: "Clean design that stays out of your way." },
    { icon: MessageSquare, title: "Real-time Chat", desc: "Collaborate with your team seamlessly." },
    { icon: Smartphone, title: "Mobile Ready", desc: "Fully responsive on all devices." },
    { icon: Zap, title: "Fast Performance", desc: "Optimized for speed and efficiency." },
    { icon: Lock, title: "Secure Access", desc: "Role-based access control included." },
    { icon: Search, title: "Smart Search", desc: "Find anything in seconds." },
  ]

  const displayFeatures = showAllCards ? features : features.slice(0, 3)

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-16" style={{ color: textColor }}>{sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
              >
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold" style={{ color: textColor }}>{feature.title}</h3>
              <p className="mt-3" style={{ color: mutedTextColor }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 4. Interactive Tabs Feature ---
export interface InteractiveTabsFeaturesProps {
  sectionTitle?: string
  tab1Title?: string
  tab1Content?: string
  tab2Title?: string
  tab2Content?: string
  tab3Title?: string
  tab3Content?: string
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  accentColor?: string
}
export function InteractiveTabsFeatures({
  sectionTitle = "Workflow",
  tab1Title = "Design",
  tab1Content = "Drag and drop interface builder.",
  tab2Title = "Code",
  tab2Content = "Export clean React code instantly.",
  tab3Title = "Deploy",
  tab3Content = "Push to production with one click.",
  backgroundColor = "#0a0a0a",
  textColor = "#ffffff",
  mutedTextColor = "#737373",
  accentColor = "#6366f1",
}: InteractiveTabsFeaturesProps) {
  const [activeTab, setActiveTab] = useState(0)
  const features = [
    { id: 0, title: tab1Title, icon: Layout, content: tab1Content },
    { id: 1, title: tab2Title, icon: Code, content: tab2Content },
    { id: 2, title: tab3Title, icon: Globe, content: tab3Content },
  ]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3 space-y-4">
          <h2 className="text-3xl font-bold mb-8" style={{ color: textColor }}>{sectionTitle}</h2>
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all",
                activeTab === i
                  ? "shadow-lg"
                  : "hover:bg-neutral-900"
              )}
              style={{
                backgroundColor: activeTab === i ? "#262626" : "transparent",
                color: activeTab === i ? textColor : mutedTextColor,
              }}
            >
              <f.icon size={20} />
              <span className="font-semibold">{f.title}</span>
            </button>
          ))}
        </div>
        <div className="w-full md:w-2/3">
          <div className="h-[400px] w-full rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-1">
            <div className="h-full w-full rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center p-8">
              <div className="text-center">
                <div
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full animate-in zoom-in duration-300"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  key={activeTab}
                >
                  {React.createElement(features[activeTab].icon, { size: 40 })}
                </div>
                <h3
                  className="text-2xl font-bold animate-in slide-in-from-bottom-2 duration-300"
                  style={{ color: textColor }}
                  key={`t-${activeTab}`}
                >
                  {features[activeTab].title} Phase
                </h3>
                <p
                  className="mt-2 animate-in slide-in-from-bottom-3 duration-500"
                  style={{ color: mutedTextColor }}
                  key={`c-${activeTab}`}
                >
                  {features[activeTab].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 5. Hover Cards Feature ---
export interface HoverCardsFeaturesProps {
  sectionTitle?: string
  tech1?: string
  tech2?: string
  tech3?: string
  tech4?: string
  hoverDescription?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  textColor?: string
  accentColor?: string
}
export function HoverCardsFeatures({
  sectionTitle = "Core Technologies",
  tech1 = "React",
  tech2 = "TypeScript",
  tech3 = "Tailwind",
  tech4 = "Next.js",
  hoverDescription = "Built for the modern web stack.",
  backgroundColor = "#000000",
  cardBackgroundColor = "#171717",
  textColor = "#ffffff",
  accentColor = "#4f46e5",
}: HoverCardsFeaturesProps) {
  const techs = [tech1, tech2, tech3, tech4]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold" style={{ color: textColor }}>{sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {techs.map((tech, i) => (
            <div
              key={i}
              className="group relative h-64 overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-2"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}50)` }}
              />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <h3 className="text-2xl font-bold" style={{ color: textColor }}>{tech}</h3>
                <p
                  className="mt-2 text-sm translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: "#a3a3a3" }}
                >
                  {hoverDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 6. Code & Preview ---
export interface CodePreviewFeaturesProps {
  sectionTitle?: string
  sectionDescription?: string
  feature1?: string
  feature2?: string
  backgroundColor?: string
  codeBlockBackground?: string
  textColor?: string
  mutedTextColor?: string
  accentColor?: string
}
export function CodePreviewFeatures({
  sectionTitle = "Built for Developers",
  sectionDescription = "Our components are built with the best practices in mind. Accessible, responsive, and easy to customize using Tailwind CSS utility classes.",
  feature1 = "Copy and paste ready",
  feature2 = "Fully responsive",
  backgroundColor = "#0f172a",
  codeBlockBackground = "#1e293b",
  textColor = "#ffffff",
  mutedTextColor = "#94a3b8",
  accentColor = "#6366f1",
}: CodePreviewFeaturesProps) {
  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: textColor }}>{sectionTitle}</h2>
          <p className="mb-8 leading-relaxed" style={{ color: mutedTextColor }}>{sectionDescription}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3" style={{ color: "#cbd5e1" }}>
              <div
                className="h-6 w-6 rounded flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
              >
                <Code size={14} />
              </div>
              <span>{feature1}</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: "#cbd5e1" }}>
              <div
                className="h-6 w-6 rounded flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
              >
                <Layout size={14} />
              </div>
              <span>{feature2}</span>
            </div>
          </div>
        </div>
        <div
          className="rounded-xl p-6 shadow-2xl font-mono text-sm border border-slate-700"
          style={{ backgroundColor: codeBlockBackground }}
        >
          <div className="flex gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="space-y-1">
            <span className="text-purple-400">export const</span> <span className="text-yellow-200">Card</span> = ({"{"}
            <span className="text-blue-300">children</span>
            {"}"}) =&gt; (
            <br />
            &nbsp;&nbsp;
            <span className="text-slate-500">&lt;</span>
            <span className="text-pink-400">div</span>{" "}
            <span className="text-blue-300">className</span>=
            <span className="text-green-400">&quot;p-6 bg-white rounded-xl shadow-sm&quot;</span>
            <span className="text-slate-500">&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"{"}
            <span className="text-blue-300">children</span>
            {"}"}
            <br />
            &nbsp;&nbsp;
            <span className="text-slate-500">&lt;/</span>
            <span className="text-pink-400">div</span>
            <span className="text-slate-500">&gt;</span>
            <br />
            );
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 7. Minimal List Features ---
export interface MinimalListFeaturesProps {
  sectionLabel?: string
  item1Label?: string
  item1Value?: string
  item2Label?: string
  item2Value?: string
  item3Label?: string
  item3Value?: string
  item4Label?: string
  item4Value?: string
  item5Label?: string
  item5Value?: string
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
}
export function MinimalListFeatures({
  sectionLabel = "Specifications",
  item1Label = "Architecture",
  item1Value = "Serverless Edge",
  item2Label = "Database",
  item2Value = "Distributed SQL",
  item3Label = "Latency",
  item3Value = "< 50ms Global",
  item4Label = "Compliance",
  item4Value = "SOC2 Type II",
  item5Label = "Support",
  item5Value = "24/7 Dedicated",
  backgroundColor = "#ffffff",
  textColor = "#171717",
  mutedTextColor = "#737373",
  borderColor = "#e5e5e5",
}: MinimalListFeaturesProps) {
  const items = [
    { label: item1Label, value: item1Value },
    { label: item2Label, value: item2Value },
    { label: item3Label, value: item3Value },
    { label: item4Label, value: item4Value },
    { label: item5Label, value: item5Value },
  ]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: mutedTextColor }}>
          {sectionLabel}
        </span>
        <div className="mt-8 divide-y border-t border-b" style={{ borderColor }}>
          {items.map((item, i) => (
            <div key={i} className="flex justify-between py-6">
              <span className="font-medium" style={{ color: textColor }}>{item.label}</span>
              <span className="font-mono text-sm" style={{ color: mutedTextColor }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 8. Large Image Focus ---
export interface LargeImageFocusFeaturesProps {
  sectionTitle?: string
  featureTitle?: string
  featureDescription?: string
  imageUrl?: string
  backgroundColor?: string
  textColor?: string
  overlayColor?: string
}
export function LargeImageFocusFeatures({
  sectionTitle = "Immersive Details",
  featureTitle = "4K Resolution Support",
  featureDescription = "Experience content like never before with ultra-high definition support across all devices.",
  imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  backgroundColor = "#171717",
  textColor = "#ffffff",
  overlayColor = "#000000",
}: LargeImageFocusFeaturesProps) {
  return (
    <div className="py-24 px-6 text-center" style={{ backgroundColor }}>
      <h2 className="mb-8 text-4xl font-bold" style={{ color: textColor }}>{sectionTitle}</h2>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-neutral-800 shadow-2xl relative group">
        <img
          src={imageUrl}
          alt="Feature"
          className="w-full opacity-60 transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{ backgroundColor: `${overlayColor}66` }}
        >
          <div className="max-w-md" style={{ color: textColor }}>
            <h3 className="text-2xl font-bold">{featureTitle}</h3>
            <p className="mt-4 text-neutral-200">{featureDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 9. Icon Grid Features ---
export interface IconGridFeaturesProps {
  sectionTitle?: string
  itemCount?: number
  backgroundColor?: string
  cardBackgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  accentColor?: string
  borderColor?: string
}
export function IconGridFeatures({
  sectionTitle = "Integrations",
  itemCount = 12,
  backgroundColor = "#fafafa",
  cardBackgroundColor = "#ffffff",
  textColor = "#171717",
  mutedTextColor = "#737373",
  accentColor = "#6366f1",
  borderColor = "#e5e5e5",
}: IconGridFeaturesProps) {
  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-3xl font-bold" style={{ color: textColor }}>{sectionTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[...Array(itemCount)].map((_, i) => (
            <div
              key={i}
              className="aspect-square flex flex-col items-center justify-center rounded-xl border shadow-sm transition-colors cursor-pointer"
              style={{
                backgroundColor: cardBackgroundColor,
                borderColor,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = borderColor)}
            >
              <div className="h-8 w-8 rounded-full bg-neutral-100" />
              <span className="mt-2 text-xs font-medium" style={{ color: mutedTextColor }}>App {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 10. Timeline / Steps ---
export interface TimelineStepsFeaturesProps {
  sectionTitle?: string
  step1Title?: string
  step1Description?: string
  step2Title?: string
  step2Description?: string
  step3Title?: string
  step3Description?: string
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  accentColor?: string
  lineColor?: string
}
export function TimelineStepsFeatures({
  sectionTitle = "How it works",
  step1Title = "Connect Data",
  step1Description = "Link your existing database in one click.",
  step2Title = "Build Interface",
  step2Description = "Drag and drop components to build your app.",
  step3Title = "Launch",
  step3Description = "Share with your team instantly.",
  backgroundColor = "#ffffff",
  textColor = "#171717",
  mutedTextColor = "#737373",
  accentColor = "#6366f1",
  lineColor = "#e5e5e5",
}: TimelineStepsFeaturesProps) {
  const steps = [
    { title: step1Title, desc: step1Description },
    { title: step2Title, desc: step2Description },
    { title: step3Title, desc: step3Description },
  ]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-16 text-center text-3xl font-bold" style={{ color: textColor }}>{sectionTitle}</h2>
        <div className="relative border-l-2 ml-4 space-y-12" style={{ borderColor: lineColor }}>
          {steps.map((step, i) => (
            <div key={i} className="relative pl-8">
              <div
                className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white ring-4"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 0 4px ${accentColor}20` }}
              />
              <h3 className="text-lg font-bold" style={{ color: textColor }}>Step {i + 1}: {step.title}</h3>
              <p className="mt-2" style={{ color: mutedTextColor }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 11. Accordion List ---
export interface AccordionListFeaturesProps {
  sectionTitle?: string
  sectionDescription?: string
  question1?: string
  answer1?: string
  question2?: string
  answer2?: string
  question3?: string
  answer3?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
}
export function AccordionListFeatures({
  sectionTitle = "Frequently Asked",
  sectionDescription = "Everything you need to know about the product details and licensing.",
  question1 = "Is this free to use?",
  answer1 = "Yes, for personal projects. Commercial licenses are available.",
  question2 = "Can I use with Next.js?",
  answer2 = "Absolutely. It is optimized for the React ecosystem including Next.js and Remix.",
  question3 = "Do you offer support?",
  answer3 = "We have a dedicated discord community and email support for premium members.",
  backgroundColor = "#0a0a0a",
  cardBackgroundColor = "#171717",
  textColor = "#ffffff",
  mutedTextColor = "#a3a3a3",
  borderColor = "#262626",
}: AccordionListFeaturesProps) {
  const [open, setOpen] = useState(0)
  const items = [
    { q: question1, a: answer1 },
    { q: question2, a: answer2 },
    { q: question3, a: answer3 },
  ]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: textColor }}>{sectionTitle}</h2>
          <p style={{ color: mutedTextColor }}>{sectionDescription}</p>
        </div>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden"
              style={{ backgroundColor: cardBackgroundColor, borderColor }}
            >
              <button
                onClick={() => setOpen(i === open ? -1 : i)}
                className="flex w-full items-center justify-between p-4 text-left font-medium"
                style={{ color: textColor }}
              >
                {item.q}
                <ArrowRight size={16} className={cn("transition-transform", open === i ? "rotate-90" : "")} />
              </button>
              <div
                className={cn("px-4 pb-4 text-sm", open === i ? "block" : "hidden")}
                style={{ color: mutedTextColor }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 12. Stats Focus ---
export interface StatsFocusFeaturesProps {
  stat1Value?: string
  stat1Label?: string
  stat2Value?: string
  stat2Label?: string
  stat3Value?: string
  stat3Label?: string
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  dividerColor?: string
}
export function StatsFocusFeatures({
  stat1Value = "2.4M+",
  stat1Label = "Daily Active Users",
  stat2Value = "99.9%",
  stat2Label = "Uptime Guaranteed",
  stat3Value = "150+",
  stat3Label = "Countries Served",
  backgroundColor = "#4f46e5",
  textColor = "#ffffff",
  mutedTextColor = "#c7d2fe",
  dividerColor = "#6366f1",
}: StatsFocusFeaturesProps) {
  const stats = [
    { value: stat1Value, label: stat1Label },
    { value: stat2Value, label: stat2Label },
    { value: stat3Value, label: stat3Label },
  ]

  return (
    <div className="py-24 px-6" style={{ backgroundColor, color: textColor }}>
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x" style={{ borderColor: dividerColor }}>
        {stats.map((stat, i) => (
          <div key={i} className="p-4">
            <div className="text-5xl font-bold tracking-tight">{stat.value}</div>
            <div className="mt-2 font-medium" style={{ color: mutedTextColor }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- 13. Masonry Grid ---
export interface MasonryGridFeaturesProps {
  item1Title?: string
  item2Title?: string
  item3Title?: string
  item4Title?: string
  item5Title?: string
  item6Title?: string
  backgroundColor?: string
  textColor?: string
}
export function MasonryGridFeatures({
  item1Title = "Design",
  item2Title = "Code",
  item3Title = "Ship",
  item4Title = "Market",
  item5Title = "Scale",
  item6Title = "Profit",
  backgroundColor = "#ffffff",
  textColor = "#171717",
}: MasonryGridFeaturesProps) {
  const items = [
    { h: "h-64", c: "bg-red-50", t: item1Title },
    { h: "h-40", c: "bg-blue-50", t: item2Title },
    { h: "h-56", c: "bg-green-50", t: item3Title },
    { h: "h-48", c: "bg-yellow-50", t: item4Title },
    { h: "h-60", c: "bg-purple-50", t: item5Title },
    { h: "h-44", c: "bg-orange-50", t: item6Title },
  ]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-5xl columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item, i) => (
          <div key={i} className={cn("break-inside-avoid rounded-2xl p-6 flex flex-col justify-end", item.c, item.h)}>
            <h3 className="text-xl font-bold" style={{ color: textColor }}>{item.t}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- 14. Glassmorphism Features ---
export interface GlassmorphismFeaturesProps {
  feature1Title?: string
  feature1Description?: string
  feature2Title?: string
  feature2Description?: string
  backgroundImageUrl?: string
  cardBackgroundColor?: string
  textColor?: string
  borderColor?: string
}
export function GlassmorphismFeatures({
  feature1Title = "Powerful Engine",
  feature1Description = "Harness the power of WebGL for stunning visualizations.",
  feature2Title = "Layered Architecture",
  feature2Description = "Modular design allowing for infinite scalability.",
  backgroundImageUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop",
  cardBackgroundColor = "#ffffff",
  textColor = "#ffffff",
  borderColor = "#ffffff",
}: GlassmorphismFeaturesProps) {
  return (
    <div
      className="bg-cover bg-center py-24 px-6"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="rounded-2xl border p-8 backdrop-blur-md shadow-xl"
          style={{ backgroundColor: `${cardBackgroundColor}1a`, borderColor: `${borderColor}33` }}
        >
          <Cpu style={{ color: textColor }} className="mb-4" size={32} />
          <h3 className="text-2xl font-bold" style={{ color: textColor }}>{feature1Title}</h3>
          <p className="mt-2" style={{ color: `${textColor}cc` }}>{feature1Description}</p>
        </div>
        <div
          className="rounded-2xl border p-8 backdrop-blur-md shadow-xl"
          style={{ backgroundColor: `${cardBackgroundColor}1a`, borderColor: `${borderColor}33` }}
        >
          <Layers style={{ color: textColor }} className="mb-4" size={32} />
          <h3 className="text-2xl font-bold" style={{ color: textColor }}>{feature2Title}</h3>
          <p className="mt-2" style={{ color: `${textColor}cc` }}>{feature2Description}</p>
        </div>
      </div>
    </div>
  )
}

// --- 15. Dark Mode Terminal ---
export interface DarkTerminalFeaturesProps {
  command?: string
  output1?: string
  output2?: string
  output3?: string
  successMessage?: string
  backgroundColor?: string
  terminalBackgroundColor?: string
  textColor?: string
  promptColor?: string
  outputColor?: string
  successColor?: string
  borderColor?: string
}
export function DarkTerminalFeatures({
  command = "init feature-matrix",
  output1 = "[+] Analyzed Requirements...",
  output2 = "[+] Generating Layouts...",
  output3 = "[+] Optimizing Assets...",
  successMessage = "Done! 15 new features added.",
  backgroundColor = "#171717",
  terminalBackgroundColor = "#0a0a0a",
  textColor = "#ffffff",
  promptColor = "#22c55e",
  outputColor = "#737373",
  successColor = "#22c55e",
  borderColor = "#404040",
}: DarkTerminalFeaturesProps) {
  return (
    <div className="py-24 px-6 font-mono" style={{ backgroundColor }}>
      <div
        className="mx-auto max-w-3xl rounded-xl border p-6 shadow-2xl"
        style={{ backgroundColor: terminalBackgroundColor, borderColor }}
      >
        <div className="flex gap-2 mb-4 border-b pb-4" style={{ borderColor }}>
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <span style={{ color: promptColor }}>➜</span>
            <span style={{ color: textColor }}>{command}</span>
          </div>
          <div className="pl-6" style={{ color: outputColor }}>
            {output1}
            <br />
            {output2}
            <br />
            {output3}
            <br />
            <span style={{ color: successColor }}>{successMessage}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 16. Comparison Table ---
export interface ComparisonTableFeaturesProps {
  freeTier?: string
  proTier?: string
  enterpriseTier?: string
  row1Label?: string
  row2Label?: string
  row3Label?: string
  row4Label?: string
  backgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  accentColor?: string
  borderColor?: string
}
export function ComparisonTableFeatures({
  freeTier = "Free",
  proTier = "Pro",
  enterpriseTier = "Enterprise",
  row1Label = "Projects",
  row2Label = "Users",
  row3Label = "Storage",
  row4Label = "Support",
  backgroundColor = "#ffffff",
  textColor = "#171717",
  mutedTextColor = "#737373",
  accentColor = "#6366f1",
  borderColor = "#e5e5e5",
}: ComparisonTableFeaturesProps) {
  const rows = [
    { n: row1Label, f: "1", p: "Unlimited", e: "Unlimited" },
    { n: row2Label, f: "1", p: "5", e: "Unlimited" },
    { n: row3Label, f: "1GB", p: "100GB", e: "Unlimited" },
    { n: row4Label, f: "Community", p: "Email", e: "24/7 Phone" },
  ]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-4 border-b" style={{ borderColor }}></th>
              <th className="py-4 px-4 border-b text-center font-bold" style={{ borderColor, color: textColor }}>{freeTier}</th>
              <th
                className="py-4 px-4 border-b text-center font-bold rounded-t-lg"
                style={{ borderColor, color: accentColor, backgroundColor: `${accentColor}10` }}
              >
                {proTier}
              </th>
              <th className="py-4 px-4 border-b text-center font-bold" style={{ borderColor, color: textColor }}>{enterpriseTier}</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="py-4 font-medium border-b" style={{ borderColor, color: mutedTextColor }}>{row.n}</td>
                <td className="py-4 px-4 text-center border-b" style={{ borderColor, color: mutedTextColor }}>{row.f}</td>
                <td
                  className="py-4 px-4 text-center font-bold border-b"
                  style={{ borderColor: `${accentColor}20`, color: `${accentColor}`, backgroundColor: `${accentColor}10` }}
                >
                  {row.p}
                </td>
                <td className="py-4 px-4 text-center border-b" style={{ borderColor, color: mutedTextColor }}>{row.e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// --- 17. App Screenshots ---
export interface AppScreenshotsFeaturesProps {
  sectionTitle?: string
  showThreeScreens?: boolean
  backgroundColor?: string
  deviceFrameColor?: string
  screenBackgroundColor?: string
  textColor?: string
  accentColor?: string
}
export function AppScreenshotsFeatures({
  sectionTitle = "Mobile Experience",
  showThreeScreens = true,
  backgroundColor = "#0a0a0a",
  deviceFrameColor = "#262626",
  screenBackgroundColor = "#171717",
  textColor = "#ffffff",
  accentColor = "#6366f1",
}: AppScreenshotsFeaturesProps) {
  const screens = showThreeScreens ? 3 : 1

  return (
    <div className="py-24 px-6 overflow-hidden" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-12" style={{ color: textColor }}>{sectionTitle}</h2>
        <div className="flex justify-center gap-8">
          {[...Array(screens)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-[280px] h-[580px] rounded-[3rem] border-8 overflow-hidden relative shadow-2xl",
                i !== 1 && screens > 1 ? "translate-y-12" : "z-10"
              )}
              style={{ borderColor: deviceFrameColor, backgroundColor: screenBackgroundColor }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 rounded-b-xl z-10"
                style={{ backgroundColor: deviceFrameColor }}
              />
              <div className="h-full w-full p-4 pt-12 space-y-4" style={{ backgroundColor: `${screenBackgroundColor}80` }}>
                <div className="h-8 w-1/2 rounded" style={{ backgroundColor: `${deviceFrameColor}` }} />
                <div className="h-32 rounded-xl" style={{ backgroundColor: `${accentColor}20` }} />
                <div className="h-12 rounded-xl" style={{ backgroundColor: `${deviceFrameColor}80` }} />
                <div className="h-12 rounded-xl" style={{ backgroundColor: `${deviceFrameColor}80` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 18. Video Embed ---
export interface VideoEmbedFeaturesProps {
  sectionTitle?: string
  thumbnailUrl?: string
  backgroundColor?: string
  textColor?: string
  playButtonColor?: string
}
export function VideoEmbedFeatures({
  sectionTitle = "See it in action",
  thumbnailUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
  backgroundColor = "#ffffff",
  textColor = "#171717",
  playButtonColor = "#ffffff",
}: VideoEmbedFeaturesProps) {
  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-8" style={{ color: textColor }}>{sectionTitle}</h2>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl group cursor-pointer">
          <img src={thumbnailUrl} className="h-full w-full object-cover opacity-60" alt="Video Thumb" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
              <PlayCircle size={48} style={{ color: playButtonColor }} className="fill-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 19. Testimonial Integration ---
export interface TestimonialFeaturesProps {
  sectionTitle?: string
  sectionDescription?: string
  ctaLabel?: string
  testimonial1?: string
  testimonial2?: string
  testimonial3?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
}
export function TestimonialFeatures({
  sectionTitle = "Loved by developers.",
  sectionDescription = "Don't just take our word for it. Join thousands of developers building the future.",
  ctaLabel = "Start Building",
  testimonial1 = "This library saved me weeks of development time. The components are top notch.",
  testimonial2 = "This library saved me weeks of development time. The components are top notch.",
  testimonial3 = "This library saved me weeks of development time. The components are top notch.",
  backgroundColor = "#1e1b4b",
  cardBackgroundColor = "#312e81",
  textColor = "#ffffff",
  mutedTextColor = "#c7d2fe",
  borderColor = "#3730a3",
}: TestimonialFeaturesProps) {
  const testimonials = [testimonial1, testimonial2, testimonial3]

  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6" style={{ color: textColor }}>{sectionTitle}</h2>
          <p className="text-lg mb-8" style={{ color: mutedTextColor }}>{sectionDescription}</p>
          <ShinyButton className="bg-white text-indigo-950 hover:text-indigo-900">{ctaLabel}</ShinyButton>
        </div>
        <div className="grid gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="rounded-xl p-6 backdrop-blur-sm border"
              style={{ backgroundColor: `${cardBackgroundColor}80`, borderColor }}
            >
              <p className="italic" style={{ color: mutedTextColor }}>&quot;{testimonial}&quot;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "#818cf8" }} />
                <span className="text-sm font-bold" style={{ color: textColor }}>Dev User {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- 20. Interactive Hotspots ---
export interface HotspotFeaturesProps {
  imageUrl?: string
  hotspot1Title?: string
  hotspot1Description?: string
  hotspot2Title?: string
  hotspot2Description?: string
  backgroundColor?: string
  hotspotColor?: string
  tooltipBackgroundColor?: string
  textColor?: string
  mutedTextColor?: string
}
export function HotspotFeatures({
  imageUrl = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
  hotspot1Title = "Retina Display",
  hotspot1Description = "Crystal clear pixels.",
  hotspot2Title = "Ergonomic Design",
  hotspot2Description = "Comfort for all day use.",
  backgroundColor = "#f5f5f5",
  hotspotColor = "#6366f1",
  tooltipBackgroundColor = "#ffffff",
  textColor = "#171717",
  mutedTextColor = "#737373",
}: HotspotFeaturesProps) {
  return (
    <div className="py-24 px-6" style={{ backgroundColor }}>
      <div className="mx-auto max-w-4xl relative">
        <img src={imageUrl} className="rounded-2xl shadow-xl w-full" alt="Workplace" />

        {/* Hotspot 1 */}
        <div className="absolute top-1/3 left-1/4 group">
          <div
            className="h-6 w-6 rounded-full ring-4 ring-white shadow-lg cursor-pointer animate-pulse"
            style={{ backgroundColor: hotspotColor }}
          />
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity text-sm pointer-events-none z-10"
            style={{ backgroundColor: tooltipBackgroundColor }}
          >
            <span className="font-bold block" style={{ color: textColor }}>{hotspot1Title}</span>
            <span style={{ color: mutedTextColor }}>{hotspot1Description}</span>
          </div>
        </div>

        {/* Hotspot 2 */}
        <div className="absolute bottom-1/3 right-1/4 group">
          <div
            className="h-6 w-6 rounded-full ring-4 ring-white shadow-lg cursor-pointer animate-pulse delay-75"
            style={{ backgroundColor: hotspotColor }}
          />
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity text-sm pointer-events-none z-10"
            style={{ backgroundColor: tooltipBackgroundColor }}
          >
            <span className="font-bold block" style={{ color: textColor }}>{hotspot2Title}</span>
            <span style={{ color: mutedTextColor }}>{hotspot2Description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export component map
export const featureComponentsByName: Record<string, React.ComponentType<any>> = {
  BentoGridFeatures,
  AlternatingSideBySideFeatures,
  ThreeColumnCardsFeatures,
  InteractiveTabsFeatures,
  HoverCardsFeatures,
  CodePreviewFeatures,
  MinimalListFeatures,
  LargeImageFocusFeatures,
  IconGridFeatures,
  TimelineStepsFeatures,
  AccordionListFeatures,
  StatsFocusFeatures,
  MasonryGridFeatures,
  GlassmorphismFeatures,
  DarkTerminalFeatures,
  ComparisonTableFeatures,
  AppScreenshotsFeatures,
  VideoEmbedFeatures,
  TestimonialFeatures,
  HotspotFeatures,
}


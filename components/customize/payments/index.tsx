"use client"

import React, { useState } from "react"
import {
  Check,
  X,
  CreditCard,
  Lock,
  Shield,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  Download,
  FileText,
  Clock,
  AlertCircle,
  Search,
  Wallet,
  Bitcoin,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  RefreshCw,
  Gift,
  Building,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { paymentSections } from "@/lib/payment-sections"
import { ShinyButton } from "@/components/customize/ShinyButton"

type PaymentDefinition = (typeof paymentSections)[number]
export type PaymentSlug = PaymentDefinition["slug"]

export type PaymentComponentProps = Record<string, string | number | boolean | undefined>

export const paymentDefaultProps: Record<PaymentSlug, Record<string, string | number | boolean>> =
  paymentSections.reduce((acc, payment) => {
    acc[payment.slug] = Object.fromEntries(
      Object.entries(payment.props).map(([key, definition]) => [key, definition.default])
    )
    return acc
  }, {} as Record<PaymentSlug, Record<string, string | number | boolean>>)

// --- 1. Simple Three-Tier Pricing ---
export interface SimpleThreeTierPricingProps {
  plan1Name?: string
  plan1Price?: string
  plan1Desc?: string
  plan2Name?: string
  plan2Price?: string
  plan2Desc?: string
  plan3Name?: string
  plan3Price?: string
  plan3Desc?: string
  showPopularBadge?: boolean
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function SimpleThreeTierPricing({
  plan1Name = "Starter",
  plan1Price = "$0",
  plan1Desc = "For personal projects",
  plan2Name = "Pro",
  plan2Price = "$29",
  plan2Desc = "For growing teams",
  plan3Name = "Enterprise",
  plan3Price = "$99",
  plan3Desc = "For large scale",
  showPopularBadge = true,
  backgroundColor = "#0a0a0a",
  cardBackgroundColor = "#0a0a0a",
  accentColor = "#6366f1",
  textColor = "#ffffff",
}: SimpleThreeTierPricingProps) {
  const plans = [
    { name: plan1Name, price: plan1Price, desc: plan1Desc, features: ["1 Project", "Community Support", "1GB Storage"], popular: false },
    { name: plan2Name, price: plan2Price, desc: plan2Desc, features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Analytics"], popular: true },
    { name: plan3Name, price: plan3Price, desc: plan3Desc, features: ["Everything in Pro", "SSO", "Dedicated Manager", "SLA"], popular: false },
  ]

  return (
    <div className="p-8" style={{ backgroundColor }}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={cn(
              "relative flex flex-col rounded-2xl border p-6",
              plan.popular ? "border-opacity-100" : "border-neutral-800"
            )}
            style={{
              backgroundColor: plan.popular ? "#171717" : cardBackgroundColor,
              borderColor: plan.popular ? accentColor : undefined,
            }}
          >
            {plan.popular && showPopularBadge && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                POPULAR
              </div>
            )}
            <h3 className="text-lg font-bold" style={{ color: textColor }}>{plan.name}</h3>
            <div className="my-4">
              <span className="text-3xl font-bold" style={{ color: textColor }}>{plan.price}</span>
              <span className="text-neutral-500">/mo</span>
            </div>
            <p className="mb-6 text-sm text-neutral-400">{plan.desc}</p>
            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-neutral-300">
                  <Check size={16} style={{ color: accentColor }} /> {f}
                </li>
              ))}
            </ul>
            <ShinyButton variant={plan.popular ? "primary" : "outline"} className="w-full justify-center">
              Select {plan.name}
            </ShinyButton>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- 2. Toggle Pricing ---
export interface TogglePricingProps {
  planName?: string
  monthlyPrice?: string
  yearlyPrice?: string
  discountText?: string
  ctaText?: string
  showDiscount?: boolean
  backgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function TogglePricing({
  planName = "Pro Bundle",
  monthlyPrice = "$24",
  yearlyPrice = "$199",
  discountText = "-20%",
  ctaText = "Get Started",
  showDiscount = true,
  backgroundColor = "#ffffff",
  accentColor = "#6366f1",
  textColor = "#171717",
}: TogglePricingProps) {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="flex flex-col items-center p-8" style={{ backgroundColor, color: textColor }}>
      <div className="mb-8 flex items-center gap-4">
        <span className={cn("text-sm font-medium", !annual ? "opacity-100" : "opacity-50")}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className="relative h-6 w-12 rounded-full bg-neutral-200 transition-colors focus:outline-none"
        >
          <div
            className="absolute top-1 h-4 w-4 rounded-full transition-all"
            style={{
              backgroundColor: accentColor,
              left: annual ? "1.75rem" : "0.25rem",
            }}
          />
        </button>
        <span className={cn("text-sm font-medium", annual ? "opacity-100" : "opacity-50")}>
          Yearly {showDiscount && <span className="ml-1 font-bold text-green-600">{discountText}</span>}
        </span>
      </div>

      <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-neutral-200 shadow-xl">
        <div className="border-b border-neutral-200 bg-neutral-50 p-6 text-center">
          <h3 className="text-xl font-bold">{planName}</h3>
          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold">{annual ? yearlyPrice : monthlyPrice}</span>
            <span className="text-neutral-500">/{annual ? "yr" : "mo"}</span>
          </div>
        </div>
        <div className="bg-white p-6">
          <ul className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check size={12} />
                </div>
                <span>Premium feature access</span>
              </li>
            ))}
          </ul>
          <button
            className="mt-8 w-full rounded-lg py-3 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: textColor }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- 3. Split Checkout ---
export interface SplitCheckoutProps {
  item1Name?: string
  item1Price?: string
  item1Variant?: string
  item2Name?: string
  item2Price?: string
  item2Variant?: string
  shippingCost?: string
  totalAmount?: string
  backgroundColor?: string
  accentColor?: string
}
export function SplitCheckout({
  item1Name = "Ergonomic Chair",
  item1Price = "$249.00",
  item1Variant = "Black / Mesh",
  item2Name = "Laptop Stand",
  item2Price = "$49.00",
  item2Variant = "Aluminum",
  shippingCost = "$12.00",
  totalAmount = "$310.00",
  backgroundColor = "#fafafa",
  accentColor = "#6366f1",
}: SplitCheckoutProps) {
  return (
    <div className="grid h-[500px] grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col p-8" style={{ backgroundColor }}>
        <h2 className="mb-6 text-lg font-bold text-neutral-900">Order Summary</h2>
        <div className="flex-1 space-y-4">
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-lg bg-neutral-200" />
            <div>
              <h4 className="font-bold">{item1Name}</h4>
              <p className="text-sm text-neutral-500">{item1Variant}</p>
              <p className="mt-1 font-medium">{item1Price}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-lg bg-neutral-200" />
            <div>
              <h4 className="font-bold">{item2Name}</h4>
              <p className="text-sm text-neutral-500">{item2Variant}</p>
              <p className="mt-1 font-medium">{item2Price}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 border-t border-neutral-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span>$298.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">Shipping</span>
            <span>{shippingCost}</span>
          </div>
          <div className="flex justify-between pt-2 text-lg font-bold">
            <span>Total</span>
            <span>{totalAmount}</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-8">
        <h2 className="mb-6 text-lg font-bold text-neutral-900">Payment Details</h2>
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-neutral-500">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-black"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-neutral-500">Card Information</label>
            <div className="flex overflow-hidden rounded-md border border-neutral-300">
              <input type="text" placeholder="Card number" className="w-full p-2 text-sm outline-none" />
              <div className="w-px bg-neutral-300" />
              <input type="text" placeholder="MM/YY" className="w-20 p-2 text-center text-sm outline-none" />
              <div className="w-px bg-neutral-300" />
              <input type="text" placeholder="CVC" className="w-16 p-2 text-center text-sm outline-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-neutral-500">Name on Card</label>
            <input
              type="text"
              className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-black"
            />
          </div>
          <button
            className="mt-4 w-full rounded-lg py-3 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Pay {totalAmount}
          </button>
        </form>
      </div>
    </div>
  )
}

// --- 4. Crypto Payment ---
export interface CryptoPaymentProps {
  title?: string
  subtitle?: string
  walletAddress?: string
  confirmationStatus?: string
  backgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function CryptoPayment({
  title = "Pay with Crypto",
  subtitle = "Send BTC to the address below.",
  walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  confirmationStatus = "Awaiting confirmation... (1/3)",
  backgroundColor = "#0d1117",
  accentColor = "#f7931a",
  textColor = "#ffffff",
}: CryptoPaymentProps) {
  return (
    <div className="flex flex-col items-center p-8" style={{ backgroundColor, color: textColor }}>
      <div
        className="mb-6 rounded-full p-3"
        style={{ backgroundColor: `${accentColor}33`, color: accentColor }}
      >
        <Bitcoin size={32} />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mb-6 text-sm text-neutral-400">{subtitle}</p>

      <div className="w-full max-w-xs rounded-xl border border-neutral-800 bg-[#161b22] p-4 text-center">
        <div className="mx-auto mb-4 h-32 w-32 bg-white p-2">
          <div className="h-full w-full bg-neutral-900" />
        </div>
        <div className="flex items-center gap-2 rounded bg-neutral-900 p-2 font-mono text-xs text-neutral-400">
          <span className="truncate">{walletAddress}</span>
          <button className="text-white hover:opacity-70">
            <Copy size={14} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500">
        <Clock size={14} />
        <span>{confirmationStatus}</span>
      </div>
    </div>
  )
}

// --- 5. Usage Pricing ---
export interface UsagePricingProps {
  title?: string
  subtitle?: string
  unitLabel?: string
  pricePerUnit?: number
  minUnits?: number
  maxUnits?: number
  ctaText?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function UsagePricing({
  title = "Estimate your cost",
  subtitle = "Pay only for what you use.",
  unitLabel = "Active Users",
  pricePerUnit = 12,
  minUnits = 1,
  maxUnits = 100,
  ctaText = "Start Trial",
  backgroundColor = "#171717",
  cardBackgroundColor = "#262626",
  accentColor = "#6366f1",
  textColor = "#ffffff",
}: UsagePricingProps) {
  const [users, setUsers] = useState(15)

  return (
    <div className="p-8 text-center" style={{ backgroundColor, color: textColor }}>
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-12 text-neutral-400">{subtitle}</p>

      <div className="mx-auto max-w-lg rounded-2xl p-8" style={{ backgroundColor: cardBackgroundColor }}>
        <div className="mb-8">
          <div className="mb-4 flex justify-between text-sm font-bold">
            <span>{unitLabel}</span>
            <span style={{ color: accentColor }}>{users} users</span>
          </div>
          <input
            type="range"
            min={minUnits}
            max={maxUnits}
            value={users}
            onChange={(e) => setUsers(parseInt(e.target.value))}
            className="h-2 w-full appearance-none rounded-lg bg-neutral-700"
            style={{ accentColor }}
          />
          <div className="mt-2 flex justify-between text-xs text-neutral-500">
            <span>{minUnits}</span>
            <span>{maxUnits}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-700 pt-6">
          <div className="text-left">
            <div className="text-xs text-neutral-400">Estimated Cost</div>
            <div className="text-3xl font-bold">${users * pricePerUnit}</div>
            <div className="text-xs text-neutral-500">per month</div>
          </div>
          <ShinyButton>{ctaText}</ShinyButton>
        </div>
      </div>
    </div>
  )
}

// --- 6. Method Selector ---
export interface MethodSelectorProps {
  title?: string
  cardLabel?: string
  paypalLabel?: string
  savedCardLast4?: string
  backgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function MethodSelector({
  title = "Select Payment Method",
  cardLabel = "Card",
  paypalLabel = "PayPal",
  savedCardLast4 = "4242",
  backgroundColor = "#ffffff",
  accentColor = "#6366f1",
  textColor = "#171717",
}: MethodSelectorProps) {
  return (
    <div className="p-8" style={{ backgroundColor, color: textColor }}>
      <h3 className="mb-4 font-bold">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="flex items-center gap-3 rounded-xl border p-4 ring-1"
          style={{ borderColor: accentColor, backgroundColor: `${accentColor}11`, ringColor: accentColor }}
        >
          <div
            className="h-5 w-5 rounded-full border-[5px] bg-white"
            style={{ borderColor: accentColor }}
          />
          <div className="flex items-center gap-2 font-bold">
            <CreditCard size={20} /> {cardLabel}
          </div>
        </button>
        <button className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 hover:bg-neutral-50">
          <div className="h-5 w-5 rounded-full border border-neutral-300" />
          <div className="flex items-center gap-2 font-bold">
            <Wallet size={20} /> {paypalLabel}
          </div>
        </button>
      </div>
      <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-bold">Visa ending in {savedCardLast4}</span>
          <button className="text-xs font-medium hover:underline" style={{ color: accentColor }}>
            Edit
          </button>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="CVC" className="w-20 rounded border border-neutral-300 p-2 text-sm" />
        </div>
      </div>
    </div>
  )
}

// --- 7. Invoice Preview ---
export interface InvoicePreviewProps {
  companyName?: string
  invoiceNumber?: string
  billToName?: string
  billToAddress?: string
  invoiceDate?: string
  item1Name?: string
  item1Amount?: string
  item2Name?: string
  item2Amount?: string
  totalAmount?: string
  backgroundColor?: string
}
export function InvoicePreview({
  companyName = "Acme Inc.",
  invoiceNumber = "#INV-2024-001",
  billToName = "Alex Morgan",
  billToAddress = "123 Design St., San Francisco, CA",
  invoiceDate = "Oct 24, 2024",
  item1Name = "Pro Subscription (Yearly)",
  item1Amount = "$199.00",
  item2Name = "Extra Seat x2",
  item2Amount = "$40.00",
  totalAmount = "$239.00",
  backgroundColor = "#f5f5f5",
}: InvoicePreviewProps) {
  return (
    <div className="p-8" style={{ backgroundColor }}>
      <div className="mx-auto max-w-md rounded-sm bg-white p-8 shadow-sm">
        <div className="mb-8 flex justify-between">
          <div className="text-2xl font-bold text-neutral-900">INVOICE</div>
          <div className="text-right">
            <div className="font-bold text-neutral-900">{companyName}</div>
            <div className="text-xs text-neutral-500">{invoiceNumber}</div>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-2 text-sm">
          <div>
            <span className="block text-xs font-bold uppercase text-neutral-500">Bill To</span>
            <span className="block font-medium">{billToName}</span>
            <span className="text-neutral-500">{billToAddress}</span>
          </div>
          <div className="text-right">
            <span className="block text-xs font-bold uppercase text-neutral-500">Date</span>
            <span className="block font-medium">{invoiceDate}</span>
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200">
              <th className="py-2">Item</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-100">
              <td className="py-2 text-neutral-600">{item1Name}</td>
              <td className="py-2 text-right font-medium">{item1Amount}</td>
            </tr>
            <tr className="border-b border-neutral-100">
              <td className="py-2 text-neutral-600">{item2Name}</td>
              <td className="py-2 text-right font-medium">{item2Amount}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="py-4 font-bold text-neutral-900">Total</td>
              <td className="py-4 text-right font-bold text-neutral-900">{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

// --- 8. Subscription Manager ---
export interface SubManagerProps {
  planName?: string
  planPrice?: string
  renewalDate?: string
  storageUsed?: string
  storageTotal?: string
  usagePercent?: number
  showCancelButton?: boolean
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function SubManager({
  planName = "Pro Plan",
  planPrice = "$29",
  renewalDate = "Nov 24, 2024",
  storageUsed = "7.5GB",
  storageTotal = "10GB",
  usagePercent = 75,
  showCancelButton = true,
  backgroundColor = "#171717",
  cardBackgroundColor = "#0a0a0a",
  accentColor = "#6366f1",
  textColor = "#ffffff",
}: SubManagerProps) {
  return (
    <div className="p-8" style={{ backgroundColor, color: textColor }}>
      <h2 className="mb-6 text-xl font-bold">Subscription</h2>
      <div className="rounded-2xl border border-neutral-800 p-6" style={{ backgroundColor: cardBackgroundColor }}>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{planName}</h3>
              <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs font-bold text-green-500">Active</span>
            </div>
            <p className="mt-1 text-sm text-neutral-400">Renews on {renewalDate}</p>
          </div>
          <span className="text-2xl font-bold">
            {planPrice}
            <span className="text-sm font-normal text-neutral-500">/mo</span>
          </span>
        </div>

        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs font-medium text-neutral-400">
            <span>Storage Usage</span>
            <span>
              {storageUsed} / {storageTotal}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-800">
            <div
              className="h-full rounded-full"
              style={{ width: `${usagePercent}%`, backgroundColor: accentColor }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black hover:bg-neutral-200">
            Manage Plan
          </button>
          {showCancelButton && (
            <button className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// --- 9. Success State ---
export interface SuccessStateProps {
  title?: string
  subtitle?: string
  amountPaid?: string
  transactionId?: string
  returnText?: string
  backgroundColor?: string
  successColor?: string
  accentColor?: string
}
export function SuccessState({
  title = "Payment Successful!",
  subtitle = "Thank you for your purchase. A receipt has been sent to your email.",
  amountPaid = "$199.00",
  transactionId = "tx_82739182",
  returnText = "Return to Dashboard",
  backgroundColor = "#ffffff",
  successColor = "#22c55e",
  accentColor = "#6366f1",
}: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor }}>
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundColor: `${successColor}22`, color: successColor }}
      >
        <Check size={40} strokeWidth={3} />
      </div>
      <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
      <p className="mt-2 text-neutral-500">{subtitle}</p>
      <div className="mt-8 rounded-xl bg-neutral-50 p-4 text-sm">
        <div className="mb-2 flex justify-between gap-8">
          <span className="text-neutral-500">Amount Paid</span>
          <span className="font-bold text-neutral-900">{amountPaid}</span>
        </div>
        <div className="flex justify-between gap-8">
          <span className="text-neutral-500">Transaction ID</span>
          <span className="font-mono text-neutral-900">{transactionId}</span>
        </div>
      </div>
      <button className="mt-8 font-medium hover:underline" style={{ color: accentColor }}>
        {returnText}
      </button>
    </div>
  )
}

// --- 10. Comparison Table ---
export interface ComparisonTableProps {
  tier1Name?: string
  tier2Name?: string
  tier3Name?: string
  feature1Name?: string
  feature2Name?: string
  feature3Name?: string
  backgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function ComparisonTable({
  tier1Name = "Free",
  tier2Name = "Pro",
  tier3Name = "Team",
  feature1Name = "Projects",
  feature2Name = "Collaborators",
  feature3Name = "Analytics",
  backgroundColor = "#0a0a0a",
  accentColor = "#6366f1",
  textColor = "#ffffff",
}: ComparisonTableProps) {
  const features = [
    { f: feature1Name, a: "1", b: "Unlimited", c: "Unlimited" },
    { f: feature2Name, a: "0", b: "5", c: "Unlimited" },
    { f: feature3Name, a: false, b: true, c: true },
    { f: "Custom Domain", a: false, b: true, c: true },
    { f: "SSO", a: false, b: false, c: true },
  ]

  return (
    <div className="overflow-x-auto p-8" style={{ backgroundColor, color: textColor }}>
      <table className="w-full min-w-[600px] border-collapse text-left text-sm text-neutral-400">
        <thead>
          <tr>
            <th className="w-1/3 p-4">Features</th>
            <th className="w-1/6 p-4 text-center" style={{ color: textColor }}>{tier1Name}</th>
            <th className="w-1/6 p-4 text-center" style={{ color: accentColor }}>{tier2Name}</th>
            <th className="w-1/6 p-4 text-center" style={{ color: textColor }}>{tier3Name}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {features.map((row, i) => (
            <tr key={i} className="hover:bg-neutral-900/50">
              <td className="p-4 font-medium" style={{ color: textColor }}>{row.f}</td>
              <td className="p-4 text-center">
                {typeof row.a === "boolean" ? (
                  row.a ? <Check className="mx-auto text-green-500" size={16} /> : <X className="mx-auto text-neutral-700" size={16} />
                ) : row.a}
              </td>
              <td className="p-4 text-center font-bold" style={{ color: textColor }}>
                {typeof row.b === "boolean" ? (
                  row.b ? <Check className="mx-auto" style={{ color: accentColor }} size={16} /> : <X className="mx-auto text-neutral-700" size={16} />
                ) : row.b}
              </td>
              <td className="p-4 text-center">
                {typeof row.c === "boolean" ? (
                  row.c ? <Check className="mx-auto text-green-500" size={16} /> : <X className="mx-auto text-neutral-700" size={16} />
                ) : row.c}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// --- 11. Visual Card Input ---
export interface VisualCardInputProps {
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cardBrand?: string
  backgroundColor?: string
  cardGradientFrom?: string
  cardGradientTo?: string
}
export function VisualCardInput({
  cardNumber = "4242 4242 4242 4242",
  cardHolder = "John Doe",
  expiryDate = "12/25",
  cardBrand = "VISA",
  backgroundColor = "#f5f5f5",
  cardGradientFrom = "#262626",
  cardGradientTo = "#000000",
}: VisualCardInputProps) {
  return (
    <div className="flex flex-col items-center gap-8 p-8" style={{ backgroundColor }}>
      {/* Visual Card */}
      <div
        className="relative h-48 w-80 rounded-2xl p-6 text-white shadow-2xl"
        style={{ background: `linear-gradient(to bottom right, ${cardGradientFrom}, ${cardGradientTo})` }}
      >
        <div className="mb-8 flex items-start justify-between">
          <div className="h-8 w-12 rounded bg-neutral-600/50" />
          <div className="text-lg font-bold italic">{cardBrand}</div>
        </div>
        <div className="mb-4">
          <div className="mb-1 text-xs uppercase tracking-widest text-neutral-400">Card Number</div>
          <div className="font-mono text-xl tracking-widest">{cardNumber}</div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-[10px] uppercase text-neutral-400">Card Holder</div>
            <div className="font-medium uppercase">{cardHolder}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-neutral-400">Expires</div>
            <div className="font-medium">{expiryDate}</div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid w-full max-w-sm grid-cols-2 gap-4">
        <input
          className="col-span-2 rounded-lg border border-neutral-300 p-3 text-sm outline-none focus:border-black"
          placeholder="Card Number"
          defaultValue={cardNumber}
        />
        <input
          className="rounded-lg border border-neutral-300 p-3 text-sm outline-none focus:border-black"
          placeholder="MM / YY"
          defaultValue={expiryDate}
        />
        <input
          className="rounded-lg border border-neutral-300 p-3 text-sm outline-none focus:border-black"
          placeholder="CVC"
        />
      </div>
    </div>
  )
}

// --- 12. Addon Selector ---
export interface AddonSelectorProps {
  basePlanPrice?: number
  addon1Name?: string
  addon1Price?: number
  addon1Desc?: string
  addon2Name?: string
  addon2Price?: number
  addon2Desc?: string
  addon3Name?: string
  addon3Price?: number
  addon3Desc?: string
  backgroundColor?: string
  accentColor?: string
}
export function AddonSelector({
  basePlanPrice = 99,
  addon1Name = "Priority Support",
  addon1Price = 19,
  addon1Desc = "24/7 dedicated email line",
  addon2Name = "Dedicated IP",
  addon2Price = 29,
  addon2Desc = "Static IP for your instance",
  addon3Name = "Backup",
  addon3Price = 9,
  addon3Desc = "Daily snapshots",
  backgroundColor = "#ffffff",
  accentColor = "#6366f1",
}: AddonSelectorProps) {
  const [selected, setSelected] = useState<number[]>([])

  const toggle = (id: number) => {
    if (selected.includes(id)) setSelected(selected.filter((x) => x !== id))
    else setSelected([...selected, id])
  }

  const addons = [
    { id: 1, name: addon1Name, price: addon1Price, desc: addon1Desc },
    { id: 2, name: addon2Name, price: addon2Price, desc: addon2Desc },
    { id: 3, name: addon3Name, price: addon3Price, desc: addon3Desc },
  ]

  const total = basePlanPrice + addons.filter((a) => selected.includes(a.id)).reduce((acc, b) => acc + b.price, 0)

  return (
    <div className="mx-auto max-w-md p-8" style={{ backgroundColor }}>
      <h3 className="mb-4 text-lg font-bold">Customize your plan</h3>
      <div className="mb-6 space-y-3">
        <div className="flex justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <span className="font-medium">Base Plan</span>
          <span className="font-bold">${basePlanPrice}</span>
        </div>
        {addons.map((addon) => (
          <div
            key={addon.id}
            onClick={() => toggle(addon.id)}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all",
              selected.includes(addon.id) ? "border-opacity-100" : "border-neutral-200 hover:border-neutral-300"
            )}
            style={{
              borderColor: selected.includes(addon.id) ? accentColor : undefined,
              backgroundColor: selected.includes(addon.id) ? `${accentColor}11` : undefined,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn("flex h-5 w-5 items-center justify-center rounded border")}
                style={{
                  borderColor: selected.includes(addon.id) ? accentColor : "#a3a3a3",
                  backgroundColor: selected.includes(addon.id) ? accentColor : undefined,
                  color: selected.includes(addon.id) ? "#ffffff" : undefined,
                }}
              >
                {selected.includes(addon.id) && <Check size={12} />}
              </div>
              <div>
                <div className="font-medium">{addon.name}</div>
                <div className="text-xs text-neutral-500">{addon.desc}</div>
              </div>
            </div>
            <span className="font-bold text-neutral-900">+${addon.price}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
        <span className="text-lg font-bold">Total /mo</span>
        <span className="text-2xl font-bold">${total}</span>
      </div>
    </div>
  )
}

// --- 13. Promo Input ---
export interface PromoInputProps {
  label?: string
  promoCode?: string
  savedAmount?: string
  successMessage?: string
  buttonText?: string
  backgroundColor?: string
  successColor?: string
}
export function PromoInput({
  label = "Discount Code",
  promoCode = "WELCOME20",
  savedAmount = "$24.00",
  successMessage = "Code applied! You saved",
  buttonText = "Apply",
  backgroundColor = "#171717",
  successColor = "#22c55e",
}: PromoInputProps) {
  return (
    <div className="flex items-center justify-center p-8" style={{ backgroundColor }}>
      <div className="w-full max-w-sm space-y-2">
        <label className="text-xs font-bold uppercase text-neutral-500">{label}</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: successColor }}>
              <Gift size={16} />
            </div>
            <input
              type="text"
              defaultValue={promoCode}
              className="w-full rounded-lg border py-2.5 pl-10 pr-4 font-mono text-sm font-bold focus:outline-none"
              style={{
                borderColor: `${successColor}4d`,
                backgroundColor: `${successColor}1a`,
                color: successColor,
              }}
            />
          </div>
          <button className="rounded-lg bg-neutral-800 px-4 text-sm font-medium text-white hover:bg-neutral-700">
            {buttonText}
          </button>
        </div>
        <p className="text-xs" style={{ color: successColor }}>
          {successMessage} {savedAmount}
        </p>
      </div>
    </div>
  )
}

// --- 14. Billing History ---
export interface BillingHistoryProps {
  title?: string
  row1Date?: string
  row1Amount?: string
  row2Date?: string
  row2Amount?: string
  row3Date?: string
  row3Amount?: string
  backgroundColor?: string
  accentColor?: string
}
export function BillingHistory({
  title = "Billing History",
  row1Date = "Oct 01, 2024",
  row1Amount = "$29.00",
  row2Date = "Sep 01, 2024",
  row2Amount = "$29.00",
  row3Date = "Aug 01, 2024",
  row3Amount = "$29.00",
  backgroundColor = "#ffffff",
  accentColor = "#6366f1",
}: BillingHistoryProps) {
  const rows = [
    { date: row1Date, amount: row1Amount, status: "Paid" },
    { date: row2Date, amount: row2Amount, status: "Paid" },
    { date: row3Date, amount: row3Amount, status: "Paid" },
  ]

  return (
    <div className="p-8" style={{ backgroundColor }}>
      <h3 className="mb-6 text-lg font-bold text-neutral-900">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-neutral-50">
                <td className="px-6 py-4 text-neutral-900">{row.date}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">{row.amount}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-neutral-400 hover:text-indigo-600">
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// --- 15. Enterprise Contact ---
export interface EnterpriseContactProps {
  title?: string
  subtitle?: string
  primaryCtaText?: string
  secondaryCtaText?: string
  showSecondaryButton?: boolean
  backgroundColor?: string
  textColor?: string
}
export function EnterpriseContact({
  title = "Need a custom plan?",
  subtitle = "For large teams with specific security and support requirements, we offer tailored enterprise solutions.",
  primaryCtaText = "Contact Sales",
  secondaryCtaText = "Read Documentation",
  showSecondaryButton = true,
  backgroundColor = "#0a0a0a",
  textColor = "#ffffff",
}: EnterpriseContactProps) {
  return (
    <div className="flex flex-col items-center p-12 text-center" style={{ backgroundColor, color: textColor }}>
      <div className="mb-6 rounded-full border border-neutral-800 bg-neutral-900 p-4">
        <Building size={32} />
      </div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-4 max-w-lg text-neutral-400">{subtitle}</p>
      <div className="mt-8 flex gap-4">
        <ShinyButton>{primaryCtaText}</ShinyButton>
        {showSecondaryButton && <ShinyButton variant="outline">{secondaryCtaText}</ShinyButton>}
      </div>
    </div>
  )
}

// --- 16. Saved Methods ---
export interface SavedMethodsProps {
  title?: string
  card1Brand?: string
  card1Last4?: string
  card1Expiry?: string
  card2Brand?: string
  card2Last4?: string
  card2Expiry?: string
  addNewText?: string
  backgroundColor?: string
  accentColor?: string
}
export function SavedMethods({
  title = "Saved Cards",
  card1Brand = "VISA",
  card1Last4 = "4242",
  card1Expiry = "12/25",
  card2Brand = "Master",
  card2Last4 = "8899",
  card2Expiry = "08/26",
  addNewText = "Add New Method",
  backgroundColor = "#fafafa",
  accentColor = "#6366f1",
}: SavedMethodsProps) {
  return (
    <div className="p-8" style={{ backgroundColor }}>
      <h3 className="mb-4 font-bold text-neutral-900">{title}</h3>
      <div className="space-y-3">
        <div
          className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-neutral-200 transition-all"
          style={{ "--hover-ring": accentColor } as React.CSSProperties}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-16 items-center justify-center rounded bg-neutral-100 font-bold italic text-neutral-600">
              {card1Brand}
            </div>
            <div>
              <div className="font-bold text-neutral-900">•••• {card1Last4}</div>
              <div className="text-xs text-neutral-500">Expires {card1Expiry}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-neutral-100 px-2 py-1 text-xs font-bold text-neutral-600">Default</span>
            <button className="text-neutral-400 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-neutral-200 transition-all hover:ring-indigo-500">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-16 items-center justify-center rounded bg-neutral-100 font-bold text-neutral-600">
              {card2Brand}
            </div>
            <div>
              <div className="font-bold text-neutral-900">•••• {card2Last4}</div>
              <div className="text-xs text-neutral-500">Expires {card2Expiry}</div>
            </div>
          </div>
          <button className="text-neutral-400 opacity-0 hover:text-red-500 group-hover:opacity-100">
            <Trash2 size={16} />
          </button>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 py-4 text-sm font-bold text-neutral-500 hover:border-neutral-400 hover:bg-white hover:text-neutral-900">
          <Plus size={16} /> {addNewText}
        </button>
      </div>
    </div>
  )
}

// --- 17. Micro Tipping ---
export interface MicroTippingProps {
  title?: string
  subtitle?: string
  amount1?: number
  amount2?: number
  amount3?: number
  ctaText?: string
  backgroundColor?: string
  accentColor?: string
}
export function MicroTipping({
  title = "Buy me a coffee",
  subtitle = "Support my work with a small donation.",
  amount1 = 1,
  amount2 = 3,
  amount3 = 5,
  ctaText = "Support",
  backgroundColor = "#ffffff",
  accentColor = "#fbbf24",
}: MicroTippingProps) {
  const [selectedAmount, setSelectedAmount] = useState(amount3)

  return (
    <div className="flex items-center justify-center p-12" style={{ backgroundColor }}>
      <div className="w-full max-w-sm rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ backgroundColor: `${accentColor}22` }}>
          ☕️
        </div>
        <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>

        <div className="my-6 grid grid-cols-3 gap-3">
          {[amount1, amount2, amount3].map((amt) => (
            <button
              key={amt}
              onClick={() => setSelectedAmount(amt)}
              className={cn(
                "rounded-lg border py-2 font-bold text-neutral-900 transition-colors",
                selectedAmount === amt ? "border-yellow-400 bg-yellow-50" : "border-neutral-200 hover:border-yellow-400 hover:bg-yellow-50"
              )}
            >
              ${amt}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
          <input
            type="number"
            placeholder="Custom Amount"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(parseInt(e.target.value) || 0)}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-3 pl-6 pr-4 outline-none focus:border-black"
          />
        </div>

        <button className="mt-4 w-full rounded-lg bg-black py-3 font-bold text-white hover:bg-neutral-800">
          {ctaText} ${selectedAmount}
        </button>
      </div>
    </div>
  )
}

// --- 18. Refund Request ---
export interface RefundRequestProps {
  title?: string
  subtitle?: string
  reason1?: string
  reason2?: string
  reason3?: string
  reason4?: string
  submitText?: string
  cancelText?: string
  backgroundColor?: string
  dangerColor?: string
}
export function RefundRequest({
  title = "Request Refund",
  subtitle = "We're sorry to see you go. Please select a reason for your refund request.",
  reason1 = "Bugs / Technical Issues",
  reason2 = "Accidental Purchase",
  reason3 = "Not what I expected",
  reason4 = "Other",
  submitText = "Submit Request",
  cancelText = "Cancel",
  backgroundColor = "#fafafa",
  dangerColor = "#dc2626",
}: RefundRequestProps) {
  const reasons = [reason1, reason2, reason3, reason4]

  return (
    <div className="p-8" style={{ backgroundColor }}>
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3" style={{ color: dangerColor }}>
          <AlertCircle size={24} />
          <h3 className="font-bold text-neutral-900">{title}</h3>
        </div>
        <p className="mb-6 text-sm text-neutral-600">{subtitle}</p>
        <div className="mb-6 space-y-3">
          {reasons.map((reason) => (
            <label
              key={reason}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50"
            >
              <input type="radio" name="reason" className="text-red-600 focus:ring-red-500" />
              <span className="text-sm text-neutral-900">{reason}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="flex-1 rounded-lg border border-neutral-200 py-2.5 text-sm font-bold text-neutral-600 hover:bg-neutral-50">
            {cancelText}
          </button>
          <button
            className="flex-1 rounded-lg py-2.5 text-sm font-bold text-white hover:opacity-90"
            style={{ backgroundColor: dangerColor }}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- 19. Donation Slider ---
export interface DonationSliderProps {
  title?: string
  impactText?: string
  impactMultiplier?: number
  minAmount?: number
  maxAmount?: number
  defaultAmount?: number
  ctaText?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  accentColor?: string
  textColor?: string
}
export function DonationSlider({
  title = "Make an impact",
  impactText = "meals for families",
  impactMultiplier = 10,
  minAmount = 10,
  maxAmount = 500,
  defaultAmount = 50,
  ctaText = "Donate",
  backgroundColor = "#171717",
  cardBackgroundColor = "#262626",
  accentColor = "#22c55e",
  textColor = "#ffffff",
}: DonationSliderProps) {
  const [amount, setAmount] = useState(defaultAmount)

  return (
    <div className="p-8 text-center" style={{ backgroundColor, color: textColor }}>
      <h2 className="mb-8 text-2xl font-bold">{title}</h2>
      <div className="mx-auto max-w-lg rounded-2xl border border-neutral-700 p-8" style={{ backgroundColor: cardBackgroundColor }}>
        <div className="mb-2 text-5xl font-bold" style={{ color: accentColor }}>
          ${amount}
        </div>
        <div className="mb-8 text-sm text-neutral-400">
          Provides <strong>{Math.floor(amount / impactMultiplier)}</strong> {impactText}.
        </div>

        <input
          type="range"
          min={minAmount}
          max={maxAmount}
          step="10"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-neutral-700"
          style={{ accentColor }}
        />

        <div className="mt-8 grid grid-cols-4 gap-2">
          {[minAmount, 50, 100, maxAmount].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="rounded bg-neutral-700 py-2 text-sm font-bold hover:bg-neutral-600"
            >
              ${val}
            </button>
          ))}
        </div>

        <button
          className="mt-8 w-full rounded-lg py-3 font-bold text-white hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          {ctaText} ${amount}
        </button>
      </div>
    </div>
  )
}

// --- 20. Trusted Pricing ---
export interface TrustedPricingProps {
  trustText?: string
  title?: string
  subtitle?: string
  price?: string
  priceUnit?: string
  ctaText?: string
  backgroundColor?: string
  cardBackgroundColor?: string
  textColor?: string
}
export function TrustedPricing({
  trustText = "Trusted by 10,000+ companies",
  title = "Everything you need to scale.",
  subtitle = "Simple pricing, no hidden fees.",
  price = "$49",
  priceUnit = "per user / month",
  ctaText = "Start Free Trial",
  backgroundColor = "#ffffff",
  cardBackgroundColor = "#000000",
  textColor = "#ffffff",
}: TrustedPricingProps) {
  return (
    <div className="p-8" style={{ backgroundColor }}>
      <div className="mb-8 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">{trustText}</p>
        <div className="flex justify-center gap-8 opacity-50 grayscale">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-20 rounded bg-neutral-800" />
          ))}
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-between gap-8 rounded-2xl p-8 md:flex-row"
        style={{ backgroundColor: cardBackgroundColor, color: textColor }}
      >
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-neutral-400">{subtitle}</p>
        </div>
        <div className="text-center md:text-right">
          <div className="text-4xl font-bold">{price}</div>
          <div className="text-neutral-500">{priceUnit}</div>
        </div>
        <ShinyButton className="bg-white text-black hover:bg-neutral-200">{ctaText}</ShinyButton>
      </div>
    </div>
  )
}

// Export component map for dynamic rendering
export const paymentComponentsByName: Record<string, React.ComponentType<any>> = {
  SimpleThreeTierPricing,
  TogglePricing,
  SplitCheckout,
  CryptoPayment,
  UsagePricing,
  MethodSelector,
  InvoicePreview,
  SubManager,
  SuccessState,
  ComparisonTable,
  VisualCardInput,
  AddonSelector,
  PromoInput,
  BillingHistory,
  EnterpriseContact,
  SavedMethods,
  MicroTipping,
  RefundRequest,
  DonationSlider,
  TrustedPricing,
}



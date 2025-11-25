"use client"

import React from "react"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  outputFormat?: "hex" | "tailwind-text" | "tailwind-bg" | "tailwind-border" | "tailwind-gradient"
  gradientPrefix?: "from" | "via" | "to"
  defaultColor?: string
  className?: string
}

// Common Tailwind color to hex mapping
const colorMap: Record<string, string> = {
  "text-green-500": "#22c55e",
  "bg-green-500": "#22c55e",
  "text-blue-500": "#3b82f6",
  "bg-blue-500": "#3b82f6",
  "text-yellow-500": "#eab308",
  "bg-yellow-500": "#eab308",
  "text-red-500": "#ef4444",
  "bg-red-500": "#ef4444",
  "text-orange-500": "#f97316",
  "bg-orange-500": "#f97316",
  "text-purple-500": "#a855f7",
  "bg-purple-500": "#a855f7",
  "text-pink-500": "#ec4899",
  "bg-pink-500": "#ec4899",
  "text-neutral-500": "#737373",
  "bg-neutral-500": "#737373",
  "text-neutral-100": "#f5f5f5",
  "text-neutral-200": "#e5e5e5",
  "text-white": "#ffffff",
  "bg-neutral-800": "#262626",
  "bg-neutral-900": "#171717",
  "bg-neutral-900/80": "#171717",
  "bg-neutral-950": "#0a0a0a",
  "bg-indigo-600": "#4f46e5",
  "border-neutral-800": "#262626",
  "border-neutral-500": "#737373",
  "border-indigo-500/50": "#6366f1",
  // Gradient classes
  "from-indigo-500": "#6366f1",
  "from-purple-500": "#a855f7",
  "from-pink-500": "#ec4899",
  "from-blue-500": "#3b82f6",
  "from-green-500": "#22c55e",
  "via-indigo-500": "#6366f1",
  "via-purple-500": "#a855f7",
  "via-pink-500": "#ec4899",
  "via-blue-500": "#3b82f6",
  "via-green-500": "#22c55e",
  "to-indigo-500": "#6366f1",
  "to-purple-500": "#a855f7",
  "to-pink-500": "#ec4899",
  "to-blue-500": "#3b82f6",
  "to-green-500": "#22c55e",
}

// Extract hex from Tailwind class (e.g., "text-[#22c55e]" -> "#22c55e")
const extractHexFromTailwind = (value: string): string | null => {
  if (!value) return null
  // Try to extract from custom hex format first (e.g., "bg-[#22c55e]" or "from-[#22c55e]")
  const hexMatch = value.match(/\[#([0-9A-Fa-f]{6})\]/)
  if (hexMatch) {
    return `#${hexMatch[1]}`
  }
  // Handle opacity (e.g., "bg-neutral-900/80" -> "bg-neutral-900")
  const cleanValue = value.split('/')[0]
  return colorMap[cleanValue] || colorMap[value] || null
}

// Get hex value for color picker
const getHexValue = (value: string, defaultColor: string = "#000000"): string => {
  if (!value) return defaultColor
  
  // If it's already a hex value
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return value
  }
  
  // Try to extract from Tailwind class
  const hex = extractHexFromTailwind(value)
  if (hex) {
    return hex
  }
  
  return defaultColor
}

// Format output based on outputFormat
const formatOutput = (hex: string, format: "hex" | "tailwind-text" | "tailwind-bg" | "tailwind-border" | "tailwind-gradient", gradientPrefix?: "from" | "via" | "to"): string => {
  if (!hex || !hex.startsWith('#')) return ""
  
  switch (format) {
    case "hex":
      return hex
    case "tailwind-text":
      return `text-[${hex}]`
    case "tailwind-bg":
      return `bg-[${hex}]`
    case "tailwind-border":
      return `border-[${hex}]`
    case "tailwind-gradient":
      const prefix = gradientPrefix || "from"
      return `${prefix}-[${hex}]`
    default:
      return hex
  }
}

export function ColorPicker({
  value,
  onChange,
  placeholder = "#000000",
  outputFormat = "hex",
  gradientPrefix,
  defaultColor = "#000000",
  className = "",
}: ColorPickerProps) {
  const hexValue = getHexValue(value, defaultColor)
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value
    onChange(formatOutput(newHex, outputFormat, gradientPrefix))
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value
    
    // Ensure it starts with #
    if (inputValue && !inputValue.startsWith('#')) {
      inputValue = '#' + inputValue
    }
    
    // Limit to 7 characters (# + 6 hex digits)
    if (inputValue.length > 7) {
      inputValue = inputValue.slice(0, 7)
    }
    
    // Only allow hex characters after #
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(0, 1) + inputValue.slice(1).replace(/[^0-9A-Fa-f]/g, "")
    }
    
    // Convert to output format
    if (inputValue.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      onChange(formatOutput(inputValue, outputFormat, gradientPrefix))
    } else if (inputValue.length > 1 && inputValue.length < 7) {
      // Don't update while user is still typing (wait for complete hex)
      return
    } else if (inputValue === "#") {
      // Don't update while user is just typing #
      return
    }
    // Don't clear if empty - keep current value to avoid resetting to black
  }
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="color"
        value={hexValue}
        onChange={handleColorChange}
        className="h-10 w-20 rounded border border-input cursor-pointer"
      />
      <Input
        value={hexValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 text-xs font-mono"
      />
    </div>
  )
}


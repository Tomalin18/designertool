"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingLabelInputProps {
  label: string
  type?: string
  icon?: React.ReactNode
  value?: string
  onChange?: (value: string) => void
  className?: string
  labelColor?: string
  inputBgColor?: string
  inputBorderColor?: string
  inputTextColor?: string
  focusBorderColor?: string
}

// Helper function to extract hex from Tailwind class or hex and convert to RGB
const getColorFromTailwind = (tailwindClass: string): string | undefined => {
  if (!tailwindClass) return undefined
  // If it's already an RGB value, return as is
  if (tailwindClass.startsWith('rgb(')) {
    return tailwindClass
  }
  // Extract hex from bg-[#hex] or text-[#hex] format
  const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return `rgb(${r} ${g} ${b})`
  }
  // If it's already a hex value
  if (tailwindClass.startsWith('#')) {
    const r = parseInt(tailwindClass.slice(1, 3), 16)
    const g = parseInt(tailwindClass.slice(3, 5), 16)
    const b = parseInt(tailwindClass.slice(5, 7), 16)
    return `rgb(${r} ${g} ${b})`
  }
  // Try color map
  const colorMap: Record<string, string> = {
    "text-neutral-400": "rgb(163 163 163)",
    "text-neutral-500": "rgb(115 115 115)",
    "bg-neutral-800": "rgb(38 38 38)",
    "bg-neutral-900": "rgb(23 23 23)",
    "border-neutral-700": "rgb(64 64 64)",
    "border-indigo-500": "rgb(99 102 241)",
    "text-white": "rgb(255 255 255)",
  }
  return colorMap[tailwindClass] || undefined
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type = "text",
  icon,
  value: controlledValue,
  onChange,
  className,
  labelColor,
  inputBgColor,
  inputBorderColor,
  inputTextColor,
  focusBorderColor,
}) => {
  const [internalValue, setInternalValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const hasValue = value.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        {icon && (
          <div 
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
            style={{
              color: getColorFromTailwind(labelColor || "text-neutral-400") || "rgb(163 163 163)",
            }}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "peer w-full rounded-lg border bg-transparent px-4 pt-6 pb-2 text-sm transition-all",
            icon && "pl-10",
            "focus:outline-none focus:ring-2 focus:ring-offset-0"
          )}
          style={{
            backgroundColor: getColorFromTailwind(inputBgColor || "bg-neutral-800"),
            borderColor: isFocused 
              ? getColorFromTailwind(focusBorderColor || "border-indigo-500") || getColorFromTailwind(inputBorderColor || "border-neutral-700")
              : getColorFromTailwind(inputBorderColor || "border-neutral-700"),
            color: getColorFromTailwind(inputTextColor || "text-white") || "rgb(255 255 255)",
            ...(isFocused && focusBorderColor && {
              borderColor: getColorFromTailwind(focusBorderColor),
            }),
          }}
        />
        <label
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-all pointer-events-none",
            icon && "left-10",
            (hasValue || isFocused) && "top-3 translate-y-0 text-xs"
          )}
          style={{
            color: getColorFromTailwind(labelColor || "text-neutral-400") || "rgb(163 163 163)",
          }}
        >
          {label}
        </label>
      </div>
    </div>
  )
}


"use client"

import React, { useState } from 'react'
import { Search, ArrowRight, Loader2 } from 'lucide-react'

interface UrlInputProps {
  onGenerate: (url: string) => void
  isLoading?: boolean
  borderRadius?: number
  gradientFrom?: string
  gradientTo?: string
  backgroundColor?: string
  borderColor?: string
  showButton?: boolean
  buttonText?: string
  placeholder?: string
  showIcon?: boolean
  className?: string
}

export const UrlInput: React.FC<UrlInputProps> = ({ 
  onGenerate, 
  isLoading = false,
  borderRadius = 12,
  gradientFrom,
  gradientTo,
  backgroundColor = 'rgb(15 23 42)', // slate-900
  borderColor = 'rgb(51 65 85)', // slate-700
  showButton = true,
  buttonText = 'Generate',
  placeholder = 'https://your-shop.com/product/...',
  showIcon = true,
  className = '',
}) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onGenerate(url)
    }
  }

  const gradientFromColor = gradientFrom || 'hsl(var(--primary))'
  const gradientToColor = gradientTo || 'rgb(79 70 229)' // indigo-600

  return (
    <form onSubmit={handleSubmit} className={`relative group ${className}`}>
      <div 
        className="absolute -inset-0.5 blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          background: `linear-gradient(to right, ${gradientFromColor}, ${gradientToColor})`,
          borderRadius: `${borderRadius}px`,
        }}
      ></div>
      <div 
        className="relative flex items-center p-2 shadow-2xl"
        style={{
          backgroundColor,
          borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: `${borderRadius}px`,
        }}
      >
        {showIcon && (
          <div className="pl-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        )}
        <input
          type="url"
          className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-slate-500 font-medium truncate"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          required
        />
        {showButton && (
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderRadius: `${Math.max(0, borderRadius - 4)}px`,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing
              </>
            ) : (
              <>
                {buttonText} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  )
}


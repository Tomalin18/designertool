"use client"

import React, { useState } from 'react'
import { Search, ArrowRight, Loader2 } from 'lucide-react'

interface UrlInputProps {
  onGenerate: (url: string) => void
  isLoading?: boolean
  borderRadius?: number
  gradientFrom?: string
  gradientTo?: string
  gradientWidth?: number
  gradientAnimated?: boolean
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
  gradientWidth = 2,
  gradientAnimated = false,
  backgroundColor = 'rgb(15 23 42)', // slate-900
  borderColor = 'rgb(51 65 85)', // slate-700
  showButton = true,
  buttonText = '',
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

  const gradientFromColor = gradientFrom || 'var(--primary)'
  const gradientToColor = gradientTo || 'var(--accent)'
  const gradientInset = `-${gradientWidth}px`

  return (
    <form onSubmit={handleSubmit} className={`relative group w-full ${className}`} style={{ minWidth: 0 }}>
      <div 
        className={`absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}
        style={{
          inset: gradientInset,
          backgroundImage: gradientAnimated 
            ? `linear-gradient(90deg, ${gradientFromColor}, ${gradientToColor}, ${gradientFromColor})`
            : `linear-gradient(to right, ${gradientFromColor}, ${gradientToColor})`,
          backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: `${borderRadius + gradientWidth}px`,
          animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
        }}
      ></div>
      <div 
        className="relative flex items-center p-2 shadow-2xl w-full"
        style={{
          backgroundColor,
          borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: `${borderRadius}px`,
          minWidth: 0,
        }}
      >
        {showIcon && (
          <div className="pl-4 text-slate-400 flex-shrink-0">
            <Search className="w-5 h-5" />
          </div>
        )}
        <input
          type="url"
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-slate-500 font-medium truncate"
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
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


"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Mail, Lock, Github, Chrome } from "lucide-react"
import { FloatingLabelInput } from "./FloatingLabelInput"
import { ShinyButton } from "./ShinyButton"

interface GlassAuthFormProps {
  className?: string
  // Text content
  title?: string
  subtitle?: string
  emailLabel?: string
  passwordLabel?: string
  rememberText?: string
  forgotPasswordText?: string
  signInText?: string
  continueWithText?: string
  githubText?: string
  googleText?: string
  // Display options
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showSocialButtons?: boolean
  showGithub?: boolean
  showGoogle?: boolean
  // Colors
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  iconGradientFrom?: string
  iconGradientTo?: string
  orb1Color?: string
  orb2Color?: string
  buttonColor?: string
  socialButtonBgColor?: string
  socialButtonBorderColor?: string
  inputLabelColor?: string
  inputBgColor?: string
  inputBorderColor?: string
  inputTextColor?: string
  focusBorderColor?: string
  // Card gradient
  cardGradientFrom?: string
  cardGradientTo?: string
  cardGradientWidth?: number
  cardGradientAnimated?: boolean
  // Outer gradient
  outerGradientFrom?: string
  outerGradientTo?: string
  outerGradientWidth?: number
  outerGradientAnimated?: boolean
  // Style
  borderRadius?: number
  padding?: number
  backdropBlur?: number
}

// Helper function to extract hex from Tailwind class or hex and convert to RGB
const getColorFromTailwind = (colorValue: string): string | undefined => {
  if (!colorValue) return undefined
  // If it's already an RGB value, return as is
  if (colorValue.startsWith('rgb(')) {
    return colorValue
  }
  // Extract hex from bg-[#hex] or text-[#hex] format
  const hexMatch = colorValue.match(/\[#([0-9A-Fa-f]{6})\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return `rgb(${r} ${g} ${b})`
  }
  // If it's already a hex value
  if (colorValue.startsWith('#')) {
    const r = parseInt(colorValue.slice(1, 3), 16)
    const g = parseInt(colorValue.slice(3, 5), 16)
    const b = parseInt(colorValue.slice(5, 7), 16)
    return `rgb(${r} ${g} ${b})`
  }
  // Try color map
  const colorMap: Record<string, string> = {
    "bg-neutral-900/60": "rgb(23 23 23 / 0.6)",
    "bg-neutral-900": "rgb(23 23 23)",
    "border-neutral-800": "rgb(38 38 38)",
    "text-white": "rgb(255 255 255)",
    "text-neutral-400": "rgb(163 163 163)",
    "bg-indigo-500/20": "rgb(99 102 241 / 0.2)",
    "bg-purple-500/20": "rgb(168 85 247 / 0.2)",
    "from-indigo-500": "rgb(99 102 241)",
    "to-purple-500": "rgb(168 85 247)",
    "bg-indigo-600": "rgb(79 70 229)",
    "border-neutral-700": "rgb(64 64 64)",
    "bg-neutral-800": "rgb(38 38 38)",
  }
  return colorMap[colorValue] || undefined
}

export const GlassAuthForm: React.FC<GlassAuthFormProps> = ({
  className,
  title = "Welcome Back",
  subtitle = "Enter your credentials to access the workspace.",
  emailLabel = "Email address",
  passwordLabel = "Password",
  rememberText = "Remember me",
  forgotPasswordText = "Forgot password?",
  signInText = "Sign In",
  continueWithText = "Or continue with",
  githubText = "GitHub",
  googleText = "Google",
  showRememberMe = true,
  showForgotPassword = true,
  showSocialButtons = true,
  showGithub = true,
  showGoogle = true,
  backgroundColor,
  borderColor,
  textColor,
  iconGradientFrom,
  iconGradientTo,
  orb1Color,
  orb2Color,
  buttonColor,
  socialButtonBgColor,
  socialButtonBorderColor,
  inputLabelColor,
  inputBgColor,
  inputBorderColor,
  inputTextColor,
  focusBorderColor,
  cardGradientFrom,
  cardGradientTo,
  cardGradientWidth = 2,
  cardGradientAnimated = false,
  outerGradientFrom,
  outerGradientTo,
  outerGradientWidth = 2,
  outerGradientAnimated = false,
  borderRadius = 24,
  padding = 8,
  backdropBlur = 12,
}) => {
  const bgColor = backgroundColor ? getColorFromTailwind(backgroundColor) : "rgb(23 23 23 / 0.6)"
  const borderCol = borderColor ? getColorFromTailwind(borderColor) : "rgb(38 38 38)"
  const txtColor = textColor || "rgb(255 255 255)"
  const subTxtColor = textColor || "rgb(163 163 163)"
  const orb1Col = orb1Color ? getColorFromTailwind(orb1Color) : "rgb(99 102 241 / 0.2)"
  const orb2Col = orb2Color ? getColorFromTailwind(orb2Color) : "rgb(168 85 247 / 0.2)"
  const iconFrom = iconGradientFrom ? getColorFromTailwind(iconGradientFrom) : "rgb(99 102 241)"
  const iconTo = iconGradientTo ? getColorFromTailwind(iconGradientTo) : "rgb(168 85 247)"
  const socialBg = socialButtonBgColor ? getColorFromTailwind(socialButtonBgColor) : "rgb(38 38 38)"
  const socialBorder = socialButtonBorderColor ? getColorFromTailwind(socialButtonBorderColor) : "rgb(64 64 64)"
  
  // Card gradient colors
  const cardGradFrom = cardGradientFrom ? getColorFromTailwind(cardGradientFrom) : 'var(--primary)'
  const cardGradTo = cardGradientTo ? getColorFromTailwind(cardGradientTo) : 'var(--accent)'
  const cardGradInset = `-${cardGradientWidth}px`
  
  // Outer gradient colors
  const outerGradFrom = outerGradientFrom ? getColorFromTailwind(outerGradientFrom) : 'var(--primary)'
  const outerGradTo = outerGradientTo ? getColorFromTailwind(outerGradientTo) : 'var(--accent)'
  const outerGradInset = `-${outerGradientWidth}px`

  // Check if gradients should be shown (if at least one color is provided)
  const showOuterGradient = outerGradientFrom || outerGradientTo
  const showCardGradient = cardGradientFrom || cardGradientTo

  return (
    <div className={cn("relative group", className)} style={{ borderRadius: `${borderRadius}px` }}>
      {/* Outer gradient */}
      {showOuterGradient && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-0"
          style={{
            inset: outerGradInset,
            backgroundImage: outerGradientAnimated
              ? `linear-gradient(90deg, ${outerGradFrom}, ${outerGradTo}, ${outerGradFrom})`
              : `linear-gradient(to right, ${outerGradFrom}, ${outerGradTo})`,
            backgroundSize: outerGradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: `${borderRadius + outerGradientWidth}px`,
            animation: outerGradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      
      {/* Card gradient */}
      {showCardGradient && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-[1]"
          style={{
            inset: cardGradInset,
            backgroundImage: cardGradientAnimated
              ? `linear-gradient(90deg, ${cardGradFrom}, ${cardGradTo}, ${cardGradFrom})`
              : `linear-gradient(to right, ${cardGradFrom}, ${cardGradTo})`,
            backgroundSize: cardGradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: `${borderRadius + cardGradientWidth}px`,
            animation: cardGradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      
      <div
        className={cn("relative flex flex-col items-center overflow-hidden rounded-3xl border text-center z-10", className)}
        style={{
          backgroundColor: bgColor,
          borderColor: borderCol,
          borderRadius: `${borderRadius}px`,
          padding: `${padding * 4}px`,
          backdropFilter: `blur(${backdropBlur}px)`,
        }}
      >
        {/* Background Orbs */}
        <div
          className="absolute -left-10 -top-10 h-32 w-32 rounded-full blur-3xl"
          style={{
            backgroundColor: orb1Col,
          }}
        />
        <div
          className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-3xl"
          style={{
            backgroundColor: orb2Col,
          }}
        />

        <div className="relative z-10 w-full">
          <div className="mb-6 flex flex-col items-center">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
              style={{
                backgroundImage: `linear-gradient(to top right, ${iconFrom}, ${iconTo})`,
                boxShadow: `${iconFrom}30 0px 0px 20px`,
              }}
            >
              <Lock className="h-6 w-6" style={{ color: "rgb(255 255 255)" }} />
            </div>
            <h3 className="text-xl font-bold" style={{ color: getColorFromTailwind(txtColor) || txtColor }}>
              {title}
            </h3>
            <p className="text-sm" style={{ color: getColorFromTailwind(subTxtColor) || subTxtColor }}>
              {subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <FloatingLabelInput
              label={emailLabel}
              type="email"
              icon={<Mail size={16} />}
              labelColor={inputLabelColor}
              inputBgColor={inputBgColor}
              inputBorderColor={inputBorderColor}
              inputTextColor={inputTextColor}
              focusBorderColor={focusBorderColor}
            />
            <FloatingLabelInput
              label={passwordLabel}
              type="password"
              icon={<Lock size={16} />}
              labelColor={inputLabelColor}
              inputBgColor={inputBgColor}
              inputBorderColor={inputBorderColor}
              inputTextColor={inputTextColor}
              focusBorderColor={focusBorderColor}
            />
          </div>

          {showRememberMe && (
            <div className="mb-6 mt-2 flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded focus:ring-0 focus:ring-offset-0"
                  style={{
                    borderColor: socialBorder,
                    backgroundColor: socialBg,
                    accentColor: iconFrom || "rgb(99 102 241)",
                  }}
                />
                <span className="text-xs" style={{ color: getColorFromTailwind(subTxtColor) || subTxtColor }}>
                  {rememberText}
                </span>
              </label>
              {showForgotPassword && (
                <a
                  href="#"
                  className="text-xs font-medium transition-colors"
                  style={{
                    color: iconFrom || "rgb(99 102 241)",
                  }}
                  onMouseEnter={(e) => {
                    const hoverColor = iconFrom ? iconFrom.replace(')', ' / 0.8)') : "rgb(99 102 241 / 0.8)"
                    e.currentTarget.style.color = hoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = iconFrom || "rgb(99 102 241)"
                  }}
                >
                  {forgotPasswordText}
                </a>
              )}
            </div>
          )}

          <ShinyButton
            className="w-full"
            style={{
              ...(buttonColor && {
                backgroundColor: getColorFromTailwind(buttonColor),
              }),
            }}
          >
            {signInText}
          </ShinyButton>

          {showSocialButtons && (showGithub || showGoogle) && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span
                    className="w-full border-t"
                    style={{
                      borderColor: borderCol,
                    }}
                  />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span
                    className="px-2"
                    style={{
                      backgroundColor: bgColor,
                      color: getColorFromTailwind(subTxtColor) || subTxtColor,
                    }}
                  >
                    {continueWithText}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {showGithub && (
                  <button
                    className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: socialBg,
                      borderColor: socialBorder,
                      color: getColorFromTailwind(subTxtColor) || subTxtColor,
                    }}
                    onMouseEnter={(e) => {
                      const hoverBg = socialBg ? socialBg.replace(')', ' / 0.8)').replace('rgb(', 'rgba(') : "rgba(64 64 64 / 0.8)"
                      e.currentTarget.style.backgroundColor = hoverBg
                      e.currentTarget.style.color = "rgb(255 255 255)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = socialBg
                      e.currentTarget.style.color = getColorFromTailwind(subTxtColor) || subTxtColor
                    }}
                  >
                    <Github size={16} />
                    {githubText}
                  </button>
                )}
                {showGoogle && (
                  <button
                    className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: socialBg,
                      borderColor: socialBorder,
                      color: getColorFromTailwind(subTxtColor) || subTxtColor,
                    }}
                    onMouseEnter={(e) => {
                      const hoverBg = socialBg ? socialBg.replace(')', ' / 0.8)').replace('rgb(', 'rgba(') : "rgba(64 64 64 / 0.8)"
                      e.currentTarget.style.backgroundColor = hoverBg
                      e.currentTarget.style.color = "rgb(255 255 255)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = socialBg
                      e.currentTarget.style.color = getColorFromTailwind(subTxtColor) || subTxtColor
                    }}
                  >
                    <Chrome size={16} />
                    {googleText}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


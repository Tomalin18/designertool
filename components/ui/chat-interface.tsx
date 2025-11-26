"use client"

import React from "react";

import { cn } from "@/lib/utils";

import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react";

interface MessageProps {
  text: string
  isOwn?: boolean
  time: string
  isRead?: boolean
  showReadReceipt?: boolean
  ownMessageColor?: string
  otherMessageColor?: string
  messageTextColor?: string
  timeTextColor?: string
}

const Message = ({ 
  text, 
  isOwn, 
  time,
  isRead = false,
  showReadReceipt = false,
  ownMessageColor = "bg-indigo-600",
  otherMessageColor = "bg-neutral-800",
  messageTextColor,
  timeTextColor = "text-neutral-500"
}: MessageProps) => (
    <div className={cn("flex w-full flex-col gap-1", isOwn ? "items-end" : "items-start")}>
        <div 
            className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                isOwn 
                    ? `rounded-br-none ${ownMessageColor} ${messageTextColor || "text-white"}` 
                    : `rounded-bl-none ${otherMessageColor} ${messageTextColor || "text-neutral-200"}`
            )}
        >
            {text}
        </div>
        <div className={cn("flex items-center gap-1", isOwn ? "flex-row-reverse" : "flex-row")}>
            <span className={cn("text-[10px]", timeTextColor)}>{time}</span>
            {showReadReceipt && isOwn && (
                <div className={cn("flex items-center", isRead ? "text-blue-400" : "text-neutral-500")}>
                    {isRead ? <CheckCheck size={12} /> : <Check size={12} />}
                </div>
            )}
        </div>
    </div>
);

interface ChatInterfaceProps {
  className?: string
  // Header props
  headerUserName?: string
  headerUserStatus?: string
  headerUserAvatar?: string
  headerShowPhone?: boolean
  headerShowVideo?: boolean
  headerShowMore?: boolean
  headerBgColor?: string
  headerBorderColor?: string
  headerTextColor?: string
  headerStatusColor?: string
  // Body props
  bodyBgColor?: string
  bodyPadding?: number
  bodyShowDateLabel?: boolean
  bodyDateLabelText?: string
  bodyShowTypingIndicator?: boolean
  bodyShowReadReceipt?: boolean
  ownMessageColor?: string
  otherMessageColor?: string
  messageTextColor?: string
  timeTextColor?: string
  // Footer props
  footerBgColor?: string
  footerBorderColor?: string
  footerInputBgColor?: string
  footerInputPlaceholder?: string
  footerShowAttach?: boolean
  footerShowEmoji?: boolean
  footerButtonColor?: string
  footerFocusBorderColor?: string
}

// Status color mapping for text
const getStatusColor = (status: string): string => {
  const statusColorMap: Record<string, string> = {
    "Online now": "text-green-500",
    "Offline": "text-neutral-500",
    "Away": "text-yellow-500",
    "Busy": "text-red-500",
    "Do not disturb": "text-orange-500",
  }
  
  return statusColorMap[status] || "text-neutral-500"
}

// Status indicator color mapping for the dot
const getStatusIndicatorColor = (status: string, customColor?: string): string => {
  if (customColor && customColor.trim() !== "") {
    // For custom hex colors like "text-[#22c55e]", convert to "bg-[#22c55e]"
    if (customColor.includes("[") && customColor.includes("#")) {
      return customColor.replace("text-", "bg-")
    }
    // Extract color from text color class (e.g., "text-green-500" -> "bg-green-500")
    if (customColor.startsWith("text-")) {
      return customColor.replace("text-", "bg-")
    }
    // If it's already a bg- class, use it directly
    if (customColor.startsWith("bg-")) {
      return customColor
    }
  }
  
  const statusIndicatorMap: Record<string, string> = {
    "Online now": "bg-green-500",
    "Offline": "bg-neutral-500",
    "Away": "bg-yellow-500",
    "Busy": "bg-red-500",
    "Do not disturb": "bg-orange-500",
  }
  
  return statusIndicatorMap[status] || "bg-neutral-500"
}

export const ChatInterface = ({ 
  className,
  // Header
  headerUserName = "Sarah Jenkins",
  headerUserStatus = "Online now",
  headerUserAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  headerShowPhone = true,
  headerShowVideo = true,
  headerShowMore = true,
  headerBgColor = "bg-neutral-900/80",
  headerBorderColor = "border-neutral-800",
  headerTextColor = "text-neutral-100",
  headerStatusColor,
  // Body
  bodyBgColor,
  bodyPadding = 6,
  bodyShowDateLabel = true,
  bodyDateLabelText = "Today, Oct 24",
  bodyShowTypingIndicator = true,
  bodyShowReadReceipt = false,
  ownMessageColor = "bg-indigo-600",
  otherMessageColor = "bg-neutral-800",
  messageTextColor,
  timeTextColor = "text-neutral-500",
  // Footer
  footerBgColor = "bg-neutral-900/80",
  footerBorderColor = "border-neutral-800",
  footerInputBgColor = "bg-neutral-950",
  footerInputPlaceholder = "Type a message...",
  footerShowAttach = true,
  footerShowEmoji = true,
  footerButtonColor = "bg-indigo-600",
  footerFocusBorderColor = "border-indigo-500/50",
}: ChatInterfaceProps) => {
  // Determine status text and color
  const statusText = headerUserStatus || "Online now"
  const hasCustomColor = headerStatusColor && headerStatusColor.trim() !== ""
  
  // Extract hex color from Tailwind class for inline styles
  const extractHexFromColor = (colorClass: string): string | null => {
    if (!colorClass) return null
    // Extract from text-[#hex] format
    const hexMatch = colorClass.match(/\[#([0-9A-Fa-f]{6})\]/)
    if (hexMatch) {
      return `#${hexMatch[1]}`
    }
    // Map common Tailwind colors to hex
    const colorMap: Record<string, string> = {
      "text-green-500": "#22c55e",
      "text-blue-500": "#3b82f6",
      "text-yellow-500": "#eab308",
      "text-red-500": "#ef4444",
      "text-orange-500": "#f97316",
      "text-purple-500": "#a855f7",
      "text-pink-500": "#ec4899",
      "text-neutral-500": "#737373",
    }
    return colorMap[colorClass] || null
  }
  
  // Convert hex to RGB for inline styles
  const hexToRgb = (hex: string): string | null => {
    if (!hex) return null
    const cleanHex = hex.replace('#', '')
    if (cleanHex.length !== 6) return null
    const r = parseInt(cleanHex.slice(0, 2), 16)
    const g = parseInt(cleanHex.slice(2, 4), 16)
    const b = parseInt(cleanHex.slice(4, 6), 16)
    return `rgb(${r} ${g} ${b})`
  }
  
  // Get status text color (class name for Tailwind)
  const statusTextColorClass = hasCustomColor ? headerStatusColor : getStatusColor(statusText)
  
  // Get status indicator color (class name for Tailwind)
  const statusIndicatorColorClass = hasCustomColor 
    ? getStatusIndicatorColor(statusText, headerStatusColor) 
    : getStatusIndicatorColor(statusText)
  
  // Get hex colors for inline styles (for immediate rendering)
  const statusTextHex = hasCustomColor 
    ? extractHexFromColor(headerStatusColor) 
    : extractHexFromColor(getStatusColor(statusText))
  const statusIndicatorHex = hasCustomColor
    ? extractHexFromColor(headerStatusColor)?.replace('#', '')
    : (() => {
        const statusIndicatorMap: Record<string, string> = {
          "Online now": "22c55e",
          "Offline": "737373",
          "Away": "eab308",
          "Busy": "ef4444",
          "Do not disturb": "f97316",
        }
        return statusIndicatorMap[statusText] || "737373"
      })()
  
  // Convert to RGB for inline styles
  const statusTextRgb = statusTextHex ? hexToRgb(statusTextHex) : null
  const statusIndicatorRgb = statusIndicatorHex ? hexToRgb(`#${statusIndicatorHex}`) : null

  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 shadow-xl backdrop-blur-md", className)}>
        {/* Header */}
        <div className={cn("flex items-center justify-between border-b px-6 py-4", headerBorderColor, headerBgColor)}>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img 
                        src={headerUserAvatar} 
                        alt="User" 
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-800"
                    />
                    <span 
                      className={cn("absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-neutral-900", statusIndicatorColorClass)}
                      style={statusIndicatorRgb ? { backgroundColor: statusIndicatorRgb } : undefined}
                    />
                </div>
                <div>
                    <h4 className={cn("font-semibold", headerTextColor)}>{headerUserName}</h4>
                    <p 
                      className={cn("text-xs", statusTextColorClass)}
                      style={statusTextRgb ? { color: statusTextRgb } : undefined}
                    >
                      {statusText}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 text-neutral-400">
                {headerShowPhone && (
                    <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors"><Phone size={18} /></button>
                )}
                {headerShowVideo && (
                    <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors"><Video size={18} /></button>
                )}
                {headerShowMore && (
                    <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                )}
            </div>
        </div>

        {/* Message Area */}
        <div 
            className={cn("flex-1 space-y-6 overflow-y-auto scrollbar-hide", bodyBgColor)}
            style={{ padding: `${bodyPadding * 4}px` }}
        >
            {bodyShowDateLabel && (
                <div className="flex justify-center">
                    <span className="rounded-full bg-neutral-800/50 px-3 py-1 text-[10px] font-medium text-neutral-500">{bodyDateLabelText}</span>
                </div>
            )}
            
            <Message 
                text="Hey! Have you had a chance to look at the new design system components?"
                time="10:30 AM"
                showReadReceipt={bodyShowReadReceipt}
                ownMessageColor={ownMessageColor}
                otherMessageColor={otherMessageColor}
                messageTextColor={messageTextColor}
                timeTextColor={timeTextColor}
            />
            <Message 
                text="Yes! I just checked them out. The neon gradients look absolutely stunning 🤩"
                isOwn
                time="10:32 AM"
                isRead={false}
                showReadReceipt={bodyShowReadReceipt}
                ownMessageColor={ownMessageColor}
                otherMessageColor={otherMessageColor}
                messageTextColor={messageTextColor}
                timeTextColor={timeTextColor}
            />
            <Message 
                text="Right? I think we should use the SpotlightCard for the feature section."
                isOwn
                time="10:32 AM"
                isRead={true}
                showReadReceipt={bodyShowReadReceipt}
                ownMessageColor={ownMessageColor}
                otherMessageColor={otherMessageColor}
                messageTextColor={messageTextColor}
                timeTextColor={timeTextColor}
            />
            <Message 
                text="Agreed. I'm preparing the documentation now. Will send over the draft in a bit!"
                time="10:35 AM"
                showReadReceipt={bodyShowReadReceipt}
                ownMessageColor={ownMessageColor}
                otherMessageColor={otherMessageColor}
                messageTextColor={messageTextColor}
                timeTextColor={timeTextColor}
            />
            
            {/* Typing Indicator */}
            {bodyShowTypingIndicator && (
                <div className="flex items-center gap-1 px-4">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-0" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-150" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-300" />
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className={cn("p-4", footerBgColor)}>
            <div className={cn(
                "flex items-center gap-2 rounded-xl border px-4 py-2 transition-all focus-within:ring-1 focus-within:ring-indigo-500/50",
                footerBorderColor,
                footerInputBgColor,
                footerFocusBorderColor
            )}>
                {footerShowAttach && (
                    <button className="text-neutral-500 hover:text-neutral-300"><Paperclip size={20} /></button>
                )}
                <input 
                    type="text" 
                    placeholder={footerInputPlaceholder} 
                    className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
                />
                {footerShowEmoji && (
                    <button className="text-neutral-500 hover:text-neutral-300"><Smile size={20} /></button>
                )}
                <button className={cn("rounded-lg p-2 text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-colors", footerButtonColor)}>
                    <Send size={16} />
                </button>
            </div>
        </div>
    </div>
  );
};


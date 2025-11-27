"use client"

import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import { 
  X, 
  Check, 
  Star, 
  Shield, 
  Zap, 
  Lock, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Crown, 
  Sparkles, 
  Flame, 
  Tag 
} from "lucide-react";
import { badgeSections } from "@/lib/badge-sections";

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex; // Return as-is if not a valid hex
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r} ${g} ${b})`;
};

// Icon map for IconBadge
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Star,
  Check,
  Shield,
  Zap,
  Lock,
  AlertCircle,
  Clock,
  TrendingUp,
  Crown,
  Sparkles,
  Flame,
  Tag,
};

// 1. Solid Badge
export interface SolidBadgeProps {
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const SolidBadge = ({
  children = "Badge",
  className,
  backgroundColor,
  textColor,
  borderRadius = 9999,
  padding = 8,
}: SolidBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white",
      className
    )}
    style={{
      ...(backgroundColor && { backgroundColor: hexToRgb(backgroundColor) || backgroundColor }),
      ...(textColor && { color: hexToRgb(textColor) || textColor }),
      ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
      ...(padding !== 8 && { padding: `${padding}px` }),
    }}
  >
    {children}
  </span>
);

// 2. Outline Badge
export interface OutlineBadgeProps {
  children?: React.ReactNode;
  className?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
}

export const OutlineBadge = ({
  children = "Badge",
  className,
  borderColor,
  textColor,
  borderRadius = 9999,
  padding = 8,
  borderWidth = 1,
}: OutlineBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-900",
      className
    )}
    style={{
      ...(borderColor && { borderColor: hexToRgb(borderColor) || borderColor }),
      ...(textColor && { color: hexToRgb(textColor) || textColor }),
      ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
      ...(padding !== 8 && { padding: `${padding}px` }),
      ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px` }),
    }}
  >
    {children}
  </span>
);

// 3. Soft Badge
export interface SoftBadgeProps {
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const SoftBadge = ({
  children = "Badge",
  className,
  backgroundColor,
  textColor,
  borderRadius = 9999,
  padding = 8,
}: SoftBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700",
      className
    )}
    style={{
      ...(backgroundColor && { backgroundColor: hexToRgb(backgroundColor) || backgroundColor }),
      ...(textColor && { color: hexToRgb(textColor) || textColor }),
      ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
      ...(padding !== 8 && { padding: `${padding}px` }),
    }}
  >
    {children}
  </span>
);

// 4. Dot Badge
export interface DotBadgeProps {
  children?: React.ReactNode;
  className?: string;
  dotColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
}

export const DotBadge = ({
  children = "Status",
  className,
  dotColor = "#22c55e",
  backgroundColor,
  textColor,
  borderColor,
  borderRadius = 9999,
  padding = 8,
  borderWidth,
}: DotBadgeProps) => {
  // Support both Tailwind classes (bg-*) and hex/rgb colors
  const dotColorClass = dotColor && dotColor.startsWith("bg-") ? dotColor : undefined;
  // If it's already rgb format (from playground), use it directly; otherwise convert hex to rgb
  const dotColorStyle = !dotColorClass && dotColor ? { 
    backgroundColor: dotColor.startsWith("rgb") ? dotColor : (hexToRgb(dotColor) || dotColor) 
  } : undefined;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700",
        className
      )}
      style={{
        ...(backgroundColor && backgroundColor.trim() !== "" && { 
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor) 
        }),
        ...(textColor && textColor.trim() !== "" && { 
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor) 
        }),
        ...(borderColor && borderColor.trim() !== "" && { 
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor) 
        }),
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
        ...(borderWidth !== undefined && { borderWidth: `${borderWidth}px` }),
      }}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", dotColorClass)}
        style={dotColorStyle}
      />
      {children}
    </span>
  );
};

// 5. Icon Badge
export interface IconBadgeProps {
  children?: React.ReactNode;
  className?: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const IconBadge = ({
  children = "Feature",
  className,
  icon = "Star",
  backgroundColor,
  textColor,
  borderRadius = 6,
  padding = 8,
}: IconBadgeProps) => {
  const IconComponent = iconMap[icon] || Star;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700",
        className
      )}
      style={{
        ...(backgroundColor && { backgroundColor: hexToRgb(backgroundColor) || backgroundColor }),
        ...(textColor && { color: hexToRgb(textColor) || textColor }),
        ...(borderRadius !== 6 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      <IconComponent size={12} />
      {children}
    </span>
  );
};

// 6. Gradient Badge
export interface GradientBadgeProps {
  children?: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
}

export const GradientBadge = ({
  children = "Premium",
  className,
  gradientFrom = "#ec4899",
  gradientTo = "#8b5cf6",
  textColor,
  borderColor,
  borderRadius = 9999,
  padding = 8,
  borderWidth,
}: GradientBadgeProps) => {
  const fromRgb = gradientFrom && gradientFrom.trim() !== "" ? (gradientFrom.startsWith("rgb") ? gradientFrom : (hexToRgb(gradientFrom) || gradientFrom)) : "#ec4899";
  const toRgb = gradientTo && gradientTo.trim() !== "" ? (gradientTo.startsWith("rgb") ? gradientTo : (hexToRgb(gradientTo) || gradientTo)) : "#8b5cf6";
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm",
        className
      )}
      style={{
        background: `linear-gradient(to right, ${fromRgb}, ${toRgb})`,
        ...(textColor && textColor.trim() !== "" && { 
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor) 
        }),
        ...(borderColor && borderColor.trim() !== "" && { 
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor),
          borderStyle: "solid",
        }),
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
        ...(borderWidth !== undefined && borderWidth > 0 && { 
          borderWidth: `${borderWidth}px`,
          borderStyle: "solid",
        }),
      }}
    >
      {children}
    </span>
  );
};

// 7. Glass Badge
export interface GlassBadgeProps {
  children?: React.ReactNode;
  className?: string;
  backdropBlur?: number;
  borderOpacity?: number;
  borderRadius?: number;
  padding?: number;
}

export const GlassBadge = ({
  children = "Glass",
  className,
  backdropBlur = 8,
  borderOpacity = 20,
  borderRadius = 9999,
  padding = 8,
}: GlassBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md",
      className
    )}
    style={{
      ...(backdropBlur !== 8 && { backdropFilter: `blur(${backdropBlur}px)` }),
      ...(borderOpacity !== 20 && { borderColor: `rgba(255, 255, 255, ${borderOpacity / 100})` }),
      ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
      ...(padding !== 8 && { padding: `${padding}px` }),
    }}
  >
    {children}
  </span>
);

// 8. Neon Badge
export interface NeonBadgeProps {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
  borderRadius?: number;
  padding?: number;
}

export const NeonBadge = ({
  children = "New",
  className,
  glowColor = "#22c55e",
  glowIntensity = 20,
  borderRadius = 9999,
  padding = 8,
}: NeonBadgeProps) => {
  const glowRgb = hexToRgb(glowColor) || glowColor;
  const opacity = glowIntensity / 100;
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-green-500/50 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400",
        className
      )}
      style={{
        boxShadow: `0 0 10px rgba(${glowRgb.replace('rgb(', '').replace(')', '')}, ${opacity})`,
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      {children}
    </span>
  );
};

// 9. Brutalist Badge
export interface BrutalistBadgeProps {
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  padding?: number;
}

export const BrutalistBadge = ({
  children = "BOLD",
  className,
  backgroundColor = "#facc15",
  textColor = "#000000",
  borderColor,
  shadowOffsetX = 2,
  shadowOffsetY = 2,
  padding = 8,
}: BrutalistBadgeProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)) : "#facc15";
  const textRgb = textColor && textColor.trim() !== "" ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)) : "#000000";
  const borderRgb = borderColor && borderColor.trim() !== "" ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)) : undefined;
  
  return (
    <span
      className={cn(
        "inline-flex items-center border-2 px-3 py-1 text-xs font-bold uppercase text-black",
        !borderRgb && "border-black",
        className
      )}
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
        ...(borderRgb && { borderColor: borderRgb }),
        boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px 0px rgba(0,0,0,1)`,
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      {children}
    </span>
  );
};

// 10. Count Badge
export interface CountBadgeProps {
  count?: number;
  maxCount?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const CountBadge = ({
  count = 5,
  maxCount = 99,
  backgroundColor = "#ef4444",
  textColor = "#ffffff",
}: CountBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      {count > maxCount ? `${maxCount}+` : count}
    </span>
  );
};

// 11. Dismissable Badge
export interface DismissableBadgeProps {
  children?: React.ReactNode;
  className?: string;
  showDismissButton?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const DismissableBadge = ({
  children = "Dismissable",
  className,
  showDismissButton = true,
  backgroundColor,
  textColor,
  borderRadius = 9999,
  padding = 8,
}: DismissableBadgeProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-neutral-100 pl-3 pr-1 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer group",
        className
      )}
      style={{
        ...(backgroundColor && { backgroundColor: hexToRgb(backgroundColor) || backgroundColor }),
        ...(textColor && { color: hexToRgb(textColor) || textColor }),
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      {children}
      {showDismissButton && (
        <span
          className="rounded-full p-0.5 hover:bg-neutral-300"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
        >
          <X size={12} />
        </span>
      )}
    </span>
  );
};

// 12. Verified Badge
export interface VerifiedBadgeProps {
  text?: string;
  iconColor?: string;
}

export const VerifiedBadge = ({
  text = "Verified",
  iconColor = "#3b82f6",
}: VerifiedBadgeProps) => {
  const iconRgb = hexToRgb(iconColor) || iconColor;
  
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold"
      style={{ color: iconRgb }}
      title="Verified"
    >
      <span
        className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white"
        style={{ backgroundColor: iconRgb }}
      >
        <Check size={10} strokeWidth={4} />
      </span>
      {text}
    </span>
  );
};

// 13. Premium Badge
export interface PremiumBadgeProps {
  text?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const PremiumBadge = ({
  text = "Pro",
  gradientFrom = "#fde047",
  gradientTo = "#facc15",
}: PremiumBadgeProps) => {
  const fromRgb = hexToRgb(gradientFrom) || gradientFrom;
  const toRgb = hexToRgb(gradientTo) || gradientTo;
  
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-900"
      style={{
        background: `linear-gradient(to right, ${fromRgb}, ${toRgb})`,
      }}
    >
      <Crown size={10} className="fill-yellow-900" />
      {text}
    </span>
  );
};

// 14. Pulsing Badge
export interface PulsingBadgeProps {
  children?: React.ReactNode;
  className?: string;
  pulseColor?: string;
  pulseSpeed?: number;
  borderRadius?: number;
  padding?: number;
}

export const PulsingBadge = ({
  children = "Live",
  className,
  pulseColor = "#ef4444",
  pulseSpeed = 1,
  borderRadius = 9999,
  padding = 8,
}: PulsingBadgeProps) => {
  const pulseRgb = hexToRgb(pulseColor) || pulseColor;
  const animationDuration = `${2 / pulseSpeed}s`;
  
  return (
    <span
      className={cn(
        "relative inline-flex items-center rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500",
        className
      )}
      style={{
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      <span className="mr-1.5 relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{
            backgroundColor: pulseRgb,
            animationDuration,
          }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: pulseRgb }}
        />
      </span>
      {children}
    </span>
  );
};

// 15. Tag Badge
export interface TagBadgeProps {
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
}

export const TagBadge = ({
  children = "Sale",
  className,
  backgroundColor = "#1f2937",
  textColor = "#ffffff",
  padding = 8,
}: TagBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className={cn(
        "relative inline-flex items-center bg-neutral-800 px-3 py-1 text-xs font-medium text-white pl-4",
        className
      )}
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 50%)",
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white" />
      {children}
    </span>
  );
};

// 16. Cyber Badge
export interface CyberBadgeProps {
  children?: React.ReactNode;
  className?: string;
  borderColor?: string;
  textColor?: string;
  glowColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const CyberBadge = ({
  children = "CYBER",
  className,
  borderColor = "#06b6d4",
  textColor = "#06b6d4",
  glowColor = "#06b6d4",
  borderRadius = 0,
  padding = 8,
}: CyberBadgeProps) => {
  const borderRgb = hexToRgb(borderColor) || borderColor;
  const textRgb = hexToRgb(textColor) || textColor;
  const glowRgb = hexToRgb(glowColor) || glowColor;
  
  return (
    <span
      className={cn(
        "inline-flex items-center border border-cyan-500 bg-black px-3 py-1 text-xs font-mono text-cyan-500",
        className
      )}
      style={{
        borderColor: borderRgb,
        color: textRgb,
        boxShadow: `0 0 5px ${glowRgb}50`,
        ...(borderRadius !== 0 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      [{children}]
    </span>
  );
};

// 17. Status Dot
export interface StatusDotProps {
  status?: "online" | "offline" | "busy";
  size?: number;
}

export const StatusDot = ({
  status = "online",
  size = 10,
}: StatusDotProps) => {
  const colors = {
    online: "bg-green-500",
    offline: "bg-neutral-400",
    busy: "bg-red-500",
  };
  
  return (
    <span
      className={cn("inline-block rounded-full ring-2 ring-white", colors[status])}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

// 18. Beta Badge
export interface BetaBadgeProps {
  text?: string;
  borderColor?: string;
  textColor?: string;
}

export const BetaBadge = ({
  text = "Beta",
  borderColor = "#a855f7",
  textColor = "#a855f7",
}: BetaBadgeProps) => {
  const borderRgb = hexToRgb(borderColor) || borderColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center rounded-md border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-purple-500"
      style={{
        borderColor: borderRgb,
        color: textRgb,
      }}
    >
      {text}
    </span>
  );
};

// 19. Trending Badge
export interface TrendingBadgeProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const TrendingBadge = ({
  text = "Trending",
  backgroundColor = "#fed7aa",
  textColor = "#ea580c",
}: TrendingBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center gap-1 rounded bg-orange-100 px-2 py-0.5 text-[10px] font-bold uppercase text-orange-600"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      <TrendingUp size={10} /> {text}
    </span>
  );
};

// 20. New Badge
export interface NewBadgeProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  shadowColor?: string;
}

export const NewBadge = ({
  text = "NEW",
  backgroundColor = "#2563eb",
  textColor = "#ffffff",
  shadowColor = "#2563eb",
}: NewBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  const shadowRgb = hexToRgb(shadowColor) || shadowColor;
  
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
        boxShadow: `0 1px 2px 0 ${shadowRgb}30`,
      }}
    >
      {text}
    </span>
  );
};

// 21. Warning Badge
export interface WarningBadgeProps {
  children?: React.ReactNode;
  className?: string;
  iconColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const WarningBadge = ({
  children = "Warning",
  className,
  iconColor = "#ca8a04",
  textColor = "#ca8a04",
  borderRadius = 9999,
  padding = 8,
}: WarningBadgeProps) => {
  const iconRgb = hexToRgb(iconColor) || iconColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-600",
        className
      )}
      style={{
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      <AlertCircle size={12} style={{ color: iconRgb }} />
      <span style={{ color: textRgb }}>{children}</span>
    </span>
  );
};

// 22. Magic Badge
export interface MagicBadgeProps {
  children?: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  iconColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const MagicBadge = ({
  children = "AI",
  className,
  gradientFrom = "#e0e7ff",
  gradientTo = "#f3e8ff",
  iconColor = "#8b5cf6",
  textColor = "#4f46e5",
  borderRadius = 9999,
  padding = 8,
}: MagicBadgeProps) => {
  const fromRgb = hexToRgb(gradientFrom) || gradientFrom;
  const toRgb = hexToRgb(gradientTo) || gradientTo;
  const iconRgb = hexToRgb(iconColor) || iconColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-indigo-200 px-3 py-1 text-xs font-bold",
        className
      )}
      style={{
        background: `linear-gradient(to right, ${fromRgb}, ${toRgb})`,
        color: textRgb,
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
        ...(padding !== 8 && { padding: `${padding}px` }),
      }}
    >
      <Sparkles size={10} style={{ color: iconRgb }} />
      {children}
    </span>
  );
};

// 23. Dark Pill Badge
export interface DarkPillBadgeProps {
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const DarkPillBadge = ({
  children = "Dark",
  className,
  backgroundColor,
  textColor,
  borderRadius = 9999,
  padding = 8,
}: DarkPillBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-300 hover:bg-white/20 hover:text-white transition-colors cursor-default",
      className
    )}
    style={{
      ...(backgroundColor && { backgroundColor: hexToRgb(backgroundColor) || backgroundColor }),
      ...(textColor && { color: hexToRgb(textColor) || textColor }),
      ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
      ...(padding !== 8 && { padding: `${padding}px` }),
    }}
  >
    {children}
  </span>
);

// 24. Hot Badge
export interface HotBadgeProps {
  text?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const HotBadge = ({
  text = "HOT",
  borderColor = "#fecaca",
  backgroundColor = "#fef2f2",
  textColor = "#dc2626",
}: HotBadgeProps) => {
  const borderRgb = hexToRgb(borderColor) || borderColor;
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center gap-0.5 rounded border border-red-200 bg-red-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-red-600"
      style={{
        borderColor: borderRgb,
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      <Flame size={10} className="fill-red-600" /> {text}
    </span>
  );
};

// 25. Role Badge
export interface RoleBadgeProps {
  role?: string;
  dotColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const RoleBadge = ({
  role = "Admin",
  dotColor = "#9ca3af",
  backgroundColor = "#f3f4f6",
  textColor = "#4b5563",
}: RoleBadgeProps) => {
  const dotRgb = hexToRgb(dotColor) || dotColor;
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center gap-1 rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 border border-neutral-200"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      <div
        className="h-1.5 w-1.5 rounded-sm"
        style={{ backgroundColor: dotRgb }}
      />
      {role}
    </span>
  );
};

// 26. Discount Badge
export interface DiscountBadgeProps {
  percent?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const DiscountBadge = ({
  percent = 20,
  backgroundColor = "#000000",
  textColor = "#ffffff",
}: DiscountBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center rounded-sm bg-black px-1.5 py-0.5 text-xs font-bold text-white"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      -{percent}%
    </span>
  );
};

// 27. Security Badge
export interface SecurityBadgeProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

export const SecurityBadge = ({
  text = "Secure",
  backgroundColor = "#d1fae5",
  textColor = "#059669",
  borderColor = "#a7f3d0",
}: SecurityBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  const borderRgb = hexToRgb(borderColor) || borderColor;
  
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-600"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
        borderColor: borderRgb,
      }}
    >
      <Shield size={10} /> {text}
    </span>
  );
};

// 28. Time Badge
export interface TimeBadgeProps {
  time?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const TimeBadge = ({
  time = "12:00",
  backgroundColor = "#1f2937",
  textColor = "#d1d5db",
}: TimeBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center gap-1 rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-300"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      <Clock size={10} /> {time}
    </span>
  );
};

// 29. Category Badge
export interface CategoryBadgeProps {
  category?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const CategoryBadge = ({
  category = "Category",
  backgroundColor = "#3b82f6",
  textColor = "#ffffff",
}: CategoryBadgeProps) => {
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm"
      style={{
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      {category}
    </span>
  );
};

// 30. Platform Badge
export interface PlatformBadgeProps {
  platform?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const PlatformBadge = ({
  platform = "iOS",
  borderColor = "#d1d5db",
  backgroundColor = "#f9fafb",
  textColor = "#4b5563",
}: PlatformBadgeProps) => {
  const borderRgb = hexToRgb(borderColor) || borderColor;
  const bgRgb = hexToRgb(backgroundColor) || backgroundColor;
  const textRgb = hexToRgb(textColor) || textColor;
  
  return (
    <span
      className="inline-flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-2 py-1 text-[10px] font-semibold text-neutral-600"
      style={{
        borderColor: borderRgb,
        backgroundColor: bgRgb,
        color: textRgb,
      }}
    >
      {platform}
    </span>
  );
};

// Export badge components by name for playground
const badgeComponentMap: Record<string, React.FC<any>> = {
  "SolidBadge": SolidBadge,
  "OutlineBadge": OutlineBadge,
  "SoftBadge": SoftBadge,
  "DotBadge": DotBadge,
  "IconBadge": IconBadge,
  "GradientBadge": GradientBadge,
  "GlassBadge": GlassBadge,
  "NeonBadge": NeonBadge,
  "BrutalistBadge": BrutalistBadge,
  "CountBadge": CountBadge,
  "DismissableBadge": DismissableBadge,
  "VerifiedBadge": VerifiedBadge,
  "PremiumBadge": PremiumBadge,
  "PulsingBadge": PulsingBadge,
  "TagBadge": TagBadge,
  "CyberBadge": CyberBadge,
  "StatusDot": StatusDot,
  "BetaBadge": BetaBadge,
  "TrendingBadge": TrendingBadge,
  "NewBadge": NewBadge,
  "WarningBadge": WarningBadge,
  "MagicBadge": MagicBadge,
  "DarkPillBadge": DarkPillBadge,
  "HotBadge": HotBadge,
  "RoleBadge": RoleBadge,
  "DiscountBadge": DiscountBadge,
  "SecurityBadge": SecurityBadge,
  "TimeBadge": TimeBadge,
  "CategoryBadge": CategoryBadge,
  "PlatformBadge": PlatformBadge,
};

export const badgeComponentsByName = badgeSections.reduce<Record<string, React.FC<any>>>(
  (acc, badge) => {
    acc[badge.componentName] = badgeComponentMap[badge.componentName];
    return acc;
  },
  {}
);


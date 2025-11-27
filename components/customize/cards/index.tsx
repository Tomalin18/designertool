"use client"

import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import { 
  ArrowRight, 
  Heart, 
  Share2, 
  MessageCircle, 
  MoreHorizontal, 
  Check, 
  Star, 
  Clock, 
  Calendar, 
  User, 
  MapPin, 
  TrendingUp, 
  Play,
  Music,
  Github,
  Twitter,
  Linkedin,
  Shield,
  Zap,
  Box,
  Layers
} from "lucide-react";
import { ShinyButton } from "../ShinyButton";
import { cardSections } from "@/lib/card-sections";

// 1. Simple Card
export interface SimpleCardProps {
  className?: string;
  title?: string;
  description?: string;
  linkText?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  linkColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const SimpleCard = ({
  className,
  title = "Simple Card",
  description = "A standard card component for displaying content. Clean and minimal.",
  linkText = "Read more →",
  backgroundColor,
  borderColor,
  textColor,
  linkColor = "text-indigo-400",
  borderRadius = 12,
  padding = 24,
}: SimpleCardProps) => (
  <div 
    className={cn("w-full border border-neutral-800 bg-neutral-900/50 shadow-sm hover:border-neutral-700 transition-colors", className)}
    style={{
      ...(backgroundColor && { backgroundColor }),
      ...(borderColor && { borderColor }),
      ...(textColor && { color: textColor }),
      ...(borderRadius && { borderRadius: `${borderRadius}px` }),
      ...(padding && { padding: `${padding}px` }),
    }}
  >
    <h3 className="font-semibold text-neutral-200" style={{ color: textColor }}>{title}</h3>
    <p className="mt-2 text-sm text-neutral-400" style={{ color: textColor }}>
      {description}
    </p>
    <div className="mt-4">
      <button className={cn("text-sm font-medium hover:text-indigo-300", linkColor)}>{linkText}</button>
    </div>
  </div>
);

// 2. Image Top Card
export interface ImageCardProps {
  className?: string;
  category?: string;
  readTime?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  categoryColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const ImageCard = ({
  className,
  category = "Lifestyle",
  readTime = "5 min read",
  title = "The Art of Coffee",
  description = "Exploring the nuances of brewing the perfect cup of pour-over coffee.",
  imageUrl = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
  categoryColor = "text-indigo-400",
  backgroundColor,
  borderColor,
  textColor,
  borderRadius = 12,
}: ImageCardProps) => (
  <div 
    className={cn("w-full overflow-hidden border border-neutral-800 bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow", className)}
    style={{
      ...(backgroundColor && { backgroundColor }),
      ...(borderColor && { borderColor }),
      ...(textColor && { color: textColor }),
      ...(borderRadius && { borderRadius: `${borderRadius}px` }),
    }}
  >
    <img 
      src={imageUrl} 
      alt={title} 
      className="h-48 w-full object-cover"
    />
    <div className="p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className={cn("text-xs font-medium", categoryColor)}>{category}</span>
        <span className="text-xs text-neutral-500">{readTime}</span>
      </div>
      <h3 className="font-bold text-neutral-200">{title}</h3>
      <p className="mt-2 text-sm text-neutral-400">
        {description}
      </p>
    </div>
  </div>
);

// 3. Horizontal Card
export interface HorizontalCardProps {
  className?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  authorName?: string;
  authorAvatar?: string;
}

export const HorizontalCard = ({
  className,
  title = "Modern Workspace",
  description = "Designing an environment that fosters creativity and productivity in the digital age.",
  imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
  authorName = "Alex Chen",
  authorAvatar,
}: HorizontalCardProps) => (
  <div className={cn("flex w-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 sm:flex-row hover:bg-neutral-900 transition-colors", className)}>
    <div className="h-48 w-full shrink-0 sm:h-auto sm:w-48">
      <img 
        src={imageUrl} 
        alt={title} 
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex flex-col justify-between p-5">
      <div>
        <h3 className="font-bold text-neutral-200">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
          {description}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {authorAvatar ? (
          <img src={authorAvatar} alt={authorName} className="h-6 w-6 rounded-full" />
        ) : (
          <div className="h-6 w-6 rounded-full bg-neutral-700" />
        )}
        <span className="text-xs text-neutral-500">{authorName}</span>
      </div>
    </div>
  </div>
);

// 4. Overlay Card
export interface OverlayCardProps {
  className?: string;
  category?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const OverlayCard = ({
  className,
  category = "Nature",
  title = "Morning Mist",
  description = "Discover the serenity of early mornings.",
  imageUrl = "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1000&auto=format&fit=crop",
}: OverlayCardProps) => (
  <div className={cn("group relative h-64 w-full overflow-hidden rounded-xl bg-neutral-900", className)}>
    <img 
      src={imageUrl} 
      alt={title} 
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 p-6">
      <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
        {category}
      </span>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm text-neutral-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        {description}
      </p>
    </div>
  </div>
);

// 5. Glassmorphism Card
export interface GlassCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  buttonText?: string;
  glowColor1?: string;
  glowColor2?: string;
}

export const GlassCard = ({
  className,
  icon,
  title = "Glass Effect",
  description = "Using backdrop-blur to create depth and hierarchy in modern interfaces.",
  buttonText = "Explore",
  glowColor1 = "rgb(168 85 247 / 0.2)",
  glowColor2 = "rgb(59 130 246 / 0.2)",
}: GlassCardProps) => {
  const IconComponent = icon || <Zap size={20} />;
  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl", className)}>
      <div 
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl" 
        style={{ backgroundColor: glowColor1 }}
      />
      <div 
        className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-2xl" 
        style={{ backgroundColor: glowColor2 }}
      />
      
      <div className="relative z-10">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
          {IconComponent}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-neutral-300">
          {description}
        </p>
        <button className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// 6. Neo-Brutalist Card
export interface NeoBrutalistCardProps {
  className?: string;
  badge?: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const NeoBrutalistCard = ({
  className,
  badge = "New Drop",
  title = "Hyper\nPop.",
  description = "Bold colors and high contrast.",
  backgroundColor = "#ff90e8",
  textColor = "#000000",
}: NeoBrutalistCardProps) => (
  <div 
    className={cn("w-full border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all", className)}
    style={{ backgroundColor, color: textColor }}
  >
    <div className="mb-4 border-2 border-black bg-white p-2 w-fit font-bold text-xs uppercase">
      {badge}
    </div>
    <h3 className="text-2xl font-black uppercase leading-none whitespace-pre-line">
      {title}
    </h3>
    <p className="mt-4 font-bold">
      {description}
    </p>
  </div>
);

// 7. Profile Card
export interface ProfileCardProps {
  className?: string;
  name?: string;
  role?: string;
  avatarUrl?: string;
  isOnline?: boolean;
  followers?: number;
  following?: number;
  projects?: number;
  showSocialLinks?: boolean;
}

export const ProfileCard = ({
  className,
  name = "Sarah Jenkins",
  role = "Product Designer",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  isOnline = true,
  followers = 1200,
  following = 842,
  projects = 12,
  showSocialLinks = true,
}: ProfileCardProps) => (
  <div className={cn("flex w-full flex-col items-center rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center", className)}>
    <div className="relative mb-4">
      <img 
        src={avatarUrl} 
        alt={name} 
        className="h-20 w-20 rounded-full border-2 border-neutral-800 object-cover"
      />
      {isOnline && (
        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-neutral-900 bg-green-500" />
      )}
    </div>
    <h3 className="font-bold text-white">{name}</h3>
    <p className="text-sm text-neutral-500">{role}</p>
    
    {showSocialLinks && (
      <div className="mt-4 flex gap-2">
        <button className="rounded-full bg-neutral-800 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white"><Twitter size={16}/></button>
        <button className="rounded-full bg-neutral-800 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white"><Github size={16}/></button>
        <button className="rounded-full bg-neutral-800 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white"><Linkedin size={16}/></button>
      </div>
    )}
    
    <div className="mt-6 grid w-full grid-cols-3 border-t border-neutral-800 pt-4">
      <div>
        <div className="font-bold text-white">{followers >= 1000 ? `${(followers / 1000).toFixed(1)}k` : followers}</div>
        <div className="text-[10px] text-neutral-500">Followers</div>
      </div>
      <div>
        <div className="font-bold text-white">{following}</div>
        <div className="text-[10px] text-neutral-500">Following</div>
      </div>
      <div>
        <div className="font-bold text-white">{projects}</div>
        <div className="text-[10px] text-neutral-500">Projects</div>
      </div>
    </div>
  </div>
);

// 8. Pricing Card
export interface PricingCardProps {
  className?: string;
  planName?: string;
  price?: number;
  period?: string;
  features?: string[];
  buttonText?: string;
  accentColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  buttonColor?: string;
  borderRadius?: number;
  padding?: number;
}

export const PricingCard = ({
  className,
  planName = "Pro Plan",
  price = 29,
  period = "/mo",
  features = ["Unlimited Projects", "Analytics Dashboard", "Priority Support", "Custom Domain"],
  buttonText = "Get Started",
  accentColor = "#6366f1",
  backgroundColor,
  borderColor,
  textColor,
  buttonColor,
  borderRadius = 12,
  padding = 24,
}: PricingCardProps) => (
  <div 
    className={cn("w-full border bg-neutral-900 relative overflow-hidden hover:border-indigo-500/50 transition-colors", className)}
    style={{ 
      borderColor: borderColor || `${accentColor}30`,
      backgroundColor: backgroundColor,
      color: textColor,
      borderRadius: `${borderRadius}px`,
      padding: `${padding}px`,
    }}
  >
    <div 
      className="absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl" 
      style={{ backgroundColor: `${accentColor}20` }}
    />
    
    <div className="mb-2 text-sm font-bold uppercase" style={{ color: accentColor }}>{planName}</div>
    <div className="mb-6 flex items-baseline gap-1">
      <span className="text-3xl font-bold text-white">${price}</span>
      <span className="text-neutral-500">{period}</span>
    </div>
    
    <ul className="mb-8 space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
          <Check size={14} style={{ color: accentColor }} /> {f}
        </li>
      ))}
    </ul>
    
    <button 
      className="w-full rounded-lg py-2 text-sm font-bold text-white transition-colors"
      style={{ backgroundColor: buttonColor || accentColor }}
      onMouseEnter={(e) => {
        const rgb = hexToRgb(accentColor);
        if (rgb) {
          e.currentTarget.style.backgroundColor = adjustBrightness(rgb, -10);
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = accentColor;
      }}
    >
      {buttonText}
    </button>
  </div>
);

// Helper functions for PricingCard
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const adjustBrightness = (rgb: { r: number; g: number; b: number }, amount: number) => {
  const r = Math.max(0, Math.min(255, rgb.r + amount));
  const g = Math.max(0, Math.min(255, rgb.g + amount));
  const b = Math.max(0, Math.min(255, rgb.b + amount));
  return `rgb(${r}, ${g}, ${b})`;
};

// 9. Product Card
export interface ProductCardProps {
  className?: string;
  name?: string;
  category?: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  badge?: string;
  isFavorite?: boolean;
}

export const ProductCard = ({
  className,
  name = "Nike Air Max",
  category = "Running Shoes",
  price = 129.00,
  rating = 4.8,
  imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
  badge = "NEW",
  isFavorite = false,
}: ProductCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  
  return (
    <div className={cn("group w-full rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md", className)}>
      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <button 
          onClick={() => setFavorite(!favorite)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm hover:text-red-500"
        >
          <Heart size={16} className={favorite ? "fill-red-500 text-red-500" : ""} />
        </button>
        {badge && (
          <div className="absolute bottom-2 left-2 rounded bg-black px-2 py-1 text-[10px] font-bold text-white">
            {badge}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-900">{name}</h3>
        <p className="text-xs text-neutral-500">{category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-neutral-900">${price.toFixed(2)}</span>
          <div className="flex items-center gap-1 text-xs text-yellow-500">
            <Star size={12} fill="currentColor" /> {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

// 10. News/Blog Card
export interface NewsCardProps {
  className?: string;
  category?: string;
  date?: string;
  title?: string;
  description?: string;
  authorName?: string;
  authorAvatar?: string;
  readTime?: string;
  categoryColor?: string;
}

export const NewsCard = ({
  className,
  category = "Technology",
  date = "Oct 24, 2024",
  title = "The Future of AI in Design",
  description = "How generative AI is reshaping the creative workflow for designers and developers alike.",
  authorName = "Alex Morgan",
  authorAvatar,
  readTime = "5 min",
  categoryColor = "bg-blue-500/10 text-blue-400 border-blue-500/20",
}: NewsCardProps) => (
  <div className={cn("w-full rounded-xl bg-neutral-900 p-6 border border-neutral-800 hover:bg-neutral-800/50 transition-colors group cursor-pointer", className)}>
    <div className="mb-4 flex items-center gap-2 text-xs">
      <span className={cn("rounded px-2 py-0.5 border", categoryColor)}>{category}</span>
      <span className="text-neutral-500">{date}</span>
    </div>
    <h3 className="mb-2 text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    <p className="mb-4 line-clamp-2 text-sm text-neutral-400">
      {description}
    </p>
    <div className="flex items-center gap-2">
      {authorAvatar ? (
        <img src={authorAvatar} alt={authorName} className="h-6 w-6 rounded-full" />
      ) : (
        <div className="h-6 w-6 rounded-full bg-neutral-700" />
      )}
      <span className="text-xs font-medium text-neutral-300">{authorName}</span>
      <span className="mx-1 text-neutral-600">•</span>
      <span className="text-xs text-neutral-500 flex items-center gap-1"><Clock size={10}/> {readTime}</span>
    </div>
  </div>
);

// 11. Statistic Card
export interface StatsCardProps {
  className?: string;
  title?: string;
  value?: string;
  change?: number;
  icon?: React.ReactNode;
  iconColor?: string;
  changeColor?: string;
}

export const StatsCard = ({
  className,
  title = "Total Revenue",
  value = "$24,500",
  change = 12.5,
  icon,
  iconColor = "text-neutral-400",
  changeColor = "text-green-500",
}: StatsCardProps) => {
  const IconComponent = icon || <TrendingUp size={20} />;
  return (
    <div className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn("rounded-lg bg-neutral-800 p-2", iconColor)}>
          {IconComponent}
        </div>
        <span className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded", changeColor, change >= 0 ? "bg-green-500/10" : "bg-red-500/10")}>
          {change >= 0 ? "+" : ""}{change}% <ArrowRight size={10} className="-rotate-45" />
        </span>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-neutral-500">{title}</div>
    </div>
  );
};

// 12. Testimonial Card
export interface TestimonialCardProps {
  className?: string;
  rating?: number;
  quote?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
}

export const TestimonialCard = ({
  className,
  rating = 5,
  quote = "\"Lumina UI has completely transformed how we build products. The components are beautifully designed and easy to customize.\"",
  authorName = "Emily Watson",
  authorRole = "CTO at TechFlow",
  authorAvatar = "https://i.pravatar.cc/100?img=33",
}: TestimonialCardProps) => (
  <div className={cn("w-full rounded-xl bg-neutral-50 p-6 border border-neutral-200", className)}>
    <div className="mb-4 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} />
      ))}
    </div>
    <p className="mb-6 text-sm italic text-neutral-600 leading-relaxed">
      {quote}
    </p>
    <div className="flex items-center gap-3">
      <img src={authorAvatar} className="h-10 w-10 rounded-full" alt={authorName} />
      <div>
        <div className="text-sm font-bold text-neutral-900">{authorName}</div>
        <div className="text-xs text-neutral-500">{authorRole}</div>
      </div>
    </div>
  </div>
);

// 13. Task Card
export interface TaskCardProps {
  className?: string;
  priority?: string;
  priorityColor?: string;
  title?: string;
  description?: string;
  assignees?: string[];
  commentCount?: number;
}

export const TaskCard = ({
  className,
  priority = "High Priority",
  priorityColor = "text-orange-500",
  title = "Redesign Homepage",
  description = "Update hero section and navigation.",
  assignees = [],
  commentCount = 3,
}: TaskCardProps) => (
  <div className={cn("w-full rounded-xl border border-l-4 border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer", className)} style={{ borderLeftColor: priorityColor.includes("orange") ? "#f97316" : priorityColor.includes("red") ? "#ef4444" : "#3b82f6" }}>
    <div className="mb-2 flex items-center justify-between">
      <span className={cn("text-xs font-bold uppercase", priorityColor)}>{priority}</span>
      <MoreHorizontal size={16} className="text-neutral-400" />
    </div>
    <h3 className="font-bold text-neutral-800">{title}</h3>
    <p className="mt-1 text-xs text-neutral-500">{description}</p>
    
    <div className="mt-4 flex items-center justify-between border-t pt-3">
      <div className="flex -space-x-2">
        {assignees.length > 0 ? (
          assignees.map((avatar, i) => (
            <div key={i} className="h-6 w-6 rounded-full bg-neutral-200 border-2 border-white" style={{ backgroundImage: avatar.startsWith("http") ? `url(${avatar})` : undefined }} />
          ))
        ) : (
          <>
            <div className="h-6 w-6 rounded-full bg-neutral-200 border-2 border-white" />
            <div className="h-6 w-6 rounded-full bg-neutral-300 border-2 border-white" />
          </>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs text-neutral-400">
        <MessageCircle size={12} /> {commentCount}
      </div>
    </div>
  </div>
);

// 14. Music Player Card
export interface MusicCardProps {
  className?: string;
  songTitle?: string;
  artist?: string;
  currentTime?: string;
  totalTime?: string;
  progress?: number;
  isPlaying?: boolean;
}

export const MusicCard = ({
  className,
  songTitle = "Midnight City",
  artist = "M83",
  currentTime = "2:10",
  totalTime = "4:03",
  progress = 50,
  isPlaying = false,
}: MusicCardProps) => {
  const [playing, setPlaying] = useState(isPlaying);
  
  return (
    <div className={cn("w-full rounded-2xl bg-gradient-to-br from-violet-900 to-indigo-900 p-6 text-white shadow-xl", className)}>
      <div className="mb-6 flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-black/30 border-4 border-white/10 shadow-2xl flex items-center justify-center animate-[spin_10s_linear_infinite]">
          <div className="h-10 w-10 rounded-full bg-violet-900" />
        </div>
      </div>
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold">{songTitle}</h3>
        <p className="text-sm text-violet-300">{artist}</p>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-1 w-full rounded-full bg-violet-950">
          <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-[10px] text-violet-300">
          <span>{currentTime}</span>
          <span>{totalTime}</span>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <button onClick={() => {}} className="hover:text-violet-300"><Play size={20} className="rotate-180" fill="currentColor" /></button>
        <button 
          onClick={() => setPlaying(!playing)}
          className="h-10 w-10 rounded-full bg-white text-violet-900 flex items-center justify-center hover:scale-105 transition-transform"
        >
          {playing ? <Play size={16} fill="currentColor" className="ml-0.5" /> : <Play size={16} fill="currentColor" />}
        </button>
        <button onClick={() => {}} className="hover:text-violet-300"><Play size={20} fill="currentColor" /></button>
      </div>
    </div>
  );
};

// 15. Video Thumbnail Card
export interface VideoCardProps {
  className?: string;
  title?: string;
  channel?: string;
  views?: string;
  duration?: string;
  thumbnailUrl?: string;
  channelAvatar?: string;
}

export const VideoCard = ({
  className,
  title = "Cinematic Lighting Techniques for Beginners",
  channel = "Filmmaker Pro",
  views = "120k views",
  duration = "12:45",
  thumbnailUrl = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
  channelAvatar,
}: VideoCardProps) => (
  <div className={cn("group w-full cursor-pointer rounded-xl bg-neutral-900 overflow-hidden", className)}>
    <div className="relative aspect-video w-full overflow-hidden">
      <img 
        src={thumbnailUrl} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
        alt={title}
      />
      <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-bold text-white">
        {duration}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Play size={20} fill="white" className="ml-1 text-white" />
        </div>
      </div>
    </div>
    <div className="p-3 flex gap-3">
      {channelAvatar ? (
        <img src={channelAvatar} alt={channel} className="h-9 w-9 shrink-0 rounded-full" />
      ) : (
        <div className="h-9 w-9 shrink-0 rounded-full bg-neutral-700" />
      )}
      <div>
        <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-xs text-neutral-400">{channel} • {views}</p>
      </div>
    </div>
  </div>
);

// 16. Feature Icon Card
export interface FeatureIconCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  iconColor?: string;
  iconBgColor?: string;
}

export const FeatureIconCard = ({
  className,
  icon,
  title = "Secure by Default",
  description = "Enterprise-grade security built into every component.",
  iconColor = "text-indigo-600",
  iconBgColor = "bg-indigo-100",
}: FeatureIconCardProps) => {
  const IconComponent = icon || <Shield size={24} />;
  return (
    <div className={cn("w-full rounded-xl bg-neutral-50 p-6 text-center transition-transform hover:-translate-y-1 hover:shadow-lg", className)}>
      <div className={cn("mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl", iconBgColor, iconColor)}>
        {IconComponent}
      </div>
      <h3 className="font-bold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500">
        {description}
      </p>
    </div>
  );
};

// 17. Notification/Alert Card
export interface AlertCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  primaryAction?: string;
  secondaryAction?: string;
  variant?: "warning" | "info" | "error" | "success";
}

export const AlertCard = ({
  className,
  icon,
  title = "Update Available",
  description = "A new version of the system is available. Please update to ensure compatibility.",
  primaryAction = "Update Now",
  secondaryAction = "Dismiss",
  variant = "warning",
}: AlertCardProps) => {
  const IconComponent = icon || <Zap size={16} />;
  const variantStyles = {
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-500",
      titleColor: "text-amber-500",
      textColor: "text-amber-200/70",
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
      titleColor: "text-blue-500",
      textColor: "text-blue-200/70",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-500",
      titleColor: "text-red-500",
      textColor: "text-red-200/70",
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
      titleColor: "text-green-500",
      textColor: "text-green-200/70",
    },
  };
  
  const styles = variantStyles[variant];
  
  return (
    <div className={cn("flex w-full items-start gap-4 rounded-xl border p-4", styles.bg, styles.border, className)}>
      <div className={cn("rounded-full p-1", styles.iconBg, styles.iconColor)}>
        {IconComponent}
      </div>
      <div className="flex-1">
        <h4 className={cn("text-sm font-bold", styles.titleColor)}>{title}</h4>
        <p className={cn("text-xs mt-1", styles.textColor)}>
          {description}
        </p>
        <div className="mt-3 flex gap-3">
          <button className={cn("text-xs font-bold hover:opacity-80", styles.titleColor)}>{primaryAction}</button>
          <button className="text-xs font-medium text-neutral-500 hover:text-neutral-400">{secondaryAction}</button>
        </div>
      </div>
    </div>
  );
};

// 18. Hover Reveal Card
export interface HoverRevealCardProps {
  className?: string;
  frontIcon?: React.ReactNode;
  frontTitle?: string;
  backTitle?: string;
  backDescription?: string;
  buttonText?: string;
  backgroundColor?: string;
  revealColor?: string;
}

export const HoverRevealCard = ({
  className,
  frontIcon,
  frontTitle = "Hover Me",
  backTitle = "Revealed!",
  backDescription = "Hidden content is now visible.",
  buttonText = "Action",
  backgroundColor = "#000000",
  revealColor = "#6366f1",
}: HoverRevealCardProps) => {
  const IconComponent = frontIcon || <Box size={48} />;
  return (
    <div 
      className={cn("group relative h-64 w-full overflow-hidden rounded-xl", className)}
      style={{ backgroundColor }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-transform duration-300 group-hover:-translate-y-full">
        <div className="text-white mb-4">{IconComponent}</div>
        <h3 className="text-xl font-bold text-white">{frontTitle}</h3>
      </div>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-transform duration-300 translate-y-full group-hover:translate-y-0"
        style={{ backgroundColor: revealColor }}
      >
        <h3 className="text-xl font-bold text-white">{backTitle}</h3>
        <p className="mt-2 text-sm text-white/90">{backDescription}</p>
        <button className="mt-4 rounded-full bg-white px-6 py-2 text-xs font-bold" style={{ color: revealColor }}>{buttonText}</button>
      </div>
    </div>
  );
};

// 19. Gradient Border Card
export interface GradientBorderCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const GradientBorderCard = ({
  className,
  icon,
  title = "Gradient Border",
  description = "Using a background gradient on a parent with padding to create a border effect.",
  gradientFrom = "#ec4899",
  gradientTo = "#f59e0b",
}: GradientBorderCardProps) => {
  const IconComponent = icon || <Layers size={20} />;
  return (
    <div 
      className={cn("group relative w-full rounded-xl p-[2px]", className)}
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="h-full w-full rounded-[10px] bg-neutral-900 p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-white">
          {IconComponent}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};

// 20. Event Card
export interface EventCardProps {
  className?: string;
  month?: string;
  day?: string;
  title?: string;
  location?: string;
  showShare?: boolean;
}

export const EventCard = ({
  className,
  month = "OCT",
  day = "24",
  title = "Product Launch",
  location = "San Francisco, CA",
  showShare = true,
}: EventCardProps) => (
  <div className={cn("flex w-full overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-100", className)}>
    <div className="flex w-20 flex-col items-center justify-center bg-indigo-50 text-center">
      <span className="text-xs font-bold uppercase text-indigo-600">{month}</span>
      <span className="text-xl font-bold text-neutral-900">{day}</span>
    </div>
    <div className="flex-1 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-neutral-900">{title}</h3>
          <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
            <MapPin size={10} /> {location}
          </p>
        </div>
        {showShare && (
          <button className="rounded-full border border-neutral-200 p-2 text-neutral-400 hover:bg-neutral-50 hover:text-indigo-600">
            <Share2 size={14} />
          </button>
        )}
      </div>
    </div>
  </div>
);

// 21. Skill/Tag Card
export interface SkillCardProps {
  className?: string;
  title?: string;
  skills?: string[];
}

export const SkillCard = ({
  className,
  title = "Skills",
  skills = ["React", "TypeScript", "Node.js", "Tailwind", "Figma", "GraphQL"],
}: SkillCardProps) => (
  <div className={cn("w-full rounded-xl bg-neutral-900 p-6 border border-neutral-800", className)}>
    <h3 className="font-bold text-white mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map(tag => (
        <span key={tag} className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-300 border border-neutral-700 hover:border-neutral-500 cursor-default transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// 22. Comparison Card (vs)
export interface ComparisonCardProps {
  className?: string;
  leftLabel?: string;
  rightLabel?: string;
  rows?: Array<{ label: string; left: string; right: string }>;
}

export const ComparisonCard = ({
  className,
  leftLabel = "Basic",
  rightLabel = "Pro",
  rows = [
    { label: "Users", left: "1", right: "Unlimited" },
    { label: "Storage", left: "5GB", right: "100GB" },
    { label: "Support", left: "Email", right: "24/7 Priority" },
  ],
}: ComparisonCardProps) => (
  <div className={cn("w-full rounded-xl border border-neutral-200 bg-white p-6", className)}>
    <div className="flex items-center justify-between text-sm font-bold text-neutral-900 mb-6">
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
    <div className="space-y-4">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">{row.label}</span>
          <div className="flex gap-8">
            <span className="w-16 text-right text-neutral-400">{row.left}</span>
            <span className="w-16 text-right font-medium text-indigo-600">{row.right}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 23. Roadmap Card
export interface RoadmapCardProps {
  className?: string;
  title?: string;
  year?: string;
  items?: Array<{ title: string; status: string; color: string }>;
}

export const RoadmapCard = ({
  className,
  title = "Q4 Roadmap",
  year = "2024",
  items = [
    { title: "Mobile App Beta", status: "Done", color: "bg-green-500" },
    { title: "Dark Mode V2", status: "In Progress", color: "bg-yellow-500" },
    { title: "API Release", status: "Planned", color: "bg-neutral-600" },
  ],
}: RoadmapCardProps) => (
  <div className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-6", className)}>
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-white">{title}</h3>
      <span className="text-xs text-neutral-500">{year}</span>
    </div>
    <div className="relative border-l border-neutral-800 ml-2 space-y-6">
      {items.map((item, i) => (
        <div key={i} className="relative pl-6">
          <div className={cn("absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-neutral-900", item.color)} />
          <h4 className="text-sm font-medium text-neutral-200">{item.title}</h4>
          <span className="text-xs text-neutral-500">{item.status}</span>
        </div>
      ))}
    </div>
  </div>
);

// 24. Weather Card
export interface WeatherCardProps {
  className?: string;
  temperature?: number;
  city?: string;
  condition?: string;
  high?: number;
  low?: number;
  hourlyForecast?: Array<{ time: string; temp: number }>;
}

export const WeatherCard = ({
  className,
  temperature = 72,
  city = "San Francisco",
  condition = "Sunny",
  high = 75,
  low = 60,
  hourlyForecast = [
    { time: "Now", temp: 72 },
    { time: "2PM", temp: 73 },
    { time: "3PM", temp: 74 },
    { time: "4PM", temp: 75 },
    { time: "5PM", temp: 76 },
  ],
}: WeatherCardProps) => (
  <div className={cn("w-full rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 p-6 text-white shadow-lg", className)}>
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-4xl font-bold">{temperature}°</h2>
        <p className="font-medium opacity-90">{city}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{condition}</p>
        <p className="text-xs opacity-75">H:{high}° L:{low}°</p>
      </div>
    </div>
    <div className="mt-8 flex justify-between text-center text-xs opacity-90">
      {hourlyForecast.map((forecast, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span>{forecast.time}</span>
          <div className="h-4 w-4 rounded-full bg-yellow-300 mx-auto shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
          <span>{forecast.temp}°</span>
        </div>
      ))}
    </div>
  </div>
);

// 25. Cookie Consent Card
export interface CookieCardProps {
  className?: string;
  title?: string;
  description?: string;
  acceptText?: string;
  declineText?: string;
}

export const CookieCard = ({
  className,
  title = "Cookies",
  description = "We use cookies to improve your experience. By using our site, you agree to our use of cookies.",
  acceptText = "Accept",
  declineText = "Decline",
}: CookieCardProps) => (
  <div className={cn("w-full rounded-xl bg-white p-6 shadow-2xl border border-neutral-100", className)}>
    <div className="mb-4 h-10 w-10 text-3xl">🍪</div>
    <h3 className="font-bold text-neutral-900">{title}</h3>
    <p className="mt-2 text-sm text-neutral-500">
      {description}
    </p>
    <div className="mt-6 flex gap-3">
      <button className="flex-1 rounded-lg bg-black py-2 text-sm font-bold text-white hover:bg-neutral-800">
        {acceptText}
      </button>
      <button className="flex-1 rounded-lg border border-neutral-200 py-2 text-sm font-bold text-neutral-600 hover:bg-neutral-50">
        {declineText}
      </button>
    </div>
  </div>
);

// Export card components by name for playground
const cardComponentMap: Record<string, React.FC<any>> = {
  "SimpleCard": SimpleCard,
  "ImageCard": ImageCard,
  "HorizontalCard": HorizontalCard,
  "OverlayCard": OverlayCard,
  "GlassCard": GlassCard,
  "NeoBrutalistCard": NeoBrutalistCard,
  "ProfileCard": ProfileCard,
  "PricingCard": PricingCard,
  "ProductCard": ProductCard,
  "NewsCard": NewsCard,
  "StatsCard": StatsCard,
  "TestimonialCard": TestimonialCard,
  "TaskCard": TaskCard,
  "MusicCard": MusicCard,
  "VideoCard": VideoCard,
  "FeatureIconCard": FeatureIconCard,
  "AlertCard": AlertCard,
  "HoverRevealCard": HoverRevealCard,
  "GradientBorderCard": GradientBorderCard,
  "EventCard": EventCard,
  "SkillCard": SkillCard,
  "ComparisonCard": ComparisonCard,
  "RoadmapCard": RoadmapCard,
  "WeatherCard": WeatherCard,
  "CookieCard": CookieCard,
};

export const cardComponentsByName = cardSections.reduce<Record<string, React.FC<any>>>(
  (acc, card) => {
    acc[card.componentName] = cardComponentMap[card.componentName];
    return acc;
  },
  {}
);


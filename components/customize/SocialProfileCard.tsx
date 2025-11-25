import React from "react";

import { cn } from "@/lib/utils";

import { MapPin, Link as LinkIcon, Twitter, Users, MessageCircle } from "lucide-react";

import { ShinyButton } from "./ShinyButton";

interface SocialProfileCardProps {
  className?: string;
  // User Info
  name?: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  // Social Links
  location?: string;
  website?: string;
  twitter?: string;
  showLocation?: boolean;
  showWebsite?: boolean;
  showTwitter?: boolean;
  // Stats
  followers?: string | number;
  following?: string | number;
  projects?: string | number;
  // Status
  isOnline?: boolean;
  statusColor?: string;
  // Banner
  bannerGradientFrom?: string;
  bannerGradientVia?: string;
  bannerGradientTo?: string;
  // Buttons
  followButtonText?: string;
  showFollowButton?: boolean;
  showMessageButton?: boolean;
  showSimilarButton?: boolean;
  messageButtonText?: string;
  similarButtonText?: string;
  // Callbacks
  onFollow?: () => void;
  onMessage?: () => void;
  onSimilar?: () => void;
  onAvatarChange?: (url: string) => void;
  // Styling
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
}

export const SocialProfileCard = ({ 
  className,
  name = "Sarah Jenkins",
  username = "@sarah_des",
  bio = "Product Designer crafting digital experiences. Coffee enthusiast ☕. Building next-gen UI tools for developers.",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  location = "San Francisco, CA",
  website = "sarah.design",
  twitter = "@sarah_des",
  showLocation = true,
  showWebsite = true,
  showTwitter = true,
  followers = "12.5k",
  following = "842",
  projects = "142",
  isOnline = true,
  statusColor = "bg-green-500",
  bannerGradientFrom = "from-indigo-500",
  bannerGradientVia = "via-purple-500",
  bannerGradientTo = "to-pink-500",
  followButtonText = "Follow",
  showFollowButton = true,
  showMessageButton = true,
  showSimilarButton = true,
  messageButtonText = "Message",
  similarButtonText = "Similar",
  onFollow,
  onMessage,
  onSimilar,
  onAvatarChange,
  backgroundColor,
  borderColor,
  borderRadius = 24,
}: SocialProfileCardProps) => {
  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") {
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
      }
      return value.toString();
    }
    return value;
  };

  // Helper function to extract hex from Tailwind class and convert to RGB
  const getColorFromTailwind = (tailwindClass: string): string | undefined => {
    if (!tailwindClass) return undefined
    // Extract hex from bg-[#hex], from-[#hex], via-[#hex], to-[#hex] format
    const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
    if (hexMatch) {
      const r = parseInt(hexMatch[1].slice(0, 2), 16)
      const g = parseInt(hexMatch[1].slice(2, 4), 16)
      const b = parseInt(hexMatch[1].slice(4, 6), 16)
      return `rgb(${r} ${g} ${b})`
    }
    // Try color map
    const colorMap: Record<string, string> = {
      "bg-green-500": "rgb(34 197 94)",
      "bg-blue-500": "rgb(59 130 246)",
      "bg-purple-500": "rgb(168 85 247)",
      "bg-pink-500": "rgb(236 72 153)",
      "bg-yellow-500": "rgb(234 179 8)",
      "bg-red-500": "rgb(239 68 68)",
      "bg-orange-500": "rgb(249 115 22)",
      // Gradient colors
      "from-indigo-500": "rgb(99 102 241)",
      "from-purple-500": "rgb(168 85 247)",
      "from-pink-500": "rgb(236 72 153)",
      "from-blue-500": "rgb(59 130 246)",
      "from-green-500": "rgb(34 197 94)",
      "from-yellow-500": "rgb(234 179 8)",
      "from-red-500": "rgb(239 68 68)",
      "from-orange-500": "rgb(249 115 22)",
      "via-indigo-500": "rgb(99 102 241)",
      "via-purple-500": "rgb(168 85 247)",
      "via-pink-500": "rgb(236 72 153)",
      "via-blue-500": "rgb(59 130 246)",
      "via-green-500": "rgb(34 197 94)",
      "via-yellow-500": "rgb(234 179 8)",
      "via-red-500": "rgb(239 68 68)",
      "via-orange-500": "rgb(249 115 22)",
      "to-indigo-500": "rgb(99 102 241)",
      "to-purple-500": "rgb(168 85 247)",
      "to-pink-500": "rgb(236 72 153)",
      "to-blue-500": "rgb(59 130 246)",
      "to-green-500": "rgb(34 197 94)",
      "to-yellow-500": "rgb(234 179 8)",
      "to-red-500": "rgb(239 68 68)",
      "to-orange-500": "rgb(249 115 22)",
    }
    return colorMap[tailwindClass] || undefined
  }

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-3xl border shadow-xl",
        !backgroundColor && "bg-neutral-900/60",
        !borderColor && "border-neutral-800",
        className
      )}
      style={{
        ...(backgroundColor && { backgroundColor }),
        ...(borderColor && { borderColor }),
        ...(borderRadius && { borderRadius: `${borderRadius}px` }),
      }}
    >
      {/* Banner */}
      <div 
        className="h-32 w-full opacity-80 transition-opacity group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(to right, ${
            getColorFromTailwind(bannerGradientFrom || "from-indigo-500") || "rgb(99 102 241)"
          }, ${
            getColorFromTailwind(bannerGradientVia || "via-purple-500") || "rgb(168 85 247)"
          }, ${
            getColorFromTailwind(bannerGradientTo || "to-pink-500") || "rgb(236 72 153)"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-12 mb-4 inline-block">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onAvatarChange) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const result = reader.result as string;
                    onAvatarChange(result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className={cn(
                "block cursor-pointer",
                onAvatarChange && "hover:opacity-80 transition-opacity"
              )}
            >
              <div className="h-24 w-24 rounded-2xl border-4 border-neutral-900 bg-neutral-800 shadow-xl overflow-hidden">
                <img 
                  src={avatarUrl} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              </div>
            </label>
          </div>
          {isOnline && (
            <div 
              className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-neutral-900"
              style={{
                backgroundColor: getColorFromTailwind(statusColor || "bg-green-500"),
              }}
            />
          )}
        </div>

        {/* Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <p className="text-sm text-indigo-400">{username}</p>
            </div>
            {showFollowButton && (
              <ShinyButton 
                className="h-9 px-4 text-xs"
                onClick={onFollow}
              >
                {followButtonText}
              </ShinyButton>
            )}
          </div>
          
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">
            {bio}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
            {showLocation && location && (
              <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                <MapPin size={14} />
                {location}
              </div>
            )}
            {showWebsite && website && (
              <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                <LinkIcon size={14} />
                {website}
              </div>
            )}
            {showTwitter && twitter && (
              <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                <Twitter size={14} />
                {twitter}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex border-t border-neutral-800 pt-6">
          <div className="flex-1 text-center border-r border-neutral-800">
            <div className="text-lg font-bold text-white">{formatNumber(followers)}</div>
            <div className="text-xs font-medium text-neutral-500">Followers</div>
          </div>
          <div className="flex-1 text-center border-r border-neutral-800">
            <div className="text-lg font-bold text-white">{formatNumber(following)}</div>
            <div className="text-xs font-medium text-neutral-500">Following</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-lg font-bold text-white">{formatNumber(projects)}</div>
            <div className="text-xs font-medium text-neutral-500">Projects</div>
          </div>
        </div>

        {/* Action Row */}
        {(showMessageButton || showSimilarButton) && (
          <div className="mt-6 flex gap-3">
            {showMessageButton && (
              <button 
                onClick={onMessage}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <MessageCircle size={16} />
                {messageButtonText}
              </button>
            )}
            {showSimilarButton && (
              <button 
                onClick={onSimilar}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <Users size={16} />
                {similarButtonText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


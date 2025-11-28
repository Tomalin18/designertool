"use client"

import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Search, 
  Settings, 
  User, 
  Bell, 
  Grid, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  PieChart, 
  Folder, 
  FileText, 
  LogOut, 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  MoreHorizontal, 
  Zap, 
  Shield, 
  Database, 
  Cloud, 
  Code, 
  Terminal, 
  Layout, 
  Command, 
  Hash, 
  Music, 
  Disc, 
  Mic, 
  Radio, 
  Box, 
  Layers, 
  Flag,
  MapPin,
  Compass,
  Gift,
  CreditCard,
  Phone,
  Moon,
  Sun,
  Laptop,
  Heart,
  Star
} from "lucide-react";
import { sidebarSections } from "@/lib/sidebar-sections";

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

// Helper function to process color props
const processColor = (color: string | undefined, defaultColor: string): string => {
  if (!color || color.trim() === "") return defaultColor;
  return color.startsWith("rgb") ? color : (hexToRgb(color) || color);
};

// Helper function to adjust color brightness
const adjustColorBrightness = (color: string, factor: number): string => {
  if (color.startsWith("rgb")) {
    const match = color.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/);
    if (match) {
      const r = Math.min(255, Math.max(0, parseInt(match[1]) + (factor > 0 ? 20 : -20)));
      const g = Math.min(255, Math.max(0, parseInt(match[2]) + (factor > 0 ? 20 : -20)));
      const b = Math.min(255, Math.max(0, parseInt(match[3]) + (factor > 0 ? 20 : -20)));
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  // For hex colors, convert to rgb first
  const rgb = hexToRgb(color);
  if (rgb) {
    return adjustColorBrightness(rgb, factor);
  }
  return color;
};

// Helper function to get style object for sidebar container
const getSidebarStyle = (
  backgroundColor?: string,
  borderColor?: string,
  borderWidth?: number,
  borderRadius?: number,
  width?: number,
  padding?: number
): React.CSSProperties => {
  const style: React.CSSProperties = {};
  
  if (width !== undefined) {
    style.width = `${width}px`;
  }
  
  if (padding !== undefined) {
    style.padding = `${padding}px`;
  }
  
  if (backgroundColor && backgroundColor.trim() !== "") {
    style.backgroundColor = processColor(backgroundColor, "");
  }
  
  if (borderWidth && borderWidth > 0 && borderColor && borderColor.trim() !== "") {
    style.borderColor = processColor(borderColor, "");
    style.borderWidth = `${borderWidth}px`;
    style.borderStyle = "solid";
  }
  
  if (borderRadius && borderRadius > 0) {
    style.borderTopRightRadius = `${borderRadius}px`;
    style.borderBottomRightRadius = `${borderRadius}px`;
  }
  
  return style;
};

// Helper Container
const SidebarFrame = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative flex h-[500px] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-xl", className)}>
    {children}
    <div className="flex-1 bg-neutral-900/20 p-6">
      <div className="h-32 w-full rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-900/50" />
      <div className="mt-4 h-4 w-2/3 rounded-full bg-neutral-800" />
      <div className="mt-2 h-4 w-1/2 rounded-full bg-neutral-800" />
    </div>
  </div>
);

// Common sidebar props interface
export interface SidebarProps {
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  activeColor?: string;
  hoverColor?: string;
  width?: number;
  padding?: number;
  borderRadius?: number;
  borderWidth?: number;
}

// 1. Simple Sidebar
export interface SimpleSidebarProps extends SidebarProps {
  logoText?: string;
  menuItems?: string;
  settingsText?: string;
}

export const SimpleSidebar = ({
  className,
  logoText = "Acme",
  menuItems = "Dashboard\nTeam\nProjects\nCalendar\nDocuments",
  settingsText = "Settings",
  backgroundColor = "#000000",
  textColor = "#a3a3a3",
  activeColor = "#ffffff",
  borderColor = "#262626",
  width = 256,
  padding = 16,
  borderRadius = 0,
  borderWidth = 0,
}: SimpleSidebarProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#000000";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#a3a3a3";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#ffffff";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#262626";

  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  // Parse items with badge support (format: "Item:badge")
  const parseItemWithBadge = (item: string) => {
    const parts = item.split(":");
    return {
      label: parts[0]?.trim() || "",
      badge: parts[1]?.trim() || null,
    };
  };

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col border-r p-4", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: bgRgb,
          }),
          ...(borderColor && borderColor.trim() !== "" && borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="mb-8 flex items-center gap-2 px-2 font-bold text-xl" style={{ color: activeRgb }}>
          <div className="h-6 w-6 rounded" style={{ backgroundColor: activeRgb }} /> {logoText}
        </div>
        <nav className="space-y-1">
          {menuItemsList.map((item, index) => {
            const { label, badge } = parseItemWithBadge(item);
            return (
            <a 
                key={`${label}-${index}`} 
              href="#" 
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-neutral-900"
              style={{
                color: textRgb,
              }}
              onMouseEnter={(e) => {
                if (activeRgb) {
                  e.currentTarget.style.color = activeRgb;
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textRgb;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="h-4 w-4 rounded bg-neutral-800" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge className="ml-auto text-[10px] h-5 px-1.5" style={{ backgroundColor: activeRgb, color: bgRgb }}>
                    {badge}
                  </Badge>
                )}
            </a>
            );
          })}
        </nav>
        <div className="mt-auto border-t pt-4" style={{ borderColor: borderRgb }}>
          <a 
            href="#" 
            className="flex items-center gap-3 px-2 py-2 text-sm font-medium transition-colors"
            style={{ color: textRgb }}
            onMouseEnter={(e) => {
              if (activeRgb) {
                e.currentTarget.style.color = activeRgb;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textRgb;
            }}
          >
            <Settings size={16} /> {settingsText}
          </a>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 2. SaaS Dark Sidebar
export interface SaasDarkSidebarProps extends SidebarProps {
  logoText?: string;
  companyName?: string;
  planName?: string;
  overviewSectionTitle?: string;
  overviewItems?: string;
  managementSectionTitle?: string;
  managementItems?: string;
}

export const SaasDarkSidebar = ({
  className,
  logoText = "L",
  companyName = "Lumina Inc",
  planName = "Enterprise Plan",
  overviewSectionTitle = "Overview",
  overviewItems = "Dashboard\nAnalytics",
  managementSectionTitle = "Management",
  managementItems = "Customers\nProjects\nMessages:3",
  backgroundColor = "#0F1115",
  textColor = "#a3a3a3",
  activeColor = "#6366f1",
  hoverColor = "#ffffff",
  width = 256,
  padding = 16,
  borderRadius = 0,
  borderWidth = 0,
  borderColor,
}: SaasDarkSidebarProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#0F1115";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#a3a3a3";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#6366f1";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#ffffff";

  // Parse overview items
  const overviewItemsList = overviewItems ? overviewItems.split("\n").filter(item => item.trim() !== "") : [];
  const overviewIcons = [Grid, PieChart];
  
  // Parse management items (support "Item:badge" format)
  const managementItemsList = managementItems ? managementItems.split("\n").filter(item => item.trim() !== "") : [];
  const managementIcons = [User, Briefcase, MessageSquare];
  
  const parseItemWithBadge = (item: string) => {
    const parts = item.split(":");
    return {
      label: parts[0]?.trim() || "",
      badge: parts[1]?.trim() || null,
    };
  };

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col p-4", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: bgRgb,
          }),
          ...(borderWidth > 0 && borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor),
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
          color: textRgb,
        }}
      >
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg font-bold" style={{ backgroundColor: activeRgb, color: hoverRgb }}>
            {logoText}
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: hoverRgb }}>{companyName}</div>
            <div className="text-[10px]">{planName}</div>
          </div>
          <ChevronDown size={14} className="ml-auto" />
        </div>
        
        {overviewSectionTitle && (
          <>
            <div className="mb-2 text-xs font-bold uppercase tracking-wider px-2" style={{ color: textRgb, opacity: 0.6 }}>
              {overviewSectionTitle}
            </div>
            <nav className="space-y-0.5 mb-6">
              {overviewItemsList.map((item, index) => {
                const Icon = overviewIcons[index] || Grid;
                const isActive = index === 0;
                return (
                  <a 
                    key={index}
                    href="#" 
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    style={isActive ? { backgroundColor: `${activeRgb}1a`, color: activeRgb } : { color: textRgb }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.color = hoverRgb;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = textRgb;
                      }
                    }}
                  >
                    <Icon size={18} /> {item.trim()}
                  </a>
                );
              })}
            </nav>
          </>
        )}

        {managementSectionTitle && (
          <>
            <div className="mb-2 text-xs font-bold uppercase tracking-wider px-2" style={{ color: textRgb, opacity: 0.6 }}>
              {managementSectionTitle}
            </div>
            <nav className="space-y-0.5">
              {managementItemsList.map((item, index) => {
                const Icon = managementIcons[index] || User;
                const { label, badge } = parseItemWithBadge(item);
                return (
                  <a 
                    key={index}
                    href="#" 
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    style={{ color: textRgb }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color = hoverRgb;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = textRgb;
                    }}
                  >
                    <Icon size={18} /> {label}
                    {badge && (
                      <Badge className="ml-auto text-[10px] h-5 px-1.5" style={{ backgroundColor: activeRgb, color: hoverRgb }}>
                        {badge}
                      </Badge>
                    )}
                  </a>
                );
              })}
            </nav>
          </>
        )}
      </div>
    </SidebarFrame>
  );
};

// 3. Icon Only Sidebar
export interface IconSidebarProps extends SidebarProps {}

export const IconSidebar = ({
  className,
  backgroundColor = "#0a0a0a",
  activeColor = "#ffffff",
  hoverColor = "#ffffff",
  width = 64,
  padding = 24,
  borderRadius = 0,
  borderWidth = 0,
  borderColor = "#262626",
}: IconSidebarProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#0a0a0a";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#ffffff";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#ffffff";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#262626";

  return (
    <SidebarFrame className="flex-row">
      <div 
        className={cn("flex flex-col items-center border-r py-6", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: bgRgb,
          }),
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopLeftRadius: `${borderRadius}px`,
            borderBottomLeftRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl font-bold" style={{ backgroundColor: activeRgb, color: bgRgb }}>Q</div>
        <nav className="flex flex-1 flex-col gap-4">
          {[Home, Search, Calendar, Folder, Bell].map((Icon, i) => (
            <button 
              key={i} 
              className={cn("rounded-xl p-3 transition-colors", i === 0 ? "" : "")}
              style={{
                ...(i === 0 ? {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: activeRgb,
                } : {
                  color: "rgba(255, 255, 255, 0.5)",
                }),
              }}
              onMouseEnter={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = hoverRgb;
                }
              }}
              onMouseLeave={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                }
              }}
            >
              <Icon size={20} />
            </button>
          ))}
        </nav>
        <button 
          className="rounded-xl p-3 transition-colors"
          style={{ color: "rgba(255, 255, 255, 0.5)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.color = hoverRgb;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
          }}
        >
          <User size={20} />
        </button>
      </div>
    </SidebarFrame>
  );
};

// 4. Double Rail Sidebar (Discord-ish)
export interface DoubleRailSidebarProps extends SidebarProps {
  workspaceName?: string;
  channelSectionTitle?: string;
  channelItems?: string;
  voiceChannelSectionTitle?: string;
  voiceChannelItems?: string;
  userName?: string;
  userTag?: string;
}

export const DoubleRailSidebar = ({
  className,
  backgroundColor = "#1e1f22",
  textColor = "#a3a3a3",
  activeColor = "#23a559",
  hoverColor = "#ffffff",
  width = 72,
  padding = 12,
  borderRadius = 0,
  borderWidth = 0,
  borderColor = "#262626",
  workspaceName = "Design Team",
  channelSectionTitle = "General",
  channelItems = "announcements\ngeneral\noff-topic",
  voiceChannelSectionTitle = "Voice Channels",
  voiceChannelItems = "Lounge",
  userName = "User Name",
  userTag = "#1234",
}: DoubleRailSidebarProps) => {
  const channelItemsList = channelItems ? channelItems.split("\n").filter(item => item.trim() !== "") : [];
  const voiceChannelItemsList = voiceChannelItems ? voiceChannelItems.split("\n").filter(item => item.trim() !== "") : [];
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#1e1f22";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#a3a3a3";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#23a559";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#ffffff";

  return (
    <SidebarFrame className="flex-row">
      {/* Rail 1: Servers/Workspaces */}
      <div 
        className={cn("flex flex-col items-center gap-3 py-3 no-scrollbar overflow-y-auto", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: bgRgb,
          }),
          ...(borderWidth > 0 && borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor),
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopLeftRadius: `${borderRadius}px`,
            borderBottomLeftRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="h-12 w-12 rounded-[15px] hover:rounded-[15px] transition-all flex items-center justify-center" style={{ backgroundColor: "#5865F2", color: hoverRgb }}><Zap size={24} fill="currentColor" /></div>
        <div className="h-0.5 w-8 bg-neutral-700 rounded-full mx-auto" />
        {[1,2,3].map(i => (
          <div 
            key={i} 
            className="group relative h-12 w-12 rounded-[24px] transition-all cursor-pointer"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderRadius = "15px";
              e.currentTarget.style.backgroundColor = activeRgb;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderRadius = "24px";
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-2 w-2 rounded-r-full bg-white opacity-0 group-hover:opacity-100 group-hover:translate-x-[-12px] transition-all" />
          </div>
        ))}
        <div className="h-12 w-12 rounded-[24px] transition-all flex items-center justify-center border border-dashed" style={{ borderColor: activeRgb, color: activeRgb }} onMouseEnter={(e) => {
          e.currentTarget.style.borderRadius = "15px";
          e.currentTarget.style.backgroundColor = activeRgb;
          e.currentTarget.style.color = hoverRgb;
        }} onMouseLeave={(e) => {
          e.currentTarget.style.borderRadius = "24px";
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = activeRgb;
        }}><Plus size={24} /></div>
      </div>
      {/* Rail 2: Channels */}
      <div className="flex w-60 flex-col bg-[#2b2d31] p-0">
        <div className="flex h-12 items-center justify-between px-4 shadow-sm font-bold text-white hover:bg-neutral-700/50 cursor-pointer">
          {workspaceName} <ChevronDown size={16} />
        </div>
        <div className="p-2 space-y-0.5 overflow-y-auto flex-1">
          {channelSectionTitle && (
            <>
              <div className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase text-neutral-400 hover:text-neutral-300 cursor-pointer flex items-center gap-1">
                <ChevronDown size={10} /> {channelSectionTitle}
              </div>
              {channelItemsList.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded px-2 py-1 cursor-pointer flex items-center gap-2",
                    index === 1 ? "text-white bg-[#3f4147]" : "text-neutral-400 hover:bg-[#3f4147] hover:text-neutral-200"
                  )}
                >
                  <Hash size={18} className={index === 1 ? "text-neutral-400" : "text-neutral-500"} />
                  {item.trim()}
                </div>
              ))}
            </>
          )}
          
          {voiceChannelSectionTitle && (
            <>
              <div className="px-2 pt-4 pb-1 text-[10px] font-bold uppercase text-neutral-400 hover:text-neutral-300 cursor-pointer flex items-center gap-1">
                <ChevronDown size={10} /> {voiceChannelSectionTitle}
              </div>
              {voiceChannelItemsList.map((item, index) => (
                <div
                  key={index}
                  className="rounded px-2 py-1 text-neutral-400 hover:bg-[#3f4147] hover:text-neutral-200 cursor-pointer flex items-center gap-2"
                >
                  <Music size={18} className="text-neutral-500" />
                  {item.trim()}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="bg-[#232428] p-2 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-500 relative">
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#232428] flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{userName}</div>
            <div className="text-[10px] text-neutral-400 truncate">{userTag}</div>
          </div>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-neutral-700 rounded"><Mic size={14} className="text-neutral-300" /></button>
            <button className="p-1 hover:bg-neutral-700 rounded"><Phone size={14} className="text-neutral-300" /></button>
            <button className="p-1 hover:bg-neutral-700 rounded"><Settings size={14} className="text-neutral-300" /></button>
          </div>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 5. Glassmorphism Sidebar
export interface GlassSidebarProps extends SidebarProps {
  title?: string;
  menuItems?: string;
  storageLabel?: string;
  storageUsed?: string;
}

export const GlassSidebar = ({
  className,
  title = "Glass",
  menuItems = "Home\nExplore\nLibrary\nFavorites",
  storageLabel = "Storage",
  storageUsed = "70% used",
  backgroundColor = "",
  textColor = "#ffffff",
  activeColor = "#ffffff",
  hoverColor = "#ffffff",
  borderColor = "#ffffff",
  width = 256,
  padding = 24,
  borderRadius = 0,
  borderWidth = 0,
}: GlassSidebarProps) => {
  const textRgb = processColor(textColor, "#ffffff");
  const activeRgb = processColor(activeColor, "#ffffff");
  const hoverRgb = processColor(hoverColor, "#ffffff");
  const borderRgb = processColor(borderColor, "#ffffff");
  const bgStyle = backgroundColor && backgroundColor.trim() !== "" 
    ? { backgroundColor: processColor(backgroundColor, "") }
    : { backgroundColor: "rgba(0, 0, 0, 0.2)" };

  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  // Parse items with badge support (format: "Item:badge")
  const parseItemWithBadge = (item: string) => {
    const parts = item.split(":");
    return {
      label: parts[0]?.trim() || "",
      badge: parts[1]?.trim() || null,
    };
  };

  return (
    <SidebarFrame className="bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover">
      <div 
        className={cn("flex flex-col border-r backdrop-blur-xl", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          ...bgStyle,
          ...(borderWidth > 0 && {
            borderColor: `${borderRgb}1a`,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold drop-shadow-md" style={{ color: textRgb }}>{title}</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItemsList.map((item, i) => {
            const { label, badge } = parseItemWithBadge(item);
            return (
              <a 
                key={i} 
                href="#" 
                className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all", i === 0 ? "shadow-lg" : "")}
                style={{
                  ...(i === 0 ? {
                    backgroundColor: `${activeRgb}33`,
                    color: activeRgb,
                  } : {
                    color: `${textRgb}cc`,
                  }),
                }}
                onMouseEnter={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.backgroundColor = `${hoverRgb}1a`;
                    e.currentTarget.style.color = hoverRgb;
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = `${textRgb}cc`;
                  }
                }}
              >
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `${textRgb}80` }} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge className="text-[10px] h-5 px-1.5" style={{ backgroundColor: `${activeRgb}33`, color: activeRgb }}>
                    {badge}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>
        <div className="p-6">
          <div className="rounded-2xl p-4 border" style={{ backgroundColor: `${textRgb}1a`, borderColor: `${borderRgb}1a`, color: textRgb }}>
            <div className="text-xs font-bold uppercase opacity-70 mb-2">{storageLabel}</div>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: `${textRgb}33` }}>
              <div className="h-full w-[70%] rounded-full" style={{ backgroundColor: textRgb }} />
            </div>
            <div className="mt-2 text-xs opacity-70">{storageUsed}</div>
          </div>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 6. Brutalist Sidebar
export interface BrutalistSidebarProps extends SidebarProps {
  title?: string;
  menuItems?: string;
  buttonText?: string;
}

const ArrowRightIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>

export const BrutalistSidebar = ({
  className,
  title = "MENU",
  menuItems = "Shop\nAbout\nJournal\nContact",
  buttonText = "Subscribe",
  backgroundColor = "#facc15",
  textColor = "#000000",
  activeColor = "#ffffff",
  hoverColor = "#000000",
  borderColor = "#000000",
  width = 256,
  padding = 24,
  borderRadius = 0,
  borderWidth = 4,
}: BrutalistSidebarProps) => {
  const bgRgb = processColor(backgroundColor, "#facc15");
  const textRgb = processColor(textColor, "#000000");
  const activeRgb = processColor(activeColor, "#ffffff");
  const hoverRgb = processColor(hoverColor, "#000000");
  const borderRgb = processColor(borderColor, "#000000");

  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          backgroundColor: bgRgb,
          borderRight: `${borderWidth}px solid ${borderRgb}`,
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="border-b-4 p-6" style={{ borderColor: borderRgb }}>
          <h1 className="text-3xl font-black uppercase tracking-tighter" style={{ color: textRgb }}>{title}</h1>
        </div>
        <nav className="flex-1">
          {menuItemsList.map((item) => (
            <a 
              key={item} 
              href="#" 
              className="flex items-center justify-between border-b-4 bg-white px-6 py-4 text-lg font-bold uppercase transition-colors"
              style={{ 
                borderColor: borderRgb,
                color: textRgb,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverRgb;
                e.currentTarget.style.color = activeRgb;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = textRgb;
              }}
            >
              {item.trim()} <ArrowRightIcon size={20} />
            </a>
          ))}
        </nav>
        <div className="p-6">
          <button 
            className="w-full border-4 bg-white px-4 py-3 font-bold uppercase shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all"
            style={{ 
              borderColor: borderRgb,
              color: textRgb,
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 7. MacOS Finder Style
export interface MacOSSidebarProps extends SidebarProps {
  treeItems?: string;
}

const ClockIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

const ArrowDownCircle = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg>

export const MacOSSidebar = ({
  className,
  treeItems = "favorites:airdrop,recents,applications,desktop,documents,downloads\niCloud:iCloud Drive",
  backgroundColor = "#F6F5F2",
  textColor = "#1d1d1f",
  activeColor = "#007AFF",
  hoverColor = "#1d1d1f",
  borderColor = "#d2d2d7",
  width = 240,
}: MacOSSidebarProps) => {
  const parseTreeItems = (items: string) => {
    return items.split("\n").filter(item => item.trim() !== "").map(item => {
      const parts = item.split(":");
      if (parts.length > 1) {
        const children = parts[1].split(",").map(c => c.trim()).filter(c => c !== "");
        return { parent: parts[0].trim(), children };
      }
      return { parent: parts[0].trim(), children: [] };
    });
  };

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#F6F5F2";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#1d1d1f";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#007AFF";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#1d1d1f";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#d2d2d7";

  const treeItemsList = parseTreeItems(treeItems);
  
  // Track expanded state for each item
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])); // Default: first item expanded

  // Reset expanded state when treeItems changes (from customize panel)
  React.useEffect(() => {
    setExpandedItems(new Set([0])); // Reset to first item expanded when items change
  }, [treeItems]);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Icon mapping for common items (case-insensitive)
  const getIcon = (itemName: string) => {
    const normalizedName = itemName.toLowerCase();
    const iconMap: Record<string, any> = {
      "airdrop": Radio,
      "recents": ClockIcon,
      "applications": Box,
      "desktop": Laptop,
      "documents": FileText,
      "downloads": ArrowDownCircle,
      "icloud drive": Cloud,
    };
    return iconMap[normalizedName] || Box;
  };

  // Convert RGB to RGBA with opacity for backdrop blur effect
  // hexToRgb returns format like "rgb(246 245 242)" (space-separated)
  let bgRgba = bgRgb;
  if (bgRgb.startsWith("rgb(")) {
    // Convert "rgb(r g b)" to "rgba(r, g, b, 0.9)"
    const match = bgRgb.match(/rgb\((\d+)\s+(\d+)\s+(\d+)\)/);
    if (match) {
      bgRgba = `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0.9)`;
    }
  } else if (bgRgb.startsWith("#")) {
    // For hex colors, add alpha channel
    bgRgba = bgRgb + "e6";
  }

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col backdrop-blur-sm border-r text-sm", className)}
        style={{
          width: `${width}px`,
          backgroundColor: bgRgba,
          borderColor: borderRgb,
        }}
      >
        <div className="p-4 flex gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <div className="h-3 w-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]" />
          <div className="h-3 w-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
        </div>
        <div className="px-2">
          {treeItemsList.map((section, sectionIndex) => {
            const hasChildren = section.children.length > 0;
            const isExpanded = expandedItems.has(sectionIndex);
            
            return (
              <div key={sectionIndex} className={sectionIndex > 0 ? "mt-4" : ""}>
                <div 
                  onClick={() => hasChildren && toggleExpanded(sectionIndex)}
                  className={cn(
                    "px-2 py-1 text-xs font-bold flex items-center gap-1",
                    hasChildren ? "cursor-pointer" : ""
                  )}
                  style={{ color: textRgb, opacity: 0.6 }}
                  onMouseEnter={(e) => {
                    if (hasChildren) {
                      e.currentTarget.style.opacity = "1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (hasChildren) {
                      e.currentTarget.style.opacity = "0.6";
                    }
                  }}
                >
                  {hasChildren && (isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
                  <span>{section.parent}</span>
                </div>
                {isExpanded && hasChildren && (
                  <nav className="space-y-0.5">
                    {section.children.map((child, childIndex) => {
                      const ChildIcon = getIcon(child);
                      const isActive = sectionIndex === 0 && childIndex === 2; // Applications is active by default
                      return (
                        <a 
                          key={childIndex} 
                          href="#" 
                          className="flex items-center gap-2 rounded px-2 py-1 transition-colors"
                          style={{
                            backgroundColor: isActive ? activeRgb : "transparent",
                            color: isActive ? bgRgb : textRgb,
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = hoverRgb + "1a";
                              e.currentTarget.style.color = hoverRgb;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = textRgb;
                            }
                          }}
                        >
                          <ChildIcon size={16} style={{ color: isActive ? bgRgb : activeRgb }} />
                          {child}
                        </a>
                      );
                    })}
                  </nav>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SidebarFrame>
  );
};

// 8. VS Code Style
export interface CodeSidebarProps extends SidebarProps {
  panelTitle?: string;
  openEditorsItems?: string;
  fileTreeItems?: string;
}

// Helper function to parse file tree items
// Format: "Folder:File1,File2" or "Folder" for folders without files
// Example: ".next\nsrc:App.tsx,globals.css"
const parseFileTree = (fileTreeItems: string) => {
  const lines = fileTreeItems.split("\n").filter(line => line.trim() !== "");
  return lines.map(line => {
    const parts = line.split(":");
    if (parts.length === 1) {
      return { name: parts[0].trim(), files: [] };
    }
    return {
      name: parts[0].trim(),
      files: parts[1].split(",").map(f => f.trim()).filter(f => f !== ""),
    };
  });
};

// Helper function to parse open editors items
// Format: "Type FileName Path:badge" or "FileName:badge" or "Type FileName Path" or "FileName"
// Example: "TS Sidebar.tsx src/components:3" or "Sidebar.tsx:3"
const parseOpenEditorItem = (item: string) => {
  // First check for badge (format: "Item:badge")
  const badgeParts = item.trim().split(":");
  const hasBadge = badgeParts.length > 1;
  const itemWithoutBadge = badgeParts[0].trim();
  const badge = hasBadge ? badgeParts.slice(1).join(":").trim() : null;
  
  // Parse the item without badge
  const parts = itemWithoutBadge.split(" ");
  if (parts.length >= 3) {
    return {
      type: parts[0],
      fileName: parts[1],
      path: parts.slice(2).join(" "),
      badge: badge,
    };
  } else if (parts.length === 2) {
    return {
      type: "",
      fileName: parts[0],
      path: parts[1],
      badge: badge,
    };
  }
  return {
    type: "",
    fileName: parts[0] || "",
    path: "",
    badge: badge,
  };
};

// Helper function to get file type color
const getFileTypeColor = (type: string) => {
  const typeUpper = type.toUpperCase();
  if (typeUpper === "TS" || typeUpper === "TSX") return "#4D9375";
  if (typeUpper === "JS" || typeUpper === "JSX") return "#D4D4D4";
  if (typeUpper === "CSS") return "#D4D4D4";
  if (typeUpper === "HTML") return "#E8AE38";
  return "#D4D4D4";
};

export const CodeSidebar = ({
  className,
  panelTitle = "Explorer",
  openEditorsItems = "TS Sidebar.tsx src/components",
  fileTreeItems = ".next\nsrc:App.tsx,globals.css",
  backgroundColor = "#1E1E1E",
  textColor = "#CCCCCC",
  activeColor = "#E8AE38",
  borderColor = "#2B2B2B",
  width = 240,
}: CodeSidebarProps) => {
  const openEditorsList = openEditorsItems
    ? openEditorsItems.split("\n").filter(item => item.trim() !== "")
    : [];
  const fileTreeList = fileTreeItems ? parseFileTree(fileTreeItems) : [];
  
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#1E1E1E";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#CCCCCC";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#E8AE38";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#2B2B2B";
  
  const [expandedFolders, setExpandedFolders] = useState<Set<number>>(
    new Set([fileTreeList.length > 0 ? fileTreeList.length - 1 : 0])
  );
  const [isOpenEditorsExpanded, setIsOpenEditorsExpanded] = useState(true);
  const [isProjectRootExpanded, setIsProjectRootExpanded] = useState(true);

  useEffect(() => {
    // Reset expanded state when fileTreeItems changes
    setExpandedFolders(new Set([fileTreeList.length > 0 ? fileTreeList.length - 1 : 0]));
  }, [fileTreeItems]);

  const toggleFolder = (index: number) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Calculate panel background color (slightly lighter than activity bar)
  const panelBgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#252526";
  // Make panel slightly lighter - use fixed colors for VS Code style or adjust if custom
  const isDefaultBg = bgRgb === "#1E1E1E" || bgRgb === "rgb(30, 30, 30)";
  const panelBg = isDefaultBg ? "#252526" : adjustColorBrightness(bgRgb, 0.1);
  const sectionBg = isDefaultBg ? "#37373D" : adjustColorBrightness(bgRgb, 0.15);
  const hoverBg = isDefaultBg ? "#2A2D2E" : adjustColorBrightness(bgRgb, 0.05);
  const hoverSectionBg = isDefaultBg ? "#3E3E42" : adjustColorBrightness(sectionBg, 0.1);

  return (
    <SidebarFrame className="flex-row">
      {/* Activity Bar */}
      <div 
        className={cn("flex w-12 flex-col items-center justify-between border-r py-4", className)}
        style={{
          backgroundColor: bgRgb,
          borderColor: borderRgb,
          color: textRgb,
        }}
      >
        <div className="flex flex-col gap-4">
          <button className="text-white border-l-2 border-white pl-3 pr-3"><FileText size={24} strokeWidth={1.5} /></button>
          <button className="hover:text-white px-3"><Search size={24} strokeWidth={1.5} /></button>
          <button className="hover:text-white px-3"><Zap size={24} strokeWidth={1.5} /></button>
          <button className="hover:text-white px-3"><Layout size={24} strokeWidth={1.5} /></button>
        </div>
        <div className="flex flex-col gap-4">
          <button className="hover:text-white px-3"><User size={24} strokeWidth={1.5} /></button>
          <button className="hover:text-white px-3"><Settings size={24} strokeWidth={1.5} /></button>
        </div>
      </div>
      {/* Sidebar Panel */}
      <div 
        className="flex flex-col text-sm"
        style={{
          width: `${width}px`,
          backgroundColor: panelBg,
          color: textRgb,
        }}
      >
        <div className="flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase">
          <span>{panelTitle}</span>
          <MoreHorizontal size={16} />
        </div>
        {openEditorsList.length > 0 && (
          <>
            <div 
              className="px-4 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
              style={{
                backgroundColor: sectionBg,
                color: textRgb,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverSectionBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = sectionBg;
              }}
              onClick={() => setIsOpenEditorsExpanded(!isOpenEditorsExpanded)}
            >
              {isOpenEditorsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />} OPEN EDITORS
            </div>
            {isOpenEditorsExpanded && (
              <div className="py-1">
                {openEditorsList.map((item, index) => {
                  const parsed = parseOpenEditorItem(item);
                  const isActive = index === 0;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-4 py-1 cursor-pointer"
                      style={{
                        color: isActive ? activeRgb : textRgb,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {parsed.type && <span className="text-[10px]">{parsed.type}</span>}
                      <span className="flex-1">{parsed.fileName}</span>
                      {parsed.path && <span className="opacity-60 ml-2">{parsed.path}</span>}
                      {parsed.badge && (
                        <Badge className="ml-auto text-[10px] h-5 px-1.5" style={{ backgroundColor: sectionBg, color: textRgb }}>
                          {parsed.badge}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        {fileTreeList.length > 0 && (
          <>
            <div 
              className="px-4 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer"
              style={{
                backgroundColor: sectionBg,
                color: textRgb,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverSectionBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = sectionBg;
              }}
              onClick={() => setIsProjectRootExpanded(!isProjectRootExpanded)}
            >
              {isProjectRootExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />} PROJECT-ROOT
            </div>
            {isProjectRootExpanded && (
            <div className="py-1 space-y-0.5">
              {fileTreeList.map((item, index) => {
                const hasFiles = item.files.length > 0;
                const isExpanded = hasFiles && expandedFolders.has(index);
                return (
                  <div key={index}>
                    <div 
                      className="flex items-center gap-1 px-4 py-1 cursor-pointer"
                      style={{ color: textRgb }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => hasFiles && toggleFolder(index)}
                    >
                      {hasFiles ? (
                        isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />
                      ) : null}
                      <Folder size={14} style={{ color: activeRgb }} /> {item.name}
                    </div>
                    {hasFiles && isExpanded && (
                      <div className="space-y-0.5">
                        {item.files.map((file, fileIndex) => {
                          const fileParts = file.split(".");
                          const fileExt = fileParts.length > 1 ? fileParts[fileParts.length - 1].toUpperCase() : "";
                          const fileTypeColor = getFileTypeColor(fileExt);
                          const isActive = index === fileTreeList.length - 1 && fileIndex === 0;
                          return (
                            <div
                              key={fileIndex}
                              className="flex items-center gap-1 pl-8 py-1 cursor-pointer"
                              style={{
                                backgroundColor: isActive ? sectionBg : "transparent",
                                color: textRgb,
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.backgroundColor = hoverBg;
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                }
                              }}
                            >
                              {fileExt && <span className="text-[10px]" style={{ color: fileTypeColor }}>{fileExt}</span>}
                              <span>{file}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            )}
          </>
        )}
      </div>
    </SidebarFrame>
  );
};

// 9. Gradient Sidebar
export interface GradientSidebarProps extends SidebarProps {
  logoText?: string;
  primaryMenuItems?: string;
  secondaryMenuItems?: string;
  profileName?: string;
  profileRole?: string;
  profileImage?: string;
}

export const GradientSidebar = ({
  className,
  logoText = "Flash",
  primaryMenuItems = "Overview\nReports\nLive View",
  secondaryMenuItems = "Settings\nHelp\nLogout",
  profileName = "Sarah J.",
  profileRole = "Premium User",
  profileImage,
  backgroundColor = "#312e81",
  textColor = "#ffffff",
  activeColor = "#06b6d4",
  hoverColor = "#ffffff",
  borderColor = "#ffffff",
  width = 256,
  padding = 24,
  borderRadius = 0,
  borderWidth = 0,
}: GradientSidebarProps) => {
  const primaryItems = primaryMenuItems ? primaryMenuItems.split("\n").filter(item => item.trim() !== "") : [];
  const secondaryItems = secondaryMenuItems ? secondaryMenuItems.split("\n").filter(item => item.trim() !== "") : [];

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#312e81";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#ffffff";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#06b6d4";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#ffffff";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#ffffff";

  // Calculate gradient colors
  const gradientStart = bgRgb;
  const gradientMiddle = activeRgb;
  const gradientEnd = "#000000"; // Keep black as end for contrast

  // Parse items with badge support (format: "Item:badge")
  const parseItemWithBadge = (item: string) => {
    const parts = item.split(":");
    return {
      label: parts[0]?.trim() || "",
      badge: parts[1]?.trim() || null,
    };
  };

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          background: `linear-gradient(to bottom, ${gradientStart}, ${gradientMiddle}, ${gradientEnd})`,
          color: textRgb,
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 text-xl font-bold" style={{ color: textRgb }}>
            <Zap className="fill-current" style={{ color: activeRgb }} /> {logoText}
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {primaryItems.map((item, i) => {
            const { label, badge } = parseItemWithBadge(item);
            return (
              <a 
                key={i} 
                href="#" 
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                style={{
                  backgroundColor: i === 0 ? `${textRgb}1a` : "transparent",
                  color: textRgb,
                }}
                onMouseEnter={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.backgroundColor = `${hoverRgb}0d`;
                    e.currentTarget.style.color = hoverRgb;
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = textRgb;
                  }
                }}
              >
                <div 
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: i === 0 ? activeRgb : `${textRgb}33`,
                    ...(i === 0 && {
                      boxShadow: `0 0 10px ${activeRgb}`,
                    }),
                  }}
                />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge className="text-[10px] h-5 px-1.5" style={{ backgroundColor: `${textRgb}33`, color: textRgb }}>
                    {badge}
                  </Badge>
                )}
              </a>
            );
          })}
          <div className="my-4 h-px w-full" style={{ backgroundColor: `${textRgb}1a` }} />
          {secondaryItems.map((item, i) => {
            const { label, badge } = parseItemWithBadge(item);
            return (
              <a 
                key={i} 
                href="#" 
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                style={{ color: textRgb }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${hoverRgb}0d`;
                  e.currentTarget.style.color = hoverRgb;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = textRgb;
                }}
              >
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `${textRgb}33` }} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge className="text-[10px] h-5 px-1.5" style={{ backgroundColor: `${textRgb}33`, color: textRgb }}>
                    {badge}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>
        <div className="p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          <div className="flex items-center gap-3">
            {profileImage ? (
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={profileImage} alt={profileName} className="h-full w-full object-cover" />
              </div>
            ) : (
            <div 
              className="h-10 w-10 rounded-full"
              style={{ background: `linear-gradient(to bottom right, ${activeRgb}, ${adjustColorBrightness(activeRgb, 0.3)})` }}
            />
            )}
            <div>
              <div className="text-sm font-bold" style={{ color: textRgb }}>{profileName}</div>
              <div className="text-xs" style={{ color: textRgb, opacity: 0.8 }}>{profileRole}</div>
            </div>
          </div>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 10. Profile Centric Sidebar
export interface ProfileSidebarProps extends SidebarProps {
  profileName?: string;
  profileRole?: string;
  profileImage?: string;
  menuSectionTitle?: string;
  menuItems?: string;
  upgradeTitle?: string;
  upgradeDescription?: string;
  upgradeButtonText?: string;
}

export const ProfileSidebar = ({
  className,
  profileName = "Alex Morgan",
  profileRole = "Product Designer",
  profileImage,
  menuSectionTitle = "Menu",
  menuItems = "My Profile\nMy Work\nSaved Items\nBilling",
  upgradeTitle = "Upgrade to Pro",
  upgradeDescription = "Get access to exclusive tools.",
  upgradeButtonText = "Upgrade",
  backgroundColor = "#fafafa",
  textColor = "#525252",
  activeColor = "#000000",
  hoverColor = "#000000",
  borderColor = "#e5e5e5",
  width = 288,
  padding = 24,
  borderRadius = 0,
  borderWidth = 0,
}: ProfileSidebarProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#fafafa";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#525252";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#000000";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#000000";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#e5e5e5";

  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [User, Briefcase, Heart, CreditCard];
  const defaultImage = "https://i.pravatar.cc/100?img=32";

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col border-r", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          backgroundColor: bgRgb,
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="flex flex-col items-center pt-8 pb-6 border-b" style={{ borderColor: borderRgb }}>
          <div className="h-20 w-20 rounded-full border-4 border-white shadow-lg mb-4 overflow-hidden">
            <img src={profileImage || defaultImage} className="h-full w-full object-cover" alt="User" />
          </div>
          <h3 className="font-bold text-lg" style={{ color: activeRgb }}>{profileName}</h3>
          <p className="text-sm" style={{ color: textRgb }}>{profileRole}</p>
          <div className="mt-4 flex gap-4" style={{ color: textRgb }}>
            <a href="#" onMouseEnter={(e) => e.currentTarget.style.color = hoverRgb} onMouseLeave={(e) => e.currentTarget.style.color = textRgb}><MessageSquare size={18} /></a>
            <a href="#" onMouseEnter={(e) => e.currentTarget.style.color = hoverRgb} onMouseLeave={(e) => e.currentTarget.style.color = textRgb}><Bell size={18} /></a>
            <a href="#" onMouseEnter={(e) => e.currentTarget.style.color = hoverRgb} onMouseLeave={(e) => e.currentTarget.style.color = textRgb}><Settings size={18} /></a>
          </div>
        </div>
        <div className="flex-1 p-6">
          {menuSectionTitle && (
            <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: textRgb, opacity: 0.6 }}>{menuSectionTitle}</div>
          )}
          <nav className="space-y-4 font-medium" style={{ color: textRgb }}>
            {menuItemsList.map((item, index) => {
              const Icon = menuIcons[index] || User;
              return (
                <a 
                  key={index} 
                  href="#" 
                  className="flex items-center gap-3 transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = activeRgb;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = textRgb;
                  }}
                >
                  <Icon size={20} /> {item.trim()}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: activeRgb, color: bgRgb }}>
            <p className="text-sm font-bold mb-2">{upgradeTitle}</p>
            <p className="text-xs mb-3" style={{ opacity: 0.8 }}>{upgradeDescription}</p>
            <button 
              className="w-full text-xs font-bold py-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: bgRgb,
                color: activeRgb,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = adjustColorBrightness(bgRgb, -0.05);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = bgRgb;
              }}
            >
              {upgradeButtonText}
            </button>
          </div>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 11. Collapsible Sidebar (Collapsed State)
export interface CollapsibleSidebarProps extends SidebarProps {
  logoText?: string;
  brandName?: string;
  menuItems?: string;
}

export const CollapsibleSidebar = ({
  className,
  logoText = "B",
  brandName = "Bolt UI",
  menuItems = "Menu Item 1\nMenu Item 2\nMenu Item 3\nMenu Item 4\nMenu Item 5",
  backgroundColor = "#0a0a0a",
  textColor = "#a3a3a3",
  activeColor = "#3b82f6",
  hoverColor = "#ffffff",
  borderColor = "#262626",
  width = 256,
  padding = 16,
  borderRadius = 0,
  borderWidth = 0,
}: CollapsibleSidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [Home, Search, Layers, Box, Settings];

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#0a0a0a";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#a3a3a3";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#3b82f6";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#ffffff";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#262626";

  const hoverBg = adjustColorBrightness(bgRgb, -0.05);

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col border-r transition-all duration-300", collapsed ? "w-20 items-center" : "w-64", className)}
        style={{
          backgroundColor: bgRgb,
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopLeftRadius: `${borderRadius}px`,
            borderBottomLeftRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div 
          className={cn("flex h-16 items-center px-4 border-b", collapsed ? "justify-center" : "justify-between")}
          style={{ borderColor: borderRgb }}
        >
          <div 
            className="h-8 w-8 rounded-lg flex items-center justify-center font-bold"
            style={{ backgroundColor: activeRgb, color: bgRgb }}
          >
            {logoText}
          </div>
          {!collapsed && <span className="font-bold" style={{ color: hoverRgb }}>{brandName}</span>}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className={cn("rounded p-1 transition-colors", collapsed && "hidden")}
            style={{ color: textRgb }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverBg;
              e.currentTarget.style.color = hoverRgb;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = textRgb;
            }}
          >
            <ChevronRight size={16} className="rotate-180" />
          </button>
        </div>
        <div className={cn("flex-1 py-4 space-y-2", collapsed ? "px-2" : "px-4")}>
          {menuItemsList.map((item, i) => {
            const Icon = menuIcons[i] || Home;
            return (
              <button 
                key={i} 
                className={cn("flex items-center rounded-lg py-3 transition-colors", collapsed ? "justify-center w-full" : "gap-3 px-3 w-full")}
                style={{ color: textRgb }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBg;
                  e.currentTarget.style.color = hoverRgb;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = textRgb;
                }}
              >
                <Icon size={20} />
                {!collapsed && <span className="text-sm font-medium">{item.trim()}</span>}
              </button>
            );
          })}
        </div>
        <div className={cn("border-t p-4", collapsed && "flex justify-center")} style={{ borderColor: borderRgb }}>
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="rounded-full p-2 transition-colors"
            style={{ 
              backgroundColor: hoverBg,
              color: textRgb,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = hoverRgb;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textRgb;
            }}
          >
            <ChevronRight size={16} className={cn("transition-transform", !collapsed && "rotate-180")} />
          </button>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 12. Tree/Folder Structure
export interface TreeSidebarProps extends SidebarProps {
  title?: string;
  treeItems?: string;
}

export const TreeSidebar = ({
  className,
  title = "Documentation",
  treeItems = "Getting Started:Installation,Project Structure,Changelog\nComponents\nAPI Reference\nIntegration",
  backgroundColor = "#ffffff",
  textColor = "#525252",
  activeColor = "#2563eb",
  hoverColor = "#f3f4f6",
  borderColor = "#e5e7eb",
  width = 256,
  padding = 16,
}: TreeSidebarProps) => {
  const parseTreeItems = (items: string) => {
    return items.split("\n").filter(item => item.trim() !== "").map(item => {
      const parts = item.split(":");
      if (parts.length > 1) {
        const children = parts[1].split(",").map(c => c.trim()).filter(c => c !== "");
        return { parent: parts[0].trim(), children };
      }
      return { parent: parts[0].trim(), children: [] };
    });
  };

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#ffffff";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#525252";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#2563eb";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#f3f4f6";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#e5e7eb";

  const treeItemsList = parseTreeItems(treeItems);
  
  // Track expanded state for each item
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])); // Default: first item expanded

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
  <SidebarFrame>
    <div 
      className={cn("flex flex-col border-r p-4 text-sm", className)}
      style={{
        width: `${width}px`,
        padding: `${padding}px`,
        backgroundColor: bgRgb,
        borderColor: borderRgb,
        color: textRgb,
      }}
    >
        <div className="mb-4 font-bold px-2" style={{ color: activeRgb }}>{title}</div>
      <div className="space-y-1">
          {treeItemsList.map((item, index) => {
            const hasChildren = item.children.length > 0;
            const isExpanded = expandedItems.has(index);
            return (
              <div key={index}>
                <div 
                  onClick={() => hasChildren && toggleExpanded(index)}
                  className={cn(
                    "flex items-center gap-1 font-medium px-2 py-1 rounded transition-colors",
                    hasChildren ? "cursor-pointer" : ""
                  )}
                  style={{ color: isExpanded ? activeRgb : textRgb }}
                  onMouseEnter={(e) => {
                    if (hasChildren) {
                      e.currentTarget.style.backgroundColor = hoverRgb;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (hasChildren) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {hasChildren ? (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <span className="w-[14px]" />}
                  {item.parent}
                </div>
                {isExpanded && hasChildren && (
        <div className="pl-6 space-y-1 border-l ml-4" style={{ borderColor: borderRgb }}>
                    {item.children.map((child, childIndex) => (
                      <a
                        key={childIndex}
                        href="#"
                        className="block py-1 transition-colors"
                        style={{
                          color: childIndex === 0 ? activeRgb : textRgb,
                          fontWeight: childIndex === 0 ? "500" : "400",
                        }}
                        onMouseEnter={(e) => {
                          if (childIndex !== 0) {
                            e.currentTarget.style.color = activeRgb;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (childIndex !== 0) {
                            e.currentTarget.style.color = textRgb;
                          }
                        }}
                      >
                        {child}
                      </a>
                    ))}
        </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  </SidebarFrame>
);
};

// 13. Notion Style
export interface NotionStyleSidebarProps extends SidebarProps {
  workspaceName?: string;
  quickActions?: string;
  favoritesTitle?: string;
  favoritesItems?: string;
  privateTitle?: string;
  privateItems?: string;
  addPageText?: string;
}

const Clock = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

export const NotionStyleSidebar = ({
  className,
  workspaceName = "Workspace",
  quickActions = "Search\nUpdates\nSettings",
  favoritesTitle = "Favorites",
  favoritesItems = "Product Roadmap\nMeeting Notes\nDesign System",
  privateTitle = "Private",
  privateItems = "Personal Goals\nReading List",
  addPageText = "Add a page",
}: NotionStyleSidebarProps) => {
  const quickActionsList = quickActions ? quickActions.split("\n").filter(item => item.trim() !== "") : [];
  const favoritesItemsList = favoritesItems ? favoritesItems.split("\n").filter(item => item.trim() !== "") : [];
  const privateItemsList = privateItems ? privateItems.split("\n").filter(item => item.trim() !== "") : [];
  const quickActionIcons = [Search, Clock, Settings];

  const [isWorkspaceExpanded, setIsWorkspaceExpanded] = useState(true);
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true);
  const [isPrivateExpanded, setIsPrivateExpanded] = useState(true);

  useEffect(() => {
    // Reset expanded state when props change
    setIsWorkspaceExpanded(true);
    setIsFavoritesExpanded(true);
    setIsPrivateExpanded(true);
  }, [quickActions, favoritesItems, privateItems]);

  // Parse items with badge support (format: "Item:badge")
  const parseItemWithBadge = (item: string) => {
    const parts = item.split(":");
    return {
      label: parts[0]?.trim() || "",
      badge: parts[1]?.trim() || null,
    };
  };

  return (
  <SidebarFrame>
    <div className={cn("flex w-60 flex-col bg-[#F7F7F5] text-[#37352F] text-sm font-medium", className)}>
      <div 
        className="flex items-center gap-2 p-3 hover:bg-[#EFEFED] cursor-pointer m-1 rounded transition-colors"
        onClick={() => setIsWorkspaceExpanded(!isWorkspaceExpanded)}
      >
          <div className="h-5 w-5 rounded bg-orange-400 flex items-center justify-center text-xs text-white">
            {workspaceName.charAt(0).toUpperCase()}
          </div>
          <span className="flex-1 truncate font-bold">{workspaceName}</span>
        <div className="flex gap-1 text-[#37352F]/40">
          {isWorkspaceExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </div>
      {isWorkspaceExpanded && (
        <div className="px-2 space-y-0.5">
          {quickActionsList.map((action, index) => {
            const Icon = quickActionIcons[index] || Search;
            const { label, badge } = parseItemWithBadge(action);
            return (
              <div key={index} className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer text-neutral-600">
                <Icon size={16} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge className="text-[10px] h-5 px-1.5 bg-[#37352F]/10 text-[#37352F]/60">
                    {badge}
                  </Badge>
                )}
        </div>
            );
          })}
        </div>
      )}
        {favoritesTitle && (
          <>
            <div 
              className="mt-4 px-3 mb-1 text-xs font-bold text-neutral-500 flex items-center gap-1 cursor-pointer hover:text-neutral-700"
              onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
            >
              {isFavoritesExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              {favoritesTitle}
            </div>
            {isFavoritesExpanded && (
              <div className="px-2 space-y-0.5">
                {favoritesItemsList.map((item, i) => {
                  const { label, badge } = parseItemWithBadge(item);
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer">
                      <span className="text-lg leading-none">📄</span>
                      <span className="flex-1">{label}</span>
                      {badge && (
                        <Badge className="text-[10px] h-5 px-1.5 bg-[#37352F]/10 text-[#37352F]/60">
                          {badge}
                        </Badge>
                      )}
          </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        {privateTitle && (
          <>
            <div 
              className="mt-4 px-3 mb-1 text-xs font-bold text-neutral-500 flex items-center gap-1 cursor-pointer hover:text-neutral-700"
              onClick={() => setIsPrivateExpanded(!isPrivateExpanded)}
            >
              {isPrivateExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              {privateTitle}
            </div>
            {isPrivateExpanded && (
              <div className="px-2 space-y-0.5">
                {privateItemsList.map((item, i) => {
                  const { label, badge } = parseItemWithBadge(item);
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer">
                      <span className="text-lg leading-none">📄</span>
                      <span className="flex-1">{label}</span>
                      {badge && (
                        <Badge className="text-[10px] h-5 px-1.5 bg-[#37352F]/10 text-[#37352F]/60">
                          {badge}
                        </Badge>
                      )}
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer text-neutral-500">
                  <Plus size={16} /> {addPageText}
                </div>
              </div>
            )}
          </>
        )}
    </div>
  </SidebarFrame>
);
};

// 14. Spotify Style
export interface SpotifyStyleSidebarProps extends SidebarProps {
  mainMenuItems?: string;
  libraryTitle?: string;
  libraryFilterButtons?: string;
  libraryItems?: string;
}

export const SpotifyStyleSidebar = ({
  className,
  mainMenuItems = "Home\nSearch",
  libraryTitle = "Your Library",
  libraryFilterButtons = "Playlists\nArtists",
  libraryItems = "Liked Songs:Playlist • 432 songs:❤️\nDiscover Weekly:Playlist • Spotify:🎵\nSynthwave Mix:Playlist • Alex:🎹\nCoding Focus:Playlist • Spotify:💻\nOn Repeat:Playlist • Spotify:🔁",
}: SpotifyStyleSidebarProps) => {
  const mainMenuItemsList = mainMenuItems ? mainMenuItems.split("\n").filter(item => item.trim() !== "") : [];
  const libraryFilterButtonsList = libraryFilterButtons ? libraryFilterButtons.split("\n").filter(item => item.trim() !== "") : [];
  const libraryItemsList = libraryItems ? libraryItems.split("\n").filter(item => item.trim() !== "") : [];
  const mainMenuIcons = [Home, Search];

  const parseLibraryItem = (item: string) => {
    const parts = item.split(":");
    return {
      title: parts[0]?.trim() || "",
      subtitle: parts[1]?.trim() || "",
      icon: parts[2]?.trim() || "🎵",
    };
  };

  return (
  <SidebarFrame>
    <div className={cn("flex w-64 flex-col bg-black text-[#b3b3b3] p-2 gap-2 font-medium", className)}>
      <div className="bg-[#121212] rounded-lg p-4 space-y-4">
          {mainMenuItemsList.map((item, index) => {
            const Icon = mainMenuIcons[index] || Home;
            return (
              <a key={index} href="#" className={cn(
                "flex items-center gap-4 transition-colors",
                index === 0 ? "text-white" : "hover:text-white"
              )}>
                <Icon size={24} className={index === 0 ? "fill-current" : ""} /> {item.trim()}
              </a>
            );
          })}
      </div>
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="p-4 shadow-lg z-10 flex justify-between items-center text-neutral-400">
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <Layers size={24} className="-rotate-90" /> {libraryTitle}
            </button>
          <div className="flex gap-4">
            <Plus size={20} className="hover:text-white cursor-pointer"/>
            <ArrowRightIcon size={20} className="hover:text-white cursor-pointer"/>
          </div>
        </div>
        <div className="px-2 pb-2 space-y-2 overflow-y-auto">
            {libraryFilterButtonsList.length > 0 && (
          <div className="flex gap-2">
                {libraryFilterButtonsList.map((button, index) => (
                  <button key={index} className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm text-white hover:bg-[#3a3a3a]">
                    {button.trim()}
                  </button>
                ))}
          </div>
            )}
            {libraryItemsList.map((item, i) => {
              const parsed = parseLibraryItem(item);
              const isActive = i === 0;
              return (
                <div key={i} className={cn("flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer", isActive && "bg-[#1a1a1a]")}>
                  <div className={cn("h-12 w-12 rounded flex items-center justify-center text-xl", isActive ? "bg-gradient-to-br from-indigo-700 to-blue-300" : "bg-[#282828]")}>
                    {parsed.icon}
                  </div>
              <div>
                    <div className={cn("text-white truncate", isActive && "text-green-500")}>{parsed.title}</div>
                    {parsed.subtitle && <div className="text-sm truncate">{parsed.subtitle}</div>}
              </div>
            </div>
              );
            })}
        </div>
      </div>
    </div>
  </SidebarFrame>
);
};

// 15. Linear Style (Clean Workspace)
export interface LinearStyleSidebarProps extends SidebarProps {
  logoText?: string;
  workspaceName?: string;
  mainMenuItems?: string;
  teamsTitle?: string;
  teamItems?: string;
}

export const LinearStyleSidebar = ({
  className,
  logoText = "L",
  workspaceName = "Linear",
  mainMenuItems = "Inbox\nMy Issues\nViews",
  teamsTitle = "Your Teams",
  teamItems = "Engineering:E\nDesign:D\nMarketing:M",
}: LinearStyleSidebarProps) => {
  const mainMenuItemsList = mainMenuItems ? mainMenuItems.split("\n").filter(item => item.trim() !== "") : [];
  const teamItemsList = teamItems ? teamItems.split("\n").filter(item => item.trim() !== "") : [];

  const parseTeamItem = (item: string) => {
    const parts = item.split(":");
    return {
      name: parts[0]?.trim() || "",
      initial: parts[1]?.trim() || parts[0]?.charAt(0).toUpperCase() || "",
    };
  };

  return (
  <SidebarFrame>
    <div className={cn("flex w-60 flex-col border-r border-white/5 bg-[#1C1C1F] text-[#D0D6E0] p-3 text-[13px]", className)}>
      <div className="flex items-center gap-2 px-2 py-1 mb-4 hover:bg-white/5 rounded cursor-pointer">
          <div className="h-4 w-4 rounded bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
            {logoText}
          </div>
          <span className="font-medium text-white">{workspaceName}</span>
        <ChevronDown size={12} className="ml-auto opacity-50" />
      </div>
      
      <div className="space-y-0.5 mb-6">
          {mainMenuItemsList.map((item, index) => {
            // Parse items with badge support (format: "Item:badge")
            const parts = item.split(":");
            const label = parts[0]?.trim() || "";
            const badge = parts[1]?.trim() || null;
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded cursor-pointer",
                  index === 0 ? "bg-[#2D2E33] text-white font-medium" : "hover:bg-white/5"
                )}
              >
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  index === 0 ? "bg-blue-400" : "border border-neutral-500"
                )} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge className="text-[10px] h-5 px-1.5 bg-white/10 text-white/60">
                    {badge}
                  </Badge>
                )}
              </div>
            );
          })}
      </div>

        {teamsTitle && (
          <>
      <div className="px-2 mb-1 font-medium text-neutral-500 flex justify-between group">
              {teamsTitle} <Plus size={12} className="opacity-0 group-hover:opacity-100 hover:text-white cursor-pointer" />
      </div>
      <div className="space-y-0.5">
              {teamItemsList.map((item, index) => {
                const { name, initial } = parseTeamItem(item);
                const colors = [
                  { bg: "bg-purple-500/20", text: "text-purple-400" },
                  { bg: "bg-orange-500/20", text: "text-orange-400" },
                  { bg: "bg-blue-500/20", text: "text-blue-400" },
                ];
                const color = colors[index % colors.length];
                return (
                  <div key={index} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer">
                    <div className={cn("h-3 w-3 rounded flex items-center justify-center text-[8px]", color.bg, color.text)}>
                      {initial}
      </div>
                    {name}
                  </div>
                );
              })}
            </div>
          </>
        )}
    </div>
  </SidebarFrame>
);
};

// 16. Gaming / Cyberpunk Sidebar
export interface GamingSidebarProps extends SidebarProps {
  title?: string;
  menuItems?: string;
}

export const GamingSidebar = ({
  className,
  title = "CYBERNAV",
  menuItems = "Armory\nMap\nMissions\nSocial\nMarket",
}: GamingSidebarProps) => {
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const titleParts = title.split("NAV");
  const titleFirst = titleParts[0] || "CYBER";
  const titleSecond = titleParts[1] ? "NAV" + titleParts[1] : "NAV";

  return (
    <SidebarFrame>
      <div className={cn("flex w-64 flex-col border-r-2 border-red-600 bg-black text-white", className)}>
        <div className="p-6 border-b border-red-900">
          <h1 className="text-2xl font-black italic tracking-widest text-red-600" style={{ textShadow: "0 0 10px red" }}>{titleFirst}<span className="text-white">{titleSecond}</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItemsList.map((item, i) => {
            // Parse items with badge support (format: "Item:badge")
            const parts = item.split(":");
            const label = parts[0]?.trim() || "";
            const badge = parts[1]?.trim() || null;
            return (
              <a key={i} href="#" className={cn(
                "flex items-center justify-between border-l-4 px-4 py-3 font-bold uppercase tracking-wider transition-all hover:bg-red-900/20 hover:pl-6",
                i === 0 ? "border-red-600 bg-red-900/10 text-red-500" : "border-neutral-800 text-neutral-500 hover:border-red-600 hover:text-white"
              )}>
                <span>{label}</span>
                {badge && (
                  <Badge className="text-[10px] h-5 px-1.5 bg-red-600/30 text-red-400 border border-red-600/50">
                    {badge}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>
        <div className="p-4">
        <div className="border border-red-600/30 bg-red-900/10 p-4">
          <div className="text-xs text-red-500 font-bold mb-1">SERVER STATUS</div>
          <div className="flex items-center gap-2 text-green-500 font-mono text-sm">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" /> ONLINE
          </div>
        </div>
      </div>
    </div>
  </SidebarFrame>
);
};

// 17. Finance / Secure Sidebar
export interface FinanceSidebarProps extends SidebarProps {
  brandName?: string;
  balanceLabel?: string;
  balanceAmount?: string;
  menuItems?: string;
}

export const FinanceSidebar = ({
  className,
  brandName = "TrustBank",
  balanceLabel = "Available Balance",
  balanceAmount = "$24,592.00",
  menuItems = "Accounts\nTransfers\nReports\nStatements",
  backgroundColor = "#0b2135",
  textColor = "#bfdbfe",
  activeColor = "#10b981",
  hoverColor = "#ffffff",
  borderColor = "#1e3a5f",
  width = 256,
  padding = 24,
  borderRadius = 0,
  borderWidth = 0,
}: FinanceSidebarProps) => {
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [CreditCard, ArrowRightIcon, PieChart, FileText];

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#0b2135";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#bfdbfe";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#10b981";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#ffffff";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#1e3a5f";

  const activeBg = activeRgb.startsWith("rgb") 
    ? activeRgb.replace("rgb", "rgba").replace(")", ", 0.2)")
    : `${activeRgb}33`;
  const hoverBg = adjustColorBrightness(bgRgb, 0.1);

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          backgroundColor: bgRgb,
          color: textRgb,
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="p-6 flex items-center gap-3">
          <div 
            className="h-8 w-8 rounded flex items-center justify-center"
            style={{ backgroundColor: activeRgb }}
          >
            <Shield size={18} fill="white" />
          </div>
          <span className="font-bold text-lg tracking-tight">{brandName}</span>
        </div>
        <div className="px-6 mb-6">
          <div className="text-xs mb-1" style={{ color: textRgb, opacity: 0.8 }}>{balanceLabel}</div>
          <div className="text-2xl font-mono">{balanceAmount}</div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {menuItemsList.map((item, index) => {
            const Icon = menuIcons[index] || CreditCard;
            const isActive = index === 0;
            return (
              <a 
                key={index} 
                href="#" 
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? activeBg : "transparent",
                  color: isActive ? activeRgb : textRgb,
                  ...(isActive && {
                    border: `1px solid ${borderRgb}`,
                  }),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = hoverBg;
                    e.currentTarget.style.color = hoverRgb;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = textRgb;
                  }
                }}
              >
                <Icon size={18} className={index === 1 ? "rotate-[-45deg]" : ""} /> {item.trim()}
              </a>
            );
          })}
        </nav>
      </div>
    </SidebarFrame>
  );
};

// 18. Curved Sidebar
export interface CurveSidebarProps extends SidebarProps {}

export const CurveSidebar = ({
  className,
  backgroundColor = "#ffffff",
  textColor = "#737373",
  activeColor = "#4f46e5",
  hoverColor = "#525252",
  borderColor = "#e5e5e5",
  width = 96,
  padding = 24,
  borderRadius = 40,
  borderWidth = 0,
}: CurveSidebarProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#ffffff";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#737373";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#4f46e5";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#525252";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#e5e5e5";

  const hoverBg = adjustColorBrightness(bgRgb, -0.05);

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col items-center py-6 shadow-[4px_0_24px_rgba(0,0,0,0.05)] z-10", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          backgroundColor: bgRgb,
          borderTopRightRadius: `${borderRadius}px`,
          borderBottomRightRadius: `${borderRadius}px`,
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
        }}
      >
        <div 
          className="mb-8 p-3 rounded-xl"
          style={{ backgroundColor: activeRgb, color: bgRgb }}
        >
          <Command size={24} />
        </div>
        <nav className="flex flex-col gap-6 w-full items-center">
          {[Home, Compass, Heart, MessageSquare, User].map((Icon, i) => (
            <button 
              key={i} 
              className="relative p-3 rounded-xl transition-all duration-300"
              style={{
                color: i === 0 ? activeRgb : textRgb,
              }}
              onMouseEnter={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.color = hoverRgb;
                  e.currentTarget.style.backgroundColor = hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (i !== 0) {
                  e.currentTarget.style.color = textRgb;
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <Icon size={24} className={i===0?"fill-current":""} />
              {i === 0 && (
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[26px] h-8 w-1 rounded-l-full"
                  style={{ backgroundColor: activeRgb }}
                />
              )}
            </button>
          ))}
        </nav>
        <div 
          className="mt-auto p-3 rounded-xl cursor-pointer transition-colors"
          style={{ 
            backgroundColor: hoverBg,
            color: textRgb,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = adjustColorBrightness(hoverBg, -0.05);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = hoverBg;
          }}
        >
          <LogOut size={20} />
        </div>
      </div>
    </SidebarFrame>
  );
};

// 19. Task / Checklist Sidebar
export interface TaskSidebarProps extends SidebarProps {
  newTaskButtonText?: string;
  menuItems?: string;
  newListText?: string;
}

export const TaskSidebar = ({
  className,
  newTaskButtonText = "New Task",
  menuItems = "My Day:4\nImportant\nPlanned:2\nAssigned to me",
  newListText = "New List",
  backgroundColor = "#ffffff",
  textColor = "#525252",
  activeColor = "#4f46e5",
  hoverColor = "#f5f5f5",
  borderColor = "#e5e5e5",
  width = 256,
  padding = 24,
  borderRadius = 0,
  borderWidth = 0,
}: TaskSidebarProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#ffffff";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#525252";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#4f46e5";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#f5f5f5";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#e5e5e5";

  const parseItemWithBadge = (itemString: string) => {
    const parts = itemString.split(':');
    return { label: parts[0]?.trim() || "", badge: parts[1]?.trim() || undefined };
  };

  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [Sun, Star, Calendar, Flag];

  // Calculate active background (lighter version of active color)
  const activeBgRgb = activeRgb.startsWith("rgb") 
    ? activeRgb.replace("rgb", "rgba").replace(")", ", 0.1)")
    : `${activeRgb}1a`;

  return (
    <SidebarFrame>
      <div 
        className={cn("flex flex-col border-r", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          backgroundColor: bgRgb,
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
          ...(borderRadius > 0 && {
            borderTopRightRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
          }),
        }}
      >
        <div className="p-6">
          <button 
            className="flex w-full items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg hover:scale-[1.02] transition-all"
            style={{
              backgroundColor: activeRgb,
              boxShadow: `0 10px 15px -3px ${activeRgb}33`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = adjustColorBrightness(activeRgb, -0.1);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = activeRgb;
            }}
          >
            <Plus size={18} /> {newTaskButtonText}
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItemsList.map((item, index) => {
            const Icon = menuIcons[index] || Sun;
            const { label, badge } = parseItemWithBadge(item);
            const isActive = index === 0;
            return (
              <a 
                key={index} 
                href="#" 
                className="flex items-center justify-between rounded-lg px-4 py-2.5 font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? activeBgRgb : "transparent",
                  color: isActive ? activeRgb : textRgb,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = hoverRgb;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span className="flex items-center gap-3"><Icon size={18} /> {label}</span>
                {badge && (
                  <Badge variant="secondary" className="text-xs" style={{ color: isActive ? activeRgb : textRgb }}>
                    {badge}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>
        <div className="p-4 border-t" style={{ borderColor: borderRgb }}>
          <div 
            className="flex items-center gap-2 text-sm cursor-pointer transition-colors"
            style={{ color: textRgb }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = activeRgb;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = textRgb;
            }}
          >
            <Plus size={16} /> {newListText}
          </div>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 20. Floating Sidebar
export interface FloatingSidebarProps extends SidebarProps {
  brandName?: string;
  menuItems?: string;
  profileName?: string;
  profileRole?: string;
  profileImage?: string;
  logoImage?: string;
}

export const FloatingSidebar = ({
  className,
  brandName = "Studio",
  menuItems = "Dashboard\nContent\nMedia\nComments",
  profileName = "Jane Doe",
  profileRole = "Admin",
  profileImage,
  logoImage,
  backgroundColor = "#ffffff",
  textColor = "#737373",
  activeColor = "#000000",
  hoverColor = "#f5f5f5",
  borderColor = "#e5e5e5",
  width = 256,
  padding = 16,
  borderRadius = 16,
  borderWidth = 0,
}: FloatingSidebarProps) => {
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#ffffff";
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : "#737373";
  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#000000";
  const hoverRgb = hoverColor && hoverColor.trim() !== "" 
    ? (hoverColor.startsWith("rgb") ? hoverColor : (hexToRgb(hoverColor) || hoverColor))
    : "#f5f5f5";
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : "#e5e5e5";

  return (
    <SidebarFrame className="bg-neutral-100 items-center pl-6">
      <div 
        className={cn("flex h-[90%] flex-col rounded-2xl shadow-2xl p-4", className)}
        style={{
          width: `${width}px`,
          padding: `${padding}px`,
          backgroundColor: bgRgb,
          borderRadius: `${borderRadius}px`,
          ...(borderWidth > 0 && {
            borderColor: borderRgb,
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
          }),
        }}
      >
        <div className="flex items-center gap-3 mb-8 px-2 mt-2">
          {logoImage ? (
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img src={logoImage} alt={brandName} className="h-full w-full object-cover" />
            </div>
          ) : (
          <div 
            className="h-8 w-8 rounded-full"
            style={{ background: `linear-gradient(to top right, ${activeRgb}, ${adjustColorBrightness(activeRgb, 0.2)})` }}
          />
          )}
          <span className="font-bold" style={{ color: activeRgb }}>{brandName}</span>
        </div>
        <nav className="flex-1 space-y-2">
          {menuItemsList.map((item, i) => {
            const isActive = i === 0;
            return (
              <a 
                key={i} 
                href="#" 
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? activeRgb : "transparent",
                  color: isActive ? bgRgb : textRgb,
                  ...(isActive && {
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = hoverRgb;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <div 
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: isActive ? bgRgb : textRgb }}
                />
                {item.trim()}
              </a>
            );
          })}
        </nav>
        <div className="mt-auto rounded-xl p-4" style={{ backgroundColor: hoverRgb }}>
          <div className="flex items-center gap-3">
            {profileImage ? (
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img src={profileImage} alt={profileName} className="h-full w-full object-cover" />
              </div>
            ) : (
            <div className="h-8 w-8 rounded-full" style={{ backgroundColor: borderRgb }} />
            )}
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-sm font-bold" style={{ color: activeRgb }}>{profileName}</div>
              <div className="truncate text-xs" style={{ color: textRgb }}>{profileRole}</div>
            </div>
          </div>
        </div>
      </div>
    </SidebarFrame>
  );
};

// Export component map for playground
export const sidebarComponentsByName: Record<string, React.ComponentType<any>> = {
  SimpleSidebar,
  SaasDarkSidebar,
  IconSidebar,
  DoubleRailSidebar,
  GlassSidebar,
  BrutalistSidebar,
  MacOSSidebar,
  CodeSidebar,
  GradientSidebar,
  ProfileSidebar,
  CollapsibleSidebar,
  TreeSidebar,
  NotionStyleSidebar,
  SpotifyStyleSidebar,
  LinearStyleSidebar,
  GamingSidebar,
  FinanceSidebar,
  CurveSidebar,
  TaskSidebar,
  FloatingSidebar,
};


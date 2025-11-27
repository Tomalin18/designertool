"use client"

import React, { useState } from "react";
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
export interface DoubleRailSidebarProps extends SidebarProps {}

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
}: DoubleRailSidebarProps) => {
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
          Design Team <ChevronDown size={16} />
        </div>
        <div className="p-2 space-y-0.5 overflow-y-auto flex-1">
          <div className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase text-neutral-400 hover:text-neutral-300 cursor-pointer flex items-center gap-1"><ChevronDown size={10} /> General</div>
          <div className="rounded px-2 py-1 text-neutral-400 hover:bg-[#3f4147] hover:text-neutral-200 cursor-pointer flex items-center gap-2"><Hash size={18} className="text-neutral-500"/> announcements</div>
          <div className="rounded px-2 py-1 text-white bg-[#3f4147] cursor-pointer flex items-center gap-2"><Hash size={18} className="text-neutral-400"/> general</div>
          <div className="rounded px-2 py-1 text-neutral-400 hover:bg-[#3f4147] hover:text-neutral-200 cursor-pointer flex items-center gap-2"><Hash size={18} className="text-neutral-500"/> off-topic</div>
          
          <div className="px-2 pt-4 pb-1 text-[10px] font-bold uppercase text-neutral-400 hover:text-neutral-300 cursor-pointer flex items-center gap-1"><ChevronDown size={10} /> Voice Channels</div>
          <div className="rounded px-2 py-1 text-neutral-400 hover:bg-[#3f4147] hover:text-neutral-200 cursor-pointer flex items-center gap-2"><Music size={18} className="text-neutral-500"/> Lounge</div>
        </div>
        <div className="bg-[#232428] p-2 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-green-500 relative">
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#232428] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-green-500" /></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">User Name</div>
            <div className="text-[10px] text-neutral-400 truncate">#1234</div>
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
          {menuItemsList.map((item, i) => (
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
              {item.trim()}
            </a>
          ))}
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
export interface MacOSSidebarProps extends SidebarProps {}

const ClockIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

const ArrowDownCircle = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg>

export const MacOSSidebar = ({
  className,
}: MacOSSidebarProps) => (
  <SidebarFrame>
    <div className={cn("flex w-60 flex-col bg-[#F6F5F2]/90 backdrop-blur-sm border-r border-neutral-300 text-sm", className)}>
      <div className="p-4 flex gap-2">
        <div className="h-3 w-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
        <div className="h-3 w-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]" />
        <div className="h-3 w-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
      </div>
      <div className="px-2">
        <div className="px-2 py-1 text-xs font-bold text-neutral-400">Favorites</div>
        <nav className="space-y-0.5">
          {[
            { n: "AirDrop", i: Radio },
            { n: "Recents", i: ClockIcon },
            { n: "Applications", i: Box },
            { n: "Desktop", i: Laptop },
            { n: "Documents", i: FileText },
            { n: "Downloads", i: ArrowDownCircle },
          ].map((item, i) => (
            <a key={item.n} href="#" className={cn("flex items-center gap-2 rounded px-2 py-1 text-neutral-700", i === 2 ? "bg-[#007AFF] text-white" : "")}>
              <item.i size={16} className={cn(i === 2 ? "text-white" : "text-blue-500")} />
              {item.n}
            </a>
          ))}
        </nav>
        <div className="px-2 py-1 mt-4 text-xs font-bold text-neutral-400">iCloud</div>
        <nav className="space-y-0.5">
          <a href="#" className="flex items-center gap-2 rounded px-2 py-1 text-neutral-700">
            <Cloud size={16} className="text-blue-500" /> iCloud Drive
          </a>
        </nav>
      </div>
    </div>
  </SidebarFrame>
);

// 8. VS Code Style
export interface CodeSidebarProps extends SidebarProps {}

export const CodeSidebar = ({
  className,
}: CodeSidebarProps) => (
  <SidebarFrame className="flex-row">
    {/* Activity Bar */}
    <div className={cn("flex w-12 flex-col items-center justify-between border-r border-[#2B2B2B] bg-[#1E1E1E] py-4 text-[#858585]", className)}>
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
    <div className="flex w-60 flex-col bg-[#252526] text-sm text-[#CCCCCC]">
      <div className="flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase">
        <span>Explorer</span>
        <MoreHorizontal size={16} />
      </div>
      <div className="bg-[#37373D] px-4 py-1 text-xs font-bold text-white flex items-center gap-1"><ChevronDown size={12} /> OPEN EDITORS</div>
      <div className="py-1">
        <div className="flex items-center gap-1 px-4 py-1 hover:bg-[#2A2D2E] cursor-pointer text-[#E8AE38]"><span className="text-[10px]">TS</span> Sidebar.tsx <span className="text-neutral-500 ml-2">src/components</span></div>
      </div>
      <div className="bg-[#37373D] px-4 py-1 text-xs font-bold text-white flex items-center gap-1"><ChevronDown size={12} /> PROJECT-ROOT</div>
      <div className="py-1 space-y-0.5">
        <div className="flex items-center gap-1 px-4 py-1 hover:bg-[#2A2D2E] cursor-pointer"><ChevronRight size={12} /> <Folder size={14} className="text-[#DCB67A]" /> .next</div>
        <div className="flex items-center gap-1 px-4 py-1 hover:bg-[#2A2D2E] cursor-pointer"><ChevronDown size={12} /> <Folder size={14} className="text-[#DCB67A]" /> src</div>
        <div className="flex items-center gap-1 pl-8 py-1 hover:bg-[#2A2D2E] cursor-pointer bg-[#37373D]"><span className="text-[10px] text-[#4D9375]">TSX</span> App.tsx</div>
        <div className="flex items-center gap-1 pl-8 py-1 hover:bg-[#2A2D2E] cursor-pointer"><span className="text-[10px] text-[#D4D4D4]">CSS</span> globals.css</div>
      </div>
    </div>
  </SidebarFrame>
);

// 9. Gradient Sidebar
export interface GradientSidebarProps extends SidebarProps {
  logoText?: string;
  primaryMenuItems?: string;
  secondaryMenuItems?: string;
  profileName?: string;
  profileRole?: string;
}

export const GradientSidebar = ({
  className,
  logoText = "Flash",
  primaryMenuItems = "Overview\nReports\nLive View",
  secondaryMenuItems = "Settings\nHelp\nLogout",
  profileName = "Sarah J.",
  profileRole = "Premium User",
}: GradientSidebarProps) => {
  const primaryItems = primaryMenuItems ? primaryMenuItems.split("\n").filter(item => item.trim() !== "") : [];
  const secondaryItems = secondaryMenuItems ? secondaryMenuItems.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <SidebarFrame>
      <div className={cn("flex w-64 flex-col bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white/80", className)}>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <Zap className="fill-yellow-400 text-yellow-400" /> {logoText}
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {primaryItems.map((item, i) => (
            <a key={i} href="#" className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors", i === 0 ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white")}>
              <div className={cn("h-2 w-2 rounded-full", i === 0 ? "bg-cyan-400 shadow-[0_0_10px_cyan]" : "bg-white/20")} />
              {item.trim()}
            </a>
          ))}
          <div className="my-4 h-px w-full bg-white/10" />
          {secondaryItems.map((item) => (
            <a key={item} href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5 hover:text-white">
              <div className="h-2 w-2 rounded-full bg-white/20" />
              {item.trim()}
            </a>
          ))}
        </nav>
        <div className="p-4 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500" />
            <div>
              <div className="text-sm font-bold text-white">{profileName}</div>
              <div className="text-xs">{profileRole}</div>
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
  menuSectionTitle = "Menu",
  menuItems = "My Profile\nMy Work\nSaved Items\nBilling",
  upgradeTitle = "Upgrade to Pro",
  upgradeDescription = "Get access to exclusive tools.",
  upgradeButtonText = "Upgrade",
}: ProfileSidebarProps) => {
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [User, Briefcase, Heart, CreditCard];

  return (
    <SidebarFrame>
      <div className={cn("flex w-72 flex-col bg-neutral-50 border-r border-neutral-200", className)}>
        <div className="flex flex-col items-center pt-8 pb-6 border-b border-neutral-200">
          <div className="h-20 w-20 rounded-full border-4 border-white shadow-lg mb-4">
            <img src="https://i.pravatar.cc/100?img=32" className="h-full w-full rounded-full" alt="User" />
          </div>
          <h3 className="font-bold text-neutral-900 text-lg">{profileName}</h3>
          <p className="text-sm text-neutral-500">{profileRole}</p>
          <div className="mt-4 flex gap-4 text-neutral-400">
            <a href="#" className="hover:text-black"><MessageSquare size={18} /></a>
            <a href="#" className="hover:text-black"><Bell size={18} /></a>
            <a href="#" className="hover:text-black"><Settings size={18} /></a>
          </div>
        </div>
        <div className="flex-1 p-6">
          {menuSectionTitle && (
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">{menuSectionTitle}</div>
          )}
          <nav className="space-y-4 font-medium text-neutral-600">
            {menuItemsList.map((item, index) => {
              const Icon = menuIcons[index] || User;
              return (
                <a key={index} href="#" className="flex items-center gap-3 hover:text-indigo-600 transition-colors">
                  <Icon size={20} /> {item.trim()}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          <div className="rounded-xl bg-indigo-600 p-4 text-white text-center">
            <p className="text-sm font-bold mb-2">{upgradeTitle}</p>
            <p className="text-xs opacity-80 mb-3">{upgradeDescription}</p>
            <button className="w-full bg-white text-indigo-600 text-xs font-bold py-2 rounded-lg">{upgradeButtonText}</button>
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
}: CollapsibleSidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [Home, Search, Layers, Box, Settings];

  return (
    <SidebarFrame>
      <div className={cn("flex flex-col border-r border-neutral-800 bg-neutral-950 transition-all duration-300", collapsed ? "w-20 items-center" : "w-64", className)}>
        <div className={cn("flex h-16 items-center px-4 border-b border-neutral-800", collapsed ? "justify-center" : "justify-between")}>
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">{logoText}</div>
          {!collapsed && <span className="font-bold text-white">{brandName}</span>}
          <button onClick={() => setCollapsed(!collapsed)} className={cn("rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white", collapsed && "hidden")}>
            <ChevronRight size={16} className="rotate-180" />
          </button>
        </div>
        <div className={cn("flex-1 py-4 space-y-2", collapsed ? "px-2" : "px-4")}>
          {menuItemsList.map((item, i) => {
            const Icon = menuIcons[i] || Home;
            return (
              <button key={i} className={cn("flex items-center rounded-lg py-3 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white", collapsed ? "justify-center w-full" : "gap-3 px-3 w-full")}>
                <Icon size={20} />
                {!collapsed && <span className="text-sm font-medium">{item.trim()}</span>}
              </button>
            );
          })}
        </div>
        <div className={cn("border-t border-neutral-800 p-4", collapsed && "flex justify-center")}>
          <button onClick={() => setCollapsed(!collapsed)} className="rounded-full bg-neutral-900 p-2 text-neutral-400 hover:text-white">
            <ChevronRight size={16} className={cn("transition-transform", !collapsed && "rotate-180")} />
          </button>
        </div>
      </div>
    </SidebarFrame>
  );
};

// 12. Tree/Folder Structure
export interface TreeSidebarProps extends SidebarProps {}

export const TreeSidebar = ({
  className,
}: TreeSidebarProps) => (
  <SidebarFrame>
    <div className={cn("flex w-64 flex-col border-r border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700", className)}>
      <div className="mb-4 font-bold text-neutral-900 px-2">Documentation</div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 font-medium text-neutral-900 px-2 py-1"><ChevronDown size={14} /> Getting Started</div>
        <div className="pl-6 space-y-1 border-l border-neutral-200 ml-4">
          <a href="#" className="block py-1 text-indigo-600 font-medium">Installation</a>
          <a href="#" className="block py-1 text-neutral-600 hover:text-black">Project Structure</a>
          <a href="#" className="block py-1 text-neutral-600 hover:text-black">Changelog</a>
        </div>
        <div className="flex items-center gap-1 font-medium text-neutral-600 px-2 py-1 mt-2 hover:bg-neutral-100 rounded cursor-pointer"><ChevronRight size={14} /> Components</div>
        <div className="flex items-center gap-1 font-medium text-neutral-600 px-2 py-1 hover:bg-neutral-100 rounded cursor-pointer"><ChevronRight size={14} /> API Reference</div>
        <div className="flex items-center gap-1 font-medium text-neutral-600 px-2 py-1 hover:bg-neutral-100 rounded cursor-pointer"><ChevronRight size={14} /> Integration</div>
      </div>
    </div>
  </SidebarFrame>
);

// 13. Notion Style
export interface NotionStyleSidebarProps extends SidebarProps {}

const Clock = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

export const NotionStyleSidebar = ({
  className,
}: NotionStyleSidebarProps) => (
  <SidebarFrame>
    <div className={cn("flex w-60 flex-col bg-[#F7F7F5] text-[#37352F] text-sm font-medium", className)}>
      <div className="flex items-center gap-2 p-3 hover:bg-[#EFEFED] cursor-pointer m-1 rounded transition-colors">
        <div className="h-5 w-5 rounded bg-orange-400 flex items-center justify-center text-xs text-white">W</div>
        <span className="flex-1 truncate font-bold">Workspace</span>
        <div className="flex gap-1 text-[#37352F]/40">
          <ChevronDown size={14} />
        </div>
      </div>
      <div className="px-2 space-y-0.5">
        <div className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer text-neutral-600">
          <Search size={16} /> Search
        </div>
        <div className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer text-neutral-600">
          <Clock size={16} /> Updates
        </div>
        <div className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer text-neutral-600">
          <Settings size={16} /> Settings
        </div>
      </div>
      <div className="mt-4 px-3 mb-1 text-xs font-bold text-neutral-500">Favorites</div>
      <div className="px-2 space-y-0.5">
        {["Product Roadmap", "Meeting Notes", "Design System"].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer">
            <span className="text-lg leading-none">📄</span> {item}
          </div>
        ))}
      </div>
      <div className="mt-4 px-3 mb-1 text-xs font-bold text-neutral-500">Private</div>
      <div className="px-2 space-y-0.5">
        {["Personal Goals", "Reading List"].map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer">
            <span className="text-lg leading-none">📄</span> {item}
          </div>
        ))}
        <div className="flex items-center gap-2 px-3 py-1 hover:bg-[#EFEFED] rounded cursor-pointer text-neutral-500">
          <Plus size={16} /> Add a page
        </div>
      </div>
    </div>
  </SidebarFrame>
);

// 14. Spotify Style
export interface SpotifyStyleSidebarProps extends SidebarProps {}

export const SpotifyStyleSidebar = ({
  className,
}: SpotifyStyleSidebarProps) => (
  <SidebarFrame>
    <div className={cn("flex w-64 flex-col bg-black text-[#b3b3b3] p-2 gap-2 font-medium", className)}>
      <div className="bg-[#121212] rounded-lg p-4 space-y-4">
        <a href="#" className="flex items-center gap-4 text-white"><Home size={24} className="fill-current"/> Home</a>
        <a href="#" className="flex items-center gap-4 hover:text-white transition-colors"><Search size={24} /> Search</a>
      </div>
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="p-4 shadow-lg z-10 flex justify-between items-center text-neutral-400">
          <button className="flex items-center gap-2 hover:text-white transition-colors"><Layers size={24} className="-rotate-90"/> Your Library</button>
          <div className="flex gap-4">
            <Plus size={20} className="hover:text-white cursor-pointer"/>
            <ArrowRightIcon size={20} className="hover:text-white cursor-pointer"/>
          </div>
        </div>
        <div className="px-2 pb-2 space-y-2 overflow-y-auto">
          <div className="flex gap-2">
            <button className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm text-white hover:bg-[#3a3a3a]">Playlists</button>
            <button className="rounded-full bg-[#2a2a2a] px-3 py-1 text-sm text-white hover:bg-[#3a3a3a]">Artists</button>
          </div>
          {[
            { t: "Liked Songs", s: "Playlist • 432 songs", i: "❤️", active: true },
            { t: "Discover Weekly", s: "Playlist • Spotify", i: "🎵" },
            { t: "Synthwave Mix", s: "Playlist • Alex", i: "🎹" },
            { t: "Coding Focus", s: "Playlist • Spotify", i: "💻" },
            { t: "On Repeat", s: "Playlist • Spotify", i: "🔁" },
          ].map((item, i) => (
            <div key={i} className={cn("flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer", item.active && "bg-[#1a1a1a]")}>
              <div className={cn("h-12 w-12 rounded flex items-center justify-center text-xl", item.active ? "bg-gradient-to-br from-indigo-700 to-blue-300" : "bg-[#282828]")}>{item.i}</div>
              <div>
                <div className={cn("text-white truncate", item.active && "text-green-500")}>{item.t}</div>
                <div className="text-sm truncate">{item.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SidebarFrame>
);

// 15. Linear Style (Clean Workspace)
export interface LinearStyleSidebarProps extends SidebarProps {}

export const LinearStyleSidebar = ({
  className,
}: LinearStyleSidebarProps) => (
  <SidebarFrame>
    <div className={cn("flex w-60 flex-col border-r border-white/5 bg-[#1C1C1F] text-[#D0D6E0] p-3 text-[13px]", className)}>
      <div className="flex items-center gap-2 px-2 py-1 mb-4 hover:bg-white/5 rounded cursor-pointer">
        <div className="h-4 w-4 rounded bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">L</div>
        <span className="font-medium text-white">Linear</span>
        <ChevronDown size={12} className="ml-auto opacity-50" />
      </div>
      
      <div className="space-y-0.5 mb-6">
        <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#2D2E33] text-white font-medium cursor-pointer"><div className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Inbox</div>
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer"><div className="h-1.5 w-1.5 rounded-full border border-neutral-500" /> My Issues</div>
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer"><div className="h-1.5 w-1.5 rounded-full border border-neutral-500" /> Views</div>
      </div>

      <div className="px-2 mb-1 font-medium text-neutral-500 flex justify-between group">
        Your Teams <Plus size={12} className="opacity-0 group-hover:opacity-100 hover:text-white cursor-pointer" />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer"><div className="h-3 w-3 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center text-[8px]">E</div> Engineering</div>
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer"><div className="h-3 w-3 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center text-[8px]">D</div> Design</div>
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer"><div className="h-3 w-3 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-[8px]">M</div> Marketing</div>
      </div>
    </div>
  </SidebarFrame>
);

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
          {menuItemsList.map((item, i) => (
            <a key={i} href="#" className={cn(
              "block border-l-4 px-4 py-3 font-bold uppercase tracking-wider transition-all hover:bg-red-900/20 hover:pl-6",
              i === 0 ? "border-red-600 bg-red-900/10 text-red-500" : "border-neutral-800 text-neutral-500 hover:border-red-600 hover:text-white"
            )}>
              {item.trim()}
            </a>
          ))}
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
}: FinanceSidebarProps) => {
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [CreditCard, ArrowRightIcon, PieChart, FileText];

  return (
    <SidebarFrame>
      <div className={cn("flex w-64 flex-col bg-[#0b2135] text-white", className)}>
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-emerald-500 flex items-center justify-center"><Shield size={18} fill="white" /></div>
          <span className="font-bold text-lg tracking-tight">{brandName}</span>
        </div>
        <div className="px-6 mb-6">
          <div className="text-xs text-blue-300 mb-1">{balanceLabel}</div>
          <div className="text-2xl font-mono">{balanceAmount}</div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {menuItemsList.map((item, index) => {
            const Icon = menuIcons[index] || CreditCard;
            const isActive = index === 0;
            return (
              <a key={index} href="#" className={cn("flex items-center gap-3 rounded-lg px-4 py-3 font-medium", isActive ? "bg-blue-900/50 text-emerald-400 border border-blue-800/50" : "text-blue-200 hover:bg-blue-900/30 hover:text-white")}>
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
}: CurveSidebarProps) => (
  <SidebarFrame>
    <div className={cn("flex w-24 flex-col items-center py-6 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.05)] rounded-r-[40px] z-10", className)}>
      <div className="mb-8 p-3 rounded-xl bg-black text-white"><Command size={24} /></div>
      <nav className="flex flex-col gap-6 w-full items-center">
        {[Home, Compass, Heart, MessageSquare, User].map((Icon, i) => (
          <button key={i} className={cn("relative p-3 rounded-xl transition-all duration-300", i === 0 ? "text-indigo-600" : "text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100")}>
            <Icon size={24} className={i===0?"fill-current":""} />
            {i === 0 && <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[26px] h-8 w-1 bg-indigo-600 rounded-l-full" />}
          </button>
        ))}
      </nav>
      <div className="mt-auto p-3 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 cursor-pointer">
        <LogOut size={20} />
      </div>
    </div>
  </SidebarFrame>
);

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
}: TaskSidebarProps) => {
  const parseItemWithBadge = (itemString: string) => {
    const parts = itemString.split(':');
    return { label: parts[0]?.trim() || "", badge: parts[1]?.trim() || undefined };
  };

  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [Sun, Star, Calendar, Flag];

  return (
    <SidebarFrame>
      <div className={cn("flex w-64 flex-col bg-white border-r border-neutral-200", className)}>
        <div className="p-6">
          <button className="flex w-full items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] transition-all">
            <Plus size={18} /> {newTaskButtonText}
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItemsList.map((item, index) => {
            const Icon = menuIcons[index] || Sun;
            const { label, badge } = parseItemWithBadge(item);
            const isActive = index === 0;
            return (
              <a key={index} href="#" className={cn("flex items-center justify-between rounded-lg px-4 py-2.5 font-medium", isActive ? "bg-indigo-50 text-indigo-700" : "text-neutral-600 hover:bg-neutral-50")}>
                <span className="flex items-center gap-3"><Icon size={18} /> {label}</span>
                {badge && (
                  <Badge variant="secondary" className={cn("text-xs", isActive ? "" : "text-neutral-400")}>
                    {badge}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>
        <div className="p-4 border-t border-neutral-100">
          <div className="flex items-center gap-2 text-sm text-neutral-500 hover:text-indigo-600 cursor-pointer">
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
}

export const FloatingSidebar = ({
  className,
  brandName = "Studio",
  menuItems = "Dashboard\nContent\nMedia\nComments",
  profileName = "Jane Doe",
  profileRole = "Admin",
}: FloatingSidebarProps) => {
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <SidebarFrame className="bg-neutral-100 items-center pl-6">
      <div className={cn("flex h-[90%] w-64 flex-col rounded-2xl bg-white shadow-2xl p-4", className)}>
        <div className="flex items-center gap-3 mb-8 px-2 mt-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500" />
          <span className="font-bold text-neutral-800">{brandName}</span>
        </div>
        <nav className="flex-1 space-y-2">
          {menuItemsList.map((item, i) => (
            <a key={i} href="#" className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all", i === 0 ? "bg-black text-white shadow-lg" : "text-neutral-500 hover:bg-neutral-50")}>
              <div className={cn("h-2 w-2 rounded-full", i === 0 ? "bg-white" : "bg-neutral-300")} />
              {item.trim()}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-neutral-50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-neutral-200" />
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-sm font-bold">{profileName}</div>
              <div className="truncate text-xs text-neutral-500">{profileRole}</div>
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


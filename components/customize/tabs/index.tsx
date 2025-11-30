"use client"

import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { 
  Home, 
  Settings, 
  User, 
  MessageSquare, 
  Bell, 
  Star, 
  Zap, 
  Layout, 
  Code, 
  Terminal, 
  Activity, 
  Box, 
  Layers, 
  Shield, 
  CreditCard,
  Music,
  Video,
  Image as ImageIcon,
  FileText,
  Folder,
  Search,
  ShoppingBag,
  Hash
} from "lucide-react";
import { tabsSections } from "@/lib/tabs-sections";

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r} ${g} ${b})`;
};

// Common tabs props interface
export interface TabsProps {
  className?: string;
  tabs?: string;
  defaultActive?: string;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
}

// Helper for demonstration content
const TabContent = ({ activeTab }: { activeTab: string }) => (
  <div className="mt-4 rounded-xl border border-dashed border-neutral-800 bg-neutral-900/50 p-8 text-center">
    <p className="text-sm text-neutral-500">Content for <span className="font-bold text-neutral-300">{activeTab}</span></p>
  </div>
);

// Helper to parse tabs from textarea
const parseTabs = (tabsString?: string, defaultTabs: string[] = []): string[] => {
  if (!tabsString || tabsString.trim() === "") return defaultTabs;
  return tabsString.split("\n").map(t => t.trim()).filter(t => t !== "");
};

// Icon mapping for icon-based tabs
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home,
  Activity,
  Messages: MessageSquare,
  Profile: User,
  Search,
  Reels: Video,
  Shop: ShoppingBag,
};

// 1. Simple Underline Tabs
export interface SimpleUnderlineTabsProps extends TabsProps {}

export const SimpleUnderlineTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#6366f1",
}: SimpleUnderlineTabsProps) => {
  const defaultTabs = ["Account", "Password", "Notifications", "Billing"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#6366f1";

  return (
    <div className={cn("w-full max-w-lg", className)}>
      <div className="flex border-b border-neutral-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors hover:text-white",
              active === tab ? "text-white" : "text-neutral-500"
            )}
          >
            {tab}
            <span 
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-full transition-transform duration-300",
                active === tab ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                backgroundColor: active === tab ? activeRgb : undefined,
              }}
            />
          </button>
        ))}
      </div>
      <TabContent activeTab={active} />
    </div>
  );
};

// 2. Pill Tabs
export interface PillTabsProps extends TabsProps {}

export const PillTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor,
  backgroundColor = "#171717",
}: PillTabsProps) => {
  const defaultTabs = ["Overview", "Integrations", "Activity", "Domains"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : undefined;
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#171717";

  return (
    <div className={cn("w-full max-w-lg", className)}>
      <div className="flex space-x-1 rounded-xl p-1" style={{ backgroundColor: bgRgb }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              active === tab 
                ? "bg-neutral-800 text-white shadow-sm" 
                : "text-neutral-400 hover:text-neutral-200"
            )}
            style={active === tab && activeRgb ? { backgroundColor: activeRgb } : undefined}
          >
            {tab}
          </button>
        ))}
      </div>
      <TabContent activeTab={active} />
    </div>
  );
};

// 3. Segmented Control (iOS Style)
export interface SegmentedTabsProps extends TabsProps {}

export const SegmentedTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor,
  backgroundColor = "#e5e7eb",
}: SegmentedTabsProps) => {
  const defaultTabs = ["Daily", "Weekly", "Monthly", "Yearly"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : undefined;
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#e5e7eb";

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="flex rounded-lg p-1 text-neutral-600" style={{ backgroundColor: bgRgb }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "flex-1 rounded-md py-1.5 text-xs font-bold transition-all",
              active === tab 
                ? "bg-white text-black shadow-sm" 
                : "hover:bg-neutral-200/50"
            )}
            style={active === tab && activeRgb ? { backgroundColor: activeRgb } : undefined}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center">
        <p className="text-sm text-neutral-500">View: <span className="font-bold text-neutral-900">{active}</span></p>
      </div>
    </div>
  );
};

// 4. Icon Only Tabs
export interface IconTabsProps extends TabsProps {}

export const IconTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#818cf8",
}: IconTabsProps) => {
  const defaultTabs = ["Home", "Activity", "Messages", "Profile"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#818cf8";

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="flex justify-between rounded-2xl bg-neutral-900 px-6 py-3">
        {tabs.map((tab) => {
          const Icon = iconMap[tab] || Home;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                active === tab ? "" : "text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
              )}
              style={active === tab ? { color: activeRgb } : undefined}
            >
              <Icon size={20} className={cn("transition-transform duration-300", active === tab && "scale-110")} />
              {active === tab && (
                <span className="absolute -bottom-2 h-1 w-1 rounded-full" style={{ backgroundColor: activeRgb }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 5. Vertical Tabs (Sidebar style)
export interface VerticalTabsProps extends TabsProps {}

export const VerticalTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor,
  backgroundColor = "#0a0a0a",
}: VerticalTabsProps) => {
  const defaultTabs = ["General", "Profile", "Password", "Team", "Billing", "Notifications"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : undefined;
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#0a0a0a";

  return (
    <div className={cn("flex w-full max-w-lg gap-6 rounded-xl border border-neutral-800 p-6", className)} style={{ backgroundColor: bgRgb }}>
      <div className="flex w-1/3 flex-col space-y-1 border-r border-neutral-800 pr-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              active === tab 
                ? "bg-neutral-900 text-white" 
                : "text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300"
            )}
            style={active === tab && activeRgb ? { backgroundColor: activeRgb } : undefined}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white">{active} Settings</h3>
        <p className="mt-2 text-sm text-neutral-500">Manage your {active.toLowerCase()} preferences here.</p>
      </div>
    </div>
  );
};

// 6. Floating Bar Tabs
export interface FloatingTabsProps extends TabsProps {}

export const FloatingTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor,
  backgroundColor = "#171717",
}: FloatingTabsProps) => {
  const defaultTabs = ["Discover", "Arcade", "Create", "Work", "Play"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : undefined;
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#171717";

  return (
    <div className={cn("w-full max-w-lg", className)}>
      <div className="relative h-48 w-full rounded-2xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-neutral-800 p-1.5 shadow-2xl backdrop-blur-md"
          style={{ backgroundColor: bgRgb }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-neutral-800",
                active === tab ? "bg-neutral-800 text-white" : "text-neutral-400"
              )}
              style={active === tab && activeRgb ? { backgroundColor: activeRgb } : undefined}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 7. Folder Tabs (Browser Style)
export interface FolderTabsProps extends TabsProps {}

export const FolderTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#1e1e1e",
  backgroundColor = "#252526",
}: FolderTabsProps) => {
  const defaultTabs = ["index.tsx", "App.tsx", "styles.css", "utils.ts"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#1e1e1e";
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#252526";

  return (
    <div className={cn("w-full max-w-lg overflow-hidden rounded-t-xl", className)} style={{ backgroundColor: activeRgb }}>
      <div className="flex bg-[#252526] pt-2 px-2 gap-1 overflow-x-auto scrollbar-hide" style={{ backgroundColor: bgRgb }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "flex min-w-[100px] items-center gap-2 rounded-t-md px-3 py-2 text-xs font-medium transition-colors",
              active === tab 
                ? "text-white" 
                : "bg-[#2d2d2d] text-neutral-400 hover:bg-[#2a2a2b]"
            )}
            style={active === tab ? { backgroundColor: activeRgb } : undefined}
          >
            <Code size={14} className={cn(
                tab.endsWith('tsx') ? "text-blue-400" : 
                tab.endsWith('css') ? "text-blue-300" : 
                "text-yellow-400"
            )} />
            {tab}
            {active === tab && <div className="ml-auto h-2 w-2 rounded-full bg-white/20 hover:bg-white/40" />}
          </button>
        ))}
      </div>
      <div className="h-32 border-t border-[#1e1e1e] p-4" style={{ backgroundColor: activeRgb }}>
        <code className="text-sm text-neutral-400">// Code for {active}</code>
      </div>
    </div>
  );
};

// 8. Neon Glowing Tabs
export interface NeonTabsProps extends TabsProps {}

export const NeonTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#22d3ee",
}: NeonTabsProps) => {
  const defaultTabs = ["Cyber", "Punk", "Neon", "Future"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#22d3ee";

  return (
    <div className={cn("w-full max-w-lg", className)}>
      <div className="flex justify-center gap-8 border-b border-cyan-900/30 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "relative text-lg font-bold uppercase tracking-widest transition-all",
              active === tab 
                ? "drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                : "text-neutral-700 hover:text-cyan-900"
            )}
            style={active === tab ? { color: activeRgb } : undefined}
          >
            {tab}
            {active === tab && (
                <span className="absolute -bottom-4 left-0 h-0.5 w-full shadow-[0_0_10px_rgba(34,211,238,1)]" style={{ backgroundColor: activeRgb }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// 9. Minimal Text Tabs
export interface MinimalTextTabsProps extends TabsProps {}

export const MinimalTextTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#ffffff",
  inactiveColor = "#262626",
}: MinimalTextTabsProps) => {
  const defaultTabs = ["Design", "Code", "Ship"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#ffffff";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#262626";

  return (
    <div className={cn("w-full max-w-sm", className)}>
        <div className="flex items-baseline gap-6">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={cn(
                        "text-3xl font-black transition-all duration-300",
                        active === tab ? "scale-105" : "text-xl"
                    )}
                    style={{
                      color: active === tab ? activeRgb : inactiveRgb,
                    }}
                >
                    {tab}.
                </button>
            ))}
        </div>
    </div>
  );
};

// 10. Box Tabs (Connected)
export interface BoxTabsProps extends TabsProps {}

export const BoxTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#171717",
  backgroundColor = "#0a0a0a",
}: BoxTabsProps) => {
  const defaultTabs = ["Personal", "Team", "Enterprise"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#171717";
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#0a0a0a";

  return (
    <div className={cn("w-full max-w-md", className)}>
        <div className="flex">
            {tabs.map((tab, i) => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={cn(
                        "flex-1 border-t border-l border-r border-neutral-800 py-3 text-sm font-bold transition-colors first:rounded-tl-xl last:rounded-tr-xl",
                        active === tab ? "text-white" : "bg-neutral-950 text-neutral-500 hover:bg-neutral-900/50"
                    )}
                    style={active === tab ? { backgroundColor: activeRgb } : { backgroundColor: bgRgb }}
                >
                    {tab}
                </button>
            ))}
        </div>
        <div className="h-32 w-full rounded-b-xl border border-neutral-800 p-6 text-neutral-400" style={{ backgroundColor: activeRgb }}>
            Selected Plan: <span className="text-white">{active}</span>
        </div>
    </div>
  );
};

// 11. Gradient Border Tabs
export interface GradientTabsProps extends TabsProps {}

export const GradientTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor,
  backgroundColor = "#171717",
}: GradientTabsProps) => {
  const defaultTabs = ["AI Models", "Datasets", "Fine-tuning"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#171717";

  return (
    <div className={cn("w-full max-w-lg rounded-full p-1", className)} style={{ backgroundColor: bgRgb }}>
      <div className="flex relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="group relative z-10 flex-1 rounded-full py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white focus:outline-none"
          >
            {active === tab && (
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
                    <div className="h-full w-full rounded-full bg-neutral-800" />
                </div>
            )}
            <span className={cn(active === tab ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-bold" : "")}>
                {tab}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// 12. Glass Tabs
export interface GlassTabsProps extends TabsProps {}

export const GlassTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor,
}: GlassTabsProps) => {
  const defaultTabs = ["Music", "Video", "Images"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Music,
    Video,
    Images: ImageIcon,
  };

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : undefined;

  return (
    <div className={cn("relative w-full max-w-md overflow-hidden rounded-2xl bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center p-8", className)}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex rounded-xl border border-white/20 bg-white/10 p-1 backdrop-blur-md">
            {tabs.map((tab) => {
              const Icon = iconMap[tab] || Music;
              return (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all",
                        active === tab 
                            ? "bg-white/20 text-white shadow-lg" 
                            : "text-white/60 hover:bg-white/10 hover:text-white"
                    )}
                    style={active === tab && activeRgb ? { backgroundColor: activeRgb } : undefined}
                >
                    <Icon size={14} />
                    {tab}
                </button>
              );
            })}
        </div>
    </div>
  );
};

// 13. Retro Windows 95 Tabs
export interface RetroTabsProps extends TabsProps {}

export const RetroTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#c0c0c0",
  backgroundColor = "#c0c0c0",
}: RetroTabsProps) => {
  const defaultTabs = ["Setup", "Display", "Sound", "Network"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#c0c0c0";
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#c0c0c0";

  return (
    <div className={cn("w-full max-w-lg p-1 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black", className)} style={{ backgroundColor: bgRgb }}>
        <div className="flex px-1 pt-1 gap-1">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={cn(
                        "px-4 py-1 text-sm font-bold border-t-2 border-l-2 border-r-2 transition-all relative top-[2px]",
                        active === tab 
                            ? "text-black z-10 -mb-[2px] pb-[4px] border-white border-r-black" 
                            : "bg-[#a0a0a0] border-white border-r-black text-neutral-600"
                    )}
                    style={active === tab ? { backgroundColor: activeRgb } : undefined}
                >
                    {tab}
                </button>
            ))}
        </div>
        <div className="border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-4 min-h-[100px] relative z-0" style={{ backgroundColor: activeRgb }}>
            <p className="text-black font-sans text-sm">System Properties: {active}</p>
        </div>
    </div>
  );
};

// 14. Status Badge Tabs
export interface StatusTabsProps extends TabsProps {}

export const StatusTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor,
  backgroundColor = "#171717",
}: StatusTabsProps) => {
  const defaultTabs = ["All:12", "Unread:4", "Archived:0"];
  const tabsData = parseTabs(tabsProp, defaultTabs).map(tab => {
    const [name, count] = tab.split(":");
    return { name: name || tab, count: count ? parseInt(count) : 0 };
  });
  const [active, setActive] = useState(defaultActive || tabsData[0]?.name || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : undefined;
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#171717";

  return (
    <div className={cn("w-full max-w-lg", className)}>
        <div className="flex gap-2 rounded-lg p-1" style={{ backgroundColor: bgRgb }}>
            {tabsData.map(tab => (
                <button
                    key={tab.name}
                    onClick={() => setActive(tab.name)}
                    className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                        active === tab.name 
                            ? "bg-neutral-800 text-white" 
                            : "text-neutral-400 hover:text-white"
                    )}
                    style={active === tab.name && activeRgb ? { backgroundColor: activeRgb } : undefined}
                >
                    {tab.name}
                    {tab.count > 0 && (
                        <span className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px]",
                            active === tab.name ? "bg-white text-black" : "bg-neutral-800 text-neutral-400"
                        )}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    </div>
  );
};

// 15. Circle Indicator Tabs
export interface CircleTabsProps extends TabsProps {}

export const CircleTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#6366f1",
}: CircleTabsProps) => {
  const defaultTabs = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#6366f1";

  return (
    <div className={cn("w-full max-w-lg", className)}>
        <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800 -z-10" />
            {tabs.map((tab, i) => (
                <button 
                    key={tab}
                    onClick={() => setActive(tab)}
                    className="group flex flex-col items-center gap-2 bg-neutral-950 px-2"
                >
                    <div className={cn(
                        "h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all",
                        active === tab 
                            ? "border-indigo-500 bg-indigo-500 text-white" 
                            : "border-neutral-700 bg-neutral-900 text-neutral-500 group-hover:border-neutral-500"
                    )}
                    style={active === tab ? { borderColor: activeRgb, backgroundColor: activeRgb } : undefined}
                    >
                        {i + 1}
                    </div>
                    <span className={cn(
                        "text-xs font-medium transition-colors",
                        active === tab ? "text-white" : "text-neutral-500"
                    )}>
                        {tab}
                    </span>
                </button>
            ))}
        </div>
    </div>
  );
};

// 16. Arrow Breadcrumb Tabs
export interface ArrowTabsProps extends TabsProps {}

export const ArrowTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#2563eb",
  backgroundColor = "#171717",
}: ArrowTabsProps) => {
  const defaultTabs = ["Cart", "Shipping", "Payment", "Confirm"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#2563eb";
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#171717";

  return (
    <div className={cn("flex w-full max-w-xl overflow-hidden rounded-lg", className)} style={{ backgroundColor: bgRgb }}>
        {tabs.map((tab, i) => (
            <button
                key={tab}
                onClick={() => setActive(tab)}
                className={cn(
                    "relative flex-1 py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors",
                    active === tab 
                        ? "text-white z-10" 
                        : "text-neutral-500 hover:bg-neutral-700 hover:text-neutral-300"
                )}
                style={{ 
                  clipPath: i === tabs.length - 1 ? 'none' : 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)', 
                  paddingRight: '10px', 
                  backgroundColor: active === tab ? activeRgb : bgRgb 
                }}
            >
                {tab}
            </button>
        ))}
    </div>
  );
};

// 17. Dynamic Underline (Animated)
export interface AnimatedUnderlineTabsProps extends TabsProps {}

export const AnimatedUnderlineTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#ffffff",
}: AnimatedUnderlineTabsProps) => {
  const defaultTabs = ["Product", "Features", "Marketplace", "Company"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");
  const activeIndex = tabs.findIndex(t => t === active);

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#ffffff";

  return (
    <div className={cn("w-full max-w-lg", className)}>
        <div className="relative flex border-b border-neutral-800">
            {tabs.map((tab, i) => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={cn(
                        "w-1/4 py-4 text-sm font-medium transition-colors",
                        active === tab ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                    )}
                >
                    {tab}
                </button>
            ))}
            <div 
                className="absolute bottom-0 h-0.5 transition-all duration-300 ease-out"
                style={{ width: `${100 / tabs.length}%`, left: `${activeIndex * (100 / tabs.length)}%`, backgroundColor: activeRgb }}
            />
        </div>
    </div>
  );
};

// 18. Card Stack Tabs
export interface CardStackTabsProps extends TabsProps {}

export const CardStackTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#2563eb",
}: CardStackTabsProps) => {
  const defaultTabs = ["Visa", "Master", "Amex"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const colorMap: Record<string, string> = {
    Visa: "#2563eb",
    Master: "#ea580c",
    Amex: "#059669",
  };

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#2563eb";

  const getCardColor = (tab: string) => {
    if (tab === "Visa") return activeRgb;
    if (tab === "Master") return "#ea580c";
    if (tab === "Amex") return "#059669";
    return activeRgb;
  };

  return (
    <div className={cn("w-full max-w-xs", className)}>
        <div className="flex gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={cn(
                        "h-12 w-16 rounded-t-lg transition-all",
                        active === tab 
                            ? "translate-y-2 pb-4 z-10" 
                            : "bg-neutral-800 translate-y-4 hover:translate-y-3"
                    )}
                    style={active === tab ? { backgroundColor: getCardColor(tab) } : undefined}
                >
                    <span className="text-xs font-bold text-white opacity-80">{tab}</span>
                </button>
            ))}
        </div>
        <div className={cn(
            "relative z-20 h-40 w-full rounded-xl p-6 text-white shadow-xl transition-colors"
        )}
        style={{ backgroundColor: getCardColor(active) }}
        >
            <div className="flex justify-between">
                <CreditCard />
                <span className="font-mono opacity-70">{active}</span>
            </div>
            <div className="mt-8 font-mono text-xl tracking-widest">•••• 4242</div>
        </div>
    </div>
  );
};

// 19. Tab Bar (Mobile Bottom)
export interface MobileTabBarProps extends TabsProps {}

export const MobileTabBar = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#ffffff",
}: MobileTabBarProps) => {
  const defaultTabs = ["Home", "Search", "Reels", "Shop", "Profile"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
    Home,
    Search,
    Reels: Video,
    Shop: ShoppingBag,
    Profile: User,
  };

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#ffffff";

  return (
    <div className={cn("w-full max-w-sm rounded-3xl bg-black p-4 border border-neutral-800", className)}>
        <div className="h-40 rounded-2xl bg-neutral-900 mb-4" />
        <div className="flex justify-between items-center px-2">
            {tabs.map((tab) => {
                const Icon = iconMap[tab] || Home;
                return (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 transition-colors",
                            active === tab ? "" : "text-neutral-600 hover:text-neutral-400"
                        )}
                        style={active === tab ? { color: activeRgb } : undefined}
                    >
                        <Icon size={24} className={cn(active === tab && "fill-current")} strokeWidth={active === tab ? 0 : 2} />
                    </button>
                )
            })}
        </div>
    </div>
  );
};

// 20. Code File Tabs
export interface CodeFileTabsProps extends TabsProps {}

export const CodeFileTabs = ({
  className,
  tabs: tabsProp,
  defaultActive,
  activeColor = "#3b82f6",
  backgroundColor = "#1e1e1e",
}: CodeFileTabsProps) => {
  const defaultTabs = ["page.tsx", "layout.tsx", "globals.css", "components"];
  const tabs = parseTabs(tabsProp, defaultTabs);
  const [active, setActive] = useState(defaultActive || tabs[0] || "");

  useEffect(() => {
    if (defaultActive) setActive(defaultActive);
  }, [defaultActive]);

  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    "page.tsx": FileText,
    "layout.tsx": Layout,
    "globals.css": Hash,
    "components": Folder,
  };

  const colorMap: Record<string, string> = {
    "page.tsx": "#60a5fa",
    "layout.tsx": "#fbbf24",
    "globals.css": "#93c5fd",
    "components": "#4ade80",
  };

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#3b82f6";
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : "#1e1e1e";

  return (
    <div className={cn("w-full max-w-lg border border-neutral-800 rounded-t-lg overflow-hidden", className)} style={{ backgroundColor: bgRgb }}>
        <div className="flex text-xs">
            {tabs.map((tab) => {
                const Icon = iconMap[tab] || FileText;
                const iconColor = colorMap[tab] || "#60a5fa";
                return (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 border-r border-neutral-800 transition-colors",
                            active === tab 
                                ? "bg-[#1e1e1e] text-white border-t-2" 
                                : "bg-[#2d2d2d] text-neutral-500 hover:bg-[#2a2a2b] hover:text-neutral-300 border-t-2 border-t-transparent"
                        )}
                        style={active === tab ? { borderTopColor: activeRgb, backgroundColor: bgRgb } : { backgroundColor: "#2d2d2d" }}
                    >
                        <Icon size={14} style={{ color: iconColor }} />
                        {tab}
                    </button>
                )
            })}
        </div>
        <div className="p-4 h-24 border-t border-neutral-800" style={{ backgroundColor: bgRgb }} />
    </div>
  );
};

// Export tabs components by name for playground
const tabsComponentMap: Record<string, React.FC<any>> = {
  "SimpleUnderlineTabs": SimpleUnderlineTabs,
  "PillTabs": PillTabs,
  "SegmentedTabs": SegmentedTabs,
  "IconTabs": IconTabs,
  "VerticalTabs": VerticalTabs,
  "FloatingTabs": FloatingTabs,
  "FolderTabs": FolderTabs,
  "NeonTabs": NeonTabs,
  "MinimalTextTabs": MinimalTextTabs,
  "BoxTabs": BoxTabs,
  "GradientTabs": GradientTabs,
  "GlassTabs": GlassTabs,
  "RetroTabs": RetroTabs,
  "StatusTabs": StatusTabs,
  "CircleTabs": CircleTabs,
  "ArrowTabs": ArrowTabs,
  "AnimatedUnderlineTabs": AnimatedUnderlineTabs,
  "CardStackTabs": CardStackTabs,
  "MobileTabBar": MobileTabBar,
  "CodeFileTabs": CodeFileTabs,
};

export const tabsComponentsByName = tabsSections.reduce<Record<string, React.FC<any>>>(
  (acc, tab) => {
    acc[tab.componentName] = tabsComponentMap[tab.componentName];
    return acc;
  },
  {}
);


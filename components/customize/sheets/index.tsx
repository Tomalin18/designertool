"use client"

import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  ShoppingBag, 
  Filter, 
  Sliders, 
  Check, 
  Search, 
  MoreVertical, 
  Share2, 
  Heart, 
  MessageCircle, 
  Trash2, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Video, 
  List, 
  LogOut, 
  Plus, 
  Minus,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  Zap,
  Github,
  Code
} from "lucide-react";
import { ShinyButton } from "../ShinyButton";
import { sheetSections } from "@/lib/sheet-sections";

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
const processColor = (color: string | undefined, defaultColor?: string): string | undefined => {
  if (!color || color.trim() === "") return defaultColor;
  return color.startsWith("rgb") ? color : (hexToRgb(color) || color);
};

// Helper Frame to simulate viewport
interface SheetFrameProps {
  children: React.ReactNode;
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
}

const SheetFrame = ({ 
  children, 
  className, 
  position = "right", 
  overlay = true,
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius,
  width,
  padding
}: SheetFrameProps) => {
  // SheetFrame now just passes through children without wrapping
  // All styling should be handled by the Sheet component itself
  return <>{children}</>;
};

// 1. Standard Right Sheet
export interface StandardRightSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  fullName?: string;
  bio?: string;
  cancelText?: string;
  saveText?: string;
}

export const StandardRightSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor = "#e5e5e5",
  borderWidth = 0,
  borderRadius = 0,
  width = 320,
  padding = 24,
  title = "Edit Profile",
  fullName = "Alex Morgan",
  bio = "Product Designer based in SF.",
  cancelText = "Cancel",
  saveText = "Save",
}: StandardRightSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#e5e5e5");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full flex flex-col border-l border-neutral-200"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
          padding: `${padding}px`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 
            className="text-lg font-bold"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title}
          </h3>
          <button 
            className="text-neutral-400 hover:text-neutral-600"
            style={textRgb ? { color: textRgb } : {}}
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <label 
              className="text-xs font-bold uppercase text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              Full Name
            </label>
            <input 
              className="w-full rounded-lg border border-neutral-200 p-2 text-sm text-neutral-900 outline-none focus:border-black" 
              defaultValue={fullName}
              style={{
                ...(borderRgb && { borderColor: borderRgb }),
                ...(textRgb && { color: textRgb }),
              }}
            />
          </div>
          <div className="space-y-1">
            <label 
              className="text-xs font-bold uppercase text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              Bio
            </label>
            <textarea 
              className="w-full h-24 rounded-lg border border-neutral-200 p-2 text-sm text-neutral-900 outline-none focus:border-black resize-none" 
              defaultValue={bio}
              style={{
                ...(borderRgb && { borderColor: borderRgb }),
                ...(textRgb && { color: textRgb }),
              }}
            />
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-end gap-3">
          <button 
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900"
            style={textRgb ? { color: textRgb } : {}}
          >
            {cancelText}
          </button>
          <button 
            className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800"
          >
            {saveText}
          </button>
        </div>
      </div>
    </SheetFrame>
  );
};

// 2. Bottom Sheet (Mobile Style)
export interface BottomSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  subtitle?: string;
  cancelText?: string;
}

export const BottomSheet = ({
  className,
  position = "bottom",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor,
  borderWidth = 0,
  borderRadius = 24,
  width,
  padding = 24,
  title = "Share this shot",
  subtitle = "Design System v2.0",
  cancelText = "Cancel",
}: BottomSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="flex h-[300px] w-full flex-col rounded-t-3xl"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRadius && borderRadius > 0 && { borderRadius: `${borderRadius}px ${borderRadius}px 0 0` }),
          padding: `${padding}px`,
        }}
      >
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-neutral-200" />
        <div className="mb-6 flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-neutral-100 object-cover" />
          <div>
            <h3 
              className="text-lg font-bold"
              style={textRgb ? { color: textRgb } : {}}
            >
              {title}
            </h3>
            <p 
              className="text-sm text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { l: "Copy", i: <FileText size={24} /> },
            { l: "Twitter", i: <Share2 size={24} /> },
            { l: "Email", i: <MessageCircle size={24} /> },
            { l: "More", i: <MoreVertical size={24} /> }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                style={textRgb ? { color: textRgb } : {}}
              >
                {item.i}
              </div>
              <span 
                className="text-xs text-neutral-500"
                style={textRgb ? { color: textRgb } : {}}
              >
                {item.l}
              </span>
            </div>
          ))}
        </div>
        <button 
          className="mt-auto w-full rounded-xl bg-neutral-100 py-3 text-sm font-bold text-neutral-900 hover:bg-neutral-200"
          style={textRgb ? { color: textRgb } : {}}
        >
          {cancelText}
        </button>
      </div>
    </SheetFrame>
  );
};

// 3. Glassmorphism Sheet
export interface GlassSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  menuItems?: string;
  planName?: string;
  planStatus?: string;
}

export const GlassSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor,
  textColor = "#ffffff",
  borderColor = "#ffffff",
  borderWidth = 0,
  borderRadius = 0,
  width = 320,
  padding = 24,
  title = "Settings",
  menuItems = "General\nAppearance\nPrivacy\nNotifications",
  planName = "Pro Plan",
  planStatus = "Active",
}: GlassSheetProps) => {
  const textRgb = processColor(textColor, "#ffffff");
  const borderRgb = processColor(borderColor, "#ffffff");
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full border-l border-white/20 bg-white/10 backdrop-blur-xl flex flex-col"
        style={{
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
          padding: `${padding}px`,
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 
            className="text-xl font-light"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title}
          </h3>
          <button 
            className="hover:bg-white/10 rounded-full p-1 transition-colors"
            style={textRgb ? { color: textRgb } : {}}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-2">
          {menuItemsList.map((item, i) => (
            <button 
              key={i} 
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-white/10 transition-colors"
              style={textRgb ? { color: textRgb } : {}}
            >
              {item}
              <ChevronRight size={16} className="opacity-50" />
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-white/5 p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500" />
            <div>
              <div 
                className="text-sm font-bold"
                style={textRgb ? { color: textRgb } : {}}
              >
                {planName}
              </div>
              <div 
                className="text-xs opacity-70"
                style={textRgb ? { color: textRgb } : {}}
              >
                {planStatus}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 4. Dark Mode Details
export interface DarkDetailsSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  subtitle?: string;
  fileName?: string;
  dimensions?: string;
  fileSize?: string;
  tags?: string;
  downloadText?: string;
}

export const DarkDetailsSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#0F1115",
  textColor = "#e5e5e5",
  borderColor = "#262626",
  borderWidth = 0,
  borderRadius = 0,
  width = 384,
  padding = 24,
  title = "Abstract Waves",
  subtitle = "Uploaded by Alex • 2m ago",
  fileName = "IMG_0291.jpg",
  dimensions = "1920 x 1080",
  fileSize = "2.4 MB",
  tags = "Design\nAbstract\nWallpaper\n4K",
  downloadText = "Download",
}: DarkDetailsSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#0F1115");
  const textRgb = processColor(textColor, "#e5e5e5");
  const borderRgb = processColor(borderColor, "#262626");
  const tagsList = tags ? tags.split("\n").filter(tag => tag.trim() !== "") : [];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full border-l border-neutral-800 flex flex-col"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div className="h-48 bg-neutral-800 relative">
          <div className="absolute top-4 left-4 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur-sm text-white font-mono">
            {fileName}
          </div>
          <button className="absolute top-4 right-4 rounded-full bg-black/50 p-2 hover:bg-black/70 text-white">
            <X size={16} />
          </button>
        </div>
        <div 
          className="p-6 flex-1 space-y-6"
          style={{ padding: `${padding}px` }}
        >
          <div>
            <h3 
              className="text-lg font-bold text-white mb-1"
              style={textRgb ? { color: textRgb } : {}}
            >
              {title}
            </h3>
            <p 
              className="text-sm text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              {subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="rounded-lg bg-neutral-900 p-3 border border-neutral-800"
              style={{
                ...(borderRgb && { borderColor: borderRgb }),
              }}
            >
              <span 
                className="block text-xs text-neutral-500 mb-1"
                style={textRgb ? { color: textRgb } : {}}
              >
                Dimensions
              </span>
              <span 
                className="text-sm font-mono"
                style={textRgb ? { color: textRgb } : {}}
              >
                {dimensions}
              </span>
            </div>
            <div 
              className="rounded-lg bg-neutral-900 p-3 border border-neutral-800"
              style={{
                ...(borderRgb && { borderColor: borderRgb }),
              }}
            >
              <span 
                className="block text-xs text-neutral-500 mb-1"
                style={textRgb ? { color: textRgb } : {}}
              >
                Size
              </span>
              <span 
                className="text-sm font-mono"
                style={textRgb ? { color: textRgb } : {}}
              >
                {fileSize}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label 
              className="text-xs font-bold uppercase text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tagsList.map(tag => (
                <span 
                  key={tag} 
                  className="rounded-full bg-neutral-800 border border-neutral-700 px-3 py-1 text-xs text-neutral-300"
                  style={{
                    ...(borderRgb && { borderColor: borderRgb }),
                    ...(textRgb ? { color: textRgb } : {}),
                  }}
                >
                  {tag}
                </span>
              ))}
              <button 
                className="rounded-full border border-dashed border-neutral-600 px-3 py-1 text-xs text-neutral-500 hover:text-white hover:border-neutral-400"
                style={textRgb ? { color: textRgb } : {}}
              >
                + Add
              </button>
            </div>
          </div>
        </div>
        <div 
          className="p-4 border-t border-neutral-800 flex gap-2"
          style={{
            ...(borderRgb && { borderTopColor: borderRgb }),
          }}
        >
          <button className="flex-1 rounded-lg bg-indigo-600 py-2 text-sm font-bold text-white hover:bg-indigo-500">
            {downloadText}
          </button>
          <button 
            className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-400"
            style={{
              ...(borderRgb && { borderColor: borderRgb }),
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </SheetFrame>
  );
};

// 5. Shopping Cart
export interface CartSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  itemCount?: number;
  itemName?: string;
  itemVariant?: string;
  itemPrice?: string;
  subtotalLabel?: string;
  subtotalAmount?: string;
  checkoutText?: string;
}

export const CartSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor = "#f5f5f5",
  borderWidth = 0,
  borderRadius = 0,
  width = 384,
  padding = 24,
  title = "Your Cart",
  itemCount = 3,
  itemName = "Minimalist Chair",
  itemVariant = "Charcoal / Wood",
  itemPrice = "$240",
  subtotalLabel = "Subtotal",
  subtotalAmount = "$720.00",
  checkoutText = "Checkout",
}: CartSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#f5f5f5");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-white flex flex-col shadow-2xl"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="p-6 border-b border-neutral-100 flex items-center justify-between bg-white z-10"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <h3 
            className="text-xl font-bold flex items-center gap-2"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title} <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">{itemCount}</span>
          </h3>
          <button 
            className="text-neutral-400 hover:text-black"
            style={textRgb ? { color: textRgb } : {}}
          >
            <X size={20} />
          </button>
        </div>
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-6"
          style={{ padding: `${padding}px` }}
        >
          {Array.from({ length: itemCount }).map((_, item) => (
            <div key={item} className="flex gap-4">
              <div className="h-20 w-20 rounded-lg bg-neutral-100 shrink-0" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 
                    className="font-bold text-sm"
                    style={textRgb ? { color: textRgb } : {}}
                  >
                    {itemName}
                  </h4>
                  <p 
                    className="text-xs text-neutral-500"
                    style={textRgb ? { color: textRgb } : {}}
                  >
                    {itemVariant}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-md border border-neutral-200 px-2 py-0.5">
                    <button className="text-xs">-</button>
                    <span className="text-xs font-medium">1</span>
                    <button className="text-xs">+</button>
                  </div>
                  <span 
                    className="text-sm font-bold"
                    style={textRgb ? { color: textRgb } : {}}
                  >
                    {itemPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div 
          className="p-6 border-t border-neutral-100 bg-neutral-50"
          style={{
            ...(borderRgb && { borderTopColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <div className="flex justify-between mb-4">
            <span 
              className="text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              {subtotalLabel}
            </span>
            <span 
              className="font-bold"
              style={textRgb ? { color: textRgb } : {}}
            >
              {subtotalAmount}
            </span>
          </div>
          <button className="w-full rounded-xl bg-black py-3.5 text-sm font-bold text-white shadow-lg hover:bg-neutral-800">
            {checkoutText}
          </button>
        </div>
      </div>
    </SheetFrame>
  );
};

// 6. Filter Panel
export interface FilterSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  resetText?: string;
  priceRangeMin?: string;
  priceRangeMax?: string;
  categories?: string;
  resultsText?: string;
}

export const FilterSheet = ({
  className,
  position = "left",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor = "#e5e5e5",
  borderWidth = 0,
  borderRadius = 0,
  width = 288,
  padding = 24,
  title = "Filters",
  resetText = "Reset",
  priceRangeMin = "$50",
  priceRangeMax = "$200",
  categories = "Furniture\nLighting\nAccessories\nArt",
  resultsText = "Show 24 Results",
}: FilterSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#e5e5e5");
  const categoriesList = categories ? categories.split("\n").filter(cat => cat.trim() !== "") : [];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-white p-6 border-r border-neutral-200 flex flex-col"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderRightColor: borderRgb }),
          width: `${width}px`,
          padding: `${padding}px`,
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 
            className="font-bold text-lg flex items-center gap-2"
            style={textRgb ? { color: textRgb } : {}}
          >
            <Filter size={18} /> {title}
          </h3>
          <button 
            className="text-xs text-indigo-600 font-medium hover:underline"
          >
            {resetText}
          </button>
        </div>
        
        <div className="space-y-8 flex-1 overflow-y-auto pr-2">
          <div>
            <h4 
              className="text-xs font-bold uppercase text-neutral-500 mb-3"
              style={textRgb ? { color: textRgb } : {}}
            >
              Price Range
            </h4>
            <div className="h-1 bg-neutral-200 rounded-full relative mb-4">
              <div className="absolute left-1/4 right-1/4 h-full bg-indigo-600 rounded-full" />
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-4 w-4 bg-white border-2 border-indigo-600 rounded-full shadow" />
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-4 w-4 bg-white border-2 border-indigo-600 rounded-full shadow" />
            </div>
            <div 
              className="flex justify-between text-sm text-neutral-600 font-medium"
              style={textRgb ? { color: textRgb } : {}}
            >
              <span>{priceRangeMin}</span>
              <span>{priceRangeMax}</span>
            </div>
          </div>

          <div>
            <h4 
              className="text-xs font-bold uppercase text-neutral-500 mb-3"
              style={textRgb ? { color: textRgb } : {}}
            >
              Category
            </h4>
            <div className="space-y-2">
              {categoriesList.map((cat, i) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn("h-4 w-4 rounded border flex items-center justify-center transition-colors", i===0 ? "bg-indigo-600 border-indigo-600 text-white" : "border-neutral-300 group-hover:border-indigo-400")}>
                    {i===0 && <Check size={10} />}
                  </div>
                  <span 
                    className={cn("text-sm", i===0 ? "text-neutral-900 font-medium" : "text-neutral-600")}
                    style={textRgb ? { color: textRgb } : {}}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 
              className="text-xs font-bold uppercase text-neutral-500 mb-3"
              style={textRgb ? { color: textRgb } : {}}
            >
              Colors
            </h4>
            <div className="flex flex-wrap gap-3">
              {["bg-black", "bg-neutral-500", "bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-green-500"].map((c, i) => (
                <div key={i} className={cn("h-6 w-6 rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-neutral-200", c)} />
              ))}
            </div>
          </div>
        </div>
        
        <button className="mt-4 w-full rounded-lg bg-neutral-900 py-3 text-sm font-bold text-white hover:bg-neutral-800">
          {resultsText}
        </button>
      </div>
    </SheetFrame>
  );
};

// 7. Profile / User Settings
export interface ProfileSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  profileName?: string;
  profileEmail?: string;
  menuItems?: string;
  signOutText?: string;
}

export const ProfileSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#fafafa",
  textColor = "#525252",
  borderColor = "#e5e5e5",
  borderWidth = 0,
  borderRadius = 0,
  width = 320,
  padding = 24,
  profileName = "Alex Morgan",
  profileEmail = "alex@lumina.ui",
  menuItems = "Account Details\nNotifications\nSecurity\nBilling",
  signOutText = "Sign Out",
}: ProfileSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#fafafa");
  const textRgb = processColor(textColor, "#525252");
  const borderRgb = processColor(borderColor, "#e5e5e5");
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];
  const menuIcons = [User, Bell, Shield, CreditCard];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-neutral-50 flex flex-col border-l border-neutral-200"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="bg-white p-6 border-b border-neutral-200 text-center"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <div className="relative mx-auto mb-4 h-20 w-20">
            <div className="h-full w-full rounded-full bg-neutral-200" />
            <button className="absolute bottom-0 right-0 rounded-full bg-indigo-600 p-1.5 text-white border-2 border-white hover:bg-indigo-500">
              <ImageIcon size={12} />
            </button>
          </div>
          <h3 
            className="font-bold"
            style={textRgb ? { color: textRgb } : {}}
          >
            {profileName}
          </h3>
          <p 
            className="text-xs text-neutral-500"
            style={textRgb ? { color: textRgb } : {}}
          >
            {profileEmail}
          </p>
        </div>
        
        <div 
          className="p-4 space-y-1"
          style={{ padding: `${padding}px` }}
        >
          {menuItemsList.map((item, i) => {
            const Icon = menuIcons[i] || User;
            return (
              <button 
                key={item} 
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-3 text-sm font-medium",
                  i === 0 ? "bg-white shadow-sm border border-neutral-200" : "hover:bg-neutral-200/50"
                )}
                style={{
                  ...(i === 0 && textRgb ? { color: textRgb } : {}),
                  ...(i !== 0 && textRgb ? { color: textRgb } : {}),
                }}
              >
                <Icon size={18} className="text-neutral-400" /> {item}
              </button>
            );
          })}
        </div>

        <div 
          className="mt-auto p-4 border-t border-neutral-200"
          style={{
            ...(borderRgb && { borderTopColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <button 
            className="flex w-full items-center gap-2 rounded-lg p-3 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} /> {signOutText}
          </button>
        </div>
      </div>
    </SheetFrame>
  );
};

// 8. Navigation Drawer (Hamburger)
export interface NavDrawerProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  logoText?: string;
  brandName?: string;
  menuItems?: string;
  storageLabel?: string;
  storageText?: string;
  activeColor?: string;
}

export const NavDrawer = ({
  className,
  position = "left",
  overlay = true,
  backgroundColor = "#1a1a1a",
  textColor = "#ffffff",
  borderColor,
  borderWidth = 0,
  borderRadius = 0,
  width = 256,
  padding = 24,
  logoText = "L",
  brandName = "Lumina",
  menuItems = "Dashboard\nProjects\nTeam\nCalendar\nReports",
  storageLabel = "Storage",
  storageText = "7.5GB of 10GB used",
  activeColor = "#6366f1",
}: NavDrawerProps) => {
  const bgRgb = processColor(backgroundColor, "#1a1a1a");
  const textRgb = processColor(textColor, "#ffffff");
  const activeRgb = processColor(activeColor, "#6366f1");
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-[#1a1a1a] text-white p-6 flex flex-col"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(textRgb && { color: textRgb }),
          width: `${width}px`,
          padding: `${padding}px`,
        }}
      >
        <div className="mb-10 flex items-center gap-3 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 bg-white text-black flex items-center justify-center rounded">
            {logoText}
          </div>
          {brandName}
        </div>
        
        <nav className="space-y-1 flex-1">
          {menuItemsList.map((item, i) => (
            <a 
              key={item} 
              href="#" 
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                i===0 ? "bg-indigo-600 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
              style={i === 0 && activeRgb ? { backgroundColor: activeRgb } : {}}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="bg-neutral-900 rounded-xl p-4 mt-4">
          <div 
            className="text-xs font-bold text-neutral-500 mb-2 uppercase"
            style={textRgb ? { color: textRgb } : {}}
          >
            {storageLabel}
          </div>
          <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-2">
            <div className="h-full w-3/4 bg-white rounded-full" />
          </div>
          <div 
            className="text-xs text-neutral-400"
            style={textRgb ? { color: textRgb } : {}}
          >
            {storageText}
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 9. Music Player Bar
export interface MusicSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  trackTitle?: string;
  artistName?: string;
  currentTime?: string;
  totalTime?: string;
}

export const MusicSheet = ({
  className,
  position = "bottom",
  overlay = false,
  backgroundColor = "#171717",
  textColor = "#ffffff",
  borderColor = "#262626",
  borderWidth = 0,
  borderRadius = 0,
  width,
  padding = 24,
  trackTitle = "Midnight City",
  artistName = "M83",
  currentTime = "1:20",
  totalTime = "4:03",
}: MusicSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#171717");
  const textRgb = processColor(textColor, "#ffffff");
  const borderRgb = processColor(borderColor, "#262626");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-24 w-full border-t border-neutral-800 px-6 flex items-center justify-between"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderTopColor: borderRgb }),
          padding: `${padding}px`,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded bg-neutral-800 relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
              <ChevronLeft size={20} className="rotate-90 text-white" />
            </div>
          </div>
          <div>
            <h4 
              className="text-sm font-bold"
              style={textRgb ? { color: textRgb } : {}}
            >
              {trackTitle}
            </h4>
            <p 
              className="text-xs text-neutral-400"
              style={textRgb ? { color: textRgb } : {}}
            >
              {artistName}
            </p>
          </div>
          <Heart size={18} className="text-neutral-500 hover:text-white ml-2 cursor-pointer" />
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-lg mx-8">
          <div className="flex items-center gap-6">
            <button className="text-neutral-400 hover:text-white"><List size={16} /></button>
            <button className="text-white hover:scale-110 transition-transform"><Video size={24} className="fill-current" /></button>
            <button className="text-neutral-400 hover:text-white"><List size={16} /></button>
          </div>
          <div 
            className="w-full flex items-center gap-3 text-[10px] text-neutral-500 font-mono"
            style={textRgb ? { color: textRgb } : {}}
          >
            <span>{currentTime}</span>
            <div className="h-1 flex-1 bg-neutral-800 rounded-full relative group cursor-pointer">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full" />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span>{totalTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Music size={16} className="text-neutral-400" />
            <div className="h-1 w-20 bg-neutral-800 rounded-full">
              <div className="h-full w-2/3 bg-neutral-500 hover:bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 10. Notification Feed
export interface NotificationSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  markAllReadText?: string;
  notificationCount?: number;
}

export const NotificationSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor = "#e5e5e5",
  borderWidth = 0,
  borderRadius = 0,
  width = 320,
  padding = 16,
  title = "Notifications",
  markAllReadText = "Mark all read",
  notificationCount = 5,
}: NotificationSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#e5e5e5");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-white border-l border-neutral-200 flex flex-col"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="p-4 border-b border-neutral-100 flex items-center justify-between"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <h3 
            className="font-bold"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title}
          </h3>
          <button className="text-xs text-indigo-600 font-medium hover:underline">
            {markAllReadText}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {Array.from({ length: notificationCount }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer",
                i < 3 && "bg-blue-50/50"
              )}
              style={{
                ...(borderRgb && { borderBottomColor: borderRgb }),
                padding: `${padding}px`,
              }}
            >
              <div className="flex gap-3">
                <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0", i%2===0 ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600")}>
                  {i%2===0 ? <MessageCircle size={14} /> : <Check size={14} />}
                </div>
                <div>
                  <p 
                    className="text-sm leading-snug"
                    style={textRgb ? { color: textRgb } : {}}
                  >
                    <span className="font-bold">Sarah</span> commented on <span className="font-medium">Design System</span>
                  </p>
                  <p 
                    className="text-xs text-neutral-500 mt-1"
                    style={textRgb ? { color: textRgb } : {}}
                  >
                    2 hours ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SheetFrame>
  );
};

// 11. Chat Thread
export interface ChatSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  participantCount?: string;
  placeholder?: string;
  sendText?: string;
}

export const ChatSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor = "#e5e5e5",
  borderWidth = 0,
  borderRadius = 0,
  width = 384,
  padding = 16,
  title = "Design Sync",
  participantCount = "3 participants",
  placeholder = "Type a message...",
  sendText = "SEND",
}: ChatSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#e5e5e5");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-white border-l border-neutral-200 flex flex-col shadow-xl"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <div>
            <h3 
              className="font-bold text-sm"
              style={textRgb ? { color: textRgb } : {}}
            >
              {title}
            </h3>
            <p 
              className="text-xs text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              {participantCount}
            </p>
          </div>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="h-6 w-6 rounded-full bg-neutral-300 border-2 border-white" />)}
          </div>
        </div>
        <div 
          className="flex-1 p-4 space-y-4 overflow-y-auto bg-neutral-50/50"
          style={{ padding: `${padding}px` }}
        >
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100" />
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm max-w-[80%]">
              <p>Hey team, just uploaded the new icons.</p>
            </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
            <div className="h-8 w-8 rounded-full bg-indigo-100" />
            <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-white max-w-[80%]">
              <p>Awesome! Taking a look now. 🚀</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100" />
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 text-sm max-w-[80%]">
              <p>Let me know if you need any tweaks.</p>
            </div>
          </div>
        </div>
        <div 
          className="p-4 bg-white border-t border-neutral-200"
          style={{
            ...(borderRgb && { borderTopColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2">
            <input 
              className="flex-1 bg-transparent text-sm outline-none" 
              placeholder={placeholder}
              style={textRgb ? { color: textRgb } : {}}
            />
            <button className="text-indigo-600 font-bold text-xs">{sendText}</button>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 12. Brutalist Sheet
export interface BrutalistSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  menuItems?: string;
  footerText?: string;
}

export const BrutalistSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#facc15",
  textColor = "#000000",
  borderColor = "#000000",
  borderWidth = 4,
  borderRadius = 0,
  width = 384,
  padding = 32,
  title = "Menu",
  menuItems = "Home\nShop\nAbout\nContact",
  footerText = "EST. 2024",
}: BrutalistSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#facc15");
  const textRgb = processColor(textColor, "#000000");
  const borderRgb = processColor(borderColor, "#000000");
  const menuItemsList = menuItems ? menuItems.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full border-l-4 border-black p-8 flex flex-col shadow-[-10px_0_0_rgba(0,0,0,0.1)]"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && borderWidth && borderWidth > 0 && {
            borderLeftColor: borderRgb,
            borderLeftWidth: `${borderWidth}px`,
            borderLeftStyle: "solid"
          }),
          width: `${width}px`,
          padding: `${padding}px`,
        }}
      >
        <div 
          className="border-4 border-black bg-white p-4 mb-8 shadow-[4px_4px_0px_#000]"
          style={{
            ...(borderRgb && { borderColor: borderRgb }),
          }}
        >
          <h1 
            className="text-3xl font-black uppercase italic"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title}
          </h1>
        </div>
        <nav className="space-y-4">
          {menuItemsList.map((item) => (
            <a 
              key={item} 
              href="#" 
              className="block border-4 border-black bg-white px-6 py-3 text-xl font-bold uppercase hover:bg-black hover:text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_#000] transition-all"
              style={{
                ...(borderRgb && { borderColor: borderRgb }),
                ...(textRgb ? { color: textRgb } : {}),
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <div 
            className="border-4 border-black bg-black text-white p-4 text-center font-bold"
            style={{
              ...(borderRgb && { borderColor: borderRgb }),
            }}
          >
            {footerText}
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 13. Floating Island Sheet
export interface FloatingSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  description?: string;
  features?: string;
  upgradeText?: string;
  laterText?: string;
  buttonColor?: string;
}

export const FloatingSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor,
  borderWidth = 0,
  borderRadius = 24,
  width = 320,
  padding = 24,
  title = "Upgrade to Pro",
  description = "Get unlimited access to all features.",
  features = "Feature number 1 included\nFeature number 2 included\nFeature number 3 included",
  upgradeText = "Upgrade Now",
  laterText = "Maybe Later",
  buttonColor = "#2563eb",
}: FloatingSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const buttonRgb = processColor(buttonColor, "#2563eb");
  const featuresList = features ? features.split("\n").filter(f => f.trim() !== "") : [];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div className="h-full flex items-center pr-6">
        <div 
          className="w-80 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5 scale-100 opacity-100"
          style={{
            ...(bgRgb && { backgroundColor: bgRgb }),
            ...(borderRadius && borderRadius > 0 && { borderRadius: `${borderRadius}px` }),
            padding: `${padding}px`,
          }}
        >
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Zap size={32} />
            </div>
            <h3 
              className="text-xl font-bold"
              style={textRgb ? { color: textRgb } : {}}
            >
              {title}
            </h3>
            <p 
              className="mt-2 text-sm text-neutral-500"
              style={textRgb ? { color: textRgb } : {}}
            >
              {description}
            </p>
          </div>
          <ul className="space-y-3 mb-8">
            {featuresList.map((feature, i) => (
              <li 
                key={i} 
                className="flex items-center gap-3 text-sm text-neutral-600"
                style={textRgb ? { color: textRgb } : {}}
              >
                <Check size={16} className="text-green-500" /> {feature}
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <button 
              className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg hover:opacity-90"
              style={buttonRgb ? { backgroundColor: buttonRgb } : {}}
            >
              {upgradeText}
            </button>
            <button 
              className="w-full py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900"
              style={textRgb ? { color: textRgb } : {}}
            >
              {laterText}
            </button>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 14. Full Screen Sheet
export interface FullScreenSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  saveText?: string;
  eventTitlePlaceholder?: string;
  timeLabel?: string;
  timeValue?: string;
  locationLabel?: string;
  locationPlaceholder?: string;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
}

export const FullScreenSheet = ({
  className,
  position = "bottom",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor = "#f5f5f5",
  borderWidth = 0,
  borderRadius = 0,
  width,
  padding = 24,
  title = "Create New Event",
  saveText = "Save",
  eventTitlePlaceholder = "Event Title",
  timeLabel = "Time",
  timeValue = "All day",
  locationLabel = "Location",
  locationPlaceholder = "Add location",
  descriptionLabel = "Description",
  descriptionPlaceholder = "Add description",
}: FullScreenSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#f5f5f5");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full w-full flex flex-col"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
        }}
      >
        <div 
          className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <button 
            className="font-bold"
            style={textRgb ? { color: textRgb } : {}}
          >
            <X />
          </button>
          <span 
            className="font-bold"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title}
          </span>
          <button className="text-blue-600 font-bold">{saveText}</button>
        </div>
        <div 
          className="flex-1 p-6 max-w-2xl mx-auto w-full space-y-8"
          style={{ padding: `${padding}px` }}
        >
          <input 
            className="text-4xl font-bold placeholder-neutral-300 outline-none w-full" 
            placeholder={eventTitlePlaceholder}
            style={textRgb ? { color: textRgb } : {}}
          />
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-neutral-600">
              <Clock />
              <div className="flex-1 border-b border-neutral-200 pb-2">
                <span 
                  className="block text-xs font-bold uppercase text-neutral-400"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  {timeLabel}
                </span>
                {timeValue}
              </div>
            </div>
            <div className="flex items-center gap-4 text-neutral-600">
              <MapPin />
              <div className="flex-1 border-b border-neutral-200 pb-2">
                <span 
                  className="block text-xs font-bold uppercase text-neutral-400"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  {locationLabel}
                </span>
                {locationPlaceholder}
              </div>
            </div>
            <div className="flex items-center gap-4 text-neutral-600">
              <FileText />
              <div className="flex-1 border-b border-neutral-200 pb-2">
                <span 
                  className="block text-xs font-bold uppercase text-neutral-400"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  {descriptionLabel}
                </span>
                {descriptionPlaceholder}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 15. Contextual Info (Sidebar style)
export interface ContextualSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  propertiesTitle?: string;
  statusLabel?: string;
  statusValue?: string;
  assigneeLabel?: string;
  assigneeName?: string;
  datesLabel?: string;
  datesValue?: string;
  historyTitle?: string;
}

export const ContextualSheet = ({
  className,
  position = "right",
  overlay = false,
  backgroundColor = "#fafafa",
  textColor = "#171717",
  borderColor = "#e5e5e5",
  borderWidth = 0,
  borderRadius = 0,
  width = 288,
  padding = 24,
  propertiesTitle = "Properties",
  statusLabel = "Status",
  statusValue = "Published",
  assigneeLabel = "Assignee",
  assigneeName = "Alex Morgan",
  datesLabel = "Dates",
  datesValue = "Oct 24 - Nov 02",
  historyTitle = "History",
}: ContextualSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#fafafa");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#e5e5e5");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full w-72 border-l border-neutral-200 overflow-y-auto"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
          padding: `${padding}px`,
        }}
      >
        <h4 
          className="text-xs font-bold uppercase text-neutral-500 mb-4"
          style={textRgb ? { color: textRgb } : {}}
        >
          {propertiesTitle}
        </h4>
        
        <div className="space-y-6">
          <div>
            <label 
              className="text-xs font-medium text-neutral-700 block mb-1"
              style={textRgb ? { color: textRgb } : {}}
            >
              {statusLabel}
            </label>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              <div className="h-1.5 w-1.5 rounded-full bg-green-600" /> {statusValue}
            </div>
          </div>
          
          <div>
            <label 
              className="text-xs font-medium text-neutral-700 block mb-1"
              style={textRgb ? { color: textRgb } : {}}
            >
              {assigneeLabel}
            </label>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-neutral-300" />
              <span 
                className="text-sm"
                style={textRgb ? { color: textRgb } : {}}
              >
                {assigneeName}
              </span>
            </div>
          </div>

          <div>
            <label 
              className="text-xs font-medium text-neutral-700 block mb-1"
              style={textRgb ? { color: textRgb } : {}}
            >
              {datesLabel}
            </label>
            <div 
              className="text-sm text-neutral-600"
              style={textRgb ? { color: textRgb } : {}}
            >
              {datesValue}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <h4 
              className="text-xs font-bold uppercase text-neutral-500 mb-2"
              style={textRgb ? { color: textRgb } : {}}
            >
              {historyTitle}
            </h4>
            <div className="space-y-3 pl-2 border-l border-neutral-200">
              <div className="relative pl-4 text-xs">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-neutral-300" />
                <span className="font-bold">Alex</span> changed status to Done
                <div className="text-neutral-400">2m ago</div>
              </div>
              <div className="relative pl-4 text-xs">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-neutral-300" />
                <span className="font-bold">Sarah</span> created task
                <div className="text-neutral-400">1h ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// 16. Linear Issue View
export interface TaskDetailSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  issueId?: string;
  priority?: string;
  title?: string;
  assigneeName?: string;
  status?: string;
  description?: string;
  checklistItems?: string;
  commentPlaceholder?: string;
}

export const TaskDetailSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#1C1C1F",
  textColor = "#E3E3E8",
  borderColor = "#2E2E33",
  borderWidth = 0,
  borderRadius = 0,
  width = 500,
  padding = 24,
  issueId = "LUM-342",
  priority = "High Priority",
  title = "Fix alignment on mobile navigation",
  assigneeName = "Sarah",
  status = "In Progress",
  description = "The navigation bar is overlapping with the logo on screens smaller than 375px. We need to adjust the padding and potentially hide the text labels.",
  checklistItems = "Check iPhone SE layout\nUpdate Tailwind classes\nVerify touch targets",
  commentPlaceholder = "Add a comment...",
}: TaskDetailSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#1C1C1F");
  const textRgb = processColor(textColor, "#E3E3E8");
  const borderRgb = processColor(borderColor, "#2E2E33");
  const checklistList = checklistItems ? checklistItems.split("\n").filter(item => item.trim() !== "") : [];

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-[#1C1C1F] border-l border-[#2E2E33] flex flex-col"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="px-6 py-4 border-b border-[#2E2E33] flex justify-between items-center"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <div className="flex gap-2 text-xs text-[#8A8A93] font-mono">
            <span>{issueId}</span>
            <span>•</span>
            <span>{priority}</span>
          </div>
          <div className="flex gap-2 text-[#8A8A93]">
            <button className="hover:text-white"><Share2 size={16} /></button>
            <button className="hover:text-white"><MoreVertical size={16} /></button>
            <button className="hover:text-white"><X size={16} /></button>
          </div>
        </div>
        <div 
          className="p-6 flex-1 overflow-y-auto"
          style={{ padding: `${padding}px` }}
        >
          <h2 
            className="text-xl font-medium mb-4"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title}
          </h2>
          <div className="flex gap-3 mb-8">
            <div className="flex items-center gap-2 rounded bg-[#2E2E33] px-2 py-1 text-xs text-[#8A8A93]">
              <div className="h-4 w-4 rounded-full bg-purple-500" /> {assigneeName}
            </div>
            <div className="flex items-center gap-2 rounded bg-[#2E2E33] px-2 py-1 text-xs text-[#8A8A93]">
              <Zap size={12} /> {status}
            </div>
          </div>
          <div className="prose prose-invert prose-sm text-[#B4B4BB]">
            <p style={textRgb ? { color: textRgb } : {}}>{description}</p>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              {checklistList.map((item, i) => (
                <li key={i} style={textRgb ? { color: textRgb } : {}}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div 
          className="p-4 border-t border-[#2E2E33] bg-[#222226]"
          style={{
            ...(borderRgb && { borderTopColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <input 
            className="w-full bg-transparent text-sm placeholder-[#5F5F66] outline-none" 
            placeholder={commentPlaceholder}
            style={textRgb ? { color: textRgb } : {}}
          />
        </div>
      </div>
    </SheetFrame>
  );
};

// 17. Config / Code Editor
export interface ConfigSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  fileName?: string;
  resetText?: string;
  saveText?: string;
}

export const ConfigSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#1e1e1e",
  textColor = "#ffffff",
  borderColor = "#333333",
  borderWidth = 0,
  borderRadius = 0,
  width = 384,
  padding = 16,
  fileName = "tailwind.config.js",
  resetText = "Reset",
  saveText = "Save Changes",
}: ConfigSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#1e1e1e");
  const textRgb = processColor(textColor, "#ffffff");
  const borderRgb = processColor(borderColor, "#333333");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-[#1e1e1e] flex flex-col border-l border-[#333]"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
          }}
        >
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <FileText size={14} className="text-blue-400" /> {fileName}
          </div>
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
        </div>
        <div 
          className="flex-1 p-4 font-mono text-sm overflow-y-auto"
          style={{
            ...(textRgb && { color: textRgb }),
            padding: `${padding}px`,
          }}
        >
          <div className="text-blue-400">module<span className="text-white">.</span>exports <span className="text-white">=</span> <span className="text-yellow-400">{`{`}</span></div>
          <div className="pl-4 text-sky-300">theme<span className="text-white">:</span> <span className="text-yellow-400">{`{`}</span></div>
          <div className="pl-8 text-sky-300">extend<span className="text-white">:</span> <span className="text-yellow-400">{`{`}</span></div>
          <div className="pl-12 text-sky-300">colors<span className="text-white">:</span> <span className="text-yellow-400">{`{`}</span></div>
          <div className="pl-16 text-sky-300">primary<span className="text-white">:</span> <span className="text-orange-400">"#4F46E5"</span><span className="text-white">,</span></div>
          <div className="pl-16 text-sky-300">secondary<span className="text-white">:</span> <span className="text-orange-400">"#EC4899"</span></div>
          <div className="pl-12 text-yellow-400">{`}`}</div>
          <div className="pl-8 text-yellow-400">{`}`}</div>
          <div className="pl-4 text-yellow-400">{`}`}</div>
          <div className="text-yellow-400">{`}`}</div>
        </div>
        <div 
          className="p-3 border-t border-[#333] flex justify-end gap-3"
          style={{
            ...(borderRgb && { borderTopColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <button 
            className="text-xs text-neutral-400 hover:text-white"
            style={textRgb ? { color: textRgb } : {}}
          >
            {resetText}
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs">
            {saveText}
          </button>
        </div>
      </div>
    </SheetFrame>
  );
};

// 18. Multi-step Form
export interface MultiStepSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  stepNumber?: number;
  totalSteps?: number;
  projectNameLabel?: string;
  projectNamePlaceholder?: string;
  teamLabel?: string;
  privacyLabel?: string;
  backText?: string;
  continueText?: string;
}

export const MultiStepSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#ffffff",
  textColor = "#171717",
  borderColor = "#e5e5e5",
  borderWidth = 0,
  borderRadius = 0,
  width = 384,
  padding = 32,
  title = "Project Details",
  stepNumber = 2,
  totalSteps = 3,
  projectNameLabel = "Project Name",
  projectNamePlaceholder = "e.g. Website Redesign",
  teamLabel = "Team",
  privacyLabel = "Privacy",
  backText = "Back",
  continueText = "Continue",
}: MultiStepSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#ffffff");
  const textRgb = processColor(textColor, "#171717");
  const borderRgb = processColor(borderColor, "#e5e5e5");
  const progressBars = Array.from({ length: totalSteps }, (_, i) => i < stepNumber);

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-white p-8 flex flex-col"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          width: `${width}px`,
          padding: `${padding}px`,
        }}
      >
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {progressBars.map((filled, i) => (
              <div 
                key={i} 
                className={cn("h-1.5 flex-1 rounded-full", filled ? "bg-indigo-600" : "bg-neutral-200")}
              />
            ))}
          </div>
          <h3 
            className="text-xl font-bold mb-1"
            style={textRgb ? { color: textRgb } : {}}
          >
            {title}
          </h3>
          <p 
            className="text-sm text-neutral-500"
            style={textRgb ? { color: textRgb } : {}}
          >
            Step {stepNumber} of {totalSteps}
          </p>
        </div>
        
        <div className="space-y-6 flex-1">
          <div className="space-y-1">
            <label 
              className="text-sm font-medium"
              style={textRgb ? { color: textRgb } : {}}
            >
              {projectNameLabel}
            </label>
            <input 
              className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600" 
              placeholder={projectNamePlaceholder}
              style={{
                ...(borderRgb && { borderColor: borderRgb }),
                ...(textRgb && { color: textRgb }),
              }}
            />
          </div>
          <div className="space-y-1">
            <label 
              className="text-sm font-medium"
              style={textRgb ? { color: textRgb } : {}}
            >
              {teamLabel}
            </label>
            <select 
              className="w-full rounded-lg border border-neutral-300 p-2.5 text-sm outline-none bg-white"
              style={{
                ...(borderRgb && { borderColor: borderRgb }),
                ...(textRgb && { color: textRgb }),
              }}
            >
              <option>Design Team</option>
              <option>Engineering</option>
            </select>
          </div>
          <div className="space-y-3">
            <label 
              className="text-sm font-medium"
              style={textRgb ? { color: textRgb } : {}}
            >
              {privacyLabel}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input type="radio" name="privacy" className="text-indigo-600 focus:ring-indigo-600" defaultChecked /> Public
              </label>
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input type="radio" name="privacy" className="text-indigo-600 focus:ring-indigo-600" /> Private
              </label>
            </div>
          </div>
        </div>

        <div 
          className="flex justify-between pt-6 border-t border-neutral-100"
          style={{
            ...(borderRgb && { borderTopColor: borderRgb }),
          }}
        >
          <button 
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900"
            style={textRgb ? { color: textRgb } : {}}
          >
            {backText}
          </button>
          <button className="rounded-lg bg-black px-6 py-2.5 text-sm font-bold text-white hover:bg-neutral-800">
            {continueText}
          </button>
        </div>
      </div>
    </SheetFrame>
  );
};

// 19. Media Queue
export interface MediaQueueSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  title?: string;
  currentTrack?: string;
  currentArtist?: string;
  queueCount?: number;
}

export const MediaQueueSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#171717",
  textColor = "#ffffff",
  borderColor = "#262626",
  borderWidth = 0,
  borderRadius = 0,
  width = 320,
  padding = 16,
  title = "Up Next",
  currentTrack = "Neon Lights",
  currentArtist = "Kraftwerk",
  queueCount = 4,
}: MediaQueueSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#171717");
  const textRgb = processColor(textColor, "#ffffff");
  const borderRgb = processColor(borderColor, "#262626");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-neutral-900 text-white flex flex-col border-l border-neutral-800"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="p-4 border-b border-neutral-800 font-bold text-sm uppercase tracking-wider text-neutral-400"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            ...(textRgb && { color: textRgb }),
            padding: `${padding}px`,
          }}
        >
          {title}
        </div>
        <div 
          className="flex-1 overflow-y-auto p-2 space-y-1"
          style={{ padding: `${padding}px` }}
        >
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/10">
            <div className="relative h-10 w-10 shrink-0 bg-neutral-800 rounded overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate text-green-400">{currentTrack}</div>
              <div className="text-xs text-neutral-400 truncate">{currentArtist}</div>
            </div>
          </div>
          {Array.from({ length: queueCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group">
              <div className="h-10 w-10 shrink-0 bg-neutral-800 rounded relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                  <Video size={16} fill="white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div 
                  className="text-sm font-medium truncate group-hover:text-white text-neutral-300"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  Track Name {i + 1}
                </div>
                <div 
                  className="text-xs text-neutral-500 truncate"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  Artist Name
                </div>
              </div>
              <div 
                className="text-xs text-neutral-600"
                style={textRgb ? { color: textRgb } : {}}
              >
                3:42
              </div>
            </div>
          ))}
        </div>
      </div>
    </SheetFrame>
  );
};

// 20. Crypto Wallet Sheet
export interface CryptoSheetProps {
  className?: string;
  position?: "right" | "left" | "bottom";
  overlay?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number;
  padding?: number;
  balanceLabel?: string;
  balanceAmount?: string;
  buyText?: string;
  sendText?: string;
  receiveText?: string;
  assetsTitle?: string;
  bitcoinName?: string;
  bitcoinAmount?: string;
  bitcoinValue?: string;
  bitcoinChange?: string;
  ethereumName?: string;
  ethereumAmount?: string;
  ethereumValue?: string;
  ethereumChange?: string;
}

export const CryptoSheet = ({
  className,
  position = "right",
  overlay = true,
  backgroundColor = "#121212",
  textColor = "#ffffff",
  borderColor = "#1a1a1a",
  borderWidth = 0,
  borderRadius = 0,
  width = 320,
  padding = 24,
  balanceLabel = "Total Balance",
  balanceAmount = "$12,402.55",
  buyText = "Buy",
  sendText = "Send",
  receiveText = "Receive",
  assetsTitle = "Assets",
  bitcoinName = "Bitcoin",
  bitcoinAmount = "0.42 BTC",
  bitcoinValue = "$11,200",
  bitcoinChange = "+2.4%",
  ethereumName = "Ethereum",
  ethereumAmount = "1.2 ETH",
  ethereumValue = "$2,200",
  ethereumChange = "-1.1%",
}: CryptoSheetProps) => {
  const bgRgb = processColor(backgroundColor, "#121212");
  const textRgb = processColor(textColor, "#ffffff");
  const borderRgb = processColor(borderColor, "#1a1a1a");

  return (
    <SheetFrame 
      position={position}
      overlay={overlay}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      width={width}
      padding={padding}
    >
      <div 
        className="h-full bg-[#121212] flex flex-col border-l border-white/5 text-white"
        style={{
          ...(bgRgb && { backgroundColor: bgRgb }),
          ...(borderRgb && { borderLeftColor: borderRgb }),
          width: `${width}px`,
        }}
      >
        <div 
          className="p-6 text-center border-b border-white/5 bg-gradient-to-b from-[#1a1a1a] to-[#121212]"
          style={{
            ...(borderRgb && { borderBottomColor: borderRgb }),
            padding: `${padding}px`,
          }}
        >
          <div 
            className="text-xs text-neutral-400 mb-1"
            style={textRgb ? { color: textRgb } : {}}
          >
            {balanceLabel}
          </div>
          <div 
            className="text-3xl font-bold font-mono"
            style={textRgb ? { color: textRgb } : {}}
          >
            {balanceAmount}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex flex-col items-center gap-1">
              <button className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500">
                <Plus size={20} />
              </button>
              <span 
                className="text-[10px] text-neutral-400"
                style={textRgb ? { color: textRgb } : {}}
              >
                {buyText}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700">
                <ArrowRight size={20} className="-rotate-45" />
              </button>
              <span 
                className="text-[10px] text-neutral-400"
                style={textRgb ? { color: textRgb } : {}}
              >
                {sendText}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700">
                <ArrowRight size={20} className="rotate-[135deg]" />
              </button>
              <span 
                className="text-[10px] text-neutral-400"
                style={textRgb ? { color: textRgb } : {}}
              >
                {receiveText}
              </span>
            </div>
          </div>
        </div>
        <div 
          className="flex-1 p-4 space-y-2 overflow-y-auto"
          style={{ padding: `${padding}px` }}
        >
          <div 
            className="text-xs font-bold text-neutral-500 uppercase px-2 mb-2"
            style={textRgb ? { color: textRgb } : {}}
          >
            {assetsTitle}
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xs">B</div>
              <div>
                <div 
                  className="text-sm font-bold"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  {bitcoinName}
                </div>
                <div 
                  className="text-xs text-neutral-400"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  {bitcoinAmount}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div 
                className="text-sm font-mono"
                style={textRgb ? { color: textRgb } : {}}
              >
                {bitcoinValue}
              </div>
              <div className="text-xs text-green-500">{bitcoinChange}</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">E</div>
              <div>
                <div 
                  className="text-sm font-bold"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  {ethereumName}
                </div>
                <div 
                  className="text-xs text-neutral-400"
                  style={textRgb ? { color: textRgb } : {}}
                >
                  {ethereumAmount}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div 
                className="text-sm font-mono"
                style={textRgb ? { color: textRgb } : {}}
              >
                {ethereumValue}
              </div>
              <div className="text-xs text-red-500">{ethereumChange}</div>
            </div>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
};

// Export component map for playground
export const sheetComponentsByName: Record<string, React.ComponentType<any>> = {
  StandardRightSheet,
  BottomSheet,
  GlassSheet,
  DarkDetailsSheet,
  CartSheet,
  FilterSheet,
  ProfileSheet,
  NavDrawer,
  MusicSheet,
  NotificationSheet,
  ChatSheet,
  BrutalistSheet,
  FloatingSheet,
  FullScreenSheet,
  ContextualSheet,
  TaskDetailSheet,
  ConfigSheet,
  MultiStepSheet,
  MediaQueueSheet,
  CryptoSheet,
};


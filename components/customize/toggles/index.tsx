"use client"

import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { 
  Sun, 
  Moon, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  Power, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff 
} from "lucide-react";
import { toggleSections } from "@/lib/toggle-sections";

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

// Common toggle props interface
export interface ToggleProps {
  className?: string;
  defaultChecked?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

// 1. Simple Toggle
export interface SimpleToggleProps extends ToggleProps {}

export const SimpleToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#4f46e5",
  inactiveColor = "#525252",
}: SimpleToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#4f46e5";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#525252";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-8 w-14 rounded-full transition-colors duration-200 ease-in-out focus:outline-none", className)}
      style={{
        backgroundColor: isOn ? activeRgb : inactiveRgb,
      }}
    >
      <span className={cn("pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out", isOn ? "translate-x-7" : "translate-x-1")} />
    </button>
  );
};

// 2. iOS Style Toggle
export interface IosToggleProps extends ToggleProps {}

export const IosToggle = ({
  className,
  defaultChecked = true,
  activeColor,
  inactiveColor,
}: IosToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : undefined;
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : undefined;

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-8 w-14 rounded-full transition-colors duration-300", className)}
      style={{
        ...(activeRgb && isOn ? { backgroundColor: activeRgb } : {}),
        ...(inactiveRgb && !isOn ? { backgroundColor: inactiveRgb } : {}),
        ...(!activeRgb && isOn ? { backgroundColor: "#22c55e" } : {}),
        ...(!inactiveRgb && !isOn ? { backgroundColor: "#e5e7eb" } : {}),
      }}
    >
      <span className={cn("absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white shadow-sm transition-transform duration-300", isOn ? "translate-x-6" : "translate-x-0")} />
    </button>
  );
};

// 3. Square Toggle
export interface SquareToggleProps extends ToggleProps {}

export const SquareToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#2563eb",
  inactiveColor = "#404040",
}: SquareToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#2563eb";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#404040";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-8 w-16 rounded-sm transition-colors duration-200", className)}
      style={{
        backgroundColor: isOn ? activeRgb : inactiveRgb,
      }}
    >
      <span className={cn("absolute top-1 h-6 w-6 rounded-sm bg-white transition-transform duration-200", isOn ? "left-9" : "left-1")} />
    </button>
  );
};

// 4. Material Ripple Toggle
export interface MaterialToggleProps extends ToggleProps {}

export const MaterialToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#6366f1",
}: MaterialToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#6366f1";

  return (
    <div className={cn("relative inline-flex items-center cursor-pointer", className)} onClick={() => setIsOn(!isOn)}>
      <div 
        className={cn("h-4 w-10 rounded-full transition-colors opacity-50")}
        style={{
          backgroundColor: isOn ? activeRgb : "#9ca3af",
        }}
      />
      <div 
        className={cn("absolute h-6 w-6 rounded-full shadow-md transition-all duration-200 flex items-center justify-center", isOn ? "right-0" : "left-0")}
        style={{
          backgroundColor: isOn ? activeRgb : "#ffffff",
        }}
      >
        <div 
          className={cn("absolute inset-0 rounded-full bg-current opacity-0 transition-opacity hover:opacity-20")}
          style={{
            color: isOn ? activeRgb : "#6b7280",
          }}
        />
      </div>
    </div>
  );
};

// 5. Icon Toggle (Sun/Moon)
export interface IconToggleProps extends ToggleProps {}

export const IconToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#1e293b",
  inactiveColor = "#bae6fd",
}: IconToggleProps) => {
  const [isDark, setIsDark] = useState(defaultChecked);

  useEffect(() => {
    setIsDark(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#1e293b";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#bae6fd";

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className={cn("relative flex h-10 w-20 items-center rounded-full p-1 transition-colors", className)}
      style={{
        backgroundColor: isDark ? activeRgb : inactiveRgb,
      }}
    >
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300", isDark ? "translate-x-10" : "translate-x-0")}>
        {isDark ? <Moon size={14} className="text-neutral-900" /> : <Sun size={14} className="text-orange-500" />}
      </span>
    </button>
  );
};

// 6. Text Toggle (ON/OFF)
export interface TextToggleProps extends ToggleProps {}

export const TextToggle = ({
  className,
  defaultChecked = true,
  activeColor = "#10b981",
  inactiveColor = "#ef4444",
}: TextToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#10b981";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#ef4444";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-10 w-24 overflow-hidden rounded-lg font-bold transition-colors", className)}
      style={{
        backgroundColor: isOn ? activeRgb : inactiveRgb,
      }}
    >
      <span className={cn("absolute inset-0 flex items-center justify-center text-xs text-white transition-opacity duration-300", isOn ? "opacity-100" : "opacity-0")}>ON</span>
      <span className={cn("absolute inset-0 flex items-center justify-center text-xs text-white transition-opacity duration-300", !isOn ? "opacity-100" : "opacity-0")}>OFF</span>
      <span className={cn("absolute bottom-1 left-1 top-1 w-8 rounded bg-white transition-transform duration-300", isOn ? "translate-x-14" : "translate-x-0")} />
    </button>
  );
};

// 7. Gradient Toggle
export interface GradientToggleProps extends ToggleProps {}

export const GradientToggle = ({
  className,
  defaultChecked = true,
  inactiveColor = "#262626",
}: GradientToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#262626";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-8 w-14 rounded-full p-1 transition-all duration-500", isOn ? "bg-gradient-to-r from-pink-500 to-violet-500" : "", className)}
      style={{
        ...(!isOn ? { backgroundColor: inactiveRgb } : {}),
      }}
    >
      <span className={cn("block h-6 w-6 rounded-full bg-white shadow-lg transition-transform duration-500", isOn ? "translate-x-6" : "translate-x-0")} />
    </button>
  );
};

// 8. Neon Toggle
export interface NeonToggleProps extends ToggleProps {}

export const NeonToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#22d3ee",
}: NeonToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#22d3ee";

  // Convert rgb to hex for shadow (simplified)
  const getShadowColor = (rgb: string) => {
    if (rgb.startsWith("rgb")) {
      const match = rgb.match(/\d+/g);
      if (match && match.length >= 3) {
        return `rgba(${match[0]},${match[1]},${match[2]},0.5)`;
      }
    }
    return "rgba(34,211,238,0.5)";
  };

  const shadowColor = getShadowColor(activeRgb);
  const thumbShadowColor = getShadowColor(activeRgb).replace("0.5", "0.8");

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-8 w-16 rounded-full border-2 transition-all duration-300", className)}
      style={{
        borderColor: isOn ? activeRgb : "#404040",
        backgroundColor: isOn ? "#0c4a6e" : "transparent",
        boxShadow: isOn ? `0 0 15px ${shadowColor}` : "none",
      }}
    >
      <span 
        className={cn("absolute top-1 h-5 w-5 rounded-full transition-all duration-300", isOn ? "left-9" : "left-1")}
        style={{
          backgroundColor: isOn ? activeRgb : "#525252",
          boxShadow: isOn ? `0 0 10px ${thumbShadowColor}` : "none",
        }}
      />
    </button>
  );
};

// 9. Thin Toggle
export interface ThinToggleProps extends ToggleProps {}

export const ThinToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#818cf8",
}: ThinToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#818cf8";

  return (
    <button onClick={() => setIsOn(!isOn)} className={cn("group relative flex h-6 w-12 items-center", className)}>
      <div 
        className={cn("h-1 w-full rounded-full transition-colors")}
        style={{
          backgroundColor: isOn ? activeRgb : "#525252",
        }}
      />
      <div 
        className={cn("absolute h-6 w-6 rounded-full shadow-md transition-all duration-300 border-2", isOn ? "right-0" : "left-0 group-hover:border-indigo-400")}
        style={{
          backgroundColor: isOn ? activeRgb : "#ffffff",
          borderColor: isOn ? activeRgb : "#d1d5db",
        }}
      />
    </button>
  );
};

// 10. Outline Toggle
export interface OutlineToggleProps extends ToggleProps {}

export const OutlineToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#4f46e5",
  inactiveColor = "#737373",
  thumbColor = "#737373",
}: OutlineToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#4f46e5";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#737373";
  const thumbRgb = thumbColor && thumbColor.trim() !== "" 
    ? (thumbColor.startsWith("rgb") ? thumbColor : (hexToRgb(thumbColor) || thumbColor))
    : "#737373";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-8 w-14 rounded-full border-2 transition-colors", className)}
      style={{
        borderColor: isOn ? activeRgb : inactiveRgb,
        backgroundColor: isOn ? activeRgb : "transparent",
      }}
    >
      <span 
        className={cn("absolute top-0.5 h-6 w-6 rounded-full transition-all duration-300", isOn ? "left-6.5 translate-x-0.5" : "left-0.5")}
        style={{
          backgroundColor: isOn ? "#ffffff" : thumbRgb,
        }}
      />
    </button>
  );
};

// 11. 3D Toggle
export interface ThreeDToggleProps extends ToggleProps {}

export const ThreeDToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#22c55e",
  inactiveColor = "#404040",
}: ThreeDToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#22c55e";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#404040";

  // Get darker shade for border
  const getDarkerShade = (rgb: string) => {
    if (rgb.startsWith("rgb")) {
      const match = rgb.match(/\d+/g);
      if (match && match.length >= 3) {
        const r = Math.max(0, parseInt(match[0]) - 30);
        const g = Math.max(0, parseInt(match[1]) - 30);
        const b = Math.max(0, parseInt(match[2]) - 30);
        return `rgb(${r} ${g} ${b})`;
      }
    }
    return isOn ? "#15803d" : "#171717";
  };

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-10 w-20 rounded-xl border-b-4 transition-all active:border-b-0 active:translate-y-1", className)}
      style={{
        backgroundColor: isOn ? activeRgb : inactiveRgb,
        borderColor: getDarkerShade(isOn ? activeRgb : inactiveRgb),
      }}
    >
      <span className={cn("absolute top-1 h-7 w-8 rounded-lg bg-white/20 transition-all duration-200", isOn ? "left-10" : "left-2")} />
    </button>
  );
};

// 12. Elastic Toggle
export interface ElasticToggleProps extends ToggleProps {}

export const ElasticToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#9333ea",
  inactiveColor = "#e5e7eb",
}: ElasticToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#9333ea";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#e5e7eb";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("flex h-10 w-20 rounded-full p-1 transition-colors duration-500", className)}
      style={{
        backgroundColor: isOn ? activeRgb : inactiveRgb,
      }}
    >
      <span 
        className={cn("h-8 w-8 rounded-full bg-white shadow-md transition-all duration-500", isOn ? "translate-x-10 rotate-180" : "translate-x-0")}
        style={{
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      />
    </button>
  );
};

// 13. Check / X Toggle
export interface CheckXToggleProps extends ToggleProps {}

export const CheckXToggle = ({
  className,
  defaultChecked = true,
  activeColor = "#22c55e",
  inactiveColor = "#ef4444",
}: CheckXToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#22c55e";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#ef4444";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-10 w-20 rounded-full transition-colors", className)}
      style={{
        backgroundColor: isOn ? activeRgb : inactiveRgb,
      }}
    >
      <span className={cn("absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition-transform duration-300", isOn ? "left-11" : "left-1")}>
        {isOn ? <Check size={16} style={{ color: activeRgb }} /> : <X size={16} style={{ color: inactiveRgb }} />}
      </span>
    </button>
  );
};

// 14. Lock Toggle
export interface LockToggleProps extends ToggleProps {}

export const LockToggle = ({
  className,
  defaultChecked = true,
  activeColor = "#ef4444",
  inactiveColor = "#22c55e",
}: LockToggleProps) => {
  const [isLocked, setIsLocked] = useState(defaultChecked);

  useEffect(() => {
    setIsLocked(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#ef4444";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#22c55e";

  return (
    <button 
      onClick={() => setIsLocked(!isLocked)}
      className={cn("flex h-12 w-24 items-center rounded-lg border-2 p-1 transition-colors", className)}
      style={{
        borderColor: isLocked ? activeRgb : inactiveRgb,
        backgroundColor: isLocked ? `${activeRgb}1a` : `${inactiveRgb}1a`,
      }}
    >
      <div 
        className={cn("flex h-9 w-10 items-center justify-center rounded-md text-white transition-all duration-300", isLocked ? "translate-x-0" : "translate-x-11")}
        style={{
          backgroundColor: isLocked ? activeRgb : inactiveRgb,
        }}
      >
        {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
      </div>
    </button>
  );
};

// 15. Power Button Toggle
export interface PowerToggleProps extends ToggleProps {}

export const PowerToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#22c55e",
  inactiveColor = "#171717",
}: PowerToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#22c55e";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#171717";

  const getShadowColor = (rgb: string) => {
    if (rgb.startsWith("rgb")) {
      const match = rgb.match(/\d+/g);
      if (match && match.length >= 3) {
        return `rgba(${match[0]},${match[1]},${match[2]},0.5)`;
      }
    }
    return "rgba(34,197,94,0.5)";
  };

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-xl transition-all duration-300", className)}
      style={{
        borderColor: isOn ? activeRgb : inactiveRgb,
        backgroundColor: isOn ? activeRgb : inactiveRgb,
        color: isOn ? "#ffffff" : "#525252",
        boxShadow: isOn ? `0 0 20px ${getShadowColor(activeRgb)}` : "none",
      }}
    >
      <Power size={32} className={cn("transition-transform duration-300", isOn && "scale-110")} />
    </button>
  );
};

// 16. Cyberpunk Toggle
export interface CyberToggleProps extends ToggleProps {}

export const CyberToggle = ({
  className,
  defaultChecked = true,
  activeColor = "#facc15",
}: CyberToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#facc15";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-10 w-24 skew-x-[-12deg] border p-1", className)}
      style={{
        borderColor: activeRgb,
        backgroundColor: "#000000",
      }}
    >
      <div 
        className={cn("h-full w-1/2 transition-all duration-100 ease-linear", isOn ? "translate-x-full" : "translate-x-0")}
        style={{
          backgroundColor: activeRgb,
        }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white mix-blend-difference skew-x-[12deg]">
        {isOn ? "Active" : "Null"}
      </span>
    </button>
  );
};

// 17. Neumorphic Toggle
export interface NeumorphicToggleProps extends ToggleProps {}

export const NeumorphicToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#3b82f6",
}: NeumorphicToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#3b82f6";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("flex h-10 w-20 items-center rounded-full bg-[#e0e5ec] p-1 shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff]", className)}
    >
      <div 
        className={cn("h-8 w-8 rounded-full bg-[#e0e5ec] shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff] transition-all duration-300", isOn ? "translate-x-10" : "translate-x-0")}
        style={{
          backgroundColor: isOn ? activeRgb : "#e0e5ec",
        }}
      />
    </button>
  );
};

// 18. Glassmorphism Toggle
export interface GlassToggleProps extends ToggleProps {}

export const GlassToggle = ({
  className,
  defaultChecked = false,
}: GlassToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("relative h-10 w-20 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md", className)}
    >
      <div className={cn("absolute top-1 h-8 w-8 rounded-full shadow-sm transition-all duration-500", isOn ? "left-11 bg-white" : "left-1 bg-white/40")} />
    </button>
  );
};

// 19. Volume Slider Toggle
export interface VolumeToggleProps extends ToggleProps {}

export const VolumeToggle = ({
  className,
  defaultChecked = false,
  activeColor = "#22c55e",
  inactiveColor = "#171717",
}: VolumeToggleProps) => {
  const [isMuted, setIsMuted] = useState(defaultChecked);

  useEffect(() => {
    setIsMuted(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#22c55e";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#171717";

  return (
    <button 
      onClick={() => setIsMuted(!isMuted)}
      className={cn("group flex h-12 w-32 items-center gap-3 rounded-xl p-2 transition-all", className)}
      style={{
        backgroundColor: isMuted ? `${inactiveRgb}33` : inactiveRgb,
      }}
    >
      <div 
        className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors", isMuted ? "" : "group-hover:text-white")}
        style={{
          backgroundColor: inactiveRgb,
          color: isMuted ? "#ef4444" : undefined,
        }}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </div>
      <div className="flex flex-1 gap-1 h-full items-center">
        {[1,2,3,4,5].map(i => (
          <div 
            key={i} 
            className={cn("w-1 rounded-full transition-all duration-300", !isMuted && "")} 
            style={{ 
              height: isMuted ? 4 : i*4 + 4,
              backgroundColor: isMuted ? "#404040" : activeRgb,
            }} 
          />
        ))}
      </div>
    </button>
  );
};

// 20. Wifi Toggle
export interface WifiToggleProps extends ToggleProps {}

export const WifiToggle = ({
  className,
  defaultChecked = true,
  activeColor = "#3b82f6",
  inactiveColor = "#171717",
}: WifiToggleProps) => {
  const [isOn, setIsOn] = useState(defaultChecked);

  useEffect(() => {
    setIsOn(defaultChecked);
  }, [defaultChecked]);

  const activeRgb = activeColor && activeColor.trim() !== "" 
    ? (activeColor.startsWith("rgb") ? activeColor : (hexToRgb(activeColor) || activeColor))
    : "#3b82f6";
  const inactiveRgb = inactiveColor && inactiveColor.trim() !== "" 
    ? (inactiveColor.startsWith("rgb") ? inactiveColor : (hexToRgb(inactiveColor) || inactiveColor))
    : "#171717";

  return (
    <button 
      onClick={() => setIsOn(!isOn)}
      className={cn("flex flex-col items-center justify-center gap-2 h-24 w-24 rounded-2xl border-2 transition-all", className)}
      style={{
        borderColor: isOn ? activeRgb : inactiveRgb,
        backgroundColor: isOn ? `${activeRgb}1a` : inactiveRgb,
        color: isOn ? activeRgb : "#525252",
      }}
    >
      {isOn ? <Wifi size={32} /> : <WifiOff size={32} />}
      <span className="text-xs font-bold uppercase">{isOn ? "Connected" : "Offline"}</span>
    </button>
  );
};

// Export toggle components by name for playground
const toggleComponentMap: Record<string, React.FC<any>> = {
  "SimpleToggle": SimpleToggle,
  "IosToggle": IosToggle,
  "SquareToggle": SquareToggle,
  "MaterialToggle": MaterialToggle,
  "IconToggle": IconToggle,
  "TextToggle": TextToggle,
  "GradientToggle": GradientToggle,
  "NeonToggle": NeonToggle,
  "ThinToggle": ThinToggle,
  "OutlineToggle": OutlineToggle,
  "ThreeDToggle": ThreeDToggle,
  "ElasticToggle": ElasticToggle,
  "CheckXToggle": CheckXToggle,
  "LockToggle": LockToggle,
  "PowerToggle": PowerToggle,
  "CyberToggle": CyberToggle,
  "NeumorphicToggle": NeumorphicToggle,
  "GlassToggle": GlassToggle,
  "VolumeToggle": VolumeToggle,
  "WifiToggle": WifiToggle,
};

export const toggleComponentsByName = toggleSections.reduce<Record<string, React.FC<any>>>(
  (acc, toggle) => {
    acc[toggle.componentName] = toggleComponentMap[toggle.componentName];
    return acc;
  },
  {}
);


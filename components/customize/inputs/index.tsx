"use client"

import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { 
  Search, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Check, 
  X, 
  ArrowRight, 
  UploadCloud, 
  Calendar, 
  DollarSign, 
  Hash, 
  AtSign, 
  Paperclip, 
  Mic, 
  Command, 
  CreditCard, 
  Globe, 
  Smartphone, 
  Copy, 
  Terminal, 
  Palette,
  AlertCircle
} from "lucide-react";
import { inputSections } from "@/lib/input-sections";

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

// 1. Standard Input
export interface StandardInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const StandardInput = ({
  placeholder = "Standard input...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  ...props
}: StandardInputProps) => (
  <input 
    className={cn(
      "w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500",
      className
    )}
    placeholder={placeholder}
    style={{
      ...(borderColor && borderColor.trim() !== "" && {
        borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
      }),
      ...(backgroundColor && backgroundColor.trim() !== "" && {
        backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
      }),
      ...(textColor && textColor.trim() !== "" && {
        color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
      }),
      ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
    }}
    {...props}
  />
);

// 2. Filled Input
export interface FilledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  focusRingColor?: string;
}

export const FilledInput = ({
  placeholder = "Filled input...",
  className,
  backgroundColor,
  textColor,
  borderRadius = 8,
  focusRingColor = "#6366f1",
  ...props
}: FilledInputProps) => (
  <input 
    className={cn(
      "w-full rounded-lg border-0 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:bg-neutral-700 focus:outline-none focus:ring-2",
      className
    )}
    placeholder={placeholder}
    style={{
      ...(backgroundColor && backgroundColor.trim() !== "" && {
        backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
      }),
      ...(textColor && textColor.trim() !== "" && {
        color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
      }),
      ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
      ...(focusRingColor && {
        "--tw-ring-color": focusRingColor.startsWith("rgb") ? focusRingColor : (hexToRgb(focusRingColor) || focusRingColor)
      } as React.CSSProperties),
    }}
    {...props}
  />
);

// 3. Underline Input
export interface UnderlineInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  borderColor?: string;
  textColor?: string;
}

export const UnderlineInput = ({
  label = "Underline Label",
  className,
  borderColor = "#404040",
  textColor,
  ...props
}: UnderlineInputProps) => (
  <div className="group relative">
    <input 
      className={cn(
        "w-full border-b bg-transparent px-0 py-2.5 text-sm text-white placeholder-transparent focus:border-white focus:outline-none",
        className
      )}
      placeholder={label}
      style={{
        ...(borderColor && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
      }}
      {...props}
    />
    <label className="absolute left-0 top-2.5 text-sm text-neutral-500 transition-all group-focus-within:-top-3 group-focus-within:text-xs group-focus-within:text-white">
      {label}
    </label>
  </div>
);

// 4. Icon Left Input
export interface IconLeftInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  focusBorderColor?: string;
}

export const IconLeftInput = ({
  placeholder = "Email address...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  focusBorderColor = "#6366f1",
  ...props
}: IconLeftInputProps) => (
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
    <input 
      className={cn(
        "w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1",
        className
      )}
      placeholder={placeholder}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
        ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
        ...(focusBorderColor && {
          "--tw-ring-color": focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor)
        } as React.CSSProperties),
      }}
      {...props}
    />
  </div>
);

// 5. Password Toggle Input
export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  focusBorderColor?: string;
  showPassword?: boolean;
}

export const PasswordInput = ({
  placeholder = "Password",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  focusBorderColor = "#6366f1",
  showPassword: controlledShow,
  ...props
}: PasswordInputProps) => {
  const [internalShow, setInternalShow] = useState(false);
  const show = controlledShow !== undefined ? controlledShow : internalShow;

  return (
    <div className="relative">
      <input 
        type={show ? "text" : "password"}
        className={cn(
          "w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-4 pr-10 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1",
          className
        )}
        placeholder={placeholder}
        style={{
          ...(borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
          }),
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
          ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
          ...(focusBorderColor && {
            "--tw-ring-color": focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor)
          } as React.CSSProperties),
        }}
        {...props}
      />
      <button 
        type="button"
        onClick={() => controlledShow === undefined && setInternalShow(!internalShow)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

// 6. Search Pill
export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const SearchInput = ({
  placeholder = "Search...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 9999,
  ...props
}: SearchInputProps) => (
  <div className="relative">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
    <input 
      className={cn(
        "w-full rounded-full border border-neutral-800 bg-neutral-900 pl-11 pr-12 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none",
        className
      )}
      placeholder={placeholder}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
      }}
      {...props}
    />
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
      <kbd className="hidden rounded bg-neutral-800 border border-neutral-700 px-1.5 text-[10px] font-bold text-neutral-500 sm:inline-block">⌘K</kbd>
    </div>
  </div>
);

// 7. Validation Error
export interface ErrorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  errorColor?: string;
  defaultValue?: string;
}

export const ErrorInput = ({
  placeholder = "Invalid input...",
  className,
  errorMessage = "Please enter a valid email address.",
  errorColor = "#ef4444",
  defaultValue = "invalid@email",
  ...props
}: ErrorInputProps) => {
  const errorRgb = errorColor && errorColor.trim() !== "" 
    ? (errorColor.startsWith("rgb") ? errorColor : (hexToRgb(errorColor) || errorColor))
    : "#ef4444";

  return (
    <div className="space-y-1">
      <div className="relative">
        <input 
          className={cn(
            "w-full rounded-lg border bg-red-500/10 px-4 py-2.5 text-sm text-red-100 placeholder-red-300/50 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400",
            className
          )}
          placeholder={placeholder}
          defaultValue={defaultValue}
          style={{
            borderColor: errorRgb,
          }}
          {...props}
        />
        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16} style={{ color: errorRgb }} />
      </div>
      <p className="text-xs text-red-500" style={{ color: errorRgb }}>
        {errorMessage}
      </p>
    </div>
  );
};

// 8. Success State
export interface SuccessInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  successColor?: string;
  defaultValue?: string;
}

export const SuccessInput = ({
  placeholder = "Success input...",
  className,
  successColor = "#22c55e",
  defaultValue = "validuser",
  ...props
}: SuccessInputProps) => {
  const successRgb = successColor && successColor.trim() !== "" 
    ? (successColor.startsWith("rgb") ? successColor : (hexToRgb(successColor) || successColor))
    : "#22c55e";

  return (
    <div className="relative">
      <input 
        className={cn(
          "w-full rounded-lg border bg-green-500/10 px-4 py-2.5 text-sm text-green-100 placeholder-green-300/50 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400",
          className
        )}
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={{
          borderColor: successRgb,
        }}
        {...props}
      />
      <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={16} style={{ color: successRgb }} />
    </div>
  );
};

// 9. Floating Label (Material)
export interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  borderColor?: string;
  textColor?: string;
  focusBorderColor?: string;
}

export const FloatingLabelInput = ({
  label = "Floating Label",
  className,
  borderColor,
  textColor,
  focusBorderColor = "#6366f1",
  ...props
}: FloatingLabelInputProps) => {
  const focusBorderRgb = focusBorderColor && focusBorderColor.trim() !== "" 
    ? (focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor))
    : "#6366f1";

  return (
    <div className="relative pt-2">
      <input 
        className={cn(
          "peer w-full border-b bg-transparent px-0 py-2 text-sm text-white placeholder-transparent focus:outline-none",
          className
        )}
        placeholder={label}
        id="float-label"
        style={{
          ...(borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
          ...(focusBorderRgb && {
            "--tw-focus-border-color": focusBorderRgb
          } as React.CSSProperties),
        }}
        {...props}
      />
      <label 
        htmlFor="float-label"
        className="absolute left-0 top-0 text-xs text-neutral-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-500 peer-focus:top-0 peer-focus:text-xs"
        style={{
          ...(focusBorderRgb && {
            "--tw-focus-text-color": focusBorderRgb
          } as React.CSSProperties),
        }}
      >
        {label}
      </label>
    </div>
  );
};

// 10. Tags Input
export interface TagsInputProps {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  tags?: string;
}

export const TagsInput = ({
  placeholder = "Add tag...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 12,
  tags: initialTags,
  ...props
}: TagsInputProps) => {
  const initialTagsArray = initialTags 
    ? initialTags.split('\n').filter(tag => tag.trim() !== '')
    : ["Design", "UI"];
  const [tags, setTags] = useState(initialTagsArray);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputRef.current?.value) {
      setTags([...tags, inputRef.current.value]);
      inputRef.current.value = "";
    }
  };

  const removeTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  return (
    <div 
      className={cn(
        "flex w-full flex-wrap items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 p-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500",
        className
      )}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
      }}
    >
      {tags.map((tag, i) => (
        <span 
          key={i} 
          className="flex items-center gap-1 rounded bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-300 border border-neutral-700"
          style={{
            ...(textColor && textColor.trim() !== "" && {
              color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
            }),
          }}
        >
          {tag}
          <button 
            type="button"
            onClick={() => removeTag(i)} 
            className="text-neutral-500 hover:text-white"
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input 
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="min-w-[100px] flex-1 bg-transparent px-2 py-1 text-sm text-white outline-none placeholder-neutral-600"
        placeholder={placeholder}
        {...props as any}
      />
    </div>
  );
};

// 11. Newsletter Join
export interface NewsletterInputProps {
  placeholder?: string;
  className?: string;
  buttonText?: string;
  buttonColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const NewsletterInput = ({
  placeholder = "Enter your email",
  className,
  buttonText = "Join",
  buttonColor = "#6366f1",
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  ...props
}: NewsletterInputProps) => {
  const buttonRgb = buttonColor && buttonColor.trim() !== "" 
    ? (buttonColor.startsWith("rgb") ? buttonColor : (hexToRgb(buttonColor) || buttonColor))
    : "#6366f1";

  return (
    <div className={cn("relative flex w-full", className)}>
      <input 
        type="email" 
        placeholder={placeholder} 
        className="w-full rounded-l-lg border border-r-0 border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        style={{
          ...(borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
          }),
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
        }}
        {...props as any}
      />
      <button 
        type="button"
        className="flex items-center gap-2 rounded-r-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        style={{
          backgroundColor: buttonRgb,
        }}
      >
        {buttonText} <ArrowRight size={14} />
      </button>
    </div>
  );
};

// 12. OTP Input
export interface OTPInputProps {
  className?: string;
  digits?: number;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  focusBorderColor?: string;
}

export const OTPInput = ({
  className,
  digits = 4,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  focusBorderColor = "#6366f1",
  ...props
}: OTPInputProps) => {
  const focusBorderRgb = focusBorderColor && focusBorderColor.trim() !== "" 
    ? (focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor))
    : "#6366f1";

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length: digits }).map((_, i) => (
        <input 
          key={i}
          maxLength={1}
          className="h-12 w-12 rounded-lg border border-neutral-800 bg-neutral-900 text-center text-lg font-bold text-white focus:outline-none focus:ring-1"
          placeholder="-"
          style={{
            ...(borderColor && borderColor.trim() !== "" && {
              borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
            }),
            ...(backgroundColor && backgroundColor.trim() !== "" && {
              backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
            }),
            ...(textColor && textColor.trim() !== "" && {
              color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
            }),
            ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
            ...(focusBorderRgb && {
              "--tw-ring-color": focusBorderRgb
            } as React.CSSProperties),
          }}
          {...props as any}
        />
      ))}
    </div>
  );
};

// 13. File Upload Input
export interface FileUploadInputProps {
  className?: string;
  uploadText?: string;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
}

export const FileUploadInput = ({
  className,
  uploadText = "Click to upload or drag & drop",
  borderColor,
  backgroundColor,
  borderRadius = 12,
  ...props
}: FileUploadInputProps) => (
  <label 
    className={cn(
      "flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-900/50 p-6 transition-colors hover:border-neutral-500 hover:bg-neutral-800",
      className
    )}
    style={{
      ...(borderColor && borderColor.trim() !== "" && {
        borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
      }),
      ...(backgroundColor && backgroundColor.trim() !== "" && {
        backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
      }),
      ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
    }}
  >
    <UploadCloud className="mb-2 text-neutral-400" size={24} />
    <span className="text-xs font-medium text-neutral-300">{uploadText}</span>
    <input type="file" className="hidden" {...props as any} />
  </label>
);

// 14. Currency Input
export interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  currency?: string;
  currencyColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const CurrencyInput = ({
  placeholder = "0.00",
  className,
  currency = "USD",
  currencyColor = "#22c55e",
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  ...props
}: CurrencyInputProps) => {
  const currencyRgb = currencyColor && currencyColor.trim() !== "" 
    ? (currencyColor.startsWith("rgb") ? currencyColor : (hexToRgb(currencyColor) || currencyColor))
    : "#22c55e";

  return (
    <div className="relative">
      <div 
        className="absolute left-0 top-0 flex h-full items-center rounded-l-lg bg-neutral-800 px-3 text-neutral-400 border border-neutral-700"
        style={{
          borderColor: borderColor && borderColor.trim() !== "" 
            ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
            : undefined,
        }}
      >
        <DollarSign size={14} style={{ color: currencyRgb }} />
      </div>
      <input 
        type="number"
        className={cn(
          "w-full rounded-lg border border-neutral-700 bg-neutral-900 pl-12 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 text-right",
          className
        )}
        placeholder={placeholder}
        style={{
          ...(borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
          }),
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
          ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
          ...(currencyRgb && {
            "--tw-ring-color": currencyRgb
          } as React.CSSProperties),
        }}
        {...props}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-500">{currency}</div>
    </div>
  );
};

// 15. URL Input
export interface URLInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  focusBorderColor?: string;
}

export const URLInput = ({
  placeholder = "example.com",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  focusBorderColor = "#3b82f6",
  ...props
}: URLInputProps) => {
  const focusBorderRgb = focusBorderColor && focusBorderColor.trim() !== "" 
    ? (focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor))
    : "#3b82f6";

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-medium text-sm">https://</div>
      <input 
        type="text"
        className={cn(
          "w-full rounded-lg border border-neutral-700 bg-neutral-900 pl-16 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1",
          className
        )}
        placeholder={placeholder}
        style={{
          ...(borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
          }),
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
          ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
          ...(focusBorderRgb && {
            "--tw-ring-color": focusBorderRgb
          } as React.CSSProperties),
        }}
        {...props}
      />
      <Globe size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600" />
    </div>
  );
};

// 16. Color Picker Input
export interface ColorInputProps {
  className?: string;
  defaultValue?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export const ColorInput = ({
  className,
  defaultValue = "#6366F1",
  borderColor,
  backgroundColor,
  ...props
}: ColorInputProps) => {
  const defaultColorRgb = defaultValue && defaultValue.trim() !== "" 
    ? (defaultValue.startsWith("rgb") ? defaultValue : (hexToRgb(defaultValue) || defaultValue))
    : "#6366F1";

  return (
    <div 
      className={cn(
        "flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 p-1 pr-3",
        className
      )}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
      }}
    >
      <div className="h-8 w-8 overflow-hidden rounded bg-indigo-500 p-0" style={{ backgroundColor: defaultColorRgb }}>
        <input 
          type="color" 
          defaultValue={defaultValue}
          className="h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer p-0 opacity-0" 
          {...props as any}
        />
      </div>
      <input 
        type="text" 
        defaultValue={defaultValue}
        className="flex-1 bg-transparent text-sm font-mono uppercase text-white outline-none" 
      />
      <Palette size={14} className="text-neutral-500" />
    </div>
  );
};

// 17. Range Slider Input
export interface RangeInputProps {
  className?: string;
  label?: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  accentColor?: string;
}

export const RangeInput = ({
  className,
  label = "Volume",
  min = 0,
  max = 100,
  defaultValue = 50,
  accentColor = "#6366f1",
  ...props
}: RangeInputProps) => {
  const [val, setVal] = useState(defaultValue);
  const accentRgb = accentColor && accentColor.trim() !== "" 
    ? (accentColor.startsWith("rgb") ? accentColor : (hexToRgb(accentColor) || accentColor))
    : "#6366f1";

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-xs text-neutral-400 mb-2">
        <span>{label}</span>
        <span>{val}%</span>
      </div>
      <input 
        type="range" 
        min={min}
        max={max}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="h-2 w-full appearance-none rounded-lg bg-neutral-800 cursor-pointer"
        style={{
          accentColor: accentRgb,
        }}
        {...props as any}
      />
    </div>
  );
};

// 18. Neon Input
export interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  glowColor?: string;
}

export const NeonInput = ({
  placeholder = "Neon glow...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  glowColor = "#06b6d4",
  ...props
}: NeonInputProps) => {
  const glowRgb = glowColor && glowColor.trim() !== "" 
    ? (glowColor.startsWith("rgb") ? glowColor : (hexToRgb(glowColor) || glowColor))
    : "#06b6d4";

  return (
    <input 
      className={cn(
        "w-full rounded-lg border border-cyan-500 bg-neutral-900 px-4 py-2.5 text-sm text-cyan-200 placeholder-cyan-900/50 shadow-[0_0_10px_rgba(6,182,212,0.2)] focus:shadow-[0_0_20px_rgba(6,182,212,0.4)] focus:outline-none transition-shadow",
        className
      )}
      placeholder={placeholder}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
        ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
        ...(glowRgb && {
          boxShadow: `0 0 10px ${glowRgb}33, 0 0 20px ${glowRgb}66`
        }),
      }}
      {...props}
    />
  );
};

// 19. Glass Input
export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const GlassInput = ({
  placeholder = "Glassmorphism...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 12,
  ...props
}: GlassInputProps) => (
  <div 
    className={cn(
      "relative overflow-hidden rounded-xl border border-white/20 bg-white/5 p-1 backdrop-blur-md",
      className
    )}
    style={{
      ...(borderColor && borderColor.trim() !== "" && {
        borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
      }),
      ...(backgroundColor && backgroundColor.trim() !== "" && {
        backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
      }),
      ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
    }}
  >
    <input 
      className="w-full rounded-lg bg-transparent px-3 py-2 text-sm text-white placeholder-white/40 focus:bg-white/10 focus:outline-none transition-colors"
      placeholder={placeholder}
      style={{
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
      }}
      {...props}
    />
  </div>
);

// 20. Retro 95 Input
export interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const RetroInput = ({
  placeholder = "C:\\WINDOWS\\...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  ...props
}: RetroInputProps) => (
  <input 
    className={cn(
      "w-full border-t-2 border-l-2 border-b border-r border-t-black border-l-black border-b-white border-r-white bg-white px-2 py-1 text-sm font-mono text-black placeholder-neutral-500 focus:outline-none",
      className
    )}
    placeholder={placeholder}
    style={{
      ...(borderColor && borderColor.trim() !== "" && {
        borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
      }),
      ...(backgroundColor && backgroundColor.trim() !== "" && {
        backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
      }),
      ...(textColor && textColor.trim() !== "" && {
        color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
      }),
    }}
    {...props}
  />
);

// 21. Terminal Input
export interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  promptColor?: string;
  pathColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const TerminalInput = ({
  placeholder = "npm install...",
  className,
  promptColor = "#22c55e",
  pathColor = "#60a5fa",
  backgroundColor,
  textColor,
  borderRadius = 8,
  ...props
}: TerminalInputProps) => {
  const promptRgb = promptColor && promptColor.trim() !== "" 
    ? (promptColor.startsWith("rgb") ? promptColor : (hexToRgb(promptColor) || promptColor))
    : "#22c55e";
  const pathRgb = pathColor && pathColor.trim() !== "" 
    ? (pathColor.startsWith("rgb") ? pathColor : (hexToRgb(pathColor) || pathColor))
    : "#60a5fa";

  return (
    <div 
      className={cn(
        "flex w-full items-center gap-2 rounded-lg bg-black p-3 font-mono text-sm border border-neutral-800",
        className
      )}
      style={{
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
      }}
    >
      <span style={{ color: promptRgb }}>➜</span>
      <span style={{ color: pathRgb }}>~</span>
      <input 
        className="flex-1 bg-transparent text-white placeholder-neutral-700 outline-none"
        placeholder={placeholder}
        style={{
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
        }}
        {...props}
      />
      <div className="h-4 w-2 animate-pulse bg-green-500" style={{ backgroundColor: promptRgb }} />
    </div>
  );
};

// 22. Animated Border Input
export interface AnimatedBorderInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
}

export const AnimatedBorderInput = ({
  placeholder = "Focus me...",
  className,
  gradientFrom = "#6366f1",
  gradientVia = "#a855f7",
  gradientTo = "#ec4899",
  backgroundColor,
  textColor,
  borderRadius = 8,
  ...props
}: AnimatedBorderInputProps) => {
  const gradientFromRgb = gradientFrom && gradientFrom.trim() !== "" 
    ? (gradientFrom.startsWith("rgb") ? gradientFrom : (hexToRgb(gradientFrom) || gradientFrom))
    : "#6366f1";
  const gradientViaRgb = gradientVia && gradientVia.trim() !== "" 
    ? (gradientVia.startsWith("rgb") ? gradientVia : (hexToRgb(gradientVia) || gradientVia))
    : "#a855f7";
  const gradientToRgb = gradientTo && gradientTo.trim() !== "" 
    ? (gradientTo.startsWith("rgb") ? gradientTo : (hexToRgb(gradientTo) || gradientTo))
    : "#ec4899";

  return (
    <div className={cn("group relative rounded-lg p-[1px] bg-neutral-800 overflow-hidden", className)}>
      <div 
        className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-focus-within:opacity-100"
        style={{
          background: `linear-gradient(to right, ${gradientFromRgb}, ${gradientViaRgb}, ${gradientToRgb})`,
        }}
      />
      <input 
        className="relative w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
        placeholder={placeholder}
        style={{
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
          ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
        }}
        {...props}
      />
    </div>
  );
};

// 23. Material Ripple Input (Simulated)
export interface MaterialInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  focusBorderColor?: string;
}

export const MaterialInput = ({
  label = "Username",
  className,
  borderColor,
  backgroundColor,
  textColor,
  focusBorderColor = "#6366f1",
  ...props
}: MaterialInputProps) => {
  const focusBorderRgb = focusBorderColor && focusBorderColor.trim() !== "" 
    ? (focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor))
    : "#6366f1";

  return (
    <div 
      className={cn(
        "relative group bg-neutral-800 rounded-t-lg px-4 py-2 border-b-2 border-neutral-600 focus-within:border-indigo-500 transition-colors",
        className
      )}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(focusBorderRgb && {
          "--tw-focus-border-color": focusBorderRgb
        } as React.CSSProperties),
      }}
    >
      <label 
        className="block text-xs text-neutral-400 mb-1 group-focus-within:text-indigo-400"
        style={{
          ...(focusBorderRgb && {
            "--tw-focus-text-color": focusBorderRgb
          } as React.CSSProperties),
        }}
      >
        {label}
      </label>
      <input 
        className="w-full bg-transparent text-sm text-white outline-none placeholder-transparent"
        placeholder={label}
        style={{
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
        }}
        {...props}
      />
    </div>
  );
};

// 24. Copy Readonly Input
export interface CopyInputProps {
  className?: string;
  value?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  buttonHoverColor?: string;
}

export const CopyInput = ({
  className,
  value = "npm i @lumina/ui",
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  buttonHoverColor = "#262626",
  ...props
}: CopyInputProps) => {
  const buttonHoverRgb = buttonHoverColor && buttonHoverColor.trim() !== "" 
    ? (buttonHoverColor.startsWith("rgb") ? buttonHoverColor : (hexToRgb(buttonHoverColor) || buttonHoverColor))
    : "#262626";

  return (
    <div 
      className={cn(
        "flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 p-2",
        className
      )}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
      }}
    >
      <input 
        readOnly
        value={value}
        className="flex-1 bg-transparent px-2 text-sm font-mono text-neutral-400 outline-none"
        style={{
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
        }}
        {...props as any}
      />
      <button 
        type="button"
        className="rounded p-1.5 text-neutral-500 hover:text-white transition-colors"
        style={{
          ...(buttonHoverRgb && {
            "--tw-hover-bg": buttonHoverRgb
          } as React.CSSProperties),
        }}
      >
        <Copy size={14} />
      </button>
    </div>
  );
};

// 25. Chat Input
export interface ChatInputProps {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  buttonColor?: string;
}

export const ChatInput = ({
  placeholder = "Type a message...",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 9999,
  buttonColor = "#2563eb",
  ...props
}: ChatInputProps) => {
  const buttonRgb = buttonColor && buttonColor.trim() !== "" 
    ? (buttonColor.startsWith("rgb") ? buttonColor : (hexToRgb(buttonColor) || buttonColor))
    : "#2563eb";

  return (
    <div 
      className={cn(
        "flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 focus-within:border-neutral-600",
        className
      )}
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(borderRadius !== 9999 && { borderRadius: `${borderRadius}px` }),
      }}
    >
      <button type="button" className="text-neutral-500 hover:text-white">
        <Paperclip size={18} />
      </button>
      <input 
        className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
        placeholder={placeholder}
        style={{
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
        }}
        {...props as any}
      />
      <button type="button" className="text-neutral-500 hover:text-white">
        <Mic size={18} />
      </button>
      <button 
        type="button"
        className="rounded-full p-1.5 text-white hover:opacity-90"
        style={{
          backgroundColor: buttonRgb,
        }}
      >
        <ArrowRight size={14} />
      </button>
    </div>
  );
};

// 26. Phone Number Input
export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  countryCode?: string;
  countryFlag?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const PhoneInput = ({
  placeholder = "(555) 000-0000",
  className,
  countryCode = "+1",
  countryFlag = "🇺🇸",
  borderColor,
  backgroundColor,
  textColor,
  ...props
}: PhoneInputProps) => (
  <div className={cn("flex rounded-lg border border-neutral-800 bg-neutral-900 overflow-hidden", className)}>
    <div 
      className="flex items-center gap-1 border-r border-neutral-800 bg-neutral-900 px-3 py-2.5"
      style={{
        ...(borderColor && borderColor.trim() !== "" && {
          borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
        }),
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
        }),
      }}
    >
      <span className="text-lg">{countryFlag}</span>
      <span className="text-sm text-neutral-400">{countryCode}</span>
    </div>
    <input 
      type="tel"
      className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
      placeholder={placeholder}
      style={{
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
      }}
      {...props}
    />
  </div>
);

// 27. Date Picker Input
export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  focusBorderColor?: string;
}

export const DateInput = ({
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  focusBorderColor = "#6366f1",
  ...props
}: DateInputProps) => {
  const focusBorderRgb = focusBorderColor && focusBorderColor.trim() !== "" 
    ? (focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor))
    : "#6366f1";

  return (
    <div className="relative">
      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
      <input 
        type="date"
        className={cn(
          "w-full rounded-lg border border-neutral-800 bg-neutral-900 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 [color-scheme:dark]",
          className
        )}
        style={{
          ...(borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
          }),
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
          ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
          ...(focusBorderRgb && {
            "--tw-ring-color": focusBorderRgb
          } as React.CSSProperties),
        }}
        {...props}
      />
    </div>
  );
};

// 28. Credit Card Input
export interface CardInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  focusBorderColor?: string;
}

export const CardInput = ({
  placeholder = "0000 0000 0000 0000",
  className,
  borderColor,
  backgroundColor,
  textColor,
  borderRadius = 8,
  focusBorderColor = "#6366f1",
  ...props
}: CardInputProps) => {
  const focusBorderRgb = focusBorderColor && focusBorderColor.trim() !== "" 
    ? (focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor))
    : "#6366f1";

  return (
    <div className="relative">
      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
      <input 
        className={cn(
          "w-full rounded-lg border border-neutral-800 bg-neutral-900 pl-10 pr-16 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 font-mono",
          className
        )}
        placeholder={placeholder}
        style={{
          ...(borderColor && borderColor.trim() !== "" && {
            borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
          }),
          ...(backgroundColor && backgroundColor.trim() !== "" && {
            backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
          }),
          ...(textColor && textColor.trim() !== "" && {
            color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
          }),
          ...(borderRadius !== 8 && { borderRadius: `${borderRadius}px` }),
          ...(focusBorderRgb && {
            "--tw-ring-color": focusBorderRgb
          } as React.CSSProperties),
        }}
        {...props}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
        <div className="h-4 w-6 rounded bg-neutral-700" />
      </div>
    </div>
  );
};

// 29. Command Palette Input
export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const CommandInput = ({
  placeholder = "What do you need?",
  className,
  borderColor,
  backgroundColor,
  textColor,
  ...props
}: CommandInputProps) => (
  <div 
    className={cn(
      "flex items-center border-b border-neutral-800 bg-neutral-900/90 p-4",
      className
    )}
    style={{
      ...(borderColor && borderColor.trim() !== "" && {
        borderColor: borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor)
      }),
      ...(backgroundColor && backgroundColor.trim() !== "" && {
        backgroundColor: backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor)
      }),
    }}
  >
    <Command className="mr-3 text-neutral-500" size={20} />
    <input 
      className="flex-1 bg-transparent text-lg text-white placeholder-neutral-500 outline-none"
      placeholder={placeholder}
      autoFocus
      style={{
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
      }}
      {...props}
    />
    <span className="rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-400">ESC</span>
  </div>
);

// 30. Minimalist Ghost Input
export interface GhostInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  textColor?: string;
  borderRadius?: number;
  hoverBorderColor?: string;
  focusBorderColor?: string;
}

export const GhostInput = ({
  placeholder = "Untitled Project",
  className,
  textColor,
  borderRadius = 0,
  hoverBorderColor = "#404040",
  focusBorderColor = "#ffffff",
  ...props
}: GhostInputProps) => {
  const hoverBorderRgb = hoverBorderColor && hoverBorderColor.trim() !== "" 
    ? (hoverBorderColor.startsWith("rgb") ? hoverBorderColor : (hexToRgb(hoverBorderColor) || hoverBorderColor))
    : "#404040";
  const focusBorderRgb = focusBorderColor && focusBorderColor.trim() !== "" 
    ? (focusBorderColor.startsWith("rgb") ? focusBorderColor : (hexToRgb(focusBorderColor) || focusBorderColor))
    : "#ffffff";

  return (
    <input 
      className={cn(
        "w-full border-b border-transparent bg-transparent px-0 py-2 text-xl font-light text-white placeholder-neutral-700 transition-colors hover:border-neutral-800 focus:border-white focus:outline-none text-center",
        className
      )}
      placeholder={placeholder}
      style={{
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor)
        }),
        ...(borderRadius !== 0 && { borderRadius: `${borderRadius}px` }),
        ...(hoverBorderRgb && {
          "--tw-hover-border-color": hoverBorderRgb
        } as React.CSSProperties),
        ...(focusBorderRgb && {
          "--tw-focus-border-color": focusBorderRgb
        } as React.CSSProperties),
      }}
      {...props}
    />
  );
};

// Component map
const inputComponentMap: Record<string, React.FC<any>> = {
  "StandardInput": StandardInput,
  "FilledInput": FilledInput,
  "UnderlineInput": UnderlineInput,
  "IconLeftInput": IconLeftInput,
  "PasswordInput": PasswordInput,
  "SearchInput": SearchInput,
  "ErrorInput": ErrorInput,
  "SuccessInput": SuccessInput,
  "FloatingLabelInput": FloatingLabelInput,
  "TagsInput": TagsInput,
  "NewsletterInput": NewsletterInput,
  "OTPInput": OTPInput,
  "FileUploadInput": FileUploadInput,
  "CurrencyInput": CurrencyInput,
  "URLInput": URLInput,
  "ColorInput": ColorInput,
  "RangeInput": RangeInput,
  "NeonInput": NeonInput,
  "GlassInput": GlassInput,
  "RetroInput": RetroInput,
  "TerminalInput": TerminalInput,
  "AnimatedBorderInput": AnimatedBorderInput,
  "MaterialInput": MaterialInput,
  "CopyInput": CopyInput,
  "ChatInput": ChatInput,
  "PhoneInput": PhoneInput,
  "DateInput": DateInput,
  "CardInput": CardInput,
  "CommandInput": CommandInput,
  "GhostInput": GhostInput,
};

export const inputComponentsByName = inputSections.reduce<Record<string, React.FC<any>>>(
  (acc, input) => {
    acc[input.componentName] = inputComponentMap[input.componentName];
    return acc;
  },
  {}
);



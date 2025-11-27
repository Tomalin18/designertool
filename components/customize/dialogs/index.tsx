"use client"

import React from "react";
import { cn } from "../../../lib/utils";
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Mail, 
  Cookie, 
  Search, 
  Play, 
  Lock, 
  CreditCard, 
  UserPlus, 
  UploadCloud, 
  ShoppingBag, 
  MessageSquare, 
  Sparkles, 
  Share2, 
  Keyboard, 
  Code, 
  ShieldCheck, 
  Zap, 
  Terminal
} from "lucide-react";
import { ShinyButton } from "../ShinyButton";
import { dialogSections } from "@/lib/dialog-sections";

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

// Helper to simulate the modal container
const DialogContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex min-h-[300px] w-full items-center justify-center rounded-xl border border-neutral-800 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-neutral-950/50 p-6 overflow-auto", className)}>
    <div className="w-full max-w-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

// 1. Simple Alert Dialog
export interface SimpleAlertDialogProps {
  className?: string;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  confirmButtonColor?: string;
}

export const SimpleAlertDialog = ({
  className,
  title = "Delete Project?",
  message = "This action cannot be undone. All data will be permanently removed.",
  cancelText = "Cancel",
  confirmText = "Delete",
  confirmButtonColor = "#dc2626",
}: SimpleAlertDialogProps) => {
  const confirmRgb = confirmButtonColor && confirmButtonColor.trim() !== "" 
    ? (confirmButtonColor.startsWith("rgb") ? confirmButtonColor : (hexToRgb(confirmButtonColor) || confirmButtonColor))
    : "rgb(220 38 38)";

  return (
    <DialogContainer className={className}>
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
          <p className="mt-2 text-sm text-neutral-500">{message}</p>
        </div>
        <div className="flex justify-end gap-3">
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100">{cancelText}</button>
          <button 
            className="rounded-lg px-4 py-2 text-sm font-bold text-white hover:opacity-90"
            style={{ backgroundColor: confirmRgb }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </DialogContainer>
  );
};

// 2. Destructive Warning (Dark)
export interface DestructiveDialogProps {
  className?: string;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}

export const DestructiveDialog = ({
  className,
  title = "Revoke Access",
  message = "Are you sure you want to revoke API access for this token?",
  cancelText = "Cancel",
  confirmText = "Revoke",
}: DestructiveDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-sm rounded-xl border border-red-900/50 bg-neutral-900 p-6 shadow-2xl shadow-red-900/20">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-900/30 text-red-500">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-neutral-400">{message}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-lg border border-neutral-800 bg-transparent py-2.5 text-sm font-medium text-white hover:bg-neutral-800">{cancelText}</button>
        <button className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-500">{confirmText}</button>
      </div>
    </div>
  </DialogContainer>
);

// 3. Success Message
export interface SuccessDialogProps {
  className?: string;
  title?: string;
  message?: string;
  buttonText?: string;
}

export const SuccessDialog = ({
  className,
  title = "Payment Successful!",
  message = "Your transaction ID is #883491. A receipt has been sent to your email.",
  buttonText = "Done",
}: SuccessDialogProps) => (
  <DialogContainer className={className}>
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl">
      <div className="absolute top-0 left-0 h-2 w-full bg-green-500" />
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500">{message}</p>
      <button className="mt-6 w-full rounded-xl bg-neutral-900 py-3 text-sm font-bold text-white hover:bg-neutral-800">
        {buttonText}
      </button>
    </div>
  </DialogContainer>
);

// 4. Newsletter Subscribe
export interface NewsletterDialogProps {
  className?: string;
  title?: string;
  message?: string;
  placeholder?: string;
  buttonText?: string;
  buttonColor?: string;
}

export const NewsletterDialog = ({
  className,
  title = "Stay in the loop",
  message = "Join our newsletter to get weekly design resources and updates.",
  placeholder = "Enter your email",
  buttonText = "Join",
  buttonColor = "#4f46e5",
}: NewsletterDialogProps) => {
  const buttonRgb = buttonColor && buttonColor.trim() !== "" 
    ? (buttonColor.startsWith("rgb") ? buttonColor : (hexToRgb(buttonColor) || buttonColor))
    : "rgb(79 70 229)";

  return (
    <DialogContainer className={className}>
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent" />
        <div className="relative p-8">
          <button className="absolute right-4 top-4 text-neutral-500 hover:text-white"><X size={20}/></button>
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
            <Mail size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-neutral-400">{message}</p>
          <div className="mt-6 flex gap-2">
            <input 
              type="email" 
              placeholder={placeholder} 
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              className="rounded-lg px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
              style={{ backgroundColor: buttonRgb }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </DialogContainer>
  );
};

// 5. Cookie Consent (Floating Bottom)
export interface CookieDialogProps {
  className?: string;
  title?: string;
  message?: string;
  acceptText?: string;
  preferencesText?: string;
}

export const CookieDialog = ({
  className,
  title = "Cookies & Privacy",
  message = "We use cookies to ensure you get the best experience on our website.",
  acceptText = "Accept All",
  preferencesText = "Preferences",
}: CookieDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex items-start gap-4">
        <div className="text-3xl">🍪</div>
        <div>
          <h3 className="font-bold text-neutral-900">{title}</h3>
          <p className="mt-1 text-xs text-neutral-500">{message}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button className="flex-1 rounded-lg bg-black py-2 text-xs font-bold text-white">{acceptText}</button>
        <button className="flex-1 rounded-lg border border-neutral-200 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-50">{preferencesText}</button>
      </div>
    </div>
  </DialogContainer>
);

// 6. Command Palette (Spotlight)
export interface SpotlightDialogProps {
  className?: string;
  placeholder?: string;
  suggestionLabel?: string;
  command1?: string;
  command2?: string;
}

export const SpotlightDialog = ({
  className,
  placeholder = "Search commands...",
  suggestionLabel = "SUGGESTIONS",
  command1 = "Create New Project",
  command2 = "Search Documentation",
}: SpotlightDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl">
      <div className="flex items-center border-b border-neutral-800 px-4 py-3">
        <Search className="mr-3 text-neutral-500" size={20} />
        <input 
          type="text" 
          placeholder={placeholder} 
          className="flex-1 bg-transparent text-lg text-white placeholder-neutral-600 outline-none"
          autoFocus
        />
        <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-xs font-bold text-neutral-500">ESC</span>
      </div>
      <div className="p-2">
        <div className="px-2 py-1.5 text-xs font-bold text-neutral-500">{suggestionLabel}</div>
        <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white">
          <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-blue-500" /> {command1}</div>
          <span className="text-xs text-neutral-600">⌘N</span>
        </button>
        <button className="flex w-full items-center justify-between rounded-lg bg-indigo-600 px-3 py-2 text-left text-sm text-white">
          <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-indigo-300" /> {command2}</div>
          <span className="text-xs text-indigo-300">↵</span>
        </button>
      </div>
    </div>
  </DialogContainer>
);

// 7. Video Player Dialog
export interface VideoDialogProps {
  className?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const VideoDialog = ({
  className,
  title = "Introducing Lumina UI",
  description = "Learn how to build faster with our new component library.",
  imageUrl = "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
}: VideoDialogProps) => (
  <DialogContainer className={className}>
    <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-black shadow-2xl">
      <div className="relative aspect-video w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60" 
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer">
            <Play size={24} className="ml-1 text-white fill-white" />
          </div>
        </div>
        <button className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/80">
          <X size={16} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-xs text-neutral-400">{description}</p>
      </div>
    </div>
  </DialogContainer>
);

// 8. Login Form (Glass)
export interface LoginDialogProps {
  className?: string;
  title?: string;
  message?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  buttonText?: string;
}

export const LoginDialog = ({
  className,
  title = "Welcome Back",
  message = "Please sign in to continue.",
  emailPlaceholder = "Email address",
  passwordPlaceholder = "Password",
  buttonText = "Sign In",
}: LoginDialogProps) => (
  <DialogContainer className={className}>
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-xl">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
          <Lock size={20} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/60">{message}</p>
      </div>
      <div className="space-y-4">
        <input className="w-full rounded-lg bg-black/20 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-white/30" placeholder={emailPlaceholder} />
        <input className="w-full rounded-lg bg-black/20 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-white/30" type="password" placeholder={passwordPlaceholder} />
        <button className="w-full rounded-lg bg-white py-2.5 text-sm font-bold text-black hover:bg-neutral-200">{buttonText}</button>
      </div>
    </div>
  </DialogContainer>
);

// 9. Payment Details
export interface PaymentDialogProps {
  className?: string;
  title?: string;
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cancelText?: string;
  saveText?: string;
}

export const PaymentDialog = ({
  className,
  title = "Payment Method",
  cardNumber = "•••• •••• •••• 4242",
  cardholderName = "Alex Morgan",
  expiryDate = "12/24",
  cancelText = "Cancel",
  saveText = "Save Card",
}: PaymentDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-4">
        <h3 className="font-bold text-neutral-900">{title}</h3>
        <button className="text-neutral-400 hover:text-neutral-600"><X size={20}/></button>
      </div>
      <div className="mb-6">
        <div className="relative mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-neutral-800 to-black p-6 text-white shadow-lg">
          <div className="flex justify-between">
            <CreditCard />
            <span className="font-mono text-lg font-bold italic opacity-50">VISA</span>
          </div>
          <div className="mt-8 font-mono text-xl tracking-widest">{cardNumber}</div>
          <div className="mt-8 flex justify-between text-xs uppercase tracking-wider opacity-70">
            <span>{cardholderName}</span>
            <span>{expiryDate}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="rounded-lg border border-neutral-200 py-2.5 text-sm font-bold text-neutral-600 hover:bg-neutral-50">{cancelText}</button>
        <button className="rounded-lg bg-black py-2.5 text-sm font-bold text-white hover:bg-neutral-800">{saveText}</button>
      </div>
    </div>
  </DialogContainer>
);

// 10. Team Invite
export interface InviteDialogProps {
  className?: string;
  title?: string;
  message?: string;
  email1Placeholder?: string;
  email2Placeholder?: string;
  buttonText?: string;
}

export const InviteDialog = ({
  className,
  title = "Invite Team Members",
  message = "Invite colleagues to collaborate on this project.",
  email1Placeholder = "colleague@company.com",
  email2Placeholder = "another@company.com",
  buttonText = "Send Invites",
}: InviteDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-500">
                <UserPlus size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-neutral-400">{message}</p>
      </div>
      <div className="space-y-3">
        <div className="flex gap-2">
            <input className="flex-1 min-w-0 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-white placeholder-neutral-600 focus:border-indigo-500 focus:outline-none" placeholder={email1Placeholder} />
            <select className="flex-shrink-0 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white outline-none min-w-[100px]">
                <option>Editor</option>
                <option>Viewer</option>
                <option>Admin</option>
            </select>
        </div>
        <div className="flex gap-2">
            <input className="flex-1 min-w-0 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-white placeholder-neutral-600 focus:border-indigo-500 focus:outline-none" placeholder={email2Placeholder} />
            <select className="flex-shrink-0 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white outline-none min-w-[100px]">
                <option>Viewer</option>
                <option>Editor</option>
            </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button className="text-sm text-neutral-400 hover:text-white">Copy Link</button>
        <ShinyButton className="h-9 px-4 text-xs">{buttonText}</ShinyButton>
      </div>
    </div>
  </DialogContainer>
);

// 11. File Upload
export interface UploadDialogProps {
  className?: string;
  title?: string;
  message?: string;
  dropText?: string;
  fileTypes?: string;
  browseText?: string;
  cancelText?: string;
  uploadText?: string;
  uploadButtonColor?: string;
}

export const UploadDialog = ({
  className,
  title = "Upload Files",
  message = "Select and upload the files of your choice.",
  dropText = "Choose a file or drag & drop it here.",
  fileTypes = "JPEG, PNG, PDG up to 50MB",
  browseText = "Browse File",
  cancelText = "Cancel",
  uploadText = "Upload",
  uploadButtonColor = "#2563eb",
}: UploadDialogProps) => {
  const uploadRgb = uploadButtonColor && uploadButtonColor.trim() !== "" 
    ? (uploadButtonColor.startsWith("rgb") ? uploadButtonColor : (hexToRgb(uploadButtonColor) || uploadButtonColor))
    : "rgb(37 99 235)";

  return (
    <DialogContainer className={className}>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-blue-50 p-4">
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <UploadCloud size={32} />
              </div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm text-neutral-500">{message}</p>
        
        <div className="my-6 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8 transition-colors hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
          <p className="text-sm font-medium text-neutral-700">{dropText}</p>
          <p className="mt-1 text-xs text-neutral-400">{fileTypes}</p>
          <button className="mt-4 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs font-bold text-neutral-700 shadow-sm hover:bg-neutral-50">{browseText}</button>
        </div>
        
        <div className="flex justify-end gap-3">
          <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900">{cancelText}</button>
          <button 
            className="rounded-lg px-6 py-2 text-sm font-bold text-white hover:opacity-90"
            style={{ backgroundColor: uploadRgb }}
          >
            {uploadText}
          </button>
        </div>
      </div>
    </DialogContainer>
  );
};

// 12. Product Quick View
export interface ProductDialogProps {
  className?: string;
  productName?: string;
  productCategory?: string;
  price?: string;
  description?: string;
  imageUrl?: string;
  sizes?: string;
  buttonText?: string;
}

export const ProductDialog = ({
  className,
  productName = "Nike Air Max",
  productCategory = "Men's Running Shoe",
  price = "$129.99",
  description = "The Nike Air Max delivers comfortable support and premium cushioning for your daily run.",
  imageUrl = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
  sizes = "7,8,9,10",
  buttonText = "Add to Cart",
}: ProductDialogProps) => {
  const sizeArray = sizes.split(",").map(s => s.trim());

  return (
    <DialogContainer className={className}>
      <div className="flex w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="w-1/2 bg-neutral-100">
          <img src={imageUrl} className="h-full w-full object-cover p-8" alt={productName} />
        </div>
        <div className="flex w-1/2 flex-col p-8">
          <div className="flex justify-between items-start">
              <div>
                  <h3 className="text-xl font-bold text-neutral-900">{productName}</h3>
                  <p className="text-sm text-neutral-500">{productCategory}</p>
              </div>
              <button className="text-neutral-400 hover:text-neutral-600"><X size={20} /></button>
          </div>
          <div className="mt-4 text-2xl font-bold text-neutral-900">{price}</div>
          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">{description}</p>
          <div className="mt-6 space-y-4">
              <div>
                  <span className="text-xs font-bold uppercase text-neutral-500">Size</span>
                  <div className="mt-2 flex gap-2">
                      {sizeArray.map(s => (
                          <button key={s} className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 text-xs font-medium hover:border-black hover:bg-black hover:text-white transition-colors">{s}</button>
                      ))}
                  </div>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-bold text-white hover:bg-neutral-800">
                  <ShoppingBag size={16} /> {buttonText}
              </button>
          </div>
        </div>
      </div>
    </DialogContainer>
  );
};

// 13. Feedback Form
export interface FeedbackDialogProps {
  className?: string;
  title?: string;
  message?: string;
  placeholder?: string;
  skipText?: string;
  sendText?: string;
}

export const FeedbackDialog = ({
  className,
  title = "Your opinion matters",
  message = "How was your experience using our product?",
  placeholder = "Tell us what you think...",
  skipText = "Skip",
  sendText = "Send Feedback",
}: FeedbackDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-8 shadow-2xl border border-neutral-800">
      <div className="text-center">
        <MessageSquare className="mx-auto mb-4 text-indigo-500" size={32} />
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-neutral-400">{message}</p>
      </div>
      <div className="my-6 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map(i => (
            <button key={i} className="text-2xl hover:scale-125 transition-transform">
                {i <= 4 ? "⭐" : "🌑"}
            </button>
        ))}
      </div>
      <textarea 
        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-sm text-white placeholder-neutral-600 focus:border-indigo-500 focus:outline-none h-32 resize-none"
        placeholder={placeholder}
      ></textarea>
      <div className="mt-6 flex justify-end gap-3">
        <button className="text-sm text-neutral-400 hover:text-white">{skipText}</button>
        <ShinyButton className="h-9 px-6 text-xs">{sendText}</ShinyButton>
      </div>
    </div>
  </DialogContainer>
);

// 14. Onboarding Step
export interface OnboardingDialogProps {
  className?: string;
  title?: string;
  message?: string;
  buttonText?: string;
  currentStep?: number;
}

export const OnboardingDialog = ({
  className,
  title = "Magical AI Tools",
  message = "Generate content, images, and code in seconds. Let our AI assistant handle the boring stuff.",
  buttonText = "Next",
  currentStep = 1,
}: OnboardingDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="relative z-10">
        <div className="mb-6 inline-flex rounded-2xl bg-purple-100 p-3 text-purple-600">
            <Sparkles size={24} />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 text-neutral-600 leading-relaxed">{message}</p>
        <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1">
                {[1, 2, 3].map(step => (
                  <div 
                    key={step} 
                    className={cn(
                      "h-1.5 rounded-full",
                      step === currentStep ? "w-4 bg-purple-600" : "w-1.5 bg-neutral-200"
                    )}
                  />
                ))}
            </div>
            <button className="rounded-full bg-black px-6 py-2 text-sm font-bold text-white hover:bg-neutral-800">
                {buttonText}
            </button>
        </div>
      </div>
    </div>
  </DialogContainer>
);

// 15. Share Dialog
export interface ShareDialogProps {
  className?: string;
  title?: string;
  shareUrl?: string;
  copyText?: string;
}

export const ShareDialog = ({
  className,
  title = "Share this project",
  shareUrl = "https://lumina.ui/share/x8291",
  copyText = "Copy",
}: ShareDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-neutral-100">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold text-neutral-900">{title}</h3>
        <button className="text-neutral-400 hover:text-neutral-600"><X size={20} /></button>
      </div>
      
      <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
        {[
            { icon: Mail, label: "Email", color: "bg-blue-100 text-blue-600" },
            { icon: Share2, label: "Twitter", color: "bg-sky-100 text-sky-600" },
            { icon: Share2, label: "Facebook", color: "bg-blue-100 text-blue-800" },
            { icon: Share2, label: "LinkedIn", color: "bg-indigo-100 text-indigo-700" },
        ].map((item, i) => (
            <button key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", item.color)}>
                    <item.icon size={20} />
                </div>
                <span className="text-xs font-medium text-neutral-600">{item.label}</span>
            </button>
        ))}
      </div>

      <div className="relative">
        <input 
            type="text" 
            readOnly 
            value={shareUrl} 
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 pl-4 pr-20 text-sm text-neutral-600"
        />
        <button className="absolute right-1 top-1 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-neutral-900 shadow-sm border border-neutral-200 hover:bg-neutral-50">
            {copyText}
        </button>
      </div>
    </div>
  </DialogContainer>
);

// 16. Keyboard Shortcuts
export interface ShortcutsDialogProps {
  className?: string;
  title?: string;
}

export const ShortcutsDialog = ({
  className,
  title = "Keyboard Shortcuts",
}: ShortcutsDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-0 shadow-2xl overflow-hidden">
      <div className="border-b border-neutral-800 p-4">
        <div className="flex items-center gap-2 text-white font-bold">
            <Keyboard size={18} /> {title}
        </div>
      </div>
      <div className="p-2">
        {[
            { label: "General", items: [
                { name: "Search", keys: ["⌘", "K"] },
                { name: "Open Menu", keys: ["⌘", "M"] }
            ]},
            { label: "Navigation", items: [
                { name: "Go Back", keys: ["⌘", "["] },
                { name: "Go Forward", keys: ["⌘", "]"] }
            ]}
        ].map((group, i) => (
            <div key={i} className="mb-2 last:mb-0">
                <div className="px-4 py-2 text-xs font-bold text-neutral-500 uppercase">{group.label}</div>
                {group.items.map((item, j) => (
                    <div key={j} className="flex justify-between px-4 py-2 hover:bg-neutral-800 rounded mx-2">
                        <span className="text-sm text-neutral-300">{item.name}</span>
                        <div className="flex gap-1">
                            {item.keys.map(k => (
                                <kbd key={k} className="min-w-[20px] text-center rounded bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 text-xs font-bold text-neutral-400">{k}</kbd>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        ))}
      </div>
    </div>
  </DialogContainer>
);

// 17. Code Snippet (Terminal)
export interface CodeDialogProps {
  className?: string;
  fileName?: string;
  code?: string;
  copyText?: string;
}

export const CodeDialog = ({
  className,
  fileName = "install.sh",
  code = "npm install @lumina/ui\nnpx lumina init\n# Ready to go!",
  copyText = "Copy to Clipboard",
}: CodeDialogProps) => {
  const codeLines = code.split("\n");

  return (
    <DialogContainer className={className}>
      <div className="w-full max-w-lg rounded-xl bg-[#1e1e1e] border border-neutral-800 shadow-2xl font-mono text-sm">
        <div className="flex items-center justify-between border-b border-neutral-800 p-3 bg-[#252526] rounded-t-xl">
          <span className="text-neutral-400 text-xs">{fileName}</span>
          <button className="text-neutral-500 hover:text-white"><Code size={14}/></button>
        </div>
        <div className="p-4 overflow-x-auto text-neutral-300">
          {codeLines.map((line, i) => (
            <div key={i} className="flex">
                <span className="text-neutral-600 mr-4 select-none">{i + 1}</span>
                <span>
                  {line.includes("npm") && <span className="text-blue-400">npm</span>}
                  {line.includes("npx") && <span className="text-blue-400">npx</span>}
                  {line.startsWith("#") && <span className="text-green-600">{line}</span>}
                  {!line.includes("npm") && !line.includes("npx") && !line.startsWith("#") && <span>{line}</span>}
                </span>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-800 p-3 bg-[#252526] rounded-b-xl flex justify-end">
          <button className="text-xs text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-500">{copyText}</button>
        </div>
      </div>
    </DialogContainer>
  );
};

// 18. Two-Factor Auth
export interface TwoFactorDialogProps {
  className?: string;
  title?: string;
  message?: string;
  verifyText?: string;
  resendText?: string;
  buttonColor?: string;
}

export const TwoFactorDialog = ({
  className,
  title = "Two-Factor Authentication",
  message = "Enter the 6-digit code sent to your device ending in **89.",
  verifyText = "Verify",
  resendText = "Resend Code",
  buttonColor = "#4f46e5",
}: TwoFactorDialogProps) => {
  const buttonRgb = buttonColor && buttonColor.trim() !== "" 
    ? (buttonColor.startsWith("rgb") ? buttonColor : (hexToRgb(buttonColor) || buttonColor))
    : "rgb(79 70 229)";

  return (
    <DialogContainer className={className}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
          <ShieldCheck size={28} />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm text-neutral-500 mb-6">{message}</p>
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-12 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center text-xl font-bold text-neutral-900">
                  {i === 1 ? "4" : i === 2 ? "2" : ""}
              </div>
          ))}
        </div>
        <button 
          className="w-full rounded-lg py-3 font-bold text-white hover:opacity-90"
          style={{ backgroundColor: buttonRgb }}
        >
          {verifyText}
        </button>
        <p className="mt-4 text-xs text-indigo-600 cursor-pointer hover:underline">{resendText}</p>
      </div>
    </DialogContainer>
  );
};

// 19. Plan Upgrade
export interface UpgradeDialogProps {
  className?: string;
  title?: string;
  message?: string;
  freePlanName?: string;
  freePlanPrice?: string;
  proPlanName?: string;
  proPlanPrice?: string;
  upgradeText?: string;
  upgradeButtonColor?: string;
}

export const UpgradeDialog = ({
  className,
  title = "Upgrade your plan",
  message = "Unlock the full potential of your workspace.",
  freePlanName = "Free",
  freePlanPrice = "$0",
  proPlanName = "Pro",
  proPlanPrice = "$29",
  upgradeText = "Upgrade",
  upgradeButtonColor = "#4f46e5",
}: UpgradeDialogProps) => {
  const upgradeRgb = upgradeButtonColor && upgradeButtonColor.trim() !== "" 
    ? (upgradeButtonColor.startsWith("rgb") ? upgradeButtonColor : (hexToRgb(upgradeButtonColor) || upgradeButtonColor))
    : "rgb(79 70 229)";

  return (
    <DialogContainer className={className}>
      <div className="w-full max-w-2xl rounded-2xl bg-neutral-900 p-8 border border-neutral-800 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-neutral-400">{message}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 opacity-60 hover:opacity-100 transition-opacity">
              <h4 className="font-bold text-white">{freePlanName}</h4>
              <div className="text-2xl font-bold text-white mt-2">{freePlanPrice}</div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-400">
                  <li>• 1 Project</li>
                  <li>• Community Support</li>
              </ul>
              <button className="mt-6 w-full rounded-lg border border-neutral-700 py-2 text-sm font-medium text-white">Current</button>
          </div>
          <div className="relative rounded-xl border border-indigo-500 bg-indigo-900/20 p-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-0.5 text-xs font-bold text-white">RECOMMENDED</div>
              <h4 className="font-bold text-white">{proPlanName}</h4>
              <div className="text-2xl font-bold text-white mt-2">{proPlanPrice}</div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                  <li>• Unlimited Projects</li>
                  <li>• Priority Support</li>
                  <li>• Analytics</li>
              </ul>
              <button 
                className="mt-6 w-full rounded-lg py-2 text-sm font-bold text-white hover:opacity-90"
                style={{ backgroundColor: upgradeRgb }}
              >
                {upgradeText}
              </button>
          </div>
        </div>
      </div>
    </DialogContainer>
  );
};

// 20. System Error (Retro)
export interface SystemErrorDialogProps {
  className?: string;
  title?: string;
  errorTitle?: string;
  errorMessage?: string;
  abortText?: string;
  retryText?: string;
}

export const SystemErrorDialog = ({
  className,
  title = "System_Error.exe",
  errorTitle = "Critical Failure",
  errorMessage = "An unexpected error occurred in module 0x4F2. System integrity may be compromised.",
  abortText = "ABORT",
  retryText = "RETRY",
}: SystemErrorDialogProps) => (
  <DialogContainer className={className}>
    <div className="w-full max-w-md border-2 border-red-500 bg-black p-1 shadow-[4px_4px_0px_#ef4444]">
      <div className="flex items-center justify-between bg-red-500 px-2 py-1">
        <span className="font-mono text-xs font-bold text-black uppercase">{title}</span>
        <button className="text-black hover:text-white"><X size={14} /></button>
      </div>
      <div className="p-6 text-center">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
        <h3 className="font-mono text-xl font-bold text-red-500 uppercase">{errorTitle}</h3>
        <p className="mt-4 font-mono text-sm text-red-400">{errorMessage}</p>
        <div className="mt-8 flex justify-center gap-4">
            <button className="border border-red-500 bg-red-900/20 px-6 py-2 font-mono text-xs text-red-500 hover:bg-red-500 hover:text-black">{abortText}</button>
            <button className="bg-red-500 px-6 py-2 font-mono text-xs font-bold text-black hover:bg-red-400">{retryText}</button>
        </div>
      </div>
    </div>
  </DialogContainer>
);

// Component map
const dialogComponentMap: Record<string, React.FC<any>> = {
  "SimpleAlertDialog": SimpleAlertDialog,
  "DestructiveDialog": DestructiveDialog,
  "SuccessDialog": SuccessDialog,
  "NewsletterDialog": NewsletterDialog,
  "CookieDialog": CookieDialog,
  "SpotlightDialog": SpotlightDialog,
  "VideoDialog": VideoDialog,
  "LoginDialog": LoginDialog,
  "PaymentDialog": PaymentDialog,
  "InviteDialog": InviteDialog,
  "UploadDialog": UploadDialog,
  "ProductDialog": ProductDialog,
  "FeedbackDialog": FeedbackDialog,
  "OnboardingDialog": OnboardingDialog,
  "ShareDialog": ShareDialog,
  "ShortcutsDialog": ShortcutsDialog,
  "CodeDialog": CodeDialog,
  "TwoFactorDialog": TwoFactorDialog,
  "UpgradeDialog": UpgradeDialog,
  "SystemErrorDialog": SystemErrorDialog,
};

export const dialogComponentsByName = dialogSections.reduce<Record<string, React.FC<any>>>(
  (acc, dialog) => {
    acc[dialog.componentName] = dialogComponentMap[dialog.componentName];
    return acc;
  },
  {}
);


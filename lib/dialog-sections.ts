export type DialogPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"
  | "number"

export interface DialogPropDefinition {
  control: DialogPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface DialogSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, DialogPropDefinition>
}

// Common props for dialogs
const commonDialogProps: Record<string, DialogPropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the dialog.",
  },
}

export const dialogSections: DialogSectionMeta[] = [
  {
    slug: "simple-alert-dialog",
    name: "Simple Alert Dialog",
    componentName: "SimpleAlertDialog",
    description: "A simple alert dialog with title, message, and action buttons.",
    tags: ["dialog", "alert", "confirmation", "delete"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Delete Project?",
        description: "The title of the dialog.",
      },
      message: {
        control: "textarea",
        default: "This action cannot be undone. All data will be permanently removed.",
        description: "The message content of the dialog.",
      },
      cancelText: {
        control: "text",
        default: "Cancel",
        description: "Text for the cancel button.",
      },
      confirmText: {
        control: "text",
        default: "Delete",
        description: "Text for the confirm button.",
      },
      confirmButtonColor: {
        control: "color",
        default: "#dc2626",
        description: "Color of the confirm button.",
      },
    },
  },
  {
    slug: "destructive-dialog",
    name: "Destructive Dialog",
    componentName: "DestructiveDialog",
    description: "A dark destructive warning dialog with icon.",
    tags: ["dialog", "destructive", "warning", "dark"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Revoke Access",
        description: "The title of the dialog.",
      },
      message: {
        control: "textarea",
        default: "Are you sure you want to revoke API access for this token?",
        description: "The message content of the dialog.",
      },
      cancelText: {
        control: "text",
        default: "Cancel",
        description: "Text for the cancel button.",
      },
      confirmText: {
        control: "text",
        default: "Revoke",
        description: "Text for the confirm button.",
      },
    },
  },
  {
    slug: "success-dialog",
    name: "Success Dialog",
    componentName: "SuccessDialog",
    description: "A success message dialog with green indicator.",
    tags: ["dialog", "success", "message", "payment"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Payment Successful!",
        description: "The title of the dialog.",
      },
      message: {
        control: "textarea",
        default: "Your transaction ID is #883491. A receipt has been sent to your email.",
        description: "The message content of the dialog.",
      },
      buttonText: {
        control: "text",
        default: "Done",
        description: "Text for the action button.",
      },
    },
  },
  {
    slug: "newsletter-dialog",
    name: "Newsletter Dialog",
    componentName: "NewsletterDialog",
    description: "A newsletter subscription dialog with email input.",
    tags: ["dialog", "newsletter", "subscribe", "email"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Stay in the loop",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "Join our newsletter to get weekly design resources and updates.",
        description: "The message content of the dialog.",
      },
      placeholder: {
        control: "text",
        default: "Enter your email",
        description: "Placeholder text for the email input.",
      },
      buttonText: {
        control: "text",
        default: "Join",
        description: "Text for the subscribe button.",
      },
      buttonColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color of the subscribe button.",
      },
    },
  },
  {
    slug: "cookie-dialog",
    name: "Cookie Dialog",
    componentName: "CookieDialog",
    description: "A cookie consent dialog with accept and preferences buttons.",
    tags: ["dialog", "cookie", "consent", "privacy"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Cookies & Privacy",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "We use cookies to ensure you get the best experience on our website.",
        description: "The message content of the dialog.",
      },
      acceptText: {
        control: "text",
        default: "Accept All",
        description: "Text for the accept button.",
      },
      preferencesText: {
        control: "text",
        default: "Preferences",
        description: "Text for the preferences button.",
      },
    },
  },
  {
    slug: "spotlight-dialog",
    name: "Spotlight Dialog",
    componentName: "SpotlightDialog",
    description: "A command palette dialog with search functionality.",
    tags: ["dialog", "command", "palette", "search", "spotlight"],
    props: {
      ...commonDialogProps,
      placeholder: {
        control: "text",
        default: "Search commands...",
        description: "Placeholder text for the search input.",
      },
      suggestionLabel: {
        control: "text",
        default: "SUGGESTIONS",
        description: "Label for the suggestions section.",
      },
      command1: {
        control: "text",
        default: "Create New Project",
        description: "First command suggestion.",
      },
      command2: {
        control: "text",
        default: "Search Documentation",
        description: "Second command suggestion.",
      },
    },
  },
  {
    slug: "video-dialog",
    name: "Video Dialog",
    componentName: "VideoDialog",
    description: "A video player dialog with thumbnail and play button.",
    tags: ["dialog", "video", "player", "media"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Introducing Lumina UI",
        description: "The title of the video.",
      },
      description: {
        control: "text",
        default: "Learn how to build faster with our new component library.",
        description: "The description of the video.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
        description: "URL of the video thumbnail image.",
      },
    },
  },
  {
    slug: "login-dialog",
    name: "Login Dialog",
    componentName: "LoginDialog",
    description: "A glassmorphism login form dialog.",
    tags: ["dialog", "login", "form", "glass", "auth"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Welcome Back",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "Please sign in to continue.",
        description: "The message content of the dialog.",
      },
      emailPlaceholder: {
        control: "text",
        default: "Email address",
        description: "Placeholder text for the email input.",
      },
      passwordPlaceholder: {
        control: "text",
        default: "Password",
        description: "Placeholder text for the password input.",
      },
      buttonText: {
        control: "text",
        default: "Sign In",
        description: "Text for the sign in button.",
      },
    },
  },
  {
    slug: "payment-dialog",
    name: "Payment Dialog",
    componentName: "PaymentDialog",
    description: "A payment method dialog with credit card display.",
    tags: ["dialog", "payment", "card", "credit"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Payment Method",
        description: "The title of the dialog.",
      },
      cardNumber: {
        control: "text",
        default: "•••• •••• •••• 4242",
        description: "The masked card number.",
      },
      cardholderName: {
        control: "text",
        default: "Alex Morgan",
        description: "The cardholder name.",
      },
      expiryDate: {
        control: "text",
        default: "12/24",
        description: "The card expiry date.",
      },
      cancelText: {
        control: "text",
        default: "Cancel",
        description: "Text for the cancel button.",
      },
      saveText: {
        control: "text",
        default: "Save Card",
        description: "Text for the save button.",
      },
    },
  },
  {
    slug: "invite-dialog",
    name: "Invite Dialog",
    componentName: "InviteDialog",
    description: "A team invite dialog with email inputs and role selection.",
    tags: ["dialog", "invite", "team", "collaboration"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Invite Team Members",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "Invite colleagues to collaborate on this project.",
        description: "The message content of the dialog.",
      },
      email1Placeholder: {
        control: "text",
        default: "colleague@company.com",
        description: "Placeholder for the first email input.",
      },
      email2Placeholder: {
        control: "text",
        default: "another@company.com",
        description: "Placeholder for the second email input.",
      },
      buttonText: {
        control: "text",
        default: "Send Invites",
        description: "Text for the send invites button.",
      },
    },
  },
  {
    slug: "upload-dialog",
    name: "Upload Dialog",
    componentName: "UploadDialog",
    description: "A file upload dialog with drag and drop area.",
    tags: ["dialog", "upload", "file", "drag-drop"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Upload Files",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "Select and upload the files of your choice.",
        description: "The message content of the dialog.",
      },
      dropText: {
        control: "text",
        default: "Choose a file or drag & drop it here.",
        description: "Text for the drop zone.",
      },
      fileTypes: {
        control: "text",
        default: "JPEG, PNG, PDG up to 50MB",
        description: "Accepted file types and size limit.",
      },
      browseText: {
        control: "text",
        default: "Browse File",
        description: "Text for the browse button.",
      },
      cancelText: {
        control: "text",
        default: "Cancel",
        description: "Text for the cancel button.",
      },
      uploadText: {
        control: "text",
        default: "Upload",
        description: "Text for the upload button.",
      },
      uploadButtonColor: {
        control: "color",
        default: "#2563eb",
        description: "Color of the upload button.",
      },
    },
  },
  {
    slug: "product-dialog",
    name: "Product Dialog",
    componentName: "ProductDialog",
    description: "A product quick view dialog with image and details.",
    tags: ["dialog", "product", "ecommerce", "shopping"],
    props: {
      ...commonDialogProps,
      productName: {
        control: "text",
        default: "Nike Air Max",
        description: "The name of the product.",
      },
      productCategory: {
        control: "text",
        default: "Men's Running Shoe",
        description: "The category of the product.",
      },
      price: {
        control: "text",
        default: "$129.99",
        description: "The price of the product.",
      },
      description: {
        control: "textarea",
        default: "The Nike Air Max delivers comfortable support and premium cushioning for your daily run.",
        description: "The product description.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
        description: "URL of the product image.",
      },
      sizes: {
        control: "text",
        default: "7,8,9,10",
        description: "Comma-separated list of available sizes.",
      },
      buttonText: {
        control: "text",
        default: "Add to Cart",
        description: "Text for the add to cart button.",
      },
    },
  },
  {
    slug: "feedback-dialog",
    name: "Feedback Dialog",
    componentName: "FeedbackDialog",
    description: "A feedback form dialog with rating stars.",
    tags: ["dialog", "feedback", "rating", "form"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Your opinion matters",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "How was your experience using our product?",
        description: "The message content of the dialog.",
      },
      placeholder: {
        control: "text",
        default: "Tell us what you think...",
        description: "Placeholder text for the feedback textarea.",
      },
      skipText: {
        control: "text",
        default: "Skip",
        description: "Text for the skip button.",
      },
      sendText: {
        control: "text",
        default: "Send Feedback",
        description: "Text for the send feedback button.",
      },
    },
  },
  {
    slug: "onboarding-dialog",
    name: "Onboarding Dialog",
    componentName: "OnboardingDialog",
    description: "An onboarding step dialog with progress indicator.",
    tags: ["dialog", "onboarding", "tutorial", "steps"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Magical AI Tools",
        description: "The title of the dialog.",
      },
      message: {
        control: "textarea",
        default: "Generate content, images, and code in seconds. Let our AI assistant handle the boring stuff.",
        description: "The message content of the dialog.",
      },
      buttonText: {
        control: "text",
        default: "Next",
        description: "Text for the next button.",
      },
      currentStep: {
        control: "number",
        default: 1,
        min: 1,
        max: 3,
        description: "Current step number (1-3).",
      },
    },
  },
  {
    slug: "share-dialog",
    name: "Share Dialog",
    componentName: "ShareDialog",
    description: "A share dialog with social media options and link copy.",
    tags: ["dialog", "share", "social", "link"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Share this project",
        description: "The title of the dialog.",
      },
      shareUrl: {
        control: "text",
        default: "https://lumina.ui/share/x8291",
        description: "The URL to share.",
      },
      copyText: {
        control: "text",
        default: "Copy",
        description: "Text for the copy button.",
      },
    },
  },
  {
    slug: "shortcuts-dialog",
    name: "Shortcuts Dialog",
    componentName: "ShortcutsDialog",
    description: "A keyboard shortcuts reference dialog.",
    tags: ["dialog", "shortcuts", "keyboard", "help"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Keyboard Shortcuts",
        description: "The title of the dialog.",
      },
    },
  },
  {
    slug: "code-dialog",
    name: "Code Dialog",
    componentName: "CodeDialog",
    description: "A code snippet dialog with terminal-style display.",
    tags: ["dialog", "code", "snippet", "terminal"],
    props: {
      ...commonDialogProps,
      fileName: {
        control: "text",
        default: "install.sh",
        description: "The name of the code file.",
      },
      code: {
        control: "textarea",
        default: "npm install @lumina/ui\nnpx lumina init\n# Ready to go!",
        description: "The code content to display.",
      },
      copyText: {
        control: "text",
        default: "Copy to Clipboard",
        description: "Text for the copy button.",
      },
    },
  },
  {
    slug: "two-factor-dialog",
    name: "Two-Factor Dialog",
    componentName: "TwoFactorDialog",
    description: "A two-factor authentication dialog with code input.",
    tags: ["dialog", "2fa", "auth", "security"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Two-Factor Authentication",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "Enter the 6-digit code sent to your device ending in **89.",
        description: "The message content of the dialog.",
      },
      verifyText: {
        control: "text",
        default: "Verify",
        description: "Text for the verify button.",
      },
      resendText: {
        control: "text",
        default: "Resend Code",
        description: "Text for the resend code link.",
      },
      buttonColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color of the verify button.",
      },
    },
  },
  {
    slug: "upgrade-dialog",
    name: "Upgrade Dialog",
    componentName: "UpgradeDialog",
    description: "A plan upgrade dialog with pricing options.",
    tags: ["dialog", "upgrade", "pricing", "plan"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "Upgrade your plan",
        description: "The title of the dialog.",
      },
      message: {
        control: "text",
        default: "Unlock the full potential of your workspace.",
        description: "The message content of the dialog.",
      },
      freePlanName: {
        control: "text",
        default: "Free",
        description: "Name of the free plan.",
      },
      freePlanPrice: {
        control: "text",
        default: "$0",
        description: "Price of the free plan.",
      },
      proPlanName: {
        control: "text",
        default: "Pro",
        description: "Name of the pro plan.",
      },
      proPlanPrice: {
        control: "text",
        default: "$29",
        description: "Price of the pro plan.",
      },
      upgradeText: {
        control: "text",
        default: "Upgrade",
        description: "Text for the upgrade button.",
      },
      upgradeButtonColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color of the upgrade button.",
      },
    },
  },
  {
    slug: "system-error-dialog",
    name: "System Error Dialog",
    componentName: "SystemErrorDialog",
    description: "A retro-style system error dialog.",
    tags: ["dialog", "error", "system", "retro"],
    props: {
      ...commonDialogProps,
      title: {
        control: "text",
        default: "System_Error.exe",
        description: "The title of the error dialog.",
      },
      errorTitle: {
        control: "text",
        default: "Critical Failure",
        description: "The error title.",
      },
      errorMessage: {
        control: "textarea",
        default: "An unexpected error occurred in module 0x4F2. System integrity may be compromised.",
        description: "The error message.",
      },
      abortText: {
        control: "text",
        default: "ABORT",
        description: "Text for the abort button.",
      },
      retryText: {
        control: "text",
        default: "RETRY",
        description: "Text for the retry button.",
      },
    },
  },
]


export type SheetPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"
  | "number"

export interface SheetPropDefinition {
  control: SheetPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
}

export interface SheetSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, SheetPropDefinition>
  groupingConfig?: any
}

// Common props for sheets
const commonSheetProps: Record<string, SheetPropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the sheet.",
  },
  position: {
    control: "select",
    default: "right",
    options: ["right", "left", "bottom"],
    description: "Position of the sheet (right, left, or bottom).",
  },
  overlay: {
    control: "boolean",
    default: true,
    description: "Whether to show the overlay behind the sheet.",
  },
  backgroundColor: {
    control: "color",
    default: "",
    description: "Background color (optional, uses default if empty).",
  },
  textColor: {
    control: "color",
    default: "",
    description: "Text color (optional, uses default if empty).",
  },
  borderColor: {
    control: "color",
    default: "",
    description: "Border color (optional, uses default if empty).",
  },
  width: {
    control: "slider",
    min: 200,
    max: 600,
    default: 320,
    description: "Sheet width in pixels (for right/left position).",
  },
  padding: {
    control: "slider",
    min: 0,
    max: 32,
    default: 24,
    description: "Padding in pixels.",
  },
  borderRadius: {
    control: "slider",
    min: 0,
    max: 32,
    default: 0,
    description: "Border radius in pixels.",
  },
  borderWidth: {
    control: "slider",
    min: 0,
    max: 4,
    default: 0,
    description: "Border width in pixels.",
  },
}

export const sheetSections: SheetSectionMeta[] = [
  {
    slug: "standard-right-sheet",
    name: "Standard Right Sheet",
    componentName: "StandardRightSheet",
    description: "A standard right-side sheet with form inputs and action buttons.",
    tags: ["sheet", "right", "form", "standard"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Edit Profile",
        description: "Title of the sheet.",
      },
      fullName: {
        control: "text",
        default: "Alex Morgan",
        description: "Default value for full name input.",
      },
      bio: {
        control: "textarea",
        default: "Product Designer based in SF.",
        description: "Default value for bio textarea.",
      },
      cancelText: {
        control: "text",
        default: "Cancel",
        description: "Text for the cancel button.",
      },
      saveText: {
        control: "text",
        default: "Save",
        description: "Text for the save button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 280,
        max: 500,
        default: 320,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "bottom-sheet",
    name: "Bottom Sheet",
    componentName: "BottomSheet",
    description: "A mobile-style bottom sheet with rounded corners and action grid.",
    tags: ["sheet", "bottom", "mobile", "actions"],
    props: {
      ...commonSheetProps,
      position: {
        control: "select",
        default: "bottom",
        options: ["bottom"],
        description: "Position of the sheet (bottom only).",
      },
      title: {
        control: "text",
        default: "Share this shot",
        description: "Title of the sheet.",
      },
      subtitle: {
        control: "text",
        default: "Design System v2.0",
        description: "Subtitle of the sheet.",
      },
      cancelText: {
        control: "text",
        default: "Cancel",
        description: "Text for the cancel button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
    },
  },
  {
    slug: "glass-sheet",
    name: "Glass Sheet",
    componentName: "GlassSheet",
    description: "A glassmorphism sheet with backdrop blur and transparency effects.",
    tags: ["sheet", "glassmorphism", "blur", "transparent"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Settings",
        description: "Title of the sheet.",
      },
      menuItems: {
        control: "textarea",
        default: "General\nAppearance\nPrivacy\nNotifications",
        description: "Menu items, one per line.",
      },
      planName: {
        control: "text",
        default: "Pro Plan",
        description: "Plan name.",
      },
      planStatus: {
        control: "text",
        default: "Active",
        description: "Plan status text.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses glass effect if empty).",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#ffffff",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 280,
        max: 500,
        default: 320,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "dark-details-sheet",
    name: "Dark Details Sheet",
    componentName: "DarkDetailsSheet",
    description: "A dark-themed details sheet with image preview and metadata.",
    tags: ["sheet", "dark", "details", "metadata"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Abstract Waves",
        description: "Title of the item.",
      },
      subtitle: {
        control: "text",
        default: "Uploaded by Alex • 2m ago",
        description: "Subtitle text.",
      },
      fileName: {
        control: "text",
        default: "IMG_0291.jpg",
        description: "File name to display.",
      },
      dimensions: {
        control: "text",
        default: "1920 x 1080",
        description: "Image dimensions.",
      },
      fileSize: {
        control: "text",
        default: "2.4 MB",
        description: "File size.",
      },
      tags: {
        control: "textarea",
        default: "Design\nAbstract\nWallpaper\n4K",
        description: "Tags, one per line.",
      },
      downloadText: {
        control: "text",
        default: "Download",
        description: "Text for the download button.",
      },
      backgroundColor: {
        control: "color",
        default: "#0F1115",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#262626",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 320,
        max: 600,
        default: 384,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "cart-sheet",
    name: "Cart Sheet",
    componentName: "CartSheet",
    description: "A shopping cart sheet with item list and checkout button.",
    tags: ["sheet", "cart", "shopping", "ecommerce"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Your Cart",
        description: "Title of the cart sheet.",
      },
      itemCount: {
        control: "number",
        default: 3,
        description: "Number of items in cart.",
      },
      itemName: {
        control: "text",
        default: "Minimalist Chair",
        description: "Name of the cart item.",
      },
      itemVariant: {
        control: "text",
        default: "Charcoal / Wood",
        description: "Variant of the cart item.",
      },
      itemPrice: {
        control: "text",
        default: "$240",
        description: "Price of each item.",
      },
      subtotalLabel: {
        control: "text",
        default: "Subtotal",
        description: "Label for subtotal.",
      },
      subtotalAmount: {
        control: "text",
        default: "$720.00",
        description: "Subtotal amount.",
      },
      checkoutText: {
        control: "text",
        default: "Checkout",
        description: "Text for the checkout button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 320,
        max: 600,
        default: 384,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "filter-sheet",
    name: "Filter Sheet",
    componentName: "FilterSheet",
    description: "A left-side filter panel with price range, categories, and colors.",
    tags: ["sheet", "left", "filter", "sidebar"],
    props: {
      ...commonSheetProps,
      position: {
        control: "select",
        default: "left",
        options: ["left"],
        description: "Position of the sheet (left only).",
      },
      title: {
        control: "text",
        default: "Filters",
        description: "Title of the filter sheet.",
      },
      resetText: {
        control: "text",
        default: "Reset",
        description: "Text for the reset button.",
      },
      priceRangeMin: {
        control: "text",
        default: "$50",
        description: "Minimum price in range.",
      },
      priceRangeMax: {
        control: "text",
        default: "$200",
        description: "Maximum price in range.",
      },
      categories: {
        control: "textarea",
        default: "Furniture\nLighting\nAccessories\nArt",
        description: "Category options, one per line.",
      },
      resultsText: {
        control: "text",
        default: "Show 24 Results",
        description: "Text for the results button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 240,
        max: 400,
        default: 288,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "profile-sheet",
    name: "Profile Sheet",
    componentName: "ProfileSheet",
    description: "A user profile sheet with account settings and navigation.",
    tags: ["sheet", "profile", "user", "settings"],
    props: {
      ...commonSheetProps,
      profileName: {
        control: "text",
        default: "Alex Morgan",
        description: "User's full name.",
      },
      profileEmail: {
        control: "text",
        default: "alex@lumina.ui",
        description: "User's email address.",
      },
      menuItems: {
        control: "textarea",
        default: "Account Details\nNotifications\nSecurity\nBilling",
        description: "Menu items, one per line.",
      },
      signOutText: {
        control: "text",
        default: "Sign Out",
        description: "Text for the sign out button.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#525252",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 280,
        max: 500,
        default: 320,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "nav-drawer",
    name: "Navigation Drawer",
    componentName: "NavDrawer",
    description: "A hamburger-style navigation drawer with menu items and storage info.",
    tags: ["sheet", "left", "navigation", "drawer"],
    props: {
      ...commonSheetProps,
      position: {
        control: "select",
        default: "left",
        options: ["left"],
        description: "Position of the sheet (left only).",
      },
      logoText: {
        control: "text",
        default: "L",
        description: "Logo text or initial.",
      },
      brandName: {
        control: "text",
        default: "Lumina",
        description: "Brand name.",
      },
      menuItems: {
        control: "textarea",
        default: "Dashboard\nProjects\nTeam\nCalendar\nReports",
        description: "Navigation menu items, one per line.",
      },
      storageLabel: {
        control: "text",
        default: "Storage",
        description: "Label for storage section.",
      },
      storageText: {
        control: "text",
        default: "7.5GB of 10GB used",
        description: "Storage usage text.",
      },
      backgroundColor: {
        control: "color",
        default: "#1a1a1a",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for content.",
      },
      activeColor: {
        control: "color",
        default: "#6366f1",
        description: "Color for active items.",
      },
      width: {
        control: "slider",
        min: 240,
        max: 400,
        default: 256,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "music-sheet",
    name: "Music Player Sheet",
    componentName: "MusicSheet",
    description: "A bottom music player bar with controls and progress.",
    tags: ["sheet", "bottom", "music", "player"],
    props: {
      ...commonSheetProps,
      position: {
        control: "select",
        default: "bottom",
        options: ["bottom"],
        description: "Position of the sheet (bottom only).",
      },
      overlay: {
        control: "boolean",
        default: false,
        description: "Whether to show the overlay behind the sheet.",
      },
      trackTitle: {
        control: "text",
        default: "Midnight City",
        description: "Track title.",
      },
      artistName: {
        control: "text",
        default: "M83",
        description: "Artist name.",
      },
      currentTime: {
        control: "text",
        default: "1:20",
        description: "Current playback time.",
      },
      totalTime: {
        control: "text",
        default: "4:03",
        description: "Total track duration.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#262626",
        description: "Border color of the sheet.",
      },
    },
  },
  {
    slug: "notification-sheet",
    name: "Notification Sheet",
    componentName: "NotificationSheet",
    description: "A notification feed sheet with activity list.",
    tags: ["sheet", "notification", "feed", "activity"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Notifications",
        description: "Title of the notification sheet.",
      },
      markAllReadText: {
        control: "text",
        default: "Mark all read",
        description: "Text for the mark all read button.",
      },
      notificationCount: {
        control: "number",
        default: 5,
        description: "Number of notifications to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 280,
        max: 500,
        default: 320,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "chat-sheet",
    name: "Chat Sheet",
    componentName: "ChatSheet",
    description: "A chat thread sheet with messages and input.",
    tags: ["sheet", "chat", "messaging", "thread"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Design Sync",
        description: "Title of the chat thread.",
      },
      participantCount: {
        control: "text",
        default: "3 participants",
        description: "Number of participants.",
      },
      placeholder: {
        control: "text",
        default: "Type a message...",
        description: "Placeholder text for message input.",
      },
      sendText: {
        control: "text",
        default: "SEND",
        description: "Text for the send button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 320,
        max: 600,
        default: 384,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "brutalist-sheet",
    name: "Brutalist Sheet",
    componentName: "BrutalistSheet",
    description: "A bold brutalist-style sheet with high contrast and bold borders.",
    tags: ["sheet", "brutalist", "bold", "high-contrast"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Menu",
        description: "Title of the sheet.",
      },
      menuItems: {
        control: "textarea",
        default: "Home\nShop\nAbout\nContact",
        description: "Menu items, one per line.",
      },
      footerText: {
        control: "text",
        default: "EST. 2024",
        description: "Footer text.",
      },
      backgroundColor: {
        control: "color",
        default: "#facc15",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#000000",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#000000",
        description: "Border color of the sheet.",
      },
      borderWidth: {
        control: "slider",
        min: 0,
        max: 8,
        default: 4,
        description: "Border width in pixels.",
      },
      width: {
        control: "slider",
        min: 320,
        max: 600,
        default: 384,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "floating-sheet",
    name: "Floating Sheet",
    componentName: "FloatingSheet",
    description: "A floating island-style sheet with rounded corners and shadow.",
    tags: ["sheet", "floating", "island", "rounded"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Upgrade to Pro",
        description: "Title of the sheet.",
      },
      description: {
        control: "text",
        default: "Get unlimited access to all features.",
        description: "Description text.",
      },
      features: {
        control: "textarea",
        default: "Feature number 1 included\nFeature number 2 included\nFeature number 3 included",
        description: "Feature list, one per line.",
      },
      upgradeText: {
        control: "text",
        default: "Upgrade Now",
        description: "Text for the upgrade button.",
      },
      laterText: {
        control: "text",
        default: "Maybe Later",
        description: "Text for the later button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      buttonColor: {
        control: "color",
        default: "#2563eb",
        description: "Color of the upgrade button.",
      },
      width: {
        control: "slider",
        min: 280,
        max: 500,
        default: 320,
        description: "Sheet width in pixels.",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 32,
        default: 24,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "full-screen-sheet",
    name: "Full Screen Sheet",
    componentName: "FullScreenSheet",
    description: "A full-screen bottom sheet for creating new events.",
    tags: ["sheet", "bottom", "fullscreen", "form"],
    props: {
      ...commonSheetProps,
      position: {
        control: "select",
        default: "bottom",
        options: ["bottom"],
        description: "Position of the sheet (bottom only).",
      },
      title: {
        control: "text",
        default: "Create New Event",
        description: "Title of the sheet.",
      },
      saveText: {
        control: "text",
        default: "Save",
        description: "Text for the save button.",
      },
      eventTitlePlaceholder: {
        control: "text",
        default: "Event Title",
        description: "Placeholder for event title input.",
      },
      timeLabel: {
        control: "text",
        default: "Time",
        description: "Label for time field.",
      },
      timeValue: {
        control: "text",
        default: "All day",
        description: "Default time value.",
      },
      locationLabel: {
        control: "text",
        default: "Location",
        description: "Label for location field.",
      },
      locationPlaceholder: {
        control: "text",
        default: "Add location",
        description: "Placeholder for location field.",
      },
      descriptionLabel: {
        control: "text",
        default: "Description",
        description: "Label for description field.",
      },
      descriptionPlaceholder: {
        control: "text",
        default: "Add description",
        description: "Placeholder for description field.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Border color of the sheet.",
      },
    },
  },
  {
    slug: "contextual-sheet",
    name: "Contextual Sheet",
    componentName: "ContextualSheet",
    description: "A contextual info sidebar with properties and history.",
    tags: ["sheet", "right", "contextual", "properties"],
    props: {
      ...commonSheetProps,
      overlay: {
        control: "boolean",
        default: false,
        description: "Whether to show the overlay behind the sheet.",
      },
      propertiesTitle: {
        control: "text",
        default: "Properties",
        description: "Title for properties section.",
      },
      statusLabel: {
        control: "text",
        default: "Status",
        description: "Label for status field.",
      },
      statusValue: {
        control: "text",
        default: "Published",
        description: "Status value.",
      },
      assigneeLabel: {
        control: "text",
        default: "Assignee",
        description: "Label for assignee field.",
      },
      assigneeName: {
        control: "text",
        default: "Alex Morgan",
        description: "Assignee name.",
      },
      datesLabel: {
        control: "text",
        default: "Dates",
        description: "Label for dates field.",
      },
      datesValue: {
        control: "text",
        default: "Oct 24 - Nov 02",
        description: "Dates value.",
      },
      historyTitle: {
        control: "text",
        default: "History",
        description: "Title for history section.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 240,
        max: 400,
        default: 288,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "task-detail-sheet",
    name: "Task Detail Sheet",
    componentName: "TaskDetailSheet",
    description: "A Linear-style task detail sheet with issue information.",
    tags: ["sheet", "task", "linear", "issue", "dark"],
    props: {
      ...commonSheetProps,
      issueId: {
        control: "text",
        default: "LUM-342",
        description: "Issue ID.",
      },
      priority: {
        control: "text",
        default: "High Priority",
        description: "Issue priority.",
      },
      title: {
        control: "text",
        default: "Fix alignment on mobile navigation",
        description: "Issue title.",
      },
      assigneeName: {
        control: "text",
        default: "Sarah",
        description: "Assignee name.",
      },
      status: {
        control: "text",
        default: "In Progress",
        description: "Issue status.",
      },
      description: {
        control: "textarea",
        default: "The navigation bar is overlapping with the logo on screens smaller than 375px. We need to adjust the padding and potentially hide the text labels.",
        description: "Issue description.",
      },
      checklistItems: {
        control: "textarea",
        default: "Check iPhone SE layout\nUpdate Tailwind classes\nVerify touch targets",
        description: "Checklist items, one per line.",
      },
      commentPlaceholder: {
        control: "text",
        default: "Add a comment...",
        description: "Placeholder for comment input.",
      },
      backgroundColor: {
        control: "color",
        default: "#1C1C1F",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#E3E3E8",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#2E2E33",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 400,
        max: 700,
        default: 500,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "config-sheet",
    name: "Config Sheet",
    componentName: "ConfigSheet",
    description: "A code editor-style sheet for configuration files.",
    tags: ["sheet", "code", "editor", "config", "dark"],
    props: {
      ...commonSheetProps,
      fileName: {
        control: "text",
        default: "tailwind.config.js",
        description: "Configuration file name.",
      },
      resetText: {
        control: "text",
        default: "Reset",
        description: "Text for the reset button.",
      },
      saveText: {
        control: "text",
        default: "Save Changes",
        description: "Text for the save button.",
      },
      backgroundColor: {
        control: "color",
        default: "#1e1e1e",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#333333",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 320,
        max: 600,
        default: 384,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "multi-step-sheet",
    name: "Multi Step Sheet",
    componentName: "MultiStepSheet",
    description: "A multi-step form sheet with progress indicator.",
    tags: ["sheet", "form", "multistep", "wizard"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Project Details",
        description: "Title of the current step.",
      },
      stepNumber: {
        control: "number",
        default: 2,
        description: "Current step number.",
      },
      totalSteps: {
        control: "number",
        default: 3,
        description: "Total number of steps.",
      },
      projectNameLabel: {
        control: "text",
        default: "Project Name",
        description: "Label for project name field.",
      },
      projectNamePlaceholder: {
        control: "text",
        default: "e.g. Website Redesign",
        description: "Placeholder for project name input.",
      },
      teamLabel: {
        control: "text",
        default: "Team",
        description: "Label for team field.",
      },
      privacyLabel: {
        control: "text",
        default: "Privacy",
        description: "Label for privacy field.",
      },
      backText: {
        control: "text",
        default: "Back",
        description: "Text for the back button.",
      },
      continueText: {
        control: "text",
        default: "Continue",
        description: "Text for the continue button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 320,
        max: 600,
        default: 384,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "media-queue-sheet",
    name: "Media Queue Sheet",
    componentName: "MediaQueueSheet",
    description: "A media queue sheet showing upcoming tracks.",
    tags: ["sheet", "media", "queue", "music", "dark"],
    props: {
      ...commonSheetProps,
      title: {
        control: "text",
        default: "Up Next",
        description: "Title of the queue sheet.",
      },
      currentTrack: {
        control: "text",
        default: "Neon Lights",
        description: "Current track name.",
      },
      currentArtist: {
        control: "text",
        default: "Kraftwerk",
        description: "Current artist name.",
      },
      queueCount: {
        control: "number",
        default: 4,
        description: "Number of tracks in queue.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#262626",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 280,
        max: 500,
        default: 320,
        description: "Sheet width in pixels.",
      },
    },
  },
  {
    slug: "crypto-sheet",
    name: "Crypto Wallet Sheet",
    componentName: "CryptoSheet",
    description: "A cryptocurrency wallet sheet with balance and assets.",
    tags: ["sheet", "crypto", "wallet", "dark"],
    props: {
      ...commonSheetProps,
      balanceLabel: {
        control: "text",
        default: "Total Balance",
        description: "Label for balance display.",
      },
      balanceAmount: {
        control: "text",
        default: "$12,402.55",
        description: "Total balance amount.",
      },
      buyText: {
        control: "text",
        default: "Buy",
        description: "Text for buy button.",
      },
      sendText: {
        control: "text",
        default: "Send",
        description: "Text for send button.",
      },
      receiveText: {
        control: "text",
        default: "Receive",
        description: "Text for receive button.",
      },
      assetsTitle: {
        control: "text",
        default: "Assets",
        description: "Title for assets section.",
      },
      bitcoinName: {
        control: "text",
        default: "Bitcoin",
        description: "Bitcoin asset name.",
      },
      bitcoinAmount: {
        control: "text",
        default: "0.42 BTC",
        description: "Bitcoin amount.",
      },
      bitcoinValue: {
        control: "text",
        default: "$11,200",
        description: "Bitcoin value.",
      },
      bitcoinChange: {
        control: "text",
        default: "+2.4%",
        description: "Bitcoin price change.",
      },
      ethereumName: {
        control: "text",
        default: "Ethereum",
        description: "Ethereum asset name.",
      },
      ethereumAmount: {
        control: "text",
        default: "1.2 ETH",
        description: "Ethereum amount.",
      },
      ethereumValue: {
        control: "text",
        default: "$2,200",
        description: "Ethereum value.",
      },
      ethereumChange: {
        control: "text",
        default: "-1.1%",
        description: "Ethereum price change.",
      },
      backgroundColor: {
        control: "color",
        default: "#121212",
        description: "Background color of the sheet.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for content.",
      },
      borderColor: {
        control: "color",
        default: "#1a1a1a",
        description: "Border color of the sheet.",
      },
      width: {
        control: "slider",
        min: 280,
        max: 500,
        default: 320,
        description: "Sheet width in pixels.",
      },
    },
  },
]


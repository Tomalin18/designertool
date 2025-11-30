export type SidebarPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "number"
  | "textarea"
  | "file"

export interface SidebarPropDefinition {
  control: SidebarPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
}

export interface SidebarSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, SidebarPropDefinition>
  groupingConfig?: any
}

// Common props for sidebars
const commonSidebarProps: Record<string, SidebarPropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the sidebar.",
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
  activeColor: {
    control: "color",
    default: "",
    description: "Active item color (optional, uses default if empty).",
  },
  hoverColor: {
    control: "color",
    default: "",
    description: "Hover state color (optional, uses default if empty).",
  },
  width: {
    control: "slider",
    min: 200,
    max: 400,
    default: 256,
    description: "Sidebar width in pixels.",
  },
  padding: {
    control: "slider",
    min: 0,
    max: 32,
    default: 16,
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

export const sidebarSections: SidebarSectionMeta[] = [
  {
    slug: "simple-sidebar",
    name: "Simple Sidebar",
    componentName: "SimpleSidebar",
    description: "A clean and minimal sidebar with basic navigation items.",
    tags: ["sidebar", "navigation", "simple", "minimal"],
    props: {
      ...commonSidebarProps,
      logoText: {
        control: "text",
        default: "Acme",
        description: "Logo or brand name.",
      },
      menuItems: {
        control: "textarea",
        default: "Dashboard\nTeam\nProjects\nCalendar\nDocuments",
        description: "Navigation menu items, one per line.",
      },
      settingsText: {
        control: "text",
        default: "Settings",
        description: "Text for the settings link.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for active/hovered items.",
      },
      borderColor: {
        control: "color",
        default: "#262626",
        description: "Border color of the sidebar.",
      },
    },
  },
  {
    slug: "saas-dark-sidebar",
    name: "SaaS Dark Sidebar",
    componentName: "SaasDarkSidebar",
    description: "A dark-themed sidebar perfect for SaaS applications with grouped sections.",
    tags: ["sidebar", "navigation", "saas", "dark", "enterprise"],
    props: {
      ...commonSidebarProps,
      logoText: {
        control: "text",
        default: "L",
        description: "Logo text or initial.",
      },
      companyName: {
        control: "text",
        default: "Lumina Inc",
        description: "Company or organization name.",
      },
      planName: {
        control: "text",
        default: "Enterprise Plan",
        description: "Plan or subscription tier name.",
      },
      overviewSectionTitle: {
        control: "text",
        default: "Overview",
        description: "Title for the Overview section.",
      },
      overviewItems: {
        control: "textarea",
        default: "Dashboard\nAnalytics",
        description: "Overview navigation items, one per line.",
      },
      overviewIcons: {
        control: "textarea",
        default: "Grid\nPieChart",
        description: "List of icon names for each overview item (one per line, same order as items). Available: Home, Search, User, Bell, Settings, Plus, Heart, ShoppingBag, Map, Calendar, MessageSquare, Menu, Compass, Star, Video, Music, Grid, Layers, Zap, Radio, Scan, TrendingUp, Mail, Send",
      },
      managementSectionTitle: {
        control: "text",
        default: "Management",
        description: "Title for the Management section.",
      },
      managementItems: {
        control: "textarea",
        default: "Customers\nProjects\nMessages:3",
        description: "Management navigation items, one per line. Use 'Item:badge' format for items with badges (e.g., 'Messages:3').",
      },
      managementIcons: {
        control: "textarea",
        default: "User\nBriefcase\nMessageSquare",
        description: "List of icon names for each management item (one per line, same order as items). Available: Home, Search, User, Bell, Settings, Plus, Heart, ShoppingBag, Map, Calendar, MessageSquare, Menu, Compass, Star, Video, Music, Grid, Layers, Zap, Radio, Scan, TrendingUp, Mail, Send",
      },
      backgroundColor: {
        control: "color",
        default: "#0F1115",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#6366f1",
        description: "Color for active items and accent elements.",
      },
      hoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for hovered items.",
      },
    },
  },
  {
    slug: "icon-sidebar",
    name: "Icon Only Sidebar",
    componentName: "IconSidebar",
    description: "A compact sidebar showing only icons for maximum space efficiency.",
    tags: ["sidebar", "navigation", "icon", "compact", "minimal"],
    props: {
      ...commonSidebarProps,
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the sidebar.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for active items.",
      },
      hoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for hovered items.",
      },
      borderColor: {
        control: "color",
        default: "#262626",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 48,
        max: 96,
        default: 64,
        description: "Sidebar width in pixels.",
      },
    },
  },
  {
    slug: "double-rail-sidebar",
    name: "Double Rail Sidebar",
    componentName: "DoubleRailSidebar",
    description: "A Discord-inspired sidebar with two rails for servers and channels.",
    tags: ["sidebar", "navigation", "discord", "double-rail", "channels"],
    props: {
      ...commonSidebarProps,
      workspaceName: {
        control: "text",
        default: "Design Team",
        description: "Workspace or server name.",
      },
      channelSectionTitle: {
        control: "text",
        default: "General",
        description: "Title for the channel section.",
      },
      channelItems: {
        control: "textarea",
        default: "announcements\ngeneral\noff-topic",
        description: "Channel items, one per line.",
      },
      voiceChannelSectionTitle: {
        control: "text",
        default: "Voice Channels",
        description: "Title for the voice channel section.",
      },
      voiceChannelItems: {
        control: "textarea",
        default: "Lounge",
        description: "Voice channel items, one per line.",
      },
      userName: {
        control: "text",
        default: "User Name",
        description: "User's display name.",
      },
      userTag: {
        control: "text",
        default: "#1234",
        description: "User's tag or ID.",
      },
      backgroundColor: {
        control: "color",
        default: "#1e1f22",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#23a559",
        description: "Color for active items.",
      },
      hoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for hovered items.",
      },
      width: {
        control: "slider",
        min: 48,
        max: 96,
        default: 72,
        description: "First rail width in pixels.",
      },
    },
  },
  {
    slug: "glass-sidebar",
    name: "Glass Sidebar",
    componentName: "GlassSidebar",
    description: "A glassmorphism sidebar with backdrop blur and transparency effects.",
    tags: ["sidebar", "navigation", "glassmorphism", "blur", "transparent"],
    props: {
      ...commonSidebarProps,
      title: {
        control: "text",
        default: "Glass",
        description: "Sidebar title.",
      },
      menuItems: {
        control: "textarea",
        default: "Home\nExplore\nLibrary\nFavorites",
        description: "Navigation menu items. Format: 'Item' or 'Item:badge'. One per line.",
      },
      storageLabel: {
        control: "text",
        default: "Storage",
        description: "Label for the storage section.",
      },
      storageUsed: {
        control: "text",
        default: "70% used",
        description: "Storage usage text.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses glass effect if empty).",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for active items.",
      },
      hoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for hovered items.",
      },
      borderColor: {
        control: "color",
        default: "#ffffff",
        description: "Border color of the sidebar.",
      },
    },
  },
  {
    slug: "brutalist-sidebar",
    name: "Brutalist Sidebar",
    componentName: "BrutalistSidebar",
    description: "A bold, high-contrast sidebar with brutalist design principles.",
    tags: ["sidebar", "navigation", "brutalist", "bold", "high-contrast"],
    props: {
      ...commonSidebarProps,
      title: {
        control: "text",
        default: "MENU",
        description: "Sidebar title.",
      },
      menuItems: {
        control: "textarea",
        default: "Shop\nAbout\nJournal\nContact",
        description: "Navigation menu items, one per line.",
      },
      buttonText: {
        control: "text",
        default: "Subscribe",
        description: "Text for the action button.",
      },
      backgroundColor: {
        control: "color",
        default: "#facc15",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#000000",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for active/hovered items.",
      },
      hoverColor: {
        control: "color",
        default: "#000000",
        description: "Color for hovered items.",
      },
      borderColor: {
        control: "color",
        default: "#000000",
        description: "Border color of the sidebar.",
      },
      borderWidth: {
        control: "slider",
        min: 0,
        max: 8,
        default: 4,
        description: "Border width in pixels.",
      },
    },
  },
  {
    slug: "macos-sidebar",
    name: "MacOS Sidebar",
    componentName: "MacOSSidebar",
    description: "A macOS Finder-style sidebar with familiar navigation patterns.",
    tags: ["sidebar", "navigation", "macos", "finder", "familiar"],
    props: {
      ...commonSidebarProps,
      treeItems: {
        control: "textarea",
        default: "favorites:airdrop,recents,applications,desktop,documents,downloads\niCloud:iCloud Drive",
        description: "Tree items in format 'Section:Item1,Item2' or 'Section' for sections without items. One per line.",
      },
      backgroundColor: {
        control: "color",
        default: "#F6F5F2",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#1d1d1f",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#007AFF",
        description: "Color for active items.",
      },
      hoverColor: {
        control: "color",
        default: "#1d1d1f",
        description: "Hover state color.",
      },
      borderColor: {
        control: "color",
        default: "#d2d2d7",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 240,
        description: "Sidebar width in pixels.",
      },
    },
  },
  {
    slug: "code-sidebar",
    name: "Code Sidebar",
    componentName: "CodeSidebar",
    description: "A VS Code-inspired sidebar with activity bar and file explorer.",
    tags: ["sidebar", "navigation", "vscode", "code", "developer"],
    props: {
      ...commonSidebarProps,
      panelTitle: {
        control: "text",
        default: "Explorer",
        description: "Title of the sidebar panel.",
      },
      openEditorsItems: {
        control: "textarea",
        default: "TS Sidebar.tsx src/components",
        description: "Open editors items. Format: 'Type FileName Path:badge' or 'FileName:badge' or 'Type FileName Path' or 'FileName'. One per line.",
      },
      fileTreeItems: {
        control: "textarea",
        default: ".next\nsrc:App.tsx,globals.css",
        description: "File tree items. Format: 'Folder' for folders without files, or 'Folder:File1,File2' for folders with files. One per line.",
      },
      backgroundColor: {
        control: "color",
        default: "#1E1E1E",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#CCCCCC",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#E8AE38",
        description: "Color for active items.",
      },
      borderColor: {
        control: "color",
        default: "#2B2B2B",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 240,
        description: "Sidebar width in pixels.",
      },
    },
  },
  {
    slug: "gradient-sidebar",
    name: "Gradient Sidebar",
    componentName: "GradientSidebar",
    description: "A sidebar with beautiful gradient backgrounds and modern styling.",
    tags: ["sidebar", "navigation", "gradient", "modern", "colorful"],
    props: {
      ...commonSidebarProps,
      logoText: {
        control: "text",
        default: "Flash",
        description: "Logo or brand name.",
      },
      primaryMenuItems: {
        control: "textarea",
        default: "Overview\nReports\nLive View",
        description: "Primary navigation items. Format: 'Item' or 'Item:badge'. One per line.",
      },
      secondaryMenuItems: {
        control: "textarea",
        default: "Settings\nHelp\nLogout",
        description: "Secondary navigation items. Format: 'Item' or 'Item:badge'. One per line.",
      },
      profileName: {
        control: "text",
        default: "Sarah J.",
        description: "Profile name.",
      },
      profileRole: {
        control: "text",
        default: "Premium User",
        description: "Profile role or subscription tier.",
      },
      profileImage: {
        control: "file",
        default: "",
        description: "Profile image URL or uploaded image (data URL).",
      },
      backgroundColor: {
        control: "color",
        default: "#312e81",
        description: "Gradient start color (background color).",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#06b6d4",
        description: "Active item color and gradient middle color.",
      },
      hoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Hover state color.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 256,
        description: "Sidebar width in pixels.",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 32,
        default: 24,
        description: "Padding in pixels.",
      },
    },
  },
  {
    slug: "profile-sidebar",
    name: "Profile Sidebar",
    componentName: "ProfileSidebar",
    description: "A profile-centric sidebar with user information and upgrade prompts.",
    tags: ["sidebar", "navigation", "profile", "user", "upgrade"],
    props: {
      ...commonSidebarProps,
      profileName: {
        control: "text",
        default: "Alex Morgan",
        description: "User's full name.",
      },
      profileRole: {
        control: "text",
        default: "Product Designer",
        description: "User's role or job title.",
      },
      profileImage: {
        control: "file",
        default: "",
        description: "Profile image URL or uploaded image (data URL).",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#525252",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#000000",
        description: "Color for active items and upgrade button.",
      },
      hoverColor: {
        control: "color",
        default: "#000000",
        description: "Hover state color.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 288,
        description: "Sidebar width in pixels.",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 32,
        default: 24,
        description: "Padding in pixels.",
      },
      menuSectionTitle: {
        control: "text",
        default: "Menu",
        description: "Title for the menu section.",
      },
      menuItems: {
        control: "textarea",
        default: "My Profile\nMy Work\nSaved Items\nBilling",
        description: "Menu navigation items, one per line.",
      },
      upgradeTitle: {
        control: "text",
        default: "Upgrade to Pro",
        description: "Title for the upgrade prompt.",
      },
      upgradeDescription: {
        control: "text",
        default: "Get access to exclusive tools.",
        description: "Description for the upgrade prompt.",
      },
      upgradeButtonText: {
        control: "text",
        default: "Upgrade",
        description: "Text for the upgrade button.",
      },
    },
  },
  {
    slug: "collapsible-sidebar",
    name: "Collapsible Sidebar",
    componentName: "CollapsibleSidebar",
    description: "A collapsible sidebar that can expand and collapse to save space.",
    tags: ["sidebar", "navigation", "collapsible", "expandable", "space-saving"],
    props: {
      ...commonSidebarProps,
      logoText: {
        control: "text",
        default: "B",
        description: "Logo text or initial.",
      },
      brandName: {
        control: "text",
        default: "Bolt UI",
        description: "Brand or company name.",
      },
      menuItems: {
        control: "textarea",
        default: "Menu Item 1\nMenu Item 2\nMenu Item 3\nMenu Item 4\nMenu Item 5",
        description: "Navigation menu items, one per line.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#3b82f6",
        description: "Color for active items and logo background.",
      },
      hoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Hover state color.",
      },
      borderColor: {
        control: "color",
        default: "#262626",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 256,
        description: "Sidebar width in pixels (when expanded).",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 32,
        default: 16,
        description: "Padding in pixels.",
      },
    },
  },
  {
    slug: "tree-sidebar",
    name: "Tree Sidebar",
    componentName: "TreeSidebar",
    description: "A tree-structured sidebar perfect for file browsers and hierarchical navigation.",
    tags: ["sidebar", "navigation", "tree", "hierarchical", "files"],
    props: {
      ...commonSidebarProps,
      title: {
        control: "text",
        default: "Documentation",
        description: "Sidebar title.",
      },
      treeItems: {
        control: "textarea",
        default: "Getting Started:Installation,Project Structure,Changelog\nComponents\nAPI Reference\nIntegration",
        description: "Tree items in format 'Parent:Child1,Child2' or 'Parent' for items without children. One per line.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#525252",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#2563eb",
        description: "Color for active items.",
      },
      hoverColor: {
        control: "color",
        default: "#f3f4f6",
        description: "Hover state background color.",
      },
      borderColor: {
        control: "color",
        default: "#e5e7eb",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 256,
        description: "Sidebar width in pixels.",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 32,
        default: 16,
        description: "Padding in pixels.",
      },
    },
  },
  {
    slug: "notion-style-sidebar",
    name: "Notion Style Sidebar",
    componentName: "NotionStyleSidebar",
    description: "A Notion-inspired sidebar with clean typography and smooth interactions.",
    tags: ["sidebar", "navigation", "notion", "clean", "typography"],
    props: {
      ...commonSidebarProps,
      workspaceName: {
        control: "text",
        default: "Workspace",
        description: "Workspace name.",
      },
      quickActions: {
        control: "textarea",
        default: "Search\nUpdates\nSettings",
        description: "Quick action items. Format: 'Item' or 'Item:badge'. One per line.",
      },
      favoritesTitle: {
        control: "text",
        default: "Favorites",
        description: "Title for the favorites section.",
      },
      favoritesItems: {
        control: "textarea",
        default: "Product Roadmap\nMeeting Notes\nDesign System",
        description: "Favorite items. Format: 'Item' or 'Item:badge'. One per line.",
      },
      privateTitle: {
        control: "text",
        default: "Private",
        description: "Title for the private section.",
      },
      privateItems: {
        control: "textarea",
        default: "Personal Goals\nReading List",
        description: "Private items. Format: 'Item' or 'Item:badge'. One per line.",
      },
      addPageText: {
        control: "text",
        default: "Add a page",
        description: "Text for the add page button.",
      },
    },
  },
  {
    slug: "spotify-style-sidebar",
    name: "Spotify Style Sidebar",
    componentName: "SpotifyStyleSidebar",
    description: "A Spotify-inspired sidebar with music player controls and library navigation.",
    tags: ["sidebar", "navigation", "spotify", "music", "player"],
    props: {
      ...commonSidebarProps,
      mainMenuItems: {
        control: "textarea",
        default: "Home\nSearch",
        description: "Main menu items, one per line.",
      },
      libraryTitle: {
        control: "text",
        default: "Your Library",
        description: "Title for the library section.",
      },
      libraryFilterButtons: {
        control: "textarea",
        default: "Playlists\nArtists",
        description: "Library filter buttons, one per line.",
      },
      libraryItems: {
        control: "textarea",
        default: "Liked Songs:Playlist • 432 songs:❤️\nDiscover Weekly:Playlist • Spotify:🎵\nSynthwave Mix:Playlist • Alex:🎹\nCoding Focus:Playlist • Spotify:💻\nOn Repeat:Playlist • Spotify:🔁",
        description: "Library items in format 'Title:Subtitle:Icon'. One per line.",
      },
    },
  },
  {
    slug: "linear-style-sidebar",
    name: "Linear Style Sidebar",
    componentName: "LinearStyleSidebar",
    description: "A Linear-inspired sidebar with project management and team collaboration features.",
    tags: ["sidebar", "navigation", "linear", "project", "management"],
    props: {
      ...commonSidebarProps,
      logoText: {
        control: "text",
        default: "L",
        description: "Logo text or initial.",
      },
      workspaceName: {
        control: "text",
        default: "Linear",
        description: "Workspace name.",
      },
      mainMenuItems: {
        control: "textarea",
        default: "Inbox\nMy Issues\nViews",
        description: "Main menu items. Format: 'Item' or 'Item:badge'. One per line.",
      },
      teamsTitle: {
        control: "text",
        default: "Your Teams",
        description: "Title for the teams section.",
      },
      teamItems: {
        control: "textarea",
        default: "Engineering:E\nDesign:D\nMarketing:M",
        description: "Team items in format 'Name:Initial'. One per line.",
      },
    },
  },
  {
    slug: "gaming-sidebar",
    name: "Gaming Sidebar",
    componentName: "GamingSidebar",
    description: "A gaming-themed sidebar with bold colors and dynamic styling.",
    tags: ["sidebar", "navigation", "gaming", "bold", "dynamic"],
    props: {
      ...commonSidebarProps,
      title: {
        control: "text",
        default: "CYBERNAV",
        description: "Sidebar title.",
      },
      menuItems: {
        control: "textarea",
        default: "Armory\nMap\nMissions\nSocial\nMarket",
        description: "Navigation menu items. Format: 'Item' or 'Item:badge'. One per line.",
      },
    },
  },
  {
    slug: "finance-sidebar",
    name: "Finance Sidebar",
    componentName: "FinanceSidebar",
    description: "A finance-focused sidebar with data visualization and analytics.",
    tags: ["sidebar", "navigation", "finance", "analytics", "data"],
    props: {
      ...commonSidebarProps,
      brandName: {
        control: "text",
        default: "TrustBank",
        description: "Brand or company name.",
      },
      balanceLabel: {
        control: "text",
        default: "Available Balance",
        description: "Label for the balance display.",
      },
      balanceAmount: {
        control: "text",
        default: "$24,592.00",
        description: "Balance amount to display.",
      },
      menuItems: {
        control: "textarea",
        default: "Accounts\nTransfers\nReports\nStatements",
        description: "Navigation menu items, one per line.",
      },
      backgroundColor: {
        control: "color",
        default: "#0b2135",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#bfdbfe",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#10b981",
        description: "Color for active items and shield icon.",
      },
      hoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Hover state color.",
      },
      borderColor: {
        control: "color",
        default: "#1e3a5f",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 256,
        description: "Sidebar width in pixels.",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 32,
        default: 24,
        description: "Padding in pixels.",
      },
    },
  },
  {
    slug: "curve-sidebar",
    name: "Curve Sidebar",
    componentName: "CurveSidebar",
    description: "A sidebar with curved design elements and smooth transitions.",
    tags: ["sidebar", "navigation", "curve", "smooth", "transitions"],
    props: {
      ...commonSidebarProps,
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#737373",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color for active items and logo background.",
      },
      hoverColor: {
        control: "color",
        default: "#525252",
        description: "Hover state color.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 80,
        max: 120,
        default: 96,
        description: "Sidebar width in pixels.",
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
        max: 50,
        default: 40,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "task-sidebar",
    name: "Task Sidebar",
    componentName: "TaskSidebar",
    description: "A task management sidebar with to-do lists and productivity features.",
    tags: ["sidebar", "navigation", "task", "todo", "productivity"],
    props: {
      ...commonSidebarProps,
      newTaskButtonText: {
        control: "text",
        default: "New Task",
        description: "Text for the new task button.",
      },
      menuItems: {
        control: "textarea",
        default: "My Day:4\nImportant\nPlanned:2\nAssigned to me",
        description: "Menu items in format 'Item:badge' or 'Item'. One per line.",
      },
      newListText: {
        control: "text",
        default: "New List",
        description: "Text for the new list button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#525252",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color for active items and new task button.",
      },
      hoverColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Hover state background color.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 256,
        description: "Sidebar width in pixels.",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 32,
        default: 24,
        description: "Padding in pixels.",
      },
    },
  },
  {
    slug: "floating-sidebar",
    name: "Floating Sidebar",
    componentName: "FloatingSidebar",
    description: "A floating sidebar with shadow effects and modern card design.",
    tags: ["sidebar", "navigation", "floating", "shadow", "card"],
    props: {
      ...commonSidebarProps,
      brandName: {
        control: "text",
        default: "Studio",
        description: "Brand or company name.",
      },
      menuItems: {
        control: "textarea",
        default: "Dashboard\nContent\nMedia\nComments",
        description: "Navigation menu items, one per line.",
      },
      profileName: {
        control: "text",
        default: "Jane Doe",
        description: "User's full name.",
      },
      profileRole: {
        control: "text",
        default: "Admin",
        description: "User's role or job title.",
      },
      profileImage: {
        control: "file",
        default: "",
        description: "Profile image URL or uploaded image (data URL).",
      },
      logoImage: {
        control: "file",
        default: "",
        description: "Logo image URL or uploaded image (data URL).",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the sidebar.",
      },
      textColor: {
        control: "color",
        default: "#737373",
        description: "Text color for navigation items.",
      },
      activeColor: {
        control: "color",
        default: "#000000",
        description: "Color for active items and brand name.",
      },
      hoverColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Hover state background color.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the sidebar.",
      },
      width: {
        control: "slider",
        min: 200,
        max: 400,
        default: 256,
        description: "Sidebar width in pixels.",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 32,
        default: 16,
        description: "Padding in pixels.",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 32,
        default: 16,
        description: "Border radius in pixels.",
      },
    },
  },
]

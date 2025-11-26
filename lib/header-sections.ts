import { HeroPropControl, HeroPropDefinition } from "./hero-sections"

export type HeaderPropControl = HeroPropControl
export type HeaderPropDefinition = HeroPropDefinition

export interface HeaderSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, HeaderPropDefinition>
}

const commonHeaderProps = {
  paddingTop: { control: "slider", default: 20, min: 0, max: 100, description: "Top padding" },
  paddingBottom: { control: "slider", default: 20, min: 0, max: 100, description: "Bottom padding" },
  paddingX: { control: "slider", default: 24, min: 0, max: 100, description: "Horizontal padding" },
  fontSize: { control: "select", options: ["sm", "base", "lg", "xl"], default: "base", description: "Base font size" },
  fontWeight: { control: "select", options: ["normal", "medium", "semibold", "bold"], default: "medium", description: "Base font weight" },
  borderBottomWidth: { control: "slider", default: 1, min: 0, max: 4, description: "Bottom border width" },
  // Submenu style props
  submenuBackgroundColor: { control: "color", default: "#ffffff", description: "Background color of the submenu dropdown." },
  submenuBorderColor: { control: "color", default: "#e5e7eb", description: "Border color of the submenu dropdown." },
  submenuTextColor: { control: "color", default: "#374151", description: "Text color of submenu items." },
  submenuHoverColor: { control: "color", default: "#f3f4f6", description: "Background color on hover for submenu items." },
  submenuBorderRadius: { control: "slider", default: 8, min: 0, max: 32, description: "Border radius of the submenu dropdown." },
  submenuWidth: { control: "slider", default: 160, min: 120, max: 320, description: "Width of the submenu dropdown in pixels." },
  submenuPadding: { control: "slider", default: 8, min: 4, max: 16, description: "Padding inside the submenu dropdown." },
} as const satisfies Record<string, HeaderPropDefinition>

export const headerSections = [
  {
    slug: "simple-header",
    name: "Simple Header",
    componentName: "SimpleHeader",
    description: "A classic header with logo, navigation links, and a CTA button.",
    tags: ["header", "navigation", "simple", "classic", "light"],
    props: {
      ...commonHeaderProps,
      logoText: { control: "text", default: "Lumina", description: "Logo text displayed on the left." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Features", items: ["Analytics", "Automation", "Security"] },
          { title: "Pricing" },
          { title: "About" },
          { title: "Blog" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
      buttonText: { control: "text", default: "Get Started", description: "Text for the CTA button." },
      backgroundColor: { control: "color", default: "#ffffff", description: "Background color of the header." },
      logoColor: { control: "color", default: "#000000", description: "Color of the logo text." },
      linkColor: { control: "color", default: "#4b5563", description: "Color of the navigation links." },
      linkHoverColor: { control: "color", default: "#000000", description: "Hover color for navigation links." },
      buttonBackgroundColor: { control: "color", default: "#000000", description: "Background color of the CTA button." },
      buttonTextColor: { control: "color", default: "#ffffff", description: "Text color of the CTA button." },
      buttonBorderRadius: { control: "slider", default: 6, min: 0, max: 32, description: "Border radius of the CTA button." },
    },
  },
  {
    slug: "floating-capsule-nav",
    name: "Floating Capsule Nav",
    componentName: "FloatingNav",
    description: "A trendy floating navigation bar with a capsule shape and blur effects.",
    tags: ["header", "navigation", "floating", "modern", "dark"],
    props: {
      ...commonHeaderProps,
      paddingTop: { control: "slider", default: 32, min: 0, max: 100, description: "Top padding" }, // Override default
      logoText: { control: "text", default: "L", description: "Logo text." },
      heading: { control: "text", default: "The Future of UI", description: "Main heading text." },
      subHeading: { control: "text", default: "Floating navigation for modern landing pages.", description: "Subheading text." },
      buttonText: { control: "text", default: "Get Started", description: "CTA button text." },
      backgroundColor: { control: "color", default: "#171717", description: "Background color of the container." },
      navBackgroundColor: { control: "color", default: "rgba(23, 23, 23, 0.6)", description: "Background color of the nav capsule." },
      activeItemColor: { control: "color", default: "#ffffff", description: "Color of the active nav item." },
      itemColor: { control: "color", default: "#a3a3a3", description: "Color of inactive nav items." },
      buttonBackgroundColor: { control: "color", default: "#ffffff", description: "Background color of the CTA button." },
      buttonTextColor: { control: "color", default: "#000000", description: "Text color of the CTA button." },
      glowColor: { control: "color", default: "rgba(99, 102, 241, 0.2)", description: "Color of the background glow." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Home" },
          { title: "Features" },
          { title: "Pricing" },
          { title: "About" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "saas-header",
    name: "SaaS Header",
    componentName: "SaaSHeader",
    description: "A professional header for SaaS products with a top banner and multiple navigation levels.",
    tags: ["header", "saas", "product", "banner"],
    props: {
      ...commonHeaderProps,
      companyName: { control: "text", default: "Acme Corp", description: "Company name." },
      bannerText: { control: "text", default: "New Feature: AI Generation is now live.", description: "Top banner text." },
      bannerLinkText: { control: "text", default: "Learn more", description: "Link text in the banner." },
      primaryButtonText: { control: "text", default: "Start for free", description: "Primary CTA button text." },
      secondaryButtonText: { control: "text", default: "Log in", description: "Secondary button text." },
      backgroundColor: { control: "color", default: "#0a0a0a", description: "Background color." },
      bannerGradientFrom: { control: "color", default: "#312e81", description: "Banner gradient start color." },
      bannerGradientTo: { control: "color", default: "#581c87", description: "Banner gradient end color." },
      textColor: { control: "text", default: "#ffffff", description: "Main text color." },
      linkColor: { control: "text", default: "#a3a3a3", description: "Link text color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Products", items: ["Analytics", "Automation", "Security"] },
          { title: "Customers", items: ["Case Studies", "Reviews"] },
          { title: "Pricing" }
        ], null, 2), 
        description: "Navigation structure (JSON). Each item has 'title' and optional 'items' array." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "dashboard-header",
    name: "Dashboard Header",
    componentName: "DashboardHeader",
    description: "An application header with search, notifications, and user profile.",
    tags: ["header", "application", "dashboard", "search"],
    props: {
      ...commonHeaderProps,
      teamName: { control: "text", default: "Q4 Marketing", description: "Current team/project name." },
      userName: { control: "text", default: "Alex", description: "User name." },
      searchPlaceholder: { control: "text", default: "Search anything...", description: "Placeholder for search input." },
      backgroundColor: { control: "color", default: "#0a0a0a", description: "Background color." },
      borderColor: { control: "color", default: "#262626", description: "Border color." },
      accentColor: { control: "color", default: "#6366f1", description: "Accent color for focus and highlights." },
      notificationColor: { control: "color", default: "#ef4444", description: "Notification dot color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Dashboard" },
          { title: "Projects", items: ["Active", "Archived"] },
          { title: "Team" },
          { title: "Settings" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "neo-brutalist-header",
    name: "Neo-Brutalist Header",
    componentName: "NeoBrutalistHeader",
    description: "A bold, high-contrast header with brutalist design elements.",
    tags: ["header", "brutalist", "bold", "trendy"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "Brutal.", description: "Brand name." },
      buttonText: { control: "text", default: "Join Now", description: "CTA button text." },
      backgroundColor: { control: "color", default: "#1a1a1a", description: "Background color." },
      primaryColor: { control: "color", default: "#FFDE59", description: "Primary accent color (Yellow)." },
      secondaryColor: { control: "color", default: "#FF5757", description: "Secondary accent color (Red)." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      borderColor: { control: "color", default: "#ffffff", description: "Border color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Manifesto" },
          { title: "Works" },
          { title: "Contact" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "ecommerce-mega-header",
    name: "Ecommerce Mega Header",
    componentName: "EcommerceMegaHeader",
    description: "A feature-rich header for online stores with top bar, search, and category nav.",
    tags: ["header", "ecommerce", "store", "megamenu"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "Luxe.", description: "Brand name." },
      topBarText: { control: "text", default: "Free Shipping on orders over $100", description: "Top bar announcement." },
      searchPlaceholder: { control: "text", default: "Search for products...", description: "Search input placeholder." },
      backgroundColor: { control: "color", default: "#0a0a0a", description: "Main background color." },
      topBarColor: { control: "color", default: "#171717", description: "Top bar background color." },
      textColor: { control: "color", default: "#ffffff", description: "Main text color." },
      accentColor: { control: "color", default: "#ef4444", description: "Accent color (e.g. for Sale items)." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "New In" },
          { title: "Clothing", items: ["Men", "Women", "Kids"] },
          { title: "Shoes" },
          { title: "Accessories" },
          { title: "Sale" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "developer-docs-header",
    name: "Developer Docs Header",
    componentName: "DeveloperDocsHeader",
    description: "A technical documentation header with version selector and search.",
    tags: ["header", "documentation", "developer", "technical"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "DevDocs", description: "Brand name." },
      version: { control: "text", default: "v2.4", description: "Current version." },
      backgroundColor: { control: "color", default: "#0d1117", description: "Background color." },
      borderColor: { control: "color", default: "#262626", description: "Border color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      secondaryTextColor: { control: "color", default: "#a3a3a3", description: "Secondary text color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Documentation" },
          { title: "API Reference", items: ["v2.4", "v2.3", "v2.2"] },
          { title: "Showcase" },
          { title: "Guides" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "creative-portfolio-header",
    name: "Creative Portfolio Header",
    componentName: "CreativePortfolioHeader",
    description: "A minimalist header for creative portfolios with underline hover effects.",
    tags: ["header", "portfolio", "creative", "minimal"],
    props: {
      ...commonHeaderProps,
      name: { control: "text", default: "Alex Chen", description: "Artist/Designer name." },
      title: { control: "text", default: "Digital Product Designer", description: "Role title." },
      backgroundColor: { control: "color", default: "#171717", description: "Background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      accentColor: { control: "color", default: "#ffffff", description: "Hover underline color." },
      secondaryTextColor: { control: "color", default: "#737373", description: "Secondary text color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Work" },
          { title: "About" },
          { title: "Playground" },
          { title: "Contact" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "gaming-header",
    name: "Gaming Header",
    componentName: "GamingHeader",
    description: "A gaming-inspired header with slanted shapes and neon accents.",
    tags: ["header", "gaming", "esports", "futuristic"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "NEXUS", description: "Brand name." },
      statusText: { control: "text", default: "ONLINE", description: "Status indicator text." },
      backgroundColor: { control: "color", default: "#050505", description: "Background color." },
      accentColor: { control: "color", default: "#22d3ee", description: "Primary accent color (Cyan)." },
      secondaryAccentColor: { control: "color", default: "#2563eb", description: "Secondary accent color (Blue)." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Games" },
          { title: "Esports" },
          { title: "Community" },
          { title: "Store" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "news-portal-header",
    name: "News Portal Header",
    componentName: "NewsPortalHeader",
    description: "A classic news site header with date, weather, and category navigation.",
    tags: ["header", "news", "editorial", "classic"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "The Daily Chronicle", description: "Newspaper name." },
      dateText: { control: "text", default: "Tuesday, October 24, 2024", description: "Date display." },
      subscribeText: { control: "text", default: "Subscribe Now", description: "Subscribe button text." },
      backgroundColor: { control: "color", default: "#ffffff", description: "Background color." },
      topBarColor: { control: "color", default: "#fafafa", description: "Top bar background color." },
      textColor: { control: "color", default: "#000000", description: "Main text color." },
      accentColor: { control: "color", default: "#dc2626", description: "Accent color (Red)." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "World" },
          { title: "Politics" },
          { title: "Business" },
          { title: "Tech" },
          { title: "Science" },
          { title: "Health" },
          { title: "Sports" },
          { title: "Opinion" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "video-platform-header",
    name: "Video Platform Header",
    componentName: "VideoPlatformHeader",
    description: "A video streaming platform header with search and categories.",
    tags: ["header", "video", "streaming", "media"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "StreamTube", description: "Platform name." },
      searchPlaceholder: { control: "text", default: "Search", description: "Search input placeholder." },
      backgroundColor: { control: "color", default: "#0f0f0f", description: "Background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      accentColor: { control: "color", default: "#dc2626", description: "Accent color (Red)." },
      searchBarColor: { control: "color", default: "#121212", description: "Search bar background color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "All" },
          { title: "Gaming" },
          { title: "Live" },
          { title: "Music" },
          { title: "Mixes" },
          { title: "Computers" },
          { title: "Programming" },
          { title: "Podcasts" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "crypto-exchange-header",
    name: "Crypto Exchange Header",
    componentName: "CryptoExchangeHeader",
    description: "A cryptocurrency exchange header with a live ticker tape.",
    tags: ["header", "crypto", "finance", "trading"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "BinanceX", description: "Exchange name." },
      ticker1: { control: "text", default: "BTC/USD $64,230.50 +2.4%", description: "First ticker item." },
      backgroundColor: { control: "color", default: "#0b0e11", description: "Background color." },
      accentColor: { control: "color", default: "#eab308", description: "Accent color (Yellow)." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      upColor: { control: "color", default: "#22c55e", description: "Color for positive trends." },
      downColor: { control: "color", default: "#ef4444", description: "Color for negative trends." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Markets" },
          { title: "Trade" },
          { title: "Futures" },
          { title: "Earn" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "help-center-header",
    name: "Help Center Header",
    componentName: "HelpCenterHeader",
    description: "A clean help center header with a prominent search bar.",
    tags: ["header", "support", "help", "clean"],
    props: {
      ...commonHeaderProps,
      title: { control: "text", default: "Help Center", description: "Header title." },
      heroTitle: { control: "text", default: "How can we help?", description: "Hero section title." },
      searchPlaceholder: { control: "text", default: "Search articles...", description: "Search input placeholder." },
      backgroundColor: { control: "color", default: "#ffffff", description: "Background color." },
      textColor: { control: "color", default: "#171717", description: "Text color." },
      accentColor: { control: "color", default: "#2563eb", description: "Accent color (Blue)." },
      secondaryBackgroundColor: { control: "color", default: "#f9fafb", description: "Hero background color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Getting Started" },
          { title: "Account", items: ["Billing", "Settings", "Security"] },
          { title: "Billing" },
          { title: "API" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "social-media-header",
    name: "Social Media Header",
    componentName: "SocialMediaHeader",
    description: "A social network header with central navigation and user actions.",
    tags: ["header", "social", "app", "interactive"],
    props: {
      ...commonHeaderProps,
      logoText: { control: "text", default: "f", description: "Logo text." },
      backgroundColor: { control: "color", default: "#242526", description: "Header background color." },
      containerBackgroundColor: { control: "color", default: "#1c1e21", description: "Outer container background color." },
      iconColor: { control: "color", default: "#a3a3a3", description: "Inactive icon color." },
      activeIconColor: { control: "color", default: "#3b82f6", description: "Active icon color." },
      buttonBackgroundColor: { control: "color", default: "#3a3b3c", description: "Action button background color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Home" },
          { title: "Watch" },
          { title: "Groups" },
          { title: "Gaming" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "split-minimal-header",
    name: "Split Minimal Header",
    componentName: "SplitMinimalHeader",
    description: "A minimal header with a split layout for navigation and actions.",
    tags: ["header", "minimal", "clean", "modern"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "monolith.", description: "Brand name." },
      ctaText: { control: "text", default: "Let's Talk", description: "CTA button text." },
      heroText: { control: "text", default: "Less is more.", description: "Hero text." },
      backgroundColor: { control: "color", default: "#0a0a0a", description: "Background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      secondaryTextColor: { control: "color", default: "#a3a3a3", description: "Secondary text color." },
      buttonBorderColor: { control: "color", default: "#262626", description: "Button border color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Work" },
          { title: "Agency" },
          { title: "Expertise" },
          { title: "Insights" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "stacked-classic-header",
    name: "Stacked Classic Header",
    componentName: "StackedClassicHeader",
    description: "A traditional header with a centered logo and stacked navigation, perfect for publications.",
    tags: ["header", "classic", "stacked", "publication"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "The New York Times", description: "Publication name." },
      topBarText: { control: "text", default: "Worldwide Shipping Available", description: "Top bar text." },
      backgroundColor: { control: "color", default: "#fdfbf7", description: "Background color." },
      topBarBackgroundColor: { control: "color", default: "#1a1a1a", description: "Top bar background color." },
      topBarTextColor: { control: "color", default: "#ffffff", description: "Top bar text color." },
      textColor: { control: "color", default: "#1a1a1a", description: "Main text color." },
      borderColor: { control: "color", default: "#e5e5e5", description: "Border color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "World" },
          { title: "U.S." },
          { title: "Politics" },
          { title: "N.Y." },
          { title: "Business" },
          { title: "Opinion" },
          { title: "Tech" },
          { title: "Science" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "architectural-header",
    name: "Architectural Header",
    componentName: "ArchitecturalHeader",
    description: "A structured, grid-based header with a modern architectural feel.",
    tags: ["header", "architectural", "grid", "structured"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "Arkitekt", description: "Brand name." },
      backgroundColor: { control: "color", default: "#171717", description: "Background color." },
      borderColor: { control: "color", default: "#262626", description: "Grid border color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      secondaryTextColor: { control: "color", default: "#737373", description: "Secondary text color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Projects" },
          { title: "Studio" },
          { title: "News" },
          { title: "Contact" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "fashion-editorial-header",
    name: "Fashion Editorial Header",
    componentName: "FashionEditorialHeader",
    description: "A chic, transparent header overlaying a full-width image.",
    tags: ["header", "fashion", "editorial", "overlay"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "VOGUE", description: "Brand name." },
      imageUrl: { control: "text", default: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop", description: "Background image URL." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      overlayColor: { control: "color", default: "rgba(0, 0, 0, 0.2)", description: "Image overlay color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Fashion" },
          { title: "Beauty" },
          { title: "Culture" },
          { title: "Living" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "app-store-header",
    name: "App Store Header",
    componentName: "AppStoreHeader",
    description: "A header mimicking an app store interface with search and horizontal scrolling categories.",
    tags: ["header", "app-store", "mobile", "search"],
    props: {
      ...commonHeaderProps,
      storeName: { control: "text", default: "AppStore", description: "Store name." },
      searchPlaceholder: { control: "text", default: "Search apps, games, movies...", description: "Search input placeholder." },
      backgroundColor: { control: "color", default: "#171717", description: "Background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      accentColor: { control: "color", default: "#2563eb", description: "Accent color (Blue)." },
      borderColor: { control: "color", default: "#262626", description: "Border color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Discover" },
          { title: "Arcade" },
          { title: "Create" },
          { title: "Work" },
          { title: "Play" },
          { title: "Develop" },
          { title: "Categories" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "university-header",
    name: "University Header",
    componentName: "UniversityHeader",
    description: "A formal header for academic institutions with utility navigation.",
    tags: ["header", "university", "academic", "formal"],
    props: {
      ...commonHeaderProps,
      universityName: { control: "text", default: "Stanford", description: "University name." },
      subtitle: { control: "text", default: "University", description: "Subtitle." },
      backgroundColor: { control: "color", default: "#ffffff", description: "Background color." },
      primaryColor: { control: "color", default: "#8B1E3F", description: "Primary brand color (Burgundy)." },
      textColor: { control: "color", default: "#262626", description: "Text color." },
      borderColor: { control: "color", default: "#e5e5e5", description: "Border color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Admissions" },
          { title: "Academics", items: ["Programs", "Departments", "Research"] },
          { title: "Research" },
          { title: "Campus Life" },
          { title: "About" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "restaurant-header",
    name: "Restaurant Header",
    componentName: "RestaurantHeader",
    description: "A sophisticated header for restaurants with elegant typography.",
    tags: ["header", "restaurant", "dining", "elegant"],
    props: {
      ...commonHeaderProps,
      restaurantName: { control: "text", default: "Osteria.", description: "Restaurant name." },
      address: { control: "text", default: "123 Culinary Ave, NY", description: "Address text." },
      phone: { control: "text", default: "+1 (555) 000-0000", description: "Phone number." },
      backgroundColor: { control: "color", default: "#2D2D2D", description: "Background color." },
      textColor: { control: "color", default: "#E0D0C1", description: "Text color." },
      accentColor: { control: "color", default: "#E0D0C1", description: "Accent color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Menu" },
          { title: "Wines" },
          { title: "Private Dining" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "artist-band-header",
    name: "Artist / Band Header",
    componentName: "ArtistHeader",
    description: "A bold header for artists or bands with a marquee tour date strip.",
    tags: ["header", "artist", "music", "band"],
    props: {
      ...commonHeaderProps,
      artistName: { control: "text", default: "The Weeknd", description: "Artist name." },
      backgroundColor: { control: "color", default: "#000000", description: "Background color." },
      marqueeBackgroundColor: { control: "color", default: "#dc2626", description: "Marquee strip background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      marqueeTextColor: { control: "color", default: "#000000", description: "Marquee text color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Music" },
          { title: "Tour Dates" },
          { title: "Merch" },
          { title: "About" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "non-profit-header",
    name: "Non-Profit Header",
    componentName: "NonProfitHeader",
    description: "A clean header for non-profits with a prominent donate button.",
    tags: ["header", "non-profit", "charity", "clean"],
    props: {
      ...commonHeaderProps,
      orgName: { control: "text", default: "GlobalAid", description: "Organization name." },
      donateText: { control: "text", default: "Donate Now", description: "Donate button text." },
      urgentMessage: { control: "text", default: "Urgent: Earthquake relief fund initialized.", description: "Urgent message text." },
      backgroundColor: { control: "color", default: "#ffffff", description: "Background color." },
      primaryColor: { control: "color", default: "#ef4444", description: "Primary color (Red)." },
      textColor: { control: "color", default: "#262626", description: "Text color." },
      secondaryBackgroundColor: { control: "color", default: "#f5f5f5", description: "Message bar background color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Our Work" },
          { title: "Stories" },
          { title: "Financials" },
          { title: "About Us" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "web3-dapp-header",
    name: "Web3 Dapp Header",
    componentName: "Web3DappHeader",
    description: "A Web3-ready header with wallet connection and network selector.",
    tags: ["header", "web3", "dapp", "crypto"],
    props: {
      ...commonHeaderProps,
      appName: { control: "text", default: "Uniswap", description: "DApp name." },
      connectText: { control: "text", default: "Connect", description: "Connect button text." },
      backgroundColor: { control: "color", default: "#050505", description: "Background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      accentColor: { control: "color", default: "#ec4899", description: "Accent color (Pink)." },
      borderColor: { control: "color", default: "#262626", description: "Border color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Swap" },
          { title: "Tokens" },
          { title: "NFTs" },
          { title: "Pools" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "cyber-security-header",
    name: "Cyber Security Header",
    componentName: "CyberSecurityHeader",
    description: "A terminal-inspired header for security or tech themes.",
    tags: ["header", "cyber", "security", "terminal"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "SECURE_SHELL", description: "Brand name." },
      statusText: { control: "text", default: "SYSTEM_SAFE", description: "Status text." },
      backgroundColor: { control: "color", default: "#000000", description: "Background color." },
      primaryColor: { control: "color", default: "#22c55e", description: "Primary color (Green)." },
      borderColor: { control: "color", default: "rgba(20, 83, 45, 0.3)", description: "Border color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Services" },
          { title: "Intelligence" },
          { title: "About" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "course-platform-header",
    name: "Course Platform Header",
    componentName: "CoursePlatformHeader",
    description: "An educational platform header with progress tracking.",
    tags: ["header", "education", "course", "learning"],
    props: {
      ...commonHeaderProps,
      platformName: { control: "text", default: "UdemyClone", description: "Platform name." },
      userName: { control: "text", default: "John", description: "User name." },
      courseName: { control: "text", default: "React Advanced", description: "Current course name." },
      backgroundColor: { control: "color", default: "#171717", description: "Background color." },
      secondaryBackgroundColor: { control: "color", default: "#262626", description: "Secondary background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      accentColor: { control: "color", default: "#a855f7", description: "Accent color (Purple)." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Categories" },
          { title: "My Learning" },
          { title: "Wishlist" },
          { title: "Instructor" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "magazine-modern-header",
    name: "Magazine Modern Header",
    componentName: "MagazineModernHeader",
    description: "A modern, spacious header for digital magazines.",
    tags: ["header", "magazine", "modern", "clean"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "WIRED", description: "Brand name." },
      categoryText: { control: "text", default: "Technology", description: "Featured category." },
      headlineText: { control: "text", default: "The Future of Interface Design is Invisible", description: "Main headline." },
      backgroundColor: { control: "color", default: "#ffffff", description: "Background color." },
      textColor: { control: "color", default: "#000000", description: "Text color." },
      accentColor: { control: "color", default: "#dc2626", description: "Accent color (Red)." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Technology" },
          { title: "Design" },
          { title: "Business" },
          { title: "Culture" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "travel-booking-header",
    name: "Travel Booking Header",
    componentName: "TravelBookingHeader",
    description: "A comprehensive header for travel booking sites with search tabs.",
    tags: ["header", "travel", "booking", "search"],
    props: {
      ...commonHeaderProps,
      brandName: { control: "text", default: "Booking.com", description: "Brand name." },
      backgroundColor: { control: "color", default: "#003580", description: "Background color." },
      textColor: { control: "color", default: "#ffffff", description: "Text color." },
      searchBoxColor: { control: "color", default: "#febb02", description: "Search box background color." },
      searchButtonColor: { control: "color", default: "#003580", description: "Search button color." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Stays" },
          { title: "Flights" },
          { title: "Flight + Hotel" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
  {
    slug: "gradient-blur-header",
    name: "Gradient Blur Header",
    componentName: "GradientBlurHeader",
    description: "A trendy header with a glassmorphism effect and gradient background.",
    tags: ["header", "gradient", "blur", "glassmorphism"],
    props: {
      ...commonHeaderProps,
      buttonText: { control: "text", default: "Get Access", description: "CTA button text." },
      backgroundColor: { control: "color", default: "#ffffff", description: "Background color." },
      navBackgroundColor: { control: "color", default: "rgba(255, 255, 255, 0.3)", description: "Nav background color." },
      textColor: { control: "color", default: "#000000", description: "Text color." },
      accentColor: { control: "color", default: "#9333ea", description: "Accent color (Purple)." },
      navigationConfig: { 
        control: "textarea", 
        default: JSON.stringify([
          { title: "Product" },
          { title: "Solutions" },
          { title: "Resources" },
          { title: "Pricing" }
        ], null, 2), 
        description: "Navigation structure (JSON)." 
      },
      navInteractionMode: { 
        control: "select", 
        options: ["hover", "click"], 
        default: "hover", 
        description: "Interaction mode for dropdowns." 
      },
    },
  },
] as const satisfies HeaderSectionMeta[]

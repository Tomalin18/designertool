export type CardPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"
  | "number"

export interface CardPropDefinition {
  control: CardPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface CardSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, CardPropDefinition>
}

export const cardSections: CardSectionMeta[] = [
  {
    slug: "simple-card",
    name: "Simple Card",
    componentName: "SimpleCard",
    description: "A standard card component for displaying content. Clean and minimal.",
    tags: ["card", "simple", "minimal", "content", "display"],
    props: {
      title: {
        control: "text",
        default: "Simple Card",
        description: "Card title text.",
      },
      description: {
        control: "textarea",
        default: "A standard card component for displaying content. Clean and minimal.",
        description: "Card description text.",
      },
      linkText: {
        control: "text",
        default: "Read more →",
        description: "Link button text.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      linkColor: {
        control: "text",
        default: "text-indigo-400",
        description: "Link color class.",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
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
    slug: "image-card",
    name: "Image Card",
    componentName: "ImageCard",
    description: "Card with image on top, category badge, and content below.",
    tags: ["card", "image", "blog", "article", "content"],
    props: {
      category: {
        control: "text",
        default: "Lifestyle",
        description: "Category badge text.",
      },
      readTime: {
        control: "text",
        default: "5 min read",
        description: "Reading time text.",
      },
      title: {
        control: "text",
        default: "The Art of Coffee",
        description: "Card title.",
      },
      description: {
        control: "textarea",
        default: "Exploring the nuances of brewing the perfect cup of pour-over coffee.",
        description: "Card description.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
        description: "Image URL.",
      },
      categoryColor: {
        control: "text",
        default: "text-indigo-400",
        description: "Category badge color class.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "horizontal-card",
    name: "Horizontal Card",
    componentName: "HorizontalCard",
    description: "Card with horizontal layout: image on left, content on right.",
    tags: ["card", "horizontal", "layout", "image", "content"],
    props: {
      title: {
        control: "text",
        default: "Modern Workspace",
        description: "Card title.",
      },
      description: {
        control: "textarea",
        default: "Designing an environment that fosters creativity and productivity in the digital age.",
        description: "Card description.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
        description: "Image URL.",
      },
      authorName: {
        control: "text",
        default: "Alex Chen",
        description: "Author name.",
      },
      authorAvatar: {
        control: "text",
        default: "",
        description: "Author avatar URL (optional).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "overlay-card",
    name: "Overlay Card",
    componentName: "OverlayCard",
    description: "Card with image background and overlay text content.",
    tags: ["card", "overlay", "image", "gradient", "hover"],
    props: {
      category: {
        control: "text",
        default: "Nature",
        description: "Category badge text.",
      },
      title: {
        control: "text",
        default: "Morning Mist",
        description: "Card title.",
      },
      description: {
        control: "textarea",
        default: "Discover the serenity of early mornings.",
        description: "Card description (shown on hover).",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      overlayOpacity: {
        control: "slider",
        min: 0,
        max: 100,
        default: 60,
        description: "Overlay opacity percentage.",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "glass-card",
    name: "Glass Card",
    componentName: "GlassCard",
    description: "Glassmorphism card with backdrop blur and glow effects.",
    tags: ["card", "glassmorphism", "blur", "glow", "modern"],
    props: {
      title: {
        control: "text",
        default: "Glass Effect",
        description: "Card title.",
      },
      description: {
        control: "textarea",
        default: "Using backdrop-blur to create depth and hierarchy in modern interfaces.",
        description: "Card description.",
      },
      buttonText: {
        control: "text",
        default: "Explore",
        description: "Button text.",
      },
      glowColor1: {
        control: "color",
        default: "#a855f7",
        description: "First glow color (top-right).",
      },
      glowColor2: {
        control: "color",
        default: "#3b82f6",
        description: "Second glow color (bottom-left).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      backdropBlur: {
        control: "slider",
        min: 0,
        max: 24,
        default: 12,
        description: "Backdrop blur amount.",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "neo-brutalist-card",
    name: "Neo-Brutalist Card",
    componentName: "NeoBrutalistCard",
    description: "Bold neo-brutalist design with high contrast and shadow effects.",
    tags: ["card", "neo-brutalist", "bold", "contrast", "design"],
    props: {
      badge: {
        control: "text",
        default: "New Drop",
        description: "Badge text.",
      },
      title: {
        control: "textarea",
        default: "Hyper\nPop.",
        description: "Card title (supports line breaks).",
      },
      description: {
        control: "text",
        default: "Bold colors and high contrast.",
        description: "Card description.",
      },
      backgroundColor: {
        control: "color",
        default: "#ff90e8",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#000000",
        description: "Text color.",
      },
      borderColor: {
        control: "color",
        default: "#000000",
        description: "Border color.",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
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
    slug: "profile-card",
    name: "Profile Card",
    componentName: "ProfileCard",
    description: "User profile card with avatar, stats, and social links.",
    tags: ["card", "profile", "user", "social", "stats"],
    props: {
      name: {
        control: "text",
        default: "Sarah Jenkins",
        description: "User name.",
      },
      role: {
        control: "text",
        default: "Product Designer",
        description: "User role.",
      },
      avatarUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        description: "Avatar image URL.",
      },
      isOnline: {
        control: "boolean",
        default: true,
        description: "Show online status indicator.",
      },
      followers: {
        control: "number",
        default: 1200,
        description: "Number of followers.",
      },
      following: {
        control: "number",
        default: 842,
        description: "Number of following.",
      },
      projects: {
        control: "number",
        default: 12,
        description: "Number of projects.",
      },
      showSocialLinks: {
        control: "boolean",
        default: true,
        description: "Show social media links.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "pricing-card",
    name: "Pricing Card",
    componentName: "PricingCard",
    description: "Pricing card with plan details and feature list.",
    tags: ["card", "pricing", "plan", "features", "cta"],
    props: {
      planName: {
        control: "text",
        default: "Pro Plan",
        description: "Plan name.",
      },
      price: {
        control: "number",
        default: 29,
        description: "Price amount.",
      },
      period: {
        control: "text",
        default: "/mo",
        description: "Billing period.",
      },
      features: {
        control: "textarea",
        default: "Unlimited Projects\nAnalytics Dashboard\nPriority Support\nCustom Domain",
        description: "Feature list (one per line).",
      },
      buttonText: {
        control: "text",
        default: "Get Started",
        description: "CTA button text.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for plan name and button.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      buttonColor: {
        control: "color",
        default: "",
        description: "Button background color (optional, uses accent color if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
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
    slug: "product-card",
    name: "Product Card",
    componentName: "ProductCard",
    description: "E-commerce product card with image, price, and rating.",
    tags: ["card", "product", "ecommerce", "shopping", "rating"],
    props: {
      name: {
        control: "text",
        default: "Nike Air Max",
        description: "Product name.",
      },
      category: {
        control: "text",
        default: "Running Shoes",
        description: "Product category.",
      },
      price: {
        control: "number",
        default: 129.00,
        description: "Product price.",
      },
      rating: {
        control: "number",
        default: 4.8,
        min: 0,
        max: 5,
        description: "Product rating (0-5).",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
        description: "Product image URL.",
      },
      badge: {
        control: "text",
        default: "NEW",
        description: "Product badge text (leave empty to hide).",
      },
      isFavorite: {
        control: "boolean",
        default: false,
        description: "Initial favorite state.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "news-card",
    name: "News Card",
    componentName: "NewsCard",
    description: "News/blog card with category, date, and author info.",
    tags: ["card", "news", "blog", "article", "content"],
    props: {
      category: {
        control: "text",
        default: "Technology",
        description: "Article category.",
      },
      date: {
        control: "text",
        default: "Oct 24, 2024",
        description: "Publication date.",
      },
      title: {
        control: "text",
        default: "The Future of AI in Design",
        description: "Article title.",
      },
      description: {
        control: "textarea",
        default: "How generative AI is reshaping the creative workflow for designers and developers alike.",
        description: "Article description.",
      },
      authorName: {
        control: "text",
        default: "Alex Morgan",
        description: "Author name.",
      },
      authorAvatar: {
        control: "text",
        default: "",
        description: "Author avatar URL (optional).",
      },
      readTime: {
        control: "text",
        default: "5 min",
        description: "Reading time.",
      },
      categoryColor: {
        control: "text",
        default: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        description: "Category badge color classes.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "stats-card",
    name: "Stats Card",
    componentName: "StatsCard",
    description: "Statistics card with value, title, and change indicator.",
    tags: ["card", "stats", "metrics", "analytics", "data"],
    props: {
      title: {
        control: "text",
        default: "Total Revenue",
        description: "Stat title.",
      },
      value: {
        control: "text",
        default: "$24,500",
        description: "Stat value.",
      },
      change: {
        control: "number",
        default: 12.5,
        description: "Percentage change.",
      },
      iconColor: {
        control: "text",
        default: "text-neutral-400",
        description: "Icon color class.",
      },
      changeColor: {
        control: "text",
        default: "text-green-500",
        description: "Change indicator color class.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "testimonial-card",
    name: "Testimonial Card",
    componentName: "TestimonialCard",
    description: "Customer testimonial card with rating and author info.",
    tags: ["card", "testimonial", "review", "rating", "customer"],
    props: {
      rating: {
        control: "number",
        default: 5,
        min: 1,
        max: 5,
        description: "Star rating (1-5).",
      },
      quote: {
        control: "textarea",
        default: "\"Lumina UI has completely transformed how we build products. The components are beautifully designed and easy to customize.\"",
        description: "Testimonial quote.",
      },
      authorName: {
        control: "text",
        default: "Emily Watson",
        description: "Author name.",
      },
      authorRole: {
        control: "text",
        default: "CTO at TechFlow",
        description: "Author role/company.",
      },
      authorAvatar: {
        control: "text",
        default: "https://i.pravatar.cc/100?img=33",
        description: "Author avatar URL.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "task-card",
    name: "Task Card",
    componentName: "TaskCard",
    description: "Task management card with priority, assignees, and comments.",
    tags: ["card", "task", "todo", "project", "management"],
    props: {
      priority: {
        control: "text",
        default: "High Priority",
        description: "Task priority label.",
      },
      priorityColor: {
        control: "text",
        default: "text-orange-500",
        description: "Priority color class.",
      },
      title: {
        control: "text",
        default: "Redesign Homepage",
        description: "Task title.",
      },
      description: {
        control: "textarea",
        default: "Update hero section and navigation.",
        description: "Task description.",
      },
      commentCount: {
        control: "number",
        default: 3,
        description: "Number of comments.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "music-card",
    name: "Music Card",
    componentName: "MusicCard",
    description: "Music player card with album art and playback controls.",
    tags: ["card", "music", "player", "audio", "media"],
    props: {
      songTitle: {
        control: "text",
        default: "Midnight City",
        description: "Song title.",
      },
      artist: {
        control: "text",
        default: "M83",
        description: "Artist name.",
      },
      currentTime: {
        control: "text",
        default: "2:10",
        description: "Current playback time.",
      },
      totalTime: {
        control: "text",
        default: "4:03",
        description: "Total track duration.",
      },
      progress: {
        control: "slider",
        default: 50,
        min: 0,
        max: 100,
        description: "Playback progress percentage.",
      },
      isPlaying: {
        control: "boolean",
        default: false,
        description: "Initial playing state.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "video-card",
    name: "Video Card",
    componentName: "VideoCard",
    description: "Video thumbnail card with play button overlay.",
    tags: ["card", "video", "thumbnail", "media", "youtube"],
    props: {
      title: {
        control: "text",
        default: "Cinematic Lighting Techniques for Beginners",
        description: "Video title.",
      },
      channel: {
        control: "text",
        default: "Filmmaker Pro",
        description: "Channel name.",
      },
      views: {
        control: "text",
        default: "120k views",
        description: "View count.",
      },
      duration: {
        control: "text",
        default: "12:45",
        description: "Video duration.",
      },
      thumbnailUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
        description: "Thumbnail image URL.",
      },
      channelAvatar: {
        control: "text",
        default: "",
        description: "Channel avatar URL (optional).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "feature-icon-card",
    name: "Feature Icon Card",
    componentName: "FeatureIconCard",
    description: "Feature card with icon, title, and description.",
    tags: ["card", "feature", "icon", "service", "benefit"],
    props: {
      title: {
        control: "text",
        default: "Secure by Default",
        description: "Feature title.",
      },
      description: {
        control: "textarea",
        default: "Enterprise-grade security built into every component.",
        description: "Feature description.",
      },
      iconColor: {
        control: "text",
        default: "text-indigo-600",
        description: "Icon color class.",
      },
      iconBgColor: {
        control: "text",
        default: "bg-indigo-100",
        description: "Icon background color class.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "alert-card",
    name: "Alert Card",
    componentName: "AlertCard",
    description: "Notification/alert card with icon, message, and actions.",
    tags: ["card", "alert", "notification", "warning", "info"],
    props: {
      title: {
        control: "text",
        default: "Update Available",
        description: "Alert title.",
      },
      description: {
        control: "textarea",
        default: "A new version of the system is available. Please update to ensure compatibility.",
        description: "Alert description.",
      },
      primaryAction: {
        control: "text",
        default: "Update Now",
        description: "Primary action button text.",
      },
      secondaryAction: {
        control: "text",
        default: "Dismiss",
        description: "Secondary action button text.",
      },
      variant: {
        control: "select",
        default: "warning",
        options: ["warning", "info", "error", "success"],
        description: "Alert variant/color scheme.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "hover-reveal-card",
    name: "Hover Reveal Card",
    componentName: "HoverRevealCard",
    description: "Card that reveals hidden content on hover.",
    tags: ["card", "hover", "interactive", "reveal", "animation"],
    props: {
      frontTitle: {
        control: "text",
        default: "Hover Me",
        description: "Front side title.",
      },
      backTitle: {
        control: "text",
        default: "Revealed!",
        description: "Back side title.",
      },
      backDescription: {
        control: "textarea",
        default: "Hidden content is now visible.",
        description: "Back side description.",
      },
      buttonText: {
        control: "text",
        default: "Action",
        description: "Action button text.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Front side background color.",
      },
      revealColor: {
        control: "color",
        default: "#6366f1",
        description: "Back side/reveal background color.",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "gradient-border-card",
    name: "Gradient Border Card",
    componentName: "GradientBorderCard",
    description: "Card with animated gradient border effect.",
    tags: ["card", "gradient", "border", "animated", "modern"],
    props: {
      title: {
        control: "text",
        default: "Gradient Border",
        description: "Card title.",
      },
      description: {
        control: "textarea",
        default: "Using a background gradient on a parent with padding to create a border effect.",
        description: "Card description.",
      },
      gradientFrom: {
        control: "color",
        default: "#ec4899",
        description: "Gradient start color.",
      },
      gradientTo: {
        control: "color",
        default: "#f59e0b",
        description: "Gradient end color.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "event-card",
    name: "Event Card",
    componentName: "EventCard",
    description: "Event card with date, title, and location.",
    tags: ["card", "event", "calendar", "date", "schedule"],
    props: {
      month: {
        control: "text",
        default: "OCT",
        description: "Event month abbreviation.",
      },
      day: {
        control: "text",
        default: "24",
        description: "Event day.",
      },
      title: {
        control: "text",
        default: "Product Launch",
        description: "Event title.",
      },
      location: {
        control: "text",
        default: "San Francisco, CA",
        description: "Event location.",
      },
      showShare: {
        control: "boolean",
        default: true,
        description: "Show share button.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "skill-card",
    name: "Skill Card",
    componentName: "SkillCard",
    description: "Skills/tags card displaying a list of technologies or skills.",
    tags: ["card", "skills", "tags", "technologies", "list"],
    props: {
      title: {
        control: "text",
        default: "Skills",
        description: "Card title.",
      },
      skills: {
        control: "textarea",
        default: "React\nTypeScript\nNode.js\nTailwind\nFigma\nGraphQL",
        description: "Skills list (one per line).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "comparison-card",
    name: "Comparison Card",
    componentName: "ComparisonCard",
    description: "Comparison card showing differences between two options.",
    tags: ["card", "comparison", "pricing", "vs", "compare"],
    props: {
      leftLabel: {
        control: "text",
        default: "Basic",
        description: "Left column label.",
      },
      rightLabel: {
        control: "text",
        default: "Pro",
        description: "Right column label.",
      },
      rows: {
        control: "textarea",
        default: "Users:1:Unlimited\nStorage:5GB:100GB\nSupport:Email:24/7 Priority",
        description: "Comparison rows (format: Label:Left:Right, one per line).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "roadmap-card",
    name: "Roadmap Card",
    componentName: "RoadmapCard",
    description: "Roadmap card showing timeline with status indicators.",
    tags: ["card", "roadmap", "timeline", "progress", "status"],
    props: {
      title: {
        control: "text",
        default: "Q4 Roadmap",
        description: "Roadmap title.",
      },
      year: {
        control: "text",
        default: "2024",
        description: "Roadmap year.",
      },
      items: {
        control: "textarea",
        default: "Mobile App Beta:Done:green\nDark Mode V2:In Progress:yellow\nAPI Release:Planned:gray",
        description: "Roadmap items (format: Title:Status:Color, one per line).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "weather-card",
    name: "Weather Card",
    componentName: "WeatherCard",
    description: "Weather card with temperature, conditions, and hourly forecast.",
    tags: ["card", "weather", "forecast", "temperature", "data"],
    props: {
      temperature: {
        control: "number",
        default: 72,
        description: "Current temperature.",
      },
      city: {
        control: "text",
        default: "San Francisco",
        description: "City name.",
      },
      condition: {
        control: "text",
        default: "Sunny",
        description: "Weather condition.",
      },
      high: {
        control: "number",
        default: 75,
        description: "High temperature.",
      },
      low: {
        control: "number",
        default: 60,
        description: "Low temperature.",
      },
      hourlyForecast: {
        control: "textarea",
        default: "Now:72\n2PM:73\n3PM:74\n4PM:75\n5PM:76",
        description: "Hourly forecast (format: Time:Temp, one per line).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "cookie-card",
    name: "Cookie Card",
    componentName: "CookieCard",
    description: "Cookie consent card with accept/decline buttons.",
    tags: ["card", "cookie", "consent", "legal", "modal"],
    props: {
      title: {
        control: "text",
        default: "Cookies",
        description: "Card title.",
      },
      description: {
        control: "textarea",
        default: "We use cookies to improve your experience. By using our site, you agree to our use of cookies.",
        description: "Cookie consent description.",
      },
      acceptText: {
        control: "text",
        default: "Accept",
        description: "Accept button text.",
      },
      declineText: {
        control: "text",
        default: "Decline",
        description: "Decline button text.",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      buttonColor: {
        control: "color",
        default: "",
        description: "Button background color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
]


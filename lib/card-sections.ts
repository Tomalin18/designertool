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
      showLink: {
        control: "boolean",
        default: true,
        description: "Show/hide the link button.",
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
        control: "color",
        default: "#818cf8",
        description: "Link color (hex format).",
      },
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      borderWidth: {
        control: "slider",
        min: 0,
        max: 8,
        default: 1,
        description: "Border width in pixels.",
      },
      shadow: {
        control: "select",
        default: "sm",
        options: ["none", "sm", "md", "lg", "xl"],
        description: "Box shadow size.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (border color change, shadow).",
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
      showCategory: {
        control: "boolean",
        default: true,
        description: "Show/hide category badge.",
      },
      showReadTime: {
        control: "boolean",
        default: true,
        description: "Show/hide reading time.",
      },
      categoryColor: {
        control: "color",
        default: "#818cf8",
        description: "Category badge text color (hex format).",
      },
      categoryBgColor: {
        control: "color",
        default: "",
        description: "Category badge background color (optional).",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      imageHeight: {
        control: "slider",
        min: 100,
        max: 400,
        default: 200,
        description: "Image height in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, image scale).",
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
      showAuthor: {
        control: "boolean",
        default: true,
        description: "Show/hide author info.",
      },
      imageWidth: {
        control: "slider",
        min: 100,
        max: 400,
        default: 192,
        description: "Image width in pixels (for horizontal layout).",
      },
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
      },
      authorColor: {
        control: "color",
        default: "",
        description: "Author name color (optional, uses textColor if empty).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 20,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, background color change).",
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
      showCategory: {
        control: "boolean",
        default: true,
        description: "Show/hide category badge.",
      },
      showDescription: {
        control: "boolean",
        default: true,
        description: "Show/hide description (shown on hover).",
      },
      overlayOpacity: {
        control: "slider",
        min: 0,
        max: 100,
        default: 60,
        description: "Overlay opacity percentage.",
      },
      gradientOpacity: {
        control: "slider",
        min: 0,
        max: 100,
        default: 80,
        description: "Gradient overlay opacity percentage.",
      },
      categoryBgColor: {
        control: "color",
        default: "rgba(255,255,255,0.2)",
        description: "Category badge background color.",
      },
      categoryTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Category badge text color.",
      },
      titleColor: {
        control: "color",
        default: "#ffffff",
        description: "Title text color.",
      },
      descriptionColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Description text color.",
      },
      cardHeight: {
        control: "slider",
        min: 200,
        max: 500,
        default: 256,
        description: "Card height in pixels.",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (image scale, description reveal).",
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
      showButton: {
        control: "boolean",
        default: true,
        description: "Show/hide button.",
      },
      backdropBlur: {
        control: "slider",
        min: 0,
        max: 24,
        default: 12,
        description: "Backdrop blur amount.",
      },
      glowIntensity: {
        control: "slider",
        min: 0,
        max: 100,
        default: 20,
        description: "Glow effect intensity percentage.",
      },
      titleColor: {
        control: "color",
        default: "#ffffff",
        description: "Title text color.",
      },
      descriptionColor: {
        control: "color",
        default: "#d1d5db",
        description: "Description text color.",
      },
      buttonColor: {
        control: "color",
        default: "rgba(255,255,255,0.1)",
        description: "Button background color.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Button text color.",
      },
      iconColor: {
        control: "color",
        default: "#ffffff",
        description: "Icon color.",
      },
      iconBgColor: {
        control: "color",
        default: "rgba(255,255,255,0.1)",
        description: "Icon background color.",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (glow intensity increase, shadow).",
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
      showBadge: {
        control: "boolean",
        default: true,
        description: "Show/hide badge.",
      },
      shadowOffsetX: {
        control: "slider",
        min: 0,
        max: 12,
        default: 4,
        description: "Shadow offset X in pixels.",
      },
      shadowOffsetY: {
        control: "slider",
        min: 0,
        max: 12,
        default: 4,
        description: "Shadow offset Y in pixels.",
      },
      badgeBgColor: {
        control: "color",
        default: "#ffffff",
        description: "Badge background color.",
      },
      badgeTextColor: {
        control: "color",
        default: "#000000",
        description: "Badge text color.",
      },
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (translate, shadow change).",
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
      showStats: {
        control: "boolean",
        default: true,
        description: "Show/hide stats section.",
      },
      showOnlineStatus: {
        control: "boolean",
        default: true,
        description: "Show/hide online status indicator.",
      },
      onlineStatusColor: {
        control: "color",
        default: "#22c55e",
        description: "Online status indicator color.",
      },
      nameColor: {
        control: "color",
        default: "",
        description: "Name text color (optional, uses textColor if empty).",
      },
      roleColor: {
        control: "color",
        default: "",
        description: "Role text color (optional, uses textColor if empty).",
      },
      statsColor: {
        control: "color",
        default: "",
        description: "Stats number color (optional, uses textColor if empty).",
      },
      statsLabelColor: {
        control: "color",
        default: "",
        description: "Stats label color (optional, uses textColor if empty).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      avatarSize: {
        control: "slider",
        min: 40,
        max: 120,
        default: 80,
        description: "Avatar size in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      currency: {
        control: "text",
        default: "$",
        description: "Currency symbol.",
      },
      showButton: {
        control: "boolean",
        default: true,
        description: "Show/hide the CTA button.",
      },
      popular: {
        control: "boolean",
        default: false,
        description: "Mark as popular plan (adds badge).",
      },
      popularText: {
        control: "text",
        default: "Most Popular",
        description: "Popular badge text.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Button text color.",
      },
      featureIconColor: {
        control: "color",
        default: "",
        description: "Feature checkmark color (optional, uses accent color if empty).",
      },
      planNameColor: {
        control: "color",
        default: "",
        description: "Plan name color (optional, uses accent color if empty).",
      },
      priceColor: {
        control: "color",
        default: "",
        description: "Price text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      featureGap: {
        control: "slider",
        min: 4,
        max: 24,
        default: 12,
        description: "Gap between features in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, border color change).",
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
      originalPrice: {
        control: "number",
        default: 0,
        description: "Original price (0 to hide, shows strikethrough).",
      },
      currency: {
        control: "text",
        default: "$",
        description: "Currency symbol.",
      },
      rating: {
        control: "number",
        default: 4.8,
        min: 0,
        max: 5,
        description: "Product rating (0-5).",
      },
      reviewCount: {
        control: "number",
        default: 0,
        description: "Number of reviews (0 to hide).",
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
      badgeColor: {
        control: "color",
        default: "#000000",
        description: "Badge background color.",
      },
      badgeTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Badge text color.",
      },
      isFavorite: {
        control: "boolean",
        default: false,
        description: "Initial favorite state.",
      },
      showFavorite: {
        control: "boolean",
        default: true,
        description: "Show/hide favorite button.",
      },
      showRating: {
        control: "boolean",
        default: true,
        description: "Show/hide rating.",
      },
      showCategory: {
        control: "boolean",
        default: true,
        description: "Show/hide category.",
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
      nameColor: {
        control: "color",
        default: "",
        description: "Product name color (optional, uses textColor if empty).",
      },
      priceColor: {
        control: "color",
        default: "",
        description: "Price color (optional, uses textColor if empty).",
      },
      ratingColor: {
        control: "color",
        default: "#eab308",
        description: "Star rating color.",
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
        default: 12,
        description: "Padding in pixels.",
      },
      imageAspectRatio: {
        control: "select",
        default: "square",
        options: ["square", "portrait", "landscape"],
        description: "Image aspect ratio.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, image scale).",
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
      showCategory: {
        control: "boolean",
        default: true,
        description: "Show/hide category badge.",
      },
      showDate: {
        control: "boolean",
        default: true,
        description: "Show/hide publication date.",
      },
      showAuthor: {
        control: "boolean",
        default: true,
        description: "Show/hide author info.",
      },
      showReadTime: {
        control: "boolean",
        default: true,
        description: "Show/hide reading time.",
      },
      categoryColor: {
        control: "color",
        default: "#60a5fa",
        description: "Category badge text color.",
      },
      categoryBgColor: {
        control: "color",
        default: "",
        description: "Category badge background color (optional).",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
      },
      authorColor: {
        control: "color",
        default: "",
        description: "Author name color (optional, uses textColor if empty).",
      },
      dateColor: {
        control: "color",
        default: "",
        description: "Date color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (background color change, title color change).",
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
      showIcon: {
        control: "boolean",
        default: true,
        description: "Show/hide icon.",
      },
      showChange: {
        control: "boolean",
        default: true,
        description: "Show/hide change indicator.",
      },
      iconColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Icon color.",
      },
      iconBgColor: {
        control: "color",
        default: "",
        description: "Icon background color (optional).",
      },
      changeColor: {
        control: "color",
        default: "#22c55e",
        description: "Change indicator color (positive).",
      },
      changeNegativeColor: {
        control: "color",
        default: "#ef4444",
        description: "Change indicator color (negative).",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      valueColor: {
        control: "color",
        default: "",
        description: "Value text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showRating: {
        control: "boolean",
        default: true,
        description: "Show/hide star rating.",
      },
      showAuthor: {
        control: "boolean",
        default: true,
        description: "Show/hide author info.",
      },
      ratingColor: {
        control: "color",
        default: "#eab308",
        description: "Star rating color.",
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
      quoteColor: {
        control: "color",
        default: "",
        description: "Quote text color (optional, uses textColor if empty).",
      },
      authorNameColor: {
        control: "color",
        default: "",
        description: "Author name color (optional, uses textColor if empty).",
      },
      authorRoleColor: {
        control: "color",
        default: "",
        description: "Author role color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
        control: "color",
        default: "#f97316",
        description: "Priority label color.",
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
      showPriority: {
        control: "boolean",
        default: true,
        description: "Show/hide priority label.",
      },
      showComments: {
        control: "boolean",
        default: true,
        description: "Show/hide comment count.",
      },
      showAssignees: {
        control: "boolean",
        default: true,
        description: "Show/hide assignees.",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 16,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, border color change).",
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
      showControls: {
        control: "boolean",
        default: true,
        description: "Show/hide playback controls.",
      },
      showProgress: {
        control: "boolean",
        default: true,
        description: "Show/hide progress bar.",
      },
      showTime: {
        control: "boolean",
        default: true,
        description: "Show/hide time display.",
      },
      progressColor: {
        control: "color",
        default: "#6366f1",
        description: "Progress bar color.",
      },
      buttonColor: {
        control: "color",
        default: "#ffffff",
        description: "Play button color.",
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
      songTitleColor: {
        control: "color",
        default: "",
        description: "Song title color (optional, uses textColor if empty).",
      },
      artistColor: {
        control: "color",
        default: "",
        description: "Artist name color (optional, uses textColor if empty).",
      },
      timeColor: {
        control: "color",
        default: "",
        description: "Time text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 16,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showChannel: {
        control: "boolean",
        default: true,
        description: "Show/hide channel info.",
      },
      showViews: {
        control: "boolean",
        default: true,
        description: "Show/hide view count.",
      },
      showDuration: {
        control: "boolean",
        default: true,
        description: "Show/hide duration.",
      },
      playButtonColor: {
        control: "color",
        default: "#ffffff",
        description: "Play button color.",
      },
      playButtonBgColor: {
        control: "color",
        default: "rgba(0,0,0,0.6)",
        description: "Play button background color.",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      channelColor: {
        control: "color",
        default: "",
        description: "Channel name color (optional, uses textColor if empty).",
      },
      viewsColor: {
        control: "color",
        default: "",
        description: "Views text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 0,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, image scale).",
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
        control: "color",
        default: "#4f46e5",
        description: "Icon color.",
      },
      iconBgColor: {
        control: "color",
        default: "#e0e7ff",
        description: "Icon background color.",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      iconSize: {
        control: "slider",
        min: 24,
        max: 64,
        default: 48,
        description: "Icon size in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showPrimaryAction: {
        control: "boolean",
        default: true,
        description: "Show/hide primary action button.",
      },
      showSecondaryAction: {
        control: "boolean",
        default: true,
        description: "Show/hide secondary action button.",
      },
      iconColor: {
        control: "color",
        default: "",
        description: "Icon color (optional, uses variant color if empty).",
      },
      primaryButtonColor: {
        control: "color",
        default: "",
        description: "Primary button background color (optional, uses variant color if empty).",
      },
      primaryButtonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary button text color.",
      },
      secondaryButtonColor: {
        control: "color",
        default: "",
        description: "Secondary button background color (optional).",
      },
      secondaryButtonTextColor: {
        control: "color",
        default: "",
        description: "Secondary button text color (optional, uses textColor if empty).",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 20,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showButton: {
        control: "boolean",
        default: true,
        description: "Show/hide action button.",
      },
      frontTitleColor: {
        control: "color",
        default: "#ffffff",
        description: "Front side title color.",
      },
      backTitleColor: {
        control: "color",
        default: "#ffffff",
        description: "Back side title color.",
      },
      backDescriptionColor: {
        control: "color",
        default: "#ffffff",
        description: "Back side description color.",
      },
      buttonColor: {
        control: "color",
        default: "#ffffff",
        description: "Button text color.",
      },
      buttonBgColor: {
        control: "color",
        default: "",
        description: "Button background color (optional).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      animationSpeed: {
        control: "slider",
        min: 200,
        max: 1000,
        default: 300,
        description: "Animation speed in milliseconds.",
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
      gradientAnimated: {
        control: "boolean",
        default: true,
        description: "Enable animated gradient border.",
      },
      gradientWidth: {
        control: "slider",
        min: 1,
        max: 8,
        default: 2,
        description: "Gradient border width in pixels.",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showLocation: {
        control: "boolean",
        default: true,
        description: "Show/hide location.",
      },
      dateColor: {
        control: "color",
        default: "",
        description: "Date text color (optional, uses textColor if empty).",
      },
      monthColor: {
        control: "color",
        default: "",
        description: "Month text color (optional, uses textColor if empty).",
      },
      dayColor: {
        control: "color",
        default: "",
        description: "Day text color (optional, uses textColor if empty).",
      },
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      locationColor: {
        control: "color",
        default: "",
        description: "Location text color (optional, uses textColor if empty).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 20,
        description: "Padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showTitle: {
        control: "boolean",
        default: true,
        description: "Show/hide card title.",
      },
      skillBgColor: {
        control: "color",
        default: "",
        description: "Skill badge background color (optional).",
      },
      skillTextColor: {
        control: "color",
        default: "",
        description: "Skill badge text color (optional, uses textColor if empty).",
      },
      skillBorderColor: {
        control: "color",
        default: "",
        description: "Skill badge border color (optional).",
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
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
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
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      skillGap: {
        control: "slider",
        min: 4,
        max: 16,
        default: 8,
        description: "Gap between skills in pixels.",
      },
      skillPadding: {
        control: "slider",
        min: 4,
        max: 16,
        default: 8,
        description: "Skill badge padding in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      leftLabelColor: {
        control: "color",
        default: "",
        description: "Left label text color (optional, uses textColor if empty).",
      },
      rightLabelColor: {
        control: "color",
        default: "",
        description: "Right label text color (optional, uses textColor if empty).",
      },
      rowLabelColor: {
        control: "color",
        default: "",
        description: "Row label text color (optional, uses textColor if empty).",
      },
      leftValueColor: {
        control: "color",
        default: "",
        description: "Left value text color (optional, uses textColor if empty).",
      },
      rightValueColor: {
        control: "color",
        default: "",
        description: "Right value text color (optional, uses textColor if empty).",
      },
      dividerColor: {
        control: "color",
        default: "",
        description: "Divider line color (optional).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      rowGap: {
        control: "slider",
        min: 8,
        max: 32,
        default: 16,
        description: "Gap between rows in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showTitle: {
        control: "boolean",
        default: true,
        description: "Show/hide roadmap title.",
      },
      showYear: {
        control: "boolean",
        default: true,
        description: "Show/hide year.",
      },
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      yearColor: {
        control: "color",
        default: "",
        description: "Year text color (optional, uses textColor if empty).",
      },
      itemTitleColor: {
        control: "color",
        default: "",
        description: "Item title text color (optional, uses textColor if empty).",
      },
      itemStatusColor: {
        control: "color",
        default: "",
        description: "Item status text color (optional, uses textColor if empty).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      itemGap: {
        control: "slider",
        min: 8,
        max: 32,
        default: 16,
        description: "Gap between items in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showHourlyForecast: {
        control: "boolean",
        default: true,
        description: "Show/hide hourly forecast.",
      },
      showHighLow: {
        control: "boolean",
        default: true,
        description: "Show/hide high/low temperatures.",
      },
      temperatureColor: {
        control: "color",
        default: "",
        description: "Temperature text color (optional, uses textColor if empty).",
      },
      cityColor: {
        control: "color",
        default: "",
        description: "City name color (optional, uses textColor if empty).",
      },
      conditionColor: {
        control: "color",
        default: "",
        description: "Condition text color (optional, uses textColor if empty).",
      },
      highColor: {
        control: "color",
        default: "",
        description: "High temperature color (optional, uses textColor if empty).",
      },
      lowColor: {
        control: "color",
        default: "",
        description: "Low temperature color (optional, uses textColor if empty).",
      },
      forecastTimeColor: {
        control: "color",
        default: "",
        description: "Forecast time color (optional, uses textColor if empty).",
      },
      forecastTempColor: {
        control: "color",
        default: "",
        description: "Forecast temperature color (optional, uses textColor if empty).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      forecastGap: {
        control: "slider",
        min: 8,
        max: 24,
        default: 12,
        description: "Gap between forecast items in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, scale).",
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
      showDeclineButton: {
        control: "boolean",
        default: true,
        description: "Show/hide decline button.",
      },
      titleColor: {
        control: "color",
        default: "",
        description: "Title text color (optional, uses textColor if empty).",
      },
      descriptionColor: {
        control: "color",
        default: "",
        description: "Description text color (optional, uses textColor if empty).",
      },
      acceptButtonColor: {
        control: "color",
        default: "",
        description: "Accept button background color (optional, uses buttonColor if empty).",
      },
      acceptButtonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Accept button text color.",
      },
      declineButtonColor: {
        control: "color",
        default: "",
        description: "Decline button background color (optional).",
      },
      declineButtonTextColor: {
        control: "color",
        default: "",
        description: "Decline button text color (optional, uses textColor if empty).",
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
      padding: {
        control: "slider",
        min: 0,
        max: 48,
        default: 24,
        description: "Padding in pixels.",
      },
      buttonGap: {
        control: "slider",
        min: 8,
        max: 24,
        default: 12,
        description: "Gap between buttons in pixels.",
      },
      hoverEffect: {
        control: "boolean",
        default: true,
        description: "Enable hover effects (shadow, button scale).",
      },
    },
  },
]


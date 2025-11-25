export type CtaPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"

export interface CtaPropDefinition {
  control: CtaPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface CtaSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, CtaPropDefinition>
}

export const ctaSections: CtaSectionMeta[] = [
  {
    slug: "simple-centered-cta",
    name: "Simple Centered CTA",
    componentName: "SimpleCenteredCta",
    description: "Centered call-to-action with headline, description, and dual buttons.",
    tags: ["cta", "centered", "dark", "button", "minimal"],
    props: {
      heading: {
        control: "text",
        default: "Ready to get started?",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Join thousands of developers building the future with Lumina. Free forever for personal projects.",
        description: "Supporting description below the heading.",
      },
      primaryButtonText: {
        control: "text",
        default: "Get Started",
        description: "Primary button label.",
      },
      secondaryButtonText: {
        control: "text",
        default: "Contact Sales",
        description: "Secondary button label.",
      },
      showSecondaryButton: {
        control: "boolean",
        default: true,
        description: "Show or hide the secondary button.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the description text.",
      },
    },
  },
  {
    slug: "split-image-cta",
    name: "Split Image CTA",
    componentName: "SplitImageCta",
    description: "Two-column CTA with content on the left and image on the right.",
    tags: ["cta", "split", "image", "light", "two-column"],
    props: {
      heading: {
        control: "text",
        default: "Transform your workflow.",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Stop wasting time on repetitive tasks. Automate your entire process with our AI-driven pipelines.",
        description: "Supporting description text.",
      },
      primaryButtonText: {
        control: "text",
        default: "Start Now",
        description: "Primary button label.",
      },
      secondaryButtonText: {
        control: "text",
        default: "Learn More",
        description: "Secondary button label.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
        description: "URL of the right-side image.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the content section.",
      },
      headingColor: {
        control: "color",
        default: "#171717",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#525252",
        description: "Color of the description text.",
      },
      primaryButtonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the primary button.",
      },
      primaryButtonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the primary button.",
      },
      secondaryButtonBorderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the secondary button.",
      },
      secondaryButtonTextColor: {
        control: "color",
        default: "#171717",
        description: "Text color of the secondary button.",
      },
      secondaryButtonHoverBackgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the secondary button on hover.",
      },
    },
  },
  {
    slug: "glow-gradient-cta",
    name: "Glow Gradient CTA",
    componentName: "GlowGradientCta",
    description: "Dark CTA with glowing gradient background and animated border button.",
    tags: ["cta", "gradient", "glow", "dark", "animated", "premium"],
    props: {
      heading: {
        control: "text",
        default: "Unleash the Power.",
        description: "Main heading text.",
      },
      highlightText: {
        control: "text",
        default: "Power.",
        description: "Text to highlight with gradient.",
      },
      description: {
        control: "text",
        default: "The most advanced UI kit on the market.",
        description: "Supporting description text.",
      },
      buttonText: {
        control: "text",
        default: "Get Access",
        description: "Button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the section.",
      },
      glowColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color of the background glow effect.",
      },
      gradientFromColor: {
        control: "color",
        default: "#818cf8",
        description: "Starting color of the text gradient.",
      },
      gradientToColor: {
        control: "color",
        default: "#22d3ee",
        description: "Ending color of the text gradient.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text (non-highlighted part).",
      },
      descriptionColor: {
        control: "color",
        default: "#818cf8",
        description: "Color of the description text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#0f172a",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
      buttonGradientFromColor: {
        control: "color",
        default: "#E2CBFF",
        description: "Starting color of the button's rotating gradient border.",
      },
      buttonGradientToColor: {
        control: "color",
        default: "#393BB2",
        description: "Ending color of the button's rotating gradient border.",
      },
    },
  },
  {
    slug: "app-store-cta",
    name: "App Store CTA",
    componentName: "AppStoreCta",
    description: "Mobile app download CTA with App Store and Google Play buttons.",
    tags: ["cta", "mobile", "app", "download", "dark", "store"],
    props: {
      heading: {
        control: "text",
        default: "Take it with you.",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Download our mobile app for iOS and Android.",
        description: "Supporting description text.",
      },
      showAppStore: {
        control: "boolean",
        default: true,
        description: "Show App Store button.",
      },
      showGooglePlay: {
        control: "boolean",
        default: true,
        description: "Show Google Play button.",
      },
      backgroundColor: {
        control: "color",
        default: "#1a1a1a",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#262626",
        description: "Background color of the card.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the description text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the app store buttons.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the app store buttons.",
      },
      buttonBorderColor: {
        control: "color",
        default: "#404040",
        description: "Border color of the app store buttons.",
      },
      cardBorderColor: {
        control: "color",
        default: "#404040",
        description: "Border color of the card.",
      },
    },
  },
  {
    slug: "newsletter-bar-cta",
    name: "Newsletter Bar CTA",
    componentName: "NewsletterBarCta",
    description: "Horizontal newsletter signup bar with email input.",
    tags: ["cta", "newsletter", "email", "input", "colorful", "subscribe"],
    props: {
      heading: {
        control: "text",
        default: "Stay in the loop",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Get the latest updates and resources sent to your inbox weekly.",
        description: "Supporting description text.",
      },
      placeholder: {
        control: "text",
        default: "Enter your email",
        description: "Email input placeholder text.",
      },
      buttonText: {
        control: "text",
        default: "Subscribe",
        description: "Submit button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#4f46e5",
        description: "Background color of the section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#c7d2fe",
        description: "Color of the description text.",
      },
      inputBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the input field.",
      },
      inputBorderColor: {
        control: "color",
        default: "#e5e7eb",
        description: "Border color of the input field.",
      },
      inputTextColor: {
        control: "color",
        default: "#171717",
        description: "Text color of the input field.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the subscribe button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the subscribe button.",
      },
    },
  },
  {
    slug: "card-overlay-cta",
    name: "Card Overlay CTA",
    componentName: "CardOverlayCta",
    description: "Floating card CTA over a blurred background image.",
    tags: ["cta", "card", "overlay", "image", "blur", "signup"],
    props: {
      heading: {
        control: "text",
        default: "Start your free trial today",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "No credit card required. 14-day free trial on all premium plans.",
        description: "Supporting description text.",
      },
      buttonText: {
        control: "text",
        default: "Create Account",
        description: "Button label.",
      },
      footerText: {
        control: "text",
        default: "By signing up, you agree to our Terms.",
        description: "Small footer text.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the card.",
      },
      headingColor: {
        control: "color",
        default: "#171717",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#525252",
        description: "Color of the description text.",
      },
      footerTextColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the footer text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#4f46e5",
        description: "Background color of the button.",
      },
      overlayColor: {
        control: "color",
        default: "#000000",
        description: "Color of the overlay above the background image.",
      },
      overlayOpacity: {
        control: "slider",
        default: 50,
        min: 0,
        max: 100,
        description: "Opacity percentage of the overlay (0-100).",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
    },
  },
  {
    slug: "developer-terminal-cta",
    name: "Developer Terminal CTA",
    componentName: "DeveloperTerminalCta",
    description: "Terminal-style CTA for developer tools with install command.",
    tags: ["cta", "developer", "terminal", "code", "dark", "tech"],
    props: {
      heading: {
        control: "text",
        default: "Install in seconds",
        description: "Main heading text.",
      },
      command: {
        control: "text",
        default: "npm install @lumina/ui",
        description: "Install command to display.",
      },
      footnote: {
        control: "text",
        default: "Requires React 18+ and Tailwind CSS",
        description: "Footnote text below the terminal.",
      },
      showGithubLink: {
        control: "boolean",
        default: true,
        description: "Show GitHub link.",
      },
      showDocsLink: {
        control: "boolean",
        default: true,
        description: "Show documentation link.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the section.",
      },
      terminalBackgroundColor: {
        control: "color",
        default: "#0d1117",
        description: "Background color of the terminal.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      promptColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the terminal prompt symbol.",
      },
      commandTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the command text.",
      },
      footnoteColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the footnote text.",
      },
      linkColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the GitHub and docs links.",
      },
      linkHoverColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the links on hover.",
      },
      terminalBorderColor: {
        control: "color",
        default: "#404040",
        description: "Border color of the terminal.",
      },
      buttonColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the copy button icon.",
      },
    },
  },
  {
    slug: "saas-peek-cta",
    name: "SaaS Peek CTA",
    componentName: "SaasPeekCta",
    description: "SaaS dashboard preview CTA with partial dashboard mockup.",
    tags: ["cta", "saas", "dashboard", "preview", "dark", "analytics"],
    props: {
      heading: {
        control: "text",
        default: "Master your analytics.",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Get a bird's eye view of your entire operation with our customizable dashboard.",
        description: "Supporting description text.",
      },
      buttonText: {
        control: "text",
        default: "Try Demo",
        description: "Button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the description text.",
      },
      previewBorderColor: {
        control: "color",
        default: "#404040",
        description: "Border color of the preview panel.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#6366f1",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
      previewBackgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the preview panel.",
      },
    },
  },
  {
    slug: "social-proof-cta",
    name: "Social Proof CTA",
    componentName: "SocialProofCta",
    description: "CTA with avatar stack and user count for social proof.",
    tags: ["cta", "social", "proof", "avatars", "light", "trust"],
    props: {
      heading: {
        control: "text",
        default: "Join 10,000+ designers",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "See why leading design teams choose Lumina for their systems.",
        description: "Supporting description text.",
      },
      buttonText: {
        control: "text",
        default: "Get Started for Free",
        description: "Button label.",
      },
      avatarCount: {
        control: "slider",
        default: 5,
        min: 3,
        max: 8,
        description: "Number of avatars to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      headingColor: {
        control: "color",
        default: "#171717",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#525252",
        description: "Color of the description text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
      avatarBorderColor: {
        control: "color",
        default: "#ffffff",
        description: "Border color of the avatar images.",
      },
    },
  },
  {
    slug: "countdown-cta",
    name: "Countdown CTA",
    componentName: "CountdownCta",
    description: "Urgency-driven CTA with countdown timer for limited offers.",
    tags: ["cta", "countdown", "timer", "sale", "urgency", "gradient"],
    props: {
      badgeText: {
        control: "text",
        default: "Limited Time Offer",
        description: "Badge text above the heading.",
      },
      heading: {
        control: "text",
        default: "Black Friday Sale",
        description: "Main heading text.",
      },
      buttonText: {
        control: "text",
        default: "Claim 50% Off",
        description: "Button label.",
      },
      days: {
        control: "text",
        default: "02",
        description: "Days remaining.",
      },
      hours: {
        control: "text",
        default: "14",
        description: "Hours remaining.",
      },
      minutes: {
        control: "text",
        default: "45",
        description: "Minutes remaining.",
      },
      seconds: {
        control: "text",
        default: "12",
        description: "Seconds remaining.",
      },
      gradientFromColor: {
        control: "color",
        default: "#dc2626",
        description: "Starting color of the gradient.",
      },
      gradientToColor: {
        control: "color",
        default: "#e11d48",
        description: "Ending color of the gradient.",
      },
      badgeBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the badge (with opacity).",
      },
      badgeTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the badge.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#dc2626",
        description: "Text color of the button.",
      },
      timeUnitBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the time unit boxes (with opacity).",
      },
      timeUnitTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the time unit values.",
      },
    },
  },
  {
    slug: "pricing-teaser-cta",
    name: "Pricing Teaser CTA",
    componentName: "PricingTeaserCta",
    description: "Pricing highlight CTA with starting price and feature badges.",
    tags: ["cta", "pricing", "teaser", "light", "card", "features"],
    props: {
      heading: {
        control: "text",
        default: "Simple, transparent pricing.",
        description: "Main heading text.",
      },
      priceText: {
        control: "text",
        default: "$19/mo",
        description: "Starting price text.",
      },
      priceDescription: {
        control: "text",
        default: "Plans start at just",
        description: "Text before the price.",
      },
      feature1: {
        control: "text",
        default: "No setup fees",
        description: "First feature badge.",
      },
      feature2: {
        control: "text",
        default: "14-day trial",
        description: "Second feature badge.",
      },
      primaryButtonText: {
        control: "text",
        default: "View Pricing",
        description: "Primary button label.",
      },
      secondaryButtonText: {
        control: "text",
        default: "Talk to Sales",
        description: "Secondary button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the card.",
      },
      accentColor: {
        control: "color",
        default: "#4f46e5",
        description: "Accent color for buttons.",
      },
      headingColor: {
        control: "color",
        default: "#171717",
        description: "Color of the heading text.",
      },
      priceTextColor: {
        control: "color",
        default: "#171717",
        description: "Color of the price text.",
      },
      priceDescriptionColor: {
        control: "color",
        default: "#737373",
        description: "Color of the price description text.",
      },
      featureTextColor: {
        control: "color",
        default: "#525252",
        description: "Color of the feature text.",
      },
      featureIconColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the feature check icons.",
      },
      secondaryButtonBorderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the secondary button.",
      },
      secondaryButtonTextColor: {
        control: "color",
        default: "#525252",
        description: "Text color of the secondary button.",
      },
      secondaryButtonHoverBackgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the secondary button on hover.",
      },
    },
  },
  {
    slug: "video-background-cta",
    name: "Video Background CTA",
    componentName: "VideoBackgroundCta",
    description: "CTA with animated/video background and play button.",
    tags: ["cta", "video", "background", "play", "media", "dark"],
    props: {
      heading: {
        control: "text",
        default: "See it in action.",
        description: "Main heading text.",
      },
      buttonText: {
        control: "text",
        default: "Watch Showreel",
        description: "Button label.",
      },
      backgroundImage: {
        control: "text",
        default: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
        description: "Background image/GIF URL.",
      },
      overlayColor: {
        control: "color",
        default: "#312e81",
        description: "Overlay color.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      overlayOpacity: {
        control: "slider",
        default: 20,
        min: 0,
        max: 100,
        description: "Opacity percentage of the background image overlay (0-100).",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the button (with opacity).",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
      buttonBorderColor: {
        control: "color",
        default: "#ffffff",
        description: "Border color of the button (with opacity).",
      },
      playIconColor: {
        control: "color",
        default: "#312e81",
        description: "Color of the play icon inside the button.",
      },
    },
  },
  {
    slug: "community-cta",
    name: "Community CTA",
    componentName: "CommunityCta",
    description: "Discord/community join CTA with member stats.",
    tags: ["cta", "community", "discord", "social", "members", "colorful"],
    props: {
      heading: {
        control: "text",
        default: "Join the Community",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Connect with 50,000+ developers, share your work, and get help from the team.",
        description: "Supporting description text.",
      },
      buttonText: {
        control: "text",
        default: "Join Discord Server",
        description: "Button label.",
      },
      statCount: {
        control: "slider",
        default: 4,
        min: 2,
        max: 6,
        description: "Number of stat cards to show.",
      },
      backgroundColor: {
        control: "color",
        default: "#5865F2",
        description: "Background color (Discord blue).",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#c7d2fe",
        description: "Color of the description text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#5865F2",
        description: "Text color of the button.",
      },
      statCardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the stat cards (with opacity).",
      },
      statCardTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the stat card numbers.",
      },
      statCardLabelColor: {
        control: "color",
        default: "#c7d2fe",
        description: "Text color of the stat card labels.",
      },
    },
  },
  {
    slug: "brutalist-cta",
    name: "Brutalist CTA",
    componentName: "BrutalistCta",
    description: "Bold brutalist-style CTA with thick borders and shadow.",
    tags: ["cta", "brutalist", "bold", "creative", "typography", "light"],
    props: {
      line1: {
        control: "text",
        default: "Ship",
        description: "First line of text.",
      },
      line2: {
        control: "text",
        default: "It",
        description: "Second line of text.",
      },
      line3: {
        control: "text",
        default: "Fast.",
        description: "Third line of text.",
      },
      buttonText: {
        control: "text",
        default: "Get the Kit",
        description: "Button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#f2f2f2",
        description: "Background color of the section.",
      },
      borderColor: {
        control: "color",
        default: "#000000",
        description: "Border color.",
      },
      textColor: {
        control: "color",
        default: "#000000",
        description: "Text color.",
      },
      buttonColor: {
        control: "color",
        default: "#ff00ff",
        description: "Button background color.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
      buttonBorderColor: {
        control: "color",
        default: "#000000",
        description: "Border color of the button.",
      },
    },
  },
  {
    slug: "interactive-slider-cta",
    name: "Interactive Slider CTA",
    componentName: "InteractiveSliderCta",
    description: "Interactive savings calculator CTA with slider input.",
    tags: ["cta", "interactive", "slider", "calculator", "savings", "dark"],
    props: {
      heading: {
        control: "text",
        default: "See how much you save",
        description: "Main heading text.",
      },
      sliderLabel: {
        control: "text",
        default: "Hours saved / week",
        description: "Label for the slider.",
      },
      savingsLabel: {
        control: "text",
        default: "saved per week",
        description: "Label for savings display.",
      },
      buttonText: {
        control: "text",
        default: "Start Saving Today",
        description: "Button label.",
      },
      multiplier: {
        control: "slider",
        default: 150,
        min: 50,
        max: 500,
        description: "Dollar multiplier per hour.",
      },
      maxHours: {
        control: "slider",
        default: 40,
        min: 20,
        max: 100,
        description: "Maximum hours on slider.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the outer section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the card.",
      },
      accentColor: {
        control: "color",
        default: "#22c55e",
        description: "Accent color for savings.",
      },
      sliderAccentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for slider.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      sliderLabelColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the slider label text.",
      },
      savingsLabelColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the savings label text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#6366f1",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
    },
  },
  {
    slug: "two-column-benefits-cta",
    name: "Two Column Benefits CTA",
    componentName: "TwoColumnBenefitsCta",
    description: "Two-column CTA with feature checklist and image.",
    tags: ["cta", "benefits", "checklist", "image", "light", "features"],
    props: {
      heading: {
        control: "text",
        default: "Everything you need to succeed.",
        description: "Main heading text.",
      },
      benefit1: {
        control: "text",
        default: "Unlimited projects",
        description: "First benefit item.",
      },
      benefit2: {
        control: "text",
        default: "Team collaboration",
        description: "Second benefit item.",
      },
      benefit3: {
        control: "text",
        default: "Analytics dashboard",
        description: "Third benefit item.",
      },
      benefit4: {
        control: "text",
        default: "Custom domain support",
        description: "Fourth benefit item.",
      },
      benefit5: {
        control: "text",
        default: "Priority email support",
        description: "Fifth benefit item.",
      },
      buttonText: {
        control: "text",
        default: "Get Full Access",
        description: "Button label.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop",
        description: "Right-side image URL.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the section.",
      },
      headingColor: {
        control: "color",
        default: "#171717",
        description: "Color of the heading text.",
      },
      checkColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the check icons.",
      },
      benefitTextColor: {
        control: "color",
        default: "#525252",
        description: "Color of the benefit item text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
      imageOverlayColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Background color for the image placeholder.",
      },
    },
  },
  {
    slug: "floating-banner-cta",
    name: "Floating Banner CTA",
    componentName: "FloatingBannerCta",
    description: "Sticky bottom banner CTA with offer message.",
    tags: ["cta", "banner", "floating", "sticky", "offer", "light"],
    props: {
      message: {
        control: "text",
        default: "Get 20% off your first month",
        description: "Offer message text.",
      },
      buttonText: {
        control: "text",
        default: "Claim Offer",
        description: "Button label.",
      },
      showIndicator: {
        control: "boolean",
        default: true,
        description: "Show pulsing indicator dot.",
      },
      backgroundColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Background color of the page section.",
      },
      bannerBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the banner.",
      },
      indicatorColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the indicator dot.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the button.",
      },
      messageTextColor: {
        control: "color",
        default: "#171717",
        description: "Text color of the message.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the button.",
      },
      bannerBorderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the banner.",
      },
      bannerTextColor: {
        control: "color",
        default: "#171717",
        description: "Text color inside the banner.",
      },
    },
  },
  {
    slug: "abstract-3d-cta",
    name: "Abstract 3D CTA",
    componentName: "Abstract3dCta",
    description: "Abstract CTA with 3D-style floating icon and gradient blurs.",
    tags: ["cta", "abstract", "3d", "gradient", "dark", "creative"],
    props: {
      heading: {
        control: "text",
        default: "Supercharge your workflow.",
        description: "Main heading text.",
      },
      buttonText: {
        control: "text",
        default: "Start Building",
        description: "Button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      glowColor1: {
        control: "color",
        default: "#9333ea",
        description: "First gradient glow color.",
      },
      glowColor2: {
        control: "color",
        default: "#2563eb",
        description: "Second gradient glow color.",
      },
      iconColor: {
        control: "color",
        default: "#facc15",
        description: "Color of the icon.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#171717",
        description: "Text color of the button.",
      },
      descriptionColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the description text.",
      },
    },
  },
  {
    slug: "enterprise-trust-cta",
    name: "Enterprise Trust CTA",
    componentName: "EnterpriseTrustCta",
    description: "Enterprise-focused CTA with trust icon and dual buttons.",
    tags: ["cta", "enterprise", "trust", "security", "light", "business"],
    props: {
      heading: {
        control: "text",
        default: "Trusted by the Fortune 500",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Security, scalability, and dedicated support. Lumina Enterprise is built for mission-critical applications.",
        description: "Supporting description text.",
      },
      primaryButtonText: {
        control: "text",
        default: "Contact Sales",
        description: "Primary button label.",
      },
      secondaryButtonText: {
        control: "text",
        default: "Read Case Studies",
        description: "Secondary button label.",
      },
      showSecondaryButton: {
        control: "boolean",
        default: true,
        description: "Show or hide the secondary button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      headingColor: {
        control: "color",
        default: "#171717",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#737373",
        description: "Color of the description text.",
      },
      iconColor: {
        control: "color",
        default: "#171717",
        description: "Color of the shield icon.",
      },
      primaryButtonBackgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the primary button.",
      },
      primaryButtonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the primary button.",
      },
      secondaryButtonBorderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the secondary button.",
      },
      secondaryButtonTextColor: {
        control: "color",
        default: "#171717",
        description: "Text color of the secondary button.",
      },
      secondaryButtonHoverBackgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the secondary button on hover.",
      },
    },
  },
  {
    slug: "referral-cta",
    name: "Referral CTA",
    componentName: "ReferralCta",
    description: "Referral program CTA with shareable link and reward details.",
    tags: ["cta", "referral", "reward", "share", "light", "gift"],
    props: {
      heading: {
        control: "text",
        default: "Give $50, Get $50",
        description: "Main heading text.",
      },
      description: {
        control: "text",
        default: "Refer a friend to Lumina and you'll both receive $50 in credit when they subscribe.",
        description: "Supporting description text.",
      },
      referralLink: {
        control: "text",
        default: "lumina.ui/refer/alex-291",
        description: "Referral link to display.",
      },
      buttonText: {
        control: "text",
        default: "Copy",
        description: "Copy button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#eef2ff",
        description: "Background color (gradient from).",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the card.",
      },
      accentColor: {
        control: "color",
        default: "#9333ea",
        description: "Accent color for icon and button.",
      },
      headingColor: {
        control: "color",
        default: "#171717",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#737373",
        description: "Color of the description text.",
      },
      linkTextColor: {
        control: "color",
        default: "#525252",
        description: "Text color of the referral link.",
      },
      linkBorderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color of the referral link container.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the copy button.",
      },
      copyButtonBackgroundColor: {
        control: "color",
        default: "#9333ea",
        description: "Background color of the copy button.",
      },
      copyButtonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the copy button.",
      },
    },
  },
]

export const ctaSectionsBySlug = ctaSections.reduce<
  Record<string, CtaSectionMeta>
>((acc, section) => {
  acc[section.slug] = section
  return acc
}, {})


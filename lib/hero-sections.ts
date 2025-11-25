export type HeroPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"

export interface HeroPropDefinition {
  control: HeroPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface HeroSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, HeroPropDefinition>
}

export const heroSections: HeroSectionMeta[] = [
  {
    slug: "simple-centered-hero",
    name: "Simple Centered Hero",
    componentName: "SimpleCenteredHero",
    description: "Centered SaaS hero with pill badge, headline, and dual CTAs.",
    tags: ["hero", "startup", "cta"],
    props: {
      pillText: {
        control: "text",
        default: "v2.0 is now available",
        description: "Small pill badge text displayed above the headline.",
      },
      heading: {
        control: "text",
        default: "Build faster with Lumina",
        description: "Primary heading displayed in large text.",
      },
      highlightText: {
        control: "text",
        default: "Lumina",
        description: "Highlighted word inside the heading.",
      },
      description: {
        control: "text",
        default: "The ultimate component kit for React. Beautifully designed, accessible, and ready for production.",
        description: "Supporting description below the heading.",
      },
      primaryCtaLabel: {
        control: "text",
        default: "Get Started",
        description: "Label for the primary CTA button.",
      },
      secondaryCtaLabel: {
        control: "text",
        default: "View Demo",
        description: "Label for the secondary CTA button.",
      },
      showPill: {
        control: "boolean",
        default: true,
        description: "Toggle to show or hide the pill badge.",
      },
      showPrimaryCta: {
        control: "boolean",
        default: true,
        description: "Show the primary call-to-action button.",
      },
      showSecondaryCta: {
        control: "boolean",
        default: true,
        description: "Show the secondary call-to-action button.",
      },
      backgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color for the hero container.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the main heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#9ca3af",
        description: "Color of the supporting description text.",
      },
      highlightColor: {
        control: "color",
        default: "#6366f1",
        description: "Color used on the highlighted word inside the heading.",
      },
      pillBackgroundColor: {
        control: "color",
        default: "#111827",
        description: "Background color for the pill badge.",
      },
      pillBorderColor: {
        control: "color",
        default: "#4c1d95",
        description: "Border color for the pill badge.",
      },
      pillTextColor: {
        control: "color",
        default: "#a5b4fc",
        description: "Text color for the pill badge.",
      },
    },
  },
  {
    slug: "saas-dashboard-hero",
    name: "SaaS Dashboard Hero",
    componentName: "SaaSDashboardHero",
    description: "Two-column product hero highlighting analytics features.",
    tags: ["hero", "product", "dashboard"],
    props: {
      heading: {
        control: "text",
        default: "Data analytics for modern teams",
        description: "Primary heading on the left column.",
      },
      description: {
        control: "text",
        default: "Stop guessing. Start making data-driven decisions with our all-in-one analytics platform.",
        description: "Supporting description under the heading.",
      },
      featureOne: {
        control: "text",
        default: "Real-time tracking",
        description: "First feature bullet.",
      },
      featureTwo: {
        control: "text",
        default: "Custom reports",
        description: "Second feature bullet.",
      },
      featureThree: {
        control: "text",
        default: "Team collaboration",
        description: "Third feature bullet.",
      },
      showFeatureList: {
        control: "boolean",
        default: true,
        description: "Toggle the visibility of the bullet feature list.",
      },
      showPreviewPanel: {
        control: "boolean",
        default: true,
        description: "Display the right-hand analytics preview card.",
      },
      backgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color for the overall hero section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color applied to the main heading.",
      },
      descriptionColor: {
        control: "color",
        default: "#a1a1aa",
        description: "Color for the supporting description text.",
      },
      featureTextColor: {
        control: "color",
        default: "#d4d4d8",
        description: "Color for the text inside each feature bullet.",
      },
      previewGlowFromColor: {
        control: "color",
        default: "#6366f1",
        description: "Starting color for the glowing preview border.",
      },
      previewGlowToColor: {
        control: "color",
        default: "#a855f7",
        description: "Ending color for the glowing preview border.",
      },
      previewCardBackground: {
        control: "color",
        default: "#111827",
        description: "Inner background color of the preview card.",
      },
      previewBorderColor: {
        control: "color",
        default: "#1f2937",
        description: "Border color around the preview card.",
      },
    },
  },
  {
    slug: "dev-code-hero",
    name: "Dev / Code Hero",
    componentName: "DevCodeHero",
    description: "Developer-focused hero with terminal-style callout.",
    tags: ["hero", "developer", "terminal"],
    props: {
      heading: {
        control: "text",
        default: "<CodeFaster />",
        description: "Monospace heading text.",
      },
      description: {
        control: "text",
        default: "Seamless integration with your existing stack. Type-safe, documented, and tested.",
        description: "Supporting description below the heading.",
      },
      commandText: {
        control: "text",
        default: "npm install @lumina/ui",
        description: "Command displayed inside the terminal card.",
      },
      shellLabel: {
        control: "text",
        default: "bash",
        description: "Label shown at the top of the faux terminal window.",
      },
      statusMessage: {
        control: "text",
        default: "... installing dependencies",
        description: "Status message displayed under the command.",
      },
      promptSymbol: {
        control: "text",
        default: "$",
        description: "Prompt symbol displayed before each command line.",
      },
      showIcon: {
        control: "boolean",
        default: true,
        description: "Controls whether the terminal icon appears above the heading.",
      },
      backgroundColor: {
        control: "color",
        default: "#0d1117",
        description: "Background color for the entire hero.",
      },
      terminalBackgroundColor: {
        control: "color",
        default: "#161b22",
        description: "Background color inside the terminal window.",
      },
      terminalBorderColor: {
        control: "color",
        default: "#1f2933",
        description: "Border color of the terminal window.",
      },
      promptColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the prompt symbol inside the command lines.",
      },
    },
  },
  {
    slug: "modern-ecommerce-hero",
    name: "Modern Ecommerce Hero",
    componentName: "ModernEcommerceHero",
    description: "Fashion-forward hero with background image overlay.",
    tags: ["hero", "ecommerce", "fashion"],
    props: {
      collectionLabel: {
        control: "text",
        default: "Summer Collection",
        description: "Small uppercase label above the main title.",
      },
      title: {
        control: "text",
        default: "Essentials",
        description: "Large serif title in the center of the hero.",
      },
      ctaLabel: {
        control: "text",
        default: "Shop Now",
        description: "Text inside the underline CTA button.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      showCollectionLabel: {
        control: "boolean",
        default: true,
        description: "Show or hide the uppercase collection label.",
      },
      overlayColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Overlay tint applied on top of the background image.",
      },
      overlayOpacity: {
        control: "slider",
        default: 70,
        min: 0,
        max: 100,
        description: "Opacity percentage for the overlay tint.",
      },
      titleColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for the main serif title.",
      },
      ctaColor: {
        control: "color",
        default: "#ffffff",
        description: "Text and underline color used for the CTA button.",
      },
    },
  },
  {
    slug: "app-showcase-hero",
    name: "App Showcase Hero",
    componentName: "AppShowcaseHero",
    description: "App marketing hero with mobile mockup and store buttons.",
    tags: ["hero", "app", "mobile"],
    props: {
      heading: {
        control: "text",
        default: "Your life, Organized.",
        description: "Main heading for the hero.",
      },
      highlightText: {
        control: "text",
        default: "Organized.",
        description: "Highlighted word inside the heading.",
      },
      description: {
        control: "text",
        default: "Download the #1 rated productivity app on the store.",
        description: "Supporting description below heading.",
      },
      primaryStoreLabel: {
        control: "text",
        default: "App Store",
        description: "Label for the primary store button.",
      },
      secondaryStoreLabel: {
        control: "text",
        default: "Play Store",
        description: "Label for the secondary store button.",
      },
      backgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color for the hero section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the primary heading.",
      },
      highlightColor: {
        control: "color",
        default: "#3b82f6",
        description: "Accent color used for the highlighted word.",
      },
      descriptionColor: {
        control: "color",
        default: "#9ca3af",
        description: "Body text color beneath the heading.",
      },
      showPhoneMockup: {
        control: "boolean",
        default: true,
        description: "Toggle to display the phone mockup on the right.",
      },
      primaryStoreBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color for the primary store badge.",
      },
      primaryStoreTextColor: {
        control: "color",
        default: "#000000",
        description: "Text/icon color for the primary store badge.",
      },
      secondaryStoreBorderColor: {
        control: "color",
        default: "#4b5563",
        description: "Border color for the secondary store button.",
      },
      secondaryStoreTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for the secondary store button.",
      },
      phoneAccentColor: {
        control: "color",
        default: "#1d4ed8",
        description: "Accent color used inside the phone mockup cards.",
      },
      phoneBorderColor: {
        control: "color",
        default: "#1f2937",
        description: "Border color surrounding the phone mockup.",
      },
    },
  },
  {
    slug: "email-capture-hero",
    name: "Email Capture Hero",
    componentName: "EmailCaptureHero",
    description: "Newsletter focused hero with email input and CTA.",
    tags: ["hero", "email", "newsletter"],
    props: {
      heading: {
        control: "text",
        default: "Join the newsletter",
        description: "Primary heading text.",
      },
      description: {
        control: "text",
        default: "Get weekly insights on design and engineering sent straight to your inbox.",
        description: "Supporting copy under the heading.",
      },
      placeholder: {
        control: "text",
        default: "you@example.com",
        description: "Placeholder text inside the email input.",
      },
      buttonLabel: {
        control: "text",
        default: "Subscribe",
        description: "Label for the submit button.",
      },
      helperText: {
        control: "text",
        default: "No spam, unsubscribe anytime.",
        description: "Small helper text below the form.",
      },
      backgroundColor: {
        control: "color",
        default: "#111827",
        description: "Background color of the hero.",
      },
      borderColor: {
        control: "color",
        default: "#1f2937",
        description: "Border color for the section divider.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the headline text.",
      },
      descriptionColor: {
        control: "color",
        default: "#9ca3af",
        description: "Color of the supporting paragraph text.",
      },
      inputBackgroundColor: {
        control: "color",
        default: "#1f2937",
        description: "Background color for the email input.",
      },
      inputBorderColor: {
        control: "color",
        default: "#374151",
        description: "Border color for the email input.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#4f46e5",
        description: "Background color for the submit button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color used inside the submit button.",
      },
      showHelperText: {
        control: "boolean",
        default: true,
        description: "Toggle to show or hide the helper text.",
      },
      helperTextColor: {
        control: "color",
        default: "#6b7280",
        description: "Color for the helper caption text.",
      },
      showMailIcon: {
        control: "boolean",
        default: true,
        description: "Show or hide the mail icon inside the input field.",
      },
    },
  },
  {
    slug: "video-background-hero",
    name: "Video Background Hero",
    componentName: "VideoBackgroundHero",
    description: "Hero with simulated video background and play button.",
    tags: ["hero", "video", "media"],
    props: {
      title: {
        control: "text",
        default: "Watch the Film",
        description: "Centered title text.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
        description: "Background image used for the video simulation.",
      },
      showPlayLabel: {
        control: "boolean",
        default: true,
        description: "Toggles the circular play button.",
        docType: "boolean",
      },
      overlayColor: {
        control: "color",
        default: "#000000",
        description: "Color of the overlay applied above the background image.",
      },
      overlayOpacity: {
        control: "slider",
        default: 40,
        min: 0,
        max: 100,
        description: "Opacity percentage for the overlay tint.",
      },
      titleColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the centered title.",
      },
      playButtonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color for the play button circle.",
      },
      playIconColor: {
        control: "color",
        default: "#000000",
        description: "Color of the play icon inside the button.",
      },
    },
  },
  {
    slug: "split-screen-hero",
    name: "Split Screen Hero",
    componentName: "SplitScreenHero",
    description: "Two-column personal hero with copy and portrait.",
    tags: ["hero", "portfolio", "split"],
    props: {
      heading: {
        control: "text",
        default: "Hi, I'm Alex.",
        description: "Primary headline in the left column.",
      },
      description: {
        control: "text",
        default: "I'm a digital product designer and frontend developer based in San Francisco. I build accessible, pixel-perfect user interfaces.",
        description: "Supporting description text.",
      },
      primaryLinkLabel: {
        control: "text",
        default: "Read Blog",
        description: "Label for the primary link.",
      },
      secondaryLinkLabel: {
        control: "text",
        default: "Contact Me",
        description: "Label for the secondary link.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        description: "Background image for the right column.",
      },
      leftBackgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color for the left content column.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color of the supporting description text.",
      },
      primaryLinkColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for the primary link.",
      },
      secondaryLinkColor: {
        control: "color",
        default: "#9ca3af",
        description: "Text color for the secondary link.",
      },
      showSecondaryLink: {
        control: "boolean",
        default: true,
        description: "Show or hide the secondary link.",
      },
      imageOverlayColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Overlay color applied on top of the right image.",
      },
      imageOverlayOpacity: {
        control: "slider",
        default: 30,
        min: 0,
        max: 100,
        description: "Opacity percentage for the image overlay tint.",
      },
    },
  },
  {
    slug: "web3-crypto-hero",
    name: "Web3 Crypto Hero",
    componentName: "Web3CryptoHero",
    description: "Gradient neon hero for DeFi or crypto projects.",
    tags: ["hero", "web3", "gradient"],
    props: {
      heading: {
        control: "text",
        default: "The Future of DeFi is Here",
        description: "Gradient text heading.",
      },
      description: {
        control: "text",
        default: "Trade, swap, and earn on the most secure decentralized exchange platform.",
        description: "Supporting description under the heading.",
      },
      buttonLabel: {
        control: "text",
        default: "Connect Wallet",
        description: "Label for the main CTA button.",
      },
      backgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color for the hero container.",
      },
      glowTopColor: {
        control: "color",
        default: "#2563eb",
        description: "Glow color for the top circular accent.",
      },
      glowBottomColor: {
        control: "color",
        default: "#8b5cf6",
        description: "Glow color for the bottom-right accent.",
      },
      headingGradientFrom: {
        control: "color",
        default: "#60a5fa",
        description: "Starting color for the heading gradient.",
      },
      headingGradientTo: {
        control: "color",
        default: "#c084fc",
        description: "Ending color for the heading gradient.",
      },
      buttonGradientFrom: {
        control: "color",
        default: "#2563eb",
        description: "Starting color for the CTA gradient button.",
      },
      buttonGradientTo: {
        control: "color",
        default: "#4c1d95",
        description: "Ending color for the CTA gradient button.",
      },
      showBitcoinIcon: {
        control: "boolean",
        default: true,
        description: "Show or hide the Bitcoin icon inside the CTA.",
      },
    },
  },
  {
    slug: "search-focused-hero",
    name: "Search Focused Hero",
    componentName: "SearchFocusedHero",
    description: "Travel search hero with pill-shaped input.",
    tags: ["hero", "search", "travel"],
    props: {
      heading: {
        control: "text",
        default: "Find your next stay",
        description: "Main heading text.",
      },
      placeholder: {
        control: "text",
        default: "Where are you going?",
        description: "Placeholder inside the search input.",
      },
      buttonLabel: {
        control: "text",
        default: "Search",
        description: "Text for the circular search button.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      overlayColor: {
        control: "color",
        default: "#000000",
        description: "Overlay color placed over the background image.",
      },
      overlayOpacity: {
        control: "slider",
        default: 30,
        min: 0,
        max: 100,
        description: "Opacity percentage for the overlay tint.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#0d0d0d",
        description: "Background color of the inner search card.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the hero heading.",
      },
      buttonColor: {
        control: "color",
        default: "#f43f5e",
        description: "Background color for the circular search button.",
      },
      buttonIconColor: {
        control: "color",
        default: "#ffffff",
        description: "Icon color for the search button.",
      },
      showLocationIcon: {
        control: "boolean",
        default: true,
        description: "Toggle to show or hide the location icon inside the input.",
      },
    },
  },
  {
    slug: "event-conference-hero",
    name: "Event Conference Hero",
    componentName: "EventConferenceHero",
    description: "Conference promo hero with date badge and CTA.",
    tags: ["hero", "event", "conference"],
    props: {
      badgeText: {
        control: "text",
        default: "OCT 24-26, 2024",
        description: "Text inside the rounded badge.",
      },
      title: {
        control: "text",
        default: "DesignConf'24",
        description: "Large uppercase title text.",
      },
      location: {
        control: "text",
        default: "San Francisco, CA • Moscone Center",
        description: "Subheading describing the event location.",
      },
      buttonLabel: {
        control: "text",
        default: "Get Tickets",
        description: "Label for the main CTA button.",
      },
      footnote: {
        control: "text",
        default: "Limited Early Bird pricing available.",
        description: "Small note under the CTA.",
      },
      backgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color for the hero container.",
      },
      badgeBackgroundColor: {
        control: "color",
        default: "#7c2d12",
        description: "Background color for the badge.",
      },
      badgeBorderColor: {
        control: "color",
        default: "#ea580c",
        description: "Border color for the badge.",
      },
      badgeTextColor: {
        control: "color",
        default: "#f97316",
        description: "Text color inside the badge.",
      },
      showBadge: {
        control: "boolean",
        default: true,
        description: "Toggle badge visibility.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color for the CTA button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#000000",
        description: "Text color for the CTA button.",
      },
      footnoteColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color for the footnote text.",
      },
    },
  },
  {
    slug: "social-proof-hero",
    name: "Social Proof Hero",
    componentName: "SocialProofHero",
    description: "Testimonial hero with avatars and star rating.",
    tags: ["hero", "testimonial", "social"],
    props: {
      heading: {
        control: "text",
        default: "Loved by designers",
        description: "Main heading text.",
      },
      quote: {
        control: "text",
        default: '"The best UI kit I\'ve ever used. It literally saved me weeks of development time."',
        description: "Quote displayed in the hero.",
      },
      ratingLabel: {
        control: "text",
        default: "5.0 Rating",
        description: "Text placed next to the star rating.",
      },
      backgroundColor: {
        control: "color",
        default: "#111827",
        description: "Background color of the hero.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      quoteColor: {
        control: "color",
        default: "#94a3b8",
        description: "Color of the quote text.",
      },
      showAvatarStack: {
        control: "boolean",
        default: true,
        description: "Show or hide the avatar stack above the heading.",
      },
      avatarAccentColor: {
        control: "color",
        default: "#1f2937",
        description: "Background color for the avatar placeholders.",
      },
      starColor: {
        control: "color",
        default: "#facc15",
        description: "Color of the rating stars.",
      },
      ratingLabelColor: {
        control: "color",
        default: "#e2e8f0",
        description: "Color of the rating label text.",
      },
    },
  },
  {
    slug: "modern-brutalist-hero",
    name: "Modern Brutalist Hero",
    componentName: "ModernBrutalistHero",
    description: "Bold brutalist hero with thick borders and typography.",
    tags: ["hero", "brutalist", "bold"],
    props: {
      badgeText: {
        control: "text",
        default: "New Drop",
        description: "Text inside the badge pill.",
      },
      titleLineOne: {
        control: "text",
        default: "Bold",
        description: "First line of the stacked heading.",
      },
      titleLineTwo: {
        control: "text",
        default: "Moves",
        description: "Second line of the stacked heading.",
      },
      titleLineThree: {
        control: "text",
        default: "Only.",
        description: "Third line of the stacked heading.",
      },
      collectionLabel: {
        control: "text",
        default: "Collection 001",
        description: "Label displayed in the footer row.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffde59",
        description: "Background color for the hero.",
      },
      borderColor: {
        control: "color",
        default: "#000000",
        description: "Color used for the thick borders.",
      },
      textColor: {
        control: "color",
        default: "#000000",
        description: "Color applied to the heading text.",
      },
      showBadge: {
        control: "boolean",
        default: true,
        description: "Toggle the badge visibility.",
      },
      indicatorColor: {
        control: "color",
        default: "#000000",
        description: "Color of the small indicator circle on the top right.",
      },
      arrowColor: {
        control: "color",
        default: "#000000",
        description: "Color of the arrow icon in the footer row.",
      },
      collectionLabelColor: {
        control: "color",
        default: "#000000",
        description: "Color for the collection label text.",
      },
    },
  },
  {
    slug: "podcast-media-hero",
    name: "Podcast / Media Hero",
    componentName: "PodcastMediaHero",
    description: "Podcast feature card with episode info and play CTA.",
    tags: ["hero", "podcast", "media"],
    props: {
      badgeText: {
        control: "text",
        default: "New Episode",
        description: "Small uppercase badge above the title.",
      },
      title: {
        control: "text",
        default: "The Future of AI Design",
        description: "Episode title text.",
      },
      description: {
        control: "text",
        default: "Hosted by Sarah Jenkins • 45 min",
        description: "Supporting text under the title.",
      },
      buttonLabel: {
        control: "text",
        default: "Play",
        description: "Label for the play button.",
      },
      coverImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=1000&auto=format&fit=crop",
        description: "Podcast cover image URL.",
      },
      backgroundColor: {
        control: "color",
        default: "#111827",
        description: "Background color of the card.",
      },
      borderColor: {
        control: "color",
        default: "#1f2937",
        description: "Border color of the card.",
      },
      badgeColor: {
        control: "color",
        default: "#818cf8",
        description: "Text color for the badge label.",
      },
      titleColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the title text.",
      },
      descriptionColor: {
        control: "color",
        default: "#9ca3af",
        description: "Color of the description text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the play button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#000000",
        description: "Text/icon color of the play button.",
      },
      showEqualizer: {
        control: "boolean",
        default: true,
        description: "Show or hide the equalizer bars.",
      },
      equalizerColor: {
        control: "color",
        default: "#374151",
        description: "Color of the equalizer bars.",
      },
      showMicBadge: {
        control: "boolean",
        default: true,
        description: "Toggle the floating mic badge on the cover image.",
      },
      micBadgeColor: {
        control: "color",
        default: "#4f46e5",
        description: "Background color for the mic badge.",
      },
    },
  },
  {
    slug: "gradient-mesh-hero",
    name: "Gradient Mesh Hero",
    componentName: "GradientMeshHero",
    description: "Minimal hero with gradient mesh background.",
    tags: ["hero", "gradient", "minimal"],
    props: {
      title: {
        control: "text",
        default: "Fluid.",
        description: "Large gradient heading text.",
      },
      subtitle: {
        control: "text",
        default: "Organic layouts for digital spaces.",
        description: "Supporting description below the heading.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Base background color for the hero.",
      },
      meshGradientFrom: {
        control: "color",
        default: "#ff0080",
        description: "Starting color for the mesh gradient.",
      },
      meshGradientTo: {
        control: "color",
        default: "#7928ca",
        description: "Ending color for the mesh gradient.",
      },
      titleGradientFrom: {
        control: "color",
        default: "#ec4899",
        description: "Starting color for the title gradient.",
      },
      titleGradientTo: {
        control: "color",
        default: "#8b5cf6",
        description: "Ending color for the title gradient.",
      },
      subtitleColor: {
        control: "color",
        default: "#1f2937",
        description: "Color of the subtitle text.",
      },
      showBlurOverlay: {
        control: "boolean",
        default: true,
        description: "Toggle the frosted glass overlay above the mesh.",
      },
    },
  },
  {
    slug: "feature-grid-background-hero",
    name: "Feature Grid Background Hero",
    componentName: "FeatureGridBackgroundHero",
    description: "Hero with grid icon background and centered copy.",
    tags: ["hero", "grid", "feature"],
    props: {
      heading: {
        control: "text",
        default: "Grid System Architecture",
        description: "Primary heading text.",
      },
      description: {
        control: "text",
        default: "Everything aligns perfectly. Built for scale and consistency across all your projects.",
        description: "Supporting description text.",
      },
      icon: {
        control: "select",
        default: "layout",
        description: "Icon displayed inside the gradient badge.",
        options: ["layout", "zap", "command"],
      },
      backgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color for the hero.",
      },
      iconBackgroundColor: {
        control: "color",
        default: "#4f46e5",
        description: "Background color for the central icon badge.",
      },
      iconColor: {
        control: "color",
        default: "#ffffff",
        description: "Color applied to the central icon.",
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
      showGridIcons: {
        control: "boolean",
        default: true,
        description: "Toggle the faint grid icon background.",
      },
      gridIconSymbol: {
        control: "select",
        default: "zap",
        description: "Icon used in the repeating grid background.",
        options: ["layout", "zap", "command"],
      },
      gridIconOpacity: {
        control: "slider",
        default: 3,
        min: 0,
        max: 100,
        description: "Opacity percentage for the grid icon background.",
      },
    },
  },
  {
    slug: "kinetic-type-hero",
    name: "Kinetic Typography Hero",
    componentName: "KineticTypeHero",
    description: "Animated text hero with kinetic typography rows.",
    tags: ["hero", "typography", "motion"],
    props: {
      lineOne: {
        control: "text",
        default: "Create Experience",
        description: "Text used in the first marquee line.",
      },
      lineTwo: {
        control: "text",
        default: "Innovate Design",
        description: "Text used in the second marquee line.",
      },
      lineThree: {
        control: "text",
        default: "Future Now",
        description: "Text used in the third marquee line.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the hero.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the solid text.",
      },
      textStrokeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the outlined text.",
      },
    },
  },
  {
    slug: "interactive-toggle-hero",
    name: "Interactive Toggle Hero",
    componentName: "InteractiveToggleHero",
    description: "Role-based hero that toggles between developer and designer messaging.",
    tags: ["hero", "toggle", "interactive"],
    props: {
      devHeading: {
        control: "text",
        default: "Ship clean code.",
        description: "Heading shown for the developer role.",
      },
      devDescription: {
        control: "text",
        default: "Our API is typed, documented, and ready for your CI/CD pipeline.",
        description: "Description for the developer role.",
      },
      designerHeading: {
        control: "text",
        default: "Design pixel perfection.",
        description: "Heading shown for the designer role.",
      },
      designerDescription: {
        control: "text",
        default: "A comprehensive UI kit compatible with Figma, Sketch, and Adobe XD.",
        description: "Description for the designer role.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the hero.",
      },
      toggleBackgroundColor: {
        control: "color",
        default: "#1f2937", // neutral-800
        description: "Background color of the toggle switch.",
      },
      activeToggleColor: {
        control: "color",
        default: "#3b82f6", // blue-500
        description: "Color of the active toggle state.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#9ca3af", // neutral-400
        description: "Color of the description text.",
      },
    },
  },
  {
    slug: "code-ide-hero",
    name: "Code IDE Hero",
    componentName: "CodeIdeHero",
    description: "VS Code inspired hero with numbered lines and command hint.",
    tags: ["hero", "developer", "code"],
    props: {
      fileName: {
        control: "text",
        default: "App.tsx",
        description: "File name displayed in the top toolbar.",
      },
      importLine: {
        control: "text",
        default: "import React from 'react';",
        description: "Import statement shown on the first line.",
      },
      commentLine: {
        control: "text",
        default: "<!-- Your next big idea starts here -->",
        description: "Inline comment displayed in the snippet.",
      },
      componentLine: {
        control: "text",
        default: "<LuminaApp version=\"2.0\" />",
        description: "Highlighted component line displayed near the end.",
      },
      backgroundColor: {
        control: "color",
        default: "#050505", // neutral-950
        description: "Background color of the hero section.",
      },
      editorBackgroundColor: {
        control: "color",
        default: "#1e1e1e", // VS Code default-ish
        description: "Background color of the code editor.",
      },
      fileNameColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the file name text.",
      },
      textColor: {
        control: "color",
        default: "#d4d4d8", // zinc-300
        description: "Default text color for code.",
      },
      accentColor: {
        control: "color",
        default: "#60a5fa", // blue-400
        description: "Color for keywords/accents in code.",
      },
    },
  },
  {
    slug: "vertical-split-hero",
    name: "Vertical Columns Hero",
    componentName: "VerticalSplitHero",
    description: "Three-column editorial hero with centered CTA.",
    tags: ["hero", "editorial", "grid"],
    props: {
      collectionLabel: {
        control: "text",
        default: "Collection",
        description: "Uppercase label displayed above the title.",
      },
      title: {
        control: "text",
        default: "Noir",
        description: "Central serif title text.",
      },
      buttonLabel: {
        control: "text",
        default: "View Lookbook",
        description: "Label for the bordered button.",
      },
      leftImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL for the left column.",
      },
      rightImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1550614000-4b9519e02a29?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL for the right column.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the center column.",
      },
      titleColor: {
        control: "color",
        default: "#000000",
        description: "Color of the title text.",
      },
      collectionLabelColor: {
        control: "color",
        default: "#737373", // neutral-500
        description: "Color of the collection label.",
      },
      buttonColor: {
        control: "color",
        default: "#000000",
        description: "Text color of the button.",
      },
      buttonBorderColor: {
        control: "color",
        default: "#e5e5e5", // neutral-200
        description: "Border color of the button.",
      },
    },
  },
  {
    slug: "cyberpunk-glitch-hero",
    name: "Cyberpunk Glitch Hero",
    componentName: "CyberpunkGlitchHero",
    description: "Glitchy neon hero with monospace typography and CTA.",
    tags: ["hero", "cyberpunk", "glitch"],
    props: {
      headline: {
        control: "text",
        default: "SYSTEM_BREACH",
        description: "Primary glitch heading text.",
      },
      subheading: {
        control: "text",
        default: "Access Granted /// User: Admin",
        description: "Small uppercase status text.",
      },
      buttonLabel: {
        control: "text",
        default: "Enter Matrix",
        description: "Label for the CTA button.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the hero section.",
      },
      headlineColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the headline text.",
      },
      subheadingColor: {
        control: "color",
        default: "#22c55e", // green-500
        description: "Color of the subheading text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ef4444", // red-500
        description: "Background color of the button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#000000",
        description: "Text color of the button.",
      },
      glitchColor1: {
        control: "color",
        default: "#ef4444", // red-500
        description: "First glitch effect color.",
      },
      glitchColor2: {
        control: "color",
        default: "#3b82f6", // blue-500
        description: "Second glitch effect color.",
      },
    },
  },
  {
    slug: "minimal-data-hero",
    name: "Minimal Data Hero",
    componentName: "MinimalDataHero",
    description: "Monospace hero with stats, references, and data rows.",
    tags: ["hero", "data", "minimal"],
    props: {
      referenceCode: {
        control: "text",
        default: "REF: 004921",
        description: "Reference text shown on the top left.",
      },
      statusText: {
        control: "text",
        default: "STATUS: OPTIMAL",
        description: "Status text shown on the top right.",
      },
      lineOne: {
        control: "text",
        default: "RAW DATA",
        description: "First line of the stacked heading.",
      },
      lineTwo: {
        control: "text",
        default: "PROCESSED",
        description: "Second line of the stacked heading.",
      },
      lineThree: {
        control: "text",
        default: "INSTANTLY.",
        description: "Third line of the stacked heading.",
      },
      speedValue: {
        control: "text",
        default: "940ms",
        description: "Speed stat displayed in the bottom grid.",
      },
      uptimeValue: {
        control: "text",
        default: "99.99%",
        description: "Uptime stat displayed in the bottom grid.",
      },
      nodesValue: {
        control: "text",
        default: "142",
        description: "Nodes stat displayed in the bottom grid.",
      },
      backgroundColor: {
        control: "color",
        default: "#f5f5f5", // neutral-100
        description: "Background color of the hero.",
      },
      textColor: {
        control: "color",
        default: "#171717", // neutral-900
        description: "Color of all text elements.",
      },
      accentColor: {
        control: "color",
        default: "#ef4444", // red-500
        description: "Color of the status indicator dot.",
      },
    },
  },
  {
    slug: "restaurant-luxury-hero",
    name: "Restaurant Luxury Hero",
    componentName: "RestaurantLuxuryHero",
    description: "Serif restaurant hero with layered borders and CTA.",
    tags: ["hero", "restaurant", "luxury"],
    props: {
      establishedText: {
        control: "text",
        default: "Est. 1994",
        description: "Italic text displayed above the name.",
      },
      restaurantName: {
        control: "text",
        default: "Le Meridian",
        description: "Main restaurant name.",
      },
      tagline: {
        control: "text",
        default: "Experience the taste of modern Paris.",
        description: "Supporting description under the title.",
      },
      buttonLabel: {
        control: "text",
        default: "Reservations",
        description: "Label for the CTA button.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      overlayColor: {
        control: "color",
        default: "#000000",
        description: "Color of the overlay tint.",
      },
      overlayOpacity: {
        control: "slider",
        default: 40,
        min: 0,
        max: 100,
        description: "Opacity of the background overlay (0-100).",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the text elements.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the reservation button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#000000",
        description: "Text color of the reservation button.",
      },
    },
  },
  {
    slug: "real-estate-hero",
    name: "Real Estate Hero",
    componentName: "RealEstateHero",
    description: "Property search hero with layered form inputs.",
    tags: ["hero", "real-estate", "form"],
    props: {
      heading: {
        control: "text",
        default: "Find your sanctuary",
        description: "Primary heading text.",
      },
      locationPlaceholder: {
        control: "text",
        default: "Location",
        description: "Placeholder for the location input.",
      },
      propertyTypeLabel: {
        control: "text",
        default: "Property Type",
        description: "Label for the property type select.",
      },
      buttonLabel: {
        control: "text",
        default: "Search",
        description: "Label for the CTA button.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1600596542815-6ad4c727dd2d?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the main heading.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the search form card.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the search button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the search button.",
      },
    },
  },
  {
    slug: "course-creator-hero",
    name: "Course Creator Hero",
    componentName: "CourseCreatorHero",
    description: "Course promo hero with instructor highlight and curriculum list.",
    tags: ["hero", "course", "education"],
    props: {
      badgeText: {
        control: "text",
        default: "Masterclass",
        description: "Small badge text above the heading.",
      },
      heading: {
        control: "text",
        default: "Advanced React Patterns & Performance",
        description: "Primary course title.",
      },
      description: {
        control: "text",
        default: "Learn to build scalable, high-performance web applications from a Senior Engineer.",
        description: "Supporting description text.",
      },
      instructorName: {
        control: "text",
        default: "David Miller",
        description: "Instructor name shown next to the avatar.",
      },
      instructorTitle: {
        control: "text",
        default: "Ex-Netflix Engineer",
        description: "Instructor subtitle below the name.",
      },
      priceLabel: {
        control: "text",
        default: "Enroll for $99",
        description: "Label for the CTA button.",
      },
      backgroundColor: {
        control: "color",
        default: "#18181b", // zinc-950
        description: "Background color of the hero.",
      },
      badgeBackgroundColor: {
        control: "color",
        default: "#3f3f46", // zinc-700
        description: "Background color of the badge.",
      },
      badgeTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the badge.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the primary heading.",
      },
      descriptionColor: {
        control: "color",
        default: "#a1a1aa", // zinc-400
        description: "Color of the description text.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the enroll button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#000000",
        description: "Text color of the enroll button.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#27272a", // zinc-800
        description: "Background color of the curriculum card.",
      },
      cardBorderColor: {
        control: "color",
        default: "#3f3f46", // zinc-700
        description: "Border color of the curriculum card.",
      },
    },
  },
  {
    slug: "newsletter-stack-hero",
    name: "Newsletter Stack Hero",
    componentName: "NewsletterStackHero",
    description: "Stacked newsletter cards with CTA and issue highlight.",
    tags: ["hero", "newsletter", "editorial"],
    props: {
      title: {
        control: "text",
        default: "The Sunday Digest",
        description: "Primary heading text.",
      },
      subtitle: {
        control: "text",
        default: "Thoughtful essays on technology and culture.",
        description: "Supporting description text.",
      },
      issueTitle: {
        control: "text",
        default: "The Age of Artificial Creativity",
        description: "Issue title displayed on the top card.",
      },
      issueDescription: {
        control: "text",
        default: "Read the latest thoughts on generative art...",
        description: "Issue description below the title.",
      },
      buttonLabel: {
        control: "text",
        default: "Read",
        description: "Label for the CTA button.",
      },
      backgroundColor: {
        control: "color",
        default: "#f4f4f5", // zinc-100
        description: "Background color of the hero section.",
      },
      titleColor: {
        control: "color",
        default: "#18181b", // zinc-950
        description: "Color of the main title.",
      },
      subtitleColor: {
        control: "color",
        default: "#71717a", // zinc-500
        description: "Color of the subtitle.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the newsletter cards.",
      },
      cardBorderColor: {
        control: "color",
        default: "#e4e4e7", // zinc-200
        description: "Border color of the newsletter cards.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#18181b", // zinc-950
        description: "Background color of the read button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the read button.",
      },
    },
  },
  {
    slug: "mobile-fan-hero",
    name: "Mobile Fan Hero",
    componentName: "MobileFanHero",
    description: "Layered phone hero with vibrant gradient background.",
    tags: ["hero", "mobile", "app"],
    props: {
      heading: {
        control: "text",
        default: "Manage Everything.",
        description: "Primary heading text.",
      },
      subheading: {
        control: "text",
        default: "One app for all your finances.",
        description: "Supporting description text.",
      },
      backgroundColor: {
        control: "color",
        default: "#8b5cf6", // violet-500
        description: "Background color theme for the hero.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      subheadingColor: {
        control: "color",
        default: "#e9d5ff", // violet-200
        description: "Color of the subheading text.",
      },
    },
  },
  {
    slug: "nonprofit-hero",
    name: "Nonprofit Impact Hero",
    componentName: "NonprofitHero",
    description: "Split hero encouraging donations with progress indicator.",
    tags: ["hero", "nonprofit", "impact"],
    props: {
      heading: {
        control: "text",
        default: "Help us plant 1 million trees.",
        description: "Primary heading text.",
      },
      description: {
        control: "text",
        default: "Your donation directly contributes to reforestation efforts in the Amazon.",
        description: "Supporting description text.",
      },
      progressLabel: {
        control: "text",
        default: "$840,200 raised",
        description: "Raised amount label.",
      },
      progressPercent: {
        control: "text",
        default: "84%",
        description: "Percentage label shown next to the raised text.",
      },
      buttonLabel: {
        control: "text",
        default: "Donate Now",
        description: "CTA button label.",
      },
      backgroundColor: {
        control: "color",
        default: "#022c22", // emerald-950
        description: "Background color of the hero section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#a7f3d0", // emerald-200
        description: "Color of the description text.",
      },
      progressColor: {
        control: "color",
        default: "#34d399", // emerald-400
        description: "Color of the progress bar and label.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the donate button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#064e3b", // emerald-900
        description: "Text color of the donate button.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
        description: "URL of the right-side background image.",
      },
    },
  },
  {
    slug: "travel-search-hero",
    name: "Travel Search Hero",
    componentName: "TravelSearchHero",
    description: "Travel hero with glass pill inputs for destination and dates.",
    tags: ["hero", "travel", "search"],
    props: {
      heading: {
        control: "text",
        default: "Explore the world",
        description: "Primary heading text.",
      },
      destinationLabel: {
        control: "text",
        default: "Kyoto, Japan",
        description: "Destination text displayed inside the pill.",
      },
      dateLabel: {
        control: "text",
        default: "Oct 24 - Nov 02",
        description: "Dates text displayed inside the pill.",
      },
      buttonLabel: {
        control: "text",
        default: "Search",
        description: "Label for the CTA button.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff", // white/90
        description: "Background color of the search inputs.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the search button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the search button.",
      },
    },
  },
  {
    slug: "agency-reel-hero",
    name: "Agency Reel Hero",
    componentName: "AgencyReelHero",
    description: "Video showcase hero with CTA overlay and caption.",
    tags: ["hero", "agency", "video"],
    props: {
      heading: {
        control: "text",
        default: "We craft digital experiences that define brands.",
        description: "Primary heading text.",
      },
      reelTitle: {
        control: "text",
        default: "Showreel 2024",
        description: "Caption title displayed on the video.",
      },
      reelDuration: {
        control: "text",
        default: "01:45",
        description: "Caption duration text under the reel title.",
      },
      backgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
        description: "Background image URL.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the hero section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the main heading.",
      },
      overlayOpacity: {
        control: "slider",
        default: 60,
        min: 0,
        max: 100,
        description: "Opacity of the video overlay (0-100).",
      },
    },
  },
  {
    slug: "review-focused-hero",
    name: "Review Focused Hero",
    componentName: "ReviewFocusedHero",
    description: "Quote driven hero with avatar and supporting logos.",
    tags: ["hero", "review", "quote"],
    props: {
      quote: {
        control: "text",
        default:
          '"Lumina completely transformed how we build products. The attention to detail is unmatched in the industry."',
        description: "Quote text displayed in the hero.",
      },
      authorName: {
        control: "text",
        default: "Marcus Chen",
        description: "Name of the quoted person.",
      },
      authorTitle: {
        control: "text",
        default: "CTO at TechFlow",
        description: "Title of the quoted person.",
      },
      backgroundColor: {
        control: "color",
        default: "#f0f9ff", // sky-50
        description: "Background color of the hero section.",
      },
      quoteColor: {
        control: "color",
        default: "#0c4a6e", // sky-900
        description: "Color of the quote text.",
      },
      authorNameColor: {
        control: "color",
        default: "#0369a1", // sky-700
        description: "Color of the author name.",
      },
      authorTitleColor: {
        control: "color",
        default: "#38bdf8", // sky-400
        description: "Color of the author title.",
      },
      accentColor: {
        control: "color",
        default: "#bae6fd", // sky-200
        description: "Color of the quote icon and avatar background.",
      },
    },
  },
  {
    slug: "waitlist-viral-hero",
    name: "Waitlist Viral Hero",
    componentName: "WaitlistViralHero",
    description: "Waitlist hero with badge, form, and live count.",
    tags: ["hero", "waitlist", "startup"],
    props: {
      badgeText: {
        control: "text",
        default: "Private Beta Access",
        description: "Text displayed inside the pill badge.",
      },
      heading: {
        control: "text",
        default: "Get early access",
        description: "Primary heading text.",
      },
      subheading: {
        control: "text",
        default: "Join the waitlist and get 3 months free.",
        description: "Supporting description text.",
      },
      buttonLabel: {
        control: "text",
        default: "Join",
        description: "Label for the form submit button.",
      },
      peopleAheadText: {
        control: "text",
        default: "14,203",
        description: "Number displayed inside the helper text.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717", // neutral-900
        description: "Background color of the hero section.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      subheadingColor: {
        control: "color",
        default: "#a3a3a3", // neutral-400
        description: "Color of the subheading text.",
      },
      badgeGradientFrom: {
        control: "color",
        default: "#ec4899", // pink-500
        description: "Start color of the badge gradient.",
      },
      badgeGradientTo: {
        control: "color",
        default: "#8b5cf6", // violet-500
        description: "End color of the badge gradient.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the join button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#000000",
        description: "Text color of the join button.",
      },
    },
  },
  {
    slug: "gradient-border-hero",
    name: "Gradient Border Hero",
    componentName: "GradientBorderHero",
    description: "Conic gradient hero highlighting compliance badges.",
    tags: ["hero", "gradient", "security"],
    props: {
      heading: {
        control: "text",
        default: "Secure by Design",
        description: "Primary heading text.",
      },
      description: {
        control: "text",
        default: "Enterprise-grade security built into every component.",
        description: "Supporting description text.",
      },
      badgeOne: {
        control: "text",
        default: "SOC2 Compliant",
        description: "First compliance badge text.",
      },
      badgeTwo: {
        control: "text",
        default: "PCI DSS",
        description: "Second compliance badge text.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a", // neutral-950
        description: "Background color of the hero section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#171717", // neutral-900
        description: "Background color of the inner card.",
      },
      headingColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the heading text.",
      },
      descriptionColor: {
        control: "color",
        default: "#a3a3a3", // neutral-400
        description: "Color of the description text.",
      },
      gradientColor: {
        control: "color",
        default: "#6366f1", // indigo-500
        description: "Color of the rotating gradient border.",
      },
      badgeColor: {
        control: "color",
        default: "#818cf8", // indigo-400
        description: "Color of the badges.",
      },
    },
  },
  {
    slug: "bento-grid-hero",
    name: "Bento Grid Hero",
    componentName: "BentoGridHero",
    description: "Bento style hero grid combining imagery, stats, and CTAs.",
    tags: ["hero", "bento", "grid"],
    props: {
      titleLeft: {
        control: "text",
        default: "Design",
        description: "First line of the stacked title.",
      },
      titleRight: {
        control: "text",
        default: "Engineering",
        description: "Second line of the stacked title.",
      },
      statValue: {
        control: "text",
        default: "99%",
        description: "Stat value displayed in the white card.",
      },
      statLabel: {
        control: "text",
        default: "Satisfaction",
        description: "Label displayed below the stat value.",
      },
      ctaLabel: {
        control: "text",
        default: "Start your project",
        description: "Text displayed in the bottom CTA card.",
      },
      backgroundColor: {
        control: "color",
        default: "#f5f5f5", // neutral-100
        description: "Background color of the hero section.",
      },
      cardOneBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the first card (black).",
      },
      cardTwoBackgroundImage: {
        control: "text",
        default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        description: "Background image of the second card.",
      },
      cardThreeBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the third card (white).",
      },
      cardFourBackgroundColor: {
        control: "color",
        default: "#4f46e5", // indigo-600
        description: "Background color of the fourth card (indigo).",
      },
      titleColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the main title text.",
      },
      secondaryTitleColor: {
        control: "color",
        default: "#737373", // neutral-500
        description: "Color of the secondary title text.",
      },
    },
  },
  {
    slug: "comparison-hero",
    name: "Comparison Hero",
    componentName: "ComparisonHero",
    description: "Side-by-side hero comparing your product to competitors.",
    tags: ["hero", "comparison", "product"],
    props: {
      heading: {
        control: "text",
        default: "Why switch to Lumina?",
        description: "Primary heading text.",
      },
      themPointOne: {
        control: "text",
        default: "Limited Accessibility",
        description: "First competitor drawback.",
      },
      themPointTwo: {
        control: "text",
        default: "Hard to customize",
        description: "Second competitor drawback.",
      },
      themPointThree: {
        control: "text",
        default: "No dark mode",
        description: "Third competitor drawback.",
      },
      usPointOne: {
        control: "text",
        default: "WCAG 2.1 AA Compliant",
        description: "First benefit for your product.",
      },
      usPointTwo: {
        control: "text",
        default: "Tailwind primitives",
        description: "Second benefit for your product.",
      },
      usPointThree: {
        control: "text",
        default: "Dark mode native",
        description: "Third benefit for your product.",
      },
      backgroundColor: {
        control: "color",
        default: "#f9fafb", // neutral-50
        description: "Background color of the hero section.",
      },
      headingColor: {
        control: "color",
        default: "#171717", // neutral-900
        description: "Color of the heading text.",
      },
      themBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the competitor card.",
      },
      usBackgroundColor: {
        control: "color",
        default: "#eef2ff", // indigo-50/50
        description: "Background color of your product card.",
      },
    },
  },
]

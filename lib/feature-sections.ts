export type FeaturePropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"

export interface FeaturePropDefinition {
  control: FeaturePropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface FeatureSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, FeaturePropDefinition>
}

export const featureSections: FeatureSectionMeta[] = [
  {
    slug: "bento-grid-features",
    name: "Bento Grid Features",
    componentName: "BentoGridFeatures",
    description: "A modern bento grid layout showcasing multiple features with varying sizes.",
    tags: ["feature", "grid", "bento", "dark", "card", "icon", "analytics", "security"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Everything you need",
        description: "Main section heading.",
      },
      sectionSubtitle: {
        control: "text",
        default: "Packed with features for your next big idea.",
        description: "Supporting text below the heading.",
      },
      mainFeatureTitle: {
        control: "text",
        default: "Advanced Analytics",
        description: "Title for the large feature block.",
      },
      mainFeatureDescription: {
        control: "text",
        default: "Get deep insights into user behavior with our real-time tracking dashboard.",
        description: "Description for the large feature block.",
      },
      feature1Title: {
        control: "text",
        default: "Bank-grade Security",
        description: "Title for the first small feature.",
      },
      feature1Description: {
        control: "text",
        default: "AES-256 encryption for all your data at rest.",
        description: "Description for the first small feature.",
      },
      feature2Title: {
        control: "text",
        default: "Lightning Fast",
        description: "Title for the second small feature.",
      },
      feature2Description: {
        control: "text",
        default: "Edge network deployment for 12ms latency.",
        description: "Description for the second small feature.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the feature cards.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for icons and highlights.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Secondary/muted text color.",
      },
    },
  },
  {
    slug: "alternating-side-by-side-features",
    name: "Alternating Side-by-Side Features",
    componentName: "AlternatingSideBySideFeatures",
    description: "Features displayed in alternating left-right layout with images.",
    tags: ["feature", "alternating", "light", "enterprise", "image", "badge", "list", "code"],
    props: {
      feature1Badge: {
        control: "text",
        default: "Global Scale",
        description: "Badge text for the first feature.",
      },
      feature1Title: {
        control: "text",
        default: "Deploy to the edge in seconds.",
        description: "Title for the first feature.",
      },
      feature1Description: {
        control: "text",
        default: "Our global CDN ensures your content is delivered from the server closest to your users, reducing latency and improving experience.",
        description: "Description for the first feature.",
      },
      feature1Check1: {
        control: "text",
        default: "35+ Data Centers",
        description: "First checklist item for feature 1.",
      },
      feature1Check2: {
        control: "text",
        default: "99.99% Uptime SLA",
        description: "Second checklist item for feature 1.",
      },
      feature2Badge: {
        control: "text",
        default: "Developer First",
        description: "Badge text for the second feature.",
      },
      feature2Title: {
        control: "text",
        default: "Powerful API for total control.",
        description: "Title for the second feature.",
      },
      feature2Description: {
        control: "text",
        default: "Automate your workflow with our comprehensive API. Typed SDKs available for TS, Python, and Go.",
        description: "Description for the second feature.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#525252",
        description: "Secondary/muted text color.",
      },
      accentColor: {
        control: "color",
        default: "#3b82f6",
        description: "Accent color for badges and icons.",
      },
    },
  },
  {
    slug: "three-column-cards-features",
    name: "Three Column Cards Features",
    componentName: "ThreeColumnCardsFeatures",
    description: "Clean three-column card grid for showcasing multiple features.",
    tags: ["feature", "cards", "grid", "light", "icon", "three-column", "centered"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Designed for modern teams",
        description: "Main section heading.",
      },
      showAllCards: {
        control: "boolean",
        default: true,
        description: "Show all 6 feature cards.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the cards.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#737373",
        description: "Secondary/muted text color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for icons.",
      },
    },
  },
  {
    slug: "interactive-tabs-features",
    name: "Interactive Tabs Features",
    componentName: "InteractiveTabsFeatures",
    description: "Tab-based feature showcase with animated content switching.",
    tags: ["feature", "tabs", "interactive", "dark", "button", "icon", "workflow"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Workflow",
        description: "Main section heading.",
      },
      tab1Title: {
        control: "text",
        default: "Design",
        description: "Title for the first tab.",
      },
      tab1Content: {
        control: "text",
        default: "Drag and drop interface builder.",
        description: "Content for the first tab.",
      },
      tab2Title: {
        control: "text",
        default: "Code",
        description: "Title for the second tab.",
      },
      tab2Content: {
        control: "text",
        default: "Export clean React code instantly.",
        description: "Content for the second tab.",
      },
      tab3Title: {
        control: "text",
        default: "Deploy",
        description: "Title for the third tab.",
      },
      tab3Content: {
        control: "text",
        default: "Push to production with one click.",
        description: "Content for the third tab.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#737373",
        description: "Secondary/muted text color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for active states.",
      },
    },
  },
  {
    slug: "hover-cards-features",
    name: "Hover Cards Features",
    componentName: "HoverCardsFeatures",
    description: "Interactive cards with hover effects revealing additional content.",
    tags: ["feature", "cards", "hover", "dark", "animation", "tech", "stack"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Core Technologies",
        description: "Main section heading.",
      },
      tech1: {
        control: "text",
        default: "React",
        description: "First technology name.",
      },
      tech2: {
        control: "text",
        default: "TypeScript",
        description: "Second technology name.",
      },
      tech3: {
        control: "text",
        default: "Tailwind",
        description: "Third technology name.",
      },
      tech4: {
        control: "text",
        default: "Next.js",
        description: "Fourth technology name.",
      },
      hoverDescription: {
        control: "text",
        default: "Built for the modern web stack.",
        description: "Description shown on hover.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the cards.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      accentColor: {
        control: "color",
        default: "#4f46e5",
        description: "Accent color for hover effects.",
      },
    },
  },
  {
    slug: "code-preview-features",
    name: "Code Preview Features",
    componentName: "CodePreviewFeatures",
    description: "Developer-focused section with code snippet preview.",
    tags: ["feature", "code", "developer", "dark", "syntax", "check", "responsive"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Built for Developers",
        description: "Main section heading.",
      },
      sectionDescription: {
        control: "text",
        default: "Our components are built with the best practices in mind. Accessible, responsive, and easy to customize using Tailwind CSS utility classes.",
        description: "Supporting description text.",
      },
      feature1: {
        control: "text",
        default: "Copy and paste ready",
        description: "First feature bullet point.",
      },
      feature2: {
        control: "text",
        default: "Fully responsive",
        description: "Second feature bullet point.",
      },
      backgroundColor: {
        control: "color",
        default: "#0f172a",
        description: "Background color of the section.",
      },
      codeBlockBackground: {
        control: "color",
        default: "#1e293b",
        description: "Background color of the code block.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#94a3b8",
        description: "Secondary/muted text color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for icons.",
      },
    },
  },
  {
    slug: "minimal-list-features",
    name: "Minimal List Features",
    componentName: "MinimalListFeatures",
    description: "Clean minimal list layout for specifications or features.",
    tags: ["feature", "list", "minimal", "light", "specs", "table", "clean"],
    props: {
      sectionLabel: {
        control: "text",
        default: "Specifications",
        description: "Small label above the list.",
      },
      item1Label: {
        control: "text",
        default: "Architecture",
        description: "Label for the first item.",
      },
      item1Value: {
        control: "text",
        default: "Serverless Edge",
        description: "Value for the first item.",
      },
      item2Label: {
        control: "text",
        default: "Database",
        description: "Label for the second item.",
      },
      item2Value: {
        control: "text",
        default: "Distributed SQL",
        description: "Value for the second item.",
      },
      item3Label: {
        control: "text",
        default: "Latency",
        description: "Label for the third item.",
      },
      item3Value: {
        control: "text",
        default: "< 50ms Global",
        description: "Value for the third item.",
      },
      item4Label: {
        control: "text",
        default: "Compliance",
        description: "Label for the fourth item.",
      },
      item4Value: {
        control: "text",
        default: "SOC2 Type II",
        description: "Value for the fourth item.",
      },
      item5Label: {
        control: "text",
        default: "Support",
        description: "Label for the fifth item.",
      },
      item5Value: {
        control: "text",
        default: "24/7 Dedicated",
        description: "Value for the fifth item.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#737373",
        description: "Secondary/muted text color.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color for dividers.",
      },
    },
  },
  {
    slug: "large-image-focus-features",
    name: "Large Image Focus Features",
    componentName: "LargeImageFocusFeatures",
    description: "Feature section with a large hero image and overlay text.",
    tags: ["feature", "image", "hero", "dark", "large", "gradient", "visual"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Immersive Details",
        description: "Main section heading.",
      },
      featureTitle: {
        control: "text",
        default: "4K Resolution Support",
        description: "Title displayed on the image overlay.",
      },
      featureDescription: {
        control: "text",
        default: "Experience content like never before with ultra-high definition support across all devices.",
        description: "Description displayed on the image overlay.",
      },
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        description: "URL for the background image.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      overlayColor: {
        control: "color",
        default: "#000000",
        description: "Color of the image overlay.",
      },
    },
  },
  {
    slug: "icon-grid-features",
    name: "Icon Grid Features",
    componentName: "IconGridFeatures",
    description: "Grid of integration icons or app logos.",
    tags: ["feature", "grid", "icons", "integrations", "light", "apps", "logo", "hover"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Integrations",
        description: "Main section heading.",
      },
      itemCount: {
        control: "slider",
        default: 12,
        min: 4,
        max: 24,
        description: "Number of integration items to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#fafafa",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the icon cards.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#737373",
        description: "Secondary/muted text color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for hover states.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color for cards.",
      },
    },
  },
  {
    slug: "timeline-steps-features",
    name: "Timeline Steps Features",
    componentName: "TimelineStepsFeatures",
    description: "Vertical timeline showing process steps or workflow.",
    tags: ["feature", "timeline", "steps", "light", "process", "numbered", "vertical"],
    props: {
      sectionTitle: {
        control: "text",
        default: "How it works",
        description: "Main section heading.",
      },
      step1Title: {
        control: "text",
        default: "Connect Data",
        description: "Title for step 1.",
      },
      step1Description: {
        control: "text",
        default: "Link your existing database in one click.",
        description: "Description for step 1.",
      },
      step2Title: {
        control: "text",
        default: "Build Interface",
        description: "Title for step 2.",
      },
      step2Description: {
        control: "text",
        default: "Drag and drop components to build your app.",
        description: "Description for step 2.",
      },
      step3Title: {
        control: "text",
        default: "Launch",
        description: "Title for step 3.",
      },
      step3Description: {
        control: "text",
        default: "Share with your team instantly.",
        description: "Description for step 3.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#737373",
        description: "Secondary/muted text color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for timeline markers.",
      },
      lineColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Color of the timeline line.",
      },
    },
  },
  {
    slug: "accordion-list-features",
    name: "Accordion List Features",
    componentName: "AccordionListFeatures",
    description: "FAQ-style accordion with expandable items.",
    tags: ["feature", "accordion", "faq", "dark", "collapsible", "question", "support"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Frequently Asked",
        description: "Main section heading.",
      },
      sectionDescription: {
        control: "text",
        default: "Everything you need to know about the product details and licensing.",
        description: "Supporting description text.",
      },
      question1: {
        control: "text",
        default: "Is this free to use?",
        description: "First question.",
      },
      answer1: {
        control: "text",
        default: "Yes, for personal projects. Commercial licenses are available.",
        description: "Answer to the first question.",
      },
      question2: {
        control: "text",
        default: "Can I use with Next.js?",
        description: "Second question.",
      },
      answer2: {
        control: "text",
        default: "Absolutely. It is optimized for the React ecosystem including Next.js and Remix.",
        description: "Answer to the second question.",
      },
      question3: {
        control: "text",
        default: "Do you offer support?",
        description: "Third question.",
      },
      answer3: {
        control: "text",
        default: "We have a dedicated discord community and email support for premium members.",
        description: "Answer to the third question.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of accordion items.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Secondary/muted text color.",
      },
      borderColor: {
        control: "color",
        default: "#262626",
        description: "Border color for accordion items.",
      },
    },
  },
  {
    slug: "stats-focus-features",
    name: "Stats Focus Features",
    componentName: "StatsFocusFeatures",
    description: "Bold statistics display with large numbers.",
    tags: ["feature", "stats", "numbers", "colorful", "metrics", "counter", "gradient"],
    props: {
      stat1Value: {
        control: "text",
        default: "2.4M+",
        description: "Value for the first statistic.",
      },
      stat1Label: {
        control: "text",
        default: "Daily Active Users",
        description: "Label for the first statistic.",
      },
      stat2Value: {
        control: "text",
        default: "99.9%",
        description: "Value for the second statistic.",
      },
      stat2Label: {
        control: "text",
        default: "Uptime Guaranteed",
        description: "Label for the second statistic.",
      },
      stat3Value: {
        control: "text",
        default: "150+",
        description: "Value for the third statistic.",
      },
      stat3Label: {
        control: "text",
        default: "Countries Served",
        description: "Label for the third statistic.",
      },
      backgroundColor: {
        control: "color",
        default: "#4f46e5",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#c7d2fe",
        description: "Secondary/muted text color.",
      },
      dividerColor: {
        control: "color",
        default: "#6366f1",
        description: "Color of the dividers.",
      },
    },
  },
  {
    slug: "masonry-grid-features",
    name: "Masonry Grid Features",
    componentName: "MasonryGridFeatures",
    description: "Pinterest-style masonry grid layout for features.",
    tags: ["feature", "masonry", "grid", "light", "colorful", "card", "random", "creative"],
    props: {
      item1Title: {
        control: "text",
        default: "Design",
        description: "Title for the first item.",
      },
      item2Title: {
        control: "text",
        default: "Code",
        description: "Title for the second item.",
      },
      item3Title: {
        control: "text",
        default: "Ship",
        description: "Title for the third item.",
      },
      item4Title: {
        control: "text",
        default: "Market",
        description: "Title for the fourth item.",
      },
      item5Title: {
        control: "text",
        default: "Scale",
        description: "Title for the fifth item.",
      },
      item6Title: {
        control: "text",
        default: "Profit",
        description: "Title for the sixth item.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
    },
  },
  {
    slug: "glassmorphism-features",
    name: "Glassmorphism Features",
    componentName: "GlassmorphismFeatures",
    description: "Frosted glass effect cards over a gradient background.",
    tags: ["feature", "glass", "blur", "modern", "glassmorphism", "card", "icon", "gradient"],
    props: {
      feature1Title: {
        control: "text",
        default: "Powerful Engine",
        description: "Title for the first feature.",
      },
      feature1Description: {
        control: "text",
        default: "Harness the power of WebGL for stunning visualizations.",
        description: "Description for the first feature.",
      },
      feature2Title: {
        control: "text",
        default: "Layered Architecture",
        description: "Title for the second feature.",
      },
      feature2Description: {
        control: "text",
        default: "Modular design allowing for infinite scalability.",
        description: "Description for the second feature.",
      },
      backgroundImageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop",
        description: "URL for the background image.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the glass cards (with transparency).",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      borderColor: {
        control: "color",
        default: "#ffffff",
        description: "Border color for the glass cards.",
      },
    },
  },
  {
    slug: "dark-terminal-features",
    name: "Dark Terminal Features",
    componentName: "DarkTerminalFeatures",
    description: "Terminal/CLI styled feature showcase.",
    tags: ["feature", "terminal", "cli", "dark", "developer", "code", "console", "tech"],
    props: {
      command: {
        control: "text",
        default: "init feature-matrix",
        description: "The command shown in the terminal.",
      },
      output1: {
        control: "text",
        default: "[+] Analyzed Requirements...",
        description: "First line of terminal output.",
      },
      output2: {
        control: "text",
        default: "[+] Generating Layouts...",
        description: "Second line of terminal output.",
      },
      output3: {
        control: "text",
        default: "[+] Optimizing Assets...",
        description: "Third line of terminal output.",
      },
      successMessage: {
        control: "text",
        default: "Done! 15 new features added.",
        description: "Success message at the end.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the section.",
      },
      terminalBackgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the terminal.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      promptColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the terminal prompt.",
      },
      outputColor: {
        control: "color",
        default: "#737373",
        description: "Color of the terminal output.",
      },
      successColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the success message.",
      },
      borderColor: {
        control: "color",
        default: "#404040",
        description: "Border color for the terminal.",
      },
    },
  },
  {
    slug: "comparison-table-features",
    name: "Comparison Table Features",
    componentName: "ComparisonTableFeatures",
    description: "Pricing/feature comparison table layout.",
    tags: ["feature", "table", "comparison", "pricing", "light", "plan", "enterprise", "row"],
    props: {
      freeTier: {
        control: "text",
        default: "Free",
        description: "Name of the free tier.",
      },
      proTier: {
        control: "text",
        default: "Pro",
        description: "Name of the pro tier.",
      },
      enterpriseTier: {
        control: "text",
        default: "Enterprise",
        description: "Name of the enterprise tier.",
      },
      row1Label: {
        control: "text",
        default: "Projects",
        description: "Label for the first row.",
      },
      row2Label: {
        control: "text",
        default: "Users",
        description: "Label for the second row.",
      },
      row3Label: {
        control: "text",
        default: "Storage",
        description: "Label for the third row.",
      },
      row4Label: {
        control: "text",
        default: "Support",
        description: "Label for the fourth row.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#737373",
        description: "Secondary/muted text color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for the highlighted tier.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color for the table.",
      },
    },
  },
  {
    slug: "app-screenshots-features",
    name: "App Screenshots Features",
    componentName: "AppScreenshotsFeatures",
    description: "Mobile app screenshots showcase with device frames.",
    tags: ["feature", "mobile", "app", "screenshots", "dark", "phone", "mockup", "carousel"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Mobile Experience",
        description: "Main section heading.",
      },
      showThreeScreens: {
        control: "boolean",
        default: true,
        description: "Show all three phone screens.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the section.",
      },
      deviceFrameColor: {
        control: "color",
        default: "#262626",
        description: "Color of the device frames.",
      },
      screenBackgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color inside the screens.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for highlights.",
      },
    },
  },
  {
    slug: "video-embed-features",
    name: "Video Embed Features",
    componentName: "VideoEmbedFeatures",
    description: "Video player embed with thumbnail and play button.",
    tags: ["feature", "video", "media", "light", "play", "thumbnail", "embed", "youtube"],
    props: {
      sectionTitle: {
        control: "text",
        default: "See it in action",
        description: "Main section heading.",
      },
      thumbnailUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
        description: "URL for the video thumbnail.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the section.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      playButtonColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the play button.",
      },
    },
  },
  {
    slug: "testimonial-features",
    name: "Testimonial Features",
    componentName: "TestimonialFeatures",
    description: "Feature section with testimonial cards.",
    tags: ["feature", "testimonial", "social-proof", "dark", "quote", "avatar", "card", "button"],
    props: {
      sectionTitle: {
        control: "text",
        default: "Loved by developers.",
        description: "Main section heading.",
      },
      sectionDescription: {
        control: "text",
        default: "Don't just take our word for it. Join thousands of developers building the future.",
        description: "Supporting description text.",
      },
      ctaLabel: {
        control: "text",
        default: "Start Building",
        description: "Label for the CTA button.",
      },
      testimonial1: {
        control: "text",
        default: "This library saved me weeks of development time. The components are top notch.",
        description: "First testimonial text.",
      },
      testimonial2: {
        control: "text",
        default: "This library saved me weeks of development time. The components are top notch.",
        description: "Second testimonial text.",
      },
      testimonial3: {
        control: "text",
        default: "This library saved me weeks of development time. The components are top notch.",
        description: "Third testimonial text.",
      },
      backgroundColor: {
        control: "color",
        default: "#1e1b4b",
        description: "Background color of the section.",
      },
      cardBackgroundColor: {
        control: "color",
        default: "#312e81",
        description: "Background color of testimonial cards.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#c7d2fe",
        description: "Secondary/muted text color.",
      },
      borderColor: {
        control: "color",
        default: "#3730a3",
        description: "Border color for cards.",
      },
    },
  },
  {
    slug: "hotspot-features",
    name: "Hotspot Features",
    componentName: "HotspotFeatures",
    description: "Interactive image with clickable hotspot annotations.",
    tags: ["feature", "interactive", "hotspot", "image", "light", "tooltip", "pointer", "product"],
    props: {
      imageUrl: {
        control: "text",
        default: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
        description: "URL for the main image.",
      },
      hotspot1Title: {
        control: "text",
        default: "Retina Display",
        description: "Title for the first hotspot.",
      },
      hotspot1Description: {
        control: "text",
        default: "Crystal clear pixels.",
        description: "Description for the first hotspot.",
      },
      hotspot2Title: {
        control: "text",
        default: "Ergonomic Design",
        description: "Title for the second hotspot.",
      },
      hotspot2Description: {
        control: "text",
        default: "Comfort for all day use.",
        description: "Description for the second hotspot.",
      },
      backgroundColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Background color of the section.",
      },
      hotspotColor: {
        control: "color",
        default: "#6366f1",
        description: "Color of the hotspot markers.",
      },
      tooltipBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the tooltips.",
      },
      textColor: {
        control: "color",
        default: "#171717",
        description: "Primary text color.",
      },
      mutedTextColor: {
        control: "color",
        default: "#737373",
        description: "Secondary/muted text color.",
      },
    },
  },
]

export const featureSectionsBySlug = featureSections.reduce<
  Record<string, FeatureSectionMeta>
>((acc, section) => {
  acc[section.slug] = section
  return acc
}, {})


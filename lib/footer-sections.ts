export type FooterPropControl =
    | "text"
    | "boolean"
    | "select"
    | "slider"
    | "color"
    | "textarea"

export interface FooterPropDefinition {
    control: FooterPropControl
    default: string | number | boolean
    description: string
    options?: string[]
    min?: number
    max?: number
    docType?: string
}

export interface FooterSectionMeta {
    slug: string
    name: string
    componentName: string
    description: string
    tags: string[]
    props: Record<string, FooterPropDefinition>
}

export const footerSections: FooterSectionMeta[] = [
    {
        slug: "simple-centered-footer",
        name: "Simple Centered Footer",
        componentName: "SimpleCenteredFooter",
        description: "A clean, centered footer with navigation links and social icons.",
        tags: ["footer", "centered", "simple", "social", "links"],
        props: {
            companyName: {
                control: "text",
                default: "Lumina UI Inc.",
                description: "Company name displayed in the copyright text.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year displayed in the copyright notice.",
            },
            showSocialIcons: {
                control: "boolean",
                default: true,
                description: "Toggle to show or hide social media icons.",
            },
            backgroundColor: {
                control: "color",
                default: "#ffffff",
                description: "Background color of the footer.",
            },
            textColor: {
                control: "color",
                default: "#737373",
                description: "Color of the navigation link text.",
            },
            copyrightTextColor: {
                control: "color",
                default: "#737373",
                description: "Color of the copyright text.",
            },
            iconColor: {
                control: "color",
                default: "#a3a3a3",
                description: "Color of the social media icons.",
            },
            borderColor: {
                control: "color",
                default: "#f5f5f5",
                description: "Color of the top border.",
            },
        },
    },
    {
        slug: "multi-column-large-footer",
        name: "Multi-Column Large Footer",
        componentName: "MultiColumnLargeFooter",
        description: "A comprehensive footer with multiple columns for navigation and company info.",
        tags: ["footer", "multi-column", "large", "navigation", "dark"],
        props: {
            companyName: {
                control: "text",
                default: "Lumina",
                description: "Company name displayed in the logo area.",
            },
            tagline: {
                control: "text",
                default: "Making the world a better place through constructing elegant hierarchies.",
                description: "Company tagline or description.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            backgroundColor: {
                control: "color",
                default: "#0a0a0a",
                description: "Background color of the footer.",
            },
            textColor: {
                control: "color",
                default: "#a3a3a3",
                description: "Color of the body text and links.",
            },
            headingColor: {
                control: "color",
                default: "#ffffff",
                description: "Color of the column headings.",
            },
            logoAccentColor: {
                control: "color",
                default: "#6366f1",
                description: "Background color of the logo square.",
            },
            borderColor: {
                control: "color",
                default: "#262626",
                description: "Color of the divider border.",
            },
        },
    },
    {
        slug: "newsletter-footer",
        name: "Newsletter Footer",
        componentName: "NewsletterFooter",
        description: "A footer focused on newsletter subscription with a prominent input field.",
        tags: ["footer", "newsletter", "subscribe", "form", "input"],
        props: {
            heading: {
                control: "text",
                default: "Subscribe to our newsletter",
                description: "Main heading text.",
            },
            description: {
                control: "text",
                default: "The latest news, articles, and resources, sent to your inbox weekly.",
                description: "Supporting description text.",
            },
            buttonText: {
                control: "text",
                default: "Subscribe",
                description: "Text on the subscribe button.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            backgroundColor: {
                control: "color",
                default: "#4338ca",
                description: "Background color of the footer.",
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
            buttonColor: {
                control: "color",
                default: "#5145cd",
                description: "Background color of the subscribe button.",
            },
            borderColor: {
                control: "color",
                default: "#5145cd",
                description: "Color of the divider border.",
            },
        },
    },
    {
        slug: "social-heavy-footer",
        name: "Social Heavy Footer",
        componentName: "SocialHeavyFooter",
        description: "A footer that emphasizes social media presence with large icons.",
        tags: ["footer", "social", "icons", "connect", "links"],
        props: {
            heading: {
                control: "text",
                default: "Follow our journey",
                description: "Main heading text.",
            },
            backgroundColor: {
                control: "color",
                default: "#ffffff",
                description: "Background color of the footer.",
            },
            headingColor: {
                control: "color",
                default: "#171717",
                description: "Color of the heading text.",
            },
            iconBackgroundColor: {
                control: "color",
                default: "#f5f5f5",
                description: "Background color of social icon circles.",
            },
            iconColor: {
                control: "color",
                default: "#737373",
                description: "Color of the social icons.",
            },
            linkColor: {
                control: "color",
                default: "#737373",
                description: "Color of the navigation links.",
            },
        },
    },
    {
        slug: "app-download-footer",
        name: "App Download Footer",
        componentName: "AppDownloadFooter",
        description: "A footer designed to promote mobile app downloads with store badges.",
        tags: ["footer", "app", "download", "mobile", "store"],
        props: {
            heading: {
                control: "text",
                default: "Get the app",
                description: "Main heading text.",
            },
            description: {
                control: "text",
                default: "Download our mobile app to manage your projects on the go. Available for iOS and Android devices.",
                description: "Supporting description text.",
            },
            backgroundColor: {
                control: "color",
                default: "#fafafa",
                description: "Background color of the footer.",
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
                description: "Background color of the store buttons.",
            },
            borderColor: {
                control: "color",
                default: "#e5e5e5",
                description: "Color of the top border.",
            },
        },
    },
    {
        slug: "dark-mode-toggle-footer",
        name: "Dark Mode Toggle Footer",
        componentName: "DarkModeToggleFooter",
        description: "A footer featuring a dark mode toggle switch and system status.",
        tags: ["footer", "dark-mode", "toggle", "theme", "system"],
        props: {
            companyName: {
                control: "text",
                default: "CMD+UI",
                description: "Company name displayed in the logo.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            copyrightText: {
                control: "text",
                default: "Command UI Labs. Built with precision.",
                description: "Copyright text.",
            },
            backgroundColor: {
                control: "color",
                default: "#171717",
                description: "Background color of the footer.",
            },
            textColor: {
                control: "color",
                default: "#a3a3a3",
                description: "Color of the navigation links.",
            },
            logoColor: {
                control: "color",
                default: "#ffffff",
                description: "Color of the logo text.",
            },
            toggleBackgroundColor: {
                control: "color",
                default: "#262626",
                description: "Background color of the theme toggle.",
            },
            borderColor: {
                control: "color",
                default: "#262626",
                description: "Color of the divider border.",
            },
        },
    },
    {
        slug: "brutalist-footer",
        name: "Brutalist Footer",
        componentName: "BrutalistFooter",
        description: "A bold, brutalist style footer with large typography and high contrast.",
        tags: ["footer", "brutalist", "bold", "typography", "design"],
        props: {
            email: {
                control: "text",
                default: "hello@studio.com",
                description: "Contact email address.",
            },
            location: {
                control: "text",
                default: "NEW YORK, NY",
                description: "Location text.",
            },
            establishedYear: {
                control: "text",
                default: "2024",
                description: "Year established.",
            },
            backgroundColor: {
                control: "color",
                default: "#ffde59",
                description: "Background color of the footer.",
            },
            textColor: {
                control: "color",
                default: "#000000",
                description: "Color of all text elements.",
            },
            borderColor: {
                control: "color",
                default: "#000000",
                description: "Color of all borders.",
            },
            accentColor: {
                control: "color",
                default: "#fbbf24",
                description: "Color of the email underline accent.",
            },
        },
    },
    {
        slug: "sitemap-footer",
        name: "Sitemap Footer",
        componentName: "SitemapFooter",
        description: "A dense footer layout suitable for displaying a full sitemap.",
        tags: ["footer", "sitemap", "dense", "links", "navigation"],
        props: {
            backgroundColor: {
                control: "color",
                default: "#fafafa",
                description: "Background color of the footer.",
            },
            headingColor: {
                control: "color",
                default: "#171717",
                description: "Color of the column headings.",
            },
            linkColor: {
                control: "color",
                default: "#525252",
                description: "Color of the navigation links.",
            },
            linkHoverColor: {
                control: "color",
                default: "#6366f1",
                description: "Hover color for links.",
            },
        },
    },
    {
        slug: "logo-showcase-footer",
        name: "Logo Showcase Footer",
        componentName: "LogoShowcaseFooter",
        description: "A footer that includes a section for showcasing partner or client logos.",
        tags: ["footer", "logos", "showcase", "partners", "trust"],
        props: {
            heading: {
                control: "text",
                default: "Trusted by market leaders",
                description: "Heading text above the logos.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            backgroundColor: {
                control: "color",
                default: "#0a0a0a",
                description: "Background color of the footer.",
            },
            headingColor: {
                control: "color",
                default: "#737373",
                description: "Color of the heading text.",
            },
            textColor: {
                control: "color",
                default: "#737373",
                description: "Color of the copyright and link text.",
            },
            dividerColor: {
                control: "color",
                default: "#262626",
                description: "Color of the horizontal divider.",
            },
        },
    },
    {
        slug: "legal-compliance-footer",
        name: "Legal Compliance Footer",
        componentName: "LegalComplianceFooter",
        description: "A footer with detailed legal links and compliance badges.",
        tags: ["footer", "legal", "compliance", "copyright", "terms"],
        props: {
            companyName: {
                control: "text",
                default: "Apple Inc.",
                description: "Company name in the copyright notice.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            backgroundColor: {
                control: "color",
                default: "#ffffff",
                description: "Background color of the footer.",
            },
            linkColor: {
                control: "color",
                default: "#171717",
                description: "Color of the legal links.",
            },
            textColor: {
                control: "color",
                default: "#737373",
                description: "Color of the body text.",
            },
            badgeColor: {
                control: "color",
                default: "#a3a3a3",
                description: "Color of the compliance badge icons.",
            },
            borderColor: {
                control: "color",
                default: "#e5e5e5",
                description: "Color of the top border.",
            },
        },
    },
    {
        slug: "interactive-hover-footer",
        name: "Interactive Hover Footer",
        componentName: "InteractiveHoverFooter",
        description: "A footer with large, interactive hover effects on navigation items.",
        tags: ["footer", "interactive", "hover", "animation", "creative"],
        props: {
            location: {
                control: "text",
                default: "Based in Berlin",
                description: "Location text.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            backgroundColor: {
                control: "color",
                default: "#000000",
                description: "Background color of the footer.",
            },
            linkColor: {
                control: "color",
                default: "#404040",
                description: "Default color of the navigation links.",
            },
            linkHoverColor: {
                control: "color",
                default: "#ffffff",
                description: "Hover color for navigation links.",
            },
            textColor: {
                control: "color",
                default: "#737373",
                description: "Color of the location and copyright text.",
            },
        },
    },
    {
        slug: "background-image-footer",
        name: "Background Image Footer",
        componentName: "BackgroundImageFooter",
        description: "A footer with a background image and overlay for visual impact.",
        tags: ["footer", "background", "image", "visual", "overlay"],
        props: {
            heading: {
                control: "text",
                default: "Ready to grow your business?",
                description: "Main heading text.",
            },
            description: {
                control: "text",
                default: "Join 20,000+ companies already using our platform to power their growth.",
                description: "Supporting description text.",
            },
            buttonText: {
                control: "text",
                default: "Start Free Trial",
                description: "Text on the CTA button.",
            },
            backgroundImage: {
                control: "text",
                default: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
                description: "URL of the background image.",
            },
            overlayColor: {
                control: "color",
                default: "#000000",
                description: "Color of the overlay on the background image.",
            },
            overlayOpacity: {
                control: "slider",
                default: 80,
                min: 0,
                max: 100,
                description: "Opacity percentage of the overlay.",
            },
            headingColor: {
                control: "color",
                default: "#ffffff",
                description: "Color of the heading text.",
            },
            descriptionColor: {
                control: "color",
                default: "#d4d4d8",
                description: "Color of the description text.",
            },
            buttonBackgroundColor: {
                control: "color",
                default: "#ffffff",
                description: "Background color of the CTA button.",
            },
            buttonTextColor: {
                control: "color",
                default: "#000000",
                description: "Text color of the CTA button.",
            },
        },
    },
    {
        slug: "gradient-footer",
        name: "Gradient Footer",
        componentName: "GradientFooter",
        description: "A footer using a gradient background for a modern look.",
        tags: ["footer", "gradient", "colorful", "modern", "vibrant"],
        props: {
            companyName: {
                control: "text",
                default: "LoveUI",
                description: "Company name displayed in the logo.",
            },
            tagline: {
                control: "text",
                default: "Hand-crafted UI components for your next project. Made with love and passion.",
                description: "Company tagline or description.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            gradientFrom: {
                control: "color",
                default: "#4338ca",
                description: "Starting color of the gradient background.",
            },
            gradientVia: {
                control: "color",
                default: "#7c3aed",
                description: "Middle color of the gradient background.",
            },
            gradientTo: {
                control: "color",
                default: "#db2777",
                description: "Ending color of the gradient background.",
            },
            textColor: {
                control: "color",
                default: "#ffffff",
                description: "Color of the main text.",
            },
            linkColor: {
                control: "color",
                default: "#c7d2fe",
                description: "Color of the navigation links.",
            },
            iconColor: {
                control: "color",
                default: "#ec4899",
                description: "Color of the heart icon.",
            },
        },
    },
    {
        slug: "minimal-split-footer",
        name: "Minimal Split Footer",
        componentName: "MinimalSplitFooter",
        description: "A minimal footer with a split layout for logo and links.",
        tags: ["footer", "minimal", "split", "clean", "simple"],
        props: {
            companyName: {
                control: "text",
                default: "monolith.",
                description: "Company name displayed as logo.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            copyrightText: {
                control: "text",
                default: "Monolith Studio",
                description: "Copyright text.",
            },
            backgroundColor: {
                control: "color",
                default: "#ffffff",
                description: "Background color of the footer.",
            },
            logoColor: {
                control: "color",
                default: "#000000",
                description: "Color of the logo text.",
            },
            linkColor: {
                control: "color",
                default: "#525252",
                description: "Color of the navigation links.",
            },
            copyrightColor: {
                control: "color",
                default: "#a3a3a3",
                description: "Color of the copyright text.",
            },
            borderColor: {
                control: "color",
                default: "#f5f5f5",
                description: "Color of the top border.",
            },
        },
    },
    {
        slug: "status-indicator-footer",
        name: "Status Indicator Footer",
        componentName: "StatusIndicatorFooter",
        description: "A footer that includes a live system status indicator.",
        tags: ["footer", "status", "indicator", "system", "uptime"],
        props: {
            statusText: {
                control: "text",
                default: "System Operational",
                description: "Status message text.",
            },
            backgroundColor: {
                control: "color",
                default: "#171717",
                description: "Background color of the footer.",
            },
            textColor: {
                control: "color",
                default: "#a3a3a3",
                description: "Color of the navigation links.",
            },
            statusBackgroundColor: {
                control: "color",
                default: "#0a0a0a",
                description: "Background color of the status badge.",
            },
            statusTextColor: {
                control: "color",
                default: "#22c55e",
                description: "Text color of the status message.",
            },
            statusDotColor: {
                control: "color",
                default: "#22c55e",
                description: "Color of the status indicator dot.",
            },
            statusBorderColor: {
                control: "color",
                default: "#262626",
                description: "Border color of the status badge.",
            },
        },
    },
    {
        slug: "architectural-footer",
        name: "Architectural Footer",
        componentName: "ArchitecturalFooter",
        description: "A structured, grid-based footer with an architectural feel.",
        tags: ["footer", "architectural", "grid", "structured", "design"],
        props: {
            companyName: {
                control: "text",
                default: "Arkitekt",
                description: "Company name displayed in large text.",
            },
            backgroundColor: {
                control: "color",
                default: "#fafafa",
                description: "Background color of the footer.",
            },
            headingColor: {
                control: "color",
                default: "#000000",
                description: "Color of the section headings.",
            },
            textColor: {
                control: "color",
                default: "#525252",
                description: "Color of the body text and links.",
            },
            companyNameColor: {
                control: "color",
                default: "#d4d4d8",
                description: "Color of the large company name.",
            },
            dividerColor: {
                control: "color",
                default: "#e5e5e5",
                description: "Color of the grid dividers.",
            },
        },
    },
    {
        slug: "cta-attached-footer",
        name: "CTA Attached Footer",
        componentName: "CtaAttachedFooter",
        description: "A footer that is visually attached to a preceding Call to Action section.",
        tags: ["footer", "cta", "attached", "conversion", "signup"],
        props: {
            ctaHeading: {
                control: "text",
                default: "Ready to get started?",
                description: "Heading text in the CTA section.",
            },
            ctaDescription: {
                control: "text",
                default: "Create your account today and start building.",
                description: "Description text in the CTA section.",
            },
            ctaButtonText: {
                control: "text",
                default: "Sign Up Free",
                description: "Text on the CTA button.",
            },
            companyName: {
                control: "text",
                default: "Bolt",
                description: "Company name in the footer.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            ctaBackgroundColor: {
                control: "color",
                default: "#6366f1",
                description: "Background color of the CTA section.",
            },
            ctaTextColor: {
                control: "color",
                default: "#ffffff",
                description: "Text color in the CTA section.",
            },
            ctaButtonBackgroundColor: {
                control: "color",
                default: "#ffffff",
                description: "Background color of the CTA button.",
            },
            ctaButtonTextColor: {
                control: "color",
                default: "#6366f1",
                description: "Text color of the CTA button.",
            },
            footerBackgroundColor: {
                control: "color",
                default: "#171717",
                description: "Background color of the footer section.",
            },
            footerTextColor: {
                control: "color",
                default: "#a3a3a3",
                description: "Text color in the footer section.",
            },
            logoColor: {
                control: "color",
                default: "#ffffff",
                description: "Color of the logo and company name.",
            },
        },
    },
    {
        slug: "developer-focus-footer",
        name: "Developer Focus Footer",
        componentName: "DeveloperFocusFooter",
        description: "A footer tailored for developer tools with version info and GitHub stats.",
        tags: ["footer", "developer", "code", "github", "tech"],
        props: {
            companyName: {
                control: "text",
                default: "DevTools",
                description: "Company/product name.",
            },
            version: {
                control: "text",
                default: "v2.4.0",
                description: "Current version number.",
            },
            githubStars: {
                control: "text",
                default: "12.5k",
                description: "GitHub star count.",
            },
            backgroundColor: {
                control: "color",
                default: "#0d1117",
                description: "Background color of the footer.",
            },
            textColor: {
                control: "color",
                default: "#8b949e",
                description: "Color of the body text and links.",
            },
            headingColor: {
                control: "color",
                default: "#ffffff",
                description: "Color of the section headings.",
            },
            badgeBackgroundColor: {
                control: "color",
                default: "#161b22",
                description: "Background color of the version/star badges.",
            },
            badgeBorderColor: {
                control: "color",
                default: "#30363d",
                description: "Border color of the badges.",
            },
            versionDotColor: {
                control: "color",
                default: "#22c55e",
                description: "Color of the version status dot.",
            },
        },
    },
    {
        slug: "magazine-footer",
        name: "Magazine Footer",
        componentName: "MagazineFooter",
        description: "A footer style often seen in online magazines or blogs.",
        tags: ["footer", "magazine", "blog", "content", "editorial"],
        props: {
            companyName: {
                control: "text",
                default: "WIRED",
                description: "Publication name.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            copyrightText: {
                control: "text",
                default: "Condé Nast. All rights reserved.",
                description: "Copyright text.",
            },
            backgroundColor: {
                control: "color",
                default: "#ffffff",
                description: "Background color of the footer.",
            },
            headingColor: {
                control: "color",
                default: "#000000",
                description: "Color of the section headings.",
            },
            linkColor: {
                control: "color",
                default: "#000000",
                description: "Color of the article links.",
            },
            categoryColor: {
                control: "color",
                default: "#dc2626",
                description: "Color of the category labels.",
            },
            companyNameColor: {
                control: "color",
                default: "#000000",
                description: "Color of the publication name.",
            },
            copyrightColor: {
                control: "color",
                default: "#737373",
                description: "Color of the copyright text.",
            },
            borderColor: {
                control: "color",
                default: "#000000",
                description: "Color of the top border.",
            },
            tagBorderColor: {
                control: "color",
                default: "#e5e5e5",
                description: "Border color of the category tags.",
            },
        },
    },
    {
        slug: "ecommerce-trust-footer",
        name: "Ecommerce Trust Footer",
        componentName: "EcommerceTrustFooter",
        description: "A footer for ecommerce sites featuring trust badges and payment icons.",
        tags: ["footer", "ecommerce", "trust", "payment", "badges"],
        props: {
            companyName: {
                control: "text",
                default: "Luxe.",
                description: "Company/store name.",
            },
            copyrightYear: {
                control: "text",
                default: "2024",
                description: "Year in the copyright notice.",
            },
            backgroundColor: {
                control: "color",
                default: "#fafafa",
                description: "Background color of the footer.",
            },
            headingColor: {
                control: "color",
                default: "#171717",
                description: "Color of the trust badge headings.",
            },
            textColor: {
                control: "color",
                default: "#737373",
                description: "Color of the body text.",
            },
            iconBackgroundColor: {
                control: "color",
                default: "#e5e5e5",
                description: "Background color of the trust badge icons.",
            },
            iconColor: {
                control: "color",
                default: "#525252",
                description: "Color of the trust badge icons.",
            },
            companyNameColor: {
                control: "color",
                default: "#000000",
                description: "Color of the company name.",
            },
            dividerColor: {
                control: "color",
                default: "#e5e5e5",
                description: "Color of the horizontal divider.",
            },
        },
    },
]

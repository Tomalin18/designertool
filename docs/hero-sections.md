# Hero Sections Library

This update introduces **35 configurable hero section layouts** that mirror the experience of our existing custom components.

## Where to find them

- **Components list:** Appears under the new `Sections` category.
- **Components detail pages:** `/components/[slug]` for every hero.
- **Playground:** Each hero now supports live preview, customization, and code export in the Component Playground.
- **Components page → Section tab:** Dedicated tab with search-only filtering for all hero variants.

## Usage

```tsx
import { SimpleCenteredHero } from "@/components/customize/heroes"

export function HeroDemo() {
  return (
    <SimpleCenteredHero
      pillText="v2.0 is now available"
      heading="Build faster with Lumina"
      highlightText="Lumina"
      description="The ultimate component kit for React. Beautifully designed, accessible, and ready for production."
      primaryCtaLabel="Get Started"
      secondaryCtaLabel="View Demo"
    />
  )
}
```

All hero components are exported from `@/components/customize/heroes`. Their prop definitions and defaults are documented inside the playground and on the component detail pages.

## Available variants

| Slug | Name | Notes |
| --- | --- | --- |
| `simple-centered-hero` | Simple Centered Hero | SaaS headline with dual CTAs |
| `saas-dashboard-hero` | SaaS Dashboard Hero | Feature checklist with window mock |
| `dev-code-hero` | Dev / Code Hero | Terminal command callout |
| `modern-ecommerce-hero` | Modern Ecommerce Hero | Fashion CTA with abstract image |
| `app-showcase-hero` | App Showcase Hero | Dual store buttons + phone mock |
| `email-capture-hero` | Email Capture Hero | Newsletter signup form |
| `video-background-hero` | Video Background Hero | Simulated background video CTA |
| `split-screen-hero` | Split Screen Hero | Personal intro with split photo |
| `web3-crypto-hero` | Web3 Crypto Hero | Neon gradient call-to-action |
| `search-focused-hero` | Search Focused Hero | Travel search pill form |
| `event-conference-hero` | Event Conference Hero | Date badge + CTA |
| `social-proof-hero` | Social Proof Hero | Testimonial w/ rating |
| `modern-brutalist-hero` | Modern Brutalist Hero | Bold brutalist layout |
| `podcast-media-hero` | Podcast / Media Hero | Episode card with play button |
| `gradient-mesh-hero` | Gradient Mesh Hero | Minimal gradient hero |
| `feature-grid-background-hero` | Feature Grid Background Hero | Icon grid background |
| `kinetic-type-hero` | Kinetic Typography Hero | Dynamic typographic rows |
| `interactive-toggle-hero` | Interactive Toggle Hero | Dev/Designer toggle |
| `code-ide-hero` | Code IDE Hero | VS Code themed snippet |
| `vertical-split-hero` | Vertical Columns Hero | Editorial trifold layout |
| `cyberpunk-glitch-hero` | Cyberpunk Glitch Hero | Glitch typography CTA |
| `minimal-data-hero` | Minimal Data Hero | Monospaced stats layout |
| `restaurant-luxury-hero` | Restaurant Luxury Hero | Serif restaurant CTA |
| `real-estate-hero` | Real Estate Hero | Layered property search |
| `course-creator-hero` | Course Creator Hero | Course promo layout |
| `newsletter-stack-hero` | Newsletter Stack Hero | Layered newsletter cards |
| `mobile-fan-hero` | Mobile Fan Hero | Triple phone fan layout |
| `nonprofit-hero` | Nonprofit Impact Hero | Donation/progress hero |
| `travel-search-hero` | Travel Search Hero | Glassmorphism travel search |
| `agency-reel-hero` | Agency Reel Hero | Video showreel CTA |
| `review-focused-hero` | Review Focused Hero | Quote-focused layout |
| `waitlist-viral-hero` | Waitlist Viral Hero | Waitlist form with live count |
| `gradient-border-hero` | Gradient Border Hero | Conic gradient compliance |
| `bento-grid-hero` | Bento Grid Hero | Bento style grid |
| `comparison-hero` | Comparison Hero | Side-by-side product comparison |

Refer to the playground for exact props and defaults for each variant.






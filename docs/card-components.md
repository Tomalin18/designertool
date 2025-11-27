# Card Components Library

This update introduces **25 configurable card components** that provide a wide range of card layouts for different use cases.

## Where to find them

- **Components list:** Appears under the `Card` category in the Components tab.
- **Components detail pages:** `/components/[slug]` for every card component.
- **Playground:** Each card supports live preview, customization, and code export in the Component Playground.
- **Components page → Components tab:** All card components are listed with search and filter capabilities.

## Usage

All card components are exported from `@/components/customize/cards`. Here's how to import and use them:

```tsx
import { SimpleCard } from "@/components/customize/cards"

export function CardDemo() {
  return (
    <SimpleCard
      title="Simple Card"
      description="A standard card component for displaying content. Clean and minimal."
      buttonText="Read more"
      showButton={true}
    />
  )
}
```

### Multiple Cards Example

```tsx
import { 
  SimpleCard, 
  ImageCard, 
  PricingCard,
  ProductCard 
} from "@/components/customize/cards"

export function CardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SimpleCard />
      <ImageCard />
      <PricingCard />
      <ProductCard />
    </div>
  )
}
```

## Props and Customization

Each card component has its own set of customizable props. The props definitions and defaults are documented in:
- The component detail pages (`/components/[slug]`)
- The Component Playground (interactive customization)
- The `lib/card-sections.ts` file

### Common Props

Most cards support common styling props:
- `className`: Additional CSS classes
- `backgroundColor`: Background color (hex format, automatically converted to rgb in the component)
- `borderColor`: Border color (hex format, automatically converted to rgb in the component)
- `textColor`: Text color (hex format, automatically converted to rgb in the component)
- `borderRadius`: Border radius in pixels (slider control, 0-48)
- `padding`: Inner padding in pixels (slider control, 0-32)

**Implementation Details:**
- Color props accept hex values (e.g., `#171717`) and are automatically converted to RGB format (`rgb(23 23 23)`) for use in inline styles
- Style props use conditional spreading (similar to `SocialProfileCard`): only applied when values are provided
- Empty or undefined color values allow components to use their default styling
- Slider props (borderRadius, padding) are passed as numbers directly

### Special Props

Some cards have special prop types:

**Array Props (stored as textarea, converted to arrays):**
- `features` (PricingCard): Feature list as newline-separated string, converted to array in render
- `skills` (SkillCard): Skills list as newline-separated string, converted to array in render

**Object Array Props:**
- `rows` (ComparisonCard): Format `"Label:Left:Right"` (one per line), converted to `{ label, left, right }[]`
- `items` (RoadmapCard): Format `"Title:Status:Color"` (one per line), converted to `{ title, status, color }[]`
- `hourlyForecast` (WeatherCard): Format `"Time:Temp"` (one per line), converted to `{ time, temp }[]`

**Prop Processing:**
- All props are processed in the playground's render function before being passed to components
- Color props are converted from hex to rgb format automatically
- Array/object props are parsed from string format (textarea input) to their expected data structures
- Type conversion ensures correct prop types (numbers for sliders, booleans for switches, etc.)

## Available Card Components

| Slug | Name | Component Name | Description |
| --- | --- | --- | --- |
| `simple-card` | Simple Card | `SimpleCard` | A standard card component for displaying content. Clean and minimal. |
| `image-card` | Image Card | `ImageCard` | Card with image on top, category badge, and content below. |
| `horizontal-card` | Horizontal Card | `HorizontalCard` | Card with horizontal layout: image on left, content on right. |
| `overlay-card` | Overlay Card | `OverlayCard` | Card with image background and overlay text content. |
| `glass-card` | Glass Card | `GlassCard` | Glassmorphism card with backdrop blur and glow effects. |
| `neo-brutalist-card` | Neo-Brutalist Card | `NeoBrutalistCard` | Bold neo-brutalist design with high contrast and shadow effects. |
| `profile-card` | Profile Card | `ProfileCard` | User profile card with avatar, stats, and social links. |
| `pricing-card` | Pricing Card | `PricingCard` | Pricing card with plan details and feature list. |
| `product-card` | Product Card | `ProductCard` | E-commerce product card with image, price, and rating. |
| `news-card` | News Card | `NewsCard` | News/blog card with category, date, and author info. |
| `stats-card` | Stats Card | `StatsCard` | Statistics card with value, title, and change indicator. |
| `testimonial-card` | Testimonial Card | `TestimonialCard` | Customer testimonial card with rating and author info. |
| `task-card` | Task Card | `TaskCard` | Task management card with priority, assignees, and comments. |
| `music-card` | Music Card | `MusicCard` | Music player card with album art and playback controls. |
| `video-card` | Video Card | `VideoCard` | Video thumbnail card with play button overlay. |
| `feature-icon-card` | Feature Icon Card | `FeatureIconCard` | Feature card with icon, title, and description. |
| `alert-card` | Alert Card | `AlertCard` | Notification/alert card with icon, message, and actions. |
| `hover-reveal-card` | Hover Reveal Card | `HoverRevealCard` | Card that reveals hidden content on hover. |
| `gradient-border-card` | Gradient Border Card | `GradientBorderCard` | Card with animated gradient border effect. |
| `event-card` | Event Card | `EventCard` | Event card with date, title, and location. |
| `skill-card` | Skill Card | `SkillCard` | Skills/tags card displaying a list of technologies or skills. |
| `comparison-card` | Comparison Card | `ComparisonCard` | Comparison card showing differences between two options. |
| `roadmap-card` | Roadmap Card | `RoadmapCard` | Roadmap card showing timeline with status indicators. |
| `weather-card` | Weather Card | `WeatherCard` | Weather card with temperature, conditions, and hourly forecast. |
| `cookie-card` | Cookie Card | `CookieCard` | Cookie consent card with accept/decline buttons. |

## Component Categories

Cards are organized by use case:

### Basic Cards
- Simple Card
- Image Card
- Horizontal Card
- Overlay Card

### Styled Cards
- Glass Card
- Neo-Brutalist Card
- Gradient Border Card
- Hover Reveal Card

### Content Cards
- Profile Card
- News Card
- Testimonial Card
- Feature Icon Card

### E-commerce & Business
- Product Card
- Pricing Card
- Stats Card
- Comparison Card

### Media Cards
- Music Card
- Video Card

### Utility Cards
- Task Card
- Event Card
- Skill Card
- Roadmap Card
- Weather Card
- Alert Card
- Cookie Card

## Examples

### Pricing Card with Custom Features

```tsx
import { PricingCard } from "@/components/customize/cards"

export function PricingExample() {
  return (
    <PricingCard
      planName="Enterprise"
      price={99}
      period="/mo"
      features={[
        "Unlimited Projects",
        "Advanced Analytics",
        "Priority Support",
        "Custom Domain",
        "API Access"
      ]}
      buttonText="Get Started"
      accentColor="#8b5cf6"
    />
  )
}
```

### Product Card with Rating

```tsx
import { ProductCard } from "@/components/customize/cards"

export function ProductExample() {
  return (
    <ProductCard
      name="Wireless Headphones"
      category="Audio"
      price={199.99}
      rating={4.8}
      imageUrl="https://example.com/headphones.jpg"
      badge="BEST SELLER"
      isFavorite={false}
    />
  )
}
```

### Comparison Card

```tsx
import { ComparisonCard } from "@/components/customize/cards"

export function ComparisonExample() {
  return (
    <ComparisonCard
      leftLabel="Basic"
      rightLabel="Pro"
      rows={[
        { label: "Users", left: "1", right: "Unlimited" },
        { label: "Storage", left: "5GB", right: "100GB" },
        { label: "Support", left: "Email", right: "24/7 Priority" }
      ]}
    />
  )
}
```

## TypeScript Support

All card components are fully typed. Import the prop interfaces for type safety:

```tsx
import { 
  SimpleCard, 
  type SimpleCardProps 
} from "@/components/customize/cards"

const props: SimpleCardProps = {
  title: "My Card",
  description: "Card description"
}
```

## Styling

Cards use Tailwind CSS for styling and support:
- Custom color props (hex colors, automatically converted to rgb for inline styles)
- Tailwind utility classes via `className`
- Responsive design out of the box
- Dark mode compatible

### Style Implementation

Card components use conditional style spreading (similar to `SocialProfileCard`) to apply custom styles:

```tsx
style={{
  ...(backgroundColor && { backgroundColor }),
  ...(borderColor && { borderColor }),
  ...(textColor && { color: textColor }),
  ...(borderRadius && { borderRadius: `${borderRadius}px` }),
  ...(padding && { padding: `${padding}px` }),
}}
```

This approach ensures:
- Default styling is preserved when props are undefined or empty
- Custom values override defaults only when explicitly provided
- Components gracefully handle missing style props

## Implementation Details

### Props Processing in Playground

The Component Playground processes props before passing them to card components:

1. **Color Props**: Hex values (e.g., `#171717`) are converted to RGB format (`rgb(23 23 23)`) using a helper function, matching the behavior of `SocialProfileCard`
2. **Slider Props**: Values are ensured to be numbers, with fallback to defaults if invalid
3. **Boolean Props**: Values are converted to proper boolean types
4. **Array/Object Props**: String inputs (from textarea) are parsed into their expected data structures
5. **Empty Values**: Undefined or empty values are passed as `undefined` to allow components to use defaults

### Component Render Function

Each card component's render function:
- Receives processed props from the playground
- Uses conditional style spreading for style props
- Falls back to default styling when props are undefined
- Handles special prop types (arrays, objects) appropriately

### Integration with Customize Panel

The customize panel (`CustomizePanel`) provides:
- Real-time prop updates that immediately reflect in the playground preview
- Type-specific controls (color picker, slider, text input, etc.)
- Proper prop type validation and conversion
- Support for all prop types including complex arrays and objects

## Best Practices

1. **Use appropriate card types** for your content (e.g., ProductCard for e-commerce, PricingCard for pricing)
2. **Customize colors** to match your brand using the color props (hex format, e.g., `#171717`)
3. **Provide meaningful defaults** - all cards have sensible defaults that work when props are undefined
4. **Use the playground** to experiment with different configurations before implementing
5. **Check component detail pages** for complete prop documentation
6. **Leave color props empty** if you want to use the component's default styling
7. **Use slider controls** for numeric values (borderRadius, padding) - they provide visual feedback and proper number conversion

Refer to the playground for exact props and defaults for each card variant.


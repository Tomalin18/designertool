# Component Props Verification Guide

This guide provides a comprehensive checklist for verifying that all component props are properly connected and functional in the component library system. Use this guide when adding new components or fixing prop connection issues.

## Overview

When adding new components to the library, it's crucial to ensure that:
1. All props are properly defined in the metadata file
2. Component implementations accept and use all defined props
3. CustomizePanel correctly displays and updates props
4. Playground correctly renders components with prop changes
5. Code generation includes all relevant props

## Verification Checklist

### 1. Metadata Definition (`lib/[component]-sections.ts`)

#### ✅ Props Definition
- [ ] All props are defined in the component's metadata object
- [ ] Props use appropriate control types:
  - `"text"` - Text input
  - `"textarea"` - Multi-line text input
  - `"number"` - Number input
  - `"boolean"` - Switch/toggle
  - `"select"` - Dropdown with options
  - `"slider"` - Range slider (requires `min` and `max`)
  - `"color"` - Color picker (hex format)
- [ ] Each prop has:
  - `control`: The control type
  - `default`: Default value (empty string `""` for optional props)
  - `description`: Clear description of what the prop does
  - `options`: Array of options (for select controls)
  - `min`/`max`: Range limits (for slider controls)

#### ✅ Common Props Handling
- [ ] If using `commonBadgeProps` or similar shared props, verify:
  - All common props are actually used by the component
  - Component-specific props are added after spreading common props
  - Unused common props are removed (don't use `...commonProps` if component doesn't need them)

#### ✅ Color Props
- [ ] Color props use `control: "color"` with hex format defaults (e.g., `"#22c55e"`)
- [ ] Optional color props use `default: ""` (empty string) to indicate "use default styling"
- [ ] Color props that are required have actual color values as defaults

**Example:**
```typescript
props: {
  backgroundColor: {
    control: "color",
    default: "", // Optional - uses default Tailwind class
    description: "Background color (optional, uses default if empty).",
  },
  dotColor: {
    control: "color",
    default: "#22c55e", // Required - has default color
    description: "Color of the dot indicator.",
  },
}
```

### 2. Component Implementation (`components/customize/[component]/index.tsx`)

#### ✅ Interface Definition
- [ ] Component interface includes all props from metadata
- [ ] Props are properly typed (string, number, boolean, React.ReactNode, etc.)
- [ ] Optional props use `?:` syntax

**Example:**
```typescript
export interface DotBadgeProps {
  children?: React.ReactNode;
  className?: string;
  dotColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;
  padding?: number;
  borderWidth?: number;
}
```

#### ✅ Props Usage in Component
- [ ] All props from metadata are destructured in component function
- [ ] Props are actually used in the component's JSX/style
- [ ] Default values match metadata defaults
- [ ] Conditional rendering/logic uses props correctly

#### ✅ Color Props Processing
- [ ] Color props are converted from hex to rgb format using `hexToRgb()` helper
- [ ] Color props handle both hex (`#22c55e`) and rgb (`rgb(34 197 94)`) formats
- [ ] Empty color props are handled correctly (don't apply style if empty)
- [ ] Color conversion logic:
  ```typescript
  const colorRgb = color && color.trim() !== "" 
    ? (color.startsWith("rgb") ? color : (hexToRgb(color) || color))
    : undefined;
  ```

**Example:**
```typescript
export const DotBadge = ({
  dotColor = "#22c55e",
  backgroundColor,
  textColor,
  borderColor,
  // ... other props
}: DotBadgeProps) => {
  const dotRgb = dotColor && dotColor.trim() !== "" 
    ? (dotColor.startsWith("rgb") ? dotColor : (hexToRgb(dotColor) || dotColor))
    : "#22c55e";
  
  return (
    <span
      style={{
        ...(backgroundColor && backgroundColor.trim() !== "" && {
          backgroundColor: backgroundColor.startsWith("rgb") 
            ? backgroundColor 
            : (hexToRgb(backgroundColor) || backgroundColor)
        }),
        ...(textColor && textColor.trim() !== "" && {
          color: textColor.startsWith("rgb") 
            ? textColor 
            : (hexToRgb(textColor) || textColor)
        }),
        // ... other styles
      }}
    >
      {/* component content */}
    </span>
  );
};
```

#### ✅ Conditional Style Application
- [ ] Styles are applied conditionally using spread operator pattern
- [ ] Empty/undefined props don't override default styles
- [ ] Border styles include `borderStyle: "solid"` when borderColor or borderWidth is set

**Pattern:**
```typescript
style={{
  ...(prop && prop.trim() !== "" && { styleProperty: processedValue }),
  // Only apply if prop has value
}}
```

### 3. Playground Configuration (`components/component-playground.tsx`)

#### ✅ Component Config Registration
- [ ] Component is registered in `componentConfigs` object
- [ ] Config key matches component's display name (from metadata)
- [ ] Props config is created from metadata:
  ```typescript
  const propConfig = Object.fromEntries(
    Object.entries(component.props).map(([key, prop]) => [
      key,
      {
        type: prop.control,
        default: prop.default,
        options: prop.options,
        min: prop.min,
        max: prop.max,
      },
    ])
  )
  ```

#### ✅ Render Function
- [ ] Render function processes all props correctly
- [ ] Color props are converted from hex to rgb:
  ```typescript
  if (propConfig.control === "color") {
    if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
      processedProps[key] = propValue.startsWith('#') 
        ? hexToRgb(propValue) 
        : propValue
    } else {
      processedProps[key] = undefined
    }
  }
  ```
- [ ] Slider/number props are converted to numbers
- [ ] Boolean props are converted to proper booleans
- [ ] Text props handle empty strings correctly

#### ✅ Component Lookup
- [ ] Component can be found by name
- [ ] Component can be found by slug (for sections)
- [ ] Fallback logic handles both lookup methods

### 4. CustomizePanel Integration (`components/component-playground-customize-panel.tsx`)

#### ✅ Props Filtering
- [ ] Only props defined in component metadata are displayed
- [ ] Unused props are filtered out (check against `componentSection.props`)
- [ ] Props are grouped correctly (Content, Style tabs with subcategories)

**For Badge/Card components:**
```typescript
Object.entries(config.props).forEach(([key, propConfig]) => {
  // Only include props that are actually defined in componentSection.props
  if (!componentSection.props[key]) {
    return // Skip props not in metadata
  }
  // ... categorize props
})
```

#### ✅ Color Picker Configuration
- [ ] Color pickers use correct `defaultColor`:
  - Empty string `""` for optional colors (uses default styling)
  - Actual color value for required colors
- [ ] Color pickers handle empty values correctly (show placeholder, not black)
- [ ] Placeholder text indicates if color is optional

**Example:**
```typescript
<ColorPicker
  value={props[key] || ""}
  onChange={(value) => updateProp(key, value)}
  placeholder={propConfig.default && propConfig.default.trim() !== "" 
    ? propConfig.default 
    : ""}
  outputFormat="hex"
  defaultColor={(() => {
    // If default is empty string, return empty (don't show black)
    if (propConfig.default && propConfig.default.trim() !== "" && propConfig.default.startsWith('#')) {
      return propConfig.default
    }
    return "" // Empty for optional colors
  })()}
/>
```

#### ✅ Grouping Configuration
- [ ] Props are grouped into appropriate tabs (Content, Style)
- [ ] Style props are subcategorized (Colors, Spacing, Border, Other)
- [ ] Special props (arrays, objects) have dedicated editors if needed

#### ✅ Special Editors for Tabs Components
- [ ] Tabs prop uses `TabsEditor` instead of textarea
- [ ] TabsEditor provides list-based editing interface
- [ ] Supports adding, removing, and editing individual tabs
- [ ] Handles newline-separated string format correctly

**TabsEditor Implementation:**
```typescript
// In component-playground-customize-panel.tsx
if (key === "tabs" && propConfig.type === "textarea") {
  return (
    <div key={key} className="space-y-2">
      <Label className="capitalize">{label}</Label>
      <TabsEditor 
        value={props[key] || ""} 
        onChange={(val) => updateProp(key, val)} 
      />
      {propConfig.description && (
        <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
      )}
      {!isLast && <Separator className="!mt-4" />}
    </div>
  )
}
```

**Props Filtering for Tabs:**
```typescript
// In getGroupingConfig function
const tabsSection = tabsSections.find((tab: { componentName: string; name: string }) =>
  tab.componentName === componentName || tab.name === componentName
)
if (tabsSection) {
  const contentProps: string[] = []
  const colorProps: string[] = []

  Object.entries(config.props).forEach(([key, propConfig]) => {
    // Only include props that are actually defined in tabsSection.props
    if (!tabsSection.props[key]) {
      return // Skip props not in metadata
    }
    
    const lowerKey = key.toLowerCase()
    const propType = propConfig.type
    
    // Check for color props
    if (colorKeys.includes(key) || lowerKey.includes('color') || propType === 'color') {
      colorProps.push(key)
    } 
    // Content props: everything else
    else {
      contentProps.push(key)
    }
  })
  
  // Build style subcategories
  const styleSubcategories = []
  if (colorProps.length > 0) {
    styleSubcategories.push({ name: "colors", label: "Colors", keys: colorProps })
  }

  const tabs = []
  
  // Content tab
  if (contentProps.length > 0) {
    tabs.push({ name: "content", label: "Content", keys: contentProps })
  }

  // Style tab with subcategories
  if (styleSubcategories.length > 0) {
    tabs.push({
      name: "style",
      label: "Style",
      keys: [],
      subcategories: styleSubcategories
    })
  }

  if (tabs.length > 0) {
    return {
      type: "tabs",
      tabs
    }
  }
}
```

**TabsEditor Component Details:**
- Converts newline-separated string to list of editable inputs
- Provides add/remove functionality for tabs
- Supports keyboard shortcuts (Enter to add, Backspace to remove)
- Always maintains at least one empty input for adding new tabs
- Automatically cleans empty tabs when saving (except the last one for input)

### 5. Code Generation (`components/component-playground.tsx`)

#### ✅ Complete Code Generation Mechanism

All components should generate **complete, ready-to-use code** that can be directly copied and used. There are two scenarios:

**Scenario 1: With `initialCode` (Full Component Implementation)**
- When a component has `initialCode` (read from source file in detail page), display the complete component code
- Check if `initialCode` already has imports:
  ```typescript
  if (componentMeta && initialCode) {
    if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
      // Add necessary imports at the top
      const imports = `"use client"

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
// ... other necessary imports

// Helper functions if needed
const hexToRgb = (hex: string): string | undefined => {
  // ... helper implementation
};

// Common interfaces if needed
export interface ComponentProps {
  // ... interface definition
}

`
      return `${imports}${initialCode}`
    } else {
      // initialCode already has imports, use it as-is
      return initialCode
    }
  }
  ```

**Scenario 2: Without `initialCode` (Usage Example)**
- Generate a complete usage example with all necessary imports and component structure
- Include all current prop values
- Format: Complete component file with imports, component definition, and usage

**Example for components with initialCode support:**
```typescript
// Toggle, Input, Badge, Card, Dialog, Button, Tabs components
if (componentMeta && initialCode) {
  // Check if initialCode already has imports
  if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
    const imports = `"use client"

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
// ... component-specific imports

`
    return `${imports}${initialCode}`
  } else {
    return initialCode
  }
}

// Fallback: Generate usage example
if (componentMeta) {
  // ... generate complete usage example
}
```

**Example for special components (MediaPlayer, ChatInterface, etc.):**
```typescript
// These components generate complete component code directly
if (componentName === "MediaPlayer") {
  return `"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
// ... imports

interface MediaPlayerProps {
  // ... complete interface
}

// ... helper functions

export const MediaPlayer = ({ ... }) => {
  // ... complete component implementation
}
`
}
```

#### ✅ Props Inclusion
- [ ] All props with values are included in generated code
- [ ] Empty props are excluded from generated code
- [ ] Color props are converted to rgb format in code:
  ```typescript
  if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor") 
      && typeof value === "string" && value.startsWith("#")) {
    propsList.push(`${key}="${hexToRgb(value)}"`)
  }
  ```

#### ✅ Code Format
- [ ] Generated code uses correct import path
- [ ] Component name matches metadata `componentName`
- [ ] Props are formatted correctly (strings, numbers, booleans)
- [ ] Children prop is handled correctly
- [ ] Code includes `"use client"` directive when needed (for components using hooks)
- [ ] Code includes all necessary imports (React, hooks, utilities, icons, etc.)
- [ ] Code includes helper functions if needed (e.g., `hexToRgb`, `timeToSeconds`)
- [ ] Code includes interface/type definitions if needed
- [ ] Generated code is a complete, standalone file that can be copied directly

#### ✅ Code Generation Checklist
- [ ] Component generates complete code (not just JSX snippet)
- [ ] Code includes proper imports
- [ ] Code includes `"use client"` if component uses hooks
- [ ] Code includes helper functions if component uses them
- [ ] Code includes interface definitions if component has custom props
- [ ] Color props are converted from hex to rgb format
- [ ] All current prop values are included in generated code
- [ ] Generated code can be copied and used directly without modification

### 6. Component Preview Integration (`components/component-preview.tsx`)

#### ✅ Component Preview Support
- [ ] Component metadata is imported (e.g., `badgeSections`, `cardSections`)
- [ ] Component map is imported (e.g., `badgeComponentsByName`, `cardComponentsByName`)
- [ ] Component meta is found by name:
  ```typescript
  const badgeMeta = badgeSections.find((badge) => badge.name === name)
  const BadgeComponent = badgeMeta ? badgeComponentsByName[badgeMeta.componentName] : null
  ```
- [ ] Component is included in `isSection` check:
  ```typescript
  const isSection = !!heroMeta || !!featureMeta || ... || !!badgeMeta
  ```
- [ ] Component tags are included in `displayTags`:
  ```typescript
  const displayTags = tags || ... || badgeMeta?.tags || []
  ```

#### ✅ Preview Rendering
- [ ] Component has a render case in `renderPreview()` function
- [ ] Default props are extracted from metadata:
  ```typescript
  if (badgeMeta && BadgeComponent) {
    const defaultProps = Object.fromEntries(
      Object.entries(badgeMeta.props).map(([key, prop]) => [key, prop.default])
    )
    return (
      <div className="flex items-center justify-center p-8 w-full">
        <BadgeComponent {...defaultProps} />
      </div>
    )
  }
  ```
- [ ] Component renders correctly with default props
- [ ] Preview container has appropriate styling (centered, padding, etc.)

**Note:** Component preview is used in the Components page list view. If a component shows "Preview not available", check that:
1. Component metadata and component map are imported
2. Component meta lookup is implemented
3. Component is included in `isSection` and `displayTags`
4. Component has a render case in `renderPreview()`

### 7. Common Issues and Solutions

#### Issue: Color props show black initially
**Solution:**
- Check that optional color props use `default: ""` in metadata
- Ensure ColorPicker's `defaultColor` is empty string for optional colors
- Verify ColorPicker component handles empty `defaultColor` correctly

#### Issue: Props don't update component
**Solution:**
- Verify prop is in component interface
- Check prop is destructured in component function
- Ensure prop is used in component's style/JSX
- Verify playground processes prop correctly

#### Issue: Props appear but don't affect component
**Solution:**
- Check component implementation uses the prop
- Verify conditional style application pattern
- Ensure color conversion is applied correctly
- Check for typos in prop names

#### Issue: Unused props appear in customize panel
**Solution:**
- Remove props from metadata if not used
- Filter props in CustomizePanel based on `componentSection.props`
- Don't use `...commonProps` if component doesn't need all common props
- For Tabs components, ensure `getGroupingConfig` checks `tabsSection.props[key]` before including props

#### Issue: Tabs prop shows as textarea instead of list editor
**Solution:**
- Verify `TabsEditor` component is implemented in `component-playground-customize-panel.tsx`
- Check that the condition `key === "tabs" && propConfig.type === "textarea"` is correctly implemented
- Ensure `TabsEditor` handles newline-separated string format correctly

#### Issue: Border color doesn't work
**Solution:**
- Ensure `borderStyle: "solid"` is set when borderColor is applied
- Check borderWidth is also set if needed
- Verify borderColor is in component interface and implementation

#### Issue: Gradient props don't work
**Solution:**
- Remove `backgroundColor` from props if using gradient
- Ensure `gradientFrom` and `gradientTo` are properly converted
- Check gradient is applied in `background` style property

#### Issue: Component shows "Preview not available" in Components page
**Solution:**
- Verify component metadata is imported in `component-preview.tsx`
- Check component map (e.g., `badgeComponentsByName`) is imported
- Ensure component meta lookup is implemented (e.g., `badgeMeta = badgeSections.find(...)`)
- Verify component is included in `isSection` check
- Add component render case in `renderPreview()` function
- Check component map exports the component correctly

### 8. Testing Checklist

When adding a new component, test the following:

#### Visual Testing
- [ ] Component renders correctly with default props
- [ ] All color props update component appearance
- [ ] Slider props change component dimensions/spacing
- [ ] Boolean props show/hide elements correctly
- [ ] Text props update component content

#### Functional Testing
- [ ] CustomizePanel shows all defined props
- [ ] Props update in real-time in playground
- [ ] Empty optional props don't break component
- [ ] Generated code matches current prop values
- [ ] Generated code is valid and can be copied

#### Edge Cases
- [ ] Empty color props use default styling
- [ ] Invalid color values are handled gracefully
- [ ] Out-of-range slider values are clamped
- [ ] Missing props don't cause errors

### 9. Component-Specific Considerations

#### Badge Components
- Use `commonBadgeProps` only if component needs all common props
- Remove `backgroundColor` if using gradient
- Ensure `dotColor`, `iconColor`, etc. are properly handled
- Check border styles include `borderStyle: "solid"`

#### Card Components
- Verify array props (features, skills) have dedicated editors
- Check object array props (rows, items) are parsed correctly
- Ensure all element-specific colors are supported
- Verify hover effects and animations work

#### Button Components
- Check variant props are handled correctly
- Verify size props affect component
- Ensure icon props are optional
- Check loading/disabled states

#### Section Components (Hero, Header, etc.)
- Verify complex layout props work
- Check image/asset props are handled
- Ensure responsive props are applied
- Verify navigation/config props are parsed correctly

#### Tabs Components
- Use `commonTabsProps` only if component needs all common props
- Remove `inactiveColor` or `backgroundColor` from props if component doesn't use them
- Ensure tabs list prop uses `TabsEditor` instead of textarea (in CustomizePanel)
- Verify tabs parsing handles newline-separated strings correctly
- Check active tab state management works correctly
- Ensure color props are properly converted from hex to rgb
- Verify props filtering in CustomizePanel (only show props defined in metadata)

### 10. Components Page and Sidebar Integration

#### ✅ Components Data Registration (`lib/components-data.ts`)
- [ ] Import component sections (e.g., `toggleSections`, `tabsSections`)
- [ ] Create component entries array:
  ```typescript
  const toggleComponentEntries: ComponentInfo[] = toggleSections.map((toggle) => ({
    name: toggle.name,
    description: toggle.description,
    href: `/components/${toggle.slug}`,
    category: "Toggle",
    tags: toggle.tags,
  }))
  
  const tabsComponentEntries: ComponentInfo[] = tabsSections.map((tab) => ({
    name: tab.name,
    description: tab.description,
    href: `/components/${tab.slug}`,
    category: "Tabs",
    tags: tab.tags,
  }))
  ```
- [ ] Add entries to `componentsData` array:
  ```typescript
  export const componentsData: ComponentInfo[] = [
    ...baseComponents,
    ...heroComponentEntries,
    ...toggleComponentEntries, // Add your component entries
    ...tabsComponentEntries, // Add your component entries
    // ... other entries
  ]
  ```
- [ ] Add category to `categories` array:
  ```typescript
  export const categories = [
    "All",
    "Display",
    "Forms",
    "Toggle", // Add your category
    "Tabs", // Add your category
    // ... other categories
  ] as const
  ```

#### ✅ Components Page Sidebar (`app/components/components-page-client.tsx`)
- [ ] Import component sections (e.g., `toggleSections`, `tabsSections`)
- [ ] Add component sections to `customComponents` array:
  ```typescript
  const customComponents: ComponentInfo[] = [
    // ... other components
    ...toggleSections.map(toggle => ({
      name: toggle.name,
      description: toggle.description,
      href: `/components/${toggle.slug}`,
      category: "Toggle",
      tags: toggle.tags || [],
    })),
    ...tabsSections.map(tab => ({
      name: tab.name,
      description: tab.description,
      href: `/components/${tab.slug}`,
      category: "Tabs",
      tags: tab.tags || [],
    }))
  ]
  ```
- [ ] Create filter function:
  ```typescript
  const getToggleComponents = () => {
    return customComponents.filter(c => c.category === "Toggle")
  }
  
  const getTabsComponents = () => {
    return customComponents.filter(c => c.category === "Tabs")
  }
  ```
- [ ] Add sidebar section in `sidebarItems`:
  ```typescript
  const sidebarItems = [
    // ... other sections
    {
      title: "Toggle",
      href: "/components",
      items: getToggleComponents().map((component) => ({
        title: component.name,
        href: component.href,
      })),
    },
    {
      title: "Tabs",
      href: "/components",
      items: [
        ...componentsData.filter(c => c.name === "Tabs").map((component) => ({
          title: component.name,
          href: component.href,
        })),
        ...getTabsComponents().map((component) => ({
          title: component.name,
          href: component.href,
        })),
      ],
    },
  ]
  ```
- [ ] Add category to `customCategories` if needed:
  ```typescript
  const customCategories = [
    "All",
    "Special",
    "Button",
    "Toggle", // Add your category
    "Tabs", // Add your category
    // ... other categories
  ]
  ```

#### ✅ Component Detail Page (`app/components/[slug]/page.tsx`)
- [ ] Import component sections (e.g., `toggleSections`, `tabsSections`)
- [ ] Add to `generateStaticParams`:
  ```typescript
  export function generateStaticParams() {
    const componentSlugs = Object.keys(componentDetails)
    const toggleSlugs = toggleSections.map(toggle => toggle.slug)
    const tabsSlugs = tabsSections.map(tab => tab.slug)
    return [...componentSlugs, ...toggleSlugs, ...tabsSlugs].map((slug) => ({
      slug,
    }))
  }
  ```
- [ ] Find component meta:
  ```typescript
  const toggleMeta = toggleSections.find(t => t.slug === slug)
  const tabsMeta = tabsSections.find(t => t.slug === slug)
  ```
- [ ] Create component detail if not in `componentDetails`:
  ```typescript
  if (toggleMeta && !component) {
    component = {
      name: toggleMeta.name,
      description: toggleMeta.description,
      category: "Toggle",
      hasPlayground: true,
      installation: `import { ${toggleMeta.componentName} } from "@/components/customize/toggles"`,
      usage: `<${toggleMeta.componentName} />`,
      tags: toggleMeta.tags,
      props: Object.entries(toggleMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }
  
  if (tabsMeta && !component) {
    component = {
      name: tabsMeta.name,
      description: tabsMeta.description,
      category: "Tabs",
      hasPlayground: true,
      installation: `import { ${tabsMeta.componentName} } from "@/components/customize/tabs"`,
      usage: `<${tabsMeta.componentName} />`,
      tags: tabsMeta.tags,
      props: Object.entries(tabsMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }
  ```
- [ ] **Add code reading logic (CRITICAL for complete code generation):**
  ```typescript
  if (toggleMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'toggles', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      
      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${toggleMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)
      
      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length
        
        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading toggle component code:", e)
    }
  }
  
  if (tabsMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'tabs', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      
      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${tabsMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)
      
      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length
        
        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading tabs component code:", e)
    }
  }
  ```
  **Note:** This `initialCode` will be passed to `ComponentPlayground` and used to display the complete component implementation code.
- [ ] Pass `initialCode` to `ComponentPlayground`:
  ```typescript
  <ComponentPlayground
    componentName={component.name}
    slug={slug}
    initialCode={initialCode}  // Pass the read code
  />
  ```
- [ ] Pass meta to `ComponentNavigation`:
  ```typescript
  <ComponentNavigation
    currentSlug={slug}
    toggleMeta={toggleMeta}
    tabsMeta={tabsMeta}
    // ... other metas
  />
  ```
- [ ] Add tabs to sidebar items and customComponents:
  ```typescript
  const customComponents: ComponentInfo[] = [
    // ... other components
    ...tabsSections.map(tab => ({
      name: tab.name,
      description: tab.description,
      href: `/components/${tab.slug}`,
      category: "Tabs",
      tags: tab.tags || [],
    }))
  ]
  
  const getTabsComponents = () => {
    return customComponents.filter(c => c.category === "Tabs")
  }
  
  const sidebarItems = [
    // ... other sections
    {
      title: "Tabs",
      href: "/components",
      items: [
        ...componentsData.filter(c => c.name === "Tabs").map((component) => ({
          title: component.name,
          href: component.href,
        })),
        ...getTabsComponents().map((component) => ({
          title: component.name,
          href: component.href,
        })),
      ],
    },
  ]
  
  // Add to getDefaultExpanded
  const categoryToSection: Record<string, string> = {
    "Tabs": "Tabs",
    // ... other categories
  }
  ```

#### ✅ Component Navigation (`components/component-navigation.tsx`)
- [ ] Import component sections (e.g., `toggleSections`, `tabsSections`)
- [ ] Add to interface:
  ```typescript
  interface ComponentNavigationProps {
    // ... other props
    toggleMeta?: typeof toggleSections[number]
    tabsMeta?: typeof tabsSections[number]
  }
  ```
- [ ] Add to function parameters:
  ```typescript
  export function ComponentNavigation({
    // ... other params
    toggleMeta,
    tabsMeta,
  }: ComponentNavigationProps) {
  ```
- [ ] Add to section array type:
  ```typescript
  let sectionArray: typeof heroSections | ... | typeof toggleSections | typeof tabsSections
  ```
- [ ] Add lookup logic:
  ```typescript
  if (toggleMeta) {
    currentSection = toggleMeta
    sectionArray = toggleSections
  } else if (tabsMeta) {
    currentSection = tabsMeta
    sectionArray = tabsSections
  }
  ```

#### ✅ Playground Sidebar (`components/playground/sidebar.tsx`)
- [ ] Add component to `sidebarSections`:
  ```typescript
  {
    id: "components",
    name: "Components",
    icon: Component,
    items: [
      // ... other items
      { id: "toggle", name: "Toggle", type: "component" },
      { id: "tabs", name: "Tabs", type: "component" },
    ],
  }
  ```

### 11. Complete Code Generation Verification

#### ✅ Code Generation Requirements
- [ ] **All components must generate complete, ready-to-use code**
- [ ] Code includes `"use client"` directive when component uses React hooks
- [ ] Code includes all necessary imports (React, hooks, utilities, icons, etc.)
- [ ] Code includes helper functions if component uses them (e.g., `hexToRgb`, `timeToSeconds`)
- [ ] Code includes interface/type definitions if needed
- [ ] Color props are converted from hex to rgb format in generated code
- [ ] Generated code can be copied and used directly without modification

#### ✅ Components with `initialCode` Support
These components read their source code from files and display complete implementation:
- **Section components:** Hero, Feature, Payment, CTA, Footer, Header
- **Custom components:** Button, Input, Badge, Card, Dialog, Toggle, Tabs

**Implementation pattern:**
```typescript
// In component-playground.tsx
if (componentMeta && initialCode) {
  // Check if initialCode already has imports
  if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
    // Add necessary imports and helper functions
    const imports = `"use client"

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
// ... component-specific imports

// Helper functions if needed
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return \`rgb(\${r} \${g} \${b})\`;
};

// Common interfaces if needed
export interface ComponentProps {
  className?: string;
  // ... other props
}

`
    return `${imports}${initialCode}`
  } else {
    // initialCode already has imports, use as-is
    return initialCode
  }
}

// Fallback: Generate usage example if no initialCode
if (componentMeta) {
  // Generate complete usage example with imports and props
  return `"use client"

import { ${componentMeta.componentName} } from "@/components/customize/[path]"

export default function ${componentMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${componentMeta.componentName}${propsString} />
    </div>
  )
}`
}
```

#### ✅ Components without `initialCode` Support
These components generate complete component code directly:
- **Special components:** MediaPlayer, ChatInterface, UrlInput, SocialProfileCard, GlassAuthForm
- **Base shadcn components:** Accordion, Dialog, Dropdown Menu, Label, Select, Separator, Skeleton, Tabs, Textarea, Toast, Toggle, Tooltip

**Implementation pattern:**
```typescript
// Generate complete component code directly
if (componentName === "MediaPlayer") {
  return `"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Play, Pause, SkipBack, SkipForward, Heart, Repeat, Shuffle, Upload } from "lucide-react"

interface MediaPlayerProps {
  // ... complete interface with all props
}

// Helper functions
const timeToSeconds = (time: string): number => {
  const parts = time.split(':')
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  }
  return 0
}

const secondsToTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return \`\${mins}:\${secs.toString().padStart(2, '0')}\`
}

// Complete component implementation
export const MediaPlayer = ({
  className,
  trackTitle = "${props.trackTitle || "Midnight City"}",
  // ... all props with current values
}: MediaPlayerProps) => {
  // ... full component implementation code
}
`
}
```

#### ✅ Code Generation Checklist
- [ ] Component generates complete code (not just JSX snippet)
- [ ] Code includes proper imports (React, hooks, utilities, icons)
- [ ] Code includes `"use client"` if component uses hooks
- [ ] Code includes helper functions if component uses them
- [ ] Code includes interface definitions if component has custom props
- [ ] Color props are converted from hex to rgb format
- [ ] All current prop values are included in generated code
- [ ] Generated code can be copied and used directly without modification
- [ ] Generated code is syntactically correct
- [ ] Generated code produces the same visual result as the playground preview

#### ✅ Code Generation Testing
- [ ] Copy generated code to a new file
- [ ] Verify code runs without errors
- [ ] Verify code produces the same visual result as playground
- [ ] Check all imports are correct and available
- [ ] Verify helper functions work correctly
- [ ] Test with different prop combinations

## Quick Reference: Prop Control Types

| Control Type | Use Case | Example |
|-------------|----------|---------|
| `text` | Single-line text input | `title`, `description` |
| `textarea` | Multi-line text input | `features` (newline-separated), `tabs` (uses TabsEditor) |
| `number` | Numeric input | `count`, `rating` |
| `boolean` | Toggle switch | `showButton`, `isActive` |
| `select` | Dropdown with options | `variant`, `status` |
| `slider` | Range slider | `borderRadius`, `padding` |
| `color` | Color picker (hex) | `backgroundColor`, `textColor` |

**Note:** For Tabs components, the `tabs` prop uses `control: "textarea"` but is rendered with `TabsEditor` (a list-based editor) instead of a regular textarea. This provides a better user experience for managing tab lists.

## Quick Reference: Color Handling Pattern

```typescript
// In component implementation
const colorRgb = color && color.trim() !== "" 
  ? (color.startsWith("rgb") ? color : (hexToRgb(color) || color))
  : undefined;

// In style object
style={{
  ...(colorRgb && { colorProperty: colorRgb }),
}}
```

## Summary

When adding new components:
1. ✅ Define all props in metadata with correct control types
2. ✅ Implement props in component interface and function
3. ✅ Process props correctly in playground render function
4. ✅ Filter props in CustomizePanel to show only defined props
5. ✅ Handle color props with proper conversion and empty value handling
6. ✅ Add component preview support in `component-preview.tsx` (import metadata, component map, add render case)
7. ✅ Register component in `component-playground.tsx` (add to componentConfigs, add render function, add code generation)
8. ✅ **Implement complete code generation** - ensure component generates complete, ready-to-use code:
   - If component has `initialCode` support: Check for imports and add if missing
   - If component doesn't have `initialCode`: Generate complete usage example with all imports
   - Include `"use client"` directive when needed
   - Include all necessary imports, helper functions, and interfaces
   - Convert color props from hex to rgb format
   - Ensure generated code can be copied and used directly
9. ✅ Add component to components data (`lib/components-data.ts`)
10. ✅ Add component to components page sidebar (`app/components/components-page-client.tsx`)
11. ✅ Add component to detail page (`app/components/[slug]/page.tsx` - generateStaticParams, meta lookup, code reading)
12. ✅ Add component to navigation (`components/component-navigation.tsx`)
13. ✅ Add component to playground sidebar (`components/playground/sidebar.tsx`)
14. ✅ Test all props update component correctly
15. ✅ Verify generated code includes all relevant props
16. ✅ **Verify generated code is complete and usable** - test copying and using the generated code

Following this guide ensures all component props are properly connected and functional throughout the component library system, components are accessible from all navigation points, and **all components generate complete, ready-to-use code that can be directly copied and used**.


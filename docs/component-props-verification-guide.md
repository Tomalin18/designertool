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

### 5. Code Generation (`components/component-playground.tsx`)

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

## Quick Reference: Prop Control Types

| Control Type | Use Case | Example |
|-------------|----------|---------|
| `text` | Single-line text input | `title`, `description` |
| `textarea` | Multi-line text input | `features` (newline-separated) |
| `number` | Numeric input | `count`, `rating` |
| `boolean` | Toggle switch | `showButton`, `isActive` |
| `select` | Dropdown with options | `variant`, `status` |
| `slider` | Range slider | `borderRadius`, `padding` |
| `color` | Color picker (hex) | `backgroundColor`, `textColor` |

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
7. ✅ Test all props update component correctly
8. ✅ Verify generated code includes all relevant props

Following this guide ensures all component props are properly connected and functional throughout the component library system.


// Color palette utilities for theme management

export type ColorPalette = {
  name: string
  description: string
  light: string[] // Array of 4 hex colors for light mode
  dark: string[] // Array of 4 hex colors for dark mode
}

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// Convert RGB to linear RGB (0-1 range)
function rgbToLinear(rgb: number): number {
  const normalized = rgb / 255
  return normalized <= 0.04045
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4)
}

// Convert linear RGB to OKLab
function linearRgbToOklab(r: number, g: number, b: number): { L: number; a: number; b: number } {
  // Convert linear RGB to OKLab
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  }
}

// Convert OKLab to OKLCH
function oklabToOklch(lab: { L: number; a: number; b: number }): { L: number; C: number; H: number } {
  const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b)
  let H = Math.atan2(lab.b, lab.a) * (180 / Math.PI)
  if (H < 0) H += 360
  return { L: lab.L, C, H }
}

// Convert hex color to oklch format
export function hexToOklch(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex // Fallback to hex if conversion fails

  const rLinear = rgbToLinear(rgb.r)
  const gLinear = rgbToLinear(rgb.g)
  const bLinear = rgbToLinear(rgb.b)

  const oklab = linearRgbToOklab(rLinear, gLinear, bLinear)
  const oklch = oklabToOklch(oklab)

  // Format: oklch(L C H)
  // Round values for cleaner output
  return `oklch(${Math.round(oklch.L * 1000) / 1000} ${Math.round(oklch.C * 1000) / 1000} ${Math.round(oklch.H * 100) / 100})`
}

// Generate dark mode colors from light mode colors
// This adjusts brightness and contrast for dark mode
function generateDarkColors(lightColors: string[]): string[] {
  return lightColors.map((color) => {
    const rgb = hexToRgb(color)
    if (!rgb) return color

    // For dark mode, we want darker, more saturated versions
    // Adjust brightness: make darker colors lighter, light colors darker
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000

    if (brightness < 128) {
      // Dark color - make it lighter for dark mode
      const factor = 1.3
      return `#${Math.min(255, Math.round(rgb.r * factor))
        .toString(16)
        .padStart(2, '0')}${Math.min(255, Math.round(rgb.g * factor))
        .toString(16)
        .padStart(2, '0')}${Math.min(255, Math.round(rgb.b * factor))
        .toString(16)
        .padStart(2, '0')}`
    } else {
      // Light color - make it darker for dark mode
      const factor = 0.6
      return `#${Math.max(0, Math.round(rgb.r * factor))
        .toString(16)
        .padStart(2, '0')}${Math.max(0, Math.round(rgb.g * factor))
        .toString(16)
        .padStart(2, '0')}${Math.max(0, Math.round(rgb.b * factor))
        .toString(16)
        .padStart(2, '0')}`
    }
  })
}

// Color palettes with light and dark variants
export const colorPalettes: ColorPalette[] = [
  {
    name: "Pikachu",
    description: "Electric yellow with bold accents",
    light: ["#FFD700", "#FFA500", "#000000", "#FF0000"],
    dark: ["#FFE44D", "#FFB84D", "#333333", "#FF4444"],
  },
  {
    name: "Bulbasaur",
    description: "Fresh green garden vibes",
    light: ["#49D0B0", "#78C850", "#5A9F8C", "#2B5E4E"],
    dark: ["#5FE0D0", "#88D860", "#6AAF9C", "#3B6E5E"],
  },
  {
    name: "Charmander",
    description: "Fiery warm orange palette",
    light: ["#F08030", "#FF4500", "#FFD700", "#FFA500"],
    dark: ["#FF9040", "#FF5500", "#FFE700", "#FFB500"],
  },
  {
    name: "Squirtle",
    description: "Cool blue water tones",
    light: ["#6890F0", "#4F8EC9", "#9DD4FF", "#2B5E8C"],
    dark: ["#78A0FF", "#5F9ED9", "#ADE4FF", "#3B6EAC"],
  },
  {
    name: "Jigglypuff",
    description: "Soft pink dreamland",
    light: ["#FFB3D9", "#FF69B4", "#FFC0CB", "#FF1493"],
    dark: ["#FFC3E9", "#FF79C4", "#FFD0DB", "#FF2493"],
  },
  {
    name: "Gengar",
    description: "Mysterious purple shadows",
    light: ["#705898", "#9B4F96", "#483D8B", "#301934"],
    dark: ["#8068A8", "#AB5FA6", "#584D9B", "#402944"],
  },
  {
    name: "Eevee",
    description: "Warm brown earthy tones",
    light: ["#D4A373", "#8B6F47", "#F4E4C1", "#5C4033"],
    dark: ["#E4B383", "#9B7F57", "#FFF4D1", "#6C5043"],
  },
  {
    name: "Mewtwo",
    description: "Psychic lavender hues",
    light: ["#A95FA4", "#D291BC", "#7B5C8F", "#E8B4E8"],
    dark: ["#B96FB4", "#E2A1CC", "#8B6C9F", "#F8C4F8"],
  },
  {
    name: "Charizard",
    description: "Intense dragon fire",
    light: ["#FF6F00", "#D84315", "#FFA726", "#BF360C"],
    dark: ["#FF7F10", "#E85325", "#FFB736", "#CF460C"],
  },
  {
    name: "Dragonite",
    description: "Sunset orange warmth",
    light: ["#FFB74D", "#FF9800", "#FFF3E0", "#F57C00"],
    dark: ["#FFC75D", "#FFA810", "#FFFFF0", "#FF8C10"],
  },
  {
    name: "Snorlax",
    description: "Calm slate gray",
    light: ["#37474F", "#263238", "#B0BEC5", "#546E7A"],
    dark: ["#47575F", "#364348", "#C0CED5", "#647E8A"],
  },
  {
    name: "Lapras",
    description: "Ocean blue depths",
    light: ["#0288D1", "#01579B", "#B3E5FC", "#4FC3F7"],
    dark: ["#1298E1", "#1167AB", "#C3F5FC", "#5FD3FF"],
  },
  {
    name: "Mew",
    description: "Playful pink energy",
    light: ["#F8BBD0", "#E91E63", "#FCE4EC", "#C2185B"],
    dark: ["#FFCBE0", "#F92E73", "#FCF4FC", "#D2286B"],
  },
  {
    name: "Gyarados",
    description: "Stormy blue and red",
    light: ["#1976D2", "#0D47A1", "#D32F2F", "#B71C1C"],
    dark: ["#2986E2", "#1D57B1", "#E33F3F", "#C72C2C"],
  },
  {
    name: "Articuno",
    description: "Icy light blue",
    light: ["#81D4FA", "#4FC3F7", "#E1F5FE", "#0277BD"],
    dark: ["#91E4FA", "#5FD3FF", "#F1F5FE", "#1287CD"],
  },
  {
    name: "Zapdos",
    description: "Electric bright yellow",
    light: ["#FFF176", "#FBC02D", "#FFF9C4", "#F57F17"],
    dark: ["#FFFF86", "#FFD03D", "#FFFFD4", "#FF8F27"],
  },
  {
    name: "Moltres",
    description: "Flame orange red",
    light: ["#FF7043", "#E64A19", "#FFCCBC", "#BF360C"],
    dark: ["#FF8053", "#F65A29", "#FFDCCC", "#CF460C"],
  },
  {
    name: "Vaporeon",
    description: "Aqua teal waters",
    light: ["#4DD0E1", "#00ACC1", "#B2EBF2", "#006064"],
    dark: ["#5DE0F1", "#10BCD1", "#C2FBF2", "#107074"],
  },
  {
    name: "Jolteon",
    description: "Lightning yellow spark",
    light: ["#FFEB3B", "#F9A825", "#FFF59D", "#F57F17"],
    dark: ["#FFFF4B", "#FFB835", "#FFFFAD", "#FF8F27"],
  },
  {
    name: "Flareon",
    description: "Blazing amber fire",
    light: ["#FF6F00", "#E65100", "#FFD54F", "#EF6C00"],
    dark: ["#FF7F10", "#F66110", "#FFE55F", "#FF7C10"],
  },
  {
    name: "Umbreon",
    description: "Dark night with gold",
    light: ["#212121", "#000000", "#FFD600", "#616161"],
    dark: ["#313131", "#101010", "#FFE600", "#717171"],
  },
  {
    name: "Espeon",
    description: "Mystic purple dawn",
    light: ["#AB47BC", "#6A1B9A", "#E1BEE7", "#8E24AA"],
    dark: ["#BB57CC", "#7A2BAA", "#F1CEF7", "#9E34BA"],
  },
  {
    name: "Leafeon",
    description: "Fresh leaf green",
    light: ["#66BB6A", "#388E3C", "#C8E6C9", "#2E7D32"],
    dark: ["#76CB7A", "#489E4C", "#D8F6D9", "#3E8D42"],
  },
  {
    name: "Glaceon",
    description: "Frozen ice crystal",
    light: ["#4FC3F7", "#0288D1", "#B3E5FC", "#01579B"],
    dark: ["#5FD3FF", "#1298E1", "#C3F5FC", "#1167AB"],
  },
  {
    name: "Sylveon",
    description: "Fairy pink ribbon",
    light: ["#F8BBD0", "#EC407A", "#FCE4EC", "#C2185B"],
    dark: ["#FFCBE0", "#FC508A", "#FCF4FC", "#D2286B"],
  },
  {
    name: "Lucario",
    description: "Steel blue aura",
    light: ["#0277BD", "#01579B", "#78909C", "#37474F"],
    dark: ["#1287CD", "#1167AB", "#88A0AC", "#47575F"],
  },
  {
    name: "Rayquaza",
    description: "Sky dragon emerald",
    light: ["#558B2F", "#33691E", "#212121", "#1B5E20"],
    dark: ["#659B3F", "#43792E", "#313131", "#2B6E30"],
  },
  {
    name: "Kyogre",
    description: "Deep sea sapphire",
    light: ["#1565C0", "#0D47A1", "#E3F2FD", "#1976D2"],
    dark: ["#2575D0", "#1D57B1", "#F3F2FD", "#2986E2"],
  },
  {
    name: "Groudon",
    description: "Earth magma red",
    light: ["#D32F2F", "#B71C1C", "#FF6F00", "#E65100"],
    dark: ["#E33F3F", "#C72C2C", "#FF7F10", "#F66110"],
  },
  {
    name: "Dialga",
    description: "Time steel blue",
    light: ["#607D8B", "#455A64", "#90CAF9", "#1976D2"],
    dark: ["#708D9B", "#556A74", "#A0DAF9", "#2986E2"],
  },
  {
    name: "Palkia",
    description: "Space pearl purple",
    light: ["#AD1457", "#880E4F", "#E1BEE7", "#AB47BC"],
    dark: ["#BD2467", "#981E5F", "#F1CEF7", "#BB57CC"],
  },
  {
    name: "Giratina",
    description: "Shadow realm dark",
    light: ["#424242", "#212121", "#EF5350", "#C62828"],
    dark: ["#525252", "#313131", "#FF6360", "#D63838"],
  },
  {
    name: "Arceus",
    description: "Divine white gold",
    light: ["#FAFAFA", "#BDBDBD", "#FDD835", "#F57F17"],
    dark: ["#FFFFFF", "#CDCDCD", "#FFE845", "#FF8F27"],
  },
  {
    name: "Victini",
    description: "Victory flame gold",
    light: ["#FFD54F", "#FFA000", "#FF6F00", "#E65100"],
    dark: ["#FFE55F", "#FFB010", "#FF7F10", "#F66110"],
  },
  {
    name: "Zekrom",
    description: "Thunder black blue",
    light: ["#212121", "#000000", "#0288D1", "#01579B"],
    dark: ["#313131", "#101010", "#1298E1", "#1167AB"],
  },
  {
    name: "Reshiram",
    description: "Truth white fire",
    light: ["#FAFAFA", "#E0E0E0", "#EF5350", "#D32F2F"],
    dark: ["#FFFFFF", "#F0F0F0", "#FF6360", "#E33F3F"],
  },
  {
    name: "Kyurem",
    description: "Ice dragon cyan",
    light: ["#4DD0E1", "#00ACC1", "#FFD54F", "#F9A825"],
    dark: ["#5DE0F1", "#10BCD1", "#FFE55F", "#FFB835"],
  },
  {
    name: "Xerneas",
    description: "Life rainbow blue",
    light: ["#42A5F5", "#1976D2", "#F06292", "#C2185B"],
    dark: ["#52B5FF", "#2986E2", "#FF72A2", "#D2286B"],
  },
  {
    name: "Yveltal",
    description: "Destruction dark red",
    light: ["#E53935", "#B71C1C", "#212121", "#424242"],
    dark: ["#F54945", "#C72C2C", "#313131", "#525252"],
  },
  {
    name: "Zygarde",
    description: "Order earth green",
    light: ["#66BB6A", "#388E3C", "#212121", "#00E676"],
    dark: ["#76CB7A", "#489E4C", "#313131", "#10F686"],
  },
  {
    name: "Solgaleo",
    description: "Sun radiant gold",
    light: ["#FFECB3", "#FF8F00", "#FAFAFA", "#F57F17"],
    dark: ["#FFFFC3", "#FF9F10", "#FFFFFF", "#FF8F27"],
  },
  {
    name: "Lunala",
    description: "Moon cosmic purple",
    light: ["#9C27B0", "#4A148C", "#7C4DFF", "#311B92"],
    dark: ["#AC37C0", "#5A249C", "#8C5DFF", "#4121A2"],
  },
  {
    name: "Necrozma",
    description: "Prism dark light",
    light: ["#424242", "#212121", "#FFD600", "#FBC02D"],
    dark: ["#525252", "#313131", "#FFE600", "#FFD03D"],
  },
  {
    name: "Ocean Breeze",
    description: "Calm ocean waves",
    light: ["#006994", "#13ABC4", "#7FD1DE", "#B8E6F0"],
    dark: ["#1079A4", "#23BBD4", "#8FE1EE", "#C8F6FF"],
  },
  {
    name: "Sunset Glow",
    description: "Golden hour warmth",
    light: ["#FF6B35", "#F7931E", "#FDC830", "#FFE66D"],
    dark: ["#FF7B45", "#FFA32E", "#FFD840", "#FFFF7D"],
  },
  {
    name: "Forest Deep",
    description: "Dense woodland",
    light: ["#2D4A2B", "#5C8D5A", "#9BCF99", "#D4E8D3"],
    dark: ["#3D5A3B", "#6C9D6A", "#ABDFA9", "#E4F8E3"],
  },
  {
    name: "Lavender Dream",
    description: "Soft purple haze",
    light: ["#B39CD0", "#D4AADB", "#E6CEF0", "#F5E6FF"],
    dark: ["#C3ACE0", "#E4BAEB", "#F6DEF0", "#FFFFF0"],
  },
  {
    name: "Cherry Blossom",
    description: "Spring petal pink",
    light: ["#FFB7C5", "#FFC8DD", "#FFDDEB", "#FFF0F5"],
    dark: ["#FFC7D5", "#FFD8ED", "#FFEDFB", "#FFFFF5"],
  },
  {
    name: "Mint Fresh",
    description: "Cool mint breeze",
    light: ["#3EB489", "#5FD3A5", "#8BE6C1", "#B8F2DD"],
    dark: ["#4EC499", "#6FE3B5", "#9BF6D1", "#C8FFED"],
  },
  {
    name: "Coral Reef",
    description: "Vibrant coral life",
    light: ["#FF6F61", "#FF8F7F", "#FFAF9D", "#FFCFBB"],
    dark: ["#FF7F71", "#FF9F8F", "#FFBFAD", "#FFDFCB"],
  },
  {
    name: "Midnight Sky",
    description: "Starry night blue",
    light: ["#191970", "#4169E1", "#6495ED", "#87CEEB"],
    dark: ["#292980", "#5179F1", "#74A5FD", "#97DEFB"],
  },
  {
    name: "Golden Hour",
    description: "Warm sunset beige",
    light: ["#C89F5F", "#E0C097", "#F5E1CF", "#FFF8E7"],
    dark: ["#D8AF6F", "#F0D0A7", "#FFFFDF", "#FFFFF7"],
  },
  {
    name: "Berry Mix",
    description: "Rich fruit tones",
    light: ["#8E44AD", "#C0392B", "#E74C3C", "#F39C12"],
    dark: ["#9E54BD", "#D0493B", "#F75C4C", "#FFAC22"],
  },
  {
    name: "Tropical",
    description: "Exotic paradise",
    light: ["#16A085", "#27AE60", "#F39C12", "#E74C3C"],
    dark: ["#26B095", "#37BE70", "#FFAC22", "#F75C4C"],
  },
  {
    name: "Vintage",
    description: "Classic sepia tone",
    light: ["#8B7355", "#A0826D", "#C9B299", "#E8DCC7"],
    dark: ["#9B8365", "#B0927D", "#D9C2A9", "#F8ECD7"],
  },
]

// Get palette by name
export function getPaletteByName(name: string): ColorPalette | undefined {
  return colorPalettes.find((p) => p.name === name)
}

// Get default palette
export function getDefaultPalette(): ColorPalette {
  return colorPalettes[0]
}

// Apply palette colors to CSS variables
// This function applies both light and dark mode colors at once
export function applyPaletteToDocument(palette: ColorPalette, currentThemeMode: "light" | "dark"): void {
  if (typeof window === "undefined") return

  const root = document.documentElement

  // Apply light mode colors to :root
  const lightColors = palette.light
  root.style.setProperty("--primary", hexToOklch(lightColors[0]), "important")
  root.style.setProperty("--secondary", hexToOklch(lightColors[1]), "important")
  root.style.setProperty("--accent", hexToOklch(lightColors[2]), "important")
  root.style.setProperty("--ring", hexToOklch(lightColors[3]), "important")

  // Apply dark mode colors using a style element or data attribute approach
  // Since we can't directly target .dark selector, we'll use CSS custom properties
  // that will be overridden when dark class is present
  const darkColors = palette.dark

  // Create or update a style element for dark mode overrides
  let darkStyleElement = document.getElementById("dark-palette-override")
  if (!darkStyleElement) {
    darkStyleElement = document.createElement("style")
    darkStyleElement.id = "dark-palette-override"
    document.head.appendChild(darkStyleElement)
  }

  darkStyleElement.textContent = `
    .dark {
      --primary: ${hexToOklch(darkColors[0])} !important;
      --secondary: ${hexToOklch(darkColors[1])} !important;
      --accent: ${hexToOklch(darkColors[2])} !important;
      --ring: ${hexToOklch(darkColors[3])} !important;
      --sidebar-primary: ${hexToOklch(darkColors[0])} !important;
      --sidebar-accent: ${hexToOklch(darkColors[2])} !important;
      --sidebar-ring: ${hexToOklch(darkColors[3])} !important;
    }
  `

  // Also update sidebar colors for light mode
  root.style.setProperty("--sidebar-primary", hexToOklch(lightColors[0]), "important")
  root.style.setProperty("--sidebar-accent", hexToOklch(lightColors[2]), "important")
  root.style.setProperty("--sidebar-ring", hexToOklch(lightColors[3]), "important")
}

// Reset to default colors (from globals.css)
export function resetPaletteToDefault(): void {
  if (typeof window === "undefined") return

  const root = document.documentElement
  // Remove custom color overrides to revert to default CSS values
  root.style.removeProperty("--primary")
  root.style.removeProperty("--secondary")
  root.style.removeProperty("--accent")
  root.style.removeProperty("--ring")
  root.style.removeProperty("--sidebar-primary")
  root.style.removeProperty("--sidebar-accent")
  root.style.removeProperty("--sidebar-ring")

  // Remove dark mode style override
  const darkStyleElement = document.getElementById("dark-palette-override")
  if (darkStyleElement) {
    darkStyleElement.remove()
  }
}



export type ButtonPropControl =
    | "text"
    | "boolean"
    | "select"
    | "slider"
    | "color"

export interface ButtonPropDefinition {
    control: ButtonPropControl
    default: string | number | boolean
    description: string
    options?: string[]
    min?: number
    max?: number
}

export interface ButtonGroupingConfig {
    type: "tabs"
    tabs: {
        name: string
        label: string
        keys: string[]
    }[]
    hiddenProps?: string[]
}

export interface ButtonSectionMeta {
    slug: string
    name: string
    componentName: string
    description: string
    tags: string[]
    props: Record<string, ButtonPropDefinition>
    category: string
    groupingConfig?: ButtonGroupingConfig
}

const defaultButtonProps: Record<string, ButtonPropDefinition> = {
    children: {
        control: "text",
        default: "Button",
        description: "The text to display on the button.",
    },
}

const buttonWithClassNameProps: Record<string, ButtonPropDefinition> = {
    ...defaultButtonProps,
    className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the button.",
    },
}

// Extended props for buttons that support more customization
const extendedButtonProps: Record<string, ButtonPropDefinition> = {
    ...defaultButtonProps,
    className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the button.",
    },
    size: {
        control: "select",
        default: "default",
        options: ["sm", "default", "lg"],
        description: "The size of the button.",
    },
    borderRadius: {
        control: "slider",
        default: 8,
        min: 0,
        max: 24,
        description: "Border radius in pixels.",
    },
    paddingX: {
        control: "slider",
        default: 32,
        min: 8,
        max: 64,
        description: "Horizontal padding in pixels.",
    },
    paddingY: {
        control: "slider",
        default: 12,
        min: 4,
        max: 32,
        description: "Vertical padding in pixels.",
    },
    backgroundColor: {
        control: "color",
        default: "",
        description: "Background color of the button.",
    },
    textColor: {
        control: "color",
        default: "",
        description: "Text color of the button.",
    },
    borderColor: {
        control: "color",
        default: "",
        description: "Border color of the button.",
    },
    borderWidth: {
        control: "slider",
        default: 0,
        min: 0,
        max: 4,
        description: "Border width in pixels.",
    },
}

// Animation-related props for specific buttons
const animationProps = {
    animationDuration: {
        control: "slider",
        default: 300,
        min: 100,
        max: 2000,
        description: "Animation duration in milliseconds.",
    },
    animationSpeed: {
        control: "slider",
        default: 1,
        min: 0.5,
        max: 3,
        description: "Animation speed multiplier.",
    },
    shimmerSpeed: {
        control: "slider",
        default: 2,
        min: 0.5,
        max: 5,
        description: "Shimmer animation speed in seconds.",
    },
    pulseSpeed: {
        control: "slider",
        default: 1,
        min: 0.5,
        max: 3,
        description: "Pulse animation speed multiplier.",
    },
    glowIntensity: {
        control: "slider",
        default: 0.5,
        min: 0,
        max: 1,
        description: "Glow effect intensity.",
    },
    magneticStrength: {
        control: "slider",
        default: 0.3,
        min: 0.1,
        max: 1,
        description: "Magnetic effect strength.",
    },
    rippleSize: {
        control: "slider",
        default: 500,
        min: 200,
        max: 1000,
        description: "Ripple effect size in pixels.",
    },
    holdDuration: {
        control: "slider",
        default: 1000,
        min: 500,
        max: 3000,
        description: "Hold duration in milliseconds.",
    },
    spinSpeed: {
        control: "slider",
        default: 2,
        min: 0.5,
        max: 5,
        description: "Spin animation speed in seconds.",
    },
    flickerSpeed: {
        control: "slider",
        default: 0.1,
        min: 0.05,
        max: 0.5,
        description: "Flicker animation speed in seconds.",
    },
    elasticScale: {
        control: "slider",
        default: 1.1,
        min: 1.05,
        max: 1.5,
        description: "Elastic scale multiplier on hover.",
    },
}

// Color props for specific buttons
const colorProps = {
    glowColor: {
        control: "color",
        default: "",
        description: "Glow effect color.",
    },
    shimmerColor: {
        control: "color",
        default: "",
        description: "Shimmer effect color.",
    },
    hoverColor: {
        control: "color",
        default: "",
        description: "Hover state color.",
    },
    fillColor: {
        control: "color",
        default: "",
        description: "Fill effect color.",
    },
}

// Button-specific color props
const buttonSpecificProps = {
    // Pixel Art Button
    shadowLayerColor: {
        control: "color",
        default: "#d4d4d4",
        description: "Shadow layer color for pixel art effect.",
    },
    mainButtonColor: {
        control: "color",
        default: "#facc15",
        description: "Main button color.",
    },
    pixelBorderColor: {
        control: "color",
        default: "#000000",
        description: "Pixel border color.",
    },
    // Glitch Button
    glitchColor1: {
        control: "color",
        default: "#06b6d4",
        description: "First glitch effect color.",
    },
    glitchColor2: {
        control: "color",
        default: "#ef4444",
        description: "Second glitch effect color.",
    },
    glitchBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Glitch button background color.",
    },
    // Neumorphic Button
    neumorphicBgColor: {
        control: "color",
        default: "#e0e5ec",
        description: "Neumorphic background color.",
    },
    neumorphicTextColor: {
        control: "color",
        default: "#4d5b7c",
        description: "Neumorphic text color.",
    },
    neumorphicShadowLight: {
        control: "color",
        default: "#ffffff",
        description: "Neumorphic light shadow color.",
    },
    neumorphicShadowDark: {
        control: "color",
        default: "#b8b9be",
        description: "Neumorphic dark shadow color.",
    },
    // Gradient Border Button
    gradientFrom: {
        control: "color",
        default: "#ec4899",
        description: "Gradient start color.",
    },
    gradientVia: {
        control: "color",
        default: "#a855f7",
        description: "Gradient middle color.",
    },
    gradientTo: {
        control: "color",
        default: "#6366f1",
        description: "Gradient end color.",
    },
    innerBgColor: {
        control: "color",
        default: "#000000",
        description: "Inner background color.",
    },
    // Swipe Buttons
    swipeFillColor: {
        control: "color",
        default: "",
        description: "Swipe fill color on hover.",
    },
    swipeRightFillColor: {
        control: "color",
        default: "#2563eb",
        description: "Swipe right fill color.",
    },
    swipeUpFillColor: {
        control: "color",
        default: "#9333ea",
        description: "Swipe up fill color.",
    },
    swipeLeftFillColor: {
        control: "color",
        default: "#dc2626",
        description: "Swipe left fill color.",
    },
    swipeDownFillColor: {
        control: "color",
        default: "#ea580c",
        description: "Swipe down fill color.",
    },
    scaleUpFillColor: {
        control: "color",
        default: "#db2777",
        description: "Scale up fill color.",
    },
    // Clay Button
    shadowLightColor: {
        control: "color",
        default: "#ffffff",
        description: "Light shadow color.",
    },
    shadowDarkColor: {
        control: "color",
        default: "#d1d1d4",
        description: "Dark shadow color.",
    },
    // 3D Press Button
    pressBorderColor: {
        control: "color",
        default: "#1e40af",
        description: "3D press border color.",
    },
    pressShadowColor: {
        control: "color",
        default: "#1e40af",
        description: "3D press shadow color.",
    },
    // Ripple Button
    rippleColor: {
        control: "color",
        default: "#10b981",
        description: "Ripple button background color.",
    },
    // Ghost Hover Button
    ghostBorderColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.2)",
        description: "Ghost button border color.",
    },
    // Spotlight Button
    spotlightColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.15)",
        description: "Spotlight effect color.",
    },
    // Glassmorphism Button
    glassBorderColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.2)",
        description: "Glass border color.",
    },
    glassBgColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.1)",
        description: "Glass background color.",
    },
    // Elastic Button
    elasticBgColor: {
        control: "color",
        default: "#f97316",
        description: "Elastic button background color.",
    },
    // Status Loading Button
    idleBgColor: {
        control: "color",
        default: "#4f46e5",
        description: "Idle state background color.",
    },
    loadingBgColor: {
        control: "color",
        default: "#818cf8",
        description: "Loading state background color.",
    },
    successBgColor: {
        control: "color",
        default: "#22c55e",
        description: "Success state background color.",
    },
    // Copy Clipboard Button
    copyBorderColor: {
        control: "color",
        default: "#404040",
        description: "Copy button border color.",
    },
    copyBgColor: {
        control: "color",
        default: "#262626",
        description: "Copy button background color.",
    },
    copiedBorderColor: {
        control: "color",
        default: "#22c55e",
        description: "Copied state border color.",
    },
    copiedBgColor: {
        control: "color",
        default: "rgba(34, 197, 94, 0.1)",
        description: "Copied state background color.",
    },
    // Download Progress Button
    progressBgColor: {
        control: "color",
        default: "#16a34a",
        description: "Download progress background color.",
    },
    // Social Share Button
    socialBgColor: {
        control: "color",
        default: "#2563eb",
        description: "Social share button background color.",
    },
    // Draw Border Button
    drawBorderColor: {
        control: "color",
        default: "#60a5fa",
        description: "Draw border color.",
    },
    // Dotted Border Button
    dottedBorderColor: {
        control: "color",
        default: "#525252",
        description: "Dotted border color.",
    },
    // Gradient Ring Button
    gradientRingFrom: {
        control: "color",
        default: "#ec4899",
        description: "Gradient ring start color.",
    },
    gradientRingVia: {
        control: "color",
        default: "#ef4444",
        description: "Gradient ring middle color.",
    },
    gradientRingTo: {
        control: "color",
        default: "#eab308",
        description: "Gradient ring end color.",
    },
    // Cyber Button
    cyberBorderColor: {
        control: "color",
        default: "#facc15",
        description: "Cyber button border color.",
    },
    cyberBgColor: {
        control: "color",
        default: "rgba(250, 204, 21, 0.1)",
        description: "Cyber button background color.",
    },
    cyberAccentColor: {
        control: "color",
        default: "#facc15",
        description: "Cyber button accent color.",
    },
    // Retro 95 Button
    retroBgColor: {
        control: "color",
        default: "#d4d4d4",
        description: "Retro 95 button background color.",
    },
    retroBorderLightColor: {
        control: "color",
        default: "#ffffff",
        description: "Retro 95 light border color.",
    },
    retroBorderDarkColor: {
        control: "color",
        default: "#171717",
        description: "Retro 95 dark border color.",
    },
    // Skeuo Button
    skeuoGradientFrom: {
        control: "color",
        default: "#737373",
        description: "Skeuo gradient start color.",
    },
    skeuoGradientTo: {
        control: "color",
        default: "#525252",
        description: "Skeuo gradient end color.",
    },
    skeuoBorderColor: {
        control: "color",
        default: "#404040",
        description: "Skeuo border color.",
    },
    // Shake Error Button
    errorBgColor: {
        control: "color",
        default: "#dc2626",
        description: "Error button background color.",
    },
    // Confetti Button
    confettiGradientFrom: {
        control: "color",
        default: "#60a5fa",
        description: "Confetti gradient start color.",
    },
    confettiGradientTo: {
        control: "color",
        default: "#a855f7",
        description: "Confetti gradient end color.",
    },
    // Hold Button
    holdProgressColor: {
        control: "color",
        default: "#16a34a",
        description: "Hold progress color.",
    },
    // Delete Button
    deleteIdleBgColor: {
        control: "color",
        default: "#262626",
        description: "Delete button idle background color.",
    },
    deleteConfirmBgColor: {
        control: "color",
        default: "#dc2626",
        description: "Delete button confirm background color.",
    },
    // Like Button
    likeBorderColor: {
        control: "color",
        default: "#404040",
        description: "Like button border color.",
    },
    likeBgColor: {
        control: "color",
        default: "transparent",
        description: "Like button background color.",
    },
    likedBorderColor: {
        control: "color",
        default: "#ec4899",
        description: "Liked state border color.",
    },
    likedBgColor: {
        control: "color",
        default: "#fdf2f8",
        description: "Liked state background color.",
    },
    likedTextColor: {
        control: "color",
        default: "#ec4899",
        description: "Liked state text color.",
    },
    // Skew Button
    skewBorderColor: {
        control: "color",
        default: "#ffffff",
        description: "Skew button border color.",
    },
    // Blob Button
    blobBgColor: {
        control: "color",
        default: "#6366f1",
        description: "Blob button background color.",
    },
    // Underline Button
    underlineColor: {
        control: "color",
        default: "#ffffff",
        description: "Underline color.",
    },
    // Bracket Button
    bracketColor: {
        control: "color",
        default: "#ffffff",
        description: "Bracket color.",
    },
    // Curtain Button
    curtainBgColor: {
        control: "color",
        default: "#262626",
        description: "Curtain button background color.",
    },
    curtainRevealBgColor: {
        control: "color",
        default: "#ffffff",
        description: "Curtain reveal background color.",
    },
    curtainRevealTextColor: {
        control: "color",
        default: "#000000",
        description: "Curtain reveal text color.",
    },
    // Slice Button
    sliceBgColor: {
        control: "color",
        default: "#2563eb",
        description: "Slice button background color.",
    },
    // Wet Paint Button
    wetPaintBgColor: {
        control: "color",
        default: "#262626",
        description: "Wet paint button background color.",
    },
    // Particle Button
    particleColor: {
        control: "color",
        default: "#ffffff",
        description: "Particle color.",
    },
    // Isometric Button
    isometricBgColor: {
        control: "color",
        default: "#e5e7eb",
        description: "Isometric button background color.",
    },
    isometricBorderColor: {
        control: "color",
        default: "#d1d5db",
        description: "Isometric button border color.",
    },
    isometricShadowColor: {
        control: "color",
        default: "rgba(0, 0, 0, 0.2)",
        description: "Isometric button shadow color.",
    },
    // Paper Fold Button
    paperFoldBgColor: {
        control: "color",
        default: "#ffffff",
        description: "Paper fold button background color.",
    },
    paperFoldAccentColor: {
        control: "color",
        default: "#d1d5db",
        description: "Paper fold accent color.",
    },
    // Text Fill Button
    textFillBorderColor: {
        control: "color",
        default: "#ffffff",
        description: "Text fill border color.",
    },
    textFillBgColor: {
        control: "color",
        default: "#ffffff",
        description: "Text fill background color.",
    },
    // Icon Slide Button
    iconSlideBgColor: {
        control: "color",
        default: "#2563eb",
        description: "Icon slide button background color.",
    },
    // Multi Layer Button
    multiLayerColor1: {
        control: "color",
        default: "#ec4899",
        description: "Multi layer first color.",
    },
    multiLayerColor2: {
        control: "color",
        default: "#3b82f6",
        description: "Multi layer second color.",
    },
    multiLayerBgColor: {
        control: "color",
        default: "#ffffff",
        description: "Multi layer button background color.",
    },
    multiLayerBorderColor: {
        control: "color",
        default: "#000000",
        description: "Multi layer button border color.",
    },
    // Upload Button
    uploadBgColor: {
        control: "color",
        default: "#262626",
        description: "Upload button background color.",
    },
    // Toggle Switch Button
    toggleOnColor: {
        control: "color",
        default: "#22c55e",
        description: "Toggle switch on color.",
    },
    toggleOffColor: {
        control: "color",
        default: "#525252",
        description: "Toggle switch off color.",
    },
    // Double Border Button
    doubleBorderColor: {
        control: "color",
        default: "#ffffff",
        description: "Double border color.",
    },
    // Spinning Border Button
    spinningBorderGradientFrom: {
        control: "color",
        default: "#000000",
        description: "Spinning border gradient start color.",
    },
    spinningBorderGradientVia: {
        control: "color",
        default: "#ffffff",
        description: "Spinning border gradient middle color.",
    },
    spinningBorderGradientTo: {
        control: "color",
        default: "#000000",
        description: "Spinning border gradient end color.",
    },
    // Letter Spacing Button
    letterSpacingBorderColor: {
        control: "color",
        default: "#737373",
        description: "Letter spacing button border color.",
    },
    // Blur Reveal Button
    blurRevealColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.2)",
        description: "Blur reveal effect color.",
    },
    // Vaporwave Button
    vaporwaveGradientFrom: {
        control: "color",
        default: "#ec4899",
        description: "Vaporwave gradient start color.",
    },
    vaporwaveGradientTo: {
        control: "color",
        default: "#06b6d4",
        description: "Vaporwave gradient end color.",
    },
    vaporwaveShadowColor: {
        control: "color",
        default: "#000000",
        description: "Vaporwave shadow color.",
    },
    // Save Button
    saveBgColor: {
        control: "color",
        default: "#2563eb",
        description: "Save button background color.",
    },
    // Print Button
    printBorderColor: {
        control: "color",
        default: "#525252",
        description: "Print button border color.",
    },
    printBgColor: {
        control: "color",
        default: "transparent",
        description: "Print button background color.",
    },
    // Notification Button
    notificationBgColor: {
        control: "color",
        default: "#262626",
        description: "Notification button background color.",
    },
    notificationBadgeColor: {
        control: "color",
        default: "#ef4444",
        description: "Notification badge color.",
    },
    // Circle to Square Button
    circleToSquareBgColor: {
        control: "color",
        default: "#ffffff",
        description: "Circle to square button background color.",
    },
    // Morph FAB Button
    morphFabBgColor: {
        control: "color",
        default: "#4f46e5",
        description: "Morph FAB button background color.",
    },
    morphFabHoverBgColor: {
        control: "color",
        default: "#dc2626",
        description: "Morph FAB button hover background color.",
    },
    // Shiny Reflection Button
    shinyReflectionBgColor: {
        control: "color",
        default: "#262626",
        description: "Shiny reflection button background color.",
    },
    shinyReflectionBorderColor: {
        control: "color",
        default: "#404040",
        description: "Shiny reflection button border color.",
    },
    // Dot Hover Button
    dotHoverColor: {
        control: "color",
        default: "#818cf8",
        description: "Dot hover indicator color.",
    },
    // Text Marquee Button
    marqueeBorderColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.2)",
        description: "Text marquee border color.",
    },
    // Scramble Text Button
    scrambleTextColor: {
        control: "color",
        default: "#22c55e",
        description: "Scramble text color.",
    },
    scrambleBorderColor: {
        control: "color",
        default: "rgba(34, 197, 94, 0.5)",
        description: "Scramble text border color.",
    },
    // Typewriter Button
    typewriterBgColor: {
        control: "color",
        default: "#171717",
        description: "Typewriter button background color.",
    },
    typewriterBorderColor: {
        control: "color",
        default: "#262626",
        description: "Typewriter button border color.",
    },
    typewriterCursorColor: {
        control: "color",
        default: "#737373",
        description: "Typewriter cursor color.",
    },
    // Liquid Blob Button
    liquidBlobBgColor: {
        control: "color",
        default: "#6366f1",
        description: "Liquid blob button background color.",
    },
    // CyberPunk Glitch 2 Button
    cyberPunkBorderColor: {
        control: "color",
        default: "#fde047",
        description: "CyberPunk glitch 2 border color.",
    },
    cyberPunkBgColor: {
        control: "color",
        default: "#000000",
        description: "CyberPunk glitch 2 background color.",
    },
    cyberPunkTextColor: {
        control: "color",
        default: "#fde047",
        description: "CyberPunk glitch 2 text color.",
    },
    cyberPunkAccentColor: {
        control: "color",
        default: "#fde047",
        description: "CyberPunk glitch 2 accent color.",
    },
    // Rounded Corner Morph Button
    roundedCornerMorphBgColor: {
        control: "color",
        default: "#e5e7eb",
        description: "Rounded corner morph button background color.",
    },
    roundedCornerMorphHoverBgColor: {
        control: "color",
        default: "#d1d5db",
        description: "Rounded corner morph button hover background color.",
    },
}

// Helper function to generate grouping config for a button
function getButtonGroupingConfig(
    props: Record<string, ButtonPropDefinition>
): ButtonGroupingConfig {
    // Define prop categories
    const generalKeys = [
        'children',
        'buttonText',
        'copyText',
        'downloadText',
        'className',
    ]
    
    const sizeSpacingKeys = [
        'size',
        'borderRadius',
        'paddingX',
        'paddingY',
    ]
    
    const colorKeys = [
        'backgroundColor',
        'textColor',
        'borderColor',
        'borderWidth',
        'glowColor',
        'shimmerColor',
        'hoverColor',
        'fillColor',
        // Button-specific color props
        'shadowColor',
        'accentColor',
        'hoverFillColor',
        'innerBackgroundColor',
        'shadowLayerColor',
        'mainButtonColor',
        'pixelBorderColor',
        'glitchColor1',
        'glitchColor2',
        'glitchBackgroundColor',
        'neumorphicBgColor',
        'neumorphicTextColor',
        'neumorphicShadowLight',
        'neumorphicShadowDark',
        'gradientFrom',
        'gradientVia',
        'gradientTo',
        'innerBgColor',
        'swipeFillColor',
        'swipeRightFillColor',
        'swipeUpFillColor',
        'swipeLeftFillColor',
        'swipeDownFillColor',
        'scaleUpFillColor',
        'shadowLightColor',
        'shadowDarkColor',
        'pressBorderColor',
        'pressShadowColor',
        'rippleColor',
        'ghostBorderColor',
        'spotlightColor',
        'glassBorderColor',
        'glassBgColor',
        'elasticBgColor',
        'idleBgColor',
        'loadingBgColor',
        'successBgColor',
        'copyBorderColor',
        'copyBgColor',
        'copiedBorderColor',
        'copiedBgColor',
        'progressBgColor',
        'socialBgColor',
        'drawBorderColor',
        'dottedBorderColor',
        'gradientRingFrom',
        'gradientRingVia',
        'gradientRingTo',
        'cyberBorderColor',
        'cyberBgColor',
        'cyberAccentColor',
        'retroBgColor',
        'retroBorderLightColor',
        'retroBorderDarkColor',
        'skeuoGradientFrom',
        'skeuoGradientTo',
        'skeuoBorderColor',
        'errorBgColor',
        'confettiGradientFrom',
        'confettiGradientTo',
        'holdProgressColor',
        'deleteIdleBgColor',
        'deleteConfirmBgColor',
        'likeBorderColor',
        'likeBgColor',
        'likedBorderColor',
        'likedBgColor',
        'likedTextColor',
        'skewBorderColor',
        'blobBgColor',
        'underlineColor',
        'bracketColor',
        'curtainBgColor',
        'curtainRevealBgColor',
        'curtainRevealTextColor',
        'sliceBgColor',
        'wetPaintBgColor',
        'particleColor',
        'isometricBgColor',
        'isometricBorderColor',
        'isometricShadowColor',
        'paperFoldBgColor',
        'paperFoldAccentColor',
        'textFillBorderColor',
        'textFillBgColor',
        'iconSlideBgColor',
        'multiLayerColor1',
        'multiLayerColor2',
        'multiLayerBgColor',
        'multiLayerBorderColor',
        'uploadBgColor',
        'toggleOnColor',
        'toggleOffColor',
        'doubleBorderColor',
        'spinningBorderGradientFrom',
        'spinningBorderGradientVia',
        'spinningBorderGradientTo',
        'letterSpacingBorderColor',
        'blurRevealColor',
        'vaporwaveGradientFrom',
        'vaporwaveGradientTo',
        'vaporwaveShadowColor',
        'saveBgColor',
        'printBorderColor',
        'printBgColor',
        'notificationBgColor',
        'notificationBadgeColor',
        'circleToSquareBgColor',
        'morphFabBgColor',
        'morphFabHoverBgColor',
        'shinyReflectionBgColor',
        'shinyReflectionBorderColor',
        'dotHoverColor',
        'marqueeBorderColor',
        'scrambleTextColor',
        'scrambleBorderColor',
        'typewriterBgColor',
        'typewriterBorderColor',
        'typewriterCursorColor',
        'liquidBlobBgColor',
        'cyberPunkBorderColor',
        'cyberPunkBgColor',
        'cyberPunkTextColor',
        'cyberPunkAccentColor',
        'roundedCornerMorphBgColor',
        'roundedCornerMorphHoverBgColor',
    ]
    
    const animationKeys = [
        'animationDuration',
        'animationSpeed',
        'shimmerSpeed',
        'pulseSpeed',
        'glowIntensity',
        'magneticStrength',
        'rippleSize',
        'holdDuration',
        'spinSpeed',
        'flickerSpeed',
        'elasticScale',
    ]
    
    // Categorize props
    const generalProps: string[] = []
    const sizeSpacingProps: string[] = []
    const colorProps: string[] = []
    const animationProps: string[] = []
    const otherProps: string[] = []
    
    Object.keys(props).forEach((key) => {
        if (generalKeys.includes(key)) {
            generalProps.push(key)
        } else if (sizeSpacingKeys.includes(key)) {
            sizeSpacingProps.push(key)
        } else if (colorKeys.includes(key)) {
            colorProps.push(key)
        } else if (animationKeys.includes(key)) {
            animationProps.push(key)
        } else {
            otherProps.push(key)
        }
    })
    
    // Build tabs array (only include tabs that have props)
    const tabs: { name: string; label: string; keys: string[] }[] = []
    
    if (generalProps.length > 0) {
        tabs.push({ name: "general", label: "General", keys: generalProps })
    }
    if (sizeSpacingProps.length > 0) {
        tabs.push({ name: "size", label: "Size & Spacing", keys: sizeSpacingProps })
    }
    if (colorProps.length > 0) {
        tabs.push({ name: "colors", label: "Colors", keys: colorProps })
    }
    if (animationProps.length > 0) {
        tabs.push({ name: "animation", label: "Animation", keys: animationProps })
    }
    if (otherProps.length > 0) {
        tabs.push({ name: "other", label: "Other", keys: otherProps })
    }
    
    // Always have at least a General tab
    if (tabs.length === 0) {
        tabs.push({ name: "general", label: "General", keys: [] })
    }
    
    return {
        type: "tabs",
        tabs,
    }
}

export const buttonSections: ButtonSectionMeta[] = [
    {
        slug: "magnetic-button",
        name: "Magnetic Button",
        componentName: "MagneticButton",
        description: "A button that magnetically follows the cursor movement.",
        tags: ["button", "magnetic", "hover", "interaction"],
        props: {
            ...extendedButtonProps,
            magneticStrength: animationProps.magneticStrength,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            magneticStrength: animationProps.magneticStrength,
        }),
    },
    {
        slug: "glitch-button",
        name: "Glitch Button",
        componentName: "GlitchButton",
        description: "A button with a digital glitch effect on hover.",
        tags: ["button", "glitch", "effect", "hover"],
        props: {
            ...extendedButtonProps,
            glitchColor1: buttonSpecificProps.glitchColor1,
            glitchColor2: buttonSpecificProps.glitchColor2,
            glitchBackgroundColor: buttonSpecificProps.glitchBackgroundColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            glitchColor1: buttonSpecificProps.glitchColor1,
            glitchColor2: buttonSpecificProps.glitchColor2,
            glitchBackgroundColor: buttonSpecificProps.glitchBackgroundColor,
        }),
    },
    {
        slug: "liquid-hover-button",
        name: "Liquid Hover Button",
        componentName: "LiquidHoverButton",
        description: "A button with a liquid fill effect on hover.",
        tags: ["button", "liquid", "fill", "hover"],
        props: {
            ...extendedButtonProps,
            animationDuration: animationProps.animationDuration,
            fillColor: colorProps.fillColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            animationDuration: animationProps.animationDuration,
            fillColor: colorProps.fillColor,
        }),
    },
    {
        slug: "neumorphic-button",
        name: "Neumorphic Button",
        componentName: "NeumorphicButton",
        description: "A button designed with soft UI / neumorphism style.",
        tags: ["button", "neumorphic", "soft-ui", "shadow"],
        props: {
            ...extendedButtonProps,
            neumorphicBgColor: buttonSpecificProps.neumorphicBgColor,
            neumorphicTextColor: buttonSpecificProps.neumorphicTextColor,
            neumorphicShadowLight: buttonSpecificProps.neumorphicShadowLight,
            neumorphicShadowDark: buttonSpecificProps.neumorphicShadowDark,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            neumorphicBgColor: buttonSpecificProps.neumorphicBgColor,
            neumorphicTextColor: buttonSpecificProps.neumorphicTextColor,
            neumorphicShadowLight: buttonSpecificProps.neumorphicShadowLight,
            neumorphicShadowDark: buttonSpecificProps.neumorphicShadowDark,
        }),
    },
    {
        slug: "gradient-border-button",
        name: "Gradient Border Button",
        componentName: "GradientBorderButton",
        description: "A button with a gradient border.",
        tags: ["button", "gradient", "border", "colorful"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "shimmer-button",
        name: "Shimmer Button",
        componentName: "ShimmerButton",
        description: "A button with a shimmering light effect.",
        tags: ["button", "shimmer", "shine", "animation"],
        props: {
            ...extendedButtonProps,
            shimmerSpeed: animationProps.shimmerSpeed,
            shimmerColor: colorProps.shimmerColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            shimmerSpeed: animationProps.shimmerSpeed,
            shimmerColor: colorProps.shimmerColor,
        }),
    },
    {
        slug: "pulse-glow-button",
        name: "Pulse Glow Button",
        componentName: "PulseGlowButton",
        description: "A button that pulses with a glowing effect.",
        tags: ["button", "pulse", "glow", "animation"],
        props: {
            ...extendedButtonProps,
            pulseSpeed: animationProps.pulseSpeed,
            glowIntensity: animationProps.glowIntensity,
            glowColor: colorProps.glowColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            pulseSpeed: animationProps.pulseSpeed,
            glowIntensity: animationProps.glowIntensity,
            glowColor: colorProps.glowColor,
        }),
    },
    {
        slug: "slide-arrow-button",
        name: "Slide Arrow Button",
        componentName: "SlideArrowButton",
        description: "A button where an arrow slides in on hover.",
        tags: ["button", "arrow", "slide", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "three-d-press-button",
        name: "3D Press Button",
        componentName: "ThreeDPressButton",
        description: "A button with a 3D press effect.",
        tags: ["button", "3d", "press", "click"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "ripple-button",
        name: "Ripple Button",
        componentName: "RippleButton",
        description: "A button with a material design ripple effect.",
        tags: ["button", "ripple", "material", "click"],
        props: {
            ...extendedButtonProps,
            rippleSize: animationProps.rippleSize,
            animationDuration: animationProps.animationDuration,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            rippleSize: animationProps.rippleSize,
            animationDuration: animationProps.animationDuration,
        }),
    },
    {
        slug: "ghost-hover-button",
        name: "Ghost Hover Button",
        componentName: "GhostHoverButton",
        description: "A transparent button that fills on hover.",
        tags: ["button", "ghost", "hover", "transparent"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "status-loading-button",
        name: "Status Loading Button",
        componentName: "StatusLoadingButton",
        description: "A button that shows loading and success states.",
        tags: ["button", "loading", "status", "feedback"],
        props: {
            ...extendedButtonProps,
            buttonText: {
                control: "text",
                default: "Submit",
                description: "The text to display when the button is idle.",
            },
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            buttonText: {
                control: "text",
                default: "Submit",
                description: "The text to display when the button is idle.",
            },
        }),
    },
    {
        slug: "spotlight-button",
        name: "Spotlight Button",
        componentName: "SpotlightButton",
        description: "A button with a spotlight effect that follows the cursor.",
        tags: ["button", "spotlight", "hover", "light"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "pixel-art-button",
        name: "Pixel Art Button",
        componentName: "PixelArtButton",
        description: "A retro pixel art style button.",
        tags: ["button", "pixel", "retro", "8bit"],
        props: {
            ...extendedButtonProps,
            shadowLayerColor: buttonSpecificProps.shadowLayerColor,
            mainButtonColor: buttonSpecificProps.mainButtonColor,
            pixelBorderColor: buttonSpecificProps.pixelBorderColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            shadowLayerColor: buttonSpecificProps.shadowLayerColor,
            mainButtonColor: buttonSpecificProps.mainButtonColor,
            pixelBorderColor: buttonSpecificProps.pixelBorderColor,
        }),
    },
    {
        slug: "glassmorphism-button",
        name: "Glassmorphism Button",
        componentName: "GlassmorphismButton",
        description: "A button with a frosted glass effect.",
        tags: ["button", "glassmorphism", "glass", "blur"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "neon-flicker-button",
        name: "Neon Flicker Button",
        componentName: "NeonFlickerButton",
        description: "A button with a neon flickering text effect.",
        tags: ["button", "neon", "flicker", "glow"],
        props: {
            ...extendedButtonProps,
            flickerSpeed: animationProps.flickerSpeed,
            glowColor: colorProps.glowColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            flickerSpeed: animationProps.flickerSpeed,
            glowColor: colorProps.glowColor,
        }),
    },
    {
        slug: "elastic-button",
        name: "Elastic Button",
        componentName: "ElasticButton",
        description: "A button with an elastic scaling effect.",
        tags: ["button", "elastic", "scale", "animation"],
        props: {
            ...extendedButtonProps,
            elasticScale: animationProps.elasticScale,
            animationDuration: animationProps.animationDuration,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            elasticScale: animationProps.elasticScale,
            animationDuration: animationProps.animationDuration,
        }),
    },
    {
        slug: "copy-clipboard-button",
        name: "Copy Clipboard Button",
        componentName: "CopyClipboardButton",
        description: "A button to copy text to clipboard with feedback.",
        tags: ["button", "copy", "clipboard", "utility"],
        props: {
            ...extendedButtonProps,
            copyText: {
                control: "text",
                default: "Copy Code",
                description: "The text to display on the button.",
            },
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            copyText: {
                control: "text",
                default: "Copy Code",
                description: "The text to display on the button.",
            },
        }),
    },
    {
        slug: "social-share-button",
        name: "Social Share Button",
        componentName: "SocialShareButton",
        description: "A button that expands to show social share icons.",
        tags: ["button", "social", "share", "expand"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "download-progress-button",
        name: "Download Progress Button",
        componentName: "DownloadProgressButton",
        description: "A button that visualizes download progress.",
        tags: ["button", "download", "progress", "animation"],
        props: {
            ...extendedButtonProps,
            downloadText: {
                control: "text",
                default: "Download",
                description: "The text to display on the button.",
            },
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            downloadText: {
                control: "text",
                default: "Download",
                description: "The text to display on the button.",
            },
        }),
    },
    {
        slug: "swipe-right-button",
        name: "Swipe Right Button",
        componentName: "SwipeRightButton",
        description: "A button with a swipe right fill effect.",
        tags: ["button", "swipe", "fill", "hover"],
        props: {
            ...extendedButtonProps,
            swipeRightFillColor: buttonSpecificProps.swipeRightFillColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            swipeRightFillColor: buttonSpecificProps.swipeRightFillColor,
        }),
    },
    {
        slug: "swipe-up-button",
        name: "Swipe Up Button",
        componentName: "SwipeUpButton",
        description: "A button with a swipe up fill effect.",
        tags: ["button", "swipe", "fill", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "scale-up-button",
        name: "Scale Up Button",
        componentName: "ScaleUpButton",
        description: "A button with a scale up fill effect.",
        tags: ["button", "scale", "fill", "hover"],
        props: {
            ...extendedButtonProps,
            scaleUpFillColor: buttonSpecificProps.scaleUpFillColor,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            scaleUpFillColor: buttonSpecificProps.scaleUpFillColor,
        }),
    },
    {
        slug: "draw-border-button",
        name: "Draw Border Button",
        componentName: "DrawBorderButton",
        description: "A button where the border is drawn on hover.",
        tags: ["button", "border", "draw", "animation"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "dotted-border-button",
        name: "Dotted Border Button",
        componentName: "DottedBorderButton",
        description: "A button with a dotted border that changes on hover.",
        tags: ["button", "border", "dotted", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "gradient-ring-button",
        name: "Gradient Ring Button",
        componentName: "GradientRingButton",
        description: "A button with a gradient ring border.",
        tags: ["button", "gradient", "ring", "border"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "cyber-button",
        name: "Cyber Button",
        componentName: "CyberButton",
        description: "A cyberpunk style button with clipped corners.",
        tags: ["button", "cyber", "cyberpunk", "futuristic"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "retro-95-button",
        name: "Retro 95 Button",
        componentName: "Retro95Button",
        description: "A Windows 95 style retro button.",
        tags: ["button", "retro", "95", "windows"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "clay-button",
        name: "Clay Button",
        componentName: "ClayButton",
        description: "A button with a claymorphism style.",
        tags: ["button", "clay", "claymorphism", "soft"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "skeuo-button",
        name: "Skeuo Button",
        componentName: "SkeuoButton",
        description: "A skeuomorphic button with depth.",
        tags: ["button", "skeuomorphic", "depth", "3d"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "shake-error-button",
        name: "Shake Error Button",
        componentName: "ShakeErrorButton",
        description: "A button that shakes to indicate an error.",
        tags: ["button", "shake", "error", "feedback"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "confetti-button",
        name: "Confetti Button",
        componentName: "ConfettiButton",
        description: "A button that triggers a confetti burst.",
        tags: ["button", "confetti", "celebration", "animation"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "hold-button",
        name: "Hold Button",
        componentName: "HoldButton",
        description: "A button that requires holding to confirm.",
        tags: ["button", "hold", "confirm", "interaction"],
        props: {
            ...extendedButtonProps,
            holdDuration: animationProps.holdDuration,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            holdDuration: animationProps.holdDuration,
        }),
    },
    {
        slug: "delete-button",
        name: "Delete Button",
        componentName: "DeleteButton",
        description: "A delete button with a confirmation step.",
        tags: ["button", "delete", "confirm", "danger"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "like-button",
        name: "Like Button",
        componentName: "LikeButton",
        description: "A like button with heart animation.",
        tags: ["button", "like", "heart", "toggle"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "skew-button",
        name: "Skew Button",
        componentName: "SkewButton",
        description: "A skewed button style.",
        tags: ["button", "skew", "transform", "style"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "blob-button",
        name: "Blob Button",
        componentName: "BlobButton",
        description: "A button with an organic blob shape.",
        tags: ["button", "blob", "organic", "shape"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "underline-button",
        name: "Underline Button",
        componentName: "UnderlineButton",
        description: "A button with an animated underline.",
        tags: ["button", "underline", "hover", "text"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "bracket-button",
        name: "Bracket Button",
        componentName: "BracketButton",
        description: "A button with animated brackets.",
        tags: ["button", "bracket", "hover", "animation"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "curtain-button",
        name: "Curtain Button",
        componentName: "CurtainButton",
        description: "A button with a curtain reveal effect.",
        tags: ["button", "curtain", "reveal", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "slice-button",
        name: "Slice Button",
        componentName: "SliceButton",
        description: "A button with a slicing effect.",
        tags: ["button", "slice", "hover", "effect"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "wet-paint-button",
        name: "Wet Paint Button",
        componentName: "WetPaintButton",
        description: "A button that looks like wet paint.",
        tags: ["button", "wet", "paint", "style"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "particle-button",
        name: "Particle Button",
        componentName: "ParticleButton",
        description: "A button with particle effects.",
        tags: ["button", "particle", "effect", "animation"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "isometric-button",
        name: "Isometric Button",
        componentName: "IsometricButton",
        description: "An isometric 3D button.",
        tags: ["button", "isometric", "3d", "perspective"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "paper-fold-button",
        name: "Paper Fold Button",
        componentName: "PaperFoldButton",
        description: "A button that looks like folded paper.",
        tags: ["button", "paper", "fold", "style"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "text-fill-button",
        name: "Text Fill Button",
        componentName: "TextFillButton",
        description: "A button where the text fills with color.",
        tags: ["button", "text", "fill", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "icon-slide-button",
        name: "Icon Slide Button",
        componentName: "IconSlideButton",
        description: "A button where an icon slides in.",
        tags: ["button", "icon", "slide", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "multi-layer-button",
        name: "Multi Layer Button",
        componentName: "MultiLayerButton",
        description: "A button with multiple layers.",
        tags: ["button", "layer", "stack", "3d"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "upload-button",
        name: "Upload Button",
        componentName: "UploadButton",
        description: "A button designed for file uploads.",
        tags: ["button", "upload", "file", "action"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "toggle-switch-button",
        name: "Toggle Switch Button",
        componentName: "ToggleSwitchButton",
        description: "A toggle switch button.",
        tags: ["button", "toggle", "switch", "control"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "swipe-left-button",
        name: "Swipe Left Button",
        componentName: "SwipeLeftButton",
        description: "A button with a swipe left fill effect.",
        tags: ["button", "swipe", "fill", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "swipe-down-button",
        name: "Swipe Down Button",
        componentName: "SwipeDownButton",
        description: "A button with a swipe down fill effect.",
        tags: ["button", "swipe", "fill", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "double-border-button",
        name: "Double Border Button",
        componentName: "DoubleBorderButton",
        description: "A button with a double border.",
        tags: ["button", "border", "double", "style"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "spinning-border-button",
        name: "Spinning Border Button",
        componentName: "SpinningBorderButton",
        description: "A button with a spinning border effect.",
        tags: ["button", "border", "spin", "animation"],
        props: {
            ...extendedButtonProps,
            spinSpeed: animationProps.spinSpeed,
        },
        category: "Button",
        groupingConfig: getButtonGroupingConfig({
            ...extendedButtonProps,
            spinSpeed: animationProps.spinSpeed,
        }),
    },
    {
        slug: "letter-spacing-button",
        name: "Letter Spacing Button",
        componentName: "LetterSpacingButton",
        description: "A button that increases letter spacing on hover.",
        tags: ["button", "text", "spacing", "hover"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "blur-reveal-button",
        name: "Blur Reveal Button",
        componentName: "BlurRevealButton",
        description: "A button that reveals content from blur.",
        tags: ["button", "blur", "reveal", "effect"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "vaporwave-button",
        name: "Vaporwave Button",
        componentName: "VaporwaveButton",
        description: "A vaporwave aesthetic button.",
        tags: ["button", "vaporwave", "aesthetic", "retro"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "save-button",
        name: "Save Button",
        componentName: "SaveButton",
        description: "A standard save button with icon.",
        tags: ["button", "save", "icon", "action"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "print-button",
        name: "Print Button",
        componentName: "PrintButton",
        description: "A standard print button with icon.",
        tags: ["button", "print", "icon", "action"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "notification-button",
        name: "Notification Button",
        componentName: "NotificationButton",
        description: "A notification button with a badge.",
        tags: ["button", "notification", "badge", "icon"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "circle-to-square-button",
        name: "Circle to Square Button",
        componentName: "CircleToSquareButton",
        description: "A button that morphs from circle to square.",
        tags: ["button", "morph", "shape", "animation"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "morph-fab-button",
        name: "Morph FAB Button",
        componentName: "MorphFabButton",
        description: "A floating action button that morphs on hover.",
        tags: ["button", "fab", "morph", "floating"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "shiny-reflection-button",
        name: "Shiny Reflection Button",
        componentName: "ShinyReflectionButton",
        description: "A button with a shiny reflection effect.",
        tags: ["button", "shiny", "reflection", "effect"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "dot-hover-button",
        name: "Dot Hover Button",
        componentName: "DotHoverButton",
        description: "A button with a dot indicator on hover.",
        tags: ["button", "dot", "hover", "indicator"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "text-marquee-button",
        name: "Text Marquee Button",
        componentName: "TextMarqueeButton",
        description: "A button with scrolling marquee text.",
        tags: ["button", "marquee", "text", "scroll"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "scramble-text-button",
        name: "Scramble Text Button",
        componentName: "ScrambleTextButton",
        description: "A button with scrambled text effect.",
        tags: ["button", "scramble", "text", "effect"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "typewriter-button",
        name: "Typewriter Button",
        componentName: "TypewriterButton",
        description: "A button with typewriter text effect.",
        tags: ["button", "typewriter", "text", "effect"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "liquid-blob-button",
        name: "Liquid Blob Button",
        componentName: "LiquidBlobButton",
        description: "A button with a liquid blob background.",
        tags: ["button", "liquid", "blob", "background"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "cyber-punk-glitch-2-button",
        name: "CyberPunk Glitch 2 Button",
        componentName: "CyberPunkGlitch2Button",
        description: "Another cyberpunk style glitch button.",
        tags: ["button", "cyberpunk", "glitch", "effect"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
    {
        slug: "rounded-corner-morph-button",
        name: "Rounded Corner Morph Button",
        componentName: "RoundedCornerMorphButton",
        description: "A button that morphs corner radius on hover.",
        tags: ["button", "morph", "corner", "radius"],
        props: extendedButtonProps,
        category: "Button",
        groupingConfig: getButtonGroupingConfig(extendedButtonProps),
    },
]

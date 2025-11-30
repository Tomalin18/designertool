"use client"

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    ArrowRight, Check, Copy, Download, Loader2, Share2, Twitter, Facebook, Linkedin,
    Zap, Play, ArrowUp, ArrowDown, ArrowLeft, Printer, Save, Trash, Heart, Bell,
    Upload, Plus, X, MousePointerClick, CornerDownRight, Terminal, AlertCircle,
    Settings, Send, RefreshCw, Lock
} from "lucide-react";

// Common button props interface (like UrlInput)
interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    size?: string;
    borderRadius?: number;
    paddingX?: number;
    paddingY?: number;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    // Animation props
    animationDuration?: number;
    animationSpeed?: number;
    shimmerSpeed?: number;
    pulseSpeed?: number;
    glowIntensity?: number;
    magneticStrength?: number;
    rippleSize?: number;
    holdDuration?: number;
    spinSpeed?: number;
    flickerSpeed?: number;
    elasticScale?: number;
    // Color props
    glowColor?: string;
    shimmerColor?: string;
    hoverColor?: string;
    fillColor?: string;
    // Button-specific color props
    shadowColor?: string;
    accentColor?: string;
    hoverFillColor?: string;
    innerBackgroundColor?: string;
    // Pixel Art Button
    shadowLayerColor?: string;
    mainButtonColor?: string;
    pixelBorderColor?: string;
    // Glitch Button
    glitchColor1?: string;
    glitchColor2?: string;
    glitchBackgroundColor?: string;
    // Neumorphic Button
    neumorphicBgColor?: string;
    neumorphicTextColor?: string;
    neumorphicShadowLight?: string;
    neumorphicShadowDark?: string;
    // Gradient Border Button
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
    innerBgColor?: string;
    // Swipe Buttons
    swipeFillColor?: string;
    // Clay Button
    shadowLightColor?: string;
    shadowDarkColor?: string;
    // 3D Press Button
    pressBorderColor?: string;
    pressShadowColor?: string;
    // Ripple Button
    rippleColor?: string;
    // Ghost Hover Button
    ghostBorderColor?: string;
    // Spotlight Button
    spotlightColor?: string;
    // Glassmorphism Button
    glassBorderColor?: string;
    glassBgColor?: string;
    // Elastic Button
    elasticBgColor?: string;
    // Status Loading Button
    idleBgColor?: string;
    loadingBgColor?: string;
    successBgColor?: string;
    // Copy Clipboard Button
    copyBorderColor?: string;
    copyBgColor?: string;
    copiedBorderColor?: string;
    copiedBgColor?: string;
    // Download Progress Button
    progressBgColor?: string;
    // Social Share Button
    socialBgColor?: string;
    // Swipe Right/Up/Left/Down/Scale Up Buttons
    swipeRightFillColor?: string;
    swipeUpFillColor?: string;
    swipeLeftFillColor?: string;
    swipeDownFillColor?: string;
    scaleUpFillColor?: string;
    // Draw Border Button
    drawBorderColor?: string;
    // Dotted Border Button
    dottedBorderColor?: string;
    // Gradient Ring Button
    gradientRingFrom?: string;
    gradientRingVia?: string;
    gradientRingTo?: string;
    // Cyber Button
    cyberBorderColor?: string;
    cyberBgColor?: string;
    cyberAccentColor?: string;
    // Retro 95 Button
    retroBgColor?: string;
    retroBorderLightColor?: string;
    retroBorderDarkColor?: string;
    // Skeuo Button
    skeuoGradientFrom?: string;
    skeuoGradientTo?: string;
    skeuoBorderColor?: string;
    // Shake Error Button
    errorBgColor?: string;
    // Confetti Button
    confettiGradientFrom?: string;
    confettiGradientTo?: string;
    // Hold Button
    holdProgressColor?: string;
    // Delete Button
    deleteIdleBgColor?: string;
    deleteConfirmBgColor?: string;
    // Like Button
    likeBorderColor?: string;
    likeBgColor?: string;
    likedBorderColor?: string;
    likedBgColor?: string;
    likedTextColor?: string;
    // Skew Button
    skewBorderColor?: string;
    // Blob Button
    blobBgColor?: string;
    // Underline Button
    underlineColor?: string;
    // Bracket Button
    bracketColor?: string;
    // Curtain Button
    curtainBgColor?: string;
    curtainRevealBgColor?: string;
    curtainRevealTextColor?: string;
    // Slice Button
    sliceBgColor?: string;
    // Wet Paint Button
    wetPaintBgColor?: string;
    // Particle Button
    particleColor?: string;
    // Isometric Button
    isometricBgColor?: string;
    isometricBorderColor?: string;
    isometricShadowColor?: string;
    // Paper Fold Button
    paperFoldBgColor?: string;
    paperFoldAccentColor?: string;
    // Text Fill Button
    textFillBorderColor?: string;
    textFillBgColor?: string;
    // Icon Slide Button
    iconSlideBgColor?: string;
    // Multi Layer Button
    multiLayerColor1?: string;
    multiLayerColor2?: string;
    multiLayerBgColor?: string;
    multiLayerBorderColor?: string;
    // Upload Button
    uploadBgColor?: string;
    // Toggle Switch Button
    toggleOnColor?: string;
    toggleOffColor?: string;
    // Double Border Button
    doubleBorderColor?: string;
    // Spinning Border Button
    spinningBorderGradientFrom?: string;
    spinningBorderGradientVia?: string;
    spinningBorderGradientTo?: string;
    // Letter Spacing Button
    letterSpacingBorderColor?: string;
    // Blur Reveal Button
    blurRevealColor?: string;
    // Vaporwave Button
    vaporwaveGradientFrom?: string;
    vaporwaveGradientTo?: string;
    vaporwaveShadowColor?: string;
    // Save Button
    saveBgColor?: string;
    // Print Button
    printBorderColor?: string;
    printBgColor?: string;
    // Notification Button
    notificationBgColor?: string;
    notificationBadgeColor?: string;
    // Circle to Square Button
    circleToSquareBgColor?: string;
    // Morph FAB Button
    morphFabBgColor?: string;
    morphFabHoverBgColor?: string;
    // Shiny Reflection Button
    shinyReflectionBgColor?: string;
    shinyReflectionBorderColor?: string;
    // Dot Hover Button
    dotHoverColor?: string;
    // Text Marquee Button
    marqueeBorderColor?: string;
    // Scramble Text Button
    scrambleTextColor?: string;
    scrambleBorderColor?: string;
    // Typewriter Button
    typewriterBgColor?: string;
    typewriterBorderColor?: string;
    typewriterCursorColor?: string;
    // Liquid Blob Button
    liquidBlobBgColor?: string;
    // CyberPunk Glitch 2 Button
    cyberPunkBorderColor?: string;
    cyberPunkBgColor?: string;
    cyberPunkTextColor?: string;
    cyberPunkAccentColor?: string;
    // Rounded Corner Morph Button
    roundedCornerMorphBgColor?: string;
    roundedCornerMorphHoverBgColor?: string;
}

// Helper function to extract only standard HTML button attributes
// This filters out custom props like buttonText, copyText, etc. that shouldn't be passed to DOM
const extractHtmlButtonProps = (props: CommonButtonProps): React.ButtonHTMLAttributes<HTMLButtonElement> => {
    // Extract only standard HTML button attributes from props
    const {
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        disabled,
        type,
        name,
        value,
        form,
        formAction,
        formEncType,
        formMethod,
        formNoValidate,
        formTarget,
        autoFocus,
        tabIndex,
        id,
        title,
        role,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-disabled': ariaDisabled,
    } = props;
    
    // Build object with only defined standard attributes
    const htmlProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {};
    if (onClick !== undefined) htmlProps.onClick = onClick;
    if (onMouseEnter !== undefined) htmlProps.onMouseEnter = onMouseEnter;
    if (onMouseLeave !== undefined) htmlProps.onMouseLeave = onMouseLeave;
    if (onFocus !== undefined) htmlProps.onFocus = onFocus;
    if (onBlur !== undefined) htmlProps.onBlur = onBlur;
    if (disabled !== undefined) htmlProps.disabled = disabled;
    if (type !== undefined) htmlProps.type = type;
    if (name !== undefined) htmlProps.name = name;
    if (value !== undefined) htmlProps.value = value;
    if (form !== undefined) htmlProps.form = form;
    if (formAction !== undefined) htmlProps.formAction = formAction;
    if (formEncType !== undefined) htmlProps.formEncType = formEncType;
    if (formMethod !== undefined) htmlProps.formMethod = formMethod;
    if (formNoValidate !== undefined) htmlProps.formNoValidate = formNoValidate;
    if (formTarget !== undefined) htmlProps.formTarget = formTarget;
    if (autoFocus !== undefined) htmlProps.autoFocus = autoFocus;
    if (tabIndex !== undefined) htmlProps.tabIndex = tabIndex;
    if (id !== undefined) htmlProps.id = id;
    if (title !== undefined) htmlProps.title = title;
    if (role !== undefined) htmlProps.role = role;
    if (ariaLabel !== undefined) htmlProps['aria-label'] = ariaLabel;
    if (ariaLabelledBy !== undefined) htmlProps['aria-labelledby'] = ariaLabelledBy;
    if (ariaDescribedBy !== undefined) htmlProps['aria-describedby'] = ariaDescribedBy;
    if (ariaDisabled !== undefined) htmlProps['aria-disabled'] = ariaDisabled;
    
    return htmlProps;
};

// Helper function to build style from props (like UrlInput does)
const buildButtonStyle = (props: CommonButtonProps, additionalStyle?: React.CSSProperties): React.CSSProperties => {
    const {
        borderRadius,
        paddingX,
        paddingY,
        backgroundColor,
        textColor,
        borderColor,
        borderWidth,
        style,
    } = props;

    return {
        ...(borderRadius !== undefined && borderRadius !== null && { borderRadius: `${borderRadius}px` }),
        ...(paddingX !== undefined && paddingX !== null && { paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }),
        ...(paddingY !== undefined && paddingY !== null && { paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }),
        ...(backgroundColor && { backgroundColor }),
        ...(textColor && { color: textColor }),
        ...(borderColor && { borderColor }),
        ...(borderWidth !== undefined && borderWidth !== null && { borderWidth: `${borderWidth}px`, borderStyle: 'solid' }),
        ...style,
        ...additionalStyle,
    };
};

// Helper function to get size class
const getSizeClass = (size?: string): string => {
    return size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : '';
};

// 1. Magnetic Button
export const MagneticButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className,
        style,
        size,
        borderRadius,
        paddingX,
        paddingY,
        backgroundColor,
        textColor,
        borderColor,
        borderWidth,
        magneticStrength = 0.3,
    } = props;
    const btnRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * magneticStrength;
        const y = (e.clientY - (top + height / 2)) * magneticStrength;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    // Build style object from props (like UrlInput does)
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style }, {
        transform: `translate(${position.x}px, ${position.y}px)`,
    });

    // Handle size prop
    const sizeClass = getSizeClass(size);

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={buttonStyle}
            className={cn(
                "rounded-full bg-white px-8 py-3 font-medium text-black transition-transform duration-100 ease-out hover:bg-neutral-200",
                sizeClass,
                className
            )}
        >
            {children}
        </button>
    );
};

// 2. Glitch Button
export const GlitchButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        glitchColor1 = "#06b6d4",
        glitchColor2 = "#ef4444",
        glitchBackgroundColor = "#000000"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);

    // Helper to convert hex/rgb to rgb string for inline styles
    const hexToRgb = (hex: string): string => {
        if (hex.startsWith('rgb')) return hex;
        if (!hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <button 
            className={cn("group relative px-8 py-3 font-bold text-white transition-colors hover:bg-transparent", sizeClass, className)}
            style={buttonStyle}
        >
            <div 
                className="absolute inset-0 translate-x-1 translate-y-1 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-screen" 
                style={{ backgroundColor: hexToRgb(glitchColor1) }}
            />
            <div 
                className="absolute inset-0 -translate-x-1 -translate-y-1 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-screen" 
                style={{ backgroundColor: hexToRgb(glitchColor2) }}
            />
            <div 
                className="relative border border-white px-8 py-3 uppercase tracking-wider z-10"
                style={{ backgroundColor: hexToRgb(glitchBackgroundColor) }}
            >
                {children}
            </div>
        </button>
    );
};

// 3. Liquid Hover Button
export const LiquidHoverButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, animationDuration = 300, fillColor } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const fillColorValue = fillColor || "#4f46e5";

    return (
        <button 
            className={cn("group relative overflow-hidden rounded-lg border border-indigo-500 bg-transparent px-8 py-3 font-medium text-indigo-500 transition-colors hover:text-white", sizeClass, className)}
            style={buttonStyle}
        >
            <div 
                className="absolute inset-0 -translate-x-full transition-transform ease-out group-hover:translate-x-0"
                style={{
                    backgroundColor: fillColorValue,
                    transitionDuration: `${animationDuration}ms`,
                }}
            />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

// 4. Neumorphic Button
export const NeumorphicButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        neumorphicBgColor = "#e0e5ec",
        neumorphicTextColor = "#4d5b7c",
        neumorphicShadowLight = "#ffffff",
        neumorphicShadowDark = "#b8b9be"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    
    // Helper to convert hex/rgb to hex string for shadow
    const hexToHex = (hex: string): string => {
        if (hex.startsWith('#')) return hex;
        if (hex.startsWith('rgb')) {
            const match = hex.match(/\d+/g);
            if (match && match.length >= 3) {
                const r = parseInt(match[0]).toString(16).padStart(2, '0');
                const g = parseInt(match[1]).toString(16).padStart(2, '0');
                const b = parseInt(match[2]).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`;
            }
        }
        return hex;
    };
    
    const bgHex = hexToHex(neumorphicBgColor);
    const textHex = hexToHex(neumorphicTextColor);
    const shadowLightHex = hexToHex(neumorphicShadowLight);
    const shadowDarkHex = hexToHex(neumorphicShadowDark);
    
    return (
        <button 
            className={cn("rounded-xl px-8 py-3 font-bold transition-all active:scale-95", sizeClass, className)}
            style={{
                ...buttonStyle,
                backgroundColor: bgHex,
                color: textHex,
                boxShadow: `6px 6px 12px ${shadowDarkHex}, -6px -6px 12px ${shadowLightHex}`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `inset 6px 6px 12px ${shadowDarkHex}, inset -6px -6px 12px ${shadowLightHex}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `6px 6px 12px ${shadowDarkHex}, -6px -6px 12px ${shadowLightHex}`;
            }}
        >
            {children}
        </button>
    );
};

// 5. Gradient Border Button
export const GradientBorderButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        gradientFrom = "#ec4899",
        gradientVia = "#a855f7",
        gradientTo = "#6366f1",
        innerBgColor = "#000000"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    
    // Helper to convert hex/rgb to rgb string for inline styles
    const hexToRgb = (hex: string): string => {
        if (hex.startsWith('rgb')) return hex;
        if (!hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    const fromRgb = hexToRgb(gradientFrom);
    const viaRgb = hexToRgb(gradientVia);
    const toRgb = hexToRgb(gradientTo);
    const innerRgb = hexToRgb(innerBgColor);
    
    return (
        <button 
            className={cn("group relative rounded-lg p-[2px] transition-transform active:scale-95", sizeClass, className)}
            style={{
                ...buttonStyle,
                background: `linear-gradient(to right, ${fromRgb}, ${viaRgb}, ${toRgb})`,
            }}
        >
            <div 
                className="relative rounded-[6px] px-8 py-3 transition-colors group-hover:bg-transparent"
                style={{ backgroundColor: innerRgb }}
            >
                <span className="font-medium text-white">{children}</span>
            </div>
        </button>
    );
};

// 6. Shimmer Button
export const ShimmerButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, shimmerSpeed = 2, shimmerColor } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const shimmerColorStyle = shimmerColor ? { backgroundColor: shimmerColor } : {};
    return (
        <button 
            className={cn("relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 font-medium text-white transition-colors hover:bg-neutral-700", sizeClass, className)}
            style={buttonStyle}
        >
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
            <div 
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                    animation: `shimmer ${shimmerSpeed}s infinite`,
                    ...shimmerColorStyle,
                }}
            />
            {children}
        </button>
    );
};

// 7. Pulse Glow Button
export const PulseGlowButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, pulseSpeed = 1, glowIntensity = 0.5, glowColor } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const glowColorValue = glowColor || backgroundColor || "#4f46e5";
    const animationDuration = `${2 / pulseSpeed}s`;
    const opacity = glowIntensity * 0.75;
    const htmlButtonProps = extractHtmlButtonProps(props);
    
    return (
        <button 
            {...htmlButtonProps}
            className={cn("relative rounded-full bg-indigo-600 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-500", sizeClass, className)}
            style={buttonStyle}
        >
            <style>{`
                @keyframes pulse-glow {
                    0%, 100% { transform: scale(1); opacity: ${opacity}; }
                    50% { transform: scale(1.1); opacity: ${opacity * 0.5}; }
                }
            `}</style>
            <span 
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                    backgroundColor: glowColorValue,
                    opacity: opacity,
                    animation: `pulse-glow ${animationDuration} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                }}
            />
            {children}
        </button>
    );
};

// Subscribe Button (based on Pulse Glow Button with rounded-md instead of rounded-full)
export const SubscribeButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, pulseSpeed = 1, glowIntensity = 0.5, glowColor } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    // Use theme primary color for glow if not provided
    const glowColorValue = glowColor || backgroundColor || undefined;
    const animationDuration = `${2 / pulseSpeed}s`;
    const opacity = glowIntensity * 0.75;
    const htmlButtonProps = extractHtmlButtonProps(props);
    
    return (
        <button 
            {...htmlButtonProps}
            className={cn(
                "relative rounded-md px-8 py-3 font-bold shadow-lg transition-transform hover:scale-105",
                backgroundColor ? "" : "bg-primary text-primary-foreground hover:bg-primary/90",
                sizeClass, 
                className
            )}
            style={buttonStyle}
        >
            <style>{`
                @keyframes pulse-glow {
                    0%, 100% { transform: scale(1); opacity: ${opacity}; }
                    50% { transform: scale(1.1); opacity: ${opacity * 0.5}; }
                }
            `}</style>
            <span 
                className={cn(
                    "absolute inset-0 -z-10 rounded-md",
                    !glowColorValue && "bg-primary/20"
                )}
                style={glowColorValue ? {
                    backgroundColor: glowColorValue,
                    opacity: opacity,
                    animation: `pulse-glow ${animationDuration} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                } : {
                    opacity: opacity,
                    animation: `pulse-glow ${animationDuration} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                }}
            />
            {children}
        </button>
    );
};

// 8. Slide Arrow Button
export const SlideArrowButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button 
            className={cn("group flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-all hover:gap-4", sizeClass, className)}
            style={buttonStyle}
        >
            {children}
            <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
        </button>
    );
};

// 9. 3D Press Button
export const ThreeDPressButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button 
            className={cn("rounded-lg border-b-4 border-blue-700 bg-blue-500 px-8 py-3 font-bold text-white transition-all active:border-b-0 active:translate-y-1", sizeClass, className)}
            style={buttonStyle}
        >
            {children}
        </button>
    );
};

// 10. Ripple Button
export const RippleButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, rippleSize = 500, animationDuration = 600 } = props;
    const [coords, setCoords] = useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = useState(false);

    useEffect(() => {
        if (coords.x !== -1 && coords.y !== -1) {
            setIsRippling(true);
            setTimeout(() => setIsRippling(false), animationDuration);
        } else {
            setIsRippling(false);
        }
    }, [coords, animationDuration]);

    useEffect(() => {
        if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);

    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);

    return (
        <button
            className={cn("relative overflow-hidden rounded-lg bg-emerald-500 px-8 py-3 font-medium text-white shadow hover:bg-emerald-600", sizeClass, className)}
            style={buttonStyle}
            onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
        >
            {isRippling && (
                <span
                    className="absolute rounded-full bg-white/30"
                    style={{ 
                        left: coords.x, 
                        top: coords.y, 
                        width: 20, 
                        height: 20, 
                        transform: 'translate(-50%, -50%)',
                        animation: `ripple ${animationDuration}ms linear`,
                    }}
                />
            )}
            <span className="relative z-10">{children}</span>
            <style>{`
                @keyframes ripple {
                    0% { width: 0; height: 0; opacity: 0.5; }
                    100% { width: ${rippleSize}px; height: ${rippleSize}px; opacity: 0; }
                }
            `}</style>
        </button>
    );
};

// 11. Ghost Hover Button
export const GhostHoverButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button 
            className={cn("rounded-lg border border-white/20 bg-transparent px-8 py-3 font-medium text-white transition-all hover:bg-white hover:text-black hover:scale-105", sizeClass, className)}
            style={buttonStyle}
        >
            {children}
        </button>
    );
};

// 12. Status Loading Button
export const StatusLoadingButton = (props: CommonButtonProps) => {
    const { buttonText, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleClick = () => {
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        }, 1500);
    };

    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);

    return (
        <button
            onClick={handleClick}
            disabled={status !== 'idle'}
            className={cn(
                "flex min-w-[140px] items-center justify-center rounded-lg px-6 py-3 font-medium text-white transition-all",
                status === 'idle' && "bg-indigo-600 hover:bg-indigo-500",
                status === 'loading' && "bg-indigo-400 cursor-wait",
                status === 'success' && "bg-green-500",
                sizeClass,
                className
            )}
            style={buttonStyle}
        >
            {status === 'idle' && (buttonText || "Submit")}
            {status === 'loading' && <Loader2 className="animate-spin" />}
            {status === 'success' && <Check />}
        </button>
    );
};

// 13. Spotlight Button
export const SpotlightButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const btnRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);

    return (
        <button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn("relative overflow-hidden rounded-lg bg-neutral-900 px-8 py-3 text-neutral-200", sizeClass, className)}
            style={buttonStyle}
        >
            <span
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 40%)`
                }}
            />
            <div className="relative z-10 border border-white/10 rounded-[7px] bg-neutral-900/50 px-8 py-3">
                {children}
            </div>
        </button>
    );
};

// 14. Pixel Art Button
export const PixelArtButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        shadowLayerColor = "#d4d4d4",
        mainButtonColor = "#facc15",
        pixelBorderColor = "#000000"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    
    // Helper to convert hex/rgb to rgb string for inline styles
    const hexToRgb = (hex: string): string => {
        if (hex.startsWith('rgb')) return hex;
        if (!hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    return (
        <button 
            className={cn("relative px-6 py-3 font-mono font-bold uppercase text-black transition-transform active:translate-y-1 active:shadow-none", sizeClass, className)}
            style={buttonStyle}
        >
            <div 
                className="absolute inset-0 translate-y-1 translate-x-1" 
                style={{ 
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    backgroundColor: hexToRgb(shadowLayerColor)
                }} 
            />
            <div 
                className="absolute inset-0 border-2" 
                style={{ 
                    borderColor: hexToRgb(pixelBorderColor),
                    backgroundColor: hexToRgb(mainButtonColor)
                }} 
            />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

// 15. Glassmorphism Button
export const GlassmorphismButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button 
            className={cn("rounded-lg border border-white/20 bg-white/10 px-8 py-3 font-medium text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105", sizeClass, className)}
            style={buttonStyle}
        >
            {children}
        </button>
    );
};

// 16. Neon Flicker Button
export const NeonFlickerButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, flickerSpeed = 0.1, glowColor } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const glowColorValue = glowColor || "#22d3ee";
    const glowRgb = glowColorValue.startsWith('#') 
        ? `${parseInt(glowColorValue.slice(1, 3), 16)}, ${parseInt(glowColorValue.slice(3, 5), 16)}, ${parseInt(glowColorValue.slice(5, 7), 16)}`
        : "34, 211, 238";
    
    return (
        <button 
            className={cn("group rounded-lg border bg-transparent px-8 py-3 font-medium transition-all hover:bg-cyan-400 hover:text-black", sizeClass, className)}
            style={{
                ...buttonStyle,
                borderColor: glowColorValue,
                color: glowColorValue,
                boxShadow: `0 0 10px rgba(${glowRgb}, 0.5)`,
            }}
        >
            <style>{`
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .neon-flicker {
                    animation: flicker ${flickerSpeed}s infinite;
                }
            `}</style>
            <span className="neon-flicker">{children}</span>
        </button>
    );
};

// 17. Elastic Button
export const ElasticButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, elasticScale = 1.1, animationDuration = 300 } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button 
            className={cn("rounded-2xl bg-orange-500 px-8 py-3 font-bold text-white transition-transform active:scale-90", sizeClass, className)}
            style={{
                ...buttonStyle,
                transitionDuration: `${animationDuration}ms`,
                transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(${elasticScale})`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
            }}
        >
            {children}
        </button>
    );
};

// 18. Copy Clipboard Button
export const CopyClipboardButton = (props: CommonButtonProps) => {
    const { copyText, children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [copied, setCopied] = useState(false);
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const displayText = copyText || children || "Copy Code";

    return (
        <button
            onClick={handleCopy}
            className={cn(
                "flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all",
                copied
                    ? "border-green-500 bg-green-500/10 text-green-500"
                    : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700",
                sizeClass,
                className
            )}
            style={buttonStyle}
        >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : displayText}
        </button>
    );
};

// 19. Social Share Button
export const SocialShareButton = (props: CommonButtonProps) => {
    const { className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <div
          className={cn(
            "inline-flex items-center gap-3 rounded-full bg-blue-600 px-4 py-2 text-white shadow-lg shadow-blue-500/30 transition-all",
            sizeClass,
            className
          )}
          style={buttonStyle}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700/60">
                <Share2 size={18} />
            </div>
            <div className="flex gap-3">
                <button type="button" className="hover:text-blue-200 transition-colors">
                  <Twitter size={16} />
                  <span className="sr-only">Share to Twitter</span>
                </button>
                <button type="button" className="hover:text-blue-200 transition-colors">
                  <Facebook size={16} />
                  <span className="sr-only">Share to Facebook</span>
                </button>
                <button type="button" className="hover:text-blue-200 transition-colors">
                  <Linkedin size={16} />
                  <span className="sr-only">Share to LinkedIn</span>
                </button>
            </div>
        </div>
    );
};

// 20. Download Progress Button
export const DownloadProgressButton = (props: CommonButtonProps) => {
    const { downloadText, children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<'idle' | 'downloading' | 'complete'>('idle');
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);

    const startDownload = () => {
        if (status !== 'idle') return;
        setStatus('downloading');
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 10;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setStatus('complete');
                setTimeout(() => {
                    setStatus('idle');
                    setProgress(0);
                }, 2000);
            }
            setProgress(p);
        }, 100);
    };

    const displayText = downloadText || children || "Download";

    return (
        <button
            onClick={startDownload}
            className={cn("relative h-12 w-40 overflow-hidden rounded-lg bg-neutral-800 font-medium text-white", sizeClass, className)}
            style={buttonStyle}
        >
            <div
                className="absolute inset-0 bg-green-600 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
            />
            <div className="relative z-10 flex items-center justify-center gap-2">
                {status === 'idle' && <><Download size={18} /> {displayText}</>}
                {status === 'downloading' && `${Math.round(progress)}%`}
                {status === 'complete' && <><Check size={18} /> Done</>}
            </div>
        </button>
    );
};

// --- NEW BUTTONS (21-70) ---

// 21. Swipe Right Button
export const SwipeRightButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        swipeRightFillColor = "#2563eb"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    
    // Helper to convert hex/rgb to rgb string for inline styles
    const hexToRgb = (hex: string): string => {
        if (hex.startsWith('rgb')) return hex;
        if (!hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    return (
        <button className={cn("group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all", sizeClass, className)} style={buttonStyle}>
            <span className="relative z-10">{children}</span>
            <div 
                className="absolute inset-0 h-full w-full translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0" 
                style={{ backgroundColor: hexToRgb(swipeRightFillColor) }}
            />
        </button>
    );
};

// 22. Swipe Up Button
export const SwipeUpButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        swipeUpFillColor = "#9333ea"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    
    // Helper to convert hex/rgb to rgb string for inline styles
    const hexToRgb = (hex: string): string => {
        if (hex.startsWith('rgb')) return hex;
        if (!hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    return (
        <button className={cn("group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all", sizeClass, className)} style={buttonStyle}>
            <span className="relative z-10">{children}</span>
            <div 
                className="absolute inset-0 h-full w-full translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0" 
                style={{ backgroundColor: hexToRgb(swipeUpFillColor) }}
            />
        </button>
    );
};

// 23. Scale Up Button
export const ScaleUpButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        scaleUpFillColor = "#db2777"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    
    // Helper to convert hex/rgb to rgb string for inline styles
    const hexToRgb = (hex: string): string => {
        if (hex.startsWith('rgb')) return hex;
        if (!hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    return (
        <button className={cn("group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all", sizeClass, className)} style={buttonStyle}>
            <span className="relative z-10">{children}</span>
            <div 
                className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-transform duration-300 group-hover:scale-100" 
                style={{ backgroundColor: hexToRgb(scaleUpFillColor) }}
            />
        </button>
    );
};

// 24. Draw Border Button
export const DrawBorderButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const borderColorValue = borderColor || textColor || "#60a5fa";
    return (
        <button className={cn("group relative px-8 py-3 text-blue-400 transition-colors hover:text-blue-300", sizeClass, className)} style={buttonStyle}>
            {children}
            <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: borderColorValue }} />
            <span className="absolute bottom-0 left-0 h-0 w-[2px] transition-all duration-300 group-hover:h-full" style={{ backgroundColor: borderColorValue }} />
            <span className="absolute top-0 right-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: borderColorValue }} />
            <span className="absolute top-0 right-0 h-0 w-[2px] transition-all duration-300 group-hover:h-full" style={{ backgroundColor: borderColorValue }} />
        </button>
    );
};

// 25. Dotted Border Button
export const DottedBorderButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("rounded-lg border-2 border-dashed border-neutral-600 px-8 py-3 text-neutral-400 transition-all hover:border-white hover:text-white hover:tracking-wider", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 26. Gradient Ring Button
export const GradientRingButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("relative rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] transition-transform hover:scale-105", sizeClass, className)} style={buttonStyle}>
            <div className="rounded-full bg-black px-8 py-3 text-white transition-colors hover:bg-opacity-90">
                {children}
            </div>
        </button>
    );
};

// 27. Cyber Button
export const CyberButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const borderColorValue = borderColor || "#facc15";
    return (
        <button className={cn("relative border bg-yellow-400/10 px-8 py-3 font-mono clip-path-polygon-[0_0,100%_0,100%_70%,85%_100%,0_100%] hover:bg-yellow-400 hover:text-black", sizeClass, className)} style={{ ...buttonStyle, borderColor: borderColorValue, color: textColor || borderColorValue }}>
            {children}
            <div className="absolute bottom-0 right-0 h-2 w-2" style={{ backgroundColor: borderColorValue }} />
        </button>
    );
};

// 28. Retro 95 Button
export const Retro95Button = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("border-t-2 border-l-2 border-b-4 border-r-4 border-t-white border-l-white border-b-neutral-800 border-r-neutral-800 bg-neutral-300 px-6 py-2 font-sans font-bold text-black active:border-t-neutral-800 active:border-l-neutral-800 active:border-b-white active:border-r-white", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 29. Clay Button
export const ClayButton = (props: CommonButtonProps) => {
    const { 
        children, 
        className, 
        style, 
        size, 
        borderRadius, 
        paddingX, 
        paddingY, 
        backgroundColor, 
        textColor, 
        borderColor, 
        borderWidth,
        shadowLightColor = "#ffffff",
        shadowDarkColor = "#d1d1d4"
    } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    
    // Helper to convert hex/rgb to hex string for shadow
    const hexToHex = (hex: string): string => {
        if (hex.startsWith('#')) return hex;
        if (hex.startsWith('rgb')) {
            const match = hex.match(/\d+/g);
            if (match && match.length >= 3) {
                const r = parseInt(match[0]).toString(16).padStart(2, '0');
                const g = parseInt(match[1]).toString(16).padStart(2, '0');
                const b = parseInt(match[2]).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`;
            }
        }
        return hex;
    };
    
    const shadowLightHex = hexToHex(shadowLightColor);
    const shadowDarkHex = hexToHex(shadowDarkColor);
    
    return (
        <button 
            className={cn("rounded-2xl bg-[#f0f0f3] px-8 py-3 font-bold text-neutral-600 transition-transform hover:scale-95", sizeClass, className)} 
            style={{
                ...buttonStyle,
                boxShadow: `10px 10px 20px ${shadowDarkHex}, -10px -10px 20px ${shadowLightHex}`,
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = `inset 10px 10px 20px ${shadowDarkHex}, inset -10px -10px 20px ${shadowLightHex}`;
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = `10px 10px 20px ${shadowDarkHex}, -10px -10px 20px ${shadowLightHex}`;
            }}
        >
            {children}
        </button>
    );
};

// 30. Skeuo Button
export const SkeuoButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("rounded-lg border-b-4 border-neutral-700 bg-gradient-to-b from-neutral-500 to-neutral-600 px-8 py-3 font-bold text-white shadow-lg active:mt-1 active:border-b-0", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 31. Shake Error Button
export const ShakeErrorButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [shaking, setShaking] = useState(false);
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button
            onClick={() => { setShaking(true); setTimeout(() => setShaking(false), 500); }}
            className={cn("rounded-lg bg-red-600 px-8 py-3 font-medium text-white hover:bg-red-700", shaking && "animate-[shake_0.5s_ease-in-out]", sizeClass, className)}
            style={buttonStyle}
        >
            <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }`}</style>
            {children || "Error Shake"}
        </button>
    );
};

// 32. Confetti Button (CSS Burst)
export const ConfettiButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [burst, setBurst] = useState(false);
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button
            onClick={() => { setBurst(true); setTimeout(() => setBurst(false), 500); }}
            className={cn("relative rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-8 py-3 font-bold text-white", sizeClass, className)}
            style={buttonStyle}
        >
            {children || "Celebration"}
            {burst && (
                <>
                    <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-10 rounded-full bg-yellow-400 animate-[ping_0.5s_ease-out]" />
                    <div className="absolute top-0 left-1/3 h-2 w-2 -translate-y-8 rounded-full bg-red-400 animate-[ping_0.6s_ease-out]" />
                    <div className="absolute top-0 right-1/3 h-2 w-2 -translate-y-8 rounded-full bg-green-400 animate-[ping_0.4s_ease-out]" />
                </>
            )}
        </button>
    );
};

// 33. Hold to Confirm
export const HoldButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, holdDuration = 1000 } = props;
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<any>(null);
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);

    const start = () => {
        const increment = 100 / (holdDuration / 20);
        intervalRef.current = setInterval(() => {
            setProgress(p => p >= 100 ? 100 : p + increment);
        }, 20);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        setProgress(0);
    };

    return (
        <button
            onMouseDown={start}
            onMouseUp={stop}
            onMouseLeave={stop}
            className={cn("relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 font-medium text-white select-none", sizeClass, className)}
            style={buttonStyle}
        >
            <div className="absolute inset-0 bg-green-600 transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
            <span className="relative z-10">{progress >= 100 ? "Confirmed!" : (children || "Hold to Confirm")}</span>
        </button>
    );
};

// 34. Delete Confirm
export const DeleteButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [step, setStep] = useState(0);
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button
            onClick={() => setStep(step === 0 ? 1 : 0)}
            className={cn(
                "flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors",
                step === 0 ? "bg-neutral-800 text-white hover:bg-neutral-700" : "bg-red-600 text-white hover:bg-red-700",
                sizeClass,
                className
            )}
            style={buttonStyle}
        >
            <Trash size={18} />
            {step === 0 ? (children || "Delete") : "Are you sure?"}
        </button>
    );
};

// 35. Like Heart Button
export const LikeButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [liked, setLiked] = useState(false);
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button
            onClick={() => setLiked(!liked)}
            className={cn(
                "flex items-center gap-2 rounded-full border px-6 py-2 transition-all",
                liked ? "border-pink-500 bg-pink-50 text-pink-500" : "border-neutral-700 bg-transparent text-neutral-400 hover:border-neutral-500",
                sizeClass,
                className
            )}
            style={buttonStyle}
        >
            <Heart size={18} className={cn("transition-all", liked && "fill-current scale-110")} />
            {liked ? "Liked" : (children || "Like")}
        </button>
    );
};

// 36. Skew Button
export const SkewButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group -skew-x-12 border border-white px-8 py-3 text-white transition-colors hover:bg-white hover:text-black", sizeClass, className)} style={buttonStyle}>
            <div className="skew-x-12">{children}</div>
        </button>
    );
};

// 37. Blob Button
export const BlobButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-indigo-500 px-8 py-4 font-bold text-white transition-all hover:rounded-[70%_30%_30%_70%_/_70%_70%_30%_30%] hover:bg-indigo-600", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 38. Underline Button
export const UnderlineButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const underlineColor = borderColor || textColor || "#ffffff";
    return (
        <button className={cn("group relative px-4 py-2 text-white", sizeClass, className)} style={buttonStyle}>
            {children}
            <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: underlineColor }} />
        </button>
    );
};

// 39. Bracket Button
export const BracketButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const bracketColor = borderColor || textColor || "#ffffff";
    return (
        <button className={cn("group relative px-6 py-2 text-white", sizeClass, className)} style={buttonStyle}>
            <span className="absolute left-0 top-0 h-full w-2 border-l-2 transition-all group-hover:h-full group-hover:border-l-4 opacity-0 group-hover:opacity-100" style={{ borderColor: bracketColor }} />
            <span className="absolute right-0 top-0 h-full w-2 border-r-2 transition-all group-hover:h-full group-hover:border-r-4 opacity-0 group-hover:opacity-100" style={{ borderColor: bracketColor }} />
            [ {children} ]
        </button>
    );
};

// 40. Curtain Button
export const CurtainButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative overflow-hidden bg-neutral-800 px-8 py-3 text-white", sizeClass, className)} style={buttonStyle}>
            <div className="absolute inset-0 z-10 flex items-center justify-center font-bold transition-transform duration-300 group-hover:-translate-y-full">
                {children}
            </div>
            <div className="absolute inset-0 z-10 flex translate-y-full items-center justify-center font-bold text-black transition-transform duration-300 group-hover:translate-y-0 bg-white">
                {children}
            </div>
        </button>
    );
};

// 41. Slice Button
export const SliceButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const bgColor = backgroundColor || "#2563eb";
    return (
        <button className={cn("group relative px-8 py-3 font-bold text-white", sizeClass, className)} style={buttonStyle}>
            <span className="absolute inset-0 transition-transform duration-300 group-hover:skew-x-12" style={{ backgroundColor: bgColor }} />
            <span className="relative">{children}</span>
        </button>
    );
};

// 42. Wet Paint Button
export const WetPaintButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all hover:shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.5)] hover:translate-y-[-2px]", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 43. Particle Button (Simplified visual)
export const ParticleButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative rounded-full border border-white/20 bg-black px-8 py-3 text-white", sizeClass, className)} style={buttonStyle}>
            <span className="absolute -top-1 left-1/4 h-1 w-1 rounded-full bg-white opacity-0 transition-all duration-500 group-hover:top-[-10px] group-hover:opacity-100" />
            <span className="absolute -bottom-1 right-1/4 h-1 w-1 rounded-full bg-white opacity-0 transition-all duration-500 group-hover:bottom-[-10px] group-hover:opacity-100" />
            {children}
        </button>
    );
};

// 44. Isometric Button
export const IsometricButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("transform rotate-[-5deg] skew-x-[-5deg] bg-neutral-200 border border-neutral-300 px-8 py-3 text-neutral-800 shadow-[5px_5px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.2)] transition-all", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 45. Paper Fold Button
export const PaperFoldButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("relative bg-white px-8 py-3 text-black shadow-md transition-transform hover:-rotate-2 hover:scale-105", sizeClass, className)} style={buttonStyle}>
            <div className="absolute top-0 right-0 h-4 w-4 bg-neutral-300" style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%)" }} />
            {children}
        </button>
    );
};

// 46. Text Fill Button
export const TextFillButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative border border-white px-8 py-3 font-bold text-transparent bg-clip-text bg-white transition-colors hover:text-black", sizeClass, className)} style={buttonStyle}>
            <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10" />
            {children}
        </button>
    );
};

// 47. Icon Slide Button
export const IconSlideButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group flex items-center gap-2 overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-white", sizeClass, className)} style={buttonStyle}>
            <span className="-translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowRight size={18} />
            </span>
            <span className="-translate-x-2 transition-all duration-300 group-hover:translate-x-0">{children}</span>
        </button>
    );
};

// 48. Multi Layer Button
export const MultiLayerButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <div className="relative group cursor-pointer">
            <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-lg bg-pink-500 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-blue-500 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
            <button className={cn("relative rounded-lg bg-white px-8 py-3 font-bold text-black border-2 border-black", sizeClass, className)} style={buttonStyle}>
                {children}
            </button>
        </div>
    );
};

// 49. Upload Button
export const UploadButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group flex items-center gap-2 rounded-lg bg-neutral-800 px-6 py-3 text-white transition-all hover:bg-neutral-700", sizeClass, className)} style={buttonStyle}>
            <Upload size={18} className="transition-transform duration-300 group-hover:-translate-y-1" />
            {children || "Upload"}
        </button>
    );
};

// 50. Toggle Switch Button
export const ToggleSwitchButton = (props: CommonButtonProps) => {
    const { className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const [on, setOn] = useState(false);
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button
            onClick={() => setOn(!on)}
            className={cn("relative h-8 w-14 rounded-full transition-colors", on ? "bg-green-500" : "bg-neutral-600", sizeClass, className)}
            style={buttonStyle}
        >
            <div className={cn("absolute top-1 h-6 w-6 rounded-full bg-white transition-all", on ? "left-7" : "left-1")} />
        </button>
    );
};

// 51. Swipe Left Button
export const SwipeLeftButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all", sizeClass, className)} style={buttonStyle}>
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 h-full w-full translate-x-[100%] bg-red-600 transition-transform duration-300 group-hover:translate-x-0" />
        </button>
    );
};

// 52. Swipe Down Button
export const SwipeDownButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white transition-all", sizeClass, className)} style={buttonStyle}>
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 h-full w-full -translate-y-[100%] bg-orange-600 transition-transform duration-300 group-hover:translate-y-0" />
        </button>
    );
};

// 53. Double Border Button
export const DoubleBorderButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("rounded-lg border-4 border-double border-white px-8 py-2 font-bold text-white hover:bg-white hover:text-black transition-colors", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 54. Spinning Border Button
export const SpinningBorderButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, spinSpeed = 2 } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button 
            className={cn("group relative overflow-hidden rounded-lg bg-neutral-900 px-8 py-3 text-white", sizeClass, className)}
            style={buttonStyle}
        >
            <span 
                className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    animation: `spin ${spinSpeed}s linear infinite`,
                }}
            />
            <span className="relative block rounded bg-neutral-900 px-4 py-1 z-10">{children}</span>
        </button>
    );
};

// 55. Letter Spacing Button
export const LetterSpacingButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("rounded-lg border border-neutral-500 px-8 py-3 text-neutral-300 transition-all hover:tracking-[0.5em] hover:text-white hover:border-white", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// 56. Blur Reveal Button
export const BlurRevealButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative px-8 py-3 text-white", sizeClass, className)} style={buttonStyle}>
            <span className="absolute inset-0 blur-md bg-white/20 scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            <span className="relative">{children}</span>
        </button>
    );
};

// 57. Vaporwave Button
export const VaporwaveButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const htmlButtonProps = extractHtmlButtonProps(props);
    
    return (
        <button 
            {...htmlButtonProps}
            className={cn("rounded-lg bg-gradient-to-r from-pink-500 to-cyan-500 px-8 py-3 font-bold text-white italic shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] transition-all", sizeClass, className)} 
            style={buttonStyle}
        >
            {children}
        </button>
    );
};

// 58. Save Button
export const SaveButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white shadow-md hover:bg-blue-700 active:bg-blue-800", sizeClass, className)} style={buttonStyle}>
            <Save size={16} /> {children || "Save"}
        </button>
    );
};

// 59. Print Button
export const PrintButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("flex items-center gap-2 rounded-md border border-neutral-600 bg-transparent px-6 py-2 text-neutral-300 hover:bg-neutral-800 hover:text-white", sizeClass, className)} style={buttonStyle}>
            <Printer size={16} /> {children || "Print"}
        </button>
    );
};

// 60. Notification Button
export const NotificationButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("relative rounded-full bg-neutral-800 p-3 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors", sizeClass, className)} style={buttonStyle}>
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-neutral-900" />
            {children}
        </button>
    );
};

// 61. Circle to Square Button
export const CircleToSquareButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white text-black transition-all duration-300 hover:w-32 hover:rounded-lg", sizeClass, className)} style={buttonStyle}>
            <Plus size={24} className="shrink-0" />
            <span className="ml-2 w-0 overflow-hidden opacity-0 whitespace-nowrap transition-all duration-300 hover:w-auto hover:opacity-100">{children || "Add New"}</span>
        </button>
    );
};

// 62. Morph FAB Button
export const MorphFabButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all hover:rotate-90 hover:bg-red-500", sizeClass, className)} style={buttonStyle}>
            {children || <Plus size={24} className="transition-transform group-hover:rotate-45" />}
        </button>
    );
};

// 63. Shiny Reflection Button
export const ShinyReflectionButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative overflow-hidden rounded-lg bg-neutral-800 px-8 py-3 text-white border border-neutral-700", sizeClass, className)} style={buttonStyle}>
            <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            <span className="relative">{children}</span>
        </button>
    );
};

// 64. Dot Hover Button
export const DotHoverButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const dotColor = borderColor || textColor || "#818cf8";
    return (
        <button className={cn("group relative px-8 py-3 text-white transition-all hover:text-indigo-400", sizeClass, className)} style={buttonStyle}>
            <span className="absolute left-2 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full opacity-0 transition-all group-hover:left-4 group-hover:opacity-100" style={{ backgroundColor: dotColor }} />
            {children}
        </button>
    );
};

// 65. Text Marquee Button
export const TextMarqueeButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const displayText = children || "Start";
    return (
        <button className={cn("group relative w-32 overflow-hidden rounded-full border border-white/20 py-2 text-white", sizeClass, className)} style={buttonStyle}>
            <div className="flex w-full justify-center transition-transform duration-300 group-hover:-translate-y-[150%]">
                {displayText}
            </div>
            <div className="absolute inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
                Let's Go!
            </div>
        </button>
    );
};

// 66. Scramble Text Button (Simulated)
export const ScrambleTextButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group font-mono px-8 py-3 text-green-500 border border-green-500/50 hover:bg-green-500/10", sizeClass, className)} style={buttonStyle}>
            <span className="group-hover:hidden">{children}</span>
            <span className="hidden group-hover:inline">#{children}*</span>
        </button>
    );
};

// 67. Typewriter Button
export const TypewriterButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-neutral-300 border border-neutral-800 hover:border-neutral-600", sizeClass, className)} style={buttonStyle}>
            <Terminal size={16} />
            <span className="border-r-2 border-neutral-500 pr-1 animate-pulse">{children || "Execute"}</span>
        </button>
    );
};

// 68. Liquid Blob Button (SVG Filter needed, simplified here)
export const LiquidBlobButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("group relative rounded-lg bg-indigo-500 px-8 py-3 text-white transition-transform hover:scale-110", sizeClass, className)} style={buttonStyle}>
            <div className="absolute inset-0 -z-10 rounded-lg bg-indigo-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            {children}
        </button>
    );
};

// 69. CyberPunk Glitch 2
export const CyberPunkGlitch2Button = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    const accentColor = borderColor || "#fde047";
    return (
        <button className={cn("relative border-2 bg-black px-6 py-2 font-bold uppercase transition-colors hover:bg-yellow-300 hover:text-black", sizeClass, className)} style={{ ...buttonStyle, borderColor: accentColor, color: textColor || accentColor }}>
            <span className="absolute -top-1 -left-1 block h-2 w-2" style={{ backgroundColor: accentColor }} />
            <span className="absolute -bottom-1 -right-1 block h-2 w-2" style={{ backgroundColor: accentColor }} />
            {children}
        </button>
    );
};

// 70. Rounded Corner Morph
export const RoundedCornerMorphButton = (props: CommonButtonProps) => {
    const { children, className, style, size, borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth } = props;
    const buttonStyle = buildButtonStyle({ borderRadius, paddingX, paddingY, backgroundColor, textColor, borderColor, borderWidth, style });
    const sizeClass = getSizeClass(size);
    return (
        <button className={cn("rounded-sm bg-neutral-200 px-8 py-3 text-black transition-all duration-500 hover:rounded-full hover:bg-neutral-300", sizeClass, className)} style={buttonStyle}>
            {children}
        </button>
    );
};

// Export all components by name for the component library
export const buttonComponentsByName: Record<string, React.ComponentType<any>> = {
    MagneticButton,
    GlitchButton,
    LiquidHoverButton,
    NeumorphicButton,
    GradientBorderButton,
    ShimmerButton,
    PulseGlowButton,
    "Subscribe-Button": SubscribeButton,
    SlideArrowButton,
    ThreeDPressButton,
    RippleButton,
    GhostHoverButton,
    StatusLoadingButton,
    SpotlightButton,
    PixelArtButton,
    GlassmorphismButton,
    NeonFlickerButton,
    ElasticButton,
    CopyClipboardButton,
    SocialShareButton,
    DownloadProgressButton,
    SwipeRightButton,
    SwipeUpButton,
    ScaleUpButton,
    DrawBorderButton,
    DottedBorderButton,
    GradientRingButton,
    CyberButton,
    Retro95Button,
    ClayButton,
    SkeuoButton,
    ShakeErrorButton,
    ConfettiButton,
    HoldButton,
    DeleteButton,
    LikeButton,
    SkewButton,
    BlobButton,
    UnderlineButton,
    BracketButton,
    CurtainButton,
    SliceButton,
    WetPaintButton,
    ParticleButton,
    IsometricButton,
    PaperFoldButton,
    TextFillButton,
    IconSlideButton,
    MultiLayerButton,
    UploadButton,
    ToggleSwitchButton,
    SwipeLeftButton,
    SwipeDownButton,
    DoubleBorderButton,
    SpinningBorderButton,
    LetterSpacingButton,
    BlurRevealButton,
    VaporwaveButton,
    SaveButton,
    PrintButton,
    NotificationButton,
    CircleToSquareButton,
    MorphFabButton,
    ShinyReflectionButton,
    DotHoverButton,
    TextMarqueeButton,
    ScrambleTextButton,
    TypewriterButton,
    LiquidBlobButton,
    CyberPunkGlitch2Button,
    RoundedCornerMorphButton,
};

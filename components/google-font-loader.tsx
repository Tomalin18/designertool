"use client"

import { useEffect, useState } from "react"

interface Font {
    name: string
    weights: number[]
}

interface GoogleFontLoaderProps {
    fonts: Font[]
}

export function GoogleFontLoader({ fonts }: GoogleFontLoaderProps) {
    const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set())

    useEffect(() => {
        if (fonts.length === 0) return

        // Separate fonts into priority groups
        const latinFonts = fonts.filter(font =>
            !font.name.includes('Noto') ||
            (!font.name.includes('TC') && !font.name.includes('JP'))
        )
        const cjkFonts = fonts.filter(font =>
            font.name.includes('Noto') &&
            (font.name.includes('TC') || font.name.includes('JP'))
        )

        // Load Latin fonts immediately (smaller files)
        const loadFonts = (fontsToLoad: Font[]) => {
            const fontFamilies = fontsToLoad
                .filter(font => !loadedFonts.has(font.name))
                .map((font) => {
                    const weights = font.weights.join(";")
                    return `family=${font.name.replace(/\s+/g, "+")}:wght@${weights}`
                })
                .join("&")

            if (fontFamilies) {
                const link = document.createElement("link")
                link.href = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`
                link.rel = "stylesheet"
                document.head.appendChild(link)

                // Mark fonts as loaded
                fontsToLoad.forEach(font => {
                    setLoadedFonts(prev => new Set(prev).add(font.name))
                })
            }
        }

        // Load Latin fonts immediately
        loadFonts(latinFonts)

        // Load CJK fonts after a delay (they're much larger)
        const cjkTimeout = setTimeout(() => {
            loadFonts(cjkFonts)
        }, 1000)

        return () => {
            clearTimeout(cjkTimeout)
        }
    }, [fonts])

    return null
}

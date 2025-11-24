"use client"

import { useEffect } from "react"

interface Font {
    name: string
    weights: number[]
}

interface GoogleFontLoaderProps {
    fonts: Font[]
}

export function GoogleFontLoader({ fonts }: GoogleFontLoaderProps) {
    useEffect(() => {
        if (fonts.length === 0) return

        // Construct the Google Fonts URL
        // Format: family=Font1:wght@400;700&family=Font2:wght@400
        const fontFamilies = fonts
            .map((font) => {
                const weights = font.weights.join(";")
                return `family=${font.name.replace(/\s+/g, "+")}:wght@${weights}`
            })
            .join("&")

        const link = document.createElement("link")
        link.href = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`
        link.rel = "stylesheet"

        document.head.appendChild(link)

        return () => {
            document.head.removeChild(link)
        }
    }, [fonts])

    return null
}

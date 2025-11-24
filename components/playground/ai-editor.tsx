"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sparkles } from "lucide-react"
import type { CanvasElement } from "@/lib/playground/types"
import { usePlayground } from "@/lib/playground/store"

interface AIEditorProps {
  element: CanvasElement
}

export function AIEditor({ element }: AIEditorProps) {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { updateElement, getSelectedFrame } = usePlayground()

  const handleAIEdit = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    const frame = getSelectedFrame()
    if (!frame) return

    try {
      // Placeholder for AI service integration
      // For now, we'll just update some basic properties based on the prompt
      const lowerPrompt = prompt.toLowerCase()

      const updates: Partial<CanvasElement> = {
        props: { ...element.props },
      }

      // Simple keyword-based updates (placeholder until AI integration)
      if (lowerPrompt.includes("red") || lowerPrompt.includes("紅色")) {
        updates.props = { ...updates.props, variant: "destructive" }
      }
      if (lowerPrompt.includes("large") || lowerPrompt.includes("大")) {
        updates.props = { ...updates.props, size: "lg" }
      }
      if (lowerPrompt.includes("small") || lowerPrompt.includes("小")) {
        updates.props = { ...updates.props, size: "sm" }
      }
      if (lowerPrompt.includes("text") || lowerPrompt.includes("文字")) {
        const textMatch = prompt.match(/"([^"]+)"/) || prompt.match(/'([^']+)'/)
        if (textMatch) {
          updates.props = { ...updates.props, children: textMatch[1] }
        }
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateElement(frame.id, element.id, updates)
      setPrompt("")
    } catch (error) {
      console.error("AI edit failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>AI Editor</Label>
      <div className="flex gap-2">
        <Input
          placeholder="輸入 prompt 來編輯元件..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleAIEdit()
            }
          }}
          disabled={isLoading}
        />
        <Button
          onClick={handleAIEdit}
          disabled={isLoading || !prompt.trim()}
          size="icon"
        >
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>
      {isLoading && (
        <p className="text-xs text-muted-foreground">Processing...</p>
      )}
      <p className="text-xs text-muted-foreground">
        Use AI to modify this component. Example: "Make it red", "Change text to 'Hello'"
      </p>
    </div>
  )
}


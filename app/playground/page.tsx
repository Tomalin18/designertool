"use client"

import { PlaygroundProvider } from "@/lib/playground/store"
import { Canvas } from "@/components/playground/canvas"
import { Sidebar } from "@/components/playground/sidebar"
import { PropertiesPanel } from "@/components/playground/properties-panel"

export default function PlaygroundPage() {
  return (
    <PlaygroundProvider>
      <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex overflow-hidden">
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>
    </PlaygroundProvider>
  )
}


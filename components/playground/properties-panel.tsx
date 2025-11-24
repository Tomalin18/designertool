"use client"

import { usePlayground } from "@/lib/playground/store"
import { AIEditor } from "./ai-editor"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Code2, Download, Eraser } from "lucide-react"
import { useState, useEffect } from "react"
import { generateCode } from "@/lib/playground/code-generator"
import { CodeExportDialog } from "./code-export-dialog"

export function PropertiesPanel() {
  const { getSelectedElement, updateElement, deleteElement, getSelectedFrame, selectedElementId, clearFrame } = usePlayground()
  const [mounted, setMounted] = useState(false)
  const [showCodePreview, setShowCodePreview] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-80 border-l bg-background p-4">
        <div className="text-sm text-muted-foreground text-center py-8">
          Loading...
        </div>
      </div>
    )
  }

  const selectedElement = getSelectedElement()
  const selectedFrame = getSelectedFrame()

  if (!selectedElement && !selectedFrame) {
    return (
      <div className="w-80 border-l bg-background p-4">
        <div className="text-sm text-muted-foreground text-center py-8">
          Select an element to edit properties
        </div>
      </div>
    )
  }

  if (selectedElement) {
    const selectedFrame = getSelectedFrame()
    const codePreview = selectedFrame ? generateCode(selectedFrame, "jsx") : ""
    
    return (
      <div className="w-80 border-l bg-background overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-2">Properties</h3>
              <div className="text-xs text-muted-foreground mb-4">
                {selectedElement.type}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCodePreview(!showCodePreview)}
              >
                <Code2 className="h-4 w-4" />
              </Button>
              {selectedFrame && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExportDialog(true)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {showCodePreview && selectedFrame && (
            <>
              <div className="space-y-2">
                <Label>Code Preview</Label>
                <div className="bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-64">
                  <pre className="whitespace-pre-wrap">{codePreview}</pre>
                </div>
              </div>
              <Separator />
            </>
          )}

          <AIEditor element={selectedElement} />

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Position</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">X</Label>
                  <Input
                    type="number"
                    value={selectedElement.position.x}
                    onChange={(e) => {
                      const frame = getSelectedFrame()
                      if (frame) {
                        const newX = parseInt(e.target.value) || 0
                        // Constrain within frame boundaries
                        const maxX = frame.width - selectedElement.size.width
                        const constrainedX = Math.max(0, Math.min(newX, maxX))
                        
                        updateElement(frame.id, selectedElement.id, {
                          position: { ...selectedElement.position, x: constrainedX },
                        })
                      }
                    }}
                  />
                </div>
                <div>
                  <Label className="text-xs">Y</Label>
                  <Input
                    type="number"
                    value={selectedElement.position.y}
                    onChange={(e) => {
                      const frame = getSelectedFrame()
                      if (frame) {
                        const newY = parseInt(e.target.value) || 0
                        // Constrain within frame boundaries
                        const maxY = frame.height - selectedElement.size.height
                        const constrainedY = Math.max(0, Math.min(newY, maxY))
                        
                        updateElement(frame.id, selectedElement.id, {
                          position: { ...selectedElement.position, y: constrainedY },
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Size</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Width</Label>
                  <Input
                    type="number"
                    value={selectedElement.size.width}
                    onChange={(e) => {
                      const frame = getSelectedFrame()
                      if (frame) {
                        const newWidth = parseInt(e.target.value) || 0
                        // Constrain within frame boundaries
                        const maxWidth = frame.width - selectedElement.position.x
                        const constrainedWidth = Math.max(50, Math.min(newWidth, maxWidth))
                        
                        updateElement(frame.id, selectedElement.id, {
                          size: { ...selectedElement.size, width: constrainedWidth },
                        })
                      }
                    }}
                  />
                </div>
                <div>
                  <Label className="text-xs">Height</Label>
                  <Input
                    type="number"
                    value={selectedElement.size.height}
                    onChange={(e) => {
                      const frame = getSelectedFrame()
                      if (frame) {
                        const newHeight = parseInt(e.target.value) || 0
                        // Constrain within frame boundaries
                        const maxHeight = frame.height - selectedElement.position.y
                        const constrainedHeight = Math.max(50, Math.min(newHeight, maxHeight))
                        
                        updateElement(frame.id, selectedElement.id, {
                          size: { ...selectedElement.size, height: constrainedHeight },
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {selectedElement.props && Object.keys(selectedElement.props).length > 0 && (
              <div className="space-y-2">
                <Label>Component Props</Label>
                {Object.entries(selectedElement.props).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs">{key}</Label>
                    <Input
                      value={String(value)}
                      onChange={(e) => {
                        const frame = getSelectedFrame()
                        if (frame) {
                          updateElement(frame.id, selectedElement.id, {
                            props: { ...selectedElement.props, [key]: e.target.value },
                          })
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => {
              const frame = getSelectedFrame()
              if (frame) {
                deleteElement(frame.id, selectedElement.id)
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Element
          </Button>
        </div>
        
        {showExportDialog && selectedFrame && (
          <CodeExportDialog
            frame={selectedFrame}
            open={showExportDialog}
            onOpenChange={setShowExportDialog}
          />
        )}
      </div>
    )
  }

  // Show export button for frame
  if (selectedFrame && !selectedElement) {
    return (
      <div className="w-80 border-l bg-background overflow-y-auto">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Frame: {selectedFrame.name}</h3>
            <div className="text-xs text-muted-foreground mb-4">
              {selectedFrame.type} • {selectedFrame.layout}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button
              variant="default"
              size="sm"
              className="w-full"
              onClick={() => setShowExportDialog(true)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Code
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={() => {
                if (selectedFrame) {
                  if (confirm("確定要清除這個 frame 中的所有元素嗎？此操作無法復原。")) {
                    clearFrame(selectedFrame.id)
                  }
                }
              }}
            >
              <Eraser className="h-4 w-4 mr-2" />
              Clear Frame
            </Button>
          </div>
        </div>
        
        {showExportDialog && (
          <CodeExportDialog
            frame={selectedFrame}
            open={showExportDialog}
            onOpenChange={setShowExportDialog}
          />
        )}
      </div>
    )
  }

  return null
}


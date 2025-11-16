"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check } from "lucide-react"
import type { Frame, ExportFormat } from "@/lib/playground/types"
import { generateCode } from "@/lib/playground/code-generator"

interface CodeExportDialogProps {
  frame: Frame
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CodeExportDialog({ frame, open, onOpenChange }: CodeExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>("jsx")
  const [copied, setCopied] = useState(false)

  const code = generateCode(frame, format, frame.name.replace(/\s+/g, ""))

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleDownload = () => {
    const extension = format === "html" ? "html" : format === "react" ? "tsx" : "jsx"
    const filename = `${frame.name.replace(/\s+/g, "-")}.${extension}`
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Code</DialogTitle>
          <DialogDescription>
            Export your design as code. Choose a format and copy or download the generated code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-4">
            <div className="space-y-2 flex-1">
              <Label>Export Format</Label>
              <Select value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="jsx">JSX</SelectItem>
                  <SelectItem value="react">React (TSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-6">
              <Button variant="outline" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button onClick={handleDownload}>Download</Button>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
            <Label>Generated Code</Label>
            <Textarea
              value={code}
              readOnly
              className="flex-1 font-mono text-xs resize-none mt-2"
              style={{ minHeight: "400px" }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


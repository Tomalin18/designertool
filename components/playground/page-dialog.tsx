"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { usePlayground } from "@/lib/playground/store"
import type { FrameType, LayoutType, PageTemplate } from "@/lib/playground/types"

interface PageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PageDialog({ open, onOpenChange }: PageDialogProps) {
  const { addFrame } = usePlayground()
  const [name, setName] = useState("")
  const [template, setTemplate] = useState<PageTemplate>("blank")
  const [type, setType] = useState<FrameType>("web")
  const [layout, setLayout] = useState<LayoutType>("block")

  const handleCreate = () => {
    if (!name.trim()) {
      setName("Untitled Page")
    }

    const defaultSizes = {
      web: { width: 1440, height: 1024 },
      app: { width: 375, height: 812 },
    }

    addFrame({
      name: name.trim() || "Untitled Page",
      type,
      layout,
      width: defaultSizes[type].width,
      height: defaultSizes[type].height,
      elements: [],
    })

    // Reset form
    setName("")
    setTemplate("blank")
    setType("web")
    setLayout("block")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
          <DialogDescription>
            Create a new page frame for your design
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Page Name</Label>
            <Input
              id="name"
              placeholder="My Page"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Template</Label>
            <RadioGroup value={template} onValueChange={(v) => setTemplate(v as PageTemplate)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blank" id="blank" />
                <Label htmlFor="blank" className="font-normal cursor-pointer">
                  Blank Page
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="template" id="template" />
                <Label htmlFor="template" className="font-normal cursor-pointer">
                  From Template
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <RadioGroup value={type} onValueChange={(v) => setType(v as FrameType)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="web" id="web" />
                <Label htmlFor="web" className="font-normal cursor-pointer">
                  Web (Desktop)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="app" id="app" />
                <Label htmlFor="app" className="font-normal cursor-pointer">
                  App (Mobile)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="layout">Layout</Label>
            <Select value={layout} onValueChange={(v) => setLayout(v as LayoutType)}>
              <SelectTrigger id="layout">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import Link from "next/link"
import { ArrowRight, Package, Palette, Type, Sparkles, Grid3x3, Layers, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function HomePage() {
  const [selectOpen, setSelectOpen] = useState(false)
  const [progress, setProgress] = useState(60)

  return (
    <div className="container max-w-7xl mx-auto py-8 md:py-16 lg:py-20">
      {/* Hero Section */}
      <div className="text-center mb-16 lg:mb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Design System Library
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/40 bg-clip-text text-transparent">
          Build faster with ready-made components
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive library of components, colors, fonts, and icons for your next project.
        </p>
      </div>

      {/* Featured Components Preview */}
      <div className="mb-16 lg:mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Components</h2>
            <p className="text-muted-foreground">Try out some of our most popular components</p>
          </div>
          <Link href="/components">
            <Button variant="outline" className="gap-2">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Button Component */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Button</h3>
              <Badge variant="secondary">Interactive</Badge>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full">Primary Button</Button>
              <Button variant="secondary" className="w-full">Secondary</Button>
              <Button variant="outline" className="w-full">Outline</Button>
            </div>
          </Card>

          {/* Input Component */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Input</h3>
              <Badge variant="secondary">Form</Badge>
            </div>
            <div className="space-y-3">
              <Input placeholder="Email address" type="email" />
              <Input placeholder="Password" type="password" />
            </div>
          </Card>

          {/* Select Component with trigger button */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Select</h3>
              <Badge variant="secondary">Dropdown</Badge>
            </div>
            <div className="space-y-3">
              <Select open={selectOpen} onOpenChange={setSelectOpen}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setSelectOpen(!selectOpen)}
              >
                {selectOpen ? 'Close' : 'Open'} Select
              </Button>
            </div>
          </Card>

          {/* Switch Component */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Switch</h3>
              <Badge variant="secondary">Toggle</Badge>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing">Marketing emails</Label>
                <Switch id="marketing" />
              </div>
            </div>
          </Card>

          {/* Progress Component */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Progress</h3>
              <Badge variant="secondary">Indicator</Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <Slider
                value={[progress]}
                onValueChange={([value]) => setProgress(value)}
                max={100}
                step={1}
              />
            </div>
          </Card>

          {/* Badge Component */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Badge</h3>
              <Badge variant="secondary">Label</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Card>
        </div>
      </div>

      {/* Bento Grid - Resource Cards */}
      <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-6 mb-16">
        {/* Components - Large Card */}
        <Link href="/components" className="group md:col-span-4 md:row-span-2">
          <div className="relative h-full min-h-[400px] rounded-2xl border-2 bg-gradient-to-br from-primary/10 via-background to-background p-8 overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Components</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 group-hover:text-primary transition-colors">
                React Components
              </h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-lg">
                Beautifully designed, fully accessible components that you can copy and paste into your apps.
              </p>
              <div className="mt-auto flex items-center gap-2 text-primary font-medium">
                Browse library <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            {/* Decorative Grid */}
            <div className="absolute inset-0 grid grid-cols-12 gap-4 p-8 opacity-10">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="rounded border border-primary" />
              ))}
            </div>
          </div>
        </Link>

        {/* Colors - Medium Card */}
        <Link href="/colors" className="group md:col-span-2">
          <div className="relative h-full min-h-[200px] rounded-2xl border-2 bg-gradient-to-br from-violet-500/10 via-background to-background p-6 overflow-hidden transition-all hover:border-violet-500/50 hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
              <div className="p-2 rounded-lg bg-violet-500/10 w-fit mb-3">
                <Palette className="h-5 w-5 text-violet-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-500 transition-colors">
                Colors
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                50+ curated palettes
              </p>
              <div className="mt-auto flex gap-1.5">
                {['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'].map((color) => (
                  <div key={color} className="h-8 w-8 rounded-lg" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* Fonts - Medium Card */}
        <Link href="/fonts" className="group md:col-span-2">
          <div className="relative h-full min-h-[200px] rounded-2xl border-2 bg-gradient-to-br from-blue-500/10 via-background to-background p-6 overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full">
              <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
                <Type className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                Typography
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Professional fonts
              </p>
              <div className="mt-auto space-y-2">
                <div className="text-xs font-mono">Aa Bb Cc</div>
                <div className="text-lg font-serif">Aa Bb Cc</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Icons - Large Card */}
        <Link href="/icons" className="group md:col-span-4">
          <div className="relative h-full min-h-[200px] rounded-2xl border-2 bg-gradient-to-br from-amber-500/10 via-background to-background p-6 overflow-hidden transition-all hover:border-amber-500/50 hover:shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row justify-between h-full gap-6">
              <div>
                <div className="p-2 rounded-lg bg-amber-500/10 w-fit mb-3">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                  Icons Library
                </h3>
                <p className="text-muted-foreground">
                  Hundreds of carefully crafted icons
                </p>
              </div>
              <div className="grid grid-cols-6 gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                {[Package, Palette, Type, Sparkles, Grid3x3, Layers, Zap, ArrowRight].map((Icon, i) => (
                  <div key={i} className="h-10 w-10 rounded-lg border flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Section */}
      
    </div>
  )
}

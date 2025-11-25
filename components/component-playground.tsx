"use client"

import * as React from "react"
import { Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UrlInput } from "@/components/customize/url-input"
import { MediaPlayer } from "@/components/customize/media-player"
import { ChatInterface } from "@/components/customize/chat-interface"
import { SocialProfileCard } from "@/components/customize/SocialProfileCard"
import { GlassAuthForm } from "@/components/customize/glass-auth-form"
import { heroSections } from "@/lib/hero-sections"
import { heroComponentsByName } from "@/components/customize/heroes"
import { ThreeDCard } from "@/components/three-d-card"
import { AlertCircle, Terminal } from 'lucide-react'
import { componentDetails } from "@/lib/component-details"
import { CodeBlock } from "@/components/code-block"
import { ColorPicker } from "@/components/ui/color-picker"
import { CustomizePanel } from "@/components/component-playground-customize-panel"

const heroNameToMeta = heroSections.reduce<Record<string, (typeof heroSections)[number]>>((acc, hero) => {
  acc[hero.name] = hero
  return acc
}, {})

const componentConfigs: Record<string, any> = (() => {
  const configs: Record<string, any> = {
  Button: {
    props: {
      variant: { type: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"], default: "default" },
      size: { type: "select", options: ["default", "sm", "lg", "icon"], default: "default" },
      disabled: { type: "boolean", default: false },
      children: { type: "text", default: "Click me" },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 0 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        fontSize: '1.5rem',
      }
      if (borderWidth > 0) {
        style.borderWidth = `${borderWidth}px`
        style.borderStyle = 'solid'
        style.borderColor = 'hsl(var(--border))'
      }
      return (
        <Button
          {...domProps}
          className="scale-150"
          style={style}
        >
          {props.children}
        </Button>
      )
    },
  },
  Badge: {
    props: {
      variant: { type: "select", options: ["default", "secondary", "destructive", "outline"], default: "default" },
      children: { type: "text", default: "Badge" },
      borderRadius: { type: "slider", min: 0, max: 24, default: 12 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 0 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        fontSize: '1.25rem',
      }
      if (borderWidth > 0) {
        style.borderWidth = `${borderWidth}px`
        style.borderStyle = 'solid'
        style.borderColor = 'hsl(var(--border))'
      }
      return (
        <Badge
          {...domProps}
          className="scale-150 inline-block"
          style={style}
        >
          {props.children}
        </Badge>
      )
    },
  },
  Checkbox: {
    props: {
      disabled: { type: "boolean", default: false },
      defaultChecked: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <div className="flex items-center space-x-4">
        <Checkbox {...props} id="terms" className="h-8 w-8" />
        <label htmlFor="terms" className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Accept terms and conditions
        </label>
      </div>
    ),
  },
  Progress: {
    props: {
      value: { type: "slider", min: 0, max: 100, default: 50 },
    },
    render: (props: any) => <Progress {...props} className="w-[80%] h-6" />,
  },
  Switch: {
    props: {
      disabled: { type: "boolean", default: false },
      defaultChecked: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <div className="flex items-center space-x-4">
        <Switch {...props} id="airplane-mode" className="scale-150" />
        <Label htmlFor="airplane-mode" className="text-xl">Airplane Mode</Label>
      </div>
    ),
  },
  Accordion: {
    props: {
      type: { type: "select", options: ["single", "multiple"], default: "single" },
      collapsible: { type: "boolean", default: true },
    },
    render: (props: any) => (
      <Accordion
        type={props.type}
        collapsible={props.type === "single" ? props.collapsible : undefined}
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl py-6">Is it accessible?</AccordionTrigger>
          <AccordionContent className="text-lg pb-6">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl py-6">Is it styled?</AccordionTrigger>
          <AccordionContent className="text-lg pb-6">Yes. It comes with default styles that you can override.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl py-6">Is it animated?</AccordionTrigger>
          <AccordionContent className="text-lg pb-6">Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  Input: {
    props: {
      type: { type: "select", options: ["text", "email", "password", "number", "search", "tel", "url"], default: "text" },
      placeholder: { type: "text", default: "Enter text..." },
      disabled: { type: "boolean", default: false },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
      borderWidth: { type: "slider", min: 1, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Input
          {...domProps}
          className="max-w-2xl text-xl h-16 px-6"
          style={style}
        />
      )
    },
  },
  Card: {
    props: {
      title: { type: "text", default: "Card Title" },
      description: { type: "text", default: "Card description goes here." },
      showFooter: { type: "boolean", default: true },
      borderRadius: { type: "slider", min: 0, max: 32, default: 8 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, title, description, showFooter, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Card className="w-[700px]" style={style} {...domProps}>
          <div className="p-12">
            <h3 className="text-4xl font-semibold leading-none tracking-tight">{title}</h3>
            <p className="text-lg text-muted-foreground mt-4">{description}</p>
          </div>
          {showFooter && (
            <div className="flex items-center p-12 pt-0">
              <Button className="w-full text-xl h-14">Action</Button>
            </div>
          )}
        </Card>
      )
    },
  },
  Alert: {
    props: {
      variant: { type: "select", options: ["default", "destructive"], default: "default" },
      title: { type: "text", default: "Heads up!" },
      description: { type: "text", default: "You can add components to your app using the cli." },
      borderRadius: { type: "slider", min: 0, max: 24, default: 8 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, title, description, variant, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Alert variant={variant} className="max-w-3xl p-8" style={style} {...domProps}>
          <AlertCircle className="h-8 w-8" />
          <AlertTitle className="text-2xl">{title}</AlertTitle>
          <AlertDescription className="text-lg mt-2">{description}</AlertDescription>
        </Alert>
      )
    },
  },
  Avatar: {
    props: {
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
      fallback: { type: "text", default: "CN" },
      showImage: { type: "boolean", default: true },
    },
    render: (props: any) => {
      const sizeClasses = {
        sm: "h-16 w-16 text-xl",
        md: "h-24 w-24 text-2xl",
        lg: "h-32 w-32 text-3xl",
      }
      return (
        <Avatar className={sizeClasses[props.size as keyof typeof sizeClasses]}>
          {props.showImage && <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />}
          <AvatarFallback className="text-2xl">{props.fallback}</AvatarFallback>
        </Avatar>
      )
    },
  },
  Dialog: {
    props: {
      title: { type: "text", default: "Are you absolutely sure?" },
      description: { type: "text", default: "This action cannot be undone." },
    },
    render: (props: any) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-xl px-8 py-6 h-auto">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl">{props.title}</DialogTitle>
            <DialogDescription className="text-lg mt-4">{props.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-8 gap-4">
            <Button variant="outline" className="text-lg px-6 py-5 h-auto">Cancel</Button>
            <Button className="text-lg px-6 py-5 h-auto">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  "Dropdown Menu": {
    props: {
      triggerText: { type: "text", default: "Open Menu" },
      itemCount: { type: "slider", min: 1, max: 10, default: 4 },
    },
    render: (props: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-xl px-8 py-6 h-auto">{props.triggerText}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          {Array.from({ length: props.itemCount }).map((_, i) => (
            <DropdownMenuItem key={i} className="text-lg py-4 px-4">Item {i + 1}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  Label: {
    props: {
      text: { type: "text", default: "Your email" },
      required: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <div className="space-y-4">
        <Label htmlFor="email" className="text-xl">
          {props.text}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Input id="email" type="email" placeholder="m@example.com" className="text-xl h-16 px-6" />
      </div>
    ),
  },
  Select: {
    props: {
      placeholder: { type: "text", default: "Select an option" },
      disabled: { type: "boolean", default: false },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
    },
    render: (props: any) => {
      const { borderRadius, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
      }
      return (
        <Select disabled={domProps.disabled}>
          <SelectTrigger className="w-[560px] text-xl h-16 px-6" style={style}>
            <SelectValue placeholder={domProps.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple" className="text-xl py-4">Apple</SelectItem>
            <SelectItem value="banana" className="text-xl py-4">Banana</SelectItem>
            <SelectItem value="orange" className="text-xl py-4">Orange</SelectItem>
            <SelectItem value="grape" className="text-xl py-4">Grape</SelectItem>
          </SelectContent>
        </Select>
      )
    },
  },
  Separator: {
    props: {
      orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
    },
    render: (props: any) => (
      <div className={props.orientation === "horizontal" ? "w-full space-y-8" : "flex h-40 space-x-8"}>
        <div className={props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}>
          <h4 className="text-xl font-medium leading-none">Radix Primitives</h4>
          <p className="text-lg text-muted-foreground">An open-source UI component library.</p>
        </div>
        <Separator orientation={props.orientation} className={props.orientation === "horizontal" ? "h-[2px]" : "w-[2px]"} />
        <div className={props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}>
          <h4 className="text-xl font-medium leading-none">Shadcn UI</h4>
          <p className="text-lg text-muted-foreground">Beautifully designed components.</p>
        </div>
      </div>
    ),
  },
  Skeleton: {
    props: {
      count: { type: "slider", min: 1, max: 5, default: 3 },
      height: { type: "slider", min: 20, max: 200, default: 40 },
    },
    render: (props: any) => (
      <div className="space-y-6 w-full max-w-3xl">
        {Array.from({ length: props.count }).map((_, i) => (
          <Skeleton key={i} style={{ height: `${props.height * 2}px` }} className="w-full" />
        ))}
      </div>
    ),
  },
  Tabs: {
    props: {
      defaultValue: { type: "select", options: ["tab1", "tab2", "tab3"], default: "tab1" },
      tabCount: { type: "slider", min: 2, max: 5, default: 3 },
    },
    render: (props: any) => (
      <Tabs defaultValue={props.defaultValue} className="w-[800px]">
        <TabsList className="grid w-full h-16" style={{ gridTemplateColumns: `repeat(${props.tabCount}, 1fr)` }}>
          {Array.from({ length: props.tabCount }).map((_, i) => (
            <TabsTrigger key={i} value={`tab${i + 1}`} className="text-xl">Tab {i + 1}</TabsTrigger>
          ))}
        </TabsList>
        {Array.from({ length: props.tabCount }).map((_, i) => (
          <TabsContent key={i} value={`tab${i + 1}`} className="space-y-4 p-6">
            <h3 className="text-2xl font-medium">Content for Tab {i + 1}</h3>
            <p className="text-lg text-muted-foreground">
              This is the content area for tab {i + 1}. You can add any content here.
            </p>
          </TabsContent>
        ))}
      </Tabs>
    ),
  },
  Textarea: {
    props: {
      placeholder: { type: "text", default: "Type your message here." },
      rows: { type: "slider", min: 2, max: 10, default: 4 },
      disabled: { type: "boolean", default: false },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
      borderWidth: { type: "slider", min: 1, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Textarea
          {...domProps}
          className="max-w-3xl text-xl p-6"
          style={style}
        />
      )
    },
  },
  Toast: {
    props: {
      title: { type: "text", default: "Scheduled: Catch up" },
      description: { type: "text", default: "Friday, February 10, 2023 at 5:57 PM" },
    },
    render: (props: any) => (
      <div className="max-w-2xl">
        <Alert className="p-8">
          <Terminal className="h-8 w-8" />
          <AlertTitle className="text-2xl">{props.title}</AlertTitle>
          <AlertDescription className="text-lg mt-2">{props.description}</AlertDescription>
        </Alert>
        <p className="text-base text-muted-foreground mt-4">
          Note: This is a preview. Actual toast will appear as a notification.
        </p>
      </div>
    ),
  },
  Toggle: {
    props: {
      variant: { type: "select", options: ["default", "outline"], default: "default" },
      size: { type: "select", options: ["default", "sm", "lg"], default: "default" },
      disabled: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <Toggle {...props} aria-label="Toggle italic" className="h-16 w-16">
        <span className="font-bold text-3xl">B</span>
      </Toggle>
    ),
  },
  Tooltip: {
    props: {
      text: { type: "text", default: "Add to library" },
      side: { type: "select", options: ["top", "bottom", "left", "right"], default: "top" },
    },
    render: (props: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="text-xl px-8 py-6 h-auto">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent side={props.side} className="text-lg p-4">
            <p>{props.text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  UrlInput: {
    props: {
      enableHoverTilt: { type: "boolean", default: true },
      isLoading: { type: "boolean", default: false },
      borderRadius: { type: "slider", min: 0, max: 32, default: 12 },
      gradientFrom: { type: "color", default: "" },
      gradientTo: { type: "color", default: "" },
      gradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
      gradientAnimated: { type: "boolean", default: false },
      backgroundColor: { type: "color", default: "#0f172a" },
      borderColor: { type: "color", default: "#334155" },
      showButton: { type: "boolean", default: true },
      buttonText: { type: "text", default: "Generate" },
      placeholder: { type: "text", default: "https://your-shop.com/product/..." },
      showIcon: { type: "boolean", default: true },
    },
    render: (props: any) => {
      // Convert hex to rgb if needed for backgroundColor and borderColor
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      return (
        <ThreeDCard className="w-full max-w-2xl" disabled={!props.enableHoverTilt}>
          <UrlInput
            onGenerate={(url) => console.log('Generated URL:', url)}
            isLoading={props.isLoading}
            borderRadius={props.borderRadius}
            gradientFrom={props.gradientFrom || undefined}
            gradientTo={props.gradientTo || undefined}
            gradientWidth={props.gradientWidth}
            gradientAnimated={props.gradientAnimated}
            backgroundColor={props.backgroundColor ? hexToRgb(props.backgroundColor) : undefined}
            borderColor={props.borderColor ? hexToRgb(props.borderColor) : undefined}
            showButton={props.showButton}
            buttonText={props.buttonText}
            placeholder={props.placeholder}
            showIcon={props.showIcon}
          />
        </ThreeDCard>
      )
    },
  },
  MediaPlayer: {
    props: {
      enableHoverTilt: { type: "boolean", default: true },
      className: { type: "text", default: "" },
      trackTitle: { type: "text", default: "Midnight City" },
      artist: { type: "text", default: "M83" },
      album: { type: "text", default: "Hurry Up, We're Dreaming" },
      albumArtUrl: { type: "text", default: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop" },
      totalTime: { type: "text", default: "4:03" },
      progress: { type: "slider", min: 0, max: 100, default: 66.67 },
      isPlaying: { type: "boolean", default: true },
      isLoved: { type: "boolean", default: false },
      isShuffle: { type: "boolean", default: false },
      isRepeat: { type: "boolean", default: false },
      showShuffle: { type: "boolean", default: true },
      showRepeat: { type: "boolean", default: true },
      showHeart: { type: "boolean", default: true },
      backgroundColor: { type: "color", default: "#171717" },
      borderColor: { type: "color", default: "#ffffff" },
      borderRadius: { type: "slider", min: 0, max: 48, default: 24 },
      glowColor1: { type: "color", default: "#6366f1" },
      glowColor2: { type: "color", default: "#a855f7" },
      gradientFrom: { type: "color", default: "" },
      gradientTo: { type: "color", default: "" },
      gradientWidth: { type: "slider", min: 0, max: 10, default: 2 },
      gradientAnimated: { type: "boolean", default: false },
      enableImageUpload: { type: "boolean", default: true },
    },
    render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
      // Convert hex to rgb with opacity if needed
      const hexToRgbWithOpacity = (hex: string, opacity: number = 0.6) => {
        if (!hex || !hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r} ${g} ${b} / ${opacity})`;
      };

      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r} ${g} ${b})`;
      };

      // Helper to convert hex to rgba
      const hexToRgba = (hex: string, opacity: number = 0.1) => {
        if (!hex || !hex.startsWith('#')) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      };

      // Helper functions for time conversion (same as in MediaPlayer)
      const timeToSeconds = (time: string): number => {
        const parts = time.split(':');
        if (parts.length === 2) {
          return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
        return 0;
      };

      const secondsToTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };

      // Calculate current time from progress
      let displayCurrentTime = "0:00";
      if (props.progress !== undefined && props.totalTime) {
        const totalSeconds = timeToSeconds(props.totalTime);
        const currentSeconds = (props.progress / 100) * totalSeconds;
        displayCurrentTime = secondsToTime(currentSeconds);
      }

      return (
        <ThreeDCard className="w-full max-w-sm" disabled={!props.enableHoverTilt}>
          <MediaPlayer
            className={props.className || undefined}
            trackTitle={props.trackTitle}
            artist={props.artist}
            album={props.album}
            albumArtUrl={props.albumArtUrl}
            totalTime={props.totalTime}
            progress={props.progress}
            isPlaying={props.isPlaying}
            isLoved={props.isLoved}
            isShuffle={props.isShuffle}
            isRepeat={props.isRepeat}
            showShuffle={props.showShuffle}
            showRepeat={props.showRepeat}
            showHeart={props.showHeart}
            backgroundColor={props.backgroundColor ? hexToRgbWithOpacity(props.backgroundColor, 0.6) : undefined}
            borderColor={props.borderColor ? hexToRgba(props.borderColor, 0.1) : undefined}
            borderRadius={props.borderRadius}
            glowColor1={props.glowColor1 ? hexToRgbWithOpacity(props.glowColor1, 0.2) : undefined}
            glowColor2={props.glowColor2 ? hexToRgbWithOpacity(props.glowColor2, 0.2) : undefined}
            gradientFrom={props.gradientFrom || undefined}
            gradientTo={props.gradientTo || undefined}
            gradientWidth={props.gradientWidth}
            gradientAnimated={props.gradientAnimated}
            enableImageUpload={props.enableImageUpload}
            onShuffle={setProps ? (isShuffle) => {
              // Update Playground props when shuffle state changes
              setProps((prev: any) => ({ ...prev, isShuffle }));
            } : undefined}
            onRepeat={setProps ? (isRepeat) => {
              // Update Playground props when repeat state changes
              setProps((prev: any) => ({ ...prev, isRepeat }));
            } : undefined}
            onPlayPause={setProps ? (isPlaying) => {
              // Update Playground props when play/pause state changes
              setProps((prev: any) => ({ ...prev, isPlaying }));
            } : undefined}
            onLove={setProps ? (isLoved) => {
              // Update Playground props when love state changes
              setProps((prev: any) => ({ ...prev, isLoved }));
            } : undefined}
            onTimeChange={(currentTime, progress) => {
              // Progress and time are automatically synced in the component
              console.log('Time changed:', currentTime, 'Progress:', progress);
            }}
            onImageUpload={setProps ? (imageUrl) => {
              console.log('Image uploaded:', imageUrl.substring(0, 50) + '...');
              // Update Playground props when image is uploaded
              setProps((prev: any) => ({ ...prev, albumArtUrl: imageUrl }));
            } : undefined}
          />
        </ThreeDCard>
      )
    },
  },
  ChatInterface: {
    props: {
      className: { type: "text", default: "" },
      enableHoverTilt: { type: "boolean", default: true },
      // Header
      headerUserName: { type: "text", default: "Sarah Jenkins" },
      headerUserStatus: { type: "select", options: ["Online now", "Offline", "Away", "Busy", "Do not disturb", "Other"], default: "Online now" },
      headerUserStatusCustom: { type: "text", default: "" },
      headerUserAvatar: { type: "text", default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" },
      headerShowPhone: { type: "boolean", default: true },
      headerShowVideo: { type: "boolean", default: true },
      headerShowMore: { type: "boolean", default: true },
      headerBgColor: { type: "color-tailwind-bg", default: "bg-neutral-900/80" },
      headerBorderColor: { type: "color-tailwind-border", default: "border-neutral-800" },
      headerTextColor: { type: "color-tailwind-text", default: "text-neutral-100" },
      headerStatusColor: { type: "text", default: "" },
      // Body
      bodyBgColor: { type: "color-tailwind-bg", default: "" },
      bodyPadding: { type: "slider", min: 2, max: 12, default: 6 },
      bodyShowDateLabel: { type: "boolean", default: true },
      bodyDateLabelText: { type: "text", default: "Today, Oct 24" },
      bodyShowTypingIndicator: { type: "boolean", default: true },
      bodyShowReadReceipt: { type: "boolean", default: false },
      message1Text: { type: "text", default: "Hey! Have you had a chance to look at the new design system components?" },
      message1Time: { type: "text", default: "10:30 AM" },
      message1IsOwn: { type: "boolean", default: false },
      message2Text: { type: "text", default: "Yes! I just checked them out. The neon gradients look absolutely stunning 🤩" },
      message2Time: { type: "text", default: "10:32 AM" },
      message2IsOwn: { type: "boolean", default: true },
      message2IsRead: { type: "boolean", default: false },
      message3Text: { type: "text", default: "Right? I think we should use the SpotlightCard for the feature section." },
      message3Time: { type: "text", default: "10:32 AM" },
      message3IsOwn: { type: "boolean", default: true },
      message3IsRead: { type: "boolean", default: true },
      message4Text: { type: "text", default: "Agreed. I'm preparing the documentation now. Will send over the draft in a bit!" },
      message4Time: { type: "text", default: "10:35 AM" },
      message4IsOwn: { type: "boolean", default: false },
      ownMessageColor: { type: "color-tailwind-bg", default: "bg-indigo-600" },
      otherMessageColor: { type: "color-tailwind-bg", default: "bg-neutral-800" },
      messageTextColor: { type: "color-tailwind-text", default: "" },
      timeTextColor: { type: "color-tailwind-text", default: "text-neutral-500" },
      // Footer
      footerBgColor: { type: "color-tailwind-bg", default: "bg-neutral-900/80" },
      footerBorderColor: { type: "color-tailwind-border", default: "border-neutral-800" },
      footerInputBgColor: { type: "color-tailwind-bg", default: "bg-neutral-950" },
      footerInputPlaceholder: { type: "text", default: "Type a message..." },
      footerShowAttach: { type: "boolean", default: true },
      footerShowEmoji: { type: "boolean", default: true },
      footerButtonColor: { type: "color-tailwind-bg", default: "bg-indigo-600" },
      footerFocusBorderColor: { type: "color-tailwind-border", default: "border-indigo-500/50" },
    },
    render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
      return (
        <ThreeDCard className="w-full max-w-md h-[600px]" disabled={!props.enableHoverTilt}>
          <ChatInterface
            className={props.className}
            headerUserName={props.headerUserName}
            headerUserStatus={props.headerUserStatus === "Other" ? props.headerUserStatusCustom : props.headerUserStatus}
            headerUserAvatar={props.headerUserAvatar}
            onAvatarChange={setProps ? (url: string) => setProps((prev: any) => ({ ...prev, headerUserAvatar: url })) : undefined}
            headerShowPhone={props.headerShowPhone}
            headerShowVideo={props.headerShowVideo}
            headerShowMore={props.headerShowMore}
            headerBgColor={props.headerBgColor}
            headerBorderColor={props.headerBorderColor}
            headerTextColor={props.headerTextColor}
            headerStatusColor={props.headerStatusColor}
            bodyBgColor={props.bodyBgColor}
            bodyPadding={props.bodyPadding}
            bodyShowDateLabel={props.bodyShowDateLabel}
            bodyDateLabelText={props.bodyDateLabelText}
            bodyShowTypingIndicator={props.bodyShowTypingIndicator}
            bodyShowReadReceipt={props.bodyShowReadReceipt}
            message1Text={props.message1Text}
            message1Time={props.message1Time}
            message1IsOwn={props.message1IsOwn}
            message2Text={props.message2Text}
            message2Time={props.message2Time}
            message2IsOwn={props.message2IsOwn}
            message2IsRead={props.message2IsRead}
            message3Text={props.message3Text}
            message3Time={props.message3Time}
            message3IsOwn={props.message3IsOwn}
            message3IsRead={props.message3IsRead}
            message4Text={props.message4Text}
            message4Time={props.message4Time}
            message4IsOwn={props.message4IsOwn}
            onMessage1TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message1Text: text })) : undefined}
            onMessage2TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message2Text: text })) : undefined}
            onMessage3TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message3Text: text })) : undefined}
            onMessage4TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message4Text: text })) : undefined}
            editable={true}
            ownMessageColor={props.ownMessageColor}
            otherMessageColor={props.otherMessageColor}
            messageTextColor={props.messageTextColor}
            timeTextColor={props.timeTextColor}
            footerBgColor={props.footerBgColor}
            footerBorderColor={props.footerBorderColor}
            footerInputBgColor={props.footerInputBgColor}
            footerInputPlaceholder={props.footerInputPlaceholder}
            footerShowAttach={props.footerShowAttach}
            footerShowEmoji={props.footerShowEmoji}
            footerButtonColor={props.footerButtonColor}
            footerFocusBorderColor={props.footerFocusBorderColor}
          />
        </ThreeDCard>
      )
    },
  },
  SocialProfileCard: {
    props: {
      className: { type: "text", default: "" },
      enableHoverTilt: { type: "boolean", default: true },
      name: { type: "text", default: "Sarah Jenkins" },
      username: { type: "text", default: "@sarah_des" },
      bio: { type: "text", default: "Product Designer crafting digital experiences. Coffee enthusiast ☕. Building next-gen UI tools for developers." },
      avatarUrl: { type: "text", default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" },
      location: { type: "text", default: "San Francisco, CA" },
      website: { type: "text", default: "sarah.design" },
      twitter: { type: "text", default: "@sarah_des" },
      showLocation: { type: "boolean", default: true },
      showWebsite: { type: "boolean", default: true },
      showTwitter: { type: "boolean", default: true },
      followers: { type: "text", default: "12.5k" },
      following: { type: "text", default: "842" },
      projects: { type: "text", default: "142" },
      isOnline: { type: "boolean", default: true },
      statusColor: { type: "color-tailwind-bg", default: "bg-green-500" },
      bannerGradientFrom: { type: "color-tailwind-gradient", default: "from-indigo-500" },
      bannerGradientVia: { type: "color-tailwind-gradient", default: "via-purple-500" },
      bannerGradientTo: { type: "color-tailwind-gradient", default: "to-pink-500" },
      followButtonText: { type: "text", default: "Follow" },
      showFollowButton: { type: "boolean", default: true },
      showMessageButton: { type: "boolean", default: true },
      showSimilarButton: { type: "boolean", default: true },
      messageButtonText: { type: "text", default: "Message" },
      similarButtonText: { type: "text", default: "Similar" },
      backgroundColor: { type: "color", default: "" },
      borderColor: { type: "color", default: "" },
      borderRadius: { type: "slider", min: 8, max: 48, default: 24 },
      gradientFrom: { type: "color", default: "" },
      gradientTo: { type: "color", default: "" },
      gradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
      gradientAnimated: { type: "boolean", default: false },
    },
    render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
      // Convert hex to rgb if needed
      const hexToRgb = (hex: string) => {
        if (!hex) return undefined
        // Extract hex from Tailwind format like bg-[#hex] or from-[#hex]
        const hexMatch = hex.match(/\[#([0-9A-Fa-f]{6})\]/)
        if (hexMatch) {
          const r = parseInt(hexMatch[1].slice(0, 2), 16)
          const g = parseInt(hexMatch[1].slice(2, 4), 16)
          const b = parseInt(hexMatch[1].slice(4, 6), 16)
          return `rgb(${r} ${g} ${b})`
        }
        // If it's already a hex value
        if (hex.startsWith('#')) {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgb(${r} ${g} ${b})`
        }
        // Return as is if it's already rgb or other format
        return hex
      }

      return (
        <ThreeDCard className="w-full max-w-sm" disabled={!props.enableHoverTilt}>
          <SocialProfileCard
            className={props.className}
            name={props.name}
            username={props.username}
            bio={props.bio}
            avatarUrl={props.avatarUrl}
            location={props.location}
            website={props.website}
            twitter={props.twitter}
            showLocation={props.showLocation}
            showWebsite={props.showWebsite}
            showTwitter={props.showTwitter}
            followers={props.followers}
            following={props.following}
            projects={props.projects}
            isOnline={props.isOnline}
            statusColor={props.statusColor}
            bannerGradientFrom={props.bannerGradientFrom}
            bannerGradientVia={props.bannerGradientVia}
            bannerGradientTo={props.bannerGradientTo}
            followButtonText={props.followButtonText}
            showFollowButton={props.showFollowButton}
            showMessageButton={props.showMessageButton}
            showSimilarButton={props.showSimilarButton}
            messageButtonText={props.messageButtonText}
            similarButtonText={props.similarButtonText}
            onFollow={props.onFollow}
            onMessage={props.onMessage}
            onSimilar={props.onSimilar}
            onAvatarChange={setProps ? (url: string) => setProps((prev: any) => ({ ...prev, avatarUrl: url })) : undefined}
            backgroundColor={props.backgroundColor ? hexToRgb(props.backgroundColor) : undefined}
            borderColor={props.borderColor ? hexToRgb(props.borderColor) : undefined}
            borderRadius={props.borderRadius}
            gradientFrom={props.gradientFrom || undefined}
            gradientTo={props.gradientTo || undefined}
            gradientWidth={props.gradientWidth}
            gradientAnimated={props.gradientAnimated}
          />
        </ThreeDCard>
      )
    },
  },
  GlassAuthForm: {
    props: {
      className: { type: "text", default: "" },
      enableHoverTilt: { type: "boolean", default: true },
      // Text content
      title: { type: "text", default: "Welcome Back" },
      subtitle: { type: "text", default: "Enter your credentials to access the workspace." },
      emailLabel: { type: "text", default: "Email address" },
      passwordLabel: { type: "text", default: "Password" },
      rememberText: { type: "text", default: "Remember me" },
      forgotPasswordText: { type: "text", default: "Forgot password?" },
      signInText: { type: "text", default: "Sign In" },
      continueWithText: { type: "text", default: "Or continue with" },
      githubText: { type: "text", default: "GitHub" },
      googleText: { type: "text", default: "Google" },
      // Display options
      showRememberMe: { type: "boolean", default: true },
      showForgotPassword: { type: "boolean", default: true },
      showSocialButtons: { type: "boolean", default: true },
      showGithub: { type: "boolean", default: true },
      showGoogle: { type: "boolean", default: true },
      // Colors
      backgroundColor: { type: "color", default: "#171717" },
      borderColor: { type: "color", default: "#262626" },
      textColor: { type: "color-tailwind-text", default: "text-white" },
      iconGradientFrom: { type: "color", default: "#6366f1" },
      iconGradientTo: { type: "color", default: "#a855f7" },
      orb1Color: { type: "color", default: "#6366f1" },
      orb2Color: { type: "color", default: "#a855f7" },
      buttonColor: { type: "color", default: "" },
      socialButtonBgColor: { type: "color", default: "#262626" },
      socialButtonBorderColor: { type: "color", default: "#404040" },
      inputLabelColor: { type: "color-tailwind-text", default: "text-neutral-400" },
      inputBgColor: { type: "color-tailwind-bg", default: "bg-neutral-800" },
      inputBorderColor: { type: "color-tailwind-border", default: "border-neutral-700" },
      inputTextColor: { type: "color-tailwind-text", default: "text-white" },
      focusBorderColor: { type: "color-tailwind-border", default: "border-indigo-500" },
      // Card gradient
      cardGradientFrom: { type: "color", default: "" },
      cardGradientTo: { type: "color", default: "" },
      cardGradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
      cardGradientAnimated: { type: "boolean", default: false },
      // Outer gradient
      outerGradientFrom: { type: "color", default: "" },
      outerGradientTo: { type: "color", default: "" },
      outerGradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
      outerGradientAnimated: { type: "boolean", default: false },
      // Style
      borderRadius: { type: "slider", min: 8, max: 48, default: 24 },
      padding: { type: "slider", min: 4, max: 16, default: 8 },
      backdropBlur: { type: "slider", min: 0, max: 24, default: 12 },
    },
    render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
      // Helper to convert hex or Tailwind class to rgb
      const getColorFromTailwind = (colorValue: string): string | undefined => {
        if (!colorValue) return undefined
        // Extract hex from bg-[#hex] or text-[#hex] format
        const hexMatch = colorValue.match(/\[#([0-9A-Fa-f]{6})\]/)
        if (hexMatch) {
          const r = parseInt(hexMatch[1].slice(0, 2), 16)
          const g = parseInt(hexMatch[1].slice(2, 4), 16)
          const b = parseInt(hexMatch[1].slice(4, 6), 16)
          return `rgb(${r} ${g} ${b})`
        }
        // If it's already a hex value
        if (colorValue.startsWith('#')) {
          const r = parseInt(colorValue.slice(1, 3), 16)
          const g = parseInt(colorValue.slice(3, 5), 16)
          const b = parseInt(colorValue.slice(5, 7), 16)
          return `rgb(${r} ${g} ${b})`
        }
        // Try color map for Tailwind classes
        const colorMap: Record<string, string> = {
          "text-white": "rgb(255 255 255)",
          "text-neutral-400": "rgb(163 163 163)",
          "text-neutral-500": "rgb(115 115 115)",
          "bg-neutral-800": "rgb(38 38 38)",
          "bg-neutral-900": "rgb(23 23 23)",
          "border-neutral-700": "rgb(64 64 64)",
          "border-indigo-500": "rgb(99 102 241)",
        }
        return colorMap[colorValue] || undefined
      }

      // Helper to convert hex to rgb (for color type props)
      const hexToRgb = (hex: string) => {
        if (!hex) return undefined
        if (hex.startsWith('#')) {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgb(${r} ${g} ${b})`
        }
        return hex
      }

      return (
        <ThreeDCard className="w-full max-w-sm" disabled={!props.enableHoverTilt}>
          <GlassAuthForm
            className={props.className}
            title={props.title}
            subtitle={props.subtitle}
            emailLabel={props.emailLabel}
            passwordLabel={props.passwordLabel}
            rememberText={props.rememberText}
            forgotPasswordText={props.forgotPasswordText}
            signInText={props.signInText}
            continueWithText={props.continueWithText}
            githubText={props.githubText}
            googleText={props.googleText}
            showRememberMe={props.showRememberMe}
            showForgotPassword={props.showForgotPassword}
            showSocialButtons={props.showSocialButtons}
            showGithub={props.showGithub}
            showGoogle={props.showGoogle}
            backgroundColor={props.backgroundColor ? hexToRgb(props.backgroundColor) : undefined}
            borderColor={props.borderColor ? hexToRgb(props.borderColor) : undefined}
            textColor={props.textColor ? getColorFromTailwind(props.textColor) : undefined}
            iconGradientFrom={props.iconGradientFrom ? hexToRgb(props.iconGradientFrom) : undefined}
            iconGradientTo={props.iconGradientTo ? hexToRgb(props.iconGradientTo) : undefined}
            orb1Color={props.orb1Color ? hexToRgb(props.orb1Color) : undefined}
            orb2Color={props.orb2Color ? hexToRgb(props.orb2Color) : undefined}
            buttonColor={props.buttonColor ? hexToRgb(props.buttonColor) : undefined}
            socialButtonBgColor={props.socialButtonBgColor ? hexToRgb(props.socialButtonBgColor) : undefined}
            socialButtonBorderColor={props.socialButtonBorderColor ? hexToRgb(props.socialButtonBorderColor) : undefined}
            inputLabelColor={props.inputLabelColor ? getColorFromTailwind(props.inputLabelColor) : undefined}
            inputBgColor={props.inputBgColor ? getColorFromTailwind(props.inputBgColor) : undefined}
            inputBorderColor={props.inputBorderColor ? getColorFromTailwind(props.inputBorderColor) : undefined}
            inputTextColor={props.inputTextColor ? getColorFromTailwind(props.inputTextColor) : undefined}
            focusBorderColor={props.focusBorderColor ? getColorFromTailwind(props.focusBorderColor) : undefined}
            cardGradientFrom={props.cardGradientFrom ? hexToRgb(props.cardGradientFrom) : undefined}
            cardGradientTo={props.cardGradientTo ? hexToRgb(props.cardGradientTo) : undefined}
            cardGradientWidth={props.cardGradientWidth}
            cardGradientAnimated={props.cardGradientAnimated}
            outerGradientFrom={props.outerGradientFrom ? hexToRgb(props.outerGradientFrom) : undefined}
            outerGradientTo={props.outerGradientTo ? hexToRgb(props.outerGradientTo) : undefined}
            outerGradientWidth={props.outerGradientWidth}
            outerGradientAnimated={props.outerGradientAnimated}
            borderRadius={props.borderRadius}
            padding={props.padding}
            backdropBlur={props.backdropBlur}
          />
        </ThreeDCard>
      )
    },
  },
}

  heroSections.forEach((hero) => {
    const Component = heroComponentsByName[hero.componentName]
    if (!Component) return

    const propConfig = Object.fromEntries(
      Object.entries(hero.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[hero.name] = {
      props: propConfig,
      render: (props: any) => (
        <div className="w-full">
          <Component {...props} />
        </div>
      ),
    }
  })

  return configs
})()

interface PlaygroundProps {
  componentName: string
  slug: string
  initialCode?: string
}

export function ComponentPlayground({ componentName, slug, initialCode }: PlaygroundProps) {
  const config = componentConfigs[componentName]
  const heroMeta = heroNameToMeta[componentName]
  const [copied, setCopied] = React.useState(false)

  const [props, setProps] = React.useState<Record<string, any>>(() => {
    if (!config) return {}
    const initialProps: Record<string, any> = {}
    Object.entries(config.props).forEach(([key, propConfig]: [string, any]) => {
      // Ensure boolean defaults are properly set
      if (propConfig.type === "boolean") {
        initialProps[key] = propConfig.default === true || propConfig.default === "true"
      } else if (propConfig.type === "text" || propConfig.type === "textarea") {
        // Ensure text inputs always have a string value (never undefined)
        initialProps[key] = propConfig.default || ""
      } else if (propConfig.type === "select") {
        // Ensure select always has a value
        initialProps[key] = propConfig.default || propConfig.options?.[0] || ""
      } else if (propConfig.type === "color" ||
        propConfig.type === "color-tailwind-bg" ||
        propConfig.type === "color-tailwind-text" ||
        propConfig.type === "color-tailwind-border" ||
        propConfig.type === "color-tailwind-gradient") {
        // Ensure color inputs always have a string value (never undefined)
        initialProps[key] = propConfig.default || ""
      } else {
        initialProps[key] = propConfig.default
      }
    })
    return initialProps
  })

  // Set CSS variable colors as hex for color pickers after mount
  React.useEffect(() => {
    if (!config || componentName !== 'UrlInput') return

    // Helper function to get CSS variable value and convert to hex
    const getCssVarAsHex = (varName: string, fallback: string = '#000000'): string => {
      if (typeof window === 'undefined') return fallback
      try {
        const tempEl = document.createElement('div')
        tempEl.style.color = `var(${varName})`
        tempEl.style.position = 'absolute'
        tempEl.style.visibility = 'hidden'
        tempEl.style.pointerEvents = 'none'
        document.body.appendChild(tempEl)
        const rgb = getComputedStyle(tempEl).color
        document.body.removeChild(tempEl)

        // Convert rgb(r, g, b) or rgba(r, g, b, a) to hex
        const match = rgb.match(/\d+/g)
        if (match && match.length >= 3) {
          const r = Math.min(255, Math.max(0, parseInt(match[0]))).toString(16).padStart(2, '0')
          const g = Math.min(255, Math.max(0, parseInt(match[1]))).toString(16).padStart(2, '0')
          const b = Math.min(255, Math.max(0, parseInt(match[2]))).toString(16).padStart(2, '0')
          const hex = `#${r}${g}${b}`
          // Validate hex format
          if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            return hex
          }
        }
      } catch (e) {
        // Fallback on error
      }
      return fallback
    }

    setProps((prev) => {
      const updated = { ...prev }
      // Only update if the value is empty string (default) or invalid format
      if (!prev.gradientFrom || prev.gradientFrom === '' || !/^#[0-9A-Fa-f]{6}$/.test(prev.gradientFrom)) {
        updated.gradientFrom = getCssVarAsHex('--primary', '#171717')
      }
      if (!prev.gradientTo || prev.gradientTo === '' || !/^#[0-9A-Fa-f]{6}$/.test(prev.gradientTo)) {
        updated.gradientTo = getCssVarAsHex('--accent', '#f5f5f5')
      }
      return updated
    })
  }, [config, componentName])

  const updateProp = (key: string, value: any) => {
    setProps((prev) => {
      const updated = { ...prev, [key]: value }

      // If totalTime changes, automatically update progress for MediaPlayer (if progress exists)
      if (componentName === "MediaPlayer" && key === "totalTime" && updated.progress !== undefined) {
        // Progress is already set, no need to recalculate
      }

      return updated
    })
  }

  const generateCode = () => {
    if (!config) return ""

    const propsString = Object.entries(props)
      .filter(([key, value]) => {
        if (key === "enableHoverTilt") return false
        const propConfig = config.props[key]
        return value !== propConfig.default && value !== undefined && value !== ""
      })
      .map(([key, value]) => {
        if (typeof value === "boolean") {
          return value ? key : ""
        }
        if (typeof value === "string") {
          return `${key}="${value}"`
        }
        return `${key}={${JSON.stringify(value)}}`
      })
      .filter(Boolean)
      .join(" ")

    const children = props.children || ""

    if (componentName === "Accordion") {
      return `<Accordion${propsString ? " " + propsString : ""}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger className="text-xl py-6">Is it accessible?</AccordionTrigger>\n    <AccordionContent className="text-lg pb-6">\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger className="text-xl py-6">Is it styled?</AccordionTrigger>\n    <AccordionContent className="text-lg pb-6">\n      Yes. It comes with default styles that you can override.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-3">\n    <AccordionTrigger className="text-xl py-6">Is it animated?</AccordionTrigger>\n    <AccordionContent className="text-lg pb-6">\n      Yes. It's animated by default, but you can disable it if you prefer.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`
    }

    if (componentName === "Dialog") {
      return `<Dialog>\n  <DialogTrigger asChild>\n    <Button className="text-xl px-8 py-6 h-auto">Open Dialog</Button>\n  </DialogTrigger>\n  <DialogContent className="sm:max-w-3xl p-10">\n    <DialogHeader>\n      <DialogTitle className="text-3xl">${props.title}</DialogTitle>\n      <DialogDescription className="text-lg mt-4">${props.description}</DialogDescription>\n    </DialogHeader>\n    <DialogFooter className="mt-8 gap-4">\n      <Button variant="outline" className="text-lg px-6 py-5 h-auto">Cancel</Button>\n      <Button className="text-lg px-6 py-5 h-auto">Continue</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`
    }

    if (componentName === "Dropdown Menu") {
      return `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline" className="text-xl px-8 py-6 h-auto">${props.triggerText}</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent className="w-80">\n    ${Array.from({ length: props.itemCount }).map((_, i) => `<DropdownMenuItem key={${i}} className="text-lg py-4 px-4">Item ${i + 1}</DropdownMenuItem>\n`).join("")}\n  </DropdownMenuContent>\n</DropdownMenu>`
    }

    if (componentName === "Label") {
      return `<div className="space-y-4">\n  <Label htmlFor="email" className="text-xl">\n    ${props.text}\n    ${props.required ? '<span className="text-destructive ml-1">*</span>' : ''}\n  </Label>\n  <Input id="email" type="email" placeholder="m@example.com" className="text-xl h-16 px-6" />\n</div>`
    }

    if (componentName === "Select") {
      return `<Select disabled={${props.disabled}}>\n  <SelectTrigger className="w-[560px] text-xl h-16 px-6" style={{ borderRadius: "${props.borderRadius}px" }}>\n    <SelectValue placeholder="${props.placeholder}" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple" className="text-xl py-4">Apple</SelectItem>\n    <SelectItem value="banana" className="text-xl py-4">Banana</SelectItem>\n    <SelectItem value="orange" className="text-xl py-4">Orange</SelectItem>\n    <SelectItem value="grape" className="text-xl py-4">Grape</SelectItem>\n  </SelectContent>\n</Select>`
    }

    if (componentName === "Separator") {
      return `<div className="${props.orientation === "horizontal" ? "w-full space-y-8" : "flex h-40 space-x-8"}">\n  <div className="${props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}">\n    <h4 className="text-xl font-medium leading-none">Radix Primitives</h4>\n    <p className="text-lg text-muted-foreground">An open-source UI component library.</p>\n  </div>\n  <Separator orientation="${props.orientation}" className="${props.orientation === "horizontal" ? "h-[2px]" : "w-[2px]"}" />\n  <div className="${props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}">\n    <h4 className="text-xl font-medium leading-none">Shadcn UI</h4>\n    <p className="text-lg text-muted-foreground">Beautifully designed components.</p>\n  </div>\n</div>`
    }

    if (componentName === "Skeleton") {
      return `<div className="space-y-6 w-full max-w-3xl">\n  ${Array.from({ length: props.count }).map((_, i) => `<Skeleton key={${i}} style={{ height: "${props.height * 2}px" }} className="w-full" />\n`).join("")}\n</div>`
    }

    if (componentName === "Tabs") {
      return `<Tabs defaultValue="${props.defaultValue}" className="w-[800px]">\n  <TabsList className="grid w-full h-16" style={{ gridTemplateColumns: \`repeat(${props.tabCount}, 1fr)\` }}>\n    ${Array.from({ length: props.tabCount }).map((_, i) => `<TabsTrigger key={${i}} value="tab${i + 1}" className="text-xl">Tab ${i + 1}</TabsTrigger>\n`).join("")}\n  </TabsList>\n  ${Array.from({ length: props.tabCount }).map((_, i) => `<TabsContent key={${i}} value="tab${i + 1}" className="space-y-4 p-6">\n    <h3 className="text-2xl font-medium">Content for Tab ${i + 1}</h3>\n    <p className="text-lg text-muted-foreground">\n      This is the content area for tab ${i + 1}. You can add any content here.\n    </p>\n  </TabsContent>\n`).join("")}\n</Tabs>`
    }

    if (componentName === "Textarea") {
      return `<Textarea placeholder="${props.placeholder}" rows={${props.rows}} disabled={${props.disabled}} className="max-w-3xl text-xl p-6" style={{ borderRadius: "${props.borderRadius}px", borderWidth: "${props.borderWidth}px" }} />`
    }

    if (componentName === "Toast") {
      return `<div className="max-w-2xl">\n  <Alert className="p-8">\n    <Terminal className="h-8 w-8" />\n    <AlertTitle className="text-2xl">${props.title}</AlertTitle>\n    <AlertDescription className="text-lg mt-2">${props.description}</AlertDescription>\n  </Alert>\n  <p className="text-base text-muted-foreground mt-4">\n    Note: This is a preview. Actual toast will appear as a notification.\n  </p>\n</div>`
    }

    if (componentName === "Toggle") {
      return `<Toggle variant="${props.variant}" size="${props.size}" disabled={${props.disabled}} aria-label="Toggle italic" className="h-16 w-16">\n  <span className="font-bold text-3xl">B</span>\n</Toggle>`
    }

    if (componentName === "Tooltip") {
      return `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button variant="outline" className="text-xl px-8 py-6 h-auto">Hover me</Button>\n    </TooltipTrigger>\n    <TooltipContent side="${props.side}" className="text-lg p-4">\n      <p>${props.text}</p>\n    </TooltipContent>\n  </Tooltip>\n</TooltipProvider>`
    }

    if (componentName === "MediaPlayer") {
      // Convert hex to rgb with opacity for colors in generated code
      const hexToRgbWithOpacity = (hex: string, opacity: number = 0.6) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b} / ${opacity})`
      }

      const hexToRgba = (hex: string, opacity: number = 0.1) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${opacity})`
      }

      const propsList = []
      // Always include all props with their current values (including defaults)
      propsList.push(`trackTitle="${props.trackTitle || "Midnight City"}"`)
      propsList.push(`artist="${props.artist || "M83"}"`)
      propsList.push(`album="${props.album || "Hurry Up, We're Dreaming"}"`)
      if (props.albumArtUrl) {
        propsList.push(`albumArtUrl="${props.albumArtUrl}"`)
      }
      propsList.push(`totalTime="${props.totalTime || "4:03"}"`)
      if (props.progress !== undefined) {
        propsList.push(`progress={${props.progress}}`)
      }
      propsList.push(`isPlaying={${props.isPlaying !== undefined ? props.isPlaying : true}}`)
      propsList.push(`isLoved={${props.isLoved !== undefined ? props.isLoved : false}}`)
      propsList.push(`isShuffle={${props.isShuffle !== undefined ? props.isShuffle : false}}`)
      propsList.push(`isRepeat={${props.isRepeat !== undefined ? props.isRepeat : false}}`)
      propsList.push(`showShuffle={${props.showShuffle !== undefined ? props.showShuffle : true}}`)
      propsList.push(`showRepeat={${props.showRepeat !== undefined ? props.showRepeat : true}}`)
      propsList.push(`showHeart={${props.showHeart !== undefined ? props.showHeart : true}}`)

      // Convert colors
      const bgColor = props.backgroundColor
        ? hexToRgbWithOpacity(props.backgroundColor, 0.6)
        : "rgb(23 23 23 / 0.6)"
      propsList.push(`backgroundColor="${bgColor}"`)

      const borderCol = props.borderColor
        ? hexToRgba(props.borderColor, 0.1)
        : "rgba(255, 255, 255, 0.1)"
      propsList.push(`borderColor="${borderCol}"`)

      propsList.push(`borderRadius={${props.borderRadius !== undefined ? props.borderRadius : 24}}`)

      const glow1 = props.glowColor1
        ? hexToRgbWithOpacity(props.glowColor1, 0.2)
        : "rgb(99 102 241 / 0.2)"
      propsList.push(`glowColor1="${glow1}"`)

      const glow2 = props.glowColor2
        ? hexToRgbWithOpacity(props.glowColor2, 0.2)
        : "rgb(168 85 247 / 0.2)"
      propsList.push(`glowColor2="${glow2}"`)

      propsList.push(`enableImageUpload={${props.enableImageUpload !== undefined ? props.enableImageUpload : true}}`)

      // Format with line breaks for better readability
      const propsString = propsList.length > 0
        ? `\n  ${propsList.join("\n  ")}\n`
        : ""

      return `"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Play, Pause, SkipBack, SkipForward, Heart, Repeat, Shuffle, Upload } from "lucide-react"

interface MediaPlayerProps {
  className?: string
  trackTitle?: string
  artist?: string
  album?: string
  albumArtUrl?: string
  currentTime?: string
  totalTime?: string
  progress?: number
  isPlaying?: boolean
  isLoved?: boolean
  isShuffle?: boolean
  isRepeat?: boolean
  showShuffle?: boolean
  showRepeat?: boolean
  showHeart?: boolean
  backgroundColor?: string
  borderColor?: string
  borderRadius?: number
  glowColor1?: string
  glowColor2?: string
  gradientFrom?: string
  gradientTo?: string
  gradientWidth?: number
  gradientAnimated?: boolean
  enableImageUpload?: boolean
  onPlayPause?: (isPlaying: boolean) => void
  onLove?: (isLoved: boolean) => void
  onShuffle?: (isShuffle: boolean) => void
  onRepeat?: (isRepeat: boolean) => void
  onSkipBack?: () => void
  onSkipForward?: () => void
  onImageUpload?: (imageUrl: string) => void
  onTimeChange?: (currentTime: string, progress: number) => void
}

const timeToSeconds = (time: string): number => {
  const parts = time.split(':')
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  }
  return 0
}

const secondsToTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return \`\${mins}:\${secs.toString().padStart(2, '0')}\`
}

export const MediaPlayer = ({
  className,
  trackTitle = "${props.trackTitle || "Midnight City"}",
  artist = "${props.artist || "M83"}",
  album = "${props.album || "Hurry Up, We're Dreaming"}",
  albumArtUrl: initialAlbumArtUrl = "${props.albumArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"}",
  totalTime: initialTotalTime = "${props.totalTime || "4:03"}",
  progress: initialProgress${props.progress !== undefined ? ` = ${props.progress}` : ''},
  isPlaying: initialIsPlaying = ${props.isPlaying !== undefined ? props.isPlaying : true},
  isLoved: initialIsLoved = ${props.isLoved !== undefined ? props.isLoved : false},
  isShuffle: initialIsShuffle = ${props.isShuffle !== undefined ? props.isShuffle : false},
  isRepeat: initialIsRepeat = ${props.isRepeat !== undefined ? props.isRepeat : false},
  showShuffle = ${props.showShuffle !== undefined ? props.showShuffle : true},
  showRepeat = ${props.showRepeat !== undefined ? props.showRepeat : true},
  showHeart = ${props.showHeart !== undefined ? props.showHeart : true},
  backgroundColor = "${bgColor}",
  borderColor = "${borderCol}",
  borderRadius = ${props.borderRadius !== undefined ? props.borderRadius : 24},
  glowColor1 = "${glow1}",
  glowColor2 = "${glow2}",
  gradientFrom${props.gradientFrom ? ` = "${props.gradientFrom}"` : ''},
  gradientTo${props.gradientTo ? ` = "${props.gradientTo}"` : ''},
  gradientWidth = ${props.gradientWidth !== undefined ? props.gradientWidth : 2},
  gradientAnimated = ${props.gradientAnimated !== undefined ? props.gradientAnimated : false},
  enableImageUpload = ${props.enableImageUpload !== undefined ? props.enableImageUpload : true},
  onPlayPause,
  onLove,
  onShuffle,
  onRepeat,
  onSkipBack,
  onSkipForward,
  onImageUpload,
  onTimeChange,
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying)
  const [isLoved, setIsLoved] = useState(initialIsLoved)
  const [isShuffle, setIsShuffle] = useState(initialIsShuffle)
  const [isRepeat, setIsRepeat] = useState(initialIsRepeat)
  const [albumArtUrl, setAlbumArtUrl] = useState(initialAlbumArtUrl)
  const [totalTime, setTotalTime] = useState(initialTotalTime)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const calculateTimeFromProgress = (prog: number, totTime: string): string => {
    const totalSeconds = timeToSeconds(totTime)
    const currentSeconds = (prog / 100) * totalSeconds
    return secondsToTime(currentSeconds)
  }

  const [progress, setProgress] = useState(
    initialProgress !== undefined ? initialProgress : 0
  )

  const [currentTime, setCurrentTime] = useState(() => {
    if (initialProgress !== undefined) {
      return calculateTimeFromProgress(initialProgress, initialTotalTime)
    }
    return "0:00"
  })

  useEffect(() => {
    if (initialProgress !== undefined) {
      const newCurrentTime = calculateTimeFromProgress(initialProgress, totalTime)
      setCurrentTime(newCurrentTime)
      setProgress(initialProgress)
      onTimeChange?.(newCurrentTime, initialProgress)
    }
  }, [initialProgress, totalTime])

  useEffect(() => {
    setTotalTime(initialTotalTime)
  }, [initialTotalTime])

  useEffect(() => {
    if (initialProgress !== undefined) {
      setProgress(initialProgress)
    }
  }, [initialProgress])

  useEffect(() => {
    setIsPlaying(initialIsPlaying)
  }, [initialIsPlaying])

  useEffect(() => {
    setIsLoved(initialIsLoved)
  }, [initialIsLoved])

  useEffect(() => {
    setIsShuffle(initialIsShuffle)
  }, [initialIsShuffle])

  useEffect(() => {
    setIsRepeat(initialIsRepeat)
  }, [initialIsRepeat])

  const handlePlayPause = () => {
    const newState = !isPlaying
    setIsPlaying(newState)
    onPlayPause?.(newState)
  }

  const handleLove = () => {
    const newState = !isLoved
    setIsLoved(newState)
    onLove?.(newState)
  }

  const handleShuffle = () => {
    const newState = !isShuffle
    setIsShuffle(newState)
    onShuffle?.(newState)
  }

  const handleRepeat = () => {
    const newState = !isRepeat
    setIsRepeat(newState)
    onRepeat?.(newState)
  }

  const handleSkipBack = () => {
    onSkipBack?.()
  }

  const handleSkipForward = () => {
    onSkipForward?.()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setAlbumArtUrl(imageUrl)
        onImageUpload?.(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    if (enableImageUpload) {
      fileInputRef.current?.click()
    }
  }

  const hexToRgb = (hex: string) => {
    if (!hex || !hex.startsWith('#')) return hex
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }

  const bgColor = backgroundColor.startsWith('#') ? hexToRgb(backgroundColor) : backgroundColor
  const borderCol = borderColor.startsWith('#') ? hexToRgb(borderColor) : borderColor
  const glow1 = glowColor1.startsWith('#') ? hexToRgb(glowColor1) : glowColor1
  const glow2 = glowColor2.startsWith('#') ? hexToRgb(glowColor2) : glowColor2
  
  const gradientFromColor = gradientFrom || 'var(--primary)'
  const gradientToColor = gradientTo || 'var(--accent)'
  const gradientInset = \`-\${gradientWidth}px\`

  return (
    <div
      className={cn("relative group overflow-hidden border p-6 backdrop-blur-xl", className)}
      style={{
        backgroundColor: bgColor,
        borderColor: borderCol,
        borderRadius: \`\${borderRadius}px\`,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {(gradientFrom || gradientTo) && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-0"
          style={{
            inset: gradientInset,
            backgroundImage: gradientAnimated
              ? \`linear-gradient(90deg, \${gradientFromColor}, \${gradientToColor}, \${gradientFromColor})\`
              : \`linear-gradient(to right, \${gradientFromColor}, \${gradientToColor})\`,
            backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: \`\${borderRadius + gradientWidth}px\`,
            animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      <div
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: glow1 }}
      />
      <div
        className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: glow2 }}
      />

      <div
        className={cn(
          "relative mx-auto mb-6 aspect-square w-full overflow-hidden shadow-2xl shadow-black/50",
          enableImageUpload && "cursor-pointer group"
        )}
        style={{ borderRadius: \`\${Math.max(0, borderRadius - 8)}px\` }}
        onClick={handleImageClick}
      >
        <img
          src={albumArtUrl}
          alt="Album Art"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10" />
        {enableImageUpload && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-white">
                <Upload className="h-8 w-8" />
                <span className="text-sm font-medium">上傳圖片</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </>
        )}
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{trackTitle}</h3>
          <p className="text-sm font-medium text-neutral-400">
            {artist}{album ? \` • \${album}\` : ''}
          </p>
        </div>
        {showHeart && (
          <button
            onClick={handleLove}
            className={cn("transition-colors hover:scale-110", isLoved ? "text-rose-500" : "text-neutral-500 hover:text-white")}
          >
            <Heart className={cn("h-6 w-6", isLoved && "fill-current")} />
          </button>
        )}
      </div>

      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
        <div
          className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ width: \`\${Math.min(100, Math.max(0, progress))}%\` }}
        />
      </div>
      <div className="mb-6 flex justify-between text-xs font-medium text-neutral-500">
        <span>{currentTime}</span>
        <span>{totalTime}</span>
      </div>

      <div className="flex items-center justify-between px-2">
        {showShuffle ? (
          <button
            onClick={handleShuffle}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all",
              isShuffle
                ? "bg-white/20 text-white"
                : "text-neutral-500 hover:text-white hover:bg-white/10"
            )}
          >
            <Shuffle size={18} className={isShuffle ? "text-white" : ""} />
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-6">
          <button
            onClick={handleSkipBack}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button
            onClick={handlePlayPause}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/20 transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          <button
            onClick={handleSkipForward}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        {showRepeat ? (
          <button
            onClick={handleRepeat}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all",
              isRepeat
                ? "bg-white/20 text-white"
                : "text-neutral-500 hover:text-white hover:bg-white/10"
            )}
          >
            <Repeat size={18} className={isRepeat ? "text-white" : ""} />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

// Usage example:
export function MediaPlayerDemo() {
  return (
    <MediaPlayer${propsString} />
  )
}`
    }

    if (componentName === "ChatInterface") {
      // Helper function to convert Tailwind class to RGB for inline styles
      const getColorFromTailwind = (tailwindClass: string): string | undefined => {
        if (!tailwindClass) return undefined
        const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
        if (hexMatch) {
          const r = parseInt(hexMatch[1].slice(0, 2), 16)
          const g = parseInt(hexMatch[1].slice(2, 4), 16)
          const b = parseInt(hexMatch[1].slice(4, 6), 16)
          return `rgb(${r} ${g} ${b})`
        }
        const colorMap: Record<string, string> = {
          "bg-neutral-900/80": "rgb(23 23 23 / 0.8)",
          "bg-neutral-800": "rgb(38 38 38)",
          "bg-neutral-950": "rgb(10 10 10)",
          "bg-indigo-600": "rgb(79 70 229)",
          "text-neutral-100": "rgb(245 245 245)",
          "text-neutral-500": "rgb(115 115 115)",
          "text-white": "rgb(255 255 255)",
          "text-neutral-200": "rgb(229 229 229)",
          "border-neutral-800": "rgb(38 38 38)",
          "border-indigo-500/50": "rgb(99 102 241 / 0.5)",
        }
        return colorMap[tailwindClass] || undefined
      }

      const headerBgColor = getColorFromTailwind(props.headerBgColor || "bg-neutral-900/80")
      const headerBorderColor = getColorFromTailwind(props.headerBorderColor || "border-neutral-800")
      const headerTextColor = getColorFromTailwind(props.headerTextColor || "text-neutral-100")
      const bodyBgColor = props.bodyBgColor ? getColorFromTailwind(props.bodyBgColor) : undefined
      const ownMessageColor = getColorFromTailwind(props.ownMessageColor || "bg-indigo-600")
      const otherMessageColor = getColorFromTailwind(props.otherMessageColor || "bg-neutral-800")
      const messageTextColor = props.messageTextColor ? getColorFromTailwind(props.messageTextColor) : undefined
      const timeTextColor = getColorFromTailwind(props.timeTextColor || "text-neutral-500")
      const footerBgColor = getColorFromTailwind(props.footerBgColor || "bg-neutral-900/80")
      const footerBorderColor = getColorFromTailwind(props.footerBorderColor || "border-neutral-800")
      const footerInputBgColor = getColorFromTailwind(props.footerInputBgColor || "bg-neutral-950")
      const footerButtonColor = getColorFromTailwind(props.footerButtonColor || "bg-indigo-600")
      const footerFocusBorderColor = getColorFromTailwind(props.footerFocusBorderColor || "border-indigo-500/50")

      const headerStatus = props.headerUserStatus === "Other" && props.headerUserStatusCustom
        ? props.headerUserStatusCustom
        : (props.headerUserStatus || "Online now")

      return `"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react"

interface MessageProps {
  text: string
  isOwn?: boolean
  time: string
  isRead?: boolean
  showReadReceipt?: boolean
  ownMessageColor?: string
  otherMessageColor?: string
  messageTextColor?: string
  timeTextColor?: string
}

const getColorFromTailwindForMessage = (tailwindClass: string): string | undefined => {
  if (!tailwindClass) return undefined
  const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  const colorMap: Record<string, string> = {
    "bg-indigo-600": "rgb(79 70 229)",
    "bg-neutral-800": "rgb(38 38 38)",
    "text-white": "rgb(255 255 255)",
    "text-neutral-200": "rgb(229 229 229)",
    "text-neutral-500": "rgb(115 115 115)",
  }
  return colorMap[tailwindClass] || undefined
}

const Message = ({ 
  text, 
  isOwn, 
  time,
  isRead = false,
  showReadReceipt = false,
  ownMessageColor = "bg-indigo-600",
  otherMessageColor = "bg-neutral-800",
  messageTextColor,
  timeTextColor = "text-neutral-500"
}: MessageProps) => (
  <div className={cn("flex w-full flex-col gap-1", isOwn ? "items-end" : "items-start")}>
    <div 
      className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
        isOwn ? "rounded-br-none" : "rounded-bl-none"
      )}
      style={{
        backgroundColor: getColorFromTailwindForMessage(isOwn ? ownMessageColor : otherMessageColor),
        color: getColorFromTailwindForMessage(messageTextColor || (isOwn ? "text-white" : "text-neutral-200")),
      }}
    >
      {text}
    </div>
    <div className={cn("flex items-center gap-1", isOwn ? "flex-row-reverse" : "flex-row")}>
      <span 
        className={cn("text-[10px]")}
        style={{
          color: getColorFromTailwindForMessage(timeTextColor),
        }}
      >
        {time}
      </span>
      {showReadReceipt && isOwn && (
        <div className={cn("flex items-center", isRead ? "text-blue-400" : "text-neutral-500")}>
          {isRead ? <CheckCheck size={12} /> : <Check size={12} />}
        </div>
      )}
    </div>
  </div>
)

interface ChatInterfaceProps {
  className?: string
  headerUserName?: string
  headerUserStatus?: string
  headerUserAvatar?: string
  headerShowPhone?: boolean
  headerShowVideo?: boolean
  headerShowMore?: boolean
  headerBgColor?: string
  headerBorderColor?: string
  headerTextColor?: string
  headerStatusColor?: string
  bodyBgColor?: string
  bodyPadding?: number
  bodyShowDateLabel?: boolean
  bodyDateLabelText?: string
  bodyShowTypingIndicator?: boolean
  bodyShowReadReceipt?: boolean
  message1Text?: string
  message1Time?: string
  message1IsOwn?: boolean
  message2Text?: string
  message2Time?: string
  message2IsOwn?: boolean
  message2IsRead?: boolean
  message3Text?: string
  message3Time?: string
  message3IsOwn?: boolean
  message3IsRead?: boolean
  message4Text?: string
  message4Time?: string
  message4IsOwn?: boolean
  ownMessageColor?: string
  otherMessageColor?: string
  messageTextColor?: string
  timeTextColor?: string
  footerBgColor?: string
  footerBorderColor?: string
  footerInputBgColor?: string
  footerInputPlaceholder?: string
  footerShowAttach?: boolean
  footerShowEmoji?: boolean
  footerButtonColor?: string
  footerFocusBorderColor?: string
}

const getStatusColor = (status: string): string => {
  const statusColorMap: Record<string, string> = {
    "Online now": "text-green-500",
    "Offline": "text-neutral-500",
    "Away": "text-yellow-500",
    "Busy": "text-red-500",
    "Do not disturb": "text-orange-500",
  }
  return statusColorMap[status] || "text-neutral-500"
}

const getStatusIndicatorColor = (status: string, customColor?: string): string => {
  if (customColor && customColor.trim() !== "") {
    if (customColor.includes("[") && customColor.includes("#")) {
      return customColor.replace("text-", "bg-")
    }
    if (customColor.startsWith("text-")) {
      return customColor.replace("text-", "bg-")
    }
    if (customColor.startsWith("bg-")) {
      return customColor
    }
  }
  const statusIndicatorMap: Record<string, string> = {
    "Online now": "bg-green-500",
    "Offline": "bg-neutral-500",
    "Away": "bg-yellow-500",
    "Busy": "bg-red-500",
    "Do not disturb": "bg-orange-500",
  }
  return statusIndicatorMap[status] || "bg-neutral-500"
}

const getColorFromTailwind = (tailwindClass: string): string | undefined => {
  if (!tailwindClass) return undefined
  const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  const colorMap: Record<string, string> = {
    "bg-neutral-900/80": "rgb(23 23 23 / 0.8)",
    "bg-neutral-800": "rgb(38 38 38)",
    "bg-neutral-950": "rgb(10 10 10)",
    "bg-indigo-600": "rgb(79 70 229)",
    "text-neutral-100": "rgb(245 245 245)",
    "text-neutral-500": "rgb(115 115 115)",
    "border-neutral-800": "rgb(38 38 38)",
    "border-indigo-500/50": "rgb(99 102 241 / 0.5)",
  }
  return colorMap[tailwindClass] || undefined
}

export const ChatInterface = ({ 
  className,
  headerUserName = "${props.headerUserName || "Sarah Jenkins"}",
  headerUserStatus = "${headerStatus}",
  headerUserAvatar = "${props.headerUserAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"}",
  headerShowPhone = ${props.headerShowPhone !== false},
  headerShowVideo = ${props.headerShowVideo !== false},
  headerShowMore = ${props.headerShowMore !== false},
  headerBgColor = "${props.headerBgColor || "bg-neutral-900/80"}",
  headerBorderColor = "${props.headerBorderColor || "border-neutral-800"}",
  headerTextColor = "${props.headerTextColor || "text-neutral-100"}",
  headerStatusColor${props.headerStatusColor ? ` = "${props.headerStatusColor}"` : ""},
  bodyBgColor${props.bodyBgColor ? ` = "${props.bodyBgColor}"` : ""},
  bodyPadding = ${props.bodyPadding || 6},
  bodyShowDateLabel = ${props.bodyShowDateLabel !== false},
  bodyDateLabelText = "${props.bodyDateLabelText || "Today, Oct 24"}",
  bodyShowTypingIndicator = ${props.bodyShowTypingIndicator !== false},
      bodyShowReadReceipt = ${props.bodyShowReadReceipt || false},
      message1Text = "${props.message1Text || "Hey! Have you had a chance to look at the new design system components?"}",
      message1Time = "${props.message1Time || "10:30 AM"}",
      message1IsOwn = ${props.message1IsOwn || false},
      message2Text = "${props.message2Text || "Yes! I just checked them out. The neon gradients look absolutely stunning 🤩"}",
      message2Time = "${props.message2Time || "10:32 AM"}",
      message2IsOwn = ${props.message2IsOwn !== false},
      message2IsRead = ${props.message2IsRead || false},
      message3Text = "${props.message3Text || "Right? I think we should use the SpotlightCard for the feature section."}",
      message3Time = "${props.message3Time || "10:32 AM"}",
      message3IsOwn = ${props.message3IsOwn !== false},
      message3IsRead = ${props.message3IsRead !== false},
      message4Text = "${props.message4Text || "Agreed. I'm preparing the documentation now. Will send over the draft in a bit!"}",
      message4Time = "${props.message4Time || "10:35 AM"}",
      message4IsOwn = ${props.message4IsOwn || false},
      ownMessageColor = "${props.ownMessageColor || "bg-indigo-600"}",
      otherMessageColor = "${props.otherMessageColor || "bg-neutral-800"}",
      messageTextColor${props.messageTextColor ? ` = "${props.messageTextColor}"` : ""},
      timeTextColor = "${props.timeTextColor || "text-neutral-500"}",
  footerBgColor = "${props.footerBgColor || "bg-neutral-900/80"}",
  footerBorderColor = "${props.footerBorderColor || "border-neutral-800"}",
  footerInputBgColor = "${props.footerInputBgColor || "bg-neutral-950"}",
  footerInputPlaceholder = "${props.footerInputPlaceholder || "Type a message..."}",
  footerShowAttach = ${props.footerShowAttach !== false},
  footerShowEmoji = ${props.footerShowEmoji !== false},
  footerButtonColor = "${props.footerButtonColor || "bg-indigo-600"}",
  footerFocusBorderColor = "${props.footerFocusBorderColor || "border-indigo-500/50"}",
}: ChatInterfaceProps) => {
  const statusText = headerUserStatus || "Online now"
  const hasCustomColor = headerStatusColor && headerStatusColor.trim() !== ""
  
  const extractHexFromColor = (colorClass: string): string | null => {
    if (!colorClass) return null
    const hexMatch = colorClass.match(/\[#([0-9A-Fa-f]{6})\]/)
    if (hexMatch) {
      return \`#\${hexMatch[1]}\`
    }
    const colorMap: Record<string, string> = {
      "text-green-500": "#22c55e",
      "text-blue-500": "#3b82f6",
      "text-yellow-500": "#eab308",
      "text-red-500": "#ef4444",
      "text-orange-500": "#f97316",
      "text-purple-500": "#a855f7",
      "text-pink-500": "#ec4899",
      "text-neutral-500": "#737373",
    }
    return colorMap[colorClass] || null
  }
  
  const hexToRgb = (hex: string): string | null => {
    if (!hex) return null
    const cleanHex = hex.replace('#', '')
    if (cleanHex.length !== 6) return null
    const r = parseInt(cleanHex.slice(0, 2), 16)
    const g = parseInt(cleanHex.slice(2, 4), 16)
    const b = parseInt(cleanHex.slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  
  const statusTextColorClass = hasCustomColor ? headerStatusColor : getStatusColor(statusText)
  const statusIndicatorColorClass = hasCustomColor 
    ? getStatusIndicatorColor(statusText, headerStatusColor) 
    : getStatusIndicatorColor(statusText)
  
  const statusTextHex = hasCustomColor 
    ? extractHexFromColor(headerStatusColor) 
    : extractHexFromColor(getStatusColor(statusText))
  const statusIndicatorHex = hasCustomColor
    ? extractHexFromColor(headerStatusColor)?.replace('#', '')
    : (() => {
        const statusIndicatorMap: Record<string, string> = {
          "Online now": "22c55e",
          "Offline": "737373",
          "Away": "eab308",
          "Busy": "ef4444",
          "Do not disturb": "f97316",
        }
        return statusIndicatorMap[statusText] || "737373"
      })()
  
  const statusTextRgb = statusTextHex ? hexToRgb(statusTextHex) : null
  const statusIndicatorRgb = statusIndicatorHex ? hexToRgb(\`#\${statusIndicatorHex}\`) : null

  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 shadow-xl backdrop-blur-md", className)}>
      <div 
        className={cn("flex items-center justify-between border-b px-6 py-4", headerBorderColor)}
        style={{
          backgroundColor: getColorFromTailwind(headerBgColor),
          borderColor: getColorFromTailwind(headerBorderColor),
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={headerUserAvatar} 
              alt="User" 
              className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-800"
            />
            <span 
              className={cn("absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-neutral-900", statusIndicatorColorClass)}
              style={statusIndicatorRgb ? { backgroundColor: statusIndicatorRgb } : undefined}
            />
          </div>
          <div>
            <h4 
              className={cn("font-semibold", headerTextColor)}
              style={{
                color: getColorFromTailwind(headerTextColor),
              }}
            >
              {headerUserName}
            </h4>
            <p 
              className={cn("text-xs", statusTextColorClass)}
              style={statusTextRgb ? { color: statusTextRgb } : undefined}
            >
              {statusText}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-neutral-400">
          {headerShowPhone && (
            <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors">
              <Phone size={18} />
            </button>
          )}
          {headerShowVideo && (
            <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors">
              <Video size={18} />
            </button>
          )}
          {headerShowMore && (
            <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors">
              <MoreVertical size={18} />
            </button>
          )}
        </div>
      </div>

      <div 
        className={cn("flex-1 space-y-6 overflow-y-auto scrollbar-hide")}
        style={{ 
          padding: \`\${bodyPadding * 4}px\`,
          backgroundColor: getColorFromTailwind(bodyBgColor),
        }}
      >
        {bodyShowDateLabel && (
          <div className="flex justify-center">
            <span className="rounded-full bg-neutral-800/50 px-3 py-1 text-[10px] font-medium text-neutral-500">
              {bodyDateLabelText}
            </span>
          </div>
        )}
        
        <Message 
          text={message1Text}
          time={message1Time}
          isOwn={message1IsOwn}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        <Message 
          text={message2Text}
          isOwn={message2IsOwn}
          time={message2Time}
          isRead={message2IsRead}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        <Message 
          text={message3Text}
          isOwn={message3IsOwn}
          time={message3Time}
          isRead={message3IsRead}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        <Message 
          text={message4Text}
          isOwn={message4IsOwn}
          time={message4Time}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        
        {bodyShowTypingIndicator && (
          <div className="flex items-center gap-1 px-4">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-0" />
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-150" />
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-300" />
          </div>
        )}
      </div>

      <div 
        className={cn("p-4")}
        style={{
          backgroundColor: getColorFromTailwind(footerBgColor),
        }}
      >
        <div 
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-2 transition-all focus-within:ring-1 focus-within:ring-indigo-500/50",
            footerFocusBorderColor
          )}
          style={{
            borderColor: getColorFromTailwind(footerBorderColor),
            backgroundColor: getColorFromTailwind(footerInputBgColor),
          }}
        >
          {footerShowAttach && (
            <button className="text-neutral-500 hover:text-neutral-300">
              <Paperclip size={20} />
            </button>
          )}
          <input 
            type="text" 
            placeholder={footerInputPlaceholder} 
            className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
          />
          {footerShowEmoji && (
            <button className="text-neutral-500 hover:text-neutral-300">
              <Smile size={20} />
            </button>
          )}
          <button 
            className={cn("rounded-lg p-2 text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-colors")}
            style={{
              backgroundColor: getColorFromTailwind(footerButtonColor),
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}`
    }

    if (componentName === "UrlInput") {
      // Convert hex to rgb for backgroundColor and borderColor in generated code
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      const propsList = []
      if (props.isLoading) propsList.push("isLoading={true}")
      if (props.borderRadius !== 12) propsList.push(`borderRadius={${props.borderRadius}}`)
      if (props.gradientFrom) propsList.push(`gradientFrom="${props.gradientFrom}"`)
      if (props.gradientTo) propsList.push(`gradientTo="${props.gradientTo}"`)
      if (props.gradientWidth !== 2) propsList.push(`gradientWidth={${props.gradientWidth}}`)
      if (props.gradientAnimated) propsList.push("gradientAnimated={true}")
      const bgColor = props.backgroundColor && props.backgroundColor !== "#0f172a"
        ? hexToRgb(props.backgroundColor)
        : null
      if (bgColor) propsList.push(`backgroundColor="${bgColor}"`)
      const borderCol = props.borderColor && props.borderColor !== "#334155"
        ? hexToRgb(props.borderColor)
        : null
      if (borderCol) propsList.push(`borderColor="${borderCol}"`)
      if (!props.showButton) propsList.push("showButton={false}")
      if (props.buttonText !== "Generate") propsList.push(`buttonText="${props.buttonText}"`)
      if (props.placeholder !== "https://your-shop.com/product/...") propsList.push(`placeholder="${props.placeholder}"`)
      if (!props.showIcon) propsList.push("showIcon={false}")

      const propsString = propsList.length > 0 ? ` ${propsList.join(" ")}` : ""

      return `"use client"

import React, { useState } from 'react'
import { Search, ArrowRight, Loader2 } from 'lucide-react'

interface UrlInputProps {
  onGenerate: (url: string) => void
  isLoading?: boolean
  borderRadius?: number
  gradientFrom?: string
  gradientTo?: string
  gradientWidth?: number
  gradientAnimated?: boolean
  backgroundColor?: string
  borderColor?: string
  showButton?: boolean
  buttonText?: string
  placeholder?: string
  showIcon?: boolean
  className?: string
}

export const UrlInput: React.FC<UrlInputProps> = ({ 
  onGenerate, 
  isLoading = false,
  borderRadius = 12,
  gradientFrom,
  gradientTo,
  gradientWidth = 2,
  gradientAnimated = false,
  backgroundColor = 'rgb(15 23 42)',
  borderColor = 'rgb(51 65 85)',
  showButton = true,
  buttonText = 'Generate',
  placeholder = 'https://your-shop.com/product/...',
  showIcon = true,
  className = '',
}) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onGenerate(url)
    }
  }

  const gradientFromColor = gradientFrom || 'var(--primary)'
  const gradientToColor = gradientTo || 'var(--accent)'
  const gradientInset = \`-\${gradientWidth}px\`

  return (
    <form onSubmit={handleSubmit} className={\`relative group w-full \${className}\`} style={{ minWidth: 0 }}>
      <div 
        className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          inset: gradientInset,
          backgroundImage: gradientAnimated 
            ? \`linear-gradient(90deg, \${gradientFromColor}, \${gradientToColor}, \${gradientFromColor})\`
            : \`linear-gradient(to right, \${gradientFromColor}, \${gradientToColor})\`,
          backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: \`\${borderRadius + gradientWidth}px\`,
          animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
        }}
      ></div>
      <div 
        className="relative flex items-center p-2 shadow-2xl"
        style={{
          backgroundColor,
          borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: \`\${borderRadius}px\`,
        }}
      >
        {showIcon && (
          <div className="pl-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        )}
        <input
          type="url"
          className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-slate-500 font-medium truncate"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          required
        />
        {showButton && (
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderRadius: \`\${Math.max(0, borderRadius - 4)}px\`,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing
              </>
            ) : (
              <>
                {buttonText} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  )
}

// Usage example:
export function UrlInputDemo() {
  const handleGenerate = (url: string) => {
    console.log('Generated URL:', url)
    // Your logic here
  }

  return (
    <UrlInput${propsString} onGenerate={handleGenerate} />
  )
}`
    }

    if (componentName === "GlassAuthForm") {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string) => {
        if (!hex) return hex
        // Extract hex from Tailwind format or from hex value
        const hexMatch = hex.match(/\[#([0-9A-Fa-f]{6})\]/)
        if (hexMatch) {
          const r = parseInt(hexMatch[1].slice(0, 2), 16)
          const g = parseInt(hexMatch[1].slice(2, 4), 16)
          const b = parseInt(hexMatch[1].slice(4, 6), 16)
          return `rgb(${r} ${g} ${b})`
        }
        // If it's already a hex value
        if (hex.startsWith('#')) {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgb(${r} ${g} ${b})`
        }
        return hex
      }

      const propsList = []
      // Always include all props with their current values (including defaults)
      if (props.className) propsList.push(`className="${props.className}"`)
      if (props.title !== "Welcome Back") propsList.push(`title="${props.title}"`)
      if (props.subtitle !== "Enter your credentials to access the workspace.") propsList.push(`subtitle="${props.subtitle}"`)
      if (props.emailLabel !== "Email address") propsList.push(`emailLabel="${props.emailLabel}"`)
      if (props.passwordLabel !== "Password") propsList.push(`passwordLabel="${props.passwordLabel}"`)
      if (props.rememberText !== "Remember me") propsList.push(`rememberText="${props.rememberText}"`)
      if (props.forgotPasswordText !== "Forgot password?") propsList.push(`forgotPasswordText="${props.forgotPasswordText}"`)
      if (props.signInText !== "Sign In") propsList.push(`signInText="${props.signInText}"`)
      if (props.continueWithText !== "Or continue with") propsList.push(`continueWithText="${props.continueWithText}"`)
      if (props.githubText !== "GitHub") propsList.push(`githubText="${props.githubText}"`)
      if (props.googleText !== "Google") propsList.push(`googleText="${props.googleText}"`)
      if (!props.showRememberMe) propsList.push("showRememberMe={false}")
      if (!props.showForgotPassword) propsList.push("showForgotPassword={false}")
      if (!props.showSocialButtons) propsList.push("showSocialButtons={false}")
      if (!props.showGithub) propsList.push("showGithub={false}")
      if (!props.showGoogle) propsList.push("showGoogle={false}")

      if (props.backgroundColor) {
        const bgColor = hexToRgb(props.backgroundColor)
        propsList.push(`backgroundColor="${bgColor}"`)
      }
      if (props.borderColor) {
        const borderCol = hexToRgb(props.borderColor)
        propsList.push(`borderColor="${borderCol}"`)
      }
      if (props.textColor) propsList.push(`textColor="${props.textColor}"`)
      if (props.iconGradientFrom) {
        const iconFrom = hexToRgb(props.iconGradientFrom)
        propsList.push(`iconGradientFrom="${iconFrom}"`)
      }
      if (props.iconGradientTo) {
        const iconTo = hexToRgb(props.iconGradientTo)
        propsList.push(`iconGradientTo="${iconTo}"`)
      }
      if (props.orb1Color) {
        const orb1 = hexToRgb(props.orb1Color)
        propsList.push(`orb1Color="${orb1}"`)
      }
      if (props.orb2Color) {
        const orb2 = hexToRgb(props.orb2Color)
        propsList.push(`orb2Color="${orb2}"`)
      }
      if (props.buttonColor) {
        const btnColor = hexToRgb(props.buttonColor)
        propsList.push(`buttonColor="${btnColor}"`)
      }
      if (props.socialButtonBgColor) {
        const socialBg = hexToRgb(props.socialButtonBgColor)
        propsList.push(`socialButtonBgColor="${socialBg}"`)
      }
      if (props.socialButtonBorderColor) {
        const socialBorder = hexToRgb(props.socialButtonBorderColor)
        propsList.push(`socialButtonBorderColor="${socialBorder}"`)
      }
      if (props.inputLabelColor) propsList.push(`inputLabelColor="${props.inputLabelColor}"`)
      if (props.inputBgColor) propsList.push(`inputBgColor="${props.inputBgColor}"`)
      if (props.inputBorderColor) propsList.push(`inputBorderColor="${props.inputBorderColor}"`)
      if (props.inputTextColor) propsList.push(`inputTextColor="${props.inputTextColor}"`)
      if (props.focusBorderColor) propsList.push(`focusBorderColor="${props.focusBorderColor}"`)
      if (props.cardGradientFrom) {
        const cardFrom = hexToRgb(props.cardGradientFrom)
        propsList.push(`cardGradientFrom="${cardFrom}"`)
      }
      if (props.cardGradientTo) {
        const cardTo = hexToRgb(props.cardGradientTo)
        propsList.push(`cardGradientTo="${cardTo}"`)
      }
      if (props.cardGradientWidth !== 2) propsList.push(`cardGradientWidth={${props.cardGradientWidth}}`)
      if (props.cardGradientAnimated) propsList.push("cardGradientAnimated={true}")
      if (props.outerGradientFrom) {
        const outerFrom = hexToRgb(props.outerGradientFrom)
        propsList.push(`outerGradientFrom="${outerFrom}"`)
      }
      if (props.outerGradientTo) {
        const outerTo = hexToRgb(props.outerGradientTo)
        propsList.push(`outerGradientTo="${outerTo}"`)
      }
      if (props.outerGradientWidth !== 2) propsList.push(`outerGradientWidth={${props.outerGradientWidth}}`)
      if (props.outerGradientAnimated) propsList.push("outerGradientAnimated={true}")
      if (props.borderRadius !== 24) propsList.push(`borderRadius={${props.borderRadius}}`)
      if (props.padding !== 8) propsList.push(`padding={${props.padding}}`)
      if (props.backdropBlur !== 12) propsList.push(`backdropBlur={${props.backdropBlur}}`)

      // Format with line breaks for better readability
      const propsString = propsList.length > 0
        ? `\n  ${propsList.join("\n  ")}\n`
        : ""

      return `"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Mail, Lock, Github, Chrome } from "lucide-react"
import { FloatingLabelInput } from "@/components/customize/FloatingLabelInput"
import { ShinyButton } from "@/components/customize/ShinyButton"

interface GlassAuthFormProps {
  className?: string
  // Text content
  title?: string
  subtitle?: string
  emailLabel?: string
  passwordLabel?: string
  rememberText?: string
  forgotPasswordText?: string
  signInText?: string
  continueWithText?: string
  githubText?: string
  googleText?: string
  // Display options
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showSocialButtons?: boolean
  showGithub?: boolean
  showGoogle?: boolean
  // Colors
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  iconGradientFrom?: string
  iconGradientTo?: string
  orb1Color?: string
  orb2Color?: string
  buttonColor?: string
  socialButtonBgColor?: string
  socialButtonBorderColor?: string
  inputLabelColor?: string
  inputBgColor?: string
  inputBorderColor?: string
  inputTextColor?: string
  focusBorderColor?: string
  // Card gradient
  cardGradientFrom?: string
  cardGradientTo?: string
  cardGradientWidth?: number
  cardGradientAnimated?: boolean
  // Outer gradient
  outerGradientFrom?: string
  outerGradientTo?: string
  outerGradientWidth?: number
  outerGradientAnimated?: boolean
  // Style
  borderRadius?: number
  padding?: number
  backdropBlur?: number
}

// Helper function to extract hex from Tailwind class or hex and convert to RGB
const getColorFromTailwind = (colorValue: string): string | undefined => {
  if (!colorValue) return undefined
  // Extract hex from bg-[#hex] or text-[#hex] format
  const hexMatch = colorValue.match(/\\[#([0-9A-Fa-f]{6})\\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  // If it's already a hex value
  if (colorValue.startsWith('#')) {
    const r = parseInt(colorValue.slice(1, 3), 16)
    const g = parseInt(colorValue.slice(3, 5), 16)
    const b = parseInt(colorValue.slice(5, 7), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  // Try color map
  const colorMap: Record<string, string> = {
    "bg-neutral-900/60": "rgb(23 23 23 / 0.6)",
    "bg-neutral-900": "rgb(23 23 23)",
    "border-neutral-800": "rgb(38 38 38)",
    "text-white": "rgb(255 255 255)",
    "text-neutral-400": "rgb(163 163 163)",
    "bg-indigo-500/20": "rgb(99 102 241 / 0.2)",
    "bg-purple-500/20": "rgb(168 85 247 / 0.2)",
    "from-indigo-500": "rgb(99 102 241)",
    "to-purple-500": "rgb(168 85 247)",
    "bg-indigo-600": "rgb(79 70 229)",
    "border-neutral-700": "rgb(64 64 64)",
    "bg-neutral-800": "rgb(38 38 38)",
  }
  return colorMap[colorValue] || undefined
}

export const GlassAuthForm: React.FC<GlassAuthFormProps> = ({
  className,
  title = "Welcome Back",
  subtitle = "Enter your credentials to access the workspace.",
  emailLabel = "Email address",
  passwordLabel = "Password",
  rememberText = "Remember me",
  forgotPasswordText = "Forgot password?",
  signInText = "Sign In",
  continueWithText = "Or continue with",
  githubText = "GitHub",
  googleText = "Google",
  showRememberMe = true,
  showForgotPassword = true,
  showSocialButtons = true,
  showGithub = true,
  showGoogle = true,
  backgroundColor,
  borderColor,
  textColor,
  iconGradientFrom,
  iconGradientTo,
  orb1Color,
  orb2Color,
  buttonColor,
  socialButtonBgColor,
  socialButtonBorderColor,
  inputLabelColor,
  inputBgColor,
  inputBorderColor,
  inputTextColor,
  focusBorderColor,
  cardGradientFrom,
  cardGradientTo,
  cardGradientWidth = 2,
  cardGradientAnimated = false,
  outerGradientFrom,
  outerGradientTo,
  outerGradientWidth = 2,
  outerGradientAnimated = false,
  borderRadius = 24,
  padding = 8,
  backdropBlur = 12,
}) => {
  const bgColor = backgroundColor ? getColorFromTailwind(backgroundColor) : "rgb(23 23 23 / 0.6)"
  const borderCol = borderColor ? getColorFromTailwind(borderColor) : "rgb(38 38 38)"
  const txtColor = textColor ? getColorFromTailwind(textColor) : "rgb(255 255 255)"
  const subTxtColor = textColor ? getColorFromTailwind(textColor) : "rgb(163 163 163)"
  const orb1Col = orb1Color ? getColorFromTailwind(orb1Color) : "rgb(99 102 241 / 0.2)"
  const orb2Col = orb2Color ? getColorFromTailwind(orb2Color) : "rgb(168 85 247 / 0.2)"
  const iconFrom = iconGradientFrom ? getColorFromTailwind(iconGradientFrom) : "rgb(99 102 241)"
  const iconTo = iconGradientTo ? getColorFromTailwind(iconGradientTo) : "rgb(168 85 247)"
  const socialBg = socialButtonBgColor ? getColorFromTailwind(socialButtonBgColor) : "rgb(38 38 38)"
  const socialBorder = socialButtonBorderColor ? getColorFromTailwind(socialButtonBorderColor) : "rgb(64 64 64)"
  
  // Card gradient colors
  const cardGradFrom = cardGradientFrom ? getColorFromTailwind(cardGradientFrom) : undefined
  const cardGradTo = cardGradientTo ? getColorFromTailwind(cardGradientTo) : undefined
  const cardGradInset = \`-\${cardGradientWidth}px\`
  
  // Outer gradient colors
  const outerGradFrom = outerGradientFrom ? getColorFromTailwind(outerGradientFrom) : undefined
  const outerGradTo = outerGradientTo ? getColorFromTailwind(outerGradientTo) : undefined
  const outerGradInset = \`-\${outerGradientWidth}px\`

  return (
    <div className={cn("relative group", className)} style={{ borderRadius: \`\${borderRadius}px\` }}>
      {/* Outer gradient */}
      {(outerGradFrom || outerGradTo) && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-0"
          style={{
            inset: outerGradInset,
            backgroundImage: outerGradientAnimated
              ? \`linear-gradient(90deg, \${outerGradFrom || 'var(--primary)'}, \${outerGradTo || 'var(--accent)'}, \${outerGradFrom || 'var(--primary)'})\`
              : \`linear-gradient(to right, \${outerGradFrom || 'var(--primary)'}, \${outerGradTo || 'var(--accent)'})\`,
            backgroundSize: outerGradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: \`\${borderRadius + outerGradientWidth}px\`,
            animation: outerGradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      
      {/* Card gradient */}
      {(cardGradFrom || cardGradTo) && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-[1]"
          style={{
            inset: cardGradInset,
            backgroundImage: cardGradientAnimated
              ? \`linear-gradient(90deg, \${cardGradFrom || 'var(--primary)'}, \${cardGradTo || 'var(--accent)'}, \${cardGradFrom || 'var(--primary)'})\`
              : \`linear-gradient(to right, \${cardGradFrom || 'var(--primary)'}, \${cardGradTo || 'var(--accent)'})\`,
            backgroundSize: cardGradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: \`\${borderRadius + cardGradientWidth}px\`,
            animation: cardGradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      
      <div
        className={cn("relative flex flex-col items-center overflow-hidden rounded-3xl border text-center z-10", className)}
        style={{
          backgroundColor: bgColor,
          borderColor: borderCol,
          borderRadius: \`\${borderRadius}px\`,
          padding: \`\${padding * 4}px\`,
          backdropFilter: \`blur(\${backdropBlur}px)\`,
        }}
      >
      {/* Background Orbs */}
      <div
        className="absolute -left-10 -top-10 h-32 w-32 rounded-full blur-3xl"
        style={{
          backgroundColor: orb1Col,
        }}
      />
      <div
        className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-3xl"
        style={{
          backgroundColor: orb2Col,
        }}
      />

      <div className="relative z-10 w-full">
        <div className="mb-6 flex flex-col items-center">
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
            style={{
              backgroundImage: \`linear-gradient(to top right, \${iconFrom}, \${iconTo})\`,
              boxShadow: \`\${iconFrom}30 0px 0px 20px\`,
            }}
          >
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold" style={{ color: txtColor }}>
            {title}
          </h3>
          <p className="text-sm" style={{ color: subTxtColor }}>
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          <FloatingLabelInput
            label={emailLabel}
            type="email"
            icon={<Mail size={16} />}
            labelColor={inputLabelColor}
            inputBgColor={inputBgColor}
            inputBorderColor={inputBorderColor}
            inputTextColor={inputTextColor}
            focusBorderColor={focusBorderColor}
          />
          <FloatingLabelInput
            label={passwordLabel}
            type="password"
            icon={<Lock size={16} />}
            labelColor={inputLabelColor}
            inputBgColor={inputBgColor}
            inputBorderColor={inputBorderColor}
            inputTextColor={inputTextColor}
            focusBorderColor={focusBorderColor}
          />
        </div>

        {showRememberMe && (
          <div className="mb-6 mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-neutral-700 bg-neutral-800 text-indigo-600 focus:ring-0 focus:ring-offset-0"
                style={{
                  borderColor: socialBorder,
                  backgroundColor: socialBg,
                }}
              />
              <span className="text-xs" style={{ color: subTxtColor }}>
                {rememberText}
              </span>
            </label>
            {showForgotPassword && (
              <a
                href="#"
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                style={{
                  color: iconFrom || "rgb(99 102 241)",
                }}
              >
                {forgotPasswordText}
              </a>
            )}
          </div>
        )}

        <ShinyButton
          className="w-full"
          style={{
            ...(buttonColor && {
              backgroundColor: getColorFromTailwind(buttonColor),
            }),
          }}
        >
          {signInText}
        </ShinyButton>

        {showSocialButtons && (showGithub || showGoogle) && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span
                  className="w-full border-t"
                  style={{
                    borderColor: borderCol,
                  }}
                />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="px-2"
                  style={{
                    backgroundColor: bgColor,
                    color: subTxtColor,
                  }}
                >
                  {continueWithText}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {showGithub && (
                <button
                  className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  style={{
                    backgroundColor: socialBg,
                    borderColor: socialBorder,
                    color: subTxtColor,
                  }}
                >
                  <Github size={16} />
                  {githubText}
                </button>
              )}
              {showGoogle && (
                <button
                  className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  style={{
                    backgroundColor: socialBg,
                    borderColor: socialBorder,
                    color: subTxtColor,
                  }}
                >
                  <Chrome size={16} />
                  {googleText}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Usage example:
export function GlassAuthFormDemo() {
  return (
    <GlassAuthForm${propsString}/>
  )
}`
    }

    if (componentName === "SocialProfileCard") {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      const propsList = []
      // Build props list for usage example
      propsList.push(`name="${props.name || "Sarah Jenkins"}"`)
      propsList.push(`username="${props.username || "@sarah_des"}"`)
      propsList.push(`bio="${props.bio || "Product Designer crafting digital experiences. Coffee enthusiast ☕. Building next-gen UI tools for developers."}"`)
      propsList.push(`avatarUrl="${props.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"}"`)
      propsList.push(`location="${props.location || "San Francisco, CA"}"`)
      propsList.push(`website="${props.website || "sarah.design"}"`)
      propsList.push(`twitter="${props.twitter || "@sarah_des"}"`)
      propsList.push(`showLocation={${props.showLocation !== false}}`)
      propsList.push(`showWebsite={${props.showWebsite !== false}}`)
      propsList.push(`showTwitter={${props.showTwitter !== false}}`)
      propsList.push(`followers="${props.followers || "12.5k"}"`)
      propsList.push(`following="${props.following || "842"}"`)
      propsList.push(`projects="${props.projects || "142"}"`)
      propsList.push(`isOnline={${props.isOnline !== false}}`)
      propsList.push(`statusColor="${props.statusColor || "bg-green-500"}"`)
      propsList.push(`bannerGradientFrom="${props.bannerGradientFrom || "from-indigo-500"}"`)
      propsList.push(`bannerGradientVia="${props.bannerGradientVia || "via-purple-500"}"`)
      propsList.push(`bannerGradientTo="${props.bannerGradientTo || "to-pink-500"}"`)
      propsList.push(`followButtonText="${props.followButtonText || "Follow"}"`)
      propsList.push(`showFollowButton={${props.showFollowButton !== false}}`)
      propsList.push(`showMessageButton={${props.showMessageButton !== false}}`)
      propsList.push(`showSimilarButton={${props.showSimilarButton !== false}}`)
      propsList.push(`messageButtonText="${props.messageButtonText || "Message"}"`)
      propsList.push(`similarButtonText="${props.similarButtonText || "Similar"}"`)

      if (props.backgroundColor) {
        const bgColor = hexToRgb(props.backgroundColor)
        propsList.push(`backgroundColor="${bgColor}"`)
      }

      if (props.borderColor) {
        const borderCol = hexToRgb(props.borderColor)
        propsList.push(`borderColor="${borderCol}"`)
      }

      propsList.push(`borderRadius={${props.borderRadius !== undefined ? props.borderRadius : 24}}`)

      if (props.gradientFrom) {
        propsList.push(`gradientFrom="${props.gradientFrom}"`)
      }

      if (props.gradientTo) {
        propsList.push(`gradientTo="${props.gradientTo}"`)
      }

      propsList.push(`gradientWidth={${props.gradientWidth !== undefined ? props.gradientWidth : 2}}`)
      propsList.push(`gradientAnimated={${props.gradientAnimated || false}}`)

      // Format with line breaks for better readability
      const propsString = propsList.length > 0
        ? `\n  ${propsList.join("\n  ")}\n`
        : ""

      return `import React from "react"
import { cn } from "@/lib/utils"
import { MapPin, Link as LinkIcon, Twitter, Users, MessageCircle } from "lucide-react"
import { ShinyButton } from "./ShinyButton"

interface SocialProfileCardProps {
  className?: string
  // User Info
  name?: string
  username?: string
  bio?: string
  avatarUrl?: string
  // Social Links
  location?: string
  website?: string
  twitter?: string
  showLocation?: boolean
  showWebsite?: boolean
  showTwitter?: boolean
  // Stats
  followers?: string | number
  following?: string | number
  projects?: string | number
  // Status
  isOnline?: boolean
  statusColor?: string
  // Banner
  bannerGradientFrom?: string
  bannerGradientVia?: string
  bannerGradientTo?: string
  // Buttons
  followButtonText?: string
  showFollowButton?: boolean
  showMessageButton?: boolean
  showSimilarButton?: boolean
  messageButtonText?: string
  similarButtonText?: string
  // Callbacks
  onFollow?: () => void
  onMessage?: () => void
  onSimilar?: () => void
  onAvatarChange?: (url: string) => void
  // Styling
  backgroundColor?: string
  borderColor?: string
  borderRadius?: number
  gradientFrom?: string
  gradientTo?: string
  gradientWidth?: number
  gradientAnimated?: boolean
}

export const SocialProfileCard = ({ 
  className,
  name = "${props.name || "Sarah Jenkins"}",
  username = "${props.username || "@sarah_des"}",
  bio = "${props.bio || "Product Designer crafting digital experiences. Coffee enthusiast ☕. Building next-gen UI tools for developers."}",
  avatarUrl = "${props.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"}",
  location = "${props.location || "San Francisco, CA"}",
  website = "${props.website || "sarah.design"}",
  twitter = "${props.twitter || "@sarah_des"}",
  showLocation = ${props.showLocation !== false},
  showWebsite = ${props.showWebsite !== false},
  showTwitter = ${props.showTwitter !== false},
  followers = "${props.followers || "12.5k"}",
  following = "${props.following || "842"}",
  projects = "${props.projects || "142"}",
  isOnline = ${props.isOnline !== false},
  statusColor = "${props.statusColor || "bg-green-500"}",
  bannerGradientFrom = "${props.bannerGradientFrom || "from-indigo-500"}",
  bannerGradientVia = "${props.bannerGradientVia || "via-purple-500"}",
  bannerGradientTo = "${props.bannerGradientTo || "to-pink-500"}",
  followButtonText = "${props.followButtonText || "Follow"}",
  showFollowButton = ${props.showFollowButton !== false},
  showMessageButton = ${props.showMessageButton !== false},
  showSimilarButton = ${props.showSimilarButton !== false},
  messageButtonText = "${props.messageButtonText || "Message"}",
  similarButtonText = "${props.similarButtonText || "Similar"}",
  onFollow,
  onMessage,
  onSimilar,
  onAvatarChange,
  backgroundColor${props.backgroundColor ? ` = "${hexToRgb(props.backgroundColor)}"` : ""},
  borderColor${props.borderColor ? ` = "${hexToRgb(props.borderColor)}"` : ""},
  borderRadius = ${props.borderRadius !== undefined ? props.borderRadius : 24},
  gradientFrom${props.gradientFrom ? ` = "${props.gradientFrom}"` : ""},
  gradientTo${props.gradientTo ? ` = "${props.gradientTo}"` : ""},
  gradientWidth = ${props.gradientWidth !== undefined ? props.gradientWidth : 2},
  gradientAnimated = ${props.gradientAnimated || false},
}: SocialProfileCardProps) => {
  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") {
      if (value >= 1000) {
        return \`\${(value / 1000).toFixed(1)}k\`
      }
      return value.toString()
    }
    return value
  }

  const getColorFromTailwind = (tailwindClass: string): string | undefined => {
    if (!tailwindClass) return undefined
    const hexMatch = tailwindClass.match(/\\[#([0-9A-Fa-f]{6})\\]/)
    if (hexMatch) {
      const r = parseInt(hexMatch[1].slice(0, 2), 16)
      const g = parseInt(hexMatch[1].slice(2, 4), 16)
      const b = parseInt(hexMatch[1].slice(4, 6), 16)
      return \`rgb(\${r} \${g} \${b})\`
    }
    const colorMap: Record<string, string> = {
      "bg-green-500": "rgb(34 197 94)",
      "bg-blue-500": "rgb(59 130 246)",
      "bg-purple-500": "rgb(168 85 247)",
      "bg-pink-500": "rgb(236 72 153)",
      "bg-yellow-500": "rgb(234 179 8)",
      "bg-red-500": "rgb(239 68 68)",
      "bg-orange-500": "rgb(249 115 22)",
      "bg-neutral-900": "rgb(23 23 23)",
      "bg-neutral-800": "rgb(38 38 38)",
      "from-indigo-500": "rgb(99 102 241)",
      "from-purple-500": "rgb(168 85 247)",
      "from-pink-500": "rgb(236 72 153)",
      "from-blue-500": "rgb(59 130 246)",
      "from-green-500": "rgb(34 197 94)",
      "from-yellow-500": "rgb(234 179 8)",
      "from-red-500": "rgb(239 68 68)",
      "from-orange-500": "rgb(249 115 22)",
      "via-indigo-500": "rgb(99 102 241)",
      "via-purple-500": "rgb(168 85 247)",
      "via-pink-500": "rgb(236 72 153)",
      "via-blue-500": "rgb(59 130 246)",
      "via-green-500": "rgb(34 197 94)",
      "via-yellow-500": "rgb(234 179 8)",
      "via-red-500": "rgb(239 68 68)",
      "via-orange-500": "rgb(249 115 22)",
      "to-indigo-500": "rgb(99 102 241)",
      "to-purple-500": "rgb(168 85 247)",
      "to-pink-500": "rgb(236 72 153)",
      "to-blue-500": "rgb(59 130 246)",
      "to-green-500": "rgb(34 197 94)",
      "to-yellow-500": "rgb(234 179 8)",
      "to-red-500": "rgb(239 68 68)",
      "to-orange-500": "rgb(249 115 22)",
    }
    return colorMap[tailwindClass] || undefined
  }

  const gradientFromColor = gradientFrom || 'var(--primary, #a855f7)'
  const gradientToColor = gradientTo || 'var(--accent, #ec4899)'
  const gradientInset = \`-\${gradientWidth}px\`

  return (
    <div className={cn("relative group", className)} style={{ borderRadius: \`\${borderRadius}px\` }}>
      <div 
        className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          inset: gradientInset,
          backgroundImage: gradientAnimated 
            ? \`linear-gradient(90deg, \${gradientFromColor}, \${gradientToColor}, \${gradientFromColor})\`
            : \`linear-gradient(to right, \${gradientFromColor}, \${gradientToColor})\`,
          backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: \`\${borderRadius + gradientWidth}px\`,
          animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          zIndex: 0,
        }}
      />
      <div 
        className={cn(
          "relative overflow-hidden rounded-3xl border shadow-xl w-full h-full",
          !backgroundColor && "bg-neutral-900/90",
          !borderColor && "border-neutral-800",
        )}
        style={{
          ...(backgroundColor && { backgroundColor }),
          ...(borderColor && { borderColor }),
          borderRadius: \`\${borderRadius}px\`,
          zIndex: 1,
        }}
      >
        <div 
          className="h-32 w-full opacity-80 transition-opacity group-hover:opacity-100"
          style={{
            backgroundImage: \`linear-gradient(to right, \${
              getColorFromTailwind(bannerGradientFrom) || "rgb(99 102 241)"
            }, \${
              getColorFromTailwind(bannerGradientVia) || "rgb(168 85 247)"
            }, \${
              getColorFromTailwind(bannerGradientTo) || "rgb(236 72 153)"
            })\`,
          }}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="relative px-6 pb-6">
          <div className="relative -mt-12 mb-4 inline-block">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file && onAvatarChange) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      const result = reader.result as string
                      onAvatarChange(result)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className={cn(
                  "block cursor-pointer",
                  onAvatarChange && "hover:opacity-80 transition-opacity"
                )}
              >
                <div className="h-24 w-24 rounded-2xl border-4 border-neutral-900 bg-neutral-800 shadow-xl overflow-hidden">
                  <img 
                    src={avatarUrl} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </label>
            </div>
            {isOnline && (
              <div 
                className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-neutral-900"
                style={{
                  backgroundColor: getColorFromTailwind(statusColor),
                }}
              />
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-sm text-indigo-400">{username}</p>
              </div>
              {showFollowButton && (
                <ShinyButton 
                  className="h-9 px-4 text-xs"
                  onClick={onFollow}
                >
                  {followButtonText}
                </ShinyButton>
              )}
            </div>
            
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {bio}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
              {showLocation && location && (
                <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                  <MapPin size={14} />
                  {location}
                </div>
              )}
              {showWebsite && website && (
                <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                  <LinkIcon size={14} />
                  {website}
                </div>
              )}
              {showTwitter && twitter && (
                <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                  <Twitter size={14} />
                  {twitter}
                </div>
              )}
            </div>
          </div>

          <div className="flex border-t border-neutral-800 pt-6">
            <div className="flex-1 text-center border-r border-neutral-800">
              <div className="text-lg font-bold text-white">{formatNumber(followers)}</div>
              <div className="text-xs font-medium text-neutral-500">Followers</div>
            </div>
            <div className="flex-1 text-center border-r border-neutral-800">
              <div className="text-lg font-bold text-white">{formatNumber(following)}</div>
              <div className="text-xs font-medium text-neutral-500">Following</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-lg font-bold text-white">{formatNumber(projects)}</div>
              <div className="text-xs font-medium text-neutral-500">Projects</div>
            </div>
          </div>

          {(showMessageButton || showSimilarButton) && (
            <div className="mt-6 flex gap-3">
              {showMessageButton && (
                <button 
                  onClick={onMessage}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <MessageCircle size={16} />
                  {messageButtonText}
                </button>
              )}
              {showSimilarButton && (
                <button 
                  onClick={onSimilar}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <Users size={16} />
                  {similarButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Usage example:
export function SocialProfileCardDemo() {
  return (
    <SocialProfileCard${propsString}/>
  )
}`
    }

    if (heroMeta && initialCode) {
      const interfaceName = `${heroMeta.componentName}Props`
      const propsInterface = `interface ${interfaceName} {\n` +
        Object.entries(config.props).map(([key, conf]: [string, any]) => {
          const type = conf.type === "boolean" ? "boolean" : 
                       conf.type === "slider" || conf.min !== undefined ? "number" : "string"
          return `  ${key}?: ${type}`
        }).join("\n") +
        "\n}"

      // Replace the type definition line
      let code = initialCode.replace(
        new RegExp(`export type ${interfaceName} = HeroComponentProps<"[^"]+">`),
        propsInterface
      )
      
      // Fallback if replacement didn't happen (e.g. different formatting), just prepend
      if (code === initialCode) {
         code = propsInterface + "\n\n" + initialCode
      }

      const imports = `"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  ArrowRight, CheckCircle2, Command, Heart, Layout, Mail, MapPin, Mic, 
  Play, PlayCircle, Search, Star, Terminal, Zap, Quote, Shield, CreditCard, Smartphone 
} from "lucide-react"
import { ShinyButton } from "@/components/customize/ShinyButton"
`
      // Helper functions
      const helpers = `
const highlightText = (text: string, highlight: string, options?: { className?: string; style?: React.CSSProperties }) => {
  if (!highlight) return text
  const index = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (index === -1) {
    return (
      <>
        {text}{" "}
        <span className={options?.className} style={options?.style}>
          {highlight}
        </span>
      </>
    )
  }
  const before = text.slice(0, index)
  const match = text.slice(index, index + highlight.length)
  const after = text.slice(index + highlight.length)
  return (
    <>
      {before}
      <span className={options?.className} style={options?.style}>
        {match}
      </span>
      {after}
    </>
  )
}

const iconMap = {
  layout: Layout,
  zap: Zap,
  command: Command,
}
`

      return `${imports}\n${helpers}\n${code}\n\n// Usage example:\nexport function ${heroMeta.componentName}Demo() {\n  return (\n    <${heroMeta.componentName}${propsString ? " " + propsString : ""} />\n  )\n}`
    }

    if (heroMeta) {
      return `import { ${heroMeta.componentName} } from "@/components/customize/heroes"

export function ${heroMeta.componentName}Demo() {
  return (
    <${heroMeta.componentName}${propsString ? " " + propsString : ""} />
  )
}`
    }

    if (children) {
      return `<${componentName}${propsString ? " " + propsString : ""}>${children}</${componentName}>`
    }

    return `<${componentName}${propsString ? " " + propsString : ""} />`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!config) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Playground not available for this component yet.
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-6 min-w-0 w-full">
      {/* Mobile Order: 1. Preview */}
      <div className="order-1 lg:col-span-1">
        <Card className="p-12 min-h-[400px] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
          {config.render(props, setProps)}
        </Card>
      </div>

      {/* Mobile Order: 2. Customize (Desktop: Right Column) */}
      <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-3">
        <Card className="p-6 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <h3 className="font-semibold mb-4">Customize</h3>
          {config && (
            <CustomizePanel
              componentName={componentName}
              props={props}
              config={config}
              updateProp={updateProp}
            />
          )}
        </Card>
      </div>

      {/* Mobile Order: 3. Code */}
      <div className="order-3 lg:col-span-1 min-w-0">
        <Card className="p-6 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Code</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="w-full min-w-0 overflow-hidden">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto overflow-y-auto text-sm max-h-[400px] w-full min-w-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground transition-colors">
              <code className="block whitespace-pre">{generateCode()}</code>
            </pre>
          </div>
        </Card>
      </div>

      {/* Mobile Order: 4. Properties */}
      <div className="order-4 lg:col-span-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Properties</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Default</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const componentDetail = componentDetails[slug]
                  const propsMap = componentDetail?.props || []

                  return Object.entries(config.props).map(([key, propConfig]: [string, any]) => {
                    const propDetail = propsMap.find((p: any) => p.name === key)
                    return (
                      <tr key={key} className="border-t">
                        <td className="p-3 font-mono text-xs">{key}</td>
                        <td className="p-3">
                          <Badge variant="secondary">{propConfig.type === "slider" ? "number" : propConfig.type}</Badge>
                        </td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">
                          {String(propConfig.default || "-")}
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">
                          {propDetail?.description || "-"}
                        </td>
                      </tr>
                    )
                  })
                })()}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Variants and Examples */}
      {(() => {
        const componentDetail = componentDetails[slug]
        if (!componentDetail || (!componentDetail.variants?.length && !componentDetail.examples?.length)) {
          return null
        }

        return (
          <>
            {/* Variants */}
            {componentDetail.variants && componentDetail.variants.length > 0 && (
              <div className="order-5 lg:col-span-2">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Variants</h3>
                  <div className="space-y-6">
                    {componentDetail.variants.map((variant, index) => (
                      <div key={index} className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">{variant.name}</h4>
                          <p className="text-sm text-muted-foreground">{variant.description}</p>
                        </div>
                        <CodeBlock code={variant.code} />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Examples */}
            {componentDetail.examples && componentDetail.examples.length > 0 && (
              <div className="order-6 lg:col-span-2">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Examples</h3>
                  <div className="space-y-8">
                    {componentDetail.examples.map((example, index) => (
                      <div key={index} className="space-y-3">
                        <div>
                          <h4 className="font-medium text-base mb-1">{example.title}</h4>
                          <p className="text-sm text-muted-foreground">{example.description}</p>
                        </div>
                        <CodeBlock code={example.code} />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </>
        )
      })()}
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { UrlInput } from "@/components/customize/url-input"
import { MediaPlayer } from "@/components/customize/media-player"
import { ChatInterface } from "@/components/customize/chat-interface"
import { SocialProfileCard } from "@/components/customize/SocialProfileCard"
import { GlassAuthForm } from "@/components/customize/glass-auth-form"
import { heroSections } from "@/lib/hero-sections"
import { heroComponentsByName, heroDefaultProps } from "@/components/customize/heroes"
import { featureSections } from "@/lib/feature-sections"
import { featureComponentsByName, featureDefaultProps } from "@/components/customize/features"
import { paymentSections } from "@/lib/payment-sections"
import { paymentComponentsByName, paymentDefaultProps } from "@/components/customize/payments"
import { ctaSections } from "@/lib/cta-sections"
import { ctaComponentsByName, ctaDefaultProps } from "@/components/customize/ctas"
import { headerSections } from "@/lib/header-sections"
import { headerComponentsByName, headerDefaultProps } from "@/components/customize/headers"
import { footerSections } from "@/lib/footer-sections"
import { footerComponentsByName, footerDefaultProps } from "@/components/customize/footers"
import { buttonSections } from "@/lib/button-sections"
import { buttonComponentsByName } from "@/components/customize/buttons"
import { cardSections } from "@/lib/card-sections"
import { cardComponentsByName } from "@/components/customize/cards"
import { badgeSections } from "@/lib/badge-sections"
import { badgeComponentsByName } from "@/components/customize/badges"
import { inputSections } from "@/lib/input-sections"
import { inputComponentsByName } from "@/components/customize/inputs"
import { dialogSections } from "@/lib/dialog-sections"
import { dialogComponentsByName } from "@/components/customize/dialogs"
import { toggleSections } from "@/lib/toggle-sections"
import { toggleComponentsByName } from "@/components/customize/toggles"
import { tabsSections } from "@/lib/tabs-sections"
import { tabsComponentsByName } from "@/components/customize/tabs"
import { sidebarSections } from "@/lib/sidebar-sections"
import { sidebarComponentsByName } from "@/components/customize/sidebars"
import { tabbarSections } from "@/lib/tabbar-sections"
import { tabbarComponentsByName } from "@/components/customize/tabbars"
import { AlertCircle, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  name: string
  description?: string
  href: string
  category?: string
  tags?: string[]
  className?: string
}

export function ComponentPreview(props: ComponentPreviewProps) {
  // Destructure only the props we need, ignoring any extra props that might be passed
  const { name, href, tags, className } = props
  const [selectOpen, setSelectOpen] = useState(false)

  const heroMeta = heroSections.find((hero) => hero.name === name)
  const HeroComponent = heroMeta ? heroComponentsByName[heroMeta.componentName] : null

  const featureMeta = featureSections.find((feature) => feature.name === name)
  const FeatureComponent = featureMeta ? featureComponentsByName[featureMeta.componentName] : null

  const paymentMeta = paymentSections.find((payment) => payment.name === name)
  const PaymentComponent = paymentMeta ? paymentComponentsByName[paymentMeta.componentName] : null

  const ctaMeta = ctaSections.find((cta) => cta.name === name)
  const CtaComponent = ctaMeta ? ctaComponentsByName[ctaMeta.componentName] : null

  const headerMeta = headerSections.find((header) => header.name === name)
  const HeaderComponent = headerMeta ? headerComponentsByName[headerMeta.componentName] : null

  const footerMeta = footerSections.find((footer) => footer.name === name)
  const FooterComponent = footerMeta ? footerComponentsByName[footerMeta.componentName] : null

  const buttonMeta = buttonSections.find((button) => button.name === name)
  const ButtonComponent = buttonMeta ? buttonComponentsByName[buttonMeta.componentName] : null

  const cardMeta = cardSections.find((card) => card.name === name)
  const CardComponent = cardMeta ? cardComponentsByName[cardMeta.componentName] : null

  const badgeMeta = badgeSections.find((badge) => badge.name === name)
  const BadgeComponent = badgeMeta ? badgeComponentsByName[badgeMeta.componentName] : null

  const inputMeta = inputSections.find((input) => input.name === name)
  const InputComponent = inputMeta ? inputComponentsByName[inputMeta.componentName] : null

  const dialogMeta = dialogSections.find((dialog) => dialog.name === name)
  const DialogComponent = dialogMeta ? dialogComponentsByName[dialogMeta.componentName] : null

  const toggleMeta = toggleSections.find((toggle) => toggle.name === name)
  const ToggleComponent = toggleMeta ? toggleComponentsByName[toggleMeta.componentName] : null

  const tabsMeta = tabsSections.find((tab) => tab.name === name)
  const TabsComponent = tabsMeta ? tabsComponentsByName[tabsMeta.componentName] : null

  const sidebarMeta = sidebarSections.find((sidebar) => sidebar.name === name)
  const SidebarComponent = sidebarMeta ? sidebarComponentsByName[sidebarMeta.componentName] : null

  const tabbarMeta = tabbarSections.find((tabbar) => tabbar.name === name)
  const TabbarComponent = tabbarMeta ? tabbarComponentsByName[tabbarMeta.componentName] : null

  const isSection = !!heroMeta || !!featureMeta || !!paymentMeta || !!ctaMeta || !!footerMeta || !!headerMeta || !!buttonMeta || !!cardMeta || !!badgeMeta || !!inputMeta || !!dialogMeta || !!toggleMeta || !!tabsMeta || !!sidebarMeta || !!tabbarMeta

  // Get tags from props or from section metadata
  const displayTags = tags || heroMeta?.tags || featureMeta?.tags || paymentMeta?.tags || ctaMeta?.tags || footerMeta?.tags || headerMeta?.tags || buttonMeta?.tags || cardMeta?.tags || badgeMeta?.tags || inputMeta?.tags || dialogMeta?.tags || toggleMeta?.tags || tabsMeta?.tags || sidebarMeta?.tags || tabbarMeta?.tags || []

  const renderPreview = () => {
    if (heroMeta && HeroComponent) {
      const defaultProps = heroDefaultProps[heroMeta.slug] || {}
      return (
        <div className="w-full">
          <HeroComponent {...defaultProps} />
        </div>
      )
    }

    if (featureMeta && FeatureComponent) {
      const defaultProps = featureDefaultProps[featureMeta.slug] || {}
      return (
        <div className="w-full">
          <FeatureComponent {...defaultProps} />
        </div>
      )
    }

    if (paymentMeta && PaymentComponent) {
      const defaultProps = paymentDefaultProps[paymentMeta.slug] || {}
      return (
        <div className="w-full">
          <PaymentComponent {...defaultProps} />
        </div>
      )
    }

    if (ctaMeta && CtaComponent) {
      const defaultProps = ctaDefaultProps[ctaMeta.slug] || {}
      return (
        <div className="w-full">
          <CtaComponent {...defaultProps} />
        </div>
      )
    }

    if (headerMeta && HeaderComponent) {
      const defaultProps = headerDefaultProps[headerMeta.slug] || {}
      return (
        <div className="w-full">
          <HeaderComponent {...defaultProps} />
        </div>
      )
    }

    if (footerMeta && FooterComponent) {
      const defaultProps = footerDefaultProps[footerMeta.slug] || {}
      return (
        <div className="w-full">
          <FooterComponent {...defaultProps} />
        </div>
      )
    }

    if (buttonMeta && ButtonComponent) {
      // Get default props for the button
      const defaultProps = Object.fromEntries(
        Object.entries(buttonMeta.props).map(([key, prop]) => [key, prop.default])
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <ButtonComponent {...defaultProps} />
        </div>
      )
    }

    if (cardMeta && CardComponent) {
      // Get default props for the card, with special handling for array/object props
      const defaultProps = Object.fromEntries(
        Object.entries(cardMeta.props).map(([key, prop]) => {
          const defaultValue = prop.default
          
          // Handle array props that are stored as strings (textarea control)
          if (key === "features" && typeof defaultValue === "string") {
            return [key, defaultValue.split("\n").filter((f: string) => f.trim())]
          }
          
          if (key === "skills" && typeof defaultValue === "string") {
            return [key, defaultValue.split("\n").filter((s: string) => s.trim())]
          }
          
          // Handle comparison rows for ComparisonCard
          if (key === "rows" && typeof defaultValue === "string") {
            return [key, defaultValue.split("\n").map((row: string) => {
              const [label, left, right] = row.split(":")
              return { label: label?.trim() || "", left: left?.trim() || "", right: right?.trim() || "" }
            }).filter((r: any) => r.label)]
          }
          
          // Handle roadmap items for RoadmapCard
          if (key === "items" && typeof defaultValue === "string") {
            return [key, defaultValue.split("\n").map((item: string) => {
              const [title, status, color] = item.split(":")
              return { 
                title: title?.trim() || "", 
                status: status?.trim() || "", 
                color: color?.trim() === "green" ? "bg-green-500" : color?.trim() === "yellow" ? "bg-yellow-500" : "bg-neutral-600"
              }
            }).filter((i: any) => i.title)]
          }
          
          // Handle hourly forecast for WeatherCard
          if (key === "hourlyForecast" && typeof defaultValue === "string") {
            return [key, defaultValue.split("\n").map((forecast: string) => {
              const [time, temp] = forecast.split(":")
              return { time: time?.trim() || "", temp: parseInt(temp?.trim() || "0") }
            }).filter((f: any) => f.time)]
          }
          
          return [key, defaultValue]
        })
      )
      return (
        <div className="w-full max-w-sm mx-auto">
          <CardComponent {...defaultProps} />
        </div>
      )
    }

    if (badgeMeta && BadgeComponent) {
      // Get default props for the badge
      const defaultProps = Object.fromEntries(
        Object.entries(badgeMeta.props).map(([key, prop]) => [key, prop.default])
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <BadgeComponent {...defaultProps} />
        </div>
      )
    }

    if (inputMeta && InputComponent) {
      // Get default props for the input
      const defaultProps = Object.fromEntries(
        Object.entries(inputMeta.props).map(([key, prop]) => [key, prop.default])
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <InputComponent {...defaultProps} />
        </div>
      )
    }

    if (dialogMeta && DialogComponent) {
      // Get default props for the dialog
      const defaultProps = Object.fromEntries(
        Object.entries(dialogMeta.props).map(([key, prop]) => [key, prop.default])
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <DialogComponent {...defaultProps} />
        </div>
      )
    }

    if (toggleMeta && ToggleComponent) {
      // Get default props for the toggle
      const defaultProps = Object.fromEntries(
        Object.entries(toggleMeta.props).map(([key, prop]) => [key, prop.default])
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <ToggleComponent {...defaultProps} />
        </div>
      )
    }

    if (tabsMeta && TabsComponent) {
      // Get default props for the tabs
      const defaultProps = Object.fromEntries(
        Object.entries(tabsMeta.props).map(([key, prop]) => [key, prop.default])
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <TabsComponent {...defaultProps} />
        </div>
      )
    }

    if (sidebarMeta && SidebarComponent) {
      // Get default props for the sidebar, filtering out undefined values
      const defaultProps = Object.fromEntries(
        Object.entries(sidebarMeta.props)
          .map(([key, prop]) => [key, prop.default])
          .filter(([_, value]) => value !== undefined && value !== null)
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <SidebarComponent {...defaultProps} />
        </div>
      )
    }

    if (tabbarMeta && TabbarComponent) {
      // Get default props for the tabbar, filtering out undefined values
      const defaultProps = Object.fromEntries(
        Object.entries(tabbarMeta.props)
          .map(([key, prop]) => [key, prop.default])
          .filter(([_, value]) => value !== undefined && value !== null)
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <TabbarComponent {...defaultProps} />
        </div>
      )
    }

    switch (name) {
      case "Accordion":
        return (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      case "Alert":
        return (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app.</AlertDescription>
          </Alert>
        )
      case "Avatar":
        return (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src="/images/design-mode/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        )
      case "Badge":
        return (
          <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        )
      case "Button":
        return (
          <div className="flex gap-2 flex-wrap">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        )
      case "Card":
        return (
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Card Title</h3>
            <p className="text-sm text-muted-foreground">Card content goes here.</p>
          </Card>
        )
      case "Checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              Accept terms and conditions
            </label>
          </div>
        )
      case "Input":
        return <Input placeholder="Email" type="email" />
      case "Label":
        return (
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" />
          </div>
        )
      case "Separator":
        return (
          <div className="space-y-4 w-full">
            <div>Above</div>
            <Separator />
            <div>Below</div>
          </div>
        )
      case "Skeleton":
        return (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )
      case "Switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
        )
      case "Tabs":
        return (
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Account content</TabsContent>
            <TabsContent value="password">Password content</TabsContent>
          </Tabs>
        )
      case "Textarea":
        return <Textarea placeholder="Type your message here." />
      case "Dialog":
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog component. You can put any content here.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )
      case "Select":
        return (
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <Select open={selectOpen} onOpenChange={setSelectOpen}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={() => setSelectOpen(!selectOpen)}>
              {selectOpen ? "Close" : "Open"} Select
            </Button>
          </div>
        )
      case "Dropdown Menu":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Open Menu <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      case "Popover":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium">Popover Title</h4>
                <p className="text-sm text-muted-foreground">
                  This is a popover component.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        )
      case "Sheet":
        return (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  This is a sheet component that slides in from the side.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        )
      case "UrlInput":
        return (
          <UrlInput
            onGenerate={(url) => console.log('Generated URL:', url)}
            isLoading={false}
            className="w-full max-w-2xl"
          />
        )
      case "MediaPlayer":
        return (
          <div className="w-full max-w-sm">
            <MediaPlayer />
          </div>
        )
      case "ChatInterface":
        return (
          <div className="w-full max-w-md">
            <ChatInterface />
          </div>
        )
      case "SocialProfileCard":
        return (
          <div className="w-full max-w-sm">
            <SocialProfileCard />
          </div>
        )
      case "GlassAuthForm":
        return (
          <div className="w-full max-w-sm">
            <GlassAuthForm />
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            <p className="text-sm">Preview not available</p>
          </div>
        )
    }
  }

  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 pb-0 flex flex-col",
      isSection && "gap-0 py-0",
      className
    )}>
      <div className={cn(
        "bg-gradient-to-br from-background to-muted/20 flex items-center justify-center flex-1 overflow-hidden",
        isSection ? "p-0" : "p-6"
      )}>
        {renderPreview()}
      </div>
      <Link href={href} className="block p-4 border-t bg-card group hover:bg-accent transition-colors flex-shrink-0">
        <h3 className="font-semibold group-hover:text-primary transition-colors text-xl">{name}</h3>
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {displayTags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {displayTags.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{displayTags.length - 4}
              </Badge>
            )}
          </div>
        )}
      </Link>
    </Card>
  )
}

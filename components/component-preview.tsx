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

export function ComponentPreview({ name, href, tags, className }: ComponentPreviewProps) {
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

  const isSection = !!heroMeta || !!featureMeta || !!paymentMeta || !!ctaMeta || !!footerMeta || !!headerMeta

  // Get tags from props or from section metadata
  const displayTags = tags || heroMeta?.tags || featureMeta?.tags || paymentMeta?.tags || ctaMeta?.tags || footerMeta?.tags || headerMeta?.tags || []

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

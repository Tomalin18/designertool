"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { sheetSections } from "@/lib/sheet-sections"
import { sheetComponentsByName } from "@/components/customize/sheets"
import { tableSections } from "@/lib/table-sections"
import { tableComponentsByName } from "@/components/customize/tables"
import { chartSections } from "@/lib/chart-sections"
import { chartComponentsByName } from "@/components/customize/charts"
import { AlertCircle, ChevronDown, AlertTriangle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { isComponentPremium } from "@/lib/component-access"

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
  const { name, href, tags, className, category } = props
  const router = useRouter()
  const [selectOpen, setSelectOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
  const { user, loading } = useAuth()

  // 付費用戶判斷：預設檢查幾個常見欄位,未來若有明確欄位(例如 user.user_metadata.plan === 'pro'),可以在這裡統一調整
  const isPaidUser =
    !!user &&
    (
      // 常見布林旗標
      (user.user_metadata as any)?.is_paid === true ||
      (user.user_metadata as any)?.isPaid === true ||
      (user.user_metadata as any)?.is_pro === true ||
      // 常見方案欄位
      (user.user_metadata as any)?.plan === "pro" ||
      (user.user_metadata as any)?.plan === "paid" ||
      (user.user_metadata as any)?.tier === "pro" ||
      (user.user_metadata as any)?.tier === "paid"
    )

  let isPremiumComponent = false

  const handleProtectedClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    // 所有元件都需要登入檢查
    // 先阻止預設導航行為，再決定要不要放行
    event.preventDefault()

    // 還在載入使用者資料時，先不做任何事，避免狀態不一致
    if (loading) {
      return
    }

    // 未登入：打開登入 / 註冊 Dialog，而不是直接跳頁
    if (!user) {
      setAuthMode("login")
      setAuthDialogOpen(true)
      return
    }

    // 已登入：檢查是否需要付費
    if (isPremiumComponent && !isPaidUser) {
      // 需要付費的元件，但用戶尚未成為付費用戶：顯示升級提示 Dialog
      setUpgradeDialogOpen(true)
      return
    }

    // 通過所有檢查的情況下（已登入，且如果是付費元件則必須是付費用戶），才允許導航
    // 滾動到頂部後再跳轉
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.location.href = href
  }

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

  const sheetMeta = sheetSections.find((sheet) => sheet.name === name)
  const SheetComponent = sheetMeta ? sheetComponentsByName[sheetMeta.componentName] : null

  const tableMeta = tableSections.find((table) => table.name === name)
  const TableComponent = tableMeta ? tableComponentsByName[tableMeta.componentName] : null

  const chartMeta = chartSections.find((chart) => chart.name === name)
  const ChartComponent = chartMeta ? chartComponentsByName[chartMeta.componentName] : null

  const derivedCategory =
    category ||
    (buttonMeta ? "Button" : undefined) ||
    (cardMeta ? "Card" : undefined) ||
    (badgeMeta ? "Badge" : undefined) ||
    (inputMeta ? "Input" : undefined) ||
    (dialogMeta ? "Dialog" : undefined) ||
    (toggleMeta ? "Toggle" : undefined) ||
    (tabsMeta ? "Tabs" : undefined) ||
    (sidebarMeta ? "Sidebar" : undefined) ||
    (tabbarMeta ? "Tabbar" : undefined) ||
    (sheetMeta ? "Sheet" : undefined) ||
    (tableMeta ? "Table" : undefined) ||
    (chartMeta ? "Chart" : undefined) ||
    (heroMeta ? "Hero" : undefined) ||
    (featureMeta ? "Feature" : undefined) ||
    (paymentMeta ? "Payment" : undefined) ||
    (ctaMeta ? "CTA" : undefined) ||
    (footerMeta ? "Footer" : undefined) ||
    (headerMeta ? "Header" : undefined)

  isPremiumComponent = isComponentPremium(name, derivedCategory)

  // Debug logging - only log once per component
  if (user && typeof window !== 'undefined') {
    const logKey = `logged_${name}`
    if (!(window as any)[logKey]) {
      console.log('=== ComponentPreview Debug ===')
      console.log('User metadata (stringified):', JSON.stringify(user.user_metadata, null, 2))
      console.log('isPaidUser:', isPaidUser)
      console.log('Component name:', name)
      console.log('Component category:', derivedCategory)
      console.log('isPremiumComponent:', isPremiumComponent)
      console.log('==============================')
        ; (window as any)[logKey] = true
    }
  }

  const isSection = !!heroMeta || !!featureMeta || !!paymentMeta || !!ctaMeta || !!footerMeta || !!headerMeta || !!buttonMeta || !!cardMeta || !!badgeMeta || !!inputMeta || !!dialogMeta || !!toggleMeta || !!tabsMeta || !!sidebarMeta || !!tabbarMeta || !!sheetMeta || !!tableMeta || !!chartMeta

  // Get tags from props or from section metadata
  const displayTags = tags || heroMeta?.tags || featureMeta?.tags || paymentMeta?.tags || ctaMeta?.tags || footerMeta?.tags || headerMeta?.tags || buttonMeta?.tags || cardMeta?.tags || badgeMeta?.tags || inputMeta?.tags || dialogMeta?.tags || toggleMeta?.tags || tabsMeta?.tags || sidebarMeta?.tags || tabbarMeta?.tags || sheetMeta?.tags || tableMeta?.tags || chartMeta?.tags || []

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
      // 完全移除樣式相關 props（例如 borderRadius 等），避免被傳遞到原生 <input> 產生 React 警告
      const styleProps = [
        'borderColor',
        'textColor',
        'backgroundColor',
        'borderRadius',
        'borderWidth',
        'focusBorderColor',
        'focusRingColor',
        'errorColor',
        'successColor',
        'glowColor',
        'buttonColor',
        'currencyColor',
        'accentColor',
        'promptColor',
        'pathColor',
        'gradientFrom',
        'gradientVia',
        'gradientTo',
        'hoverBorderColor',
        'buttonHoverColor',
        'labelColor',
        'inputBgColor',
        'inputBorderColor',
        'inputTextColor',
      ]

      const defaultProps = Object.fromEntries(
        Object.entries(inputMeta.props)
          .map(([key, prop]) => [key, prop.default])
          // 不把樣式 props 傳給元件，避免透過 {...props} 進入 DOM element
          .filter(([key]) => !styleProps.includes(String(key)))
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

    if (sheetMeta && SheetComponent) {
      // Get default props for the sheet, filtering out undefined values
      const defaultProps = Object.fromEntries(
        Object.entries(sheetMeta.props)
          .map(([key, prop]) => [key, prop.default])
          .filter(([_, value]) => value !== undefined && value !== null)
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <SheetComponent {...defaultProps} />
        </div>
      )
    }

    if (tableMeta && TableComponent) {
      // Get default props for the table, filtering out undefined values
      const defaultProps = Object.fromEntries(
        Object.entries(tableMeta.props)
          .map(([key, prop]) => [key, prop.default])
          .filter(([_, value]) => value !== undefined && value !== null)
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <TableComponent {...defaultProps} />
        </div>
      )
    }

    if (chartMeta && ChartComponent) {
      // Get default props for the chart, filtering out undefined values
      const defaultProps = Object.fromEntries(
        Object.entries(chartMeta.props)
          .map(([key, prop]) => [key, prop.default])
          .filter(([_, value]) => value !== undefined && value !== null)
      )
      return (
        <div className="flex items-center justify-center p-8 w-full">
          <ChartComponent {...defaultProps} />
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
    <>
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
        <Link
          href={href}
          onClick={handleProtectedClick}
          className="block p-4 border-t bg-card group hover:bg-accent transition-colors flex-shrink-0"
        >
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
      {/* 未登入時點擊任何元件，彈出的登入 / 註冊 Dialog */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {authMode === "login" ? "Sign in to view this component" : "Create an account to view this component"}
            </DialogTitle>
          </DialogHeader>
          {authMode === "login" ? (
            <LoginForm
              onSwitchToSignup={() => setAuthMode("signup")}
              onSuccess={() => {
                // 登入成功：關閉 Dialog，並重設為 login 模式
                setAuthDialogOpen(false)
                setAuthMode("login")
              }}
            />
          ) : (
            <SignupForm
              onSwitchToLogin={() => setAuthMode("login")}
              onSuccess={() => {
                // 註冊成功：關閉 Dialog，並重設為 login 模式
                setAuthDialogOpen(false)
                setAuthMode("login")
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 已登入但非付費用戶點擊需要付費的元件，彈出的升級提示 Dialog */}
      {isPremiumComponent && (
        <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
          <DialogContent
            className="max-w-md border-0 bg-transparent p-0 shadow-none"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">Premium Access Required</DialogTitle>
            <div className="w-full max-w-sm rounded-xl border border-red-900/50 bg-neutral-900 p-6 shadow-2xl shadow-red-900/20">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-900/30 text-red-500">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Premium Access Required</h3>
                  <p className="mt-1 text-base text-neutral-400">
                    This component is only available for premium members. Please upgrade your account to unlock this feature.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  className="flex-1 rounded-lg border border-neutral-800 bg-transparent py-2.5 text-base font-medium text-white hover:bg-neutral-800"
                  onClick={() => setUpgradeDialogOpen(false)}
                >
                  Maybe Later
                </button>
                <button
                  className="flex-1 rounded-lg bg-red-600 py-2.5 text-base font-bold text-white hover:bg-red-500"
                  onClick={() => {
                    setUpgradeDialogOpen(false)
                    window.scrollTo({ top: 0, behavior: 'instant' })
                    router.push('/subscribe')
                  }}
                >
                  Upgrade Account
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

"use client"

import { useState } from "react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Copy, Download, Search } from 'lucide-react'
import * as LucideIcons from "lucide-react"
import { getAllLineiconNames, filterLineicons, getLineiconSvgPath } from "@/lib/lineicons-utils"

// Icon categories with their icon names
const iconCategories = {
  HOME: ["Home", "House", "Building", "Building2", "Castle", "Church", "Warehouse", "Store", "ShoppingBag", "Hotel"],
  DASHBOARD: ["LayoutDashboard", "LayoutGrid", "LayoutList", "Gauge", "PieChart", "BarChart", "LineChart", "Activity", "TrendingUp", "Grid2x2"],
  MENU: ["Menu", "AlignLeft", "AlignCenter", "AlignRight", "AlignJustify", "MoreHorizontal", "MoreVertical", "List", "GripHorizontal", "GripVertical"],
  "LOGIN LOGOUT": ["LogIn", "LogOut", "ArrowLeft", "ArrowRight", "DoorOpen", "DoorClosed", "Key", "KeyRound", "Lock", "Unlock", "User", "UserPlus"],
  NAVIGATION: ["ChevronLeft", "ChevronRight", "ChevronUp", "ChevronDown", "ArrowUp", "ArrowDown", "ChevronsLeft", "ChevronsRight", "MoveLeft", "MoveRight"],
  MEDIA: ["Play", "Pause", "Music", "Video", "Camera", "Film", "Image", "Volume2", "Mic", "Headphones"],
  COMMUNICATION: ["Mail", "MessageSquare", "Phone", "Bell", "Send", "Inbox", "Users", "UserCircle", "AtSign", "Hash"],
  FILES: ["File", "FileText", "Folder", "FolderOpen", "Upload", "Download", "Save", "Archive", "Paperclip", "Link"],
}

type IconSource = "lucide" | "lineicons" | "all"

export default function IconsPage() {
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string
    category: string
    source: IconSource
  } | null>(null)
  const [exportSettings, setExportSettings] = useState({
    fileType: "SVG",
    size: 48,
    stroke: 1,
    padding: 0,
  })
  const [copied, setCopied] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [iconSource, setIconSource] = useState<IconSource>("all")
  
  const allLineicons = getAllLineiconNames()
  const filteredLineicons = searchQuery 
    ? filterLineicons(searchQuery)
    : allLineicons.slice(0, 100) // 預設顯示前 100 個

  const handleIconSelect = (iconName: string, category: string, source: IconSource = "lucide") => {
    setSelectedIcon({ name: iconName, category, source })
    setIsSheetOpen(true)
  }

  const handleCopy = async () => {
    if (!selectedIcon) return
    if (selectedIcon.source === "lucide" && !SelectedIconComponent) return
    
    try {
      if (selectedIcon.source === "lineicons") {
        // For Lineicons, fetch and copy the actual SVG content
        const svgPath = getLineiconSvgPath(selectedIcon.name)
        
        try {
          const response = await fetch(svgPath)
          let svgContent = await response.text()
          
          // 解析 SVG 並調整大小
          const parser = new DOMParser()
          const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
          const svgElement = svgDoc.querySelector('svg')
          
          if (svgElement) {
            // 設置新的尺寸
            svgElement.setAttribute('width', exportSettings.size.toString())
            svgElement.setAttribute('height', exportSettings.size.toString())
            
            // 根據檔案類型處理顏色
            if (exportSettings.fileType === "PNG") {
              // PNG 格式：保持原始顏色或設置為黑色（確保可見）
              const paths = svgElement.querySelectorAll('path')
              paths.forEach(path => {
                const fill = path.getAttribute('fill')
                if (fill && fill !== 'none') {
                  // 保持原始顏色，如果是 currentColor 或沒有顏色，設置為黑色
                  if (fill === 'currentColor' || !fill) {
                    path.setAttribute('fill', '#000000')
                  }
                }
              })
            } else {
              // SVG/JSX 格式：改為 currentColor 以便適應主題
              const paths = svgElement.querySelectorAll('path')
              paths.forEach(path => {
                const fill = path.getAttribute('fill')
                if (fill && fill !== 'none') {
                  path.setAttribute('fill', 'currentColor')
                }
              })
            }
            
            // 獲取更新後的 SVG 內容
            svgContent = new XMLSerializer().serializeToString(svgElement)
          }
          
          // 根據檔案類型複製
          if (exportSettings.fileType === "SVG") {
            await navigator.clipboard.writeText(svgContent)
          } else if (exportSettings.fileType === "PNG") {
            // 轉換為 PNG
            const img = new Image()
            const blob = new Blob([svgContent], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)
            
            img.onload = async () => {
              const canvas = document.createElement('canvas')
              canvas.width = exportSettings.size + (exportSettings.padding * 2)
              canvas.height = exportSettings.size + (exportSettings.padding * 2)
              const ctx = canvas.getContext('2d')
              
              if (ctx) {
                // 填充白色背景（確保 PNG 有背景）
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                
                // 繪製 SVG
                ctx.drawImage(img, exportSettings.padding, exportSettings.padding, exportSettings.size, exportSettings.size)
                
                canvas.toBlob(async (blob) => {
                  if (blob) {
                    try {
                      await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                      ])
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    } catch (err) {
                      console.error('Failed to copy PNG:', err)
                      // Fallback: copy as SVG
                      await navigator.clipboard.writeText(svgContent)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }
                  }
                  URL.revokeObjectURL(url)
                }, 'image/png')
              }
            }
            
            img.onerror = () => {
              console.error('Failed to load SVG image')
              URL.revokeObjectURL(url)
            }
            
            img.src = url
            return
          } else {
            // JSX 格式
            const jsxCode = `import React from 'react';\n\nexport const ${selectedIcon.name.replace(/^lni-/, '').replace(/-/g, '')} = () => (\n  ${svgContent.replace(/<svg/, '<svg className="w-6 h-6"').replace(/>/g, ' />')}\n);`
            await navigator.clipboard.writeText(jsxCode)
          }
          
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error('Failed to fetch SVG:', err)
          // Fallback: copy path
          await navigator.clipboard.writeText(`<img src="${svgPath}" alt="${selectedIcon.name}" />`)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
        return
      }

      // For Lucide icons, extract actual SVG from the component
      if (SelectedIconComponent) {
        // 創建臨時容器來渲染圖標
        const tempContainer = document.createElement('div')
        tempContainer.style.position = 'absolute'
        tempContainer.style.left = '-9999px'
        tempContainer.style.width = `${exportSettings.size}px`
        tempContainer.style.height = `${exportSettings.size}px`
        document.body.appendChild(tempContainer)
        
        // 使用 React 渲染圖標
        const root = ReactDOM.createRoot(tempContainer)
        root.render(
          React.createElement(SelectedIconComponent, {
            size: exportSettings.size,
            strokeWidth: exportSettings.stroke,
            color: exportSettings.fileType === "PNG" ? "#000000" : "currentColor"
          })
        )
        
        // 等待渲染完成
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // 提取 SVG 元素
        const svgElement = tempContainer.querySelector('svg')
        
        if (svgElement) {
          // 克隆 SVG 以便修改
          const svgClone = svgElement.cloneNode(true) as SVGElement
          
          // 設置尺寸和 viewBox
          svgClone.setAttribute('width', exportSettings.size.toString())
          svgClone.setAttribute('height', exportSettings.size.toString())
          
          // 根據檔案類型處理顏色
          if (exportSettings.fileType === "PNG") {
            // PNG 格式：確保有明確的顏色
            const paths = svgClone.querySelectorAll('path, line, circle, rect, polygon, polyline')
            paths.forEach((el) => {
              const stroke = el.getAttribute('stroke')
              if (stroke === 'currentColor' || !stroke) {
                el.setAttribute('stroke', '#000000')
              }
              const fill = el.getAttribute('fill')
              if (fill === 'currentColor' || (fill && fill !== 'none')) {
                el.setAttribute('fill', fill === 'currentColor' ? '#000000' : fill)
              }
            })
          }
          
          // 序列化 SVG
          const serializer = new XMLSerializer()
          let svgContent = serializer.serializeToString(svgClone)
          
          // 添加 padding（如果需要）
          if (exportSettings.padding > 0) {
            const paddedSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" width="${exportSettings.size + (exportSettings.padding * 2)}" height="${exportSettings.size + (exportSettings.padding * 2)}" viewBox="0 0 ${exportSettings.size + (exportSettings.padding * 2)} ${exportSettings.size + (exportSettings.padding * 2)}">
                <g transform="translate(${exportSettings.padding}, ${exportSettings.padding})">
                  ${svgContent.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
                </g>
              </svg>
            `
            svgContent = paddedSvg
          }
          
          // 根據檔案類型複製
          if (exportSettings.fileType === "SVG") {
            await navigator.clipboard.writeText(svgContent)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } else if (exportSettings.fileType === "PNG") {
            // 轉換為 PNG
            const img = new Image()
            const blob = new Blob([svgContent], { type: 'image/svg+xml' })
            const url = URL.createObjectURL(blob)
            
            img.onload = async () => {
              const canvas = document.createElement('canvas')
              const finalSize = exportSettings.size + (exportSettings.padding * 2)
              canvas.width = finalSize
              canvas.height = finalSize
              const ctx = canvas.getContext('2d')
              
              if (ctx) {
                // 填充白色背景
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                
                // 繪製 SVG
                ctx.drawImage(img, 0, 0)
                
                canvas.toBlob(async (blob) => {
                  if (blob) {
                    try {
                      await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                      ])
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    } catch (err) {
                      console.error('Failed to copy PNG:', err)
                      // Fallback: copy as SVG
                      await navigator.clipboard.writeText(svgContent)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }
                  }
                  URL.revokeObjectURL(url)
                }, 'image/png')
              }
            }
            
            img.onerror = () => {
              console.error('Failed to load SVG image')
              URL.revokeObjectURL(url)
            }
            
            img.src = url
          } else {
            // JSX 格式
            const iconName = selectedIcon.name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
            const jsxCode = `import { ${selectedIcon.name} } from 'lucide-react';\n\nexport const Icon = () => <${selectedIcon.name} size={${exportSettings.size}} strokeWidth={${exportSettings.stroke}} />;`
            await navigator.clipboard.writeText(jsxCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }
          
          // 清理
          root.unmount()
          document.body.removeChild(tempContainer)
          return
        }
        
        // 如果提取失敗，清理並使用 fallback
        root.unmount()
        document.body.removeChild(tempContainer)
      }
      
      // Fallback: 使用 canvas 方法
      const canvas = document.createElement('canvas')
      const size = exportSettings.size + (exportSettings.padding * 2)
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return

      // 創建簡單的 SVG（fallback）
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${exportSettings.fileType === "PNG" ? "#000000" : "currentColor"}" stroke-width="${exportSettings.stroke}" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      `
      
      // Convert SVG to blob
      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      
      // Load image and draw to canvas
      const img = new Image()
      img.onload = async () => {
        if (ctx) {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, exportSettings.padding, exportSettings.padding, exportSettings.size, exportSettings.size)
        }
        
        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ])
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            } catch (err) {
              console.error('Failed to copy image:', err)
              // Fallback: copy as SVG text
              await navigator.clipboard.writeText(svg)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }
          }
        }, 'image/png')
        
        URL.revokeObjectURL(url)
      }
      
      img.src = url
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    if (!selectedIcon) return
    // Mock download functionality
    alert(`Downloading ${selectedIcon.name} as ${exportSettings.fileType}`)
  }

  const SelectedIconComponent = selectedIcon && selectedIcon.source === "lucide"
    ? (LucideIcons[selectedIcon.name as keyof typeof LucideIcons] as any)
    : null

  // Helper function to generate SVG path from icon component
  const generateIconSVGPath = (iconName: string, size: number, stroke: number) => {
    // This is a simplified version - in reality, we'd need to extract the actual SVG path
    // For now, we'll create a temporary div to render the icon and extract its SVG
    const tempDiv = document.createElement('div')
    tempDiv.style.display = 'none'
    document.body.appendChild(tempDiv)
    
    const IconComp = LucideIcons[iconName as keyof typeof LucideIcons] as any
    if (IconComp) {
      // Render React component to get SVG - this is a workaround
      // In production, you'd want a more robust solution
      return `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="${stroke}" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="scale(${size/24})"/>`
    }
    
    document.body.removeChild(tempDiv)
    return ''
  }

  const filteredCategories = Object.entries(iconCategories).reduce((acc, [category, icons]) => {
    // Filter by selected category
    if (selectedCategory && category !== selectedCategory) {
      return acc
    }
    
    // Filter by search query
    const filteredIcons = icons.filter(iconName => 
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    if (filteredIcons.length > 0) {
      acc[category] = filteredIcons
    }
    
    return acc
  }, {} as Record<string, string[]>)

  const totalIconCount = Object.values(iconCategories).flat().length
  const filteredIconCount = Object.values(filteredCategories).flat().length

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <aside className="w-64 border-r bg-card overflow-y-auto flex-shrink-0">
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Icon Source Filter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
              Icon Source
            </h3>
            <div className="space-y-1">
              {(["all", "lucide", "lineicons"] as IconSource[]).map((source) => (
                <button
                  key={source}
                  onClick={() => setIconSource(source)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    iconSource === source
                      ? "bg-accent font-medium"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{source === "all" ? "All Icons" : source}</span>
                    <Badge variant="secondary" className="text-xs">
                      {source === "all" 
                        ? totalIconCount + allLineicons.length
                        : source === "lucide"
                        ? totalIconCount
                        : allLineicons.length
                      }
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          {iconSource !== "lineicons" && (
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-1">
                {/* All Categories Option */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === null
                      ? "bg-accent font-medium"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Icons</span>
                    <Badge variant="secondary" className="text-xs">
                      {totalIconCount}
                    </Badge>
                  </div>
                </button>

                {/* Individual Categories */}
                {Object.entries(iconCategories).map(([category, icons]) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-accent font-medium"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {icons.length}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Icon Count */}
          <div className="pt-4 border-t text-sm text-muted-foreground">
            {iconSource === "all" && (
              <div>
                <div>Lucide: {filteredIconCount} of {totalIconCount}</div>
                <div>Lineicons: {filteredLineicons.length} of {allLineicons.length}</div>
              </div>
            )}
            {iconSource === "lucide" && (
              <div>Showing {filteredIconCount} of {totalIconCount} icons</div>
            )}
            {iconSource === "lineicons" && (
              <div>Showing {filteredLineicons.length} of {allLineicons.length} icons</div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content - Icon Categories */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* Lucide Icons */}
        {(iconSource === "all" || iconSource === "lucide") && (
          <>
            {Object.keys(filteredCategories).length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-muted-foreground">No Lucide icons found matching your search.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold">Lucide Icons</h2>
                  <Badge variant="secondary">Lucide</Badge>
                </div>
                {Object.entries(filteredCategories).map(([category, icons]) => (
                  <div key={category}>
                    {/* Category Title */}
                    <h2 className="text-sm font-semibold text-foreground/60 mb-4 uppercase tracking-wider">
                      {category}
                    </h2>

                    {/* Horizontal Scrollable Icons */}
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
                      {icons.map((iconName) => {
                        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as any
                        const isSelected = selectedIcon?.name === iconName && selectedIcon?.source === "lucide"
                        
                        return (
                          <button
                            key={iconName}
                            onClick={() => handleIconSelect(iconName, category, "lucide")}
                            className={`flex-shrink-0 w-24 h-24 rounded-lg border-2 flex items-center justify-center transition-all hover:border-foreground/30 hover:bg-accent ${
                              isSelected
                                ? "border-foreground bg-accent"
                                : "border-border bg-card"
                            }`}
                          >
                            <IconComponent className="h-10 w-10" strokeWidth={1.5} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Lineicons */}
        {(iconSource === "all" || iconSource === "lineicons") && (
          <div className={iconSource === "all" ? "mt-12 space-y-12" : "space-y-12"}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Lineicons</h2>
              <Badge variant="secondary">Lineicons</Badge>
            </div>
            
            {filteredLineicons.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-muted-foreground">No Lineicons found matching your search.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {filteredLineicons.map((iconName) => {
                  const isSelected = selectedIcon?.name === iconName && selectedIcon?.source === "lineicons"
                  const svgPath = getLineiconSvgPath(iconName)
                  
                  return (
                    <button
                      key={iconName}
                      onClick={() => handleIconSelect(iconName, "Lineicons", "lineicons")}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg border-2 flex items-center justify-center transition-all hover:border-foreground/30 hover:bg-accent ${
                        isSelected
                          ? "border-foreground bg-accent"
                          : "border-border bg-card"
                      }`}
                    >
                      <img
                        src={svgPath}
                        alt={iconName}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-96 sm:max-w-96 flex flex-col p-0">
          {selectedIcon && (
            <>
              {/* Icon Preview */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <SheetTitle>{selectedIcon.name}</SheetTitle>
                </div>

                <div className="bg-background rounded-lg p-8 flex items-center justify-center mb-4">
                  {selectedIcon.source === "lucide" && SelectedIconComponent && (
                    <SelectedIconComponent
                      className="h-32 w-32"
                      strokeWidth={exportSettings.stroke}
                      style={{ padding: `${exportSettings.padding}px` }}
                    />
                  )}
                  {selectedIcon.source === "lineicons" && (
                    <img
                      src={getLineiconSvgPath(selectedIcon.name)}
                      alt={selectedIcon.name}
                      width={exportSettings.size}
                      height={exportSettings.size}
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleCopy}
                    className="bg-lime-400 text-black hover:bg-lime-500"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "COPIED!" : "COPY"}
                  </Button>
                  <Button onClick={handleDownload} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    DOWNLOAD
                  </Button>
                </div>
              </div>

              {/* Export Settings */}
              <div className="flex-1 overflow-y-auto p-6">
                <h4 className="font-semibold mb-4">EXPORT SETTINGS</h4>

                {/* File Type */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">File type</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["SVG", "PNG", "JSX", "PDF"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setExportSettings({ ...exportSettings, fileType: type })}
                        className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                          exportSettings.fileType === type
                            ? "bg-foreground text-background"
                            : "bg-background hover:bg-accent"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size and Stroke */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Size</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={exportSettings.size}
                        onChange={(e) =>
                          setExportSettings({ ...exportSettings, size: Number(e.target.value) })
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">px</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Stroke</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={exportSettings.stroke}
                        onChange={(e) =>
                          setExportSettings({ ...exportSettings, stroke: Number(e.target.value) })
                        }
                        className="w-20"
                        step="0.5"
                        min="0.5"
                        max="3"
                      />
                      <span className="text-sm text-muted-foreground">px</span>
                    </div>
                  </div>
                </div>

                {/* Padding */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Padding</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={exportSettings.padding}
                      onChange={(e) =>
                        setExportSettings({ ...exportSettings, padding: Number(e.target.value) })
                      }
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">px</span>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">TAGS</label>
                    <span className="text-xs text-muted-foreground">All</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{selectedIcon.name}</Badge>
                    <Badge variant="secondary">{selectedIcon.category}</Badge>
                    <Badge variant="secondary" className="capitalize">{selectedIcon.source}</Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

import type { Frame, CanvasElement, ComponentNode, ExportFormat } from "./types"

/**
 * Convert CanvasElement to ComponentNode for code generation
 */
export function elementToNode(element: CanvasElement, allElements: CanvasElement[]): ComponentNode {
  const children = allElements
    .filter((el) => el.parentId === element.id)
    .map((el) => elementToNode(el, allElements))

  // Determine tag name based on element type
  const tagName = element.tagName || getDefaultTagName(element.type)

  // Build styles object from position and size
  const styles: Record<string, string> = {
    position: "absolute",
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    width: `${element.size.width}px`,
    height: `${element.size.height}px`,
    ...(element.styles || {}),
  }

  return {
    id: element.id,
    type: element.type,
    tagName,
    props: element.props || {},
    children,
    styles,
    className: element.className,
    textContent: element.props?.text || element.props?.children,
  }
}

/**
 * Get default HTML tag name for component type
 */
function getDefaultTagName(type: string): string {
  const tagMap: Record<string, string> = {
    button: "button",
    card: "div",
    input: "input",
    textarea: "textarea",
    select: "select",
    div: "div",
    text: "span",
    image: "img",
    link: "a",
    header: "header",
    footer: "footer",
    nav: "nav",
    section: "section",
    main: "main",
    aside: "aside",
    hero: "section",
    sidebar: "aside",
    navbar: "nav",
    cta: "section",
    alert: "div",
    badge: "span",
    avatar: "div",
    progress: "div",
    switch: "button",
    checkbox: "input",
    radio: "input",
    slider: "input",
    tabs: "div",
    accordion: "div",
  }
  return tagMap[type.toLowerCase()] || "div"
}

/**
 * Generate HTML code from component tree
 */
export function generateHTMLCode(frame: Frame, indent: number = 0): string {
  const indentStr = "  ".repeat(indent)
  const rootElements = frame.elements.filter((el) => !el.parentId)
  
  if (rootElements.length === 0) {
    return `${indentStr}<!-- Empty frame -->`
  }

  const htmlParts: string[] = []
  
  rootElements.forEach((element) => {
    htmlParts.push(generateElementHTML(element, frame.elements, indent))
  })

  return htmlParts.join("\n")
}

function generateElementHTML(
  element: CanvasElement,
  allElements: CanvasElement[],
  indent: number = 0
): string {
  const indentStr = "  ".repeat(indent)
  const node = elementToNode(element, allElements)
  const children = allElements.filter((el) => el.parentId === element.id)

  // Build attributes string
  const attrs: string[] = []
  
  if (node.className) {
    attrs.push(`class="${node.className}"`)
  }

  // Build style string
  const styleEntries = Object.entries(node.styles || {})
  if (styleEntries.length > 0) {
    const styleStr = styleEntries.map(([key, value]) => `${key}: ${value}`).join("; ")
    attrs.push(`style="${styleStr}"`)
  }

  // Add other props as data attributes or regular attributes
  Object.entries(node.props || {}).forEach(([key, value]) => {
    if (key === "children" || key === "text") return
    if (typeof value === "string" && !key.startsWith("on")) {
      attrs.push(`${key}="${value}"`)
    }
  })

  const attrsStr = attrs.length > 0 ? " " + attrs.join(" ") : ""

  // Self-closing tags
  const selfClosingTags = ["input", "img", "br", "hr"]
  if (selfClosingTags.includes(node.tagName)) {
    return `${indentStr}<${node.tagName}${attrsStr} />`
  }

  // Tags with content
  let html = `${indentStr}<${node.tagName}${attrsStr}>`

  // Add text content
  if (node.textContent && children.length === 0) {
    html += node.textContent
  }

  // Add children
  if (children.length > 0) {
    html += "\n"
    children.forEach((child) => {
      html += generateElementHTML(child, allElements, indent + 1) + "\n"
    })
    html += indentStr
  }

  html += `</${node.tagName}>`
  return html
}

/**
 * Generate React/JSX code from component tree
 */
export function generateReactCode(frame: Frame, componentName: string = "Page"): string {
  const rootElements = frame.elements.filter((el) => !el.parentId)
  
  const imports = new Set<string>()
  const componentCode: string[] = []
  
  // Generate component code
  componentCode.push(`export function ${componentName}() {`)
  componentCode.push("  return (")
  componentCode.push("    <div className=\"relative\" style={{ width: '100%', height: '100vh' }}>")

  rootElements.forEach((element) => {
    const elementCode = generateElementJSX(element, frame.elements, imports, 3)
    componentCode.push(elementCode)
  })

  componentCode.push("    </div>")
  componentCode.push("  )")
  componentCode.push("}")

  // Build imports
  const importsList = Array.from(imports).sort()
  const importsCode = importsList.length > 0 
    ? `import { ${importsList.join(", ")} } from "@/components/ui/${importsList[0].toLowerCase()}"\n`
    : ""

  return importsCode + "\n" + componentCode.join("\n")
}

function generateElementJSX(
  element: CanvasElement,
  allElements: CanvasElement[],
  imports: Set<string>,
  indent: number = 0
): string {
  const indentStr = "  ".repeat(indent)
  const node = elementToNode(element, allElements)
  const children = allElements.filter((el) => el.parentId === element.id)

  // Handle UI components (import from shadcn)
  const uiComponents = ["button", "card", "input", "textarea", "select", "badge", "avatar", "alert", "progress", "switch", "checkbox", "slider", "tabs", "accordion"]
  const isUIComponent = uiComponents.includes(node.type.toLowerCase())

  if (isUIComponent) {
    const componentName = node.type.charAt(0).toUpperCase() + node.type.slice(1)
    imports.add(componentName)
  }

  // Build props object
  const props: Record<string, any> = { ...node.props }
  
  if (node.className) {
    props.className = node.className
  }

  // Build style object
  const styleObj: Record<string, string> = { ...node.styles }
  if (Object.keys(styleObj).length > 0) {
    props.style = styleObj
  }

  // Generate props string
  const propsEntries = Object.entries(props)
    .filter(([key, value]) => {
      if (key === "children" || key === "text") return false
      return value !== undefined && value !== null
    })
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value}"`
      }
      if (typeof value === "boolean") {
        return value ? key : ""
      }
      if (typeof value === "object") {
        return `${key}={${JSON.stringify(value)}}`
      }
      return `${key}={${JSON.stringify(value)}}`
    })
    .filter(Boolean)

  const propsStr = propsEntries.length > 0 ? " " + propsEntries.join(" ") : ""

  // Use UI component or HTML tag
  const componentTag = isUIComponent 
    ? node.type.charAt(0).toUpperCase() + node.type.slice(1)
    : node.tagName

  // Self-closing tags
  const selfClosingTags = ["input", "img", "br", "hr"]
  if (selfClosingTags.includes(node.tagName) && !isUIComponent) {
    return `${indentStr}<${componentTag}${propsStr} />`
  }

  // Tags with content
  let jsx = `${indentStr}<${componentTag}${propsStr}>`

  // Add text content
  if (node.textContent && children.length === 0 && !isUIComponent) {
    jsx += node.textContent
  } else if (node.props?.children && children.length === 0) {
    jsx += node.props.children
  }

  // Add children
  if (children.length > 0) {
    jsx += "\n"
    children.forEach((child) => {
      jsx += generateElementJSX(child, allElements, imports, indent + 1) + "\n"
    })
    jsx += indentStr
  }

  jsx += `</${componentTag}>`
  return jsx
}

/**
 * Generate code in specified format
 */
export function generateCode(frame: Frame, format: ExportFormat, componentName?: string): string {
  switch (format) {
    case "html":
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${frame.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body>
${generateHTMLCode(frame, 1)}
</body>
</html>`
    
    case "react":
    case "jsx":
      return generateReactCode(frame, componentName || frame.name.replace(/\s+/g, ""))
    
    default:
      return generateHTMLCode(frame)
  }
}

/**
 * Get all unique component types used in frame
 */
export function getUsedComponents(frame: Frame): string[] {
  const types = new Set<string>()
  frame.elements.forEach((el) => {
    types.add(el.type)
  })
  return Array.from(types).sort()
}


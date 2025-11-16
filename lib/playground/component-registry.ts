// Component registry for playground
// Maps component IDs to their React components and default props

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

export interface ComponentDefinition {
  id: string
  name: string
  category: string
  defaultProps: Record<string, any>
  defaultSize: { width: number; height: number }
  tagName?: string // HTML tag name for code generation
  isContainer?: boolean // Whether this component can contain children
}

export const componentRegistry: Record<string, ComponentDefinition> = {
  button: {
    id: "button",
    name: "Button",
    category: "Form",
    defaultProps: { children: "Button" },
    defaultSize: { width: 120, height: 40 },
    tagName: "button",
    isContainer: true,
  },
  card: {
    id: "card",
    name: "Card",
    category: "Layout",
    defaultProps: { children: "Card Content" },
    defaultSize: { width: 300, height: 200 },
    tagName: "div",
    isContainer: true,
  },
  input: {
    id: "input",
    name: "Input",
    category: "Form",
    defaultProps: { placeholder: "Input" },
    defaultSize: { width: 200, height: 40 },
    tagName: "input",
    isContainer: false,
  },
  badge: {
    id: "badge",
    name: "Badge",
    category: "Display",
    defaultProps: { children: "Badge" },
    defaultSize: { width: 60, height: 24 },
  },
  avatar: {
    id: "avatar",
    name: "Avatar",
    category: "Display",
    defaultProps: { fallback: "AV" },
    defaultSize: { width: 40, height: 40 },
  },
  alert: {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    defaultProps: { title: "Alert", description: "Alert description" },
    defaultSize: { width: 400, height: 80 },
  },
  progress: {
    id: "progress",
    name: "Progress",
    category: "Feedback",
    defaultProps: { value: 50 },
    defaultSize: { width: 300, height: 8 },
  },
  switch: {
    id: "switch",
    name: "Switch",
    category: "Form",
    defaultProps: { checked: false },
    defaultSize: { width: 44, height: 24 },
  },
  checkbox: {
    id: "checkbox",
    name: "Checkbox",
    category: "Form",
    defaultProps: { checked: false },
    defaultSize: { width: 20, height: 20 },
  },
  textarea: {
    id: "textarea",
    name: "Textarea",
    category: "Form",
    defaultProps: { placeholder: "Textarea" },
    defaultSize: { width: 300, height: 100 },
    tagName: "textarea",
    isContainer: false,
  },
  slider: {
    id: "slider",
    name: "Slider",
    category: "Form",
    defaultProps: { value: [50] },
    defaultSize: { width: 300, height: 20 },
  },
  text: {
    id: "text",
    name: "Text",
    category: "Element",
    defaultProps: { text: "Text", color: "currentColor" },
    defaultSize: { width: 200, height: 24 },
    tagName: "span",
    isContainer: false,
  },
  div: {
    id: "div",
    name: "Div",
    category: "Element",
    defaultProps: { children: "Div" },
    defaultSize: { width: 200, height: 100 },
    tagName: "div",
    isContainer: true,
  },
  // Sections
  header: {
    id: "header",
    name: "Header",
    category: "Section",
    defaultProps: { children: "Header Section" },
    defaultSize: { width: 1440, height: 80 },
    tagName: "header",
    isContainer: true,
  },
  hero: {
    id: "hero",
    name: "Hero",
    category: "Section",
    defaultProps: { children: "Hero Section" },
    defaultSize: { width: 1440, height: 600 },
    tagName: "section",
    isContainer: true,
  },
  footer: {
    id: "footer",
    name: "Footer",
    category: "Section",
    defaultProps: { children: "Footer Section" },
    defaultSize: { width: 1440, height: 200 },
    tagName: "footer",
    isContainer: true,
  },
  sidebar: {
    id: "sidebar",
    name: "Sidebar",
    category: "Section",
    defaultProps: { children: "Sidebar" },
    defaultSize: { width: 250, height: 800 },
    tagName: "aside",
    isContainer: true,
  },
  navbar: {
    id: "navbar",
    name: "Navbar",
    category: "Section",
    defaultProps: { children: "Navbar" },
    defaultSize: { width: 1440, height: 60 },
    tagName: "nav",
    isContainer: true,
  },
  cta: {
    id: "cta",
    name: "CTA",
    category: "Section",
    defaultProps: { children: "Call to Action" },
    defaultSize: { width: 1440, height: 300 },
    tagName: "section",
    isContainer: true,
  },
  feature1: {
    id: "feature1",
    name: "Feature 1",
    category: "Section",
    defaultProps: { children: "Feature Section" },
    defaultSize: { width: 1440, height: 600 },
    tagName: "section",
    isContainer: true,
  },
  section: {
    id: "section",
    name: "Section",
    category: "Section",
    defaultProps: { children: "Section" },
    defaultSize: { width: 1440, height: 400 },
    tagName: "section",
    isContainer: true,
  },
  image: {
    id: "image",
    name: "Image",
    category: "Element",
    defaultProps: { 
      src: "https://via.placeholder.com/400x300",
      alt: "Image"
    },
    defaultSize: { width: 400, height: 300 },
    tagName: "img",
    isContainer: false,
  },
}

export function getComponentDefinition(id: string): ComponentDefinition | undefined {
  return componentRegistry[id]
}

export function getAllComponents(): ComponentDefinition[] {
  return Object.values(componentRegistry)
}

export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return Object.values(componentRegistry).filter((comp) => comp.category === category)
}


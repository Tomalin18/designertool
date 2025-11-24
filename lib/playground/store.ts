"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"
import type { Frame, CanvasElement, PlaygroundState, SelectionBox } from "./types"

interface PlaygroundContextType {
  state: PlaygroundState
  addFrame: (frame: Omit<Frame, "id" | "createdAt">) => void
  updateFrame: (frameId: string, updates: Partial<Frame>) => void
  deleteFrame: (frameId: string) => void
  clearFrame: (frameId: string) => void
  selectFrame: (frameId: string | null) => void
  addElement: (frameId: string, element: Omit<CanvasElement, "id">) => void
  addSectionTemplate: (frameId: string, elements: Omit<CanvasElement, "id">[], offsetY?: number) => void
  updateElement: (frameId: string, elementId: string, updates: Partial<CanvasElement>) => void
  deleteElement: (frameId: string, elementId: string) => void
  deleteElements: (frameId: string, elementIds: string[]) => void
  selectElement: (elementId: string | null) => void
  selectElements: (elementIds: string[]) => void
  clearSelection: () => void
  setSelectionBox: (box: SelectionBox | null) => void
  moveElements: (frameId: string, elementIds: string[], deltaX: number, deltaY: number) => void
  setZoom: (zoom: number) => void
  getSelectedFrame: () => Frame | null
  getSelectedElement: () => CanvasElement | null
  getSelectedElements: () => CanvasElement[]
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined)

const initialState: PlaygroundState = {
  frames: [],
  selectedFrameId: null,
  selectedElementId: null,
  selectedElementIds: [],
  selectionBox: null,
  zoom: 1,
}

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlaygroundState>(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("playground-state")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          // Ensure backward compatibility with old state structure
          return {
            ...initialState,
            ...parsed,
            selectedElementIds: parsed.selectedElementIds || [],
            selectionBox: parsed.selectionBox || null,
          }
        } catch {
          return initialState
        }
      }
    }
    return initialState
  })

  // Save to localStorage whenever state changes
  const updateState = useCallback((newState: PlaygroundState) => {
    setState(newState)
    if (typeof window !== "undefined") {
      localStorage.setItem("playground-state", JSON.stringify(newState))
    }
  }, [])

  const addFrame = useCallback(
    (frameData: Omit<Frame, "id" | "createdAt">) => {
      const newFrame: Frame = {
        ...frameData,
        id: `frame-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
      }
      updateState({
        ...state,
        frames: [...state.frames, newFrame],
        selectedFrameId: newFrame.id,
      })
    },
    [state, updateState]
  )

  const updateFrame = useCallback(
    (frameId: string, updates: Partial<Frame>) => {
      updateState({
        ...state,
        frames: state.frames.map((frame) => (frame.id === frameId ? { ...frame, ...updates } : frame)),
      })
    },
    [state, updateState]
  )

  const deleteFrame = useCallback(
    (frameId: string) => {
      const newFrames = state.frames.filter((frame) => frame.id !== frameId)
      updateState({
        ...state,
        frames: newFrames,
        selectedFrameId: newFrames.length > 0 ? newFrames[0].id : null,
        selectedElementId: null,
      })
    },
    [state, updateState]
  )

  const clearFrame = useCallback(
    (frameId: string) => {
      updateState({
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === frameId ? { ...frame, elements: [] } : frame
        ),
        selectedElementId: null,
        selectedElementIds: [],
        selectionBox: null,
      })
    },
    [state, updateState]
  )

  const selectFrame = useCallback(
    (frameId: string | null) => {
      updateState({
        ...state,
        selectedFrameId: frameId,
        selectedElementId: null,
      })
    },
    [state, updateState]
  )

  const addElement = useCallback(
    (frameId: string, elementData: Omit<CanvasElement, "id">) => {
      const newElement: CanvasElement = {
        ...elementData,
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        // Ensure tagName is set from component registry if not provided
        tagName: elementData.tagName || undefined,
        parentId: elementData.parentId || null,
      }
      updateState({
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === frameId
            ? { ...frame, elements: [...frame.elements, newElement] }
            : frame
        ),
      })
    },
    [state, updateState]
  )

  const addSectionTemplate = useCallback(
    (frameId: string, elements: Omit<CanvasElement, "id">[], offsetY: number = 0) => {
      const timestamp = Date.now()
      
      // First, create all elements with IDs
      const newElements: CanvasElement[] = elements.map((elementData, index) => ({
        ...elementData,
        id: `element-${timestamp}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        position: {
          ...elementData.position,
          y: elementData.position.y + offsetY,
        },
        // Ensure tagName is set from component registry if not provided
        tagName: elementData.tagName || undefined,
        parentId: elementData.parentId || null,
      }))
      
      // Find the root container (first element with parentId === null)
      const rootElement = newElements.find((el) => !el.parentId)
      const rootElementId = rootElement?.id
      
      // Update parentId references - replace special markers with actual IDs
      const containerMap: Record<string, string> = {}
      
      // First pass: map root containers
      newElements.forEach((el) => {
        if (!el.parentId) {
          if (el.type === "header") {
            containerMap["__HEADER_PARENT__"] = el.id
          } else if (el.type === "section") {
            containerMap["__FEATURE1_SECTION__"] = el.id
          }
        }
      })
      
      // Second pass: resolve nested containers by matching className patterns
      // We need to do this in order since containers are nested
      newElements.forEach((el) => {
        if (el.parentId && typeof el.parentId === "string" && el.parentId.startsWith("__")) {
          const parentId = containerMap[el.parentId]
          if (parentId) {
            // This element's parent has been resolved, so we can map this element
            if (el.className?.includes("container") && !el.className.includes("grid")) {
              containerMap["__FEATURE1_CONTAINER__"] = el.id
            } else if (el.className?.includes("grid")) {
              containerMap["__FEATURE1_GRID__"] = el.id
            } else if (el.className?.includes("flex flex-col") && el.className.includes("items-center")) {
              containerMap["__FEATURE1_LEFT__"] = el.id
            } else if (el.className?.includes("flex w-full")) {
              containerMap["__FEATURE1_BUTTONS__"] = el.id
            }
          }
        }
      })
      
      // Third pass: update all elements with resolved parentIds
      const updatedElements = newElements.map((element) => {
        if (element.parentId && typeof element.parentId === "string" && element.parentId.startsWith("__")) {
          const resolvedId = containerMap[element.parentId]
          if (resolvedId) {
            return { ...element, parentId: resolvedId }
          }
        }
        return element
      })
      
      updateState({
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === frameId
            ? { ...frame, elements: [...frame.elements, ...updatedElements] }
            : frame
        ),
      })
    },
    [state, updateState]
  )

  const updateElement = useCallback(
    (frameId: string, elementId: string, updates: Partial<CanvasElement>) => {
      updateState({
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === frameId
            ? {
                ...frame,
                elements: frame.elements.map((element) =>
                  element.id === elementId ? { ...element, ...updates } : element
                ),
              }
            : frame
        ),
      })
    },
    [state, updateState]
  )

  const deleteElement = useCallback(
    (frameId: string, elementId: string) => {
      updateState({
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === frameId
            ? { ...frame, elements: frame.elements.filter((element) => element.id !== elementId) }
            : frame
        ),
        selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
        selectedElementIds: state.selectedElementIds.filter((id) => id !== elementId),
      })
    },
    [state, updateState]
  )

  const deleteElements = useCallback(
    (frameId: string, elementIds: string[]) => {
      updateState({
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === frameId
            ? { ...frame, elements: frame.elements.filter((element) => !elementIds.includes(element.id)) }
            : frame
        ),
        selectedElementId: state.selectedElementId && elementIds.includes(state.selectedElementId) ? null : state.selectedElementId,
        selectedElementIds: state.selectedElementIds.filter((id) => !elementIds.includes(id)),
      })
    },
    [state, updateState]
  )

  const selectElement = useCallback(
    (elementId: string | null) => {
      updateState({
        ...state,
        selectedElementId: elementId,
        selectedElementIds: elementId ? [elementId] : [],
      })
    },
    [state, updateState]
  )

  const selectElements = useCallback(
    (elementIds: string[]) => {
      updateState({
        ...state,
        selectedElementId: elementIds.length === 1 ? elementIds[0] : null,
        selectedElementIds: elementIds,
      })
    },
    [state, updateState]
  )

  const clearSelection = useCallback(() => {
    updateState({
      ...state,
      selectedElementId: null,
      selectedElementIds: [],
      selectionBox: null,
    })
  }, [state, updateState])

  const setSelectionBox = useCallback(
    (box: SelectionBox | null) => {
      updateState({
        ...state,
        selectionBox: box,
      })
    },
    [state, updateState]
  )

  const moveElements = useCallback(
    (frameId: string, elementIds: string[], deltaX: number, deltaY: number) => {
      const frame = state.frames.find((f) => f.id === frameId)
      if (!frame) return

      updateState({
        ...state,
        frames: state.frames.map((frame) =>
          frame.id === frameId
            ? {
                ...frame,
                elements: frame.elements.map((element) => {
                  if (!elementIds.includes(element.id)) return element

                  // Calculate new position
                  const newX = element.position.x + deltaX
                  const newY = element.position.y + deltaY

                  // Constrain within frame boundaries
                  const constrainedX = Math.max(0, Math.min(newX, frame.width - element.size.width))
                  const constrainedY = Math.max(0, Math.min(newY, frame.height - element.size.height))

                  return {
                    ...element,
                    position: {
                      x: constrainedX,
                      y: constrainedY,
                    },
                  }
                }),
              }
            : frame
        ),
      })
    },
    [state, updateState]
  )

  const setZoom = useCallback(
    (zoom: number) => {
      updateState({
        ...state,
        zoom: Math.max(0.25, Math.min(2, zoom)), // Clamp between 0.25x and 2x
      })
    },
    [state, updateState]
  )

  const getSelectedFrame = useCallback(() => {
    return state.frames.find((frame) => frame.id === state.selectedFrameId) || null
  }, [state])

  const getSelectedElement = useCallback(() => {
    const frame = getSelectedFrame()
    if (!frame) return null
    return frame.elements.find((element) => element.id === state.selectedElementId) || null
  }, [state, getSelectedFrame])

  const getSelectedElements = useCallback(() => {
    const frame = getSelectedFrame()
    if (!frame) return []
    return frame.elements.filter((element) => state.selectedElementIds.includes(element.id))
  }, [state, getSelectedFrame])

  const contextValue = {
    state,
    addFrame,
    updateFrame,
    deleteFrame,
    clearFrame,
    selectFrame,
    addElement,
    addSectionTemplate,
    updateElement,
    deleteElement,
    deleteElements,
    selectElement,
    selectElements,
    clearSelection,
    setSelectionBox,
    moveElements,
    setZoom,
    getSelectedFrame,
    getSelectedElement,
    getSelectedElements,
  }

  return React.createElement(
    PlaygroundContext.Provider,
    { value: contextValue },
    children
  )
}

export function usePlayground() {
  const context = useContext(PlaygroundContext)
  if (context === undefined) {
    throw new Error("usePlayground must be used within a PlaygroundProvider")
  }
  return context
}


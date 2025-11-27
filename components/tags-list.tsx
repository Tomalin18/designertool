"use client"

import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TagsListProps {
  tags: string[]
  defaultVisible?: number
}

export function TagsList({ tags, defaultVisible = 10 }: TagsListProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleTags = isExpanded ? tags : tags.slice(0, defaultVisible)
  const hasMore = tags.length > defaultVisible

  if (tags.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 items-center">
        {visibleTags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                收起
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                展開 ({tags.length - defaultVisible} 個)
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}


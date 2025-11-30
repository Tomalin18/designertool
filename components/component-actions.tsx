'use client'

import * as React from 'react'
import { Heart, Share2, Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface ComponentActionsProps {
    componentSlug: string
    componentName: string
    componentCategory?: string
    className?: string
}

export function ComponentActions({
    componentSlug,
    componentName,
    componentCategory,
    className,
}: ComponentActionsProps) {
    const [isFavorited, setIsFavorited] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [copied, setCopied] = React.useState(false)
    const [userId, setUserId] = React.useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    // Check if component is favorited
    React.useEffect(() => {
        async function checkFavorite() {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (!user) {
                setUserId(null)
                return
            }

            setUserId(user.id)

            const { data } = await supabase
                .from('component_favorites')
                .select('id')
                .eq('user_id', user.id)
                .eq('component_slug', componentSlug)
                .single()

            setIsFavorited(!!data)
        }

        checkFavorite()
    }, [componentSlug, supabase])

    const handleFavorite = async () => {
        if (!userId) {
            // Redirect to login
            router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname))
            return
        }

        setIsLoading(true)

        try {
            if (isFavorited) {
                // Remove favorite
                await supabase
                    .from('component_favorites')
                    .delete()
                    .eq('user_id', userId)
                    .eq('component_slug', componentSlug)

                setIsFavorited(false)
            } else {
                // Add favorite
                const { error } = await supabase.from('component_favorites').insert({
                    user_id: userId,
                    component_slug: componentSlug,
                    component_name: componentName,
                    component_category: componentCategory,
                } as any)

                if (error) throw error

                setIsFavorited(true)
            }
        } catch (error) {
            console.error('Error toggling favorite:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const trackShare = async (platform: string) => {
        try {
            await supabase.from('component_shares').insert({
                component_slug: componentSlug,
                platform,
                user_id: userId,
            } as any)
        } catch (error) {
            console.error('Error tracking share:', error)
        }
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = `Check out this ${componentName} component!`

    const handleShare = async (platform: string) => {
        await trackShare(platform)

        const encodedUrl = encodeURIComponent(shareUrl)
        const encodedText = encodeURIComponent(shareText)

        let url = ''

        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
                break
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
                break
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
                break
            case 'copy':
                try {
                    await navigator.clipboard.writeText(shareUrl)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                } catch (error) {
                    console.error('Error copying to clipboard:', error)
                }
                return
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
        }
    }

    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Button
                variant={isFavorited ? 'default' : 'outline'}
                size="sm"
                onClick={handleFavorite}
                disabled={isLoading}
                className={cn(
                    'gap-2 transition-all',
                    isFavorited && 'bg-red-500 hover:bg-red-600 text-white'
                )}
            >
                <Heart
                    className={cn('h-4 w-4', isFavorited && 'fill-current')}
                />
                {isFavorited ? 'Favorited' : 'Favorite'}
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleShare('twitter')}>
                        <Twitter className="h-4 w-4 mr-2" />
                        Share on Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('facebook')}>
                        <Facebook className="h-4 w-4 mr-2" />
                        Share on Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                        <Linkedin className="h-4 w-4 mr-2" />
                        Share on LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('copy')}>
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Link2 className="h-4 w-4 mr-2" />
                                Copy Link
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

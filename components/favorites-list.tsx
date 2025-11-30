'use client'

import * as React from 'react'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ComponentPreview } from '@/components/component-preview'

interface Favorite {
    id: string
    component_slug: string
    component_name: string
    component_category: string | null
    created_at: string
}

export function FavoritesList() {
    const [favorites, setFavorites] = React.useState<Favorite[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const supabase = createClient()

    React.useEffect(() => {
        async function loadFavorites() {
            setIsLoading(true)
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (!user) {
                    setIsLoading(false)
                    return
                }

                const { data, error } = await supabase
                    .from('component_favorites')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })

                if (error) {
                    console.error('Error loading favorites:', error)
                } else {
                    setFavorites(data || [])
                }
            } catch (error) {
                console.error('Error loading favorites:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadFavorites()
    }, [supabase])

    const handleRemove = async (id: string) => {
        try {
            await supabase.from('component_favorites').delete().eq('id', id)

            setFavorites((prev) => prev.filter((fav) => fav.id !== id))
        } catch (error) {
            console.error('Error removing favorite:', error)
        }
    }

    if (isLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-6 animate-pulse">
                        <div className="aspect-video bg-muted rounded mb-4"></div>
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (favorites.length === 0) {
        return (
            <div className="border rounded-lg p-12 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">
                    Start exploring components and add them to your favorites!
                </p>
                <Button asChild>
                    <Link href="/components">Browse Components</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favorites.map((favorite) => (
                    <div key={favorite.id} className="relative group">
                        {/* Delete button overlay */}
                        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8 shadow-lg"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Remove from favorites?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will remove {favorite.component_name} from your favorites list.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleRemove(favorite.id)}>
                                            Remove
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>

                        {/* Component Preview Card */}
                        <ComponentPreview
                            name={favorite.component_name}
                            href={`/components/${favorite.component_slug}`}
                            category={favorite.component_category || undefined}
                        />

                        {/* Added date */}
                        <p className="text-xs text-muted-foreground mt-2 px-1">
                            Added {new Date(favorite.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

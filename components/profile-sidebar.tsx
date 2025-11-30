'use client'

import * as React from 'react'
import { User, Heart, Settings, LogOut, Bell, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface ProfileSidebarProps {
    className?: string
    activeTab: string
    onTabChange: (tab: string) => void
    userName?: string
    userEmail?: string
    userAvatar?: string
    isPro?: boolean
}

export function ProfileSidebar({
    className,
    activeTab,
    onTabChange,
    userName = 'User',
    userEmail,
    userAvatar,
    isPro = false,
}: ProfileSidebarProps) {
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const menuItems = [
        { id: 'account', label: 'My Profile', icon: User },
        { id: 'favorites', label: 'Saved Items', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings },
    ]

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`

    return (
        <div
            className={cn(
                'flex flex-col border-r bg-muted/30',
                className
            )}
            style={{
                width: '288px',
            }}
        >
            {/* Profile Header */}
            <div className="flex flex-col items-center pt-8 pb-6 border-b px-6">
                <div className="h-20 w-20 rounded-full border-4 border-background shadow-lg mb-4 overflow-hidden">
                    <img
                        src={userAvatar || defaultAvatar}
                        className="h-full w-full object-cover"
                        alt={userName}
                    />
                </div>
                <h3 className="font-bold text-lg">{userName}</h3>
                {userEmail && (
                    <p className="text-sm text-muted-foreground">{userEmail}</p>
                )}
                <div className="mt-4 flex gap-4 text-muted-foreground">
                    <button
                        className="hover:text-foreground transition-colors"
                        aria-label="Messages"
                    >
                        <MessageSquare size={18} />
                    </button>
                    <button
                        className="hover:text-foreground transition-colors"
                        aria-label="Notifications"
                    >
                        <Bell size={18} />
                    </button>
                    <button
                        className="hover:text-foreground transition-colors"
                        aria-label="Settings"
                        onClick={() => onTabChange('settings')}
                    >
                        <Settings size={18} />
                    </button>
                </div>
            </div>

            {/* Menu Section */}
            <div className="flex-1 p-6">
                <div className="text-xs font-bold uppercase tracking-wider mb-4 text-muted-foreground">
                    Menu
                </div>
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left',
                                    isActive
                                        ? 'bg-primary text-primary-foreground font-medium'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                            >
                                <Icon size={20} />
                                {item.label}
                            </button>
                        )
                    })}
                </nav>
            </div>

            {/* Upgrade Section */}
            <div className="p-6">
                {!isPro && (
                    <div className="rounded-xl p-4 text-center bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-4">
                        <p className="text-sm font-bold mb-2">Upgrade to Pro</p>
                        <p className="text-xs mb-3 opacity-90">
                            Get access to exclusive components and features.
                        </p>
                        <button className="w-full text-xs font-bold py-2 rounded-lg bg-background text-foreground hover:bg-background/90 transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                )}

                {/* Sign Out Button */}
                <button
                    onClick={handleSignOut}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                        !isPro && "mt-0"
                    )}
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </div>
    )
}

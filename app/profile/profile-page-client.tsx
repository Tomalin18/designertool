'use client'

import * as React from 'react'
import { User } from '@supabase/supabase-js'
import { ProfileForm } from '@/components/auth/profile-form'
import { FavoritesList } from '@/components/favorites-list'
import { ProfileSidebar } from '@/components/profile-sidebar'
import { Card } from '@/components/ui/card'

interface ProfilePageClientProps {
    user: User
}

export function ProfilePageClient({ user }: ProfilePageClientProps) {
    const [activeTab, setActiveTab] = React.useState('account')

    // Extract user metadata
    const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
    const userEmail = user.email
    const userAvatar = user.user_metadata?.avatar_url
    const isPro = user.user_metadata?.is_paid === true

    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Sidebar */}
            <ProfileSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                userName={userName}
                userEmail={userEmail}
                userAvatar={userAvatar}
                isPro={isPro}
            />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="container max-w-6xl py-10 px-8">
                    {activeTab === 'account' && (
                        <div>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Account Settings</h1>
                                <p className="text-muted-foreground">
                                    Manage your account information and preferences
                                </p>
                            </div>
                            <Card className="p-6">
                                <ProfileForm user={user} />
                            </Card>
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Saved Components</h1>
                                <p className="text-muted-foreground">
                                    Quick access to your favorite components
                                </p>
                            </div>
                            <FavoritesList />
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
                                <p className="text-muted-foreground">
                                    Configure your preferences and notifications
                                </p>
                            </div>
                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Manage how you receive notifications
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Receive updates via email
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">New Component Alerts</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Get notified when new components are added
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

"use client"

import Link from "next/link"
import { WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OfflinePage() {
    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
            <Card className="max-w-md w-full p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-muted p-6">
                        <WifiOff className="h-12 w-12 text-muted-foreground" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-3">You're Offline</h1>

                <p className="text-muted-foreground mb-6">
                    It looks like you've lost your internet connection. This page isn't available offline yet.
                </p>

                <div className="space-y-3">
                    <Button asChild className="w-full">
                        <Link href="/">Go to Home</Link>
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-6">
                    Previously visited pages may still be available offline.
                </p>
            </Card>
        </div>
    )
}

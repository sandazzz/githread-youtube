'use client' // Error boundaries must be Client Components

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useRouter, usePathname } from "next/navigation"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Dialog open={pathname === '/write'} onOpenChange={() => router.back()}>
            <DialogContent>
                <DialogTitle>Please Log in</DialogTitle>
                <DialogDescription>
                    You need to be logged in to write a post.
                </DialogDescription>
                <Alert className='my-8'>
                    <AlertTriangle />
                    <AlertTitle>Not Logged</AlertTitle>
                    <AlertDescription>You need to be logged in to write a post</AlertDescription>
                </Alert>
            </DialogContent>

        </Dialog>
    )
}

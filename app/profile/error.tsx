'use client' // Error boundaries must be Client Components

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Alert className='my-8'>
            <AlertTriangle />
            <AlertTitle>Not Logged</AlertTitle>
            <AlertDescription>You need to be logged in to see your Profile</AlertDescription>
        </Alert>
    )
}
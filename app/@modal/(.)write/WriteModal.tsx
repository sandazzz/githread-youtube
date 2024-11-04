'use client'
import { WritePostForm, WritePostFormValues } from "@/app/write/WritePostForm"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useRouter, usePathname } from "next/navigation"
import { User } from "@prisma/client"

export default function WriteModal({ user, createPost }: {
    user: User
    createPost: (values: WritePostFormValues) => Promise<string>
}) {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <Dialog open={pathname === '/write'} onOpenChange={() => router.back()}>
            <DialogContent>
                <DialogTitle>Write a post</DialogTitle>
                <DialogDescription>
                    Please fill out the form below to create a new post.
                </DialogDescription>
                <WritePostForm user={user} onSubmit={createPost} />
            </DialogContent>
        </Dialog>
    )
}
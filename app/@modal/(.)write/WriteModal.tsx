'use client'
import { WritePostForm, WritePostFormValues } from "@/app/write/WritePostForm"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter, usePathname } from "next/navigation"
import { User } from "@prisma/client"

export default function WriteModal({ user, createPost }: {
    user: User
    createPost: (values: WritePostFormValues) => Promise<string | void>
}) {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Dialog open={pathname === '/write'} onOpenChange={() => router.back()}>
            <DialogContent>
                <WritePostForm user={user} onSubmit={createPost} ></WritePostForm>
            </DialogContent>
        </Dialog>
    )
}
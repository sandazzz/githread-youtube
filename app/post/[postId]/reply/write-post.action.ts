'use server';

import { WritePostFormValues } from '@/app/write/WritePostForm';
import { prisma } from "@/lib/prisma";
import { getUser } from '@/src/query/user.query';
import { revalidatePath } from 'next/cache';

export const createReply = async (postId: string, values: WritePostFormValues) => {
    const user = await getUser();

    const post = await prisma.post.create({
        data: {
            content: values.content,
            userId: user.id,
            parentId: postId,
        },
    });

    revalidatePath(`/post/${postId}`)
    // fake timer because sqlite is too fast
    //await new Promise((resolve) => setTimeout(resolve, 1000));

    return postId
};
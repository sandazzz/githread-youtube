import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { postSelectQuery } from "./post.query";

const userQuery = {
    id: true,
    name: true,
    username: true,
    image: true,
    bio: true,
    createdAt: true,
    link: true,
} satisfies Prisma.UserSelect

export const getUser = async () => {
    const session = await getAuthSession();
    if (!session?.user.id) {
        throw new Error("User not found");
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session?.user.id,
        },
    });
    return user;
}

export const getUserProfile = async (userId: string) => {
    return prisma.user.findFirst({
        where: {
            OR: [
                {
                    username: userId
                },
                {
                    id: userId
                }
            ]
        },
        select: {
            ...userQuery,
            _count: {
                select: {
                    followed: true,
                    likes: true,
                }
            },
            posts: {
                select: postSelectQuery(),
                take: 10,
                orderBy: {
                    createdAt: "desc"
                }
            },
            followed: {
                select: {
                    follower: {
                        select: {
                            id: true,
                            image: true,
                            username: true
                        }
                    }
                },
                take: 3,
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })
}

export const getUserEdit = async () => {
    const session = await getAuthSession()

    if (!session) {
        throw new Error('No sesssion')
    }

    return prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id,
        },
        select: userQuery,
    })
}


export type UserProfile = NonNullable<Prisma.PromiseReturnType<typeof getUserProfile>>

export type UserEdit = NonNullable<Prisma.PromiseReturnType<typeof getUserEdit>>;
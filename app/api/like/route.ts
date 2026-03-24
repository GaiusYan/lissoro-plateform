import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {

        const { postId } = await req.json();
        console.log("Post id", postId);
        
        const session = await auth();

        if(!session) {
            throw new Error("Invalid session");
        }

        const currentUserId = session?.user?.id;

        const currentUser = await prisma.user.findUnique({
            where : {
                id : currentUserId
            }
        });

        if (!currentUser) {
            throw new Error("Invalid user");
        }

        const post = await prisma.post.findUnique({
            where : {
                id: postId,
            }
        });

        if (!post) {
            throw new Error("Invalid post");
        }

        post.likeIds.push(currentUser?.id);

        await prisma.post.update({
            where: {
                id : postId,
            },
            data : {
                likeIds: post.likeIds,
            }
        });

       
        /* await prisma.like.create({
            data : {
                userId: currentUser?.id as string,
                postId: postId,
            }
        }); */


        await prisma.notification.create({
            data: {
                userId: post?.authorId,
                content: `❤️ ${currentUser?.name ? currentUser?.name : currentUser?.email } vient d'aimer votre lissoro`,
                type: "like",
            }
        });

        return NextResponse.json('Success', {status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, {status : 400});
    }
}



export async function DELETE(req: NextRequest) {
    try {
        const { postId } = await req.json();
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

       const currentUserId = session?.user?.id;

        const currentUser = await prisma.user.findUnique({
            where : {
                id : currentUserId
            }
        });

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId: currentUserId,
                    postId,
                },
            },
        });

        if (!existingLike) {
            return NextResponse.json({ error: "Like not found" }, { status: 404 });
        }


        const post = await prisma.post.findUnique({
            where : {
                id : postId,
            }
        });

        if (!post) {
            throw new Error("Invalid ID");
        }


        const updateLikeIds = post.likeIds.filter(id => currentUserId !== id);

        await prisma.post.update({
            where : {
                id: postId,
            },
            data: {
                likeIds: updateLikeIds,
            }
        });
        
        
       /*  await prisma.like.delete({
            where: {
                userId_postId: {
                    userId: currentUserId,
                    postId,
                },
            },
        }); */

        await prisma.notification.create({
            data: {
                userId: post?.authorId,
                content: `😡 ${currentUser?.name ? currentUser?.name : currentUser?.email } ne s'interesse plus à votre lissoro`,
                type: "like",
            }
        });

        return NextResponse.json({ message: "Unliked" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
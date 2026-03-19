import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

        await prisma.like.create({
            data : {
                userId: currentUser?.id as string,
                postId: postId,
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

        const currentUserId = session.user.id;

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

        
        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId: currentUserId,
                    postId,
                },
            },
        });

        return NextResponse.json({ message: "Unliked" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
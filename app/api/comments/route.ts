import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {

    try {

        const session = await auth();

        if (!session) {
            throw new Error("Invalid session");
        }

        const currentUserId = session?.user?.id;
        const {body, postId } = await req.json();

        if (!body || !postId) {
            throw new Error("Invalid fields");
        }

        const post = await prisma.post.findUnique({
            where: {
                id : postId,
            }
        });

        if (!post) {
            throw new Error("Invalid post");
        }

        await prisma.comment.create({
            data : {
                content: body,
                authorId : currentUserId as string,
                postId: postId,
            }
        });

        return NextResponse.json("Success", { status : 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json(error,{ status : 400});
    }
}
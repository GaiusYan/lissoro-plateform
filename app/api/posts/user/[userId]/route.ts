import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET (
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }>}
)  {
    try {
      
        const {userId} = await params;

        let posts;

        if (userId && typeof userId === "string") {
            posts = await prisma.post.findMany({
                where: {
                    authorId: userId,
                },
                include: {
                    author: true,
                    likes: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        } else {
            posts = await prisma.post.findMany({
                include: {
                    author : true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }  
            });
        }

        return NextResponse.json(posts, {status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error}, { status : 400})
    }
}
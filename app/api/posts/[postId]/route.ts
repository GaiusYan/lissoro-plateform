import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";


export async function GET(
    req: NextRequest,
    {params} : {params :Promise<{postId : string}>}
) {

    try {

        const {postId} = await params;

        const post = await prisma.post.findUnique({
            where: {
                id : postId,
            },
            include : {
                author: true,
                likes: true,
                comments: {
                    include: {
                        author : true,
                    },
                    orderBy: {
                        createdAt :'desc'
                    }
                }
            }
        });


        const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
            userId : post?.authorId as string,
            postId,
            },
        },
        }); 

       return NextResponse.json({...post,existingLike}, {status : 200});
    } catch(error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong",
            status : 400
        })
    }
}
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
    req : NextRequest,
) {
    try {
        
        const session = await auth();
        const { body } = await req.json();

        if (!session) throw new Error("Invalid session");

        const currentUserId = session?.user?.id;

        const currentUser = await prisma.user.findUnique({
            where: {
                id : currentUserId,
            }
        });

        if (!currentUser) throw new Error("Invalid User id");

        const post = await prisma.post.create({
            data: {
                content: body,
                authorId: currentUser?.id,
            }
        });

        return NextResponse.json(post, {status : 200});
    } catch(error) {
        console.log(error);
        return NextResponse.json(error, {status: 400});
    }
}

export async function GET(req: NextRequest){

    try{

        //Afficher les données en fonction des utilisateur 
        // Utilisateur d'une AI pour filter les données
        const posts = await prisma.post.findMany({
            include: {
                author : true,
                comments: true,
                likes: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, {status: 400});
    }
}
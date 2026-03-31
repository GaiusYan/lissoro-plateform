import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(
    req: NextRequest,
    { params } : { params : Promise<{ userId : string }>} 
) {
    
    try {

        const { userId } = await params;

        if (!userId) {
            throw new Error("Invalid id");
        }

        const existingUser = await prisma?.user.findUnique({
            where: {
                id : userId,
            }
        });

        const followersCount = await prisma?.user.count({
            where : {
                followingIds: {
                    has: userId,
                }
            }
        });

        return NextResponse.json({...existingUser, followersCount}, {status : 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error : "Failed to fetch user"}, { status: 500});
    }
}
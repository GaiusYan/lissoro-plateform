import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
    req: NextRequest
) {
    
    try {
        
        const {profileImage,name, coverImage, username, birthDate, bio } = await req.json();
        const session = await auth();

        if (!session) {
            return NextResponse.json({
                error: "No session auth",
            }, {status : 200});
        }

        const userId = session?.user?.id;

        await prisma.user.update({
            where: {
                id: userId,
            },
            data :{
                username,
                profileImage,
                coverImage,
                bio,
                dob: birthDate,
                name
            }
        });
        return NextResponse.json("Created", {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error : "Failed to patch profile"}, {status : 400});
    }
}
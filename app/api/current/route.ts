import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    try {

        const user = await prisma.user.findUnique({
            where: {
                id : session?.user?.id,
            }
        }); 

        if (!user) {
            throw new Error ("Error");
        }
        return NextResponse.json(user,{status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error : "No session"}, {status: 400})
    }
}
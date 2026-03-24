import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(req: NextRequest, {params } :{params :  Promise<{userId : string}>}) {

    try {

        const session = await auth();

        if (!session) {
            throw new Error("Invalid session");
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId: session?.user?.id,
            }
        });
        return NextResponse.json(notifications, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, {status: 400});
    }
}
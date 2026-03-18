import { auth } from "@/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await auth();
    try {
        console.log(session);
        return NextResponse.json(session,{status: 200});
    } catch (error) {
        console.log(error);
    }
}
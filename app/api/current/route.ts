import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await auth();
    try {
        return NextResponse.json(session,{status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error : "No session"}, {status: 400})
    }
}
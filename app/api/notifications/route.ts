import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import openai from "@/lib/openai";


export async function POST(req : NextRequest) {
    try {

        const {content, userId} = await req.json();

        

        return NextResponse.json("Notification created", {status : 200} )

    } catch (error) {
        console.log(error);
        return NextResponse.json(error, {status: 400});
    }
}
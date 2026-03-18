import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {

    try {

        const { username, password, email } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            }
        });

        if (existingUser) {
            throw new Error("Ce nom d'utilisateur existe déjà");
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        },);

        if(user) {
            throw new Error("Cet adresse email est déjà utilisée")
        }


        const hashPassword = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data : {
                username,
                email,
                password: hashPassword,
            }
        });

        return NextResponse.json("user crée", {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error},{ status: 400});
    }
}
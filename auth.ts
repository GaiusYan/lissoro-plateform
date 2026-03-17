import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
    
    providers: [
        Credentials({
            name : "Credentials",
            credentials: {
                email : { label : "Email", type : "text"},
                password: { label : "password", type: "password"}
            },

            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.user.findUnique({
                    where : {
                        email : credentials?.email as string,
                    }
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isCorrect) {
                    return null;
                }
                
                return user;
            }
        })
  ],
})
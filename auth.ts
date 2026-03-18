import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
    
    providers: [
        Credentials({
            name : "Credentials",
            credentials: {
                email : { label : "Email", type : "email"},
                password: { label : "password", type: "password"}
            },

            async authorize(credentials) {
                
                if (!credentials?.email || !credentials?.password) { 
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where : {
                        email : credentials?.email as string,
                    }
                });

                    

                if (!user || !user.password) {
                    return null;
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isCorrectPassword) {
                    return null;
                } 
                
                return user;
            }
        }),
        
  ],
  callbacks: {
    async jwt({ token, user }) {
        
        if (user) {
            token.id = user.id;
            token.email = user.email;
        }
        return token;
    },
    async session({ session, user }) {
        session.user.id = user.id;
        return session;
    },
   signIn({ account, user}) {
        return true;
   }
  },
    session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
})
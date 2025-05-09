import {Session, User} from "next-auth";
import type { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google"


interface SessionCallbackParams {
    session: Session,
    user: User,
    token: JWT
}

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session}: SessionCallbackParams){

            return session
        }
    }

}


export default authOptions;
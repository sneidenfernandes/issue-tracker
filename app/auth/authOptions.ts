import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google"


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
        async session({session}){

            return session
        }
    },
    session:{
        strategy: "jwt"
    }
    
}


export default authOptions;
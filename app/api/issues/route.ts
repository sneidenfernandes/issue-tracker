// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
import { getServerSession } from "next-auth";
import { projectIssueSchema } from "@/app/types/zod/issue";
import {prisma} from "@/lib/prisma"
import { ProjectRole } from "@/app/generated/prisma";

export async function POST(request:Request){

    const session = await getServerSession()

    if(!session){

        return new Response(JSON.stringify({
            error: "Unauthorized",
            message: "Session does not exist"
        }),{
            status: 401,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

   
    
}
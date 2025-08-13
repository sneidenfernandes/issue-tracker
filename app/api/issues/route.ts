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

    try {
        const body = await request.json();

    const isValid = projectIssueSchema.safeParse(body);

    if(!isValid.success){

        return new Response(JSON.stringify({
            error: "Invalid Schema",
            message: "Check the request body"
        }))
    }

    const user = await prisma.user.findFirst({
        where: {
            email: String(session?.user?.email)
        }
    })

    const issue = await prisma.issue.create({
        data: {
            name: body.name,
            description: body.description, 
            status: body.status,
            priority: body.priority,
            createdAt: body.createdAt,
            createrId: String(user?.id),
            projectId: body.projectId,
            issueMembership: {
                create: {
                    memberId: String(user?.id),
                    role: "OWNER"
                }
            }
        }
    })


    return new Response(JSON.stringify({
        issue
    }))

    }catch{

        return new Response(JSON.stringify({
            message:"Something went wrong!"
        }))

    }
    
}
import { getServerSession } from "next-auth";
import { useSearchParams } from "next/navigation";
import {prisma} from "@/lib/prisma"
import { projectIssueSchema } from "@/app/types/zod/issue";



export async function POST(request: Request){

    const params = useSearchParams();
    const session = await getServerSession();
    const projectId = params.get("projectId");


    if(!session){

        return new Response(JSON.stringify({
            message: "Session not found!"
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
            projectId: String(projectId),
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
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// Add member to a project
export async function POST(request: Request,
    {params} : {params: {id: string}}
){


    try {
    const session =  await getServerSession();

    if(!session){
        return new Response(
            JSON.stringify({
                message: "Unauthorized. Session not found!"
            }),
            {
                status: 500
            }
        )
    }

    const body = await request.json()
    const {collaboraterId, role} = body;
    const {id} = params;

    const existingMembership = await prisma.projectMembership.findUnique({
        where:{
            collaboraterId_projectId:{
                collaboraterId: collaboraterId,
                projectId: id
            }
        }
    })

    if(existingMembership){
        return Response.json({
            message: "Collaborater is already on this project."
        })
    }

    const newCollaborater = await prisma.projectMembership.create({
        data: {
            collaboraterId: collaboraterId,
            projectId: id,
            role: String(role)
        }
    })

    return Response.json({
        new: newCollaborater
    })
    }catch(e){
        return Response.json({
            error: "Something went wrong.",
            message: String(e)
        })
    }
    
}



export async function GET(request: Request, 
    {params}: {params: {id: string}}
){
    try{

        const session = await getServerSession();

        if(!session){
            return new Response(
                JSON.stringify({
                    error: "Unauthorzied. Session not found!"
                }),
                {
                    status: 401
                }
            );
        }

        const {id} = params;

        const projectMembers = await prisma.projectMembership.findMany({
            where:{
                projectId: id
            },
            include:{
                collaborater: true
            }
        })


        return Response.json(projectMembers);

    }catch(e){
        return Response.json({
            error: "Something went wrong",
            message: String(e)
        })
    }



}
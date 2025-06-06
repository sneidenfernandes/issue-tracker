import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";



export async function PATCH(request:Request,
    {params}: {params: {id: string, collaboraterId: string}}){

    const session = getServerSession();
    if(!session){

        return Response.json({
            message: "Unauthorized. Session does not exist."
        })
    }

    try{

        const {id, collaboraterId} = params;

        const existingCollaborater = await prisma.projectMembership.findUnique({
            where:{
                memberId_projectId:{
                    projectId: id,
                    memberId: collaboraterId
                }
            }
        })

        if(!existingCollaborater){
            return Response.json({
                message: "Collaborater not found."
            })
        }

        const {role} = await request.json();


        const changedRole = await prisma.projectMembership.update({
            where:{
                memberId_projectId:{
                    projectId: id, 
                    memberId: collaboraterId
                }
            },
            data: {
                role: role 
            }
        })


        return Response.json({
            changedRole
        })

    }catch(e){
        return Response.json({
            error: "Something went wrong.",
            message: String(e)
        })
    }

}
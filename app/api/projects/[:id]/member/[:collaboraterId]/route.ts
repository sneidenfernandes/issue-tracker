import {prisma} from "@/lib/prisma";

export async function DELETE(_request: Request,
    {params}: {params: {id: string, collaboraterId: string}}  
){

    
    try{
    

        const {id, collaboraterId} = params;

        const existingCollaborater = await prisma.projectMembership.findUnique({
            where: {
                memberId_projectId:{
                    memberId: collaboraterId,
                    projectId: id
                }
            }
        })       

        if(!existingCollaborater){
            
            return Response.json({
                error: "User not found",
                message: "Delete operation cannot be performed."
            })
        }

        const deletedCollaborater = await prisma.projectMembership.delete({
            where: {
                memberId_projectId:{
                    memberId: collaboraterId,
                    projectId: id
                }
            }
        })

        return Response.json({
            deleted: deletedCollaborater
        })

        
    }catch(e){
        
        return Response.json({
            error: "Something went wrong",
            message: String(e)
        })
    }
}


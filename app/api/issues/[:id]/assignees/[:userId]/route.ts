import {prisma} from "@/lib/prisma"

export async function DELETE({params}:{params: {id: string, userId: string}}){
    
    try{
        const {id, userId} = params;

        const existingUser = await prisma.issueMembership.findUnique({
            where:{
                memberId_issueId:{
                    memberId: userId,
                    issueId: id
                }
            }
        });

        if(!existingUser){
            
            return Response.json({message: "Assignee does not exist"});
        }


        const removedAssignee = await prisma.issueMembership.delete({
            where:{
                memberId_issueId:{
                    memberId: userId,
                    issueId: id
                }
            }
        })

        return Response.json(removedAssignee)

    }catch(e){

        return Response.json({erorr: "something went wrong", message: String(e)})
    }
}




export async function PATCH(request: Request,{params}:{params: {id: string, userId: string}}){




    
    try{
        const {id, userId} = params;


        // const body = await request.json();

        

        const existingUser = await prisma.issueMembership.findUnique({
            where:{
                memberId_issueId:{
                    memberId: userId,
                    issueId: id
                }
            }
        });

        if(!existingUser){
            
            return Response.json({message: "Assignee does not exist"});
        }


        const removedAssignee = await prisma.issueMembership.delete({
            where:{
                memberId_issueId:{
                    memberId: userId,
                    issueId: id
                }
            }
        })

        return Response.json(removedAssignee)

    }catch(e){

        return Response.json({erorr: "something went wrong", message: String(e)})
    }
}
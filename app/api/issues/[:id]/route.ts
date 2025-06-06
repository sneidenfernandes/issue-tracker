import { prisma } from "@/lib/prisma"
import {z} from "zod";
export async function GET(
    {params}: {params: {id:string}}
) {
   
    try{

        const {id} = params;
        const issue = await prisma.issue.findUnique({
            where:{
                id: String(id)
            }
        });

        return Response.json(issue);

    }catch(e){

        return Response.json({
            error: "Something went wrong",
            message: String(e)
        })
    }


}


export async function DELETE(
    {params}:{params: {id: string}}
){

    try{
        const {id} = params;

        const existingIssue = await prisma.issue.findUnique({
            where:{
                id: String(id)
            }
        }); 

       if(!existingIssue){
            
            return Response.json({
                message: "Issue does not exist"
            })
       }

       const deletedIssue = await prisma.issue.delete({
        where:{
            id: String(id)
        }
       })

       return Response.json({
        deletedIssue: deletedIssue
       })

        
    }catch(e){

        return Response.json({
           error: "Something went wrong",
           message: String(e)

        })
    }

}


export async function PATCH(request: Request,
    {params}: {params: {id: string}}
){
   
    try{
        
        const issueFieldSchema = z.object({
            label: z.enum(["BUG","FEATURE","IMPROVEMENT"]).optional(),
            status: z.enum(["todo","in-progress","in-review","done","canceled","duplicate"]).optional()
        }).refine((data) => Object.keys(data).length == 1,{
            message: "Only one field can be changed at a time"
        })



        const body = await request.json();

        const isValidSchema = issueFieldSchema.safeParse(body);

        if(!isValidSchema){
            
            return Response.json({
                error: "Invalid input fields"
            })
        }


        const fieldType = Object.keys(body)[0];

        const {id} = params;

        if(fieldType === "label"){
               const update = await prisma.issue.update({
                    where: {
                        id: id
                    },
                    data:{
                        label: body.label
                    }
               })

               return Response.json(update);
        }
        if(fieldType === "status"){

            const update = await prisma.issue.update({
                where: {
                    id: id
                },
                data: {
                    label: body.status
                }
            })

            return Response.json(update)

        }


    }
    catch(e){
        return Response.json({
            error: "Something went wrong",
            message: String(e)
        })
    }
}
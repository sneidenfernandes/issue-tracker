import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma";
import {z} from "zod"

// GET SPECEFIC PROJECT
export async function GET(_request: Request,
    {params}: {params: {id: string}}) {

    const session = await getServerSession();

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
    
    try{
       
        const {id} = params;

        const project = await prisma.project.findUnique({
            where: {
                id: String(id)
            }
        })


        return Response.json(project);


    }catch(e){
        
        return new Response(
            JSON.stringify({
                error: "Something went wrong.",
                message: String(e)
            })
        )
    }

    
}


// DELETE SPECEFIC PROJECT

export async function DELETE(_request: Request,
    {params} : {params: {id: string}}
){
    const session = await getServerSession();

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

    try{

        const {id} = params;

        const deletedProject = await prisma.project.delete({
            where:{
                id: String(id)
            }
        })

        return Response.json({
            deleted: deletedProject
        })

    }catch(e){

        return new Response(
            JSON.stringify({
                error: "Something went error",
                message: String(e)
            })
        )
    }

}


export async function PATCH(request: Request,
    {params}: {params: {id: string}}
){
    
    const session = await getServerSession();
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

    

    try{

    const body = await request.json()

    const updateFieldSchema = z.object({
        status: z.enum(["backlog","planned","in-progress","completed","canceled"]).optional(),
        priority: z.enum(["no-priority", "urgent","high","medium","low"]).optional(),
        startDate: z.date().optional(),
        completeDate: z.date().optional(),
        targetDate: z.date().optional()

    }).refine((data) => Object.keys(data).length === 1, {
        message: "Only one field can be updated at a time."
    })

    const validField = updateFieldSchema.safeParse(body);

    if(!validField.success){

        return Response.json({
            error: "Validation Error",
            message: "Invalid field in body"
        })
    }



    const {id} = params;

    const fieldType = Object.keys(body)[0];


    if(fieldType === 'status'){
        
        const statusUpdate = await prisma.project.update({
            where: {
                id: id
            },
            data:{
                status: body.status
            }
        })


        return Response.json(statusUpdate)
    }
    else if(fieldType === "priority"){

        const priorityUpdate = await prisma.project.update({
            where: {
                id: id
            },
            data:{
                projectPriority: body.priority
            }
        })
       return Response.json(priorityUpdate)

    }
    else if(fieldType === "startDate") {
        const startDateUpdate = await prisma.project.update({
            where:{
                id: id
            },
            data: {
                startDate: body.startDate
            }
        });
        
        return Response.json(startDateUpdate);
    }
    else if (fieldType === "completedDate"){

        const completedDateUpdate = await prisma.project.update({
            where: {
                id: id
            },
            data:  {
                completedDate: body.completedDate
            }
        });

        return Response.json(completedDateUpdate);
    }
    else if (fieldType === "targetDate"){

        const targetDateUpdate = await prisma.project.update({
            where: {
                id: id
            },
            data: {
                targetDate: body.targetDate
            }
        })

        return Response.json(targetDateUpdate);
    }



    }catch(e){


        return Response.json({
            error: "Something went wrong.",
            message: String(e)
        })
    }

}
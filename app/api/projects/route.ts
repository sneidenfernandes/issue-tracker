
import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma"
import * as z from "zod/v4";


// Get all projects
export  async function GET(){


    try{
        const projects = await prisma.project.findMany();
        return Response.json(projects);

    }
    catch(e){

        return new Response(
            JSON.stringify({
                error: "Database error",
                message: String(e)
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500
            }
        )
    }


    
}


// Create project
export async function POST(request: Request){   

    const session = await getServerSession();

    console.log("Session",session);
    

    const projectBodyScheme = z.object({
        name: z.string(),
        description: z.string(),
        shortSummary: z.string(),
        startDate: z.date(),
        targetDate: z.date(),
        status: z.enum(["backlog","planned","in_progress","completed","cancelled"]).optional(),
        priority: z.enum(["no_priority","urgent","hight","medium","low"]).optional()
    })
    
    try{

        const body = await request.json()
        console.log(body);

        const isSchemaValid = projectBodyScheme.safeParse(body);
        

        if(!isSchemaValid.success){
            
            return new Response( JSON.stringify({
                error: "Validation Error",
                message: "Invalid Schmea. Make sure you've sent the correct data."
            }));
        }

        const createrId = await prisma.user.findUnique({
            where: {
                email: String(session?.user?.email)
            }
        });



        const newProject = await prisma.project.create({
            data: {
                name: body.name,
                description: body.description,
                shortSummary: body.shortSummary,

                createrId: String(createrId),
                projectMemberships:{
                    create:[
                        {memberId: String(createrId), role: "OWNER"}
                    ]
                }
                
            }
        })


        

        return  Response.json(newProject);

        
    }catch(e){

        console.log(e);

        return new Response(
                            JSON.stringify({
                                    error: "Something went wrong.Check the error messages.",
                                    message: String(e)})
        )

    }


  


    
    

}
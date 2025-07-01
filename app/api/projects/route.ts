
import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma"
import * as z from "zod/v4";


// Get all projects
export  async function GET(){

    const session = await getServerSession();

    try{
        
        const user = await prisma.user.findUnique({
            where:{
                email: String(session?.user?.email)
            }

        })

        const userProjects = await prisma.projectMembership.findMany({
            where: {
                memberId: user?.id
            },
            include:{
                project: true
            }
        })

        return new Response(
            JSON.stringify({
                projects: userProjects
            })
        )
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

    

    const projectBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        shortSummary: z.string(),
        startDate: z.string(),
        targetDate: z.string(),
        status: z.enum(["backlog","planned","in_progress","completed","cancelled"]).optional(),
        priority: z.enum(["no_priority","urgent","hight","medium","low"]).optional()
    })
    
    try{

        const body = await request.json()
        // console.log("requestBody:",typeof body.startDate);

        const isSchemaValid = projectBodySchema.safeParse(body);
        
        if(!isSchemaValid.success){

            console.log(isSchemaValid)
            
            return new Response( JSON.stringify({
                error: isSchemaValid,
                message: "Invalid Schema. Make sure you've sent the correct data.",
                
              
            }),{
                status: 400,
                headers: { "Content-Type": "application/json"}
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: String(session?.user?.email)
            }
        });



        const newProject = await prisma.project.create({
            data: {
                name: body.name,
                description: body.description,
                shortSummary: body.shortSummary,
                createrId: String(user?.id),
                projectMemberships:{
                    create:[
                        {memberId: String(user?.id), role: "OWNER"}
                    ]
                }
                
            }
        })

  
        
        return new Response(JSON.stringify({
            project: newProject,
            message: "Project successfully created!",
        }),{
            status: 200,
            headers: {"Content-Type": "application/json"}
        });

        
    }catch(e){

        console.log(e);

        return new Response(
                            JSON.stringify({
                                    error: "Something went wrong.Check the error messages.",
                                    message: String(e)})
        )

    }


  


    
    

}
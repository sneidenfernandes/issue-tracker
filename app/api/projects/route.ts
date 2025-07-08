import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma"
import { projectBodySchema } from "@/app/types/project";



// Get all projects
export  async function GET(){

    const session = await getServerSession();

    if(!session){
 
        return new Response(
            JSON.stringify({
                error: "Unauthorized",
                message: "You must be logged in."
            }),
            {
                status: 401,
                headers: {"Content-Type": "application/json"}
            }
        )
    }

    try{
        
        const user = await prisma.user.findUnique({
            where:{
                email: String(session?.user?.email)
            }

        })

        if(!user){
            return new Response(JSON.stringify({
                error: "User not found.",
                message: "The user corresponding to this session is not found"
            }),
            {
                status:401,
                headers: {"Content-Type": "application/json"}
            }
        )
        }

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

    if(!session){

        return new Response(JSON.stringify({
            error: "Unauthorized",
            message: "The user corresponding to this session is not found."
        }),
    {
        status: 401,
        headers: {"Content-Type": "application/json"}
    })
    }

    

   
    
    try{

        const body = await request.json()

    

        const isSchemaValid = projectBodySchema.safeParse(body);
        
        if(!isSchemaValid.success){

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
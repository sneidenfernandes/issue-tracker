
import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma"


// Get all projects
export default async function GET(){


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

    if(!session){

        return new Response(
            JSON.stringify({
                message: "Unauthorized access"
            }),
            {
                status:401
            }
        )
    }

    
    try{



        const {name, description} : {name: string, description: string} = await request.json()

        const createrId = await prisma.user.findUnique({
            where: {
                email: String(session.user?.email)
            }
        });



        const newProject = await prisma.project.create({
            data: {
                name: name,
                description: description,
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

        return new Response(
                            JSON.stringify({
                                    error: "Something went wrong.Check the error messages.",
                                    message: String(e)})
        )
    }


  


    
    

}
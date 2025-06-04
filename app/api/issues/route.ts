import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function GET(){

    const session = await getServerSession();

    if(!session){
        return new Response(
            JSON.stringify({
                message: "Unauthorized access"
            }),
            {
                status: 401
            }
        )
    }

    try{
        const issues = await prisma.issue.findMany();
        return Response.json(issues);

    }catch(e){
        
        return Response.json({
            error: "Database error",
            message: String(e)
        })
    }
}

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



        const {name, description}: {name: string, description: string} = await request.json()

        const createrId = await prisma.user.findUnique({
            where: {
                email: String(session.user?.email)
            }
        });


        const newIssue = await prisma.issue.create({
            data: {
                name: String(name),
                description: String(description),
                createrId: String(createrId)
            }
        })

        return  Response.json(newIssue);

        
    }catch(e){

        return new Response(
                            JSON.stringify({
                                    error: "Something went wrong.Check the error messages.",
                                    message: String(e)
                                        })
        )
    }


  


    
    

}
import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server"


export async function GET(req: NextRequest){

    const searchParams = req.nextUrl.searchParams;
    const project  = searchParams.get("project");
    
    try {
        const result =  await prisma.project.findMany({
            where:{
                name: {
                    contains: String(project)
                }
            }
        });


        return Response.json(result);

    }catch(e){
        
        return new Response(
            JSON.stringify({
                error: "Database error",
                message: String(e)
            })
        )
    }

}
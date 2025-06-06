import {prisma} from "@/lib/prisma";
import { NextRequest } from "next/server";



export async function GET(req: NextRequest, {params}:{params:{id: string}}){

    
    const searchParams = req.nextUrl.searchParams;
    const project  = searchParams.get("q");
    const {id} = params;
    
    try {
        const result =  await prisma.issue.findMany({
            where:{
                projectId:id,
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
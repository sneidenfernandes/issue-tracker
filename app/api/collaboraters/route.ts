import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import {prisma} from "@/lib/prisma"
import { NextRequest } from "next/server";


export async function GET(request: NextRequest){
    
    const session = await getServerSession(authOptions);

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("search");
    console.log(query);
    
    if(!session) {
        return new Response(JSON.stringify({
            message: "Unauthorized: session not found"
        }))
    }

    try {
        const collaboraters = await prisma.user.findMany({
            where: {
               OR:[
                {
                    name: {
                        contains: String(query),
                        mode: "insensitive"
                    }
                },
                {
                    email: {
                        contains: String(query),
                        mode: "insensitive"
                    }
                }
               ]
            }
        });

        return Response.json(collaboraters);

    }catch(e){

        return new Response(
            JSON.stringify(
                {
                    error: "Database error",
                    message: String(e)   
                }),
        {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        },
        
    );
    }

   

    


    
}



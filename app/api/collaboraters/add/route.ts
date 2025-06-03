import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: Request){

    const session = await getServerSession(authOptions);
    
    if(!session){
        return new Response(
            JSON.stringify("Unauthorized: Session not found")
        )
    }

    const body = await request.json();
    
    return Response.json(body);
}
import { prisma } from "@/lib/prisma";
import {z} from "zod";


export async function POST(req: Request,{params}:{params:{id: string}}){

    

    try{
        const body = await req.json();
        const schema = z.object({
            role:z.enum(["OWNER","REVIEWER","APPROVER","CONTRIBUTER"])
        });

        const {id} = params;

        const isValid = schema.safeParse(body);


        if(!isValid.success){
            return Response.json({
                message: "Invalid Inputs"
            })
        }

        
        const newAssignee = prisma.issueMembership.create({
            data:{
                issueId: id,
                memberId: body.user,
                role: "Something"
            }
        });

        return Response.json(newAssignee);

    }catch(e){

        return Response.json({
            error:"Something went wrong",
            message: String(e)
        })
    }
}
import {prisma} from "@/lib/prisma";

export async function  GET({params} : {params:{id: string}}) {

    try{
        const {id} = params;

        const issues = await prisma.issue.findMany({
            where:{
                projectId: id
            }
        });

        return Response.json(issues);

    }catch(e){

        return Response.json({error: "Something went wrong", message:String(e)})
    }
    
}
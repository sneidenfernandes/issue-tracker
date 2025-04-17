import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import {z} from "zod";


const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request: Request){
    
    const body = await request.json();

    const validation : any = createIssueSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json({
            error: validation.error.errors
        },{status: 400})
    }

    console.log(body);

    const issue = await prisma.issue.create({
        data: {
               title:body.title, 
               description: body.description
            }
    })

    return NextResponse.json({
        issue
    }, {status: 201});

    
}
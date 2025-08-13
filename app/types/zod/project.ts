import * as z from "zod/v4";

 export const projectBodySchema = z.object({
        name: z.string().nonempty(),
        description: z.string(),
        shortSummary: z.string(),
        startDate: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date) ? new Date(arg) : arg,
        z.date()),
        targetDate: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date) ? new Date(arg) : arg,
        z.date()),
        status: z.enum(["backlog","planned","in_progress","completed","cancelled"]).optional(),
        priority: z.enum(["no_priority","urgent","high","medium","low"]).optional()
    });





export type ProjectBody = z.infer<typeof projectBodySchema>; 

export const enum Status  {
    BACKLOG = "backlog",
    PLANNED = "planned",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELED = "cancelled"
}

export const enum Priority {
    NO_PRIORITY = "no_priority",
    URGENT = "urgent",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}

export interface Project {
    projectId: string
    role: string
    project: {
        name: string,
        shortSummary: string,
        description: string
    }
}



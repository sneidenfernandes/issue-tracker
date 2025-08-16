import * as z from "zod/v4";



 export const projectIssueSchema = z.object({
        name: z.string().nonempty(),
        description: z.string(),
        createdAtDate: z.preprocess(
        (arg) => (typeof arg === "string" || arg instanceof Date) ? new Date(arg) : arg,
        z.date()),
        status: z.enum(["backlog","todo","in-review","in_progress","done","duplicate","cancelled"]).optional(),
        priority: z.enum(["no_priority","urgent","high","medium","low"]).optional()
    });



export const enum IssueStatus {
    BACKLOG = "backlog",
    TODO = "todo",
    IN_PROGRESS = "in-progress",
    IN_REVIEW = "in-review",
    DONE = "done",
    CANCELLED = "cancelled",
    DUPLICATE = "duplicate"
}

export const enum IssuePriority {
    NO_PRIORITY = "no-priority",
    URGENT = "urgent",
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
import { ReactNode } from "react"
import { BacklogIcon, CancelledIcon, CompletedIcon, HighPriorityIcon, InProgressIcon, LowPriorityIcon, MediumPriorityIcon, NoPriorityIcon, PlannedIcon, UrgentPriorityIcon } from "./icons/ProjectProperyIcons"
import {Status, Priority} from "@/app/types/zod/project";

interface OptionType {
    value: string, 
    label: string,
    icon: ReactNode
}


export const statusOptions : OptionType[] = [
    {value: Status.BACKLOG,     label: "Backlog" ,     icon: <BacklogIcon/>},
    {value: Status.PLANNED,     label: "Planned" ,     icon: <PlannedIcon/>},
    {value: Status.IN_PROGRESS, label: "In Progress" , icon: <InProgressIcon/>,},
    {value: Status.COMPLETED,   label: "Completed" ,   icon: <CompletedIcon/>},
    {value: Status.CANCELED,   label: "Cancelled" ,   icon: <CancelledIcon/>},
]


export const priorityOptions : OptionType[] = [
   {value: Priority.NO_PRIORITY,     label: "No priority" ,     icon: <NoPriorityIcon/>}, 
   {value: Priority.URGENT,          label: "Urgent" ,          icon: <UrgentPriorityIcon/>}, 
   {value: Priority.HIGH,            label: "High" ,            icon: <HighPriorityIcon/>}, 
   {value: Priority.MEDIUM,          label: "Medium" ,          icon: <MediumPriorityIcon/>}, 
   {value: Priority.LOW,             label: "Low" ,             icon: <LowPriorityIcon/>}, 
]
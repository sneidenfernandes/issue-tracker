import { ReactNode } from "react"
import { BacklogIcon, CancelledIcon, CompletedIcon, HighPriorityIcon, InProgressIcon, LowPriorityIcon, MediumPriorityIcon, NoPriorityIcon, PlannedIcon, UrgentPriorityIcon } from "./icons/ProjectProperyIcons"


interface OptionType {
    value: string, 
    label: string,
    icon: ReactNode
}


export const statusOptions : OptionType[] = [
    {value: "backlog",     label: "Backlog" ,     icon: <BacklogIcon/>},
    {value: "planned",     label: "Planned" ,     icon: <PlannedIcon/>},
    {value: "in-progress", label: "In Progress" , icon: <InProgressIcon/>,},
    {value: "completed",   label: "Completed" ,   icon: <CompletedIcon/>},
    {value: "cancelled",   label: "Cancelled" ,   icon: <CancelledIcon/>},
]


export const priorityOptions : OptionType[] = [
   {value: "no-priority",     label: "No priority" ,     icon: <NoPriorityIcon/>}, 
   {value: "urgent",          label: "Urgent" ,          icon: <UrgentPriorityIcon/>}, 
   {value: "high",            label: "High" ,            icon: <HighPriorityIcon/>}, 
   {value: "medium",          label: "Medium" ,          icon: <MediumPriorityIcon/>}, 
   {value: "low",             label: "Low" ,             icon: <LowPriorityIcon/>}, 
]
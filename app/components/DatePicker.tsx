"use client"

import * as React from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



interface DatePickerType {
    label: string
    icon:  React.ReactNode
}

export function DatePicker({label,icon}: DatePickerType) {
  const [date, setDate] = React.useState<Date>()
  
  return (
    <div className="relative inline-block">
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
        className=" group h-6 w-fit flex items-center gap-1 border border-neutral-700 rounded px-2 py-0.5 text-xs font-light text-neutral-400 bg-neutral-800 hover:bg-neutral-700/60" 
        >  
        <div className="group-hover:text-neutral-50">
            {icon}
        </div>
       <p className="group-hover:text-white hidden md:block truncate max-w-[120px] overflow-hidden whitespace-nowrap">
        {date ? format(date, "PP").split(",")[0] : <span>{label}</span>}
      </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute left-0 -translate-x-10 w-auto p-0 z-100">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-neutral-800"
            classNames={{
            root: "bg-neutral-800", 
            month: "bg-neutral-800 p-0",              
            day: "bg-neutral-800",            
            }}
        />
      </PopoverContent>
    </Popover>
    </div>
    
  )
}
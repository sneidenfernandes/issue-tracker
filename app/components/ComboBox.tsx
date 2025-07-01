"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LinearButton } from "./LinearButton"


interface OptionType {
    value: string, 
    label: string,
    icon: React.ReactNode
}


interface ComboBoxType {
  type: string
  options: OptionType[]
  setValue: React.Dispatch<React.SetStateAction<string>>
  value: string
}



export function Combobox({type,options, setValue, value}: ComboBoxType) {
  const [open, setOpen] = React.useState(false)
  


  const selectedOption : OptionType = options.find((option) => value === option.value) ?? options[0];

  return (
      <div className="relative inline-block">
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
            <LinearButton option={selectedOption} />
      </PopoverTrigger>
      <PopoverContent className="absolute left-1/2 -translate-x-10 w-[300px] z-100 bg-neutral-800 border-neutral-700 text-neutral-200 px-0 py-0 ">
        <Command>
          <CommandInput placeholder={`Change ${type}...`} className=" text-neutral-200 pl-2 ml-1 text-sm flex justify-start item-center font-light border-b-[1px] border-neutral-700 w-full rounded-none" />
          <CommandList>
            <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
            <CommandGroup className="bg-neutral-800 border-t-[1px] border-neutral-700">
              {options.map((option, index) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className=" text-neutral-200 font-light"
                >
                  {option.icon}
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {index+1}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
    
  )
}

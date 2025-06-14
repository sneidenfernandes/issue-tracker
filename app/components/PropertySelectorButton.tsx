"use client";
import { useState, useRef, useEffect } from "react"
import {motion} from "motion/react";

interface PropertySelectorButtonInputs {
    collapseLG?: boolean    // property name collapses and padding resizes at large breakpoint instead of medium
    placeholder?: string    //  Dropdown placeholder 
    propertyType?: string   // Property type eg. status, priority e.t.c
    modalRef? : HTMLDivElement | undefined
}


export default function PropertySelectorButton({
    collapseLG = false,
    propertyType
}: PropertySelectorButtonInputs){
    const [dropdown, setDropdown] = useState(false);
    const [search, setSearch] = useState("");
    const [choice, setChoice] = useState("");
    const dropdownRef = useRef<HTMLDivElement | null>(null);


    const options = [
        {
            id:1,
            choice: "Backlog",
            icon: "(:)"
        },
        {
            id:2,
            choice: "Planned",
            icon: "(:)"
        },
        {
            id:3,
            choice: "In Progress",
            icon: "(:)"
        },
        {
            id:4,
            choice: "Completed",
            icon: "(:)"
        },
        {
            id:5,
            choice: "Cancelled",
            icon: "(:)"
        },
    ]


    useEffect(()=>{
        
        const handleOutsideClick = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setDropdown(false);
            }
        }

        document.addEventListener("click", handleOutsideClick);

        return () => document.removeEventListener("click", handleOutsideClick);

    },[dropdown]);

    const filteredOptions = options.filter((option) => {
        return option.choice.toLowerCase().includes(search);
    } )
    

    return <div className="">
                <button onClick={()=> setDropdown(!dropdown)} className={`inset-shadow-neutral-200/80 relative border-neutral-700 flex items-center justify-between border-[1px] text-xs font-light text-neutral-400 bg-neutral-800/90 p-2 ${collapseLG ? " lg:py-1 lg:px-2" : " md:py-1 md:px-2" } rounded hover:bg-neutral-700/60`}>
                    <div className="text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-2`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                    </div>
                    <div className={`hidden ${collapseLG ? "lg:block" : "md:block"} text-xs ml-2`}>selection</div>
                </button>


                {
                    dropdown && (<motion.div 
                        className="absolute z-50 w-80 h-auto bg-neutral-900 mt-2 rounded-lg "
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        ref={dropdownRef}
                        >
                        <div className="w-full h-full inset-px bg-neutral-800/60 border-neutral-700 border-[1px] rounded-lg">
                            <div className="h-8 flex justify-between px-6 py-1">
                                <input onChange={(e)=> setSearch(e.target.value)} type="text" placeholder={`Change ${propertyType}...`} className="placeholder:font-light placeholder:text-xs placeholder:text-neutral-400 focus:outline-none focus w-full caret-neutral-100 text-neutral-100"/>
                            </div>
                            <div className="h-[1px] bg-neutral-700 w-full "></div>
                            <ul className="p-2">
                                {
                                    filteredOptions.length > 0 ? 
                                    filteredOptions.map((option)=>{
                                        return <li key={option.id} className="flex justify-between text-sm w-full px-3 py-1 text-neutral-100 font-extralight hover:bg-neutral-700 rounded" onClick={(e) => {
                                            setChoice(option.choice);
                                            setDropdown(false);
                                            e.nativeEvent.stopImmediatePropagation();
                                            }}>
                                                    <div className="flex w-[50%] justify-start">
                                                        <p>{option.icon}</p>
                                                        <p className="ml-2">{option.choice}</p>
                                                    </div>
    
                                                    <div className="flex">
                                                        {choice === option.choice ? <p className="mr-2">&#x2713;</p> : <p></p>}
                                                        <p>{option.id}</p>
                                                    </div>
                                               </li>
                                    }) : <li className="text-neutral-400 px-3 py-2 text-sm font-light">
                                             No matching {propertyType?.toLowerCase()}
                                         </li>  
                                }
                            </ul>
                        </div>
                    </motion.div>)
                }
            </div>
}




{/* {selectionList.map((option)=>{
                                    return <li key={option.id} className=" flex justify-between text-sm w-full px-3 py-1 text-neutral-100 font-extralight hover:bg-">
                                                <div className="flex w-[50%] justify-start">
                                                    <p>{option.icon}</p>
                                                    <p className="ml-2">{option.choice}</p>
                                                </div>

                                                <div>
                                                    <p>{option.id}</p>
                                                </div>
                                           </li>
                                })} */}
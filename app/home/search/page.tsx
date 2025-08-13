"use client"
import { IssuesIcon, OverviewIcon, SidbarToggleIcon } from "@/app/components/icons/WorkspaceIcons";
import { LinearButton } from "@/app/components/LinearButton";
import { useSidebar } from "@/app/context/SidebarContext";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Project } from "@/app/types/zod/project";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useNewIssueContext from "@/app/context/NewIssueContext";
import { SearchIcon } from "lucide-react";


interface Issue {
    id: number, 
    name: string, 
    project: string, 
    status: string,
    priority: string,
    date: Date
}

export default function Search({params} : {params: Promise<{projectId: string}>}){

    const pathname = usePathname();

    const {projectId} =  React.use(params);
    const {openSideBar, openSidebarRef} = useSidebar();
    
    return (
            <div className="flex flex-col h-full z-100">
                <div className="flex flex-col flex-1">
                    <div className="h-10 border-b-[1px] border-neutral-800 px-4  md:px-8 flex justify-between items-center w-full">
                        <div className="flex  items-center space-x-2">
                            <button onClick={()=> openSideBar()} className="block  md:hidden text-white " ref={openSidebarRef}>
                                    <SidbarToggleIcon/>
                            </button>

                            <div className="flex h-full justify-center mt-[2px] items-center">
                                <SearchIcon size={12} className="text-neutral-600"/>
                            </div>

                            <div className="flex w-[80vw] h-full">
                                <input type="text" placeholder="Search..." className="w-full placeholder:font-light focus:outline-none focus:border-none placeholder:text-sm placeholder:md:text-md"/>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        )

}
"use client"
import { ProjectIcon, SidbarToggleIcon } from "@/app/components/icons/WorkspaceIcons";
import { useSidebar } from "@/app/context/SidebarContext";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Project } from "@/app/types/project";
import { useEffect, useState } from "react";
import { Combobox } from "@/app/components/ComboBox";
import { statusOptions, priorityOptions } from "@/app/components/OptionsLists";
import { usePathname } from "next/navigation";
import { GoIssueTracks } from "react-icons/go";


export default function ProjectOverview({params} : {params: Promise<{projectId: string}>}){

    const pathname = usePathname();
    const {projectId} =  React.use(params);
    const {openSideBar, openSidebarRef} = useSidebar();
    const [issueName, setIssueName] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const queryClient = useQueryClient();

    useEffect(()=> {
        const data : Project[] | undefined  = queryClient.getQueryData(['projects']);
        const projectData : Project | undefined  = data?.find((project: Project) => project.projectId === projectId);
        console.log(projectData?.project.shortSummary);
        console.log(projectData?.project.description);
        setDescription(projectData?.project.description ?? "")
        console.log("Page name:",String(pathname.split("/").slice(-1)));
    },[]);




    return (
            <div className="flex flex-col h-full overflow-y-auto">
                   <div className="h-10 border-b-[1px] border-neutral-800 px-4  md:px-8 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <button onClick={()=> openSideBar()} className="block  md:hidden text-white " ref={openSidebarRef}>
                                    <SidbarToggleIcon/>
                            </button>
                            <div className="ml-2 h-full flex justify-center items-center space-x-1">
                                <ProjectIcon/>
                                {/* ProjectName */}
                                <p className="text-xs md:text-sm text-neutral-200">project name</p>
                                <BsChevronRight size={8}/> 
                                <GoIssueTracks className="text-neutral-400" size="15"/>
                                {/* IssueName */}
                                <p className="text-xs md:text-sm text-neutral-200">issue name</p></div>
                            </div>
                   </div>

                    <div className=" mt-10 w-full h-[80vh] flex flex-col py-15">
                        <div className="px-[7vw] sm:px-[10vw] md:px-[5vw] lg:px-[20vw] space-y-4">
                            <div className="p-2 rounded-lg bg-neutral-800 w-fit">
                                <GoIssueTracks size="22px" className="text-neutral-50"/>
                            </div>

                            <div className="ml-1 mt-2 flex flex-col">
                                <input type="text" value={issueName} placeholder="Write Issue Name" className="text-neutral-100 font-semibold text-2xl placeholder:font-semibold focus:outline-none focus:ring-0 focus:border-none" onChange={(e) => setIssueName(e.target.value)}/>
                            </div>
                                <div className="flex flex-col">
                                    <div className='h-10 mt-5 ml-2 md:flex-row md:flex md:justify-start md:items-center w-full space-x-4 '>
                                        <p className="text-neutral-400 text-sm font-light ">Properties</p> 
                                        <div className="mt-5 md:mt-0 flex justify-start items-center space-x-4">
                                            <Combobox expand={true} value={status} setValue={setStatus} type="status" options={statusOptions}/>
                                            <Combobox expand={true} value={priority} setValue={setPriority} type="priority" options={priorityOptions}/>
                                        </div>
                                    </div> 
                                </div>
                                {/* Description */}
                                <div className="ml-2 mt-10">
                                    <p className="text-neutral-400 text-sm font-light">Description</p>
                                    <input placeholder="Write a description for your issue" type="text" value={description} className="text-neutral-100 w-full placeholder:text-xs placeholder:sm:text-sm placeholder:font-light font-extralight mt-3 text-md focus:outline-none focus:ring-0 focus:border-none" onChange={(e) => setDescription(e.target.value)}/>
                                </div>        
                        </div>
                    </div>
            </div>


        )

}
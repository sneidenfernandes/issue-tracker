"use client";

import { ProjectIcon, SidbarToggleIcon } from "@/app/components/icons/WorkspaceIcons"
import { LinearButton } from "@/app/components/LinearButton";
import ProjectItem from "@/app/components/ProjectItem";
import useProjectLogContext from "@/app/context/ProjectLogContext"
import { useSidebar } from "@/app/context/SidebarContext";


export default function Projects(){
    const {openProjectLog} = useProjectLogContext();
    const { openSideBar, openSidebarRef} = useSidebar();

    const allProjects = {
        label: "All projects", 
        icon: <ProjectIcon/>,
        value: "all projects"
    }

    

    return <div>
                    
                   <div className="h-10 border-b-[1px] border-neutral-800 px-4  md:px-8 flex justify-between items-center">
                        <div className="grid grid-cols-2 gap-x-px items-center">
                            <button onClick={()=> openSideBar()} className="block  md:hidden text-white " ref={openSidebarRef}>
                                    <SidbarToggleIcon/>
                            </button>
                            <p className={`text-neutral-100 font-light text-sm -ml-3 md:-ml-0 mb-[2px] md:mr-0`}>Projects</p>
                            <div className="hidden md:block ">
                              <LinearButton lightup={true} option={allProjects}/>
                            </div>
                        </div> 

                        <button onClick={openProjectLog} className="text-sm min-w-[5%] text-neutral-400 flex p-1 px-2 justify-between items-center rounded md:hover:bg-neutral-700/40">
                                <p className="text-neutral-400 text-xl md:text-md hover:bg-neutral-700/40 md:font-extralight hover:md:bg-none px-2 rounded md:px-0">+</p>
                                <p className="hidden md:block text-neutral-100 ml-2 font-extralight text-xs ">Add project</p>
                                
                        </button>
                   </div>

                    {/* Filters */}
                    <div className="h-10 border-b-[1px] text-xs border-neutral-800">
                            
                    </div>

                     <div className=" md:hidden h-10 border-b-[1px] text-xs border-neutral-800">
                            
                    </div>

                    {/* Property bar */}
                    <div className="h-10 border-b-[1px] text-xs border-neutral-800 hidden md:block">
                            <div className="flex justify-between  h-full px-8 items-center text-neutral-400">
                                <div className="text-md flex">
                                    <p>Name</p>
            
                                </div>

                                <div className="text-md hidden md:flex w-[25%] md:justify-between mr-12">
                                    <p>Health</p>
                                    <div className="flex space-x-20">
                                        <p>Role</p>
                                        <p>Progress</p>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <ProjectItem/>

                     

          </div>
}
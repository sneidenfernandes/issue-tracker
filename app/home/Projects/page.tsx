"use client";
import { ProjectIcon } from "@/app/components/icons/WorkspaceIcons"
import useProjectLogContext from "@/app/context/ProjectLogContext"
export default function Projects(){
    const {openProjectLog} = useProjectLogContext();

    return <div>
                    
                   <div className="h-10 border-b-[1px] border-neutral-800 px-8 flex justify-between items-center">
                        <div className="grid grid-cols-2 gap-x-px items-center">
                            <p className="text-neutral-100 font-light text-sm">Projects</p>
                            <div className="group hover:b border-neutral-700 flex -mr-7 justify-between border-[1px] text-xs font-light text-neutral-400 bg-neutral-800  py-1 px-2 rounded hover:bg-neutral-700/60">
                                <ProjectIcon className="group-hover:text-neutral-50"/>
                                <p className="ml-1 group-hover:text-white">All projects</p>
                            </div>
                        </div> 

                        <button onClick={openProjectLog} className="text-sm min-w-[5%] text-neutral-400 flex p-1 px-2 justify-between items-center rounded hover:bg-neutral-700/40">
                                <p className="text-neutral-400">+</p>
                                <p className="text-neutral-100 ml-2 font-extralight text-xs ">Create project</p>
                        </button>
                   </div>

                    <div className="h-10 border-b-[1px] text-xs border-neutral-800">

                    </div>

          </div>
}
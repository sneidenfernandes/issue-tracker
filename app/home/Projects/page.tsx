"use client";
import { ProjectIcon } from "@/app/components/icons/WorkspaceIcons"
import { LinearButton } from "@/app/components/LinearButton";
import useProjectLogContext from "@/app/context/ProjectLogContext"


export default function Projects(){
    const {openProjectLog} = useProjectLogContext();

    const allProjects = {
        label: "All projects", 
        icon: <ProjectIcon/>,
        value: "all projects"
    }

    return <div>
                    
                   <div className="h-10 border-b-[1px] border-neutral-800 px-8 flex justify-between items-center">
                        <div className="grid grid-cols-2 gap-x-px items-center">
                            <p className="text-neutral-100 font-light text-sm">Projects</p>
                            <LinearButton option={allProjects}/>
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
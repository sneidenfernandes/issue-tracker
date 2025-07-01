import { ProjectIcon } from "./icons/WorkspaceIcons";
import { SiProgress } from "react-icons/si";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function ProjectItem(){

    return (
       <div className="h-12 hover:bg-neutral-800/60 ">
                         <div className="flex justify-between font-semibold text-xs h-full px-8 items-center text-neutral-100">
                                <div className="flex space-x-3">
                                    <ProjectIcon/>
                                    <p className="">Name</p>
                                </div>

                                <div className="w-[25%] md:flex md:justify-between md:mr-12">
                                    <p>Health</p>
                                    <div className="hidden ml-2 md:flex md:space-x-20">
                                        <div className="flex h-full items-center space-x-2 ">
                                             <IoPersonCircleSharp />
                                             <p>Role</p>
                                        </div>
                                       
                                       <div className="flex h-full items-center space-x-1 ">
                                             <SiProgress/>
                                             <p>Progress</p> 
                                        </div> 
                                    </div>
                                 </div>
                            </div>
                            
        </div>  
    )
}
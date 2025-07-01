import { ProjectIcon } from "./icons/WorkspaceIcons";
import { SiProgress } from "react-icons/si";
import { GiJewelCrown } from "react-icons/gi";
import { TbCircleDotted } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { FaWrench } from "react-icons/fa6";
import { FaKeyboard } from "react-icons/fa";
import { ReactNode } from "react";

interface ProjectProperties {
    name: string
    role: string
}

interface role {
    role: string
    label: string
    icon: ReactNode
}



export default function ProjectItem({name, role}: ProjectProperties){

    const roleOptions : role[]  = [
        {role: "OWNER", label: "Owner", icon: <GiJewelCrown/>},
        {role: "ADMIN", label: "Admin", icon: <FaTools/>},
        {role: "MAINTAINER", label: "Maintainer", icon:<FaWrench/> },
        {role: "CONTRIBUTER", label: "Contributer", icon: <FaKeyboard/>}
    ]
    

    return (
       <div className="h-12 hover:bg-neutral-800/60 ">
                         <div className="flex justify-between font-semibold text-xs h-full px-8 items-center text-neutral-100">
                                <div className="flex space-x-3">
                                    <ProjectIcon/>
                                    <p className="">{name}</p>
                                </div>

                                <div className="text-md flex sm:w-[40%] mr-12  md:w-[50%] md:flex lg:w-[35%] sm:justify-between sm:mr-3 md:mr-12 text-neutral-100">
                                    <div className="flex items-center space-x-2">
                                        <TbCircleDotted/>
                                        <p className="text-neutral-500 font-light">No updates</p>
                                    </div>
                                    
                                    <div className="flex space-x-15">
                                            {roleOptions.filter(option => option.role === role)
                                            .map(role => {
                                                return <div key={role.label} className="hidden sm:flex md:ml-2 items-center">
                                                        {role.icon}
                                                        <p className="ml-2 text-xs ">{role.label}</p>
                                                    </div>
                                            })}
    
                                         <div className="hidden items-center lg:flex">
                                            <SiProgress/>
                                            <p className="ml-2">82%</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            
        </div>  
    )
}
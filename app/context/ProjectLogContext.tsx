"use client";
import { createContext, useContext, useState } from "react";

interface ProjectLogType {
    closeProjectLog: () => void,
    openProjectLog: () => void,
    showProjectLog: boolean
}

const ProjectLogContext = createContext<ProjectLogType | undefined>(undefined);


export function ProjectLogContextProvider({children}:{children: React.ReactNode}){

    const [showProjectLog, setShowProjectLog] = useState<boolean>(false)

    


    const openProjectLog = () => {
        setShowProjectLog(true);
    }

    const closeProjectLog = () => {
        setShowProjectLog(false);
    }


    const value = {
        closeProjectLog,
        openProjectLog,
        showProjectLog
    }
    return <ProjectLogContext.Provider value={value}>{children}</ProjectLogContext.Provider>
}


export default function useProjectLogContext(){
    const context = useContext(ProjectLogContext);
    if(context === undefined){
        throw Error("context is not defined")
    }

    return context;
}
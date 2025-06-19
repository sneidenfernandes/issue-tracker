"use client";
import { createContext, useContext, useState, useEffect, useRef, RefObject } from "react";

interface ProjectLogType {
    closeProjectLog: () => void,
    openProjectLog: () => void,
    projectLogRef: RefObject<HTMLDivElement | null>,
    showProjectLog: boolean
}

const ProjectLogContext = createContext<ProjectLogType | undefined>(undefined);


export function ProjectLogContextProvider({children}:{children: React.ReactNode}){


    const projectLogRef = useRef<HTMLDivElement | null>(null);
    const [showProjectLog, setShowProjectLog] = useState<boolean>(false);
    // const [description, setDescription] = useState<string>("");
    // const [projectName, setProjectName] = useState<string>("");
    // const [shortSummary, setShortSummary] = useState<string>("");

      useEffect(() => {

      function handleOutsideClick(event: MouseEvent) {

       const target = event.target as Node; 
       const comboboxDropdown = document.querySelector('[data-radix-popper-content-wrapper]');

        if (projectLogRef.current 
            && !projectLogRef.current.contains(target)
            && !(comboboxDropdown && comboboxDropdown.contains(target))
        ) {
            closeProjectLog();
        }
      }
    
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
   
    
  }, [showProjectLog]);

    
    


    const openProjectLog = () => {
        setShowProjectLog(true);
    }

    const closeProjectLog = () => {
        setShowProjectLog(false);
    }


    const value = {
        closeProjectLog,
        openProjectLog,
        showProjectLog,
        projectLogRef
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
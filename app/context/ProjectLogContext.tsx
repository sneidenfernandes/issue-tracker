"use client";
import { createContext, useContext, useState, useEffect, useRef, RefObject, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useDialogContext } from "./DialogContext";
import { toast } from "sonner";

interface ProjectLogType {
    // modal
    closeProjectLog: () => void,
    openProjectLog: () => void,
    projectLogRef: RefObject<HTMLDivElement | null>,
    showProjectLog: boolean,

    // setState
    setDescription: Dispatch<SetStateAction<string>>,
    setProjectName: Dispatch<SetStateAction<string>>,
    setShortSummary: Dispatch<SetStateAction<string>>,
    setTargetDate: Dispatch<SetStateAction<Date | null>>,
    setStartDate: Dispatch<SetStateAction<Date | null>>,
    setStatus: Dispatch<SetStateAction<string>>,
    setPriority: Dispatch<SetStateAction<string>>,

    // Project server actions
    createProject: () => Promise<void>,

    // Project Properties 
    startDate: Date | null,
    targetDate: Date | null,
    description: string, 
    shortSummary: string, 
    status: string,
    priority: string,
    cancelProject: () => void,
    loading: boolean
}

const ProjectLogContext = createContext<ProjectLogType | undefined>(undefined);


export function ProjectLogContextProvider({children}:{children: React.ReactNode}){


    const {openDialog, cancelDialog} = useDialogContext();    


    const projectLogRef = useRef<HTMLDivElement | null>(null);
    const [showProjectLog, setShowProjectLog] = useState<boolean>(false);
    


    // Project details
    const [description, setDescription] = useState<string>("");
    const [projectName, setProjectName] = useState<string>("");
    const [shortSummary, setShortSummary] = useState<string>("");
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [status, setStatus] = useState<string>("backlog");
    const [priority, setPriority] = useState<string>("no_priority");
    const [loading, setLoading] = useState<boolean>(false);


    const initialState = {
        description: "",
        projectName: "",
        shortSummary: "",
        targetDate: null,
        startDate: null,
        status: "backlog",
        priority: "no_priority",
     }


     const isInitialState = (
        initialState.description === description
        && initialState.projectName === projectName
        && initialState.shortSummary === shortSummary
        && initialState.targetDate === targetDate
        && initialState.startDate === startDate
        && initialState.status === status
        && initialState.priority === priority
     ) 


     


      useEffect(() => {

      function handleOutsideClick(event: MouseEvent) {

       const target = event.target as Node; 
       const comboboxDropdown = document.querySelector('[data-radix-popper-content-wrapper]');
     

        if (projectLogRef.current 
            && !projectLogRef.current.contains(target)
            && !(comboboxDropdown && comboboxDropdown.contains(target))
        
        ) {
           cancelProject();
        }
      }
    
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
   
    
  }, [showProjectLog]);


  const resetProjectDetails = () => {
            setDescription("");
            setProjectName("");
            setShortSummary("");
            setTargetDate(null);
            setStartDate(null);
            setStatus("backlog");
            setPriority("no_priority");
  }





    const createProject = async () => {



        const body = {
            name: projectName,
            description: description,
            shortSummary: shortSummary,
            startDate: startDate as Date ?? new Date(),
            targetDate: targetDate as Date ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: status,
            priority: String(priority)
        }
         setLoading(true);

        try {
           
            const response = await axios.post(`/api/projects`, body);
         
            if(response.status === 200){
                toast.success("Project created successfully!")
            }
           

        } catch(e){
            console.error("Failed to create project:",e);
            toast.error("Failed to create project!")
        }finally{
             closeProjectLog();
            setLoading(false);
        }
    }



    

    const openProjectLog = () => {
        setShowProjectLog(true);
    }

    const closeProjectLog = () => {
        setShowProjectLog(false);
        resetProjectDetails();
        cancelDialog();
    }

    const cancelProject = () => {
        if(!isInitialState){
            openDialog({      message:  "Are you sure want to cancel the project?", 
                              description:"All project settings will be lost permanantly.", 
                              type:"Proceed",
                              positiveFunction: closeProjectLog
                            });
            return;
        }

        setShowProjectLog(false);
    }


    const value = {
        closeProjectLog,
        openProjectLog,
        showProjectLog,
        projectLogRef,
        setDescription,
        setProjectName,
        setShortSummary,
        setTargetDate,
        setStartDate,
        setStatus,
        setPriority,
        createProject,
        startDate,
        targetDate,
        cancelProject,
        status,
        priority,
        shortSummary,
        description,
        loading

        
    }
    return <ProjectLogContext.Provider value={value}>{children}</ProjectLogContext.Provider>
}


export default function useProjectLogContext(){

    const context = useContext(ProjectLogContext);

    if(context === undefined){
        throw Error("context is not defined");
    }

    return context;
}
"use client";
import { createContext, useContext, useState, useEffect, useRef, RefObject, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { useDialogContext } from "./DialogContext";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project, ProjectBody, projectBodySchema } from "../types/project";
import { Status, Priority } from "../types/project";


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
    setStatus: Dispatch<SetStateAction<Status>>,
    setPriority: Dispatch<SetStateAction<Priority>>,

    // Project server actions
    cancelProject: () => void,

    // Project Properties 
    startDate: Date | null,
    targetDate: Date | null,
    description: string, 
    shortSummary: string, 
    status: Status,
    priority: Priority,
    addProjectTrigger: () => void,
 
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
    const [status, setStatus] = useState<Status>(Status.BACKLOG);
    const [priority, setPriority] = useState<Priority>(Priority.NO_PRIORITY);


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
            setStatus(Status.BACKLOG);
            setPriority(Priority.NO_PRIORITY);
  }



        


    const createProject = async ({
        name,
        description, 
        shortSummary,
        startDate,
        targetDate,
        status,
        priority,
    } : ProjectBody) => {

        try {

            const body = {
            name: name,
            description: description,
            shortSummary: shortSummary,
            startDate: startDate as Date ?? new Date(),
            targetDate: targetDate as Date ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: status,
            priority: String(priority)
        }

            const valid = projectBodySchema.safeParse(body);
            console.log(valid.success);
           
            const response = await axios.post(`/api/projects`, body, {timeout: 10000});

            if(!(response.status === 200)){
                throw new Error("Failed to create project!")
            }

            console.log(response);
            return response.data;
          
    }catch(e){
        console.log(e);
        throw new Error("Failed to create project!");
    }


    }

    const queryClient = useQueryClient();
    const projectMutation = useMutation({
        mutationFn: createProject,

        onMutate: async (newProject) => {
            
            await queryClient.cancelQueries({queryKey:["projects"]})
            const previousProjects =  queryClient.getQueryData<Project[]>(["projects"]);
            const optimisticProject = {
            projectId: Date.now().toString(),        // temp id
            memberId: 'temp-member',                 // temp
            role: 'OWNER',                           // or whatever default
            project: {
      id: Date.now().toString(),             // temp id
      name: newProject.name,
      shortSummary: newProject.shortSummary,
      description: newProject.description,
      startDate: newProject.startDate,
      targetDate: newProject.targetDate,
      status: newProject.status,
      priority: newProject.priority,
    }
  };

            queryClient.setQueryData(['projects'], (old : Project[] = []) => [...old, optimisticProject]);
            return {previousProjects}

        },
        onSuccess: async () => {
            toast.success("Project created sucessfully.");
        },
        onError: (err, _variables, context) => {
            if (context?.previousProjects) {
                queryClient.setQueryData(['projects'], context.previousProjects);
            }
            toast.error("Failed to create project!");
        }

    })


    const addProjectTrigger = () => {


        projectMutation.mutate({
            name: projectName,
            description: description,
            shortSummary: shortSummary,
            startDate: startDate as Date ?? new Date(),
            targetDate: targetDate as Date ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: status,
            priority: priority,
        })

        closeProjectLog();
        resetProjectDetails();
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
        startDate,
        targetDate,
        cancelProject,
        status,
        priority,
        shortSummary,
        description,
        addProjectTrigger

        
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
"use client"
import { IssuesIcon, OverviewIcon, PenIcon, ProjectIcon, SidbarToggleIcon } from "@/app/components/icons/WorkspaceIcons";
import { LinearButton } from "@/app/components/LinearButton";
import { useSidebar } from "@/app/context/SidebarContext";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Project } from "@/app/types/project";
import { useEffect, useState } from "react";
import { DatePicker } from "@/app/components/DatePicker";
import { Combobox } from "@/app/components/ComboBox";
import { statusOptions, priorityOptions } from "@/app/components/OptionsLists";
import { NoteIcon, StartDateIcon, TargetDateIcon } from "@/app/components/icons/ProjectProperyIcons";
import { BsArrowRight } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function ProjectIssues({params} : {params: Promise<{projectId: string}>}){

    const pathname = usePathname();

    const {projectId} =  React.use(params);
    const {openSideBar, openSidebarRef} = useSidebar();
   

    const [projectName, setProjectName] = useState<string>("");
    const [shortSummary, setShortSummary] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [createNote, setCreateNote] = useState<boolean>(false);
    const [note, setNote] = useState<string>("");
    const [currPage, setCurrPage] = useState<string>()

    const router = useRouter();


    const queryClient = useQueryClient();

    useEffect(()=> {

      
        const data : Project[] | undefined  = queryClient.getQueryData(['projects']);
        const projectData : Project | undefined  = data?.find((project: Project) => project.projectId === projectId);


        console.log(projectData?.project.shortSummary);
        console.log(projectData?.project.description);
        setProjectName(projectData?.project.name ?? "");
        setShortSummary(projectData?.project.shortSummary ?? "");
        setDescription(projectData?.project.description ?? "")

    
        setCurrPage(String(pathname.split("/").slice(-1)));

        console.log("Page name:",String(pathname.split("/").slice(-1)));

        
    },[]);

    const testName = "Sneiden";
    const randomNote = "asojdf asdf asdf asdf asdf asdf asdf asdf";
 


  
    const overviewOption = {
        value: "overview",
        label: "Overview",
        icon:  <OverviewIcon/>
    }

    const issuesOption = {
        value: "issues",
        label: "Issues",
        icon:  <IssuesIcon/>
    }


    return (
            <div>
                    <div className="h-10 border-b-[1px] border-neutral-800 px-4  md:px-8 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <button onClick={()=> openSideBar()} className="block  md:hidden text-white " ref={openSidebarRef}>
                                    <SidbarToggleIcon/>
                            </button>
                            <div className="hidden sm:flex items-center text-neutral-300 space-x-1">
                                <p className="text-xs md:text-sm">Projects</p>
                                <BsChevronRight size={8}/>
                            </div>
                            <div className="flex space-x-1 items-center">
                                <ProjectIcon/>
                                <p className="text-xs md:text-sm">{projectName}</p>
                            </div>
                             <div className="h-10 hidden sm:flex space-x-2 items-center px-4 border-b-[1px] text-xs border-neutral-800">
                                <LinearButton onClick={() => router.push(`/home/projects/${projectId}/overview`)} option={overviewOption} expand={true} lightup={currPage === "overview"}/>
                                <LinearButton onClick={() => router.push(`/home/projects/${projectId}/issues`)} option={issuesOption} expand={true} lightup={currPage === "issues"}/>
                            </div>
                        </div>
                       
                   </div>
                    <div className="sm:hidden h-10 flex space-x-2 items-center px-4 border-b-[1px] text-xs border-neutral-800">
                        <LinearButton onClick={() => router.push(`/api/home/projects/${projectId}/overview`)} option={overviewOption} expand={true} lightup={currPage === "overview"}/>
                        <LinearButton onClick={() => () => router.push(`/api/home/projects/${projectId}/issues`)} option={issuesOption} expand={true} lightup={currPage === "issues"}/>
                    </div>

                    <div className=" mt-10 w-full h-[80vh] flex flex-col py-15">
                        <div className="px-[7vw] sm:px-[10vw] md:px-[5vw] lg:px-[20vw] space-y-4">
                            <div className="p-2 rounded-lg bg-neutral-800 w-fit">
                                <ProjectIcon size="22px" className="text-neutral-50"/>
                            </div>

                            <div className="ml-1 mt-2 flex flex-col">
                                <input type="text" value={projectName} className="text-neutral-100 font-semibold text-2xl focus:outline-none focus:ring-0 focus:border-none" onChange={(e) => setProjectName(e.target.value)}/>
                                <input type="text" value={shortSummary} className="text-neutral-300 mt-2 font-light text-lg focus:outline-none focus:ring-0 focus:border-none" onChange={(e) => setShortSummary(e.target.value)}/>
                            
                            </div>
                                <div className="flex flex-col">
                                    <div className='h-10 mt-5 ml-2 md:flex-row md:flex md:justify-start md:items-center w-full space-x-4 '>
                                        <p className="text-neutral-400 text-sm font-light ">Properties</p> 
                                        <div className="mt-5 md:mt-0 flex justify-start items-center space-x-4">
                                            <Combobox expand={true} value={status} setValue={setStatus} type="status" options={statusOptions}/>
                                            <Combobox expand={true} value={priority} setValue={setPriority} type="priority" options={priorityOptions}/>
                                        </div>
                                        <div className="mt-3 md:mt-0 flex justify-start items-center space-x-2">
                                            <DatePicker expand={true} date={startDate} setDate={setStartDate} label="Start Date" icon={<StartDateIcon/>}/>
                                            <BsArrowRight size={15}/>
                                            <DatePicker expand={true} date={targetDate} setDate={setTargetDate} label="Target Date" icon={<TargetDateIcon/>}/>
                                        </div>
                                    </div> 

                                    {/* Note Box */}

                                    <motion.div
                                    initial={false}
                                    animate={{ height: createNote ? 400 : 200 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className={`w-[350px] sm:w-[540px] lg:w-[670px] border-neutral-800 border-[1px] h-[20vh] md:h-[25vh] mt-[10vh] rounded-lg md:mt-5 shadow-sm shadow-black`}>
                                          <div className="h-10 flex justify-between items-center font-light px-3 text-xs md:text-sm ">
                                            <p className="text-neutral-400 flex">Latest Note</p>
                                            <div className="w-30% space-x-1 flex justify-between text-neutral-400 items-center">
                                                <button className="px-3 py-1  md:mr-0  rounded hover:bg-neutral-700/30 hover:text-neutral-100">See all</button>
                                    
                                                <button className="flex items-center p-1 md:px-3 md:py-1 rounded hover:bg-neutral-700/30 hover:text-neutral-100" onClick={() => setCreateNote(!createNote)}>
                                                    <PenIcon/>
                                                    <p className="hidden md:block ml-1">New Note</p>
                                                </button>
                                                
                                            </div>
                                          </div>
                                          
                                        {
                                            <AnimatePresence>
                                            {createNote && (
                                            <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.1, ease: "easeOut" }}
                                            className="mx-3 md:mx-6 mt-3 bg-neutral-800/50 shadow-md shadow-black h-[50%] rounded-lg flex flex-col justify-between border-[1px]"
                                            >
                                                <textarea value={note} placeholder="New note..." className="text-neutral-300 resize-none mt-2 h-full p-6 font-light text-sm md:text-md focus:outline-none focus:ring-0 focus:border-none" onChange={(e) => setNote(e.target.value)}/>

                                              

                                                <div className='child border-neutral-700 border-t p-4 flex justify-end items-center space-x-2'>
                                                        <Button onClick={() => setCreateNote(false)}  size="sm" variant={"black"}>Cancel</Button>
                                                        <Button  size="sm" variant={"indigo"}>Post Note</Button>
                                                </div> 
                                                </motion.div>
                                                )}
                                        </AnimatePresence>
                                        }

                                          {/* Note info */}
                                          <div className={`mt-4 ${createNote ? "px-8" : "px-6"} w-full  flex justify-start space-x-1 items-center text-neutral-500 text-xs md:text-sm`}>
                                            <NoteIcon/>
                                            <p className="text-neutral-400">&#183;</p>
                                            <p>posted by</p>
                                            <p>{testName}</p>
                                            <p className="text-neutral-400">&#183;</p>
                                            <p>Just now</p>
                                          </div>

                                         <div className={`${createNote ? "px-9" : "px-6"} mt-4 text-neutral-300 text-sm`}>
                                            {randomNote}
                                         </div>
                                    </motion.div>
                                </div>

                                {/* Description */}

                                <div className="ml-2 mt-5">
                                    <p className="text-neutral-400 text-sm font-light ">Description</p>
                                    <input type="text" value={description} className="text-neutral-100 font-extralight mt-3 text-md focus:outline-none focus:ring-0 focus:border-none" onChange={(e) => setDescription(e.target.value)}/>
                                </div>  
                        </div>
                    </div>
            </div>


        )

}
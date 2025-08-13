"use client"
import { IssuesIcon, OverviewIcon, ProjectIcon, SidbarToggleIcon } from "@/app/components/icons/WorkspaceIcons";
import { LinearButton } from "@/app/components/LinearButton";
import { useSidebar } from "@/app/context/SidebarContext";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Project } from "@/app/types/zod/project";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useNewIssueContext from "@/app/context/NewIssueContext";
import { GoIssueTracks } from "react-icons/go";
import { issuePriorityOptions, issueStatusOptions } from "@/app/components/icons/IssuePropertyIcons";
import { OptionType } from "@/app/types/ui-types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


interface Issue {
    id: number, 
    name: string, 
    project: string, 
    status: string,
    priority: string,
    date: Date
}

export default function ProjectIssues({params} : {params: Promise<{projectId: string}>}){

    const pathname = usePathname();

    const {projectId} =  React.use(params);
    const {openSideBar, openSidebarRef} = useSidebar();
   

    const [projectName, setProjectName] = useState<string>("");
  
    const [currPage, setCurrPage] = useState<string>()

    const router = useRouter();

    const {openIssueLog} = useNewIssueContext();


    const queryClient = useQueryClient();

    useEffect(()=> {

        const data : Project[] | undefined  = queryClient.getQueryData(['projects']);
        const projectData : Project | undefined  = data?.find((project: Project) => project.projectId === projectId);


        console.log(projectData?.project.shortSummary);
        console.log(projectData?.project.description);
        setProjectName(projectData?.project.name ?? "");
    
        setCurrPage(String(pathname.split("/").slice(-1)));
        console.log("Page name:",String(pathname.split("/").slice(-1)));

        
    },[]);


  
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

    const testIssueList = [
    {
        id: 1,
        name: "asdf",
        project: "asdf",
        status: "backlog",
        priority: "no-priority",
        date: new Date("2025-07-19T10:00:00Z"),
        projectId: "asd"
    },
    {
        id: 2,
        name: "asdf",
        project: "asdf",
        status: "backlog",
        priority: "no-priority",
        date: new Date("2025-07-19T10:00:00Z"),
        projectId: "asd"
    },
    {
        id: 3,
        name: "asdf",
        project: "asdf",
        projectId: "asd",
        status: "duplicate",
        priority: "medium",
        date: new Date("2025-07-19T10:00:00Z")
    },
    {
        id: 4,
        name: "asdf",
        project: "asdf",
        projectId: "asd",
        status: "backlog",
        priority: "no-priority",
        date: new Date("2025-07-19T10:00:00Z")
    },
];




    return (
            <div className="flex flex-col h-full">
                <div className="flex flex-col flex-1">
                    <div className="h-10 border-b-[1px] border-neutral-800 px-4  md:px-8 flex justify-between items-center">
                        <div className="flex  items-center space-x-2">
                            <button onClick={()=> openSideBar()} className="block  md:hidden text-white " ref={openSidebarRef}>
                                    <SidbarToggleIcon/>
                            </button>
                            <div className="hidden sm:flex items-center text-neutral-300 space-x-1">
                                <p className="text-xs md:text-sm">Projects</p>
                                <BsChevronRight size={8}/>
                            </div>
                            <div className="flex space-x-1 items-center">
                                
                                <p className="text-xs md:text-sm">{projectName}</p>
                            </div>
                             <div className="h-10 hidden sm:flex space-x-2 items-center px-4 border-b-[1px] text-xs border-neutral-800">
                                <LinearButton onClick={() => router.push(`/home/projects/${projectId}/overview`)} option={overviewOption} expand={true} lightup={currPage === "overview"}/>
                                <LinearButton onClick={() => router.push(`/home/projects/${projectId}/issues`)} option={issuesOption} expand={true} lightup={currPage === "issues"}/>
                            </div>
                        </div>
                       
                   </div>
                    <div className="sm:hidden h-10 flex space-x-2 items-center px-4 border-b-[1px] text-xs border-neutral-800">
                        <LinearButton onClick={() => router.push(`/home/projects/${projectId}/overview`)} option={overviewOption} expand={true} lightup={currPage === "overview"}/>
                        <LinearButton onClick={() => () => router.push(`/home/projects/${projectId}/issues`)} option={issuesOption} expand={true} lightup={currPage === "issues"}/>
                    </div>

                     <div className=" h-10 flex space-x-2 items-center px-4 border-b-[1px] text-xs border-neutral-800">
                        
                     </div>

                    {
                        testIssueList.length > 0 
                            ? <ul className="grid grid-cols-1 w-full mt-5">
                                                    {testIssueList?.map( (issue: Issue)  => {
                                                        return <li key={issue.id} onClick={() => router.push(`/home/projects/${projectId}/issues/${issue.id}`)}>
                                                                     <div className="h-12 hover:bg-neutral-800">
                                                                    <div className="flex justify-between font-semibold text-xs h-full px-8 items-center text-neutral-100">
                                                                    <div className="flex justify-between items-center w-15">
                                                                        <GoIssueTracks className="text-neutral-500" size="20"/>
                                                                        {issue.name}
                                                                    </div>
                                                                    <div className="flex space-x-6 items-center">
                                                                        {/* Status */}
                                                                        <div>
                                                                            {issueStatusOptions.filter((option) => option.value === issue.status)
                                                                            .map((issue : OptionType) => {
                                                                                return <div key={issue.value}>
                                                                                    <HoverCard openDelay={0} closeDelay={0}>
                                                                                        <HoverCardTrigger>
                                                                                            {issue.icon}
                                                                                        </HoverCardTrigger>
                                                                                        <HoverCardContent  className="h-5 w-20 text-xs text-neutral-300 bg-neutral-800 flex justify-center items-center">
                                                                                                {issue.label}
                                                                                        </HoverCardContent>
                                                                                    </HoverCard>
                                                                                    </div>
                                                                            })
                                                                            }
                                                                        </div>

                                                                        {/* Priority */}
                                                                        <div>
                                                                            {issuePriorityOptions.filter((option) => option.value === issue.priority)
                                                                            .map((issue : OptionType) => {
                                                                                return <div key={issue.value}>
                                                                                        <HoverCard openDelay={0} closeDelay={0}>
                                                                                            <HoverCardTrigger>
                                                                                                {issue.icon}
                                                                                            </HoverCardTrigger>
                                                                                             <HoverCardContent  className="h-5 w-25 text-xs text-neutral-300 bg-neutral-800 flex justify-center items-center">
                                                                                                {issue.label}
                                                                                            </HoverCardContent>
                                                                                        </HoverCard>
                                                                                      </div>
                                                                            })
                                                                            }
                                                                        </div>
                                                                        
                                                                        {/* Project Name */}
                                                                        <div className="border-neutral-400 hover:text-neutral-400 border-[1px] px-2 py-[1px] rounded flex items-center">
                                                                            <ProjectIcon size="12"/>
                                                                            <p className="ml-1 text-xs font-light text-neutral-400">{issue.project}</p>
                                                                        </div>

                                                                        {/* IssueDate */}
                                                                        <p className="font-light text-neutral-500">{String(issue.date).slice(4,10)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    })}
                                </ul>
                            :<div className="w-full flex flex-col justify-center space-y-1 items-center mt-60 md:mt-70">
                                <Button onClick={() => openIssueLog()} size="sm" variant={"indigo"} className="mb-4">Create new Issue</Button>
                                <p className="text-md text-neutral-300">Add issues to the project</p>
                                <p className="text-xs text-neutral-500">Start building your project</p>
                            </div>
                    }
                </div>
                   
            </div>


        )

}
"use client";

import { ProjectIcon, SidbarToggleIcon } from "@/app/components/icons/WorkspaceIcons"
import { LinearButton } from "@/app/components/LinearButton";
import { useSidebar } from "@/app/context/SidebarContext";
import { useRouter } from "next/navigation";
import { GoIssueTracks } from "react-icons/go";
import useNewIssueContext from "@/app/context/NewIssueContext";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { OptionType } from "@/app/types/ui-types";
import { issuePriorityOptions, issueStatusOptions } from "@/app/components/icons/IssuePropertyIcons";


export default function Projects(){
    const {openIssueLog} = useNewIssueContext();
    const { openSideBar, openSidebarRef} = useSidebar();
    const router = useRouter();


    interface Issue {
    id: number, 
    name: string, 
    project: string, 
    status: string,
    priority: string,
    date: Date
}



    const allIssues = {
        label: "All Issues", 
        icon: <GoIssueTracks/>,
        value: "all issues"
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




    return <div className="z-100">     
                   <div className="h-10 border-b-[1px] border-neutral-800 px-4  md:px-8 flex justify-between items-center">
                        <div className="grid grid-cols-2 gap-x-px items-center">
                            <button onClick={() => openSideBar()} className="block  md:hidden text-white " ref={openSidebarRef}>
                                    <SidbarToggleIcon/>
                            </button>
                            <p className={`text-neutral-200 mt-1 font-light text-sm -ml-2 md:-ml-0 mb-[2px] md:mr-0`}>Issues</p>
                            <div className="hidden md:block ">
                              <LinearButton lightup={true} option={allIssues}/>
                            </div>
                        </div> 

                        <button onClick={openIssueLog} className="text-sm min-w-[5%] text-neutral-400 flex p-1 px-2 justify-between items-center rounded md:hover:bg-neutral-700/40">
                                <p className="text-neutral-400 text-xl md:text-md hover:bg-neutral-700/40 md:font-extralight hover:md:bg-none px-2 rounded md:px-0">+</p>
                                <p className="hidden md:block text-neutral-100 ml-2 font-extralight text-xs ">Add Issue</p>
                        </button>
                   </div>

                    {/* Filters */}
                    <div className="h-10 border-b-[1px] text-xs border-neutral-800">
                            
                    </div>

                     <div className=" md:hidden h-10 border-b-[1px] text-xs border-neutral-800">
                            
                    </div>

                
                        {
                        testIssueList.length > 0 
                            ? <ul className="grid grid-cols-1 w-full mt-5">
                                                    {testIssueList?.map( (issue: Issue)  => {
                                                        return <li key={issue.id} onClick={() => router.push(`/home/projects/${issue.project}/issues/${issue.id}`)}>
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
                                                                                        <HoverCardContent  className="h-5 w-20 text-xs px-2 py-1 border- text-neutral-300 rounded border-neutral-700 bg-neutral-800 flex justify-center items-center">
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
}
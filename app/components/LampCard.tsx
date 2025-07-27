import { FaPenToSquare } from "react-icons/fa6";
import { ProjectIcon, ViewsIcon } from "./icons/WorkspaceIcons";
import { GoIssueTracks } from "react-icons/go";
import { LinearButton } from "./LinearButton";
import { BarChart, FilterIcon } from "lucide-react";
import { OptionType } from "../types/ui-types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { issuePriorityOptions, issueStatusOptions } from "./icons/IssuePropertyIcons";
import {motion} from "motion/react"
import { Button } from "@/components/ui/button";
import { BacklogIcon, NoPriorityIcon, StartDateIcon, TargetDateIcon } from "./icons/ProjectProperyIcons";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar } from "recharts";
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig


const testIssueList = [
  {
    id: 1,
    name: "Fix login redirect bug",
    project: "Auth System",
    status: "backlog",
    priority: "high",
    date: new Date("2025-07-10T09:00:00Z"),
    projectId: "auth"
  },
  {
    id: 2,
    name: "Implement password reset flow",
    project: "Auth System",
    status: "in-progress",
    priority: "medium",
    date: new Date("2025-07-11T10:30:00Z"),
    projectId: "auth"
  },
  {
    id: 3,
    name: "Update landing page hero image",
    project: "Marketing Site",
    status: "done",
    priority: "low",
    date: new Date("2025-07-12T14:15:00Z"),
    projectId: "marketing"
  },
  {
    id: 4,
    name: "Refactor dashboard component",
    project: "Admin Panel",
    status: "backlog",
    priority: "no-priority",
    date: new Date("2025-07-13T08:45:00Z"),
    projectId: "admin"
  },
  {
    id: 5,
    name: "Fix broken links in footer",
    project: "Marketing Site",
    status: "done",
    priority: "low",
    date: new Date("2025-07-14T17:20:00Z"),
    projectId: "marketing"
  },
  {
    id: 6,
    name: "Add search to issues page",
    project: "Issue Tracker",
    status: "in-progress",
    priority: "high",
    date: new Date("2025-07-15T11:30:00Z"),
    projectId: "tracker"
  },
  {
    id: 7,
    name: "Upgrade database to Postgres 15",
    project: "Backend",
    status: "backlog",
    priority: "medium",
    date: new Date("2025-07-16T09:00:00Z"),
    projectId: "backend"
  },
  {
    id: 8,
    name: "Write unit tests for utils.js",
    project: "Core Utilities",
    status: "backlog",
    priority: "low",
    date: new Date("2025-07-17T15:00:00Z"),
    projectId: "core"
  },
  {
    id: 9,
    name: "Add dark mode toggle",
    project: "UI Library",
    status: "done",
    priority: "medium",
    date: new Date("2025-07-18T20:00:00Z"),
    projectId: "ui"
  },
  {
    id: 10,
    name: "Fix layout shift on mobile",
    project: "Marketing Site",
    status: "in-progress",
    priority: "high",
    date: new Date("2025-07-19T10:00:00Z"),
    projectId: "marketing"
  }
];

const backlogOption = {
    value: "backlog",
    icon: <BacklogIcon/>,
    label: "Backlog"
}

const noPriorityOption = {
    value: "no-priority",
    icon: <NoPriorityIcon/>,
    label: "No Priority"
}


function Landing() {
    const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]


    interface Issue {
            id: number, 
            name: string, 
            project: string, 
            status: string,
            priority: string,
            date: Date
        }

    const startDateOption = {
        value: "start-date",
        icon: <StartDateIcon/>,
        label: "Start Date"
    }

    const targetDateOption = {
        value: "targetDateOption",
        icon: <TargetDateIcon/>,
        label: "Target Date"
    }



     const allIssues = {
        label: "All Issues", 
        icon: <GoIssueTracks/>,
        value: "all issues"
    }

  return (
    <div className={`w-full overflow-x-hidden relative text-xl min-h-screen bg-black flex flex-col justify-start items-center`}>
        <div className="text-start  mt-32 z-10 ">
            <div className=" mt-10 text-5xl xl:text-6xl bg-clip-text text-transparent  font-medium  text-shadow-sm text-shadow-neutral-100/60  font-inter flex flex-col items-center  justify-center spacy-y-2 mx-2">
                <motion.h1
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:0.8 , ease:"easeIn"}}
                >Bugboard</motion.h1>

                <div className="flex flex-col mx-15 md:flex-row items-center mt-2 lg:mt-3 opacity-70 text-shadow-lg text-shadow-gray-300/20 md:text-shadow-neutral-300/30">
                     <motion.span 
                  initial={{opacity:0, }}
                  animate={{opacity:1}}
                  transition={{delay:1, duration:0.8 , ease:"easeIn"}} 
                  className="mt-2 text-lg md:text-xl md:mt-0 lg:text-2xl leading-none lg:font-extralight text-center font-light text-neutral-400 ">Your streamlined workspace for squashing bugs. 
                 </motion.span>
                </div>
               

                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:3, duration:0.8, ease:"easeOut"}}
                >
                    <Button variant={"outline"} className="text-neutral-200 mt-5 font-light bg-neutral-200 md:text-normal text-sm">Get started</Button>
                </motion.div>
                 
            </div>
        </div> 

        <div className="w-full flex flex-col relative sm:mt-5 ">

                {/* Tilted Plate */}
            <div className={`w-300  translate-y-[40px] right-1/2  translate-x-[160px] sm:translate-x-[180px] xl:translate-x-[40%]  h-150 flex justify-center text-xs italic bg-gradient-to-br border-l-[1px] border-t-[1px] border-neutral-800  from-neutral-black  via-neutral-950/80 to-neutral-950 opacity-70 shadow-xl shadow-neutral-300/30  rounded-lg 
                [transform:skewX(35deg)_skewY(-5deg)]`}>

                <div className="absolute  right-0 -bottom-3 w-30 h-full z-10 pointer-events-none 
                bg-gradient-to-r from-transparent to-neutral-950/50" />
                <div className="absolute -bottom-3 left-0 w-full h-100 z-10 pointer-events-none 
                bg-gradient-to-b from-transparent  to-black rounded-xl"/> 

                <div className="w-full h-full grid grid-cols-9 bg-black ">
                    <motion.div 
                    initial={{y:-100, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{delay:1.6,duration:1.5, ease:'easeInOut'}}
                    className="col-span-2 flex flex-col py-2 px-2">
                    <div className="w-full h-[5%] flex justify-between">
                            <div className="flex justify-center items-center">
                                <div className="h-3 w-3 p-4 flex justify-center items-center bg-neutral-800 rounded-lg">
                                <p className="-rotate-4">
                                    B
                                </p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>   
                            </div>

                             <div className='mr-2 w-[30%] flex justify-between px-2'>
                                <button className='p-2 rounded-xl flex flex-col justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                                 <div className="flex p-3 rounded-full bg-neutral-800 justify-center items-center">
                                        <FaPenToSquare/>
                                 </div>
                            </div>
                         </div>

                        <div>
                    </div>   

                    {/* My Issues */}
                    <div className="w-full flex justify-start h-[5%] items-center px-3 mt-10">
                        <div className="space-x-2 flex flex-row items-center">
                            <svg width="25px" height="25px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f1f1f1"><path d="M6 3H3V6" stroke="#f1f1f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 3H21V6" stroke="#f1f1f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6 21H3V18" stroke="#f1f1f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 21H21V18" stroke="#f1f1f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.5145 17.6913L16.5145 15.2913C16.8157 15.1106 17 14.7851 17 14.4338V10.5662C17 10.2149 16.8157 9.88942 16.5145 9.7087L12.5145 7.3087C12.1978 7.11869 11.8022 7.11869 11.4855 7.3087L7.4855 9.7087C7.1843 9.88942 7 10.2149 7 10.5662V14.4338C7 14.7851 7.1843 15.1106 7.4855 15.2913L11.4855 17.6913C11.8022 17.8813 12.1978 17.8813 12.5145 17.6913Z" stroke="#f1f1f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.5 10.5L12 12.9995M12 12.9995C12 12.9995 15.7637 10.9492 16.5 10.5M12 12.9995V17.5" stroke="#f1f1f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="text-[15px] text-neutral-50">My Issues</p>
                        </div>
                    </div>   

                    {/* Workspace */}
                    <div className="w-full flex justify-start h-[5%] items-center px-2 mt-10"> 
                         <div className="space-x-4 flex flex-row items-center">
                            <p className="text-[15px] text-neutral-500 text-sm font-semibold">Workspace</p>
                            <svg className="mr-3 mt-[2px] transition duration-100 ease-in-out rotate-90" width="12px" height="12px" viewBox="0 0 24 24" strokeWidth="1.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="#a9a9a9"><path fillRule="evenodd" clipRule="evenodd" d="M8.71299 18.6929C8.43273 18.5768 8.25 18.3033 8.25 18V5.99998C8.25 5.69663 8.43273 5.42315 8.71299 5.30707C8.99324 5.19098 9.31583 5.25515 9.53033 5.46965L15.5303 11.4696C15.8232 11.7625 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.31583 18.7448 8.99324 18.809 8.71299 18.6929Z" fill="#a9a9a9"></path></svg>
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="w-full flex justify-start h-[5%] items-center px-2 ml-4"> 
                         <div className="space-x-4 flex flex-row items-center">
                            <ProjectIcon/>
                            <p className="text-[15px] text-neutral-300 font-extralight">Projects</p>
                        </div>
                    </div> 

                    {/* Analytics */}
                    <div className="w-full flex justify-start h-[5%] items-center px-2 ml-4"> 
                         <div className="space-x-4 flex flex-row items-center">
                            <ViewsIcon/>
                            <p className="text-[15px] text-neutral-300 font-extralight">Analytics</p>
                        </div>
                    </div> 

                    <div className="w-full flex justify-start h-[5%] items-center px-2 mt-3"> 
                         <div className="space-x-4 flex flex-row items-center">
                            <p className="text-[15px] text-neutral-500 font-semibold text-sm">Collaboraters</p>
                            <svg className="mr-3 mt-[2px] transition duration-100 ease-in-out" width="12px" height="12px" viewBox="0 0 24 24" strokeWidth="1.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="#a9a9a9"><path fillRule="evenodd" clipRule="evenodd" d="M8.71299 18.6929C8.43273 18.5768 8.25 18.3033 8.25 18V5.99998C8.25 5.69663 8.43273 5.42315 8.71299 5.30707C8.99324 5.19098 9.31583 5.25515 9.53033 5.46965L15.5303 11.4696C15.8232 11.7625 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.31583 18.7448 8.99324 18.809 8.71299 18.6929Z" fill="#a9a9a9"></path></svg>
                        </div>
                    </div> 

                </motion.div>

                

                <motion.div 
                 initial={{y:200, opacity:0}}
                 animate={{y:0, opacity:1}}
                 transition={{delay:1.6, duration:1.5, ease:'easeInOut'}} 
                className="col-span-7">
                    <div className="bg-neutral-900 h-full w-full rounded">
                        <div className="h-[5%] border-b-[2px] border-neutral-800 flex flex-row justify-start space-x-4 items-center px-3">
                            <p>Issues</p>
                            <LinearButton lightup={true} option={allIssues} className="px-1 flex justify-between space-x-1 items-center border-neutral-700 border-[1px] bg-neutral-800 rounded"/>
                        </div>
                        <div className="h-[5%] border-b-[2px] border-neutral-800 px-3 flex flex-row justify-start space-x-4 items-center">
                            <FilterIcon size={15}/>
                        </div>

                         <ul className="grid grid-cols-1 w-full mt-5">
                                                    {testIssueList?.map( (issue: Issue)  => {
                                                        return <motion.li 
                                                                 initial={{x:400, opacity:0}}
                                                                 animate={{x:0, opacity:1}}

                                                                 transition={{delay:1.6+0.05*issue.id,duration:1.5, ease:'easeInOut'}}  
                                                                    key={issue.id}>
                                                                     <div className="h-12 ">
                                                                    <div className="flex justify-between font-semibold text-xs h-full px-8 items-center text-neutral-100">
                                                                    <div className="flex justify-between items-center space-x-2">
                                                                        <GoIssueTracks className="text-neutral-500" size="20"/>
                                                                        <p>{issue.name}</p>
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
                                                        </motion.li>
                                                    })}
                                </ul>
                            </div>
                    </motion.div>
                <div className="pointer-events-none absolute inset-0 z-0 blur-edge "></div>
                                                    
                </div>
                <div className="pointer-events-none absolute left-0 bottom-0 z-10 w-[400px] h-[100px] -translate-y-[20px] -translate-x-[50px] bg-black blur-xl">

                </div>
                <div className="pointer-events-none absolute right-0 bottom-0 z-10 w-[800px] h-[120px] translate-y-[100px] translate-x-[40px] bg-black blur-2xl">

                </div>
            </div>

        
            
        </div>

        

        <div className=" min-h-screen pt-[15vh] flex flex-col space-x-4 justify-start mt-[50px] w-full z-20 bg-gradient-to-b from-black to-neutral-950">
            <div className="w-full h-[10%] flex flex-col justify-start  text-center px-10">
               <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
            >
              Simple by design.
            </motion.h1>
                <p className="mt-2 text-lg md:text-xl lg:text-2xl leading-none lg:font-extralight text-center text-neutral-400 opacity-80">
                    So you can <span className="text-neutral-200 italic">focus</span> on what matters.
                </p>
            </div>


            <div className="relative flex justify-center items-center mt-[100px]">


               
                <div className="[transform:skewX(-30deg)_skewY(10deg)] blur-edge relative w-[320px] sm:w-[350px] md:w-[400px] lg:[w-500px] h-[450px] lg:h-[550px] bg-neutral-900 rounded-xl ">
                     {/* Overlays */}
                    <div className="absolute w-[120%] h-30 blur-sm   bg-gradient-to-b  -translate-y-[45px]   from-black to-neutral-900  top-0 "></div>
                    <div className="absolute w-[130%] h-20 blur-sm   bg-gradient-to-t  translate-y-[20px]     from-black to-neutral-900  bottom-0"></div> 
                    <div className="absolute h-[100%] w-40 blur-xl    bg-gradient-to-l  translate-x-[100px]     from-black to-neutral-900  right-0 "></div>
                    <div className="absolute h-[100%] w-40 blur-xl   bg-gradient-to-r    -translate-x-[100px] from-black to-neutral-900  left-0"></div>
                     {/* Card Content */}
                     <div className="flex flex-col justify-evenly space-y-4 py-5 px-7 mt-4">
                        <div className="flex px-2">
                            <div className=" text-neutral-100 bg-neutral-800 p-2 rounded flex justify-center items-center">
                               <GoIssueTracks/>                  
                            </div>
                        </div>
                        <div className="flex px-2 mt-2">
                            <h1 className="font-semibold text-neutral-500 animate-pulse z-20 ">Implement Core Bootstrapping Logic for Low-Level Runtime</h1>
                        </div>
                        <div className="flex flex-row px-2 space-x-3 mt-8">
                            <p className="text-sm font-light text-neutral-400 z-40 ">Properties</p>
                            <LinearButton option={backlogOption}/>
                            <LinearButton option={noPriorityOption}/>
                        </div>
                        <div className="flex flex-row px-2 mt-2">
                            <p className="text-sm font-light text-neutral-400 z-20">Description</p>

                        </div>
                         <div className="flex flex-row px-2 ">
                            <p className="text-sm font-light text-neutral-500 opacity-90 ">
                                Set up the foundational logic for initializing the runtime environment. The goal is to get the system to a minimal state where higher-level components can safely execute.
                            </p>
                        </div>
                    </div>                                                           
                </div>

            </div>

            
        </div>

        <div className=" min-h-screen pt-[15vh] flex flex-col space-x-4 justify-start  w-full  bg-gradient-to-b from-neutral-950 to-black">
            <div className="w-full h-[10%] flex flex-col justify-start  text-center px-10">
               <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-400">Explore Bugboard</span>
            </motion.h1>
                <p className="text-lg md:text-xl lg:text-2xl leading-none lg:font-extralight text-center text-neutral-400 opacity-80 mt-2">
                    Essential features to track, manage, and resolve bugs effortlessly.
                </p>
            </div>


            <div className="w-full grid grid-cols-1 xl:grid-cols-3 mt-6 px-20 text-center gap-x-2 md:space-y-2 place-items-center mb-20">
                <div className="flex flex-col justify-between space-y-5 mt-10">
                    <p className="font-semibold"><span className="text-transparent bg-clip-text bg-gradient-to-l from-neutral-200 via-neutral-300 to-neutral-400">Manage projects effectively</span></p>
                    <div className=" blur-edge flex  flex-col justify-center items-center relative w-[320px] sm:w-[350px] md:w-[400px] lg:[w-500px] h-[300px] lg:h-[400px] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl mt-2">
                        <div className="bg-neutral-900 w-[80%] h-[90%] rounded-br-xl rounded-tl-xl absolute top-0 left-0 shadow-sm shadow-neutral-700">
                            <div className="flex flex-col space-y-8 justify-start mt-20 w-full h-full">
                                <div className="w-full flex flex-row justify-center px-2 space-x-2">
                                    <LinearButton lightup={true} option={startDateOption} expand={true}/>
                                    <FaLongArrowAltRight/>
                                    <LinearButton lightup={true} option={targetDateOption} expand={true}/>
                                </div>
                                <div className="mr-5">
                                    <Button variant={"indigo"} size={"sm"}>Create Project</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>

                <div className="flex flex-col justify-between space-y-5 mt-10">
                    
                    <p className="font-semibold"><span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400">Invite Bugbuddies</span></p>
                    <div className=" blur-edge flex  flex-col justify-center items-center relative w-[320px] sm:w-[350px] md:w-[400px] lg:[w-500px] h-[300px] lg:h-[400px] bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl mt-2">
                        <div className="bg-neutral-900 w-[100%] h-[90%] rounded-br-xl rounded-tl-xl rounded-tr-xl absolute top-0 left-0 shadow-xs shadow-neutral-700">
                            <div className="relative flex w-full h-full">
                                <div className="absolute bg-neutral-950 h-[100%] w-[70%] left-0 -translate-x-[2px] rounded-bl-xl rounded-tl-xl shadow-sm shadow-neutral-700" >
                                    <div className="flex justify-evenly items-center flex-col mt-10">
                                       <div className="space-x-4 flex flex-row items-center">
                                       <p className="text-[15px] ml-8 text-neutral-500 font-semibold text-sm">Collaboraters</p>
                                       <svg className="ml-2 rotate-90 mt-[2px] transition duration-100 ease-in-out" width="12px" height="12px" viewBox="0 0 24 24" strokeWidth="1.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="#a9a9a9"><path fillRule="evenodd" clipRule="evenodd" d="M8.71299 18.6929C8.43273 18.5768 8.25 18.3033 8.25 18V5.99998C8.25 5.69663 8.43273 5.42315 8.71299 5.30707C8.99324 5.19098 9.31583 5.25515 9.53033 5.46965L15.5303 11.4696C15.8232 11.7625 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.31583 18.7448 8.99324 18.809 8.71299 18.6929Z" fill="#a9a9a9"></path></svg>
                            
                                       </div>
                                       <div className="flex mt-5 flex-col justify-center space-y-3">
                                           {["Samuel", "Kenna", "Mearl"].map((name:string)=>{
                                            return <div key={name} className="flex w-full items-center">
                                                        <div className="p-2 h-8 w-8 text-sm border-neutral-500 border-[1px] flex justify-center items-center rounded-full bg-neutral-700/80 shadow-xs shadow-neutral-400">{name.slice(0,1)}</div>
                                                        <p className="ml-3 text-neutral-300">{name}</p>
                                                    </div>
                                       })}
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                </div>

                <div className="flex flex-col justify-between space-y-5 mt-10">
                     <p className="font-semibold"><span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400">Neat Analytics</span></p>
                    <div className=" blur-edge flex  flex-col justify-center items-center relative w-[320px] sm:w-[350px] md:w-[400px] lg:[w-500px] h-[300px] lg:h-[400px] bg-gradient-to-bl from-neutral-800 to-neutral-900 rounded-xl mt-2">
                        <div className="bg-neutral-900 w-[80%] h-[90%]  rounded-bl-xl absolute top-0 right-0 shadow-sm shadow-neutral-700">
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-10 opacity-90">
                                <BarChart  data={chartData}>
                                    
                                 <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
                                 <Bar dataKey="mobile" fill="var(--color-mobile)" radius={5} />
                                </BarChart>
                            </ChartContainer>
                            
                        </div>
                    </div>
                    
                </div>
                
       
                 
            </div>

            <div className="w-full h-[10vh] flex justify-center items-center border-neutral-700/80 border-t-[1px] px-2">
                <div className="flex flex-row justify-between px-1 sm:w-[90%] md:w-[80%] text-xs md:text-md text-neutral-500">
                        <div>
                           <p className="whitespace-nowrap font-semibold">{"© 2025 Bugboard"}</p>
                        </div>

                        <div className="flex ml-5 flex-row justify-start space-x-2 whitespace-nowrap">
                           <p>{"About"}</p>
                            <p>|</p>
                            <p className="">{"Terms and Conditions"}</p>
                            <p>|</p>
                            <p>{"Privacy"}</p>
                        </div>
                </div>
            </div>
        </div>
    </div>


  ) 
  
}

export default Landing;



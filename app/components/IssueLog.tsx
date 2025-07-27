'use client';
import React, { useEffect, useRef } from 'react';
import useNewIssueContext from '../context/NewIssueContext';
import {motion} from "motion/react";
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import GreenProfile from './icons/profile-green-logo';
import { Button } from '@/components/ui/button';
import { Combobox } from './ComboBox';
import { ProjectIcon } from './icons/WorkspaceIcons';
import { issuePriorityOptions, issueStatusOptions } from './icons/IssuePropertyIcons';


const IssueLog = () => {
  const { visible, closeIssueLog } = useNewIssueContext();
  const issueRef = useRef<HTMLDivElement | null>(null);
  const [expand, setExpand] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [project, setProject] = useState<string>("");


  const projectList = [
    {value:"no-project", label:"No project", icon:<ProjectIcon/>},
    {value:"asdfasdf", label:"aasdfsdf", icon:<ProjectIcon/>},
    {value:"asdasdff", label:"asdasdff", icon:<ProjectIcon/>},
    {value:"asdsadff", label:"aasdfsdf", icon:<ProjectIcon/>},
    {value:"aasdfsdf", label:"aasdfsdf", icon:<ProjectIcon/>},
  ]


  useEffect(()=>{

    if(!visible) return;

    function HandleOutsideIssueLog(event: Event){
         const comboboxDropdown = document.querySelector('[data-radix-popper-content-wrapper]');
         const target = event.target as Node
        if(issueRef.current && !issueRef.current.contains(target)  && !(comboboxDropdown && comboboxDropdown.contains(target))){
            closeIssueLog();
        }
      }    

        document.addEventListener("click", HandleOutsideIssueLog);
        return () => document.removeEventListener("click", HandleOutsideIssueLog);

  },[visible]);

  if (!visible) return;

       return (
        <AnimatePresence>
            <motion.div 
            initial={{ opacity: 0, scale: 0.95, height: "95%" }}
            animate={{ opacity: 1, scale: 1, height: expand ? "90%" : "50%" }}
            exit={{ opacity: 0, scale: 0.95, height: "95%"
             }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            ref={issueRef}
            className={`fixed  w-[90%] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 md:w-[40%] md:-translate-x-1/3 lg:-translate-x-1/2  border-neutral-700 border-[1px] bg-black z-1500 rounded-xl`}
            >
                <div className='w-full h-full bg-neutral-800/80  rounded-xl flex flex-col justify-start px-3 '>
                     <div className='flex justify-between items-center px-2 md:px-5 mt-2 py-2'>
                        <div className='max-w-12%  flex justify-between items-center '>
                            <GreenProfile height={15} width={15}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3 text-neutral-300 ml-1 opacity-60">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                            <div className='text-sm text-neutral-200 ml-1 font-extralight'>
                                New Issue
                            </div>
                        </div>

                        <div className='flex justify-end space-x-2'>
                            <button onClick={() => setExpand(!expand)} className=" text-neutral-400 p-1 rounded hover:bg-neutral-700 hover:font-semibold hover:text-neutral-200 transition ease-in">
                            {expand 
                            ? <svg width="16" height="16" viewBox="0 0 16 16" fill="lch(64.892% 1.933 272 / 1)" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M2.22 12.72a.75.75 0 1 0 1.06 1.06L5.5 11.5l1.25 1.25A.75.75 0 0 0 7.5 12V9.25a.75.75 0 0 0-.75-.75H4a.75.75 0 0 0-.75.75L4 10l.5.5-2.28 2.22Z"></path><path d="M13.78 3.28a.75.75 0 0 0-1.06-1.06L10.5 4.5 9.25 3.25A.75.75 0 0 0 8.5 4v2.75c0 .414.336.75.75.75H12a.75.75 0 0 0 .75-.75L12 6l-.5-.5 2.28-2.22Z"></path></svg>
                            : <svg width="16" height="16" viewBox="0 0 16 16" fill="lch(64.892% 1.933 272 / 1)" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M7.28 8.72a.75.75 0 0 1 0 1.06L5 12l1.25 1.25a.75.75 0 0 1-.75.75H2.75a.75.75 0 0 1-.75-.75V10.5a.75.75 0 0 1 .75-.75L4 11l2.22-2.28a.75.75 0 0 1 1.06 0ZM8.72 7.28a.75.75 0 0 1 0-1.06L11 4 9.75 2.75A.75.75 0 0 1 10.5 2h2.75a.75.75 0 0 1 .75.75V5.5a.75.75 0 0 1-.75.75L12 5 9.78 7.28a.75.75 0 0 1-1.06 0Z"></path></svg>
                            }
                           </button>

                          <button onClick={closeIssueLog} className=" text-neutral-400 p-1 rounded hover:bg-neutral-700 hover:font-semibold hover:text-neutral-200 transition ease-in">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                              </svg>
                          </button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <div className='child mx-6 mt-2 '>
                          <input onChange={(e) => console.log(e.target.value)}  type="text" placeholder='Issue title' className='bg-transparent h-full w-full p-2 text-2xl  text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:text-neutral-500'/>
                        </div>

                      <div className={`child mx-6 ${expand ? "h-[40vh]": "h-[15vh]"}`}>
                          <textarea  onChange={(e) => console.log(e.target.value)} placeholder='Description' className='bg-transparent resize-none h-full w-full p-2 text-md  font-light text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:text-neutral-500'/>
                      </div>
                    </div>

                     <div className='child flex flex-col justify-end flex-1'>
                         <div className='h-10 mt-5 md:mt-10 px-8 flex justify-start w-full space-x-4'>
                            <Combobox expand={true} value={status} setValue={setStatus} type="status" options={issueStatusOptions}/>
                            <Combobox expand={true} value={priority} setValue={setPriority} type="priority" options={issuePriorityOptions}/>
                            <Combobox expand={true} value={project} setValue={setProject} type="project" options={projectList}/>
                    </div>

                        <div className='border-t min-h-15 border-neutral-700 flex justify-end items-center space-x-2 p-4'>
                            <Button onClick={()=> console.log("Cancel")} size="sm" variant={"black"}>Cancel</Button>
                            <Button onClick={()=> console.log("Create Project")} size="sm" variant={"indigo"}>Create Issue</Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    
  );
};

export default IssueLog;




                     

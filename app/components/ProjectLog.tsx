'use client';
import React from 'react';
import {motion, AnimatePresence} from "motion/react";
import useProjectLogContext from '../context/ProjectLogContext';
import GreenProfile from './icons/profile-green-logo';
import { ProjectIcon } from './icons/WorkspaceIcons';
import {Button} from "@/components/ui/button";
import { Combobox } from './ComboBox';
import { priorityOptions, statusOptions } from './OptionsLists';
import { DatePicker } from './DatePicker';
import { StartDateIcon, TargetDateIcon } from './icons/ProjectProperyIcons';




const ProjectLog = () => {
  
  
  const {showProjectLog,
         projectLogRef,
         setDescription,
         setProjectName,
         setShortSummary,
         setStatus,
         setPriority,
         targetDate,
         startDate,
         setTargetDate,
         setStartDate,
         status,
         priority,
         addProjectTrigger,
         cancelProject
    
        } = useProjectLogContext();



  if(!showProjectLog) return;

  return (
        <AnimatePresence>
            <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            ref={projectLogRef}
            className="fixed h-[90%]  w-[90%] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 md:w-[50%] md:-translate-x-1/3 lg:-translate-x-1/2  border-neutral-700 border-[1px] bg-black z-100 rounded-xl"
            >
                <div className='w-full h-full bg-neutral-800/80 rounded-xl flex flex-col'>

                    {/* top */}
                    <div className='h-10 flex justify-between items-center px-5 mt-2'>
                        <div className='max-w-12% flex justify-between items-center'>
                            <GreenProfile height={15} width={15}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3 text-neutral-300 ml-1 opacity-60">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                            <div className='text-sm text-neutral-200 ml-1 font-extralight'>
                                New project
                            </div>
                        </div>

                        <button onClick={cancelProject} className=" text-neutral-400 p-1 rounded hover:bg-neutral-700 hover:font-semibold hover:text-neutral-200 transition ease-in">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    {/* projectIcon */}
                    
                        <div className='ml-8 md:ml-10 mt-10 p-1 h-6 w-6 border-neutral-700 border-[1px] flex justify-center rounded items-center'>
                            <ProjectIcon className='text-neutral-300'/>
                        </div>       

                    {/* Description Input */}
                    <div className='child mx-6 md:mx-8 mt-2 h-12 '>
                        <input onChange={(e) => setProjectName(e.target.value)}  type="text" placeholder='Project name' className='bg-transparent h-full w-full p-2 text-2xl  text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:font-semibold placeholder:text-neutral-500'/>
                    </div>

                    <div className='child mx-6 md:mx-8 h-6'>
                        <input onChange={(e) => setShortSummary(e.target.value)} type="text" placeholder='Add a short summary' className='bg-transparent h-full w-full p-2 text-md  font-light text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:text-neutral-500'/>
                    </div>

                    <div className='h-10 mt-5 md:mt-10 px-8 flex justify-start w-full space-x-4'>
                            <Combobox value={status} setValue={setStatus} type="status" options={statusOptions}/>
                            <Combobox value={priority} setValue={setPriority} type="priority" options={priorityOptions}/>
                            <DatePicker date={startDate} setDate={setStartDate} label="Start Date" icon={<StartDateIcon/>}/>
                            <DatePicker date={targetDate} setDate={setTargetDate} label="Target Date" icon={<TargetDateIcon/>}/>
                    </div>

                    <div className='h-[0.5px] mt-2 border-neutral-700 border-b-[0.5px] mx-7 md:mx-8'></div>

                    <div className='child mx-6 md:mx-8 mt-5 md:mt-7 flex-grow'>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Write a description, a project brief, or collect ideas'
                        className='bg-transparent h-full w-full p-2 text-md font-light text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:text-neutral-500 placeholder:font-light placeholder:md:text-md placeholder:text-sm resize-none'
                    />
                    </div> 
                    <div className='child border-neutral-700 border-t p-4 flex justify-end items-center space-x-2'>
                        <Button onClick={cancelProject} size="sm" variant={"black"}>Cancel</Button>
                        <Button onClick={addProjectTrigger} size="sm" variant={"indigo"}>Create Project</Button>
                    </div>
                </div> 
                
            </motion.div>
     
        </AnimatePresence>
    
  );
};

export default ProjectLog;




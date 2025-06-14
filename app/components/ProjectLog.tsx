'use client';
import React,{ useEffect, useRef} from 'react';
import {motion} from "motion/react";
import useProjectLogContext from '../context/ProjectLogContext';
import GreenProfile from './icons/profile-green-logo';
import { ProjectIcon } from './icons/WorkspaceIcons';
import PropertySelectorButton from './PropertySelectorButton';
import {Button} from "@/components/ui/button";


const ProjectLog = () => {
  
  const searchRef = useRef<HTMLDivElement | null>(null);
  const {showProjectLog, closeProjectLog} = useProjectLogContext();


  useEffect(() => {
      function handleOutsideClick(event: MouseEvent) {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            closeProjectLog();
        }
      }
    
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
   
    
  }, [showProjectLog]);




  if(!showProjectLog) return;

  

  return (

        <motion.div 
            className="fixed left-[5vw] md:left-[280px] md:w-[calc(100vw-280px)] h-screen pointer-events-none z-100 bg-opacity-20 boreder-neutral-400"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            ref={searchRef}
            >
            <div className="absolute bottom-1/5 md:top-2/5 md:left-2/5 w-[90vw] md:w-[65vw] lg:w-[50vw] parent h-[85vh] md:-translate-x-1/2 md:-translate-y-1/2 border-neutral-700 border-[1px] bg-black rounded-xl  flex flex-col justify-between items-center pointer-events-auto">
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

                        <button onClick={closeProjectLog} className=" text-neutral-400 p-1 rounded hover:bg-neutral-700 hover:font-semibold hover:text-neutral-200 transition ease-in">
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
                        <input type="text" placeholder='Project name' className='bg-transparent h-full w-full p-2 text-2xl  text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:font-light placeholder:text-neutral-500'/>
                    </div>

                    <div className='child mx-6 md:mx-8 h-6'>
                        <input type="text" placeholder='Add a short summary' className='bg-transparent h-full w-full p-2 text-md  font-light text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:text-neutral-500'/>
                    </div>

                    <div className='h-10 mx-8 md:mx-10 mt-4 flex md:max-w-[55%] justify-start space-x-3'>
                        <PropertySelectorButton propertyType='Status'/>
                        <PropertySelectorButton/>
                        <PropertySelectorButton collapseLG={true}/>
                        <PropertySelectorButton collapseLG={true}/>
                        <PropertySelectorButton collapseLG={true}/>
                    </div>

                    <div className='h-[0.5px] mt-2 border-neutral-700 border-b-[0.5px] mx-7 md:mx-8'></div>

                    <div className='child mx-6 md:mx-8 mt-7 flex-grow'>
                    <textarea
                        placeholder='Write a description, a project brief, or collect ideas'
                        className='bg-transparent h-full w-full p-2 text-md font-light text-neutral-100 outline-none focus:outline-none focus:ring-0 placeholder:text-neutral-500 placeholder:font-light resize-none'
                    />
                    </div> 
                    <div className='child border-neutral-700 border-t p-4 flex justify-end items-center space-x-2'>
                        <Button onClick={closeProjectLog}>Cancel</Button>
                        <Button onClick={closeProjectLog}>Create Project</Button>
                    </div>
                </div> 
                
            </div>
        </motion.div>
    
  );
};

export default ProjectLog;

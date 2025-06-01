'use client';
import React, { useEffect, useRef } from 'react';
import useNewIssueContext from '../context/NewIssueContext';
import {motion} from "motion/react";
import CubeScan from 'iconoir/icons/cube-scan.svg';



const IssueLog = () => {
  const { visible, closeIssueLog } = useNewIssueContext();
  const issueRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    function HandleOutsideIssueLog(event: Event){
        if(issueRef.current && !issueRef.current.contains(event.target as Node)){
            closeIssueLog();
        }
      }

        document.addEventListener("click", HandleOutsideIssueLog);

        return () => document.removeEventListener("click", HandleOutsideIssueLog);
    
  },[visible]);

  if (!visible) return;

  return (

        <motion.div 
            className="fixed left-[280px] w-[calc(100vw-280px)] h-screen pointer-events-none z-50 bg-opacity-50 border-neutral-400"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            ref={issueRef}
            >
            <div className="absolute top-1/3 left-1/2 w-[40vw] h-[30vh] border-neutral-700 border-[1px] -translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-xl p-5 flex justify-between">
                 <div className='w-full flex flex-row justify-end'>
                  
                 </div>
            </div>
        </motion.div>
    
  );
};

export default IssueLog;

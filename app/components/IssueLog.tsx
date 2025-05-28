'use client';
import React from 'react';
import useNewIssueContext from '../context/NewIssueContext';
import {motion} from "motion/react";

const IssueLog = () => {
  const { visible, closeIssueLog } = useNewIssueContext();

  if (!visible) return null;

  return (

        <motion.div 
            className="fixed left-[280px] w-[calc(100vw-280px)] h-screen pointer-events-none z-50 bg-opacity-50 boreder-neutral-400"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}

            >
            <div className="absolute top-1/2 left-1/2 w-[50vw] h-[50vh] -translate-x-1/2 -translate-y-1/2 bg-neutral-700 rounded-xl p-5 flex justify-between items-center pointer-events-auto">
                <h1 className="text-white text-4xl">Issue Log</h1>
                <button className="text-6xl text-white" onMouseDown={closeIssueLog}>×</button>
            </div>
        </motion.div>
    
  );
};

export default IssueLog;

"use client";
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion' // use framer-motion, not "motion"
import { useSidebar } from '../context/SidebarContext'
import SidebarContent from './SidebarContent'
import { useEffect, useState} from 'react';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {open, sidebarRef} = useSidebar();

  return (
    <AnimatePresence>
      {isMobile ? (
         open && 
            <motion.div
            initial={{ x: -250 }}    // starts hidden to the left
            animate={{ x: 0 }}       // slides in to position
            exit={{ x: -250 }}       // slides out to the left
            transition={{ type: "tween", duration: 0.1 }} // smooth transition
            ref={sidebarRef} 
          >
            {<SidebarContent/>}
            </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <SidebarContent/>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


export default Sidebar;
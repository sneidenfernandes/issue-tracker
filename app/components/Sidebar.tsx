"use client";
import React, { useState, useEffect, useRef , ReactNode} from 'react'
import { useSession } from 'next-auth/react';
import Dropdown from './Dropdown';
import Link from 'next/link';
import useNewIssueContext from '../context/NewIssueContext';
import useSearchContext from '../context/SearchContext';
import {motion, AnimatePresence} from "motion/react";
import { ProjectIcon,ViewsIcon } from './icons/WorkspaceIcons';




const Sidebar = () => {

    const [dropdown, setDropdown] = useState<boolean>(false);
    const {data:session} = useSession();
    const {openIssueLog} = useNewIssueContext();
    const {openSearch} = useSearchContext();


    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const workspaceSubItems = [
        {name: "Projects", link: "/home/projects", icon: <ProjectIcon/>},
        {name: "Views", link: "/home/views", icon: <ViewsIcon/>},
    ];

    const collaboraterNames = [
        {name: "John", link: "/random"},
        {name: "Jane", link: "/random"}
    ]

 
    
    useEffect(()=>{

        const handleOutsideclick = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideclick);

        return () => document.removeEventListener("mousedown", handleOutsideclick)

    },[dropdownRef]);

    

  return (
    <div className='w-70 rounded-xl bg-neutral-900  flex-col justify-start items-center h-screen fixed top-0 flex'>
        <div className='w-full px-2 flex text-xs flex-row justify-between text-neutral-400 mt-[2vh] items-center rounded'>
            <div className='flex flex-row hover:bg-neutral-800 p-2 rounded' onClick={()=> setDropdown(!dropdown)}>
                <div className='rounded-md w-6 h-6  bg-neutral-600 flex justify-center items-center mr-1 text-white'>{session?.user?.name?.slice(0,1)}</div>
                
                <button className='flex items-center'>
                    <p className='ml-1'>{session?.user?.name}</p>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

             
                
                <div></div>
            </div>

            {dropdown && <Dropdown ref={dropdownRef}/>}
            

             <div className='mr-2 w-[30%] flex justify-evenly' >
                <button className='hover:text-neutral-200 hover:bg-neutral-800 p-2 rounded-xl flex flex-col justify-center' onClick={openSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

                <button className='mb-1 text-white hover:text-neutral-100 bg-neutral-700 p-2 rounded-xl flex- flex-col justify-center' onClick={openIssueLog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
             </div>
            

        </div>

        <ul className='text-neutral-400 w-full space-y-3 flex flex-col justify-start mt-[2vh]'>
            <li className='ml-3 flex text-sm bg-neutral-800 w-[90%] rounded py-2 flex-col justify-center text-neutral-300'>
                <div className='ml-2  flex justify-start w-[65%]'>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f1f1f1"><path d="M6 3H3V6" stroke="#f1f1f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 3H21V6" stroke="#f1f1f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 21H3V18" stroke="#f1f1f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 21H21V18" stroke="#f1f1f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.5145 17.6913L16.5145 15.2913C16.8157 15.1106 17 14.7851 17 14.4338V10.5662C17 10.2149 16.8157 9.88942 16.5145 9.7087L12.5145 7.3087C12.1978 7.11869 11.8022 7.11869 11.4855 7.3087L7.4855 9.7087C7.1843 9.88942 7 10.2149 7 10.5662V14.4338C7 14.7851 7.1843 15.1106 7.4855 15.2913L11.4855 17.6913C11.8022 17.8813 12.1978 17.8813 12.5145 17.6913Z" stroke="#f1f1f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 10.5L12 12.9995M12 12.9995C12 12.9995 15.7637 10.9492 16.5 10.5M12 12.9995V17.5" stroke="#f1f1f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    <p className='ml-3 '><Link href={"/home/dashboard"}>My Issues</Link></p> 
                </div>
            </li>

            <SidebarLink name="Workspace" subItems={workspaceSubItems}/> 
            <SidebarLink name="Collaboraters" subItems={collaboraterNames}/>
            
           
        </ul>
        
    </div>
  )
}



export default Sidebar;


interface subItemType {
    name  : string, 
    link  : string
    icon? : ReactNode
}

interface sidebarLinkType{
    name: string,
    subItems: subItemType[]
}





function SidebarLink({name, subItems}: sidebarLinkType){
    const [open, setOpen] = useState<boolean>(false);  
    
    const variants = {
        closed: {
            height:0,
            opacity:0,
            transition: {duration: 0.2, ease: "easeInOut"}
        },
        opened: {
            height:"auto",
            opacity: 1,
            transition: {duration: 0.2, ease: "easeInOut"}
        }
    }

    return <li>
                <div className={`ml-3 flex flex-col `}>
                    <div className='flex text-xs scale-0.9 hover:bg-neutral-800 w-[90%] rounded py-2 justify-start' onClick={()=>setOpen(!open)}>
                        <p className='px-4'>{name}</p> 
                        <svg className={`-ml-3 mt-[2px] transition duration-150 ease-in-out ${open ? "rotate-90" : ""}`} width="12px" height="12px" viewBox="0 0 24 24" stroke-width="1.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="#a9a9a9"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.71299 18.6929C8.43273 18.5768 8.25 18.3033 8.25 18V5.99998C8.25 5.69663 8.43273 5.42315 8.71299 5.30707C8.99324 5.19098 9.31583 5.25515 9.53033 5.46965L15.5303 11.4696C15.8232 11.7625 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.31583 18.7448 8.99324 18.809 8.71299 18.6929Z" fill="#a9a9a9"></path></svg>
                    </div>
                    
                   <AnimatePresence initial={false}>
                    {
                    open && (
                        <motion.ul 
                        className='ml-6'
                        initial = "closed"
                        animate = "opened"
                        exit = "closed"
                        variants={variants}
                        >
                            {subItems.map(({name,link,icon})=>{
                                return <li key={name} className='text-sm py-1 font-light flex items-center text-neutral-300'>
                                        <div className='hover: text-white'>
                                            {icon} 
                                        </div>
                                        <Link className='ml-3' href={link}>{name}</Link>
                                        </li>
                            })}
                        </motion.ul>
                    )
                    }
                    </AnimatePresence>
    
                </div>           
                
            </li>
}




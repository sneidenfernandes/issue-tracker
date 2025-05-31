"use client";
import React, { useState, useEffect, useRef } from 'react'
import BugboardLogo from './icons/BugboardLogo'
import { useSession } from 'next-auth/react';
import Dropdown from './Dropdown';
import Link from 'next/link';
import useNewIssueContext from '../context/NewIssueContext';
import useSearchContext from '../context/SearchContext';

const Sidebar = () => {

    const [dropdown, setDropdown] = useState<boolean>(false);
    const {data:session} = useSession();
    const {openIssueLog} = useNewIssueContext();
    const {openSearch} = useSearchContext();


    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
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
        <div className='pt-5'>
            <BugboardLogo/>
        </div>
        <div className='w-full px-2 flex text-xs flex-row justify-between text-neutral-400 mt-[2vh] items-center '>
            <div className='flex flex-row'>
                <div className='rounded-md w-6 h-6  bg-neutral-600 flex justify-center items-center mr-1 text-white'>{session?.user?.name?.slice(0,1)}</div>
                
                <button onClick={()=> setDropdown(!dropdown)} className='font-semibold'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                
                
            </div>

            {dropdown && <Dropdown ref={dropdownRef}/>}
            

             <div className='mr-2 w-[30%] flex justify-evenly' >
                <button className='hover:text-neutral-200 hover:bg-neutral-700 p-1 rounded' onClick={openSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

                <button className='mb-1 hover:text-neutral-200 hover:bg-neutral-700 p-1 rounded ' onClick={openIssueLog}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
             </div>
            

        </div>

        <ul className='text-neutral-300 w-full space-y-3 flex flex-col justify-start mt-[2vh]'>
            <li className='ml-2 flex text-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mb-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <p className='ml-3 mb-1'><Link href={"/home/dashboard"}>Dashboard</Link></p> 
            </li>

            <li className='ml-2 flex text-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mb-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                <p className='ml-3 mb-1'><Link href={"/home/issues"}>Issues</Link></p> 
            </li>
        </ul>
        
    </div>
  )
}

export default Sidebar

"use client";
import React, { useState, useEffect, useRef } from 'react'
import BugboardLogo from './icons/BugboardLogo'
import { useSession } from 'next-auth/react';
import Dropdown from './Dropdown';

const Sidebar = () => {

    const [dropdown, setDropdown] = useState<boolean>(false);

    const {data:session} = useSession();
    console.log(session);


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
    <div className='h-screen min-w-70 rounded-xl bg-neutral-900 fixed left-0 z-200 flex flex-col justify-start items-center'>
        <div className='w-full px-2'>
            
        </div>
        <BugboardLogo/>
        <div className=' w-full px-2 flex text-xs flex-row justify-between text-neutral-400 mt-[2vh] items-center relative'>
            <div className='flex flex-row'>
                <div className='rounded-md w-6 h-6  bg-neutral-600 flex justify-center items-center mr-1 text-white'>{session?.user?.name?.slice(0,1)}</div>
                
                <button onClick={()=> setDropdown(!dropdown)} className='font-semibold'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                
                
            </div>

            {dropdown && <Dropdown ref={dropdownRef}/>}
            

             <div className='mr-2 w-[30%] flex justify-evenly'>
                <button className='hover:text-neutral-200 hover:bg-neutral-700 p-1 rounded'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

                <button className='mb-1 hover:text-neutral-200 hover:bg-neutral-700 p-1 rounded '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
             </div>
            

        </div>

        <div>
            {}
        </div>
        
    </div>
  )
}

export default Sidebar

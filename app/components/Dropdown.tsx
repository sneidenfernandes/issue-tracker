import { useSession, signOut } from 'next-auth/react'
import {motion} from "motion/react";

import React from 'react'


interface DropdownInput {
    ref: React.Ref<HTMLDivElement | null>
}

const Dropdown = ({ref}: DropdownInput) => {
    const {data:session} = useSession();
    

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.90 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    ref={ref} id="dropdown" className="z-10 absolute  bg-neutral-700 divide-y border-neutral-600 border-[1px] divide-gray-100 rounded-lg shadow-sm w-60 mt-35 p-1">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
            <a href="#" className="block px-4 py-2 text-neutral-300 font-light text-xs">{session?.user?.email}</a>
            <div className='h-[1px] bg-neutral-600 w-full'></div>
        </li>


        <li className='p-1'>
            <a href="#" className="block px-4 py-2 text-neutral-400 hover:bg-neutral-600 rounded font-light text-xs" onClick={async ()=> {
                await signOut({callbackUrl:"/"});
            }}>Sign out</a>
        </li>
        </ul>
    </motion.div>
  )
}

export default Dropdown

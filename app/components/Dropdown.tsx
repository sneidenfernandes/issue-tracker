import { useSession, signOut } from 'next-auth/react'


import React from 'react'


interface DropdownInput {
    ref: React.Ref<HTMLDivElement | null>
}

const Dropdown = ({ref}: DropdownInput) => {
    const {data:session} = useSession();
    

  return (
    <div ref={ref} id="dropdown" className="z-10 absolute  bg-neutral-700 divide-y divide-gray-100 rounded-lg shadow-sm w-60 mt-35 p-1">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
            <a href="#" className="block px-4 py-2 text-neutral-300 text-sm">{session?.user?.email}</a>
        </li>

        <li>
            <a href="#" className="block px-4 py-2 text-neutral-400 hover:bg-neutral-600 rounded" onClick={async ()=> {
                await signOut({callbackUrl:"/"});
            }}>Sign out</a>
        </li>
        </ul>
    </div>
  )
}

export default Dropdown

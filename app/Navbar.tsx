"use client";
import React from 'react'
import Link from 'next/link'
import { IoIosBug } from "react-icons/io";
import { usePathname } from 'next/navigation';
import classnames from "classnames";

const Navbar = () => {
    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"}
    ]

    const pathname = usePathname();

  return (
    <nav className='flex space-x-6 mb-5 border-b h-14 items-center px-5'>
        <Link href="/">
            <IoIosBug/>
        </Link>
        <ul className='flex space-x-6'>
            {links.map(link => <li>
                        <Link href={link.href} className={classnames({
                            "text-zinc-900" : link.href === pathname,
                            "text-zinc-500" : link.href !== pathname,
                            "hover:text-zinc-800 transition-colors": true
                        })}>{link.label}</Link>
                </li>)}
        </ul>
    </nav>
  )
}

export default Navbar

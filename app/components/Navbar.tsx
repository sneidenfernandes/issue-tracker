"use client";
import React from 'react';
import {AiFillBug} from "react-icons/ai"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { GoogleLogo } from './icons/google-logo';
import { signIn, signOut } from 'next-auth/react';






const Navbar = () => {
    
  return (
    <nav className='fixed h-15 border-b-[1px] border-neutral-700 top-0 w-full mx-auto flex justify-center items-center z-100'>
        <div className='flex justify-between'>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-between items-center min-w-[90vw] md:min-w-[80vw]  lg:min-w-[56vw]'>
                    <Link href="/">
                        <div className='flex justify-center items-center text-white '>
                            <AiFillBug className=' h-5 w-5'/>
                            <p className='text-lg ml-2  font-inter font-bold'>BugBoard</p>
                        </div>
                    </Link>
                    <AuthStatus/>

                    
                </div>
                
            </div>
        </div>
    </nav>
  )
}

const AuthStatus = () => {
    const {status} = useSession()

    if(status === "unauthenticated"){
        return (
            <div>
                <Button variant="outline" onClick={()=>{signIn("google")}}>
                    <GoogleLogo/>
                     Login
                </Button>
            </div>
        )
    }

    if(status === "loading"){
        <div className="h-2.5 rounded-full bg-gray-7=700 w-10"></div>
    }


    if(status === "authenticated"){
        return (
            <div>
                <Button variant="outline" onClick={()=>{signOut()}}>
                     Logout
                </Button>
            </div>
        )
    }


}




export default Navbar

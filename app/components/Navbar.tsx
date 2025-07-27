"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { GoogleLogo } from './icons/google-logo';
import { signIn, signOut } from 'next-auth/react';
import { HiMiniBugAnt } from 'react-icons/hi2';






const Navbar = () => {

  return (
    <nav className='fixed h-15 border-b-[1px] border-neutral-700 bg-blur-xl top-0 w-full mx-auto flex justify-center items-center z-100 backdrop-blur-lg '>
        <div className='flex justify-between'>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-between items-center min-w-[90vw] md:min-w-[80vw]  lg:min-w-[56vw]'>
                  <Link href={"/"} className='flex justify-center space-x-1 items-center text-neutral-200'>
                        <p className='font-roboto font-bold '><span className='text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-300'>Bugboard</span></p>
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
                <Button variant="ghost" onClick={()=>{signIn("google",{callbackUrl:'/home'})}}>
                    <GoogleLogo/>
                    <p className='font-semibold'><span className='text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-200'>Login</span></p>
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
                <Button variant="ghost" onClick={()=>{signOut({callbackUrl:"/"})}}>
                     Logout
                </Button>
            </div>
        )
    }


}

export default Navbar

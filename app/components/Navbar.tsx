"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { GoogleLogo } from './icons/google-logo';
import { signIn, signOut } from 'next-auth/react';
import BugboardLogo from './icons/BugboardLogo';






const Navbar = () => {

  return (
    <nav className='fixed h-15 border-b-[1px] border-neutral-700 top-0 w-full mx-auto flex justify-center items-center z-100 backdrop-blur-lg '>
        <div className='flex justify-between'>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-between items-center min-w-[90vw] md:min-w-[80vw]  lg:min-w-[56vw]'>
                  <Link href={"/"}>
                    <BugboardLogo/>
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
                <Button variant="outline" onClick={()=>{signIn("google",{callbackUrl:'/home'})}}>
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
                <Button variant="outline" onClick={()=>{signOut({callbackUrl:"/"})}}>
                     Logout
                </Button>
            </div>
        )
    }


}

export default Navbar

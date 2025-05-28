import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const BugboardLogo = () => {
  return (
    <div className='flex justify-center items-center text-white '>
            <AiFillBug className=' h-5 w-5'/>
            <p className='text-lg ml-2  font-inter font-bold'>BugBoard</p>
    </div>
  )
}

export default BugboardLogo

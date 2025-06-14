interface GreenProfileInputs {
    width : number,
    height: number
}


export default function GreenProfile({width, height}: GreenProfileInputs){


    return  <div className='ml-2  py-[2px] px-[3px] grid grid-cols-3 gap-x-1 rounded w-15 border-neutral-700 border-[1px] items-center'>
            <div className='bg-green-800/20 flex justify-center py-[2px]'>
                    <svg width={width} height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="196" height="196" rx="20" fill="#1e1e1e" stroke="#388e3c" strokeWidth="4"/>
                    <circle cx="100" cy="70" r="15" fill="#388e3c" fillOpacity="0.9"/>
                    <path d="M70 130 Q100 100 130 130 Q100 160 70 130 Z" fill="#388e3c" fillOpacity="0.7"/>
                    </svg>
            </div>
                <p className='text-xs text-neutral-400 ml-1'>USE</p> 
            </div>

}
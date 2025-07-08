import { HiMiniBugAnt } from "react-icons/hi2";

export default function Loading(){
    
    

    return <div className="w-full h-full flex justify-center items-center">
                <div className="h-screen w-full flex flex-col justify-center items-center">
                    <HiMiniBugAnt size={40} className="text-neutral-300 animate-pulse opacity-70"/>
                </div>
           </div>

}
"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { AiFillBug } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

export default function Home() {
  const guidelineRef = useRef<HTMLDivElement | null>(null);
  const {status} = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(status === "authenticated")
    router.push("/home");
  },[status, router])


  const toGuideline = () => {
    guidelineRef.current?.scrollIntoView({behavior: "smooth"});

  }
  return (
  <>    <Navbar/>
        <div className="flex flex-col ">
          <section className="bg-neutral-900 h-screen pt-[5vh] z-10"> 
              <div className="mx-[5vw] md:mx-[10vw]  lg:mx-[22vw] mt-[10vh]">
                  <p className="font-inter text-4xl md:text-5xl lg:text-6xl  font-[450] text-neutral-100 mt-[4vh] mr-[5vw] md:mr-[15vw]">
                    <span className="font-bold">Bugboard</span> is a purpose-built tool for tracking and squashing bugs together.</p>
                  <p className="font-roboto text-xl md:text-3xl font-[380] text-neutral-400  mt-[2vh] mr-[10vw] md:mr-[25vw]">Join a community of developers to compete, collaborate, and crush bugs together.</p>

                  <div className="flex  flex-row ">
                    <Button onClick={()=> {
                      signIn("google", {callbackUrl: "/home"});
                      
                    }} className="max-w-30 z-50 px-4 py-2 md:px-8 md:py-4 bg-neutral-200 hover:bg-white mt-[5vh] text-neutral-800">Start now</Button>

                     <Button onClick={toGuideline} className="min-w-50 z-50  px-4 py-2 md:px-8 md:py-4  bg-neutral-900 font-[300]  text-white  hover:bg-neutral-800 mt-[5vh] md:mt-[5vh] ml-[2vw] border-[1px] border-white">Community Guidelines  
                        <span className="text-xs hover:underline">{`>>>`}</span> 
                    </Button>
                  </div>

                  <div className="text-9xl animate-bounce opacity-70 md:flex justify-end pt-[20vh] text-white hidden">
                    <AiFillBug/>
                  </div>
              </div>
          </section>

          <section className="bg-neutral-950 h-screen z-10"> 
          <div className="mx-[5vw] md:mx-[10vw]  lg:mx-[22vw] mt-[10vh] p-4 ">
                  <p className="font-inter text-6xl md:text-7xl lg:text-8xl  font-[450] text-neutral-100 mt-[4vh] ml-[40vw]">
                   How it works</p>
                  <p className="font-roboto text-right text-xl md:text-3xl font-[380] text-neutral-400  mt-[5vh] ml-[10vw] md:ml-[25vw]">Log bugs, tackle challenges, and climb the leaderboard. Whether {`you're`} fixing issues or finding them, Bugboard keeps the process fun, focused, and fast.
                  Work solo or in teams, and earn your place among the top bug hunters.</p>

                  <div className="text-9xl animate-bounce opacity-70 md:flex justify-start pb-[50vh] mb-[50vh] text-white hidden">
                    <FaQuestionCircle className="mb-[20vh]"/>
                  </div> 
              </div> 
          </section>

          <section className="bg-neutral-900 h-screen z-10" ref={guidelineRef}> 
          <div className="mx-[5vw] md:mx-[10vw]  lg:mx-[22vw] mt-[10vh] p-4">
                  <p className="font-inter flex justify-start text-6xl md:text-6xl lg:text-8xl  font-[450] text-neutral-100 mt-[4vh] mr-[40vw]">
                   Guidelines </p>
                 <ul className="text-neutral-400 mt-[10vh] font-semibold space-y-4  text-xl md:text-02xl lg:text-3xl ">
                    <li>  1. Be Respectful</li>
                    <li>  2. Collaborate, Don’t Compete (Too Hard)</li>
                    <li>  3. Stay Honest</li>
                    <li>  4. Keep It Clean</li>
                 </ul>
            </div> 
          </section>

          
        
        </div>

        

      
  </>
  );
}

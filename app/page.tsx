import { Button } from "@/components/ui/button";
import { AiFillBug } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";


export default function Home() {
  return (
  <>
        <div className="flex flex-col  relative">
          <section className="bg-neutral-900 h-screen"> 
              <div className="mx-[5vw] md:mx-[10vw]  lg:mx-[22vw] mt-[10vh]">
                  <p className="font-inter text-4xl md:text-5xl lg:text-6xl  font-[450] text-neutral-100 mt-[4vh] mr-[5vw] md:mr-[15vw]">
                    <span className="font-bold">Bugboard</span> is a purpose-built tool for tracking and squashing bugs together.</p>
                  <p className="font-roboto text-xl md:text-3xl font-[380] text-neutral-400  mt-[2vh] mr-[10vw] md:mr-[25vw]">Join a community of developers to compete, collaborate, and crush bugs together.</p>

                  <div className="flex  flex-row ">
                    <Button className="max-w-30 px-4 py-2 md:px-8 md:py-4 bg-neutral-200 hover:bg-white mt-[5vh] text-neutral-800">Start now</Button>

                     <Button className="min-w-50  px-4 py-2 md:px-8 md:py-4  bg-neutral-900 font-[300]  text-white  hover:bg-neutral-800 mt-[5vh] md:mt-[5vh] ml-[2vw] border-[1px] border-white">Community Guidelines  
                        <span className="text-xs hover:underline">{`>>>`}</span> 
                    </Button>
                  </div>

                  <div className="text-9xl animate-bounce opacity-70 md:flex justify-end pt-[20vh] text-white hidden">
                    <AiFillBug/>
                  </div>
              </div>
          </section>

          <section className="bg-neutral-950 h-screen"> 
          <div className="mx-[5vw] md:mx-[10vw]  lg:mx-[22vw] mt-[10vh]">
                  <p className="font-inter text-6xl md:text-7xl lg:text-8xl  font-[450] text-neutral-100 mt-[4vh] ml-[40vw]">
                   How it works</p>
                  <p className="font-roboto text-right text-xl md:text-3xl font-[380] text-neutral-400  mt-[5vh] ml-[10vw] md:ml-[25vw]">Log bugs, tackle challenges, and climb the leaderboard. Whether you're fixing issues or finding them, Bugboard keeps the process fun, focused, and fast.
                  Work solo or in teams, and earn your place among the top bug hunters.</p>

                  <div className="text-9xl animate-bounce opacity-70 md:flex justify-start pb-[50vh] mb-[50vh] text-white hidden">
                    <FaQuestionCircle className="mb-[20vh]"/>
                  </div> 
              </div> 
          </section>

          <section className="bg-neutral-900 h-screen"> 
          <div className="mx-[5vw] md:mx-[10vw]  lg:mx-[22vw] mt-[10vh]">
                  <p className="font-inter text-6xl md:text-6xl lg:text-8xl  font-[450] text-neutral-100 mt-[4vh] mr-[40vw]">
                   Why BugBoard? </p>
                 <ul className="text-neutral-400 mt-[10vh] space-y-4 text-2xl md:text-3xl lg:text-4xl ">
                    <li>• Real-time collaboration tools</li>
                    <li>• Gamified bug tracking to keep things engaging</li>
                    <li>• Recognition for top contributors</li>
                    <li>• Built by devs, for devs</li>
                 </ul>
            </div> 
          </section>

          
        
        </div>

        

      
  </>
  );
}

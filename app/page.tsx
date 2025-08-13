"use client";
import { useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Landing from "./components/LampCard";

export default function Home() {
  const {status} = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(status === "authenticated")
    router.push("/home/projects");
  },[status, router]);


  return (
  <>    
    <Navbar/>
    <Landing/>
  </>
  );
}

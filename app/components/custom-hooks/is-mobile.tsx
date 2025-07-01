"use client";
import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint = 768) {

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      if(window.innerWidth < breakpoint){
        setIsMobile(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

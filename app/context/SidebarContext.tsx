"use client";
import { createContext, useContext, useState, ReactNode, RefObject, useEffect, useRef } from "react";

// 1. Define the context value type
type SidebarContextType = {
  open: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
  toggleSideBar: () => void;
  sidebarRef: RefObject<HTMLDivElement  |  null>;
  openSidebarRef: RefObject<HTMLButtonElement | null>;
};

// 2. Create the context with an initial undefined value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// 3. Provider component props type
type SidebarProviderProps = {
  children: ReactNode;
};

// 4. Provider implementation
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const openSidebarRef = useRef<HTMLButtonElement>(null);
  const openSideBar = () => setOpen(true);
  const closeSideBar = () => setOpen(false);
  const toggleSideBar = () => setOpen(prev => !prev);

   useEffect(() => {

      function handleOutsideClick(event: MouseEvent) {

       const target = event.target as Node; 
     

        if (sidebarRef.current 
            && !sidebarRef.current.contains(target)
            && openSidebarRef.current && !openSidebarRef.current.contains(target)
        ) {
           closeSideBar();
        }
      }

      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click",  handleOutsideClick);

    },[])
    
  return (
    <SidebarContext.Provider value={{ open, openSideBar, closeSideBar, toggleSideBar, sidebarRef, openSidebarRef }}>
      {children}
    </SidebarContext.Provider>
  );
}

// 5. Custom hook for consuming the context
export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

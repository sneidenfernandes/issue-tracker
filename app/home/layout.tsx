
import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "../components/Sidebar";
import { ProjectLogContextProvider } from "../context/ProjectLogContext";
import { NewIssueContextProvider } from "../context/NewIssueContext"
import IssueLog from "../components/IssueLog";
import { DeleteDialogContextProvider } from "../context/DialogContext";
import Dialog from "../components/Dialog";
import {Toaster} from "sonner";
import { SidebarProvider } from "../context/SidebarContext";



export const metadata: Metadata = {
  title: "Issue Tracker",
  description: ": Build Together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  
  return (
          <div>
            <SidebarProvider>
            <DeleteDialogContextProvider>
            <NewIssueContextProvider>
              <ProjectLogContextProvider>
                  <Sidebar/>
                    <div className={`bg-neutral-900/60 block md:ml-63  rounded  h-[95vh] m-[1vh] border-neutral-800 border-[1px]`}>
                      {children}
                      <IssueLog/>
                      <Dialog/>
                      <Toaster position="bottom-right" theme="dark"/>
                    </div>  
              </ProjectLogContextProvider>
            </NewIssueContextProvider>
            </DeleteDialogContextProvider>
            </SidebarProvider>
          </div>
  );
}

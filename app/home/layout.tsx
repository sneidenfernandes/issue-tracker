
import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "../components/Sidebar";
import { SearchContextProvider } from "../context/SearchContext";
import { NewIssueContextProvider } from "../context/NewIssueContext"
import IssueLog from "../components/IssueLog";
import SearchLog from "../components/SearchLog";



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
            <NewIssueContextProvider>
              <SearchContextProvider>
                  <Sidebar/>
                    <div className="bg-neutral-900 ml-63  rounded-lg  h-[95vh] m-[1vh] z-5 border-neutral-800 border-[1px]">
                      {children}
                    </div> 
                  <IssueLog/>
                  <SearchLog/>
              </SearchContextProvider>
            </NewIssueContextProvider>
          </div>
  );
}

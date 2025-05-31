
import type { Metadata } from "next";
import styles from "../page.module.css"
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
          <div className={` ${styles.background}`}>
            <NewIssueContextProvider>
              <SearchContextProvider>
                  <Sidebar/>
                    <div>
                      {children}
                    </div> 
                  <IssueLog/>
                  <SearchLog/>
              </SearchContextProvider>
            </NewIssueContextProvider>
          </div>
  );
}

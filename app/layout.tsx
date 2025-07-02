
import type { Metadata } from "next";
import AuthProvider from "./auth/Provider";
import Footer from "./components/Footer";
import styles from "./page.module.css"
import "./globals.css";




export const metadata: Metadata = {
  title: "Issue Tracker",
  description: ": Build Together",
};

import QueryProviders from "@/lib/queryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 z-1">
      <QueryProviders>
        <AuthProvider>
          <main className={` ${styles.background}`}>
            <div className= "w-full">
              {children}
            </div> 
          </main>
        </AuthProvider>
        <Footer/>
      </QueryProviders>
      </body>
    </html>
  );
}

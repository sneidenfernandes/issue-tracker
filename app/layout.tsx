
import type { Metadata } from "next";
import AuthProvider from "./auth/Provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styles from "./page.module.css"
import "./globals.css";



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
    <html lang="en">
      <body className="bg-neutral-800">
     
        <AuthProvider>
          <Navbar/>
          <main className={` ${styles.background}`}>
            <div className="pt-15 w-full">
              {children}
            </div> 
          </main>
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}

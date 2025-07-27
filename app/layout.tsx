
import type { Metadata } from "next";
import AuthProvider from "./auth/Provider";
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
      <body>
      <QueryProviders>
        <AuthProvider>
          <main className={` ${styles.background}`}>
            <div>
              {children}
            </div> 
          </main>
        </AuthProvider> 
      </QueryProviders>
      </body>
    </html>
  );
}

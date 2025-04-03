"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";

//import NavBar from "./components/navbar/navbar";
//import { Navbar } from "@nextui-org/navbar";
import { Navbar } from "../components/navbar/navbar";
//import Footer from "./components/footer/footer";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { AuthProvider } from "../components/context/AuthContext";
import { ModalProvider } from "../components/context/ModalContext";
//import AuthModal from "./components/modals/login_signup";
import AuthModal from "../components/modals/login_signup";

import { SessionProvider } from "next-auth/react";
import { NextUI } from "@/components/providers/page";
import Footer from "@/components/footer/footer";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
        <NextUI>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <SessionProvider>
              {/* Wrapping the entire application in SessionProvider */}
                <ModalProvider>
                  <AuthModal isOpen={false} onOpenChange={function (): void {
                  throw new Error("Function not implemented.");
                } }/>
                  <Navbar />
                  <main className="flex-grow">{children}</main>


                  <Footer/>
                </ModalProvider>
            </SessionProvider>
          </NextThemesProvider>
        </NextUI>
        </AuthProvider>
      </body>
    </html>
  );
}


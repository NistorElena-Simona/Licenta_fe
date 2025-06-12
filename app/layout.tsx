"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "../components/context/AuthContext";
import { ModalProvider, useModalContext } from "../components/context/ModalContext";
import AuthModal from "../components/modals/login_signup";
import { SessionProvider } from "next-auth/react";
import { NextUI } from "@/components/providers/page";
import Footer from "@/components/footer/footer";
import { Navbar } from "../components/navbar/navbar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import HydrationWrapper from "@/components/HydrationWrapper";

// Componentă pentru a gestiona modalul cu context
function ModalManager() {
  const { isModalOpen, toggleModal } = useModalContext();
  
  return (
    <AuthModal 
      isOpen={isModalOpen} 
      onOpenChange={toggleModal}
    />
  );
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`} style={{ background: 'radial-gradient(circle at 50% 0%, #b3cfff 0%, #1e3a8a 80%, #0a1747 100%)' }}>
        <AuthProvider>
          <NextUI>
            <NextThemesProvider attribute="class" defaultTheme="light">
              <SessionProvider>
                <ModalProvider>
                  <HydrationWrapper>
                    <ModalManager />
                    <Navbar />
                  </HydrationWrapper>
                  <main className="flex-grow">{children}</main>
                  <Footer/>
                </ModalProvider>
              </SessionProvider>
            </NextThemesProvider>
          </NextUI>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}

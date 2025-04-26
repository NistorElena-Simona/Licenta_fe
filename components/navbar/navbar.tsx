"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Link
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import AuthModal from "../modals/login_signup"; 
import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; 
import { useSearchParams } from "next/navigation";

export const Navbar = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const { user, isLoading, isAuthenticated, logout,isAdmin } = useAuth();
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setUserAuthenticated(true)
    }
  }, [isLoading, isAuthenticated])

  const handleButtonClick = async () => {
    if (userAuthenticated) {
      await logout()
      setUserAuthenticated(false)
    } else {
      setIsModalOpen(true);
    }
  }

  // const handleOpenChange = (state) => {
  //   toggleModal();
  // };
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-black text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="2xl" position="sticky" height="10vh">
    <NavbarContent justify="start">
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl text-indigo-600 hover:text-indigo-800 ">
          Fitness-App
        </Link>
      </NavbarBrand>
    </NavbarContent>

    
        {/* Link către pagina About */}
        <NavbarItem>
          <Link href="/pages/about" className="text-indigo-600 text-2xl hover:text-indigo-800">
            About
          </Link>
        </NavbarItem>
        {userAuthenticated && (
        <NavbarItem>
          <Link
            href='/muscles'
            className='text-indigo-600 text-2xl hover:text-indigo-800'
          >
            Muscles
          </Link>
        </NavbarItem>
      )}


{userAuthenticated && isAdmin && (
        <NavbarItem>
          <Link
            href='/add_ex'
            className='text-indigo-600 text-2xl hover:text-indigo-800'
          >
            Add exercise
          </Link>
        </NavbarItem>
      )}
        <NavbarItem>
          <Link href="/pages/pricing" className="text-indigo-600 text-2xl hover:text-indigo-800">
            Pricing
          </Link>
        </NavbarItem>

    <NavbarContent justify="end" className="flex items-center gap-4">
      <Input
        aria-label="Search" 
        className="bg-default-100 rounded-full"
        placeholder="Search..."
        type="search"
      />
      
      <ThemeSwitch />

      {isAuthenticated ? (
          <NavbarItem>
            <span className='text-foreground'>Welcome, {user?.name}</span>
          </NavbarItem>
        ) : (
          ''
        )}

      {/* Butonul de Login */}
      <NavbarItem>
          <Button
            variant='flat'
            onClick={handleButtonClick}
            style={{
              backgroundColor: isLoading
                ? 'gray'
                : userAuthenticated
                ? 'red'
                : 'blue',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : userAuthenticated ? 'Logout' : 'Login'}
          </Button>
        </NavbarItem>

      </NavbarContent>

      {isModalOpen && <AuthModal isOpen={isModalOpen} onOpenChange={toggleModal} />}
    </NextUINavbar>
  );
};

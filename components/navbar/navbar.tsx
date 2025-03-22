"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Link
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
//import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { useState } from "react";
import AuthModal from "../modals/login_signup"; // asigură-te că este corect importat
import { ThemeSwitch } from "@/components/theme-switch";
import { Input, Kbd } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { FaCog } from 'react-icons/fa';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };
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

        <NavbarItem>
          <Link href="/pages/muscles" className="text-indigo-600 text-2xl hover:text-indigo-800">
            Muscles
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/pages/pricing" className="text-indigo-600 text-2xl hover:text-indigo-800">
            Pricing
          </Link>
        </NavbarItem>

    <NavbarContent justify="end" className="flex items-center gap-4">
      <Input
        aria-label="Search"
        className="bg-default-100"
        placeholder="Search..."
        type="search"
      />
      
      <ThemeSwitch />

      {/* Butonul de Login */}
      <NavbarItem>
        <Button
          variant="flat"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </NavbarItem>
        <NavbarItem>
          <Link href="/pages/settings">
            <FaCog className="text-default-600" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {isModalOpen && <AuthModal isOpen={isModalOpen} onOpenChange={toggleModal} />}
    </NextUINavbar>
  );
};

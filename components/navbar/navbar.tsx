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
import AuthModal from "../modals/login_signup"; // Asigură-te că este corect importat
import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Importă contextul de autentificare
import { useSearchParams } from "next/navigation";

export const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, openAuthModal } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verifică dacă există un token în localStorage
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);

    // Dacă URL-ul conține auth=true, deschide automat modalul
    if (searchParams.get("auth") === "true") {
      openAuthModal();
    }
  }, [searchParams, setIsAuthenticated, openAuthModal]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <NextUINavbar maxWidth="2xl" position="sticky" height="10vh">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-2xl text-indigo-600 hover:text-indigo-800">
            Fitness-App
          </Link>
        </NavbarBrand>
      </NavbarContent>

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
          startContent={
            <SearchIcon className="text-base text-black text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <ThemeSwitch />

        <NavbarItem>
          {!isAuthenticated  ? (
            <Button variant="flat" onClick={() => setIsModalOpen(true)}>
              Login
            </Button>
          ) : (
            <Button variant="flat" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </NavbarItem>

        <NavbarItem>
          <Link href="/pages/settings">
            <FaCog className="text-default-600" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {isModalOpen && <AuthModal isOpen={isModalOpen} onOpenChange={() => setIsModalOpen(false)} />}
    </NextUINavbar>
  );
};

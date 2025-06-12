"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import AuthModal from "../modals/login_signup"; 
import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; 
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const { user, isLoading, isAuthenticated, logout,isAdmin } = useAuth();
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setUserAuthenticated(true)
    }
  }, [isLoading, isAuthenticated])

  // Sincronizează searchQuery cu URL-ul când se schimbă pagina
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    setSearchQuery(currentSearch);
  }, [searchParams, pathname]);

  const handleButtonClick = async () => {
    if (userAuthenticated) {
      await logout()
      setUserAuthenticated(false)
    } else {
      setIsModalOpen(true);
    }
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const query = searchQuery.trim();
      
      // Detectează pagina curentă și redirecționează cu query-ul de căutare
      if (pathname.includes('/muscles')) {
        // Căutare în pagina de mușchi
        router.push(`/muscles?search=${encodeURIComponent(query)}`);
      } else if (pathname.includes('/exercises')) {
        // Căutare în pagina de exerciții
        router.push(`/exercises?search=${encodeURIComponent(query)}`);
      } else if (pathname.includes('/favorites')) {
        // Căutare în pagina de favorite
        router.push(`/favorites?search=${encodeURIComponent(query)}`);
      } else if (pathname.includes('/challenges')) {
        // Căutare în pagina de challenges
        router.push(`/challenges?search=${encodeURIComponent(query)}`);
      } else {
        // Căutare generală - redirecționează către mușchi
        router.push(`/muscles?search=${encodeURIComponent(query)}`);
      }
      
      setSearchQuery(""); // Resetează search input
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Căutare în timp real - actualizează URL-ul pe măsură ce utilizatorul scrie
    if (pathname.includes('/muscles')) {
      if (value.trim()) {
        router.push(`/muscles?search=${encodeURIComponent(value.trim())}`);
      } else {
        router.push('/muscles');
      }
    } else if (pathname.includes('/exercises')) {
      if (value.trim()) {
        router.push(`/exercises?search=${encodeURIComponent(value.trim())}`);
      } else {
        router.push('/exercises');
      }
    } else if (pathname.includes('/favorites')) {
      if (value.trim()) {
        router.push(`/favorites?search=${encodeURIComponent(value.trim())}`);
      } else {
        router.push('/favorites');
      }
    } else if (pathname.includes('/challenges')) {
      if (value.trim()) {
        router.push(`/challenges?search=${encodeURIComponent(value.trim())}`);
      } else {
        router.push('/challenges');
      }
    }
  };

  const getSearchPlaceholder = () => {
    if (pathname.includes('/muscles')) {
      return "Search muscles...";
    } else if (pathname.includes('/exercises')) {
      return "Search exercises...";
    } else if (pathname.includes('/favorites')) {
      return "Search favorites...";
    } else if (pathname.includes('/challenges')) {
      return "Search challenges...";
    } else {
      return "Search...";
    }
  };

  return (
    <NextUINavbar maxWidth="2xl" position="sticky" height="10vh">
    <NavbarContent justify="start">
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-300">
          Fitness-App
        </Link>
      </NavbarBrand>
    </NavbarContent>

    
        {/* Link către pagina About */}
        <NavbarItem>
          <Link href="/pages/about" className="text-indigo-600 text-2xl hover:text-indigo-800 dark:hover:text-indigo-300">
            About
          </Link>
        </NavbarItem>

       
        {userAuthenticated && (
        // <>
        //  <NavbarItem>
        //   <Link
        //     href='/favorites'
        //     className='text-indigo-600 text-2xl hover:text-indigo-800 dark:hover:text-indigo-100'
        //   >
        //     Favorites exercises
        //   </Link>
        // </NavbarItem>
        // <NavbarItem>
        //   <Link
        //     href='/muscles'
        //     className='text-indigo-600 text-2xl hover:text-indigo-800 dark:hover:text-indigo-300'
        //   >
        //     Muscles
        //   </Link>
        // </NavbarItem><NavbarItem>
        //     <Link
        //       href='/challenges'
        //       className='text-indigo-600 text-2xl hover:text-indigo-800 dark:hover:text-indigo-300'
        //     >
        //       Challenges
        //     </Link>
        //   </NavbarItem>
        //   </>
        <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="light" 
                  className="text-green-600 text-2xl  dark:text-red-400 "
                >
                  Menu
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                {[
                  { key: "favorites", href: "/favorites", label: "Favorites exercises" },
                  { key: "muscles", href: "/muscles", label: "Muscles" },
                  { key: "challenges", href: "/challenges", label: "Challenges" },
                  ...(isAdmin ? [{ key: "add_exercise", href: "/add_ex", label: "Add exercise" }] : [])
                ].map(item => (
                  <DropdownItem key={item.key}>
                    <Link href={item.href} className="text-indigo-600  dark:text-indigo-400 ">
                      {item.label}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
      )}


{/* {userAuthenticated && isAdmin && (
        <NavbarItem>
          <Link
            href='/add_ex'
            className='text-indigo-600 text-2xl hover:text-indigo-500 dark:hover:text-indigo-100'
          >
            Add exercise
          </Link>
        </NavbarItem>
      )} */}
        <NavbarItem>
          <Link href="/pages/pricing" className="text-indigo-600 text-2xl hover:text-indigo-800 dark:hover:text-indigo-300">
            Pricing
          </Link>
        </NavbarItem>

    <NavbarContent justify="end" className="flex items-center gap-4">
      <Input
        aria-label="Search" 
        className="bg-default-100 rounded-full"
        placeholder={getSearchPlaceholder()}
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearch}
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
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
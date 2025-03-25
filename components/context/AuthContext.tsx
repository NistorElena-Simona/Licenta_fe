import { createContext, useContext, useEffect, useState } from "react";
import AuthModal from "../modals/login_signup";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {},
    openAuthModal: () => {},
  });
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    }, []);
  
    const openAuthModal = () => setIsAuthModalOpen(true);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, openAuthModal }}>
        {children}
        {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onOpenChange={() => setIsAuthModalOpen(false)} />}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    return useContext(AuthContext);
  }
'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';


interface RouteGuardProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export default function RouteGuard({ children, requiredRoles = [] }: RouteGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/');
      } else if (requiredRoles.length > 0 && user) {
        const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
        if (!hasRequiredRole) {
          router.push('/pages/unauthorized');
        }
      }
    }
  }, [isLoading, isAuthenticated, router, user, requiredRoles]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; 
  }


  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
    if (!hasRequiredRole) {
      return null; 
    }
  }

  return <>{children}</>;
}

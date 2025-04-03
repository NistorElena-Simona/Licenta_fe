import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute = ({ children, requiredRoles = [] }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/?from=${router.asPath}`);
    }
    
    if (!isLoading && isAuthenticated && user && requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
      if (!hasRequiredRole) {
        router.push('/pages/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, router, user, requiredRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (isAuthenticated && (!requiredRoles.length || (user && requiredRoles.some(role => user.roles.includes(role))))) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
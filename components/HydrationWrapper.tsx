"use client";

import { useEffect, useState } from 'react';

interface HydrationWrapperProps {
  children: React.ReactNode;
}

export default function HydrationWrapper({ children }: HydrationWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
} 
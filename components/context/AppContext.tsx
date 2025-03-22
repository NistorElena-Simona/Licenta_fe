// context/AppContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  sharedValue: string;
  setSharedValue: (value: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sharedValue, setSharedValue] = useState<string>('');

  return (
    <AppContext.Provider value={{ sharedValue, setSharedValue }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

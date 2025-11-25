import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type ChatBackground = string; // Will store the ID of the background

interface PersonalizationContextType {
  chatBackground: ChatBackground;
  setChatBackground: (bg: ChatBackground) => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const PersonalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatBackground, setChatBackground] = useState<ChatBackground>(() => {
    return localStorage.getItem('chatza-background') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('chatza-background', chatBackground);
  }, [chatBackground]);

  return (
    <PersonalizationContext.Provider value={{ chatBackground, setChatBackground }}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = (): PersonalizationContextType => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};

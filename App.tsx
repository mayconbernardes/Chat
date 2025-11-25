// FIX: Provide full implementation for App.tsx to resolve module errors and set up application structure.
import React, { useState, useEffect, createContext } from 'react';
import OnboardingScreen from './components/screens/OnboardingScreen';
import ChatScreen from './components/screens/ChatScreen';
import TermsScreen from './components/screens/TermsScreen';
import PrivacyScreen from './components/screens/PrivacyScreen';
import SettingsModal from './components/modals/SettingsModal';
import { User, UserStatus } from './types';
import { MOCK_USERS_DATA, COUNTRY_KEYS, LANGUAGE_KEYS, INTEREST_KEYS } from './constants';
import { translations } from './i18n';
import { ThemeProvider } from './contexts/ThemeContext';
import { PersonalizationProvider } from './contexts/PersonalizationContext';

type Screen = 'onboarding' | 'chat' | 'terms' | 'privacy';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => { },
  t: (key: string) => key,
});

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  const initialLang = localStorage.getItem('chatza-lang') || 'en';
  const [language, _setLanguage] = useState(initialLang);

  const setLanguage = (lang: string) => {
    localStorage.setItem('chatza-lang', lang);
    _setLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  // Generate some mock users to populate the chat
  useEffect(() => {
    const generateMockUsers = (count: number): User[] => {
      const users: User[] = [];
      const usedNames = new Set<string>();

      for (let i = 0; i < count; i++) {
        let username = '';
        do {
          username = MOCK_USERS_DATA.names[Math.floor(Math.random() * MOCK_USERS_DATA.names.length)] + Math.floor(Math.random() * 1000);
        } while (usedNames.has(username));
        usedNames.add(username);

        const numInterests = Math.floor(Math.random() * 3);
        const shuffledInterests = [...INTEREST_KEYS].sort(() => 0.5 - Math.random());

        users.push({
          id: `u_${i + 2}`, // Start from 2 to not collide with potential logged in user
          username,
          country: COUNTRY_KEYS[Math.floor(Math.random() * COUNTRY_KEYS.length)],
          language: LANGUAGE_KEYS[Math.floor(Math.random() * LANGUAGE_KEYS.length)],
          interests: shuffledInterests.slice(0, numInterests),
          status: Object.values(UserStatus)[Math.floor(Math.random() * 3)],
          avatarColor: MOCK_USERS_DATA.colors[Math.floor(Math.random() * MOCK_USERS_DATA.colors.length)],
          isAgeVerified: false,
        });
      }
      return users;
    };
    setAllUsers(generateMockUsers(50));
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAllUsers(prev => [user, ...prev.filter(u => u.id !== user.id)]);
    setCurrentScreen('chat');
  };

  const handleLogout = () => {
    if (currentUser) {
      setAllUsers(prev => prev.filter(u => u.id !== currentUser.id));
    }
    setCurrentUser(null);
    setCurrentScreen('onboarding');
  };

  const handleNavigate = (screen: 'terms' | 'privacy') => {
    setCurrentScreen(screen);
  };

  const handleBackToOnboarding = () => {
    setCurrentScreen('onboarding');
  }

  const handleAgeVerified = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, isAgeVerified: true };
      setCurrentUser(updatedUser);
      setAllUsers(prev => prev.map(u => (u.id === currentUser.id ? updatedUser : u)));
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'chat':
        if (currentUser) {
          return <ChatScreen currentUser={currentUser} allUsers={allUsers} onLogout={handleLogout} onOpenSettings={() => setSettingsModalOpen(true)} onAgeVerified={handleAgeVerified} />;
        }
        // Fallback to onboarding if no user but trying to access chat
        setCurrentScreen('onboarding');
        return <OnboardingScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsScreen onBack={handleBackToOnboarding} />;
      case 'privacy':
        return <PrivacyScreen onBack={handleBackToOnboarding} />;
      default:
        return <OnboardingScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        <PersonalizationProvider>
          <div className="h-full w-full">
            {renderScreen()}
            {isSettingsModalOpen && <SettingsModal onClose={() => setSettingsModalOpen(false)} />}
          </div>
        </PersonalizationProvider>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
};

export default App;
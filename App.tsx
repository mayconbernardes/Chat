// App.tsx - Main application entry point with onboarding and chat flow
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

// Language context for i18n
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => { },
  t: (key) => key,
});

type Screen = 'onboarding' | 'chat' | 'terms' | 'privacy';

const App: React.FC = () => {
  // Anonymous user generation
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const anonId = `anon-${Date.now()}`;
    return {
      id: anonId,
      username: `Anon${Math.floor(Math.random() * 1000)}`,
      avatarColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      country: 'BR',
      language: 'pt',
      interests: [],
      status: UserStatus.ONLINE,
      isAgeVerified: false,
    } as User;
  });

  const [allUsers, setAllUsers] = useState<User[]>([currentUser]);
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  // Language handling
  const initialLang = localStorage.getItem('chatza-lang') || 'en';
  const [language, _setLanguage] = useState(initialLang);
  const setLanguage = (lang: string) => {
    localStorage.setItem('chatza-lang', lang);
    _setLanguage(lang);
  };
  const t = (key: string) => translations[language]?.[key] || translations['en']?.[key] || key;

  // Mock users generation (excluding the anonymous user)
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
          id: `u_${i + 2}`,
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
    setAllUsers(prev => [...prev, ...generateMockUsers(50)]);
  }, []);

  // Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAllUsers(prev => [user, ...prev.filter(u => u.id !== user.id)]);
    setCurrentScreen('chat');
  };

  const handleLogout = () => {
    // For anonymous chat just reload to get a new anon user
    window.location.reload();
  };

  const handleNavigate = (screen: 'terms' | 'privacy') => setCurrentScreen(screen);
  const handleBackToOnboarding = () => setCurrentScreen('onboarding');

  const handleAgeVerified = () => {
    const updated = { ...currentUser, isAgeVerified: true };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === currentUser.id ? updated : u)));
  };

  // Render based on current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'chat':
        return (
          <ChatScreen
            currentUser={currentUser}
            allUsers={allUsers}
            onLogout={handleLogout}
            onOpenSettings={() => setSettingsModalOpen(true)}
            onAgeVerified={handleAgeVerified}
          />
        );
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
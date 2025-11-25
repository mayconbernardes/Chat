import React, { useState, useContext, useMemo } from 'react';
import { User, UserStatus } from '../../types';
import { MOCK_USERS_DATA, COUNTRY_KEYS, LANGUAGE_KEYS, INTEREST_KEYS, MOCK_ADS } from '../../constants';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import RefreshIcon from '../icons/RefreshIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import { LanguageContext } from '../../App';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import { useTheme } from '../../contexts/ThemeContext';

interface OnboardingScreenProps {
    onLogin: (user: User) => void;
    onNavigate: (screen: 'terms' | 'privacy') => void;
}

const ThemeToggle = () => {
    const { themeMode, setThemeMode } = useTheme();

    const themes = [
        { mode: 'light' as const, icon: SunIcon, title: 'Light' },
        { mode: 'dark' as const, icon: MoonIcon, title: 'Dark' },
    ];

    return (
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            {themes.map(({ mode, icon: Icon, title }) => (
                <button
                    key={mode}
                    type="button"
                    onClick={() => setThemeMode(mode)}
                    title={title}
                    className={`p-1.5 rounded transition-colors ${themeMode === mode
                        ? 'bg-white dark:bg-slate-600 text-sky-600 dark:text-sky-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                >
                    <Icon className="h-4 w-4" />
                </button>
            ))}
        </div>
    );
};

const LanguageSelector = () => {
    const { language, setLanguage } = useContext(LanguageContext);

    return (
        <div className="relative">
            <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full appearance-none bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            >
                {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-800">{lang.name}</option>
                ))}
            </select>
            <ChevronDownIcon className="h-4 w-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
    );
};

const MarketplacePreview = () => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="space-y-4 mt-8 overflow-y-auto max-h-[600px]">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        🛍️ {t('marketplaceTitle')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('marketplaceSubtitle')}</p>
                </div>
                <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full uppercase tracking-wider">
                    {t('sponsored')}
                </span>
            </div>

            <div className="grid gap-4">
                {MOCK_ADS.map((ad) => (
                    <div key={ad.id} className="group relative bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-100 dark:border-slate-700/50 hover:shadow-md">
                        <div className="flex gap-3">
                            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="shrink-0">
                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-600">
                                    <img src={ad.image} alt={t(ad.titleKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </a>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block">
                                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate hover:text-sky-600 dark:hover:text-sky-400 transition-colors">{t(ad.titleKey)}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{t(ad.descriptionKey)}</p>
                                </a>
                                <div className="flex items-center gap-3 mt-2">
                                    <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1">
                                        {t('viewOffer')} <span className="text-[10px]">→</span>
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => console.log('Navigate to offer details', ad.id)}
                                        className="text-[10px] font-medium bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-2 py-1 rounded hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                                    >
                                        {t('learnMore')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onLogin, onNavigate }) => {
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState(COUNTRY_KEYS[0]);
    const [language, setLanguage] = useState(LANGUAGE_KEYS[0]);
    const [interests, setInterests] = useState<string[]>([]);
    const [seeking, setSeeking] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [showAllInterests, setShowAllInterests] = useState(false);
    const [showMarketplaceMobile, setShowMarketplaceMobile] = useState(false);
    const { t } = useContext(LanguageContext);

    const getRandomElement = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const randomizeUser = () => {
        setUsername(getRandomElement(MOCK_USERS_DATA.names) + Math.floor(Math.random() * 1000));
        setCountry(getRandomElement(COUNTRY_KEYS));
        setLanguage(getRandomElement(LANGUAGE_KEYS));
        setSeeking('');

        const numInterests = Math.floor(Math.random() * 4) + 1;
        const shuffledInterests = [...INTEREST_KEYS].sort(() => 0.5 - Math.random());
        setInterests(shuffledInterests.slice(0, numInterests));
    };

    const toggleInterest = (interest: string) => {
        setInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim().length < 3 || !agreed) return;

        const newUser: User = {
            id: `u_${Date.now()}`,
            username: username.trim(),
            country,
            language,
            interests,
            seeking: seeking.trim(),
            status: UserStatus.Available,
            avatarColor: getRandomElement(MOCK_USERS_DATA.colors),
            isAgeVerified: false,
        };
        onLogin(newUser);
    };

    const translatedCountries = useMemo(() => COUNTRY_KEYS.map(key => ({ key, name: t(key) })).sort((a, b) => a.name.localeCompare(b.name)), [t]);
    const translatedLanguages = useMemo(() => LANGUAGE_KEYS.map(key => ({ key, name: t(key) })).sort((a, b) => a.name.localeCompare(b.name)), [t]);

    const initialInterestsCount = 8;
    const translatedInterests = useMemo(() => INTEREST_KEYS.map(key => ({ key, name: t(key) })).sort((a, b) => a.name.localeCompare(b.name)), [t]);
    const interestsToShow = showAllInterests ? translatedInterests : translatedInterests.slice(0, initialInterestsCount);

    const isFormValid = username.trim().length >= 3 && agreed;

    return (
        <div className="h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300 overflow-y-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-4 animate-fade-in-up">
                {/* Left Column: Onboarding Form */}
                <div className="lg:col-span-7 p-8 flex flex-col relative overflow-y-auto max-h-[90vh]">
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                        <LanguageSelector />
                        <ThemeToggle />
                    </div>

                    <div className="mb-8 mt-4">
                        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-2xl flex items-center justify-center mb-6 text-4xl shadow-sm">
                            👋
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('welcomeMessage')}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">{t('createProfilePrompt')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-1">
                                <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('usernameLabel')}</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder={t('usernamePlaceholder')}
                                    className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={randomizeUser}
                                title={t('randomizeProfileTooltip')}
                                className="mt-6 p-2 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-lg transition-colors shrink-0"
                            >
                                <RefreshIcon className="h-6 w-6 text-slate-800 dark:text-white" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('countryLabel')}</label>
                                <div className="relative">
                                    <select
                                        id="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full appearance-none bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                    >
                                        {translatedCountries.map(c => <option key={c.key} value={c.key} className="bg-white dark:bg-slate-800">{c.name}</option>)}
                                    </select>
                                    <ChevronDownIcon className="h-5 w-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('languageLabel')}</label>
                                <div className="relative">
                                    <select
                                        id="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full appearance-none bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                    >
                                        {translatedLanguages.map(l => <option key={l.key} value={l.key} className="bg-white dark:bg-slate-800">{l.name}</option>)}
                                    </select>
                                    <ChevronDownIcon className="h-5 w-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="seeking" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('seekingLabel')}</label>
                            <textarea
                                id="seeking"
                                value={seeking}
                                onChange={(e) => setSeeking(e.target.value)}
                                placeholder={t('seekingPlaceholder')}
                                className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition resize-none"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('interestsLabel')}</label>
                            <div className="flex flex-wrap gap-2">
                                {interestsToShow.map(interest => (
                                    <button
                                        key={interest.key}
                                        type="button"
                                        onClick={() => toggleInterest(interest.key)}
                                        className={`px-3 py-1 text-sm rounded-full font-medium transition-colors ${interests.includes(interest.key)
                                            ? 'bg-sky-500 text-white'
                                            : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
                                            }`}
                                    >
                                        {interest.name}
                                    </button>
                                ))}
                            </div>
                            {translatedInterests.length > initialInterestsCount && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllInterests(!showAllInterests)}
                                    className="text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 text-sm mt-3 font-medium"
                                >
                                    {showAllInterests ? t('showLess') : t('showMore')}
                                </button>
                            )}
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="h-4 w-4 rounded bg-slate-100 dark:bg-slate-700 border-slate-400 dark:border-slate-500 text-sky-500 focus:ring-sky-500"
                                />
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    {t('agreeToThe')}{' '}
                                    <button type="button" onClick={() => onNavigate('terms')} className="text-sky-500 dark:text-sky-400 hover:underline">{t('termsOfService')}</button>
                                    {' '}{t('and')}{' '}
                                    <button type="button" onClick={() => onNavigate('privacy')} className="text-sky-500 dark:text-sky-400 hover:underline">{t('privacyPolicy')}</button>.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition-colors hover:bg-sky-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            {t('joinChat')}
                        </button>
                    </form>
                </div>

                {/* Right Column: Marketplace & Offers */}
                <div className={`lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 p-8 ${showMarketplaceMobile ? 'block' : 'hidden lg:block'}`}>
                    <MarketplacePreview />
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;
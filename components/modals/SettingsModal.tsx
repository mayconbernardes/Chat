import React, { useContext, useState, useEffect } from 'react';
import CloseIcon from '../icons/CloseIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import CheckIcon from '../icons/CheckIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import { LanguageContext } from '../../App';
import { useTheme } from '../../contexts/ThemeContext';
import { SUPPORTED_LANGUAGES } from '../../i18n';
import { usePersonalization } from '../../contexts/PersonalizationContext';
import { CHAT_BACKGROUNDS } from '../../constants';

interface SettingsModalProps {
    onClose: () => void;
}

const ThemeSelector: React.FC = () => {
    const { themeMode, setThemeMode, resolvedTheme } = useTheme();
    const { t } = useContext(LanguageContext);

    const themes = [
        { mode: 'light' as const, icon: SunIcon, labelKey: 'themeLight' },
        { mode: 'dark' as const, icon: MoonIcon, labelKey: 'themeDark' },
    ];

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t('themeMode')}</label>
            <div className="grid grid-cols-2 gap-3">
                {themes.map(({ mode, icon: Icon, labelKey }) => {
                    const isSelected = themeMode === mode;
                    // Determine preview theme for this mode
                    const previewTheme = mode;

                    return (
                        <button
                            key={mode}
                            onClick={() => setThemeMode(mode)}
                            className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-sky-500 ${isSelected
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/20 shadow-lg'
                                : 'border-slate-300 dark:border-slate-600 hover:border-sky-300 dark:hover:border-sky-400 bg-white dark:bg-slate-700/50 hover:shadow-md'
                                }`}
                        >
                            {/* Theme Preview Mockup */}
                            <div className={`w-full h-16 rounded-lg overflow-hidden border ${previewTheme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                                {/* Mini header */}
                                <div className={`h-3 ${previewTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} flex items-center px-1.5 gap-0.5`}>
                                    <div className={`w-1 h-1 rounded-full ${previewTheme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                    <div className={`w-1 h-1 rounded-full ${previewTheme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                    <div className={`w-1 h-1 rounded-full ${previewTheme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'}`}></div>
                                </div>
                                {/* Mini content */}
                                <div className="p-1.5 space-y-1">
                                    <div className={`h-1.5 rounded ${previewTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} w-3/4`}></div>
                                    <div className={`h-1.5 rounded ${previewTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} w-1/2`}></div>
                                    <div className={`h-1.5 rounded ${previewTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} w-2/3`}></div>
                                    <div className="flex gap-1 mt-1.5">
                                        <div className={`h-4 rounded ${previewTheme === 'dark' ? 'bg-sky-600' : 'bg-sky-400'} w-1/3`}></div>
                                        <div className={`h-4 rounded ${previewTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} flex-1`}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Icon and Label */}
                            <div className="flex items-center gap-1.5">
                                <Icon className={`h-4 w-4 ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'}`} />
                                <span className={`text-xs font-semibold ${isSelected ? 'text-sky-700 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {t(labelKey)}
                                </span>
                            </div>

                            {/* Selected Indicator */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 bg-sky-500 rounded-full p-0.5">
                                    <CheckIcon className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const LanguageSelector: React.FC = () => {
    const { language, setLanguage, t } = useContext(LanguageContext);

    return (
        <div className="relative">
            <label htmlFor="language-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('appLanguage')}</label>
            <select
                id="language-select"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            >
                {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-800">{lang.name}</option>
                ))}
            </select>
            <ChevronDownIcon className="h-5 w-5 text-slate-400 absolute right-3 top-[46px] -translate-y-1/2 pointer-events-none" />
        </div>
    );
};

const NotificationToggle: React.FC = () => {
    const [isEnabled, setIsEnabled] = useState(() => {
        return localStorage.getItem('chatza-notifications-enabled') === 'true';
    });
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        localStorage.setItem('chatza-notifications-enabled', String(isEnabled));
    }, [isEnabled]);

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('notifications')}</label>
            <button
                onClick={() => setIsEnabled(!isEnabled)}
                className="flex items-center justify-between w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 cursor-pointer focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition hover:bg-slate-50 dark:hover:bg-slate-700/80"
            >
                <span className="font-medium text-sm">{t('notificationSounds')}</span>
                <div className={`relative w-11 h-6 rounded-full transition-colors ${isEnabled ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                    <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? 'transform translate-x-5' : ''}`}></span>
                </div>
            </button>
        </div>
    )
}

const WallpaperSelector: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const { resolvedTheme } = useTheme();
    const { chatBackground, setChatBackground } = usePersonalization();

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('chatWallpaper')}</label>
            <div className="grid grid-cols-3 gap-3">
                {CHAT_BACKGROUNDS.map(bg => {
                    const bgData = resolvedTheme === 'dark' ? bg.dark : bg.light;
                    const isSelected = chatBackground === bg.id;
                    const isDefault = bg.id === 'default';

                    // Determine if the background is an SVG pattern based on its data URI type
                    const isSvgPattern = bgData && typeof bgData === 'string' && bgData.startsWith('data:image/svg+xml');

                    return (
                        <button
                            key={bg.id}
                            onClick={() => setChatBackground(bg.id)}
                            className={`relative aspect-[4/5] w-full rounded-lg border-2 transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-sky-500 ${isSelected ? 'border-sky-500 ring-2 ring-sky-500/50' : 'border-slate-300 dark:border-slate-600 hover:border-sky-300 dark:hover:border-sky-400'}`}
                        >
                            <div
                                className="h-full w-full"
                                style={{
                                    backgroundColor: resolvedTheme === 'dark' ? '#1e293b' : '#f1f5f9',
                                    backgroundImage: isDefault || !bgData ? 'none' : `url("${bgData}")`,
                                    backgroundSize: '100px 100px',
                                    backgroundRepeat: 'repeat'
                                }}
                            ></div>
                            <p className="absolute bottom-0 left-0 right-0 text-center text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-1.5">{t(bg.nameKey)}</p>
                            {isSelected && (
                                <div className="absolute inset-0 bg-sky-500/30 flex items-center justify-center">
                                    <div className="bg-sky-500 rounded-full p-1.5">
                                        <CheckIcon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}


const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative animate-fade-in-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                    <CloseIcon className="h-6 w-6" />
                </button>
                <div className="text-center pr-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('settings')}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('settingsDescription')}</p>
                </div>

                <div className="space-y-6 pt-2">
                    <ThemeSelector />
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                        <WallpaperSelector />
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                        <LanguageSelector />
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                        <NotificationToggle />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsModal;
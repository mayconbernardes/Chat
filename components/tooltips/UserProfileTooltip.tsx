import React, { useContext } from 'react';
import { User } from '../../types';
import GlobeIcon from '../icons/GlobeIcon';
import LanguageIcon from '../icons/LanguageIcon';
import TagIcon from '../icons/TagIcon';
import { LanguageContext } from '../../App';

interface UserProfileTooltipProps {
  user: User;
}

const BinocularsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="5.5" cy="12.5" r="3.5" />
    <circle cx="18.5" cy="12.5" r="3.5" />
    <path d="M5.5 16h13" />
    <path d="M5.5 9h13" />
    <path d="m14 9-2-4-2 4" />
  </svg>
);

const UserProfileTooltip: React.FC<UserProfileTooltipProps> = ({ user }) => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-4 z-20 animate-fade-in-fast">
        <div className="flex items-center mb-3">
            <div className={`flex-shrink-0 h-8 w-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-bold`}>
                {user.username.charAt(0).toUpperCase()}
            </div>
            <p className="ml-2 font-bold text-slate-900 dark:text-white truncate">{user.username}</p>
        </div>
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center">
                <GlobeIcon className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400"/>
                <span>{t(user.country)}</span>
            </div>
            <div className="flex items-center">
                <LanguageIcon className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400"/>
                <span>{t(user.language)}</span>
            </div>
            {user.seeking && (
                <div className="flex items-start">
                    <BinocularsIcon className="h-4 w-4 mr-2 mt-0.5 text-slate-500 dark:text-slate-400 shrink-0"/>
                    <p className="text-sm italic text-slate-600 dark:text-slate-400 truncate">"{user.seeking}"</p>
                </div>
            )}
            {user.interests.length > 0 && (
                <div className="flex items-start">
                    <TagIcon className="h-4 w-4 mr-2 mt-0.5 text-slate-500 dark:text-slate-400"/>
                    <div className="flex flex-wrap gap-1">
                        {user.interests.map(interestKey => (
                            <span key={interestKey} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {t(interestKey)}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default UserProfileTooltip;
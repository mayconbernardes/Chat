import React, { useContext } from 'react';
import { User } from '../../types';
import CloseIcon from '../icons/CloseIcon';
import GlobeIcon from '../icons/GlobeIcon';
import LanguageIcon from '../icons/LanguageIcon';
import TagIcon from '../icons/TagIcon';
import MessageSquareIcon from '../icons/MessageSquareIcon';
import { UserAvatar } from '../screens/ChatScreen';
import { LanguageContext } from '../../App';
import ShieldOffIcon from '../icons/ShieldOffIcon';
import FlagIcon from '../icons/FlagIcon';

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
  currentUserId: string;
  onStartPrivateChat: (user: User) => void;
  onBlock: (user: User) => void;
  onReport: (user: User) => void;
  isBlocked: boolean;
}

const BinocularsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
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

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose, currentUserId, onStartPrivateChat, onBlock, onReport, isBlocked }) => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 relative animate-fade-in-up flex flex-col items-center text-center profile-modal-bg"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <CloseIcon className="h-6 w-6" />
        </button>
        
        <UserAvatar user={user} size="h-20 w-20" />
        
        <div className="w-full">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.username}</h2>
            
            <div className="text-left mt-6 space-y-3 text-slate-700 dark:text-slate-300">
                <div className="flex items-center">
                    <GlobeIcon className="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400"/>
                    <span>{t('fromLabel')} <span className="font-semibold text-slate-800 dark:text-white">{t(user.country)}</span></span>
                </div>
                <div className="flex items-center">
                    <LanguageIcon className="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400"/>
                    <span>{t('speaksLabel')} <span className="font-semibold text-slate-800 dark:text-white">{t(user.language)}</span></span>
                </div>
                {user.seeking && (
                    <div className="flex items-start">
                        <BinocularsIcon className="h-5 w-5 mr-3 mt-1 text-slate-500 dark:text-slate-400 shrink-0"/>
                        <p className="italic text-slate-600 dark:text-slate-400">"{user.seeking}"</p>
                    </div>
                )}
                {user.interests.length > 0 && (
                    <div className="flex items-start">
                        <TagIcon className="h-5 w-5 mr-3 mt-1 text-slate-500 dark:text-slate-400 shrink-0"/>
                        <div className="flex flex-wrap gap-2">
                            {user.interests.map(interestKey => (
                                <span key={interestKey} className="px-3 py-1 text-sm rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 font-medium">
                                    {t(interestKey)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {user.id !== currentUserId && (
              <div className="w-full mt-6 space-y-2">
                <button
                  onClick={() => onStartPrivateChat(user)}
                  className="w-full flex items-center justify-center bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-sky-700"
                >
                  <MessageSquareIcon className="h-5 w-5 mr-2" />
                  {t('messagePrivately')}
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => onBlock(user)}
                        className={`w-full flex items-center justify-center font-bold py-2 px-4 rounded-lg transition-colors ${isBlocked ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'}`}
                    >
                        <ShieldOffIcon className="h-5 w-5 mr-2"/>
                        {isBlocked ? t('unblockUser') : t('blockUser')}
                    </button>
                    <button
                        onClick={() => onReport(user)}
                        className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors hover:bg-red-700"
                    >
                        <FlagIcon className="h-5 w-5 mr-2"/>
                        {t('reportUser')}
                    </button>
                </div>
              </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default UserProfileModal;
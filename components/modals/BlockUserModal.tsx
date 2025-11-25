import React, { useContext } from 'react';
import { User } from '../../types';
import CloseIcon from '../icons/CloseIcon';
import ShieldOffIcon from '../icons/ShieldOffIcon';
import { LanguageContext } from '../../App';

interface BlockUserModalProps {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
  isBlocked: boolean;
}

const BlockUserModal: React.FC<BlockUserModalProps> = ({ user, onClose, onConfirm, isBlocked }) => {
  const { t } = useContext(LanguageContext);

  const title = isBlocked ? t('unblockUser') : t('blockUserConfirmationTitle');
  const message = t('blockUserConfirmationMessage').replace('{username}', user.username);
  const confirmButtonText = isBlocked ? t('unblockUser') : t('blockUser');
  const confirmButtonClass = isBlocked
    ? 'bg-yellow-500 hover:bg-yellow-600'
    : 'bg-red-600 hover:bg-red-700';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative animate-fade-in-up text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <CloseIcon className="h-6 w-6" />
        </button>
        
        <div className="flex justify-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-full">
                <ShieldOffIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
            </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-slate-600 dark:text-slate-300">
          {message}
        </p>
        
        <div className="flex justify-center gap-4 pt-2">
            <button 
                onClick={onClose} 
                className="w-full bg-slate-100 dark:bg-slate-600/50 text-slate-800 dark:text-white font-bold py-2 px-4 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
            >
                {t('cancelButton')}
            </button>
            <button 
                onClick={onConfirm} 
                className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-colors ${confirmButtonClass}`}
            >
                {confirmButtonText}
            </button>
        </div>
      </div>
    </div>
  );
};

export default BlockUserModal;
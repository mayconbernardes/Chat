import React, { useState, useContext } from 'react';
import { Room } from '../../types';
import CloseIcon from '../icons/CloseIcon';
import LockIcon from '../icons/LockIcon';
import { LanguageContext } from '../../App';

interface PasswordPromptModalProps {
  room: Room;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const PasswordPromptModal: React.FC<PasswordPromptModalProps> = ({ room, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const { t } = useContext(LanguageContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative animate-fade-in-up text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <CloseIcon className="h-6 w-6" />
        </button>
        
        <div className="flex justify-center">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
                <LockIcon className="h-8 w-8 text-sky-500 dark:text-sky-400" />
            </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('enterPassword')}</h2>
        <p className="text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{
          __html: t('passwordPromptMessage').replace('{roomName}', `<span class="font-semibold text-slate-800 dark:text-white">"${room.name}"</span>`)
        }} />
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
                <label htmlFor="room-password-prompt" className="sr-only">{t('passwordLabel')}</label>
                <input
                  id="room-password-prompt"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterRoomPassword')}
                  className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition text-center"
                  autoFocus
                  required
                />
            </div>
            <button 
                type="submit"
                disabled={!password.trim()}
                className="w-full bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-sky-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {t('joinRoom')}
            </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPromptModal;
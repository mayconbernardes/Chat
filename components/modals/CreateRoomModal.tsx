import React, { useState, useRef, useEffect, useContext } from 'react';
import { Room } from '../../types';
import { EMOJI_CATEGORIES } from '../../constants';
import CloseIcon from '../icons/CloseIcon';
import { LanguageContext } from '../../App';

interface CreateRoomModalProps {
  onClose: () => void;
  onCreateRoom: (roomDetails: Omit<Room, 'id' | 'ownerId'>) => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ onClose, onCreateRoom }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('💬');
  const [password, setPassword] = useState('');
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const { t } = useContext(LanguageContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onCreateRoom({
      name,
      icon,
      type: password ? 'private' : 'public',
      password: password || undefined,
    });
  };

  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
    setPickerOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isFormValid = name.trim().length > 2;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <CloseIcon className="h-6 w-6" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('createRoomModalTitle')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('createRoomModalSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="room-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('roomNameLabel')}</label>
            <input
              id="room-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('roomNamePlaceholder')}
              className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              required
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 relative" ref={pickerRef}>
                <label htmlFor="room-icon" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('iconLabel')}</label>
                <button
                  id="room-icon"
                  type="button"
                  onClick={() => setPickerOpen(!isPickerOpen)}
                  className="w-16 h-[42px] text-center text-2xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition flex items-center justify-center"
                >
                  {icon}
                </button>

                {isPickerOpen && (
                  <div className="absolute bottom-full mb-2 w-72 h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10 p-2 flex flex-col">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white px-2 pb-1 text-center">{t('selectAnIcon')}</h4>
                    <div className="flex-1 overflow-y-auto pr-1">
                      {EMOJI_CATEGORIES.map(category => (
                        <div key={category.name}>
                          <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 pt-2 pb-1">{t(category.name)}</h5>
                          <div className="grid grid-cols-8 gap-1">
                            {category.emojis.map(emoji => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => handleIconSelect(emoji)}
                                className="text-2xl p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <div className="flex-1">
                <label htmlFor="room-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('passwordLabel')}</label>
                <input
                  id="room-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                />
            </div>
          </div>
          
          <button type="submit" disabled={!isFormValid} className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition-colors hover:bg-sky-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed">
            {t('createRoom')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
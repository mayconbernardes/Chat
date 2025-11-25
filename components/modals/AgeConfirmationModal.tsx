import React, { useContext } from 'react';
import { Room } from '../../types';
import CloseIcon from '../icons/CloseIcon';
import { LanguageContext } from '../../App';

interface AgeConfirmationModalProps {
  room: Room;
  onClose: () => void;
  onConfirm: () => void;
}

const AgeConfirmationModal: React.FC<AgeConfirmationModalProps> = ({ room, onClose, onConfirm }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative animate-fade-in-up text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
            <CloseIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('ageConfirmationTitle')}</h2>
        <p className="text-slate-600 dark:text-slate-300">
          {t('ageConfirmationMessage')}
        </p>
        
        <div className="flex flex-col gap-3 pt-2">
            <button 
                onClick={onConfirm} 
                className="w-full bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-sky-700"
            >
                {t('ageConfirmationButtonConfirm')}
            </button>
            <button 
                onClick={onClose} 
                className="w-full bg-slate-200 dark:bg-slate-600/50 text-slate-800 dark:text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-slate-300 dark:hover:bg-slate-600"
            >
                {t('ageConfirmationButtonCancel')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AgeConfirmationModal;
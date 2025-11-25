import React, { useState, useContext } from 'react';
import { Room } from '../../types';
import CloseIcon from '../icons/CloseIcon';
import LockIcon from '../icons/LockIcon';
import { LanguageContext } from '../../App';

interface AgeVerificationModalProps {
  room: Room;
  onClose: () => void;
  onSuccess: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ room, onClose, onSuccess }) => {
  const { t } = useContext(LanguageContext);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) || dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setError(t('ageErrorInvalidDate'));
      return;
    }

    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    if (birthDate.getFullYear() !== yearNum || birthDate.getMonth() !== monthNum - 1 || birthDate.getDate() !== dayNum) {
        setError(t('ageErrorInvalidDate'));
        return;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age >= 18) {
      onSuccess();
    } else {
      setError(t('ageErrorUnderage'));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-5 relative animate-fade-in-up text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          <CloseIcon className="h-6 w-6" />
        </button>
        
        <div className="flex justify-center">
          <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-full">
            <LockIcon className="h-8 w-8 text-sky-500 dark:text-sky-400" />
          </div>
        </div>

        <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('ageVerificationTitle')}</h2>
            <p className="text-slate-600 dark:text-slate-300">
            {t('ageVerificationMessage')}
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
                <label htmlFor="dob-day" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('dobLabel')}</label>
                <div className="grid grid-cols-3 gap-3">
                    <input
                        id="dob-day"
                        type="number"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder={t('dayPlaceholder')}
                        className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-2 py-2 text-center focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                        min="1" max="31" required
                    />
                    <input
                        id="dob-month"
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeholder={t('monthPlaceholder')}
                        className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-2 py-2 text-center focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                        min="1" max="12" required
                    />
                    <input
                        id="dob-year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder={t('yearPlaceholder')}
                        className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-2 py-2 text-center focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                        min="1900" max={new Date().getFullYear()} required
                    />
                </div>
            </div>

            {error && <p className="text-sm text-red-500 dark:text-red-400 font-medium">{error}</p>}

            <button 
                type="submit"
                disabled={!day || !month || !year}
                className="w-full bg-sky-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-sky-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {t('verifyAgeButton')}
            </button>
        </form>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
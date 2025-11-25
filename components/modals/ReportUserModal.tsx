import React, { useState, useContext } from 'react';
import { User, ReportReason } from '../../types';
import CloseIcon from '../icons/CloseIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import FlagIcon from '../icons/FlagIcon';
import { LanguageContext } from '../../App';

interface ReportUserModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (reason: ReportReason, details: string) => void;
}

const ReportUserModal: React.FC<ReportUserModalProps> = ({ user, onClose, onSubmit }) => {
  const { t } = useContext(LanguageContext);
  const [reason, setReason] = useState<ReportReason>(ReportReason.Spam);
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reason, details);
  };
  
  const reportReasons = Object.values(ReportReason);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          <CloseIcon className="h-6 w-6" />
        </button>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
              <FlagIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('reportUserTitle').replace('{username}', user.username)}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="report-reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('reportReason')}</label>
            <div className="relative">
              <select
                id="report-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-700 border dark:border-2 border-slate-300 dark:border-slate-400 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              >
                {reportReasons.map(r => <option key={r} value={r}>{t(r)}</option>)}
              </select>
              <ChevronDownIcon className="h-5 w-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label htmlFor="report-details" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('additionalDetails')}</label>
            <textarea
              id="report-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="..."
              className="w-full bg-slate-50 dark:bg-slate-700 border dark:border-2 border-slate-300 dark:border-slate-400 text-slate-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onClose} className="w-full bg-slate-100 dark:bg-slate-600/50 text-slate-800 dark:text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-600">
              {t('cancelButton')}
            </button>
            <button type="submit" className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-red-700">
              {t('submitReport')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportUserModal;
// FIX: Provide full implementation for TermsScreen.tsx to resolve file content errors.
import React from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface TermsScreenProps {
  onBack: () => void;
}

const TermsScreen: React.FC<TermsScreenProps> = ({ onBack }) => {
  return (
    <div className="h-full w-full flex flex-col animate-fade-in">
      <header className="flex-shrink-0 flex items-center px-4 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors mr-2">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">🧾 ChatZa – Terms of Service</h1>
      </header>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-h3:text-sky-600 dark:prose-h3:text-sky-400 prose-a:text-sky-600 dark:prose-a:text-sky-400 hover:prose-a:text-sky-500 dark:hover:prose-a:text-sky-300">
          <p><em>Last updated: October 30, 2025</em></p>
          <p>Welcome to ChatZa, a global anonymous chat platform that allows instant communication between users around the world, without requiring registration or personal data.</p>
          <p>By accessing or using ChatZa, you agree to these Terms of Service and our Privacy Policy. If you do not agree with any part of these Terms, do not use the service.</p>

          <h3>1. Nature of the Service</h3>
          <p>ChatZa is a public and anonymous instant messaging platform. No registration, personal identification, or authentication is required to use it.</p>
          <p>All messages are ephemeral and are not stored on our servers.</p>

          <h3>2. User Responsibilities</h3>
          <p>By using ChatZa, you agree to:</p>
          <ul>
            <li>Not share or post content that is illegal, harmful, defamatory, discriminatory, sexually explicit, violent, or incites hatred.</li>
            <li>Respect local and international laws, including those governing hate speech, harassment, and defamation.</li>
            <li>Understand that all messages are public and temporary — ChatZa does not retain chat logs or message history.</li>
            <li>You are solely responsible for all content you share while using the platform.</li>
          </ul>

          <h3>3. Moderation and Content Removal</h3>
          <p>To maintain a safe and respectful environment, ChatZa may use automatic filters and limited moderation tools. Messages containing prohibited language may be automatically blocked.</p>
          <p>ChatZa reserves the right to:</p>
          <ul>
            <li>Block or suspend users who violate these Terms;</li>
            <li>Implement automated content filtering or reporting systems;</li>
            <li>Cooperate with law enforcement only under a valid court order.</li>
          </ul>

          <h3>4. Anonymity and Limitation of Liability</h3>
          <p>ChatZa is designed to preserve user anonymity. No personally identifiable information (PII) such as names, emails, or full IP addresses is requested or stored.</p>
          <p>However, temporary technical data (such as anonymized IP fragments, session IDs, and timestamps) may be processed for security and system stability purposes in accordance with GDPR Article 5(1)(c) – data minimization principle.</p>
          <p>ChatZa shall not be held liable for user-generated content or for any direct, indirect, moral, or material damages arising from the use of the service.</p>

          <h3>5. Age Restrictions (COPPA & GDPR Article 8)</h3>
          <p>ChatZa is not intended for children under the age of 13. Users aged 13–16 may use the service only with verifiable parental consent. By using ChatZa, you confirm that you meet the minimum legal age requirements applicable in your country.</p>

          <h3>6. Suspension and Termination</h3>
          <p>ChatZa may suspend, limit, or terminate access to any user who violates these Terms or uses the service for unlawful purposes.</p>

          <h3>7. Amendments</h3>
          <p>ChatZa may update these Terms periodically to reflect legal, technical, or operational changes. The date of the latest update will always be displayed at the top of this document.</p>
          
          <h3>8. Governing Law and Legal Compliance</h3>
          <p>These Terms are governed by and designed to comply with:</p>
          <ul>
            <li>GDPR – General Data Protection Regulation (EU Regulation 2016/679)</li>
            <li>LGPD – Lei Geral de Proteção de Dados (Brazil, Law No. 13.709/2018)</li>
            <li>CCPA – California Consumer Privacy Act (Cal. Civ. Code §1798.100)</li>
            <li>DSA – EU Digital Services Act (Regulation EU 2022/2065)</li>
            <li>COPPA – Children’s Online Privacy Protection Act (USA)</li>
          </ul>
          <p>In case of jurisdictional disputes, the governing law shall be that of the country hosting the platform’s primary server.</p>
        </div>
      </main>
    </div>
  );
};

export default TermsScreen;

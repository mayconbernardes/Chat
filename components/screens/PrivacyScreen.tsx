// FIX: Provide full implementation for PrivacyScreen.tsx to resolve file content errors.
import React from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface PrivacyScreenProps {
  onBack: () => void;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  return (
    <div className="h-full w-full flex flex-col animate-fade-in">
      <header className="flex-shrink-0 flex items-center px-4 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors mr-2">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">🔒 ChatZa – Privacy Policy</h1>
      </header>
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-h3:text-sky-600 dark:prose-h3:text-sky-400 prose-a:text-sky-600 dark:prose-a:text-sky-400 hover:prose-a:text-sky-500 dark:hover:prose-a:text-sky-300">
          <p><em>Last updated: October 30, 2025</em></p>
          
          <h3>1. General Principle</h3>
          <p>ChatZa is built on the principles of privacy by design and complete anonymity. We do not collect, store, or share any personally identifiable information.</p>

          <h3>2. Data We Process</h3>
          <p>ChatZa does not require account registration, does not use tracking cookies, and does not collect personal data.</p>
          <p>We may temporarily process non-personal technical data, including:</p>
          <ul>
            <li>Anonymized IP fragments (truncated or hashed)</li>
            <li>Random session ID (UUID)</li>
            <li>Language and timezone information</li>
            <li>Connection timestamp</li>
          </ul>
          <p>All such data are automatically deleted once the session ends.</p>

          <h3>3. Purpose and Legal Basis (GDPR Article 6)</h3>
          <p>This minimal technical processing is done solely for:</p>
          <ul>
            <li>System security and stability (legitimate interest – GDPR Art. 6(1)(f));</li>
            <li>Spam and abuse prevention;</li>
            <li>Performance optimization.</li>
          </ul>
          <p>No behavioral analysis or profiling is ever performed.</p>

          <h3>4. Data Sharing</h3>
          <p>ChatZa does not share, sell, or transfer data to any third parties. Data disclosure occurs only under a valid and lawful court order.</p>

          <h3>5. Data Retention and Deletion</h3>
          <p>All temporary session data are automatically deleted when the chat session ends. There are no persistent databases storing users or messages.</p>

          <h3>6. User Rights</h3>
          <p>Even in an anonymous system, users may:</p>
          <ul>
            <li>Request confirmation of any temporary data processing;</li>
            <li>Request immediate deletion of session-related data (GDPR Article 17 – Right to Erasure).</li>
          </ul>
          <p>Contact: privacy@chatza.global</p>

          <h3>7. Security Measures</h3>
          <p>ChatZa applies strong technical safeguards:</p>
          <ul>
            <li>TLS (HTTPS) encryption for all connections;</li>
            <li>IP anonymization and hashing;</li>
            <li>DDoS and injection protection;</li>
            <li>Servers located in jurisdictions with adequate data protection (GDPR Art. 45).</li>
          </ul>

          <h3>8. Children’s Privacy</h3>
          <p>ChatZa does not knowingly collect any data from children and does not display targeted advertising. If underage usage (under 13) is detected, the session will be terminated.</p>

          <h3>9. Updates to This Policy</h3>
          <p>We may update this Privacy Policy periodically. All revisions will be published on this page with the updated date.</p>

          <h3>10. Contact Information</h3>
          <p>For privacy or compliance inquiries:<br/>
          📧 privacy@chatza.global<br/>
          🌍 www.chatza.global/legal</p>

          <h3>✅ Legal Compliance Summary</h3>
          <p>This document ensures full compliance with:</p>
          <ul>
            <li>GDPR (EU) – Regulation (EU) 2016/679</li>
            <li>LGPD (Brazil) – Law No. 13.709/2018</li>
            <li>CCPA (California, USA) – Cal. Civ. Code §1798.100</li>
            <li>COPPA (USA) – Children’s Online Privacy Protection Act</li>
            <li>DSA (EU) – Digital Services Act 2022/2065</li>
            <li>ISO/IEC 27701:2019 – International Privacy Management Standard</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default PrivacyScreen;

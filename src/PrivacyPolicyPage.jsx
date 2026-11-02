import React, { useState } from 'react';

const SECTIONS = [
  { id: 'who-we-are', title: 'Who We Are', icon: 'fas fa-building' },
  { id: 'governing-law', title: 'Governing Law', icon: 'fas fa-gavel' },
  { id: 'data-collection', title: 'Information We Collect', icon: 'fas fa-database' },
  { id: 'data-usage', title: 'Purpose of Processing', icon: 'fas fa-cogs' },
  { id: 'google-limited-use', title: 'Google Limited Use', icon: 'fab fa-google' },
  { id: 'microsoft-outlook-use', title: 'Microsoft / Outlook', icon: 'fab fa-microsoft' },
  { id: 'source-email-availability', title: 'Source Email & Backfill', icon: 'fas fa-envelope-open-text' },
  { id: 'data-storage', title: 'Data Storage & Infrastructure', icon: 'fas fa-server' },
  { id: 'legal-bases', title: 'Legal Basis for Processing', icon: 'fas fa-balance-scale' },
  { id: 'sharing', title: 'Data Sharing & Third-Party Disclosures', icon: 'fas fa-share-alt' },
  { id: 'retention', title: 'Data Retention', icon: 'fas fa-clock' },
  { id: 'cookies', title: 'Cookies', icon: 'fas fa-cookie-bite' },
  { id: 'security', title: 'Security & Safeguards', icon: 'fas fa-lock' },
  { id: 'support-access', title: 'Support Access', icon: 'fas fa-user-shield' },
  { id: 'security-responsibility', title: 'Security Responsibility', icon: 'fas fa-key' },
  { id: 'incident-response', title: 'Incident Response', icon: 'fas fa-bell' },
  { id: 'account-termination', title: 'Account Deletion & Data Lifecycle', icon: 'fas fa-user-times' },
  { id: 'terms', title: 'Terms & Conditions', icon: 'fas fa-file-contract' }
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState('who-we-are');

  return (
    <div className="privacy-page-wrapper">
      {/* Sticky Left Sidebar with All 18 Sections */}
      <aside className="privacy-sidebar-nav">
        <h4 className="privacy-sidebar-title">Privacy &amp; Terms</h4>
        <ul className="privacy-nav-list">
          {SECTIONS.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className={`privacy-nav-link ${activeId === sec.id ? 'active' : ''}`}
                onClick={() => setActiveId(sec.id)}
              >
                <i className={sec.icon} />
                <span>{sec.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Privacy Policy Content */}
      <main className="privacy-content-area">
        <div className="privacy-hero-header">
          <h1 className="privacy-main-title">Privacy Policy &amp; Terms</h1>
          <p className="privacy-subtitle-date">
            <i className="fas fa-calendar-alt" />
            <span>Last Updated: 2026 • ADMS - AI Logic Tools M&amp;T Ltd.</span>
          </p>
        </div>

        {/* 1. Who We Are */}
        <section id="who-we-are" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">01.</span>
            Who We Are
          </h2>
          <p className="privacy-text">
            ADMS (Advanced Document Management System) is owned and operated by <strong>AI Logic Tools M&amp;T Ltd.</strong>, incorporated in Brampton, Ontario, Canada.
          </p>
          <div className="privacy-info-card">
            <p className="privacy-text" style={{ margin: 0 }}>
              <strong>Support Email:</strong> <a href="mailto:help.adms@ailogictools.ca" style={{ color: '#2563EB' }}>help.adms@ailogictools.ca</a><br />
              <strong>Privacy Inquiries:</strong> <a href="mailto:help.adms@ailogictools.ca" style={{ color: '#2563EB' }}>help.adms@ailogictools.ca</a>
            </p>
          </div>
        </section>

        {/* 2. Governing Law */}
        <section id="governing-law" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">02.</span>
            Governing Law
          </h2>
          <p className="privacy-text">
            This Policy and your use of ADMS are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict-of-law principles. Disputes are subject to the exclusive jurisdiction of the courts located in Brampton, Ontario, Canada.
          </p>
        </section>

        {/* 3. Information We Collect */}
        <section id="data-collection" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">03.</span>
            Information We Collect
          </h2>
          <p className="privacy-text">
            We collect only the information necessary to provide, secure, and improve our services:
          </p>
          <ul className="privacy-bullet-list">
            <li><strong>Account &amp; Profile Data:</strong> Name, work email address, organization/workspace details, and authentication credentials.</li>
            <li><strong>Connected Mailbox Metadata:</strong> Sender address, timestamp, message identifier, attachment filename, file size, and MIME type.</li>
            <li><strong>Document Attachments:</strong> Ingested files (PDFs, images, spreadsheets, statements, tax returns, forms) uploaded directly or received via connected email.</li>
            <li><strong>Extracted Data:</strong> Fields identified through AI processing such as client names, dates, document types, and structured tags.</li>
          </ul>
        </section>

        {/* 4. Purpose of Processing */}
        <section id="data-usage" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">04.</span>
            Purpose of Processing
          </h2>
          <p className="privacy-text">
            ADMS processes user data strictly to:
          </p>
          <ul className="privacy-bullet-list">
            <li>Deliver automated document classification, smart renaming, and folder organization.</li>
            <li>Authenticate accounts and secure workspaces against fraud and abuse.</li>
            <li>Provide client support, system troubleshooting, and service reliability monitoring.</li>
          </ul>
        </section>

        {/* 5. Google Limited Use */}
        <section id="google-limited-use" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">05.</span>
            Google User Data &amp; Limited Use
          </h2>
          <p className="privacy-text">
            ADMS’ use and transfer of information received from Google APIs adheres to the <strong>Google API Services User Data Policy</strong>, including the Limited Use requirements:
          </p>
          <ul className="privacy-bullet-list">
            <li>We only access Gmail attachments and attachment-related metadata; we never read, store, or display the body of personal emails.</li>
            <li>We never sell Google user data or transfer it to third-party ad networks or brokers.</li>
            <li>We do not train generalized AI models on your private documents.</li>
            <li>Access is revocable at any time from your ADMS dashboard or directly via Google Account settings.</li>
          </ul>
        </section>

        {/* 6. Microsoft / Outlook */}
        <section id="microsoft-outlook-use" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">06.</span>
            Microsoft / Outlook User Data
          </h2>
          <p className="privacy-text">
            When connecting an Outlook mailbox via Microsoft OAuth, access is strictly limited to retrieving document attachments. ADMS never modifies your mailbox settings, sends emails, deletes messages, or accesses links inside email bodies.
          </p>
        </section>

        {/* 7. Source Email & Backfill */}
        <section id="source-email-availability" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">07.</span>
            Source Email &amp; Backfill
          </h2>
          <p className="privacy-text">
            ADMS can only ingest or backfill messages that exist in your connected mailbox at the time of processing. If an email is deleted from your provider before ingestion, ADMS cannot retrieve it.
          </p>
        </section>

        {/* 8. Data Storage & Infrastructure */}
        <section id="data-storage" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">08.</span>
            Data Storage &amp; Infrastructure
          </h2>
          <p className="privacy-text">
            All database records and file attachments are stored in enterprise cloud infrastructure with encrypted virtual disk storage, regular snapshots, and strict physical access security.
          </p>
        </section>

        {/* 9. Legal Basis for Processing */}
        <section id="legal-bases" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">09.</span>
            Legal Basis for Processing
          </h2>
          <p className="privacy-text">
            We process data based on: <strong>Contractual Necessity</strong> (to deliver the service you subscribed to), <strong>User Consent</strong> (OAuth mailbox authorization), and <strong>Legitimate Interests</strong> (protecting platform integrity and preventing fraud).
          </p>
        </section>

        {/* 10. Data Sharing & Third-Party Disclosures */}
        <section id="sharing" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">10.</span>
            Data Sharing &amp; Third-Party Disclosures
          </h2>
          <p className="privacy-text">
            We do not sell, rent, or trade your personal information. Information is only shared with trusted cloud hosting providers bound by confidentiality and data processing agreements.
          </p>
        </section>

        {/* 11. Data Retention */}
        <section id="retention" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">11.</span>
            Data Retention
          </h2>
          <p className="privacy-text">
            Documents and extracted metadata are retained for as long as your workspace is active, or until you choose to delete them. Operational security logs are automatically rotated every 30-90 days.
          </p>
        </section>

        {/* 12. Cookies */}
        <section id="cookies" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">12.</span>
            Cookies
          </h2>
          <p className="privacy-text">
            We use essential cookies strictly for secure session maintenance, CSRF protection, and user authentication. No third-party ad tracking cookies are utilized.
          </p>
        </section>

        {/* 13. Security & Safeguards */}
        <section id="security" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">13.</span>
            Security &amp; Safeguards
          </h2>
          <p className="privacy-text">
            Data is protected by TLS 1.2+ encryption in transit and AES-256 encryption at rest. OAuth tokens are stored in encrypted vaults and accessed with least-privilege role-based access.
          </p>
        </section>

        {/* 14. Support Access */}
        <section id="support-access" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">14.</span>
            Support Access
          </h2>
          <p className="privacy-text">
            Internal team access to customer data is strictly prohibited unless specifically requested by the user for technical support or where legally mandated.
          </p>
        </section>

        {/* 15. Security Responsibility */}
        <section id="security-responsibility" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">15.</span>
            Security Responsibility
          </h2>
          <p className="privacy-text">
            Security is a shared responsibility. Users are responsible for safeguarding their login credentials and maintaining multi-factor authentication (MFA) on their connected accounts.
          </p>
        </section>

        {/* 16. Incident Response */}
        <section id="incident-response" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">16.</span>
            Incident Response
          </h2>
          <p className="privacy-text">
            In the event of a confirmed security incident affecting personal information, ADMS maintains rapid containment protocols and will notify affected users in accordance with applicable laws.
          </p>
        </section>

        {/* 17. Account Deletion & Data Lifecycle */}
        <section id="account-termination" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">17.</span>
            Account Deletion &amp; Data Lifecycle
          </h2>
          <p className="privacy-text">
            Users may permanently delete their account and associated documents from their workspace settings at any time. Upon deletion, all stored files and OAuth tokens are permanently purged within 30 days.
          </p>
        </section>

        {/* 18. Terms & Conditions */}
        <section id="terms" className="privacy-section-block">
          <h2 className="privacy-section-heading">
            <span className="privacy-section-number">18.</span>
            Terms &amp; Conditions
          </h2>
          <p className="privacy-text">
            By accessing or using ADMS, you agree to comply with our acceptable use policies, not to upload unlawful materials, and to respect intellectual property and data rights.
          </p>
        </section>
      </main>
    </div>
  );
}


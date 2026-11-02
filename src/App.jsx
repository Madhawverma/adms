import React, { useState, useEffect } from 'react';
import PrivacyPolicyPage from './PrivacyPolicyPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [laptopActiveTab, setLaptopActiveTab] = useState('gmail'); // 'gmail', 'ai', 'processing', 'documents', 'clients', 'reports', 'settings'
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileScreenTab, setMobileScreenTab] = useState(0); // 0: Scanning & stream, 1: AI Chat insight, 2: Cloud Vault folders
  const [badgesTriggered, setBadgesTriggered] = useState(false);

  // Trigger pop-out animation only ONCE when phone section first enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setBadgesTriggered(true);
          observer.disconnect(); // Runs only once, never repeats
        }
      },
      { threshold: 0.25 }
    );

    const target = document.getElementById('phone-showcase-section');
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  // Automatically cycle through mobile screens every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMobileScreenTab((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('how-it-works');
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // calculate how far section has scrolled into view (0 to 1)
        const totalDist = rect.height + windowHeight;
        const currentDist = windowHeight - rect.top;
        const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#privacy' || hash.startsWith('#privacy/')) {
        setCurrentPage('privacy');
      } else if (hash === '#home' || hash === '' || hash === '#/') {
        setCurrentPage('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page, e) => {
    if (e) e.preventDefault();
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="hero-page-canvas">
      {/* Decorative ambient background wave gradients */}
      <div className="bg-wave-glow-center" />

      {/* Top Navbar Header with Official Logo */}
      <header className="adms-navbar">
        <div className="navbar-container">

          {/* Brand Logo */}
          <a href="#home" onClick={(e) => navigateTo('home', e)} className="brand-link">
            <img
              src="/images/adms-logo-tight.png"
              alt="ADMS AUTOMATE ORGANZE FIND"
              className="brand-logo-img"
            />
          </a>

          {/* Center Navigation Links with Exact Icons */}
          <nav className="navbar-nav">
            <a href="#features" onClick={() => currentPage !== 'home' && setCurrentPage('home')} className="nav-link">
              <i className="fas fa-rocket" />
              <span>Features</span>
            </a>
            <a href="#how-it-works" onClick={() => currentPage !== 'home' && setCurrentPage('home')} className="nav-link">
              <i className="fas fa-cogs" />
              <span>How It Works</span>
            </a>
            <a href="#data-use" onClick={() => currentPage !== 'home' && setCurrentPage('home')} className="nav-link">
              <i className="fas fa-database" />
              <span>Data Use</span>
            </a>
            <a href="#about" onClick={() => currentPage !== 'home' && setCurrentPage('home')} className="nav-link">
              <i className="fas fa-info-circle" />
              <span>About</span>
            </a>
            <a
              href="#privacy"
              onClick={(e) => navigateTo('privacy', e)}
              className={`nav-link ${currentPage === 'privacy' ? 'text-blue-600 font-bold' : ''}`}
            >
              <i className="fas fa-shield-alt" />
              <span>Privacy</span>
            </a>
            <a href="#contact" className="nav-link">
              <i className="fas fa-envelope" />
              <span>Contact</span>
            </a>
          </nav>

          {/* Action Login & Register Buttons */}
          <div className="navbar-actions">
            <a href="#login" className="btn-login-pill">
              <i className="fas fa-sign-in-alt" />
              <span>Login</span>
            </a>
            <a href="#register" className="btn-register-pill">
              <i className="fas fa-user-plus" />
              <span>Register</span>
            </a>
          </div>
        </div>
      </header>

      {/* Conditionally Render Privacy Policy Page OR Main Home Page */}
      {currentPage === 'privacy' ? (
        <PrivacyPolicyPage onNavigateHome={() => setCurrentPage('home')} />
      ) : (
        <>
          {/* Hero Main Body (Section 1) */}
          <main className="hero-main-container">
            <div className="hero-body-grid">
              {/* Left Text & CTA Elements */}
              <div className="hero-left-col">
                <div className="hero-chip-badge">
                  <i className="fas fa-sparkles" />
                  <span>AI-Powered Document Management</span>
                </div>

                {/* Gradient & Dark Title */}
                <h1 className="hero-main-title">
                  <span className="title-dark">ADMS — </span>
                  <span className="title-gradient-blue">Document Management</span>
                  <span className="title-dark-rest">System for Mortgage &amp; Financial Teams</span>
                </h1>

                <p className="hero-paragraph-text">
                  ADMS is a web application that automatically reads document
                  attachments from your connected Gmail inbox, classifies them
                  with AI (tax returns, NOAs, IDs, bank statements, and 50+ other
                  types), renames each file using extracted dates and client
                  names, and files them into the correct client folder.
                </p>

                <div className="hero-cta-row">
                  <a href="#register" className="btn-get-started">
                    <i className="fas fa-bolt" />
                    <span>Get Started Free</span>
                    <i className="fas fa-arrow-right" />
                  </a>

                  <a href="#demo" className="btn-see-how">
                    <i className="fas fa-play-circle" />
                    <span>See How It Works</span>
                  </a>
                </div>
              </div>

              {/* Right Visual Scene - Floating Laptop without Podium */}
              <div className="hero-right-col">
                <div className="hero-scene-wrapper">

                  {/* Central Laptop Mockup Showing ADMS Software */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                    <div className="laptop-mockup">
                      <div className="laptop-camera-dot" />

                      {/* Laptop Screen Interface */}
                      <div className="laptop-screen">
                        {/* Software Sidebar */}
                        <div className="screen-sidebar">
                          <div className="screen-brand">
                            <div className="screen-brand-logo-wrap">
                              <svg viewBox="0 0 24 24" fill="none" className="screen-brand-icon">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="1.2" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span className="screen-brand-text">ADMS</span>
                          </div>

                          {/* 1. Gmail Inbox Tab */}
                          <div
                            className={`sidebar-tab ${laptopActiveTab === 'gmail' ? 'active' : ''}`}
                            onClick={() => setLaptopActiveTab('gmail')}
                            title="Gmail Ingestion & Attachment Scan"
                          >
                            <img
                              src="/images/gmail-icon.png"
                              alt="Gmail"
                              style={{ width: '15px', height: '15px', objectFit: 'contain', flexShrink: 0 }}
                            />
                            <span>Gmail Inbox</span>
                          </div>

                          {/* 2. AI Engine Tab */}
                          <div
                            className={`sidebar-tab ${laptopActiveTab === 'ai' ? 'active' : ''}`}
                            onClick={() => setLaptopActiveTab('ai')}
                            style={laptopActiveTab === 'ai' ? {} : { background: 'rgba(0, 210, 255, 0.1)', color: '#00D2FF' }}
                            title="AI Document Intelligence & Chat"
                          >
                            <i className="fas fa-robot" />
                            <span>AI Engine</span>
                          </div>

                          {/* 3. Processing Tab */}
                          <div
                            className={`sidebar-tab ${laptopActiveTab === 'processing' ? 'active' : ''}`}
                            onClick={() => setLaptopActiveTab('processing')}
                            title="Active Processing Queue"
                          >
                            <i className="fas fa-sync-alt" />
                            <span>Processing</span>
                          </div>

                          {/* 4. Documents Tab */}
                          <div
                            className={`sidebar-tab ${laptopActiveTab === 'documents' ? 'active' : ''}`}
                            onClick={() => setLaptopActiveTab('documents')}
                            title="Categorized Document Repository"
                          >
                            <i className="fas fa-folder-open" />
                            <span>Documents</span>
                          </div>

                          {/* 5. Clients Tab */}
                          <div
                            className={`sidebar-tab ${laptopActiveTab === 'clients' ? 'active' : ''}`}
                            onClick={() => setLaptopActiveTab('clients')}
                            title="Client Profiles & Files"
                          >
                            <i className="fas fa-users" />
                            <span>Clients</span>
                          </div>

                          {/* 6. Reports Tab */}
                          <div
                            className={`sidebar-tab ${laptopActiveTab === 'reports' ? 'active' : ''}`}
                            onClick={() => setLaptopActiveTab('reports')}
                            title="Filing Accuracy & Analytics"
                          >
                            <i className="fas fa-chart-line" />
                            <span>Reports</span>
                          </div>

                          {/* 7. Settings Tab */}
                          <div
                            className={`sidebar-tab ${laptopActiveTab === 'settings' ? 'active' : ''}`}
                            onClick={() => setLaptopActiveTab('settings')}
                            title="OAuth, Permissions & Rules"
                          >
                            <i className="fas fa-cog" />
                            <span>Settings</span>
                          </div>
                        </div>

                        {/* Software Main View - Dynamically Changes Per Tab */}
                        <div className="screen-main">
                          {/* TAB 1: GMAIL INBOX */}
                          {laptopActiveTab === 'gmail' && (
                            <>
                              <div className="screen-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="screen-header-title">Gmail Ingestion &amp; Sync</span>
                                  <span style={{ fontSize: '9px', background: '#DCFCE7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    CONNECTED
                                  </span>
                                </div>
                                <div className="screen-progress-wrap">
                                  <div className="screen-progress-bar">
                                    <div className="screen-progress-fill" style={{ width: '85%' }} />
                                  </div>
                                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#10B981' }}>85%</span>
                                </div>
                              </div>

                              <div className="screen-doc-list">
                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <div className="doc-icon-badge" style={{ background: '#EF4444' }}>PDF</div>
                                    <div>
                                      <div className="doc-name-text">Tax_Return_2024.pdf</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>From: client.john@gmail.com</div>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '9px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 5px', borderRadius: '4px', fontWeight: '600' }}>Filed</span>
                                </div>

                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <div className="doc-icon-badge" style={{ background: '#F59E0B' }}>NOA</div>
                                    <div>
                                      <div className="doc-name-text">NOA_2023_Sarah.pdf</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>From: sarah.w@firm.ca</div>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '9px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 5px', borderRadius: '4px', fontWeight: '600' }}>Filed</span>
                                </div>

                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <div className="doc-icon-badge" style={{ background: '#3B82F6' }}>DL</div>
                                    <div>
                                      <div className="doc-name-text">DriverLicense_Front.jpg</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>From: mike@apexmortgage.com</div>
                                    </div>
                                  </div>
                                  <i className="fas fa-spinner fa-spin doc-status-icon" style={{ color: '#3B82F6' }} />
                                </div>
                              </div>
                            </>
                          )}

                          {/* TAB 2: AI ENGINE (Interactive AI Chat & Analysis) */}
                          {laptopActiveTab === 'ai' && (
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '6px' }}>
                              <div className="screen-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="screen-header-title">ADMS AI Intelligence Copilot</span>
                                  <span style={{ fontSize: '9px', background: '#F3E8FF', color: '#6B21A8', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    MODEL v3.2
                                  </span>
                                </div>
                                <span style={{ fontSize: '9px', color: '#10B981', fontWeight: '700' }}>● Online</span>
                              </div>

                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
                                <div style={{ alignSelf: 'flex-start', background: '#F1F5F9', padding: '6px 9px', borderRadius: '8px', maxWidth: '85%' }}>
                                  <span style={{ fontSize: '9.5px', color: '#334155' }}>
                                    👋 I just verified <b>Tax_Return_2024.pdf</b>. Total income: $94,200, Notice of Assessment matching 100%. Where should I archive?
                                  </span>
                                </div>

                                <div style={{ alignSelf: 'flex-end', background: '#2563EB', color: '#FFF', padding: '6px 9px', borderRadius: '8px', maxWidth: '85%' }}>
                                  <span style={{ fontSize: '9.5px' }}>
                                    File to Mortgage &gt; John Doe &gt; 2024 Taxes folder.
                                  </span>
                                </div>

                                <div style={{ alignSelf: 'flex-start', background: '#F1F5F9', padding: '6px 9px', borderRadius: '8px', maxWidth: '85%' }}>
                                  <span style={{ fontSize: '9.5px', color: '#334155' }}>
                                    ✅ Categorized &amp; tagged under <b>Clients / John Doe</b>. Next document ready!
                                  </span>
                                </div>
                              </div>

                              <div style={{ display: 'flex', gap: '4px', background: '#FFF', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '3px 6px', alignItems: 'center' }}>
                                <input
                                  type="text"
                                  readOnly
                                  value="Ask ADMS AI about document dates, totals or rules..."
                                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: '9px', color: '#64748B', background: 'transparent' }}
                                />
                                <button style={{ background: '#2563EB', color: '#FFF', border: 'none', borderRadius: '4px', padding: '2px 6px', fontSize: '9px' }}>
                                  <i className="fas fa-paper-plane" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* TAB 3: PROCESSING */}
                          {laptopActiveTab === 'processing' && (
                            <>
                              <div className="screen-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="screen-header-title">Active Queue &amp; OCR Engine</span>
                                  <span style={{ fontSize: '9px', background: '#FEF3C7', color: '#92400E', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    4 IN QUEUE
                                  </span>
                                </div>
                                <span style={{ fontSize: '9.5px', color: '#2563EB', fontWeight: '700' }}>Auto-retry on</span>
                              </div>

                              <div className="screen-doc-list">
                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <i className="fas fa-spinner fa-spin" style={{ color: '#2563EB', fontSize: '13px' }} />
                                    <div>
                                      <div className="doc-name-text">Bank_Statement_Jan2026.pdf</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>Extracting transaction ledger...</div>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '9px', color: '#2563EB', fontWeight: '700' }}>68%</span>
                                </div>

                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <i className="fas fa-clock" style={{ color: '#F59E0B', fontSize: '13px' }} />
                                    <div>
                                      <div className="doc-name-text">Paystub_December_2025.pdf</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>Pending OCR classification</div>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '8.5px', background: '#F1F5F9', color: '#475569', padding: '2px 5px', borderRadius: '4px' }}>Queued</span>
                                </div>

                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '13px' }} />
                                    <div>
                                      <div className="doc-name-text">Mortgage_Approval_Signed.pdf</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>Extracted 12 signature keys</div>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '9px', color: '#10B981', fontWeight: '700' }}>Done</span>
                                </div>
                              </div>
                            </>
                          )}

                          {/* TAB 4: DOCUMENTS */}
                          {laptopActiveTab === 'documents' && (
                            <>
                              <div className="screen-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="screen-header-title">Smart Vault &amp; Folders</span>
                                  <span style={{ fontSize: '9px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    1,420 FILES
                                  </span>
                                </div>
                                <i className="fas fa-search" style={{ color: '#94A3B8', fontSize: '10px' }} />
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <i className="fas fa-folder" style={{ color: '#0062FF', fontSize: '14px' }} />
                                  <div>
                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E293B' }}>Taxes &amp; NOA</div>
                                    <div style={{ fontSize: '8px', color: '#64748B' }}>342 files</div>
                                  </div>
                                </div>

                                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <i className="fas fa-folder" style={{ color: '#10B981', fontSize: '14px' }} />
                                  <div>
                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E293B' }}>Bank Statements</div>
                                    <div style={{ fontSize: '8px', color: '#64748B' }}>512 files</div>
                                  </div>
                                </div>

                                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <i className="fas fa-folder" style={{ color: '#8B5CF6', fontSize: '14px' }} />
                                  <div>
                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E293B' }}>ID &amp; Licenses</div>
                                    <div style={{ fontSize: '8px', color: '#64748B' }}>189 files</div>
                                  </div>
                                </div>

                                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <i className="fas fa-folder" style={{ color: '#06B6D4', fontSize: '14px' }} />
                                  <div>
                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E293B' }}>Legal Mortgages</div>
                                    <div style={{ fontSize: '8px', color: '#64748B' }}>377 files</div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {/* TAB 5: CLIENTS */}
                          {laptopActiveTab === 'clients' && (
                            <>
                              <div className="screen-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="screen-header-title">Client Records &amp; Linking</span>
                                  <span style={{ fontSize: '9px', background: '#E0E7FF', color: '#3730A3', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    ACTIVE CRM
                                  </span>
                                </div>
                                <span style={{ fontSize: '9px', color: '#2563EB', fontWeight: '700' }}>+ Add Client</span>
                              </div>

                              <div className="screen-doc-list">
                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#3B82F6', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700' }}>
                                      JD
                                    </div>
                                    <div>
                                      <div className="doc-name-text">John Doe (Mortgage App #482)</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>7 docs filed • 100% complete</div>
                                    </div>
                                  </div>
                                  <i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '12px' }} />
                                </div>

                                <div className="doc-row-item">
                                  <div className="doc-info-left">
                                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700' }}>
                                      SW
                                    </div>
                                    <div>
                                      <div className="doc-name-text">Sarah Williams</div>
                                      <div style={{ fontSize: '8.5px', color: '#64748B' }}>5 docs filed • Missing ID</div>
                                    </div>
                                  </div>
                                  <span style={{ fontSize: '8px', background: '#FEF3C7', color: '#B45309', padding: '2px 4px', borderRadius: '4px' }}>Needs ID</span>
                                </div>
                              </div>
                            </>
                          )}

                          {/* TAB 6: REPORTS */}
                          {laptopActiveTab === 'reports' && (
                            <>
                              <div className="screen-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="screen-header-title">Accuracy &amp; Time Saved</span>
                                  <span style={{ fontSize: '9px', background: '#DCFCE7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    THIS MONTH
                                  </span>
                                </div>
                                <i className="fas fa-download" style={{ color: '#64748B', fontSize: '10px' }} />
                              </div>

                              <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ flex: 1, background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#2563EB' }}>99.4%</div>
                                  <div style={{ fontSize: '8px', color: '#64748B' }}>AI Filing Accuracy</div>
                                </div>

                                <div style={{ flex: 1, background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#10B981' }}>42.5 hrs</div>
                                  <div style={{ fontSize: '8px', color: '#64748B' }}>Manual Filing Saved</div>
                                </div>

                                <div style={{ flex: 1, background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#8B5CF6' }}>2.1 sec</div>
                                  <div style={{ fontSize: '8px', color: '#64748B' }}>Avg Processing</div>
                                </div>
                              </div>

                              <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', fontSize: '9px', color: '#334155' }}>
                                <i className="fas fa-check-double" style={{ color: '#10B981', marginRight: '5px' }} />
                                Zero document mismatches reported across 350 files.
                              </div>
                            </>
                          )}

                          {/* TAB 7: SETTINGS */}
                          {laptopActiveTab === 'settings' && (
                            <>
                              <div className="screen-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="screen-header-title">System &amp; Gmail OAuth Settings</span>
                                  <span style={{ fontSize: '9px', background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                    CONF
                                  </span>
                                </div>
                                <span style={{ fontSize: '9px', color: '#10B981', fontWeight: '700' }}>Active</span>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E293B' }}>Auto-Labeling Rules</div>
                                    <div style={{ fontSize: '8px', color: '#64748B' }}>Add 'ADMS Processed' tag in Gmail</div>
                                  </div>
                                  <span style={{ fontSize: '8.5px', background: '#DCFCE7', color: '#166534', padding: '2px 6px', borderRadius: '999px', fontWeight: '700' }}>ON</span>
                                </div>

                                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E293B' }}>Smart File Renaming</div>
                                    <div style={{ fontSize: '8px', color: '#64748B' }}>[DocType]_[Date]_[ClientName].pdf</div>
                                  </div>
                                  <span style={{ fontSize: '8.5px', background: '#DCFCE7', color: '#166534', padding: '2px 6px', borderRadius: '999px', fontWeight: '700' }}>ON</span>
                                </div>

                                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E293B' }}>AES-256 Cloud Vault</div>
                                    <div style={{ fontSize: '8px', color: '#64748B' }}>Bank-grade document encryption</div>
                                  </div>
                                  <i className="fas fa-lock" style={{ color: '#10B981', fontSize: '11px' }} />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Laptop Stand / Base */}
                    <div className="laptop-base">
                      <div className="laptop-notch" />
                    </div>
                  </div>

                  {/* Floating Output Categorized Folders */}
                  <div className="folder-pill-stack">
                    <div className="folder-pill">
                      <i className="fas fa-folder" style={{ color: '#0062FF' }} />
                      <span>Tax Documents</span>
                    </div>
                    <div className="folder-pill">
                      <i className="fas fa-folder" style={{ color: '#10B981' }} />
                      <span>Bank Statements</span>
                    </div>
                    <div className="folder-pill">
                      <i className="fas fa-folder" style={{ color: '#8B5CF6' }} />
                      <span>ID Documents</span>
                    </div>
                    <div className="folder-pill">
                      <i className="fas fa-folder" style={{ color: '#06B6D4' }} />
                      <span>Client Files</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom 4 Pillars Trust Bar - Compact Pill */}
            <div className="trust-bar-wrap">
              <div className="trust-bar-inner">
                <div className="trust-item">
                  <i className="fas fa-shield-alt" />
                  <span>Secure &amp; Private</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-layer-group" />
                  <span>50+ Document Types</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-bolt" />
                  <span>AI-Powered Processing</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-users" />
                  <span>Built for Financial Teams</span>
                </div>
              </div>
            </div>
          </main>

          {/* ========================================================================
          SECTION 2: DUAL QUICK ACTION CARDS + NATIVE DOCUMENT PODIUM SCENE
          ======================================================================== */}
          <section id="phone-showcase-section" className="showcase-section">
            <div className="showcase-grid">
              {/* Left Column: Hook Text + Dual Action Cards + Micro Trust Badges */}
              <div>
                <p className="showcase-hook-text">
                  — your inbox stays untouched, only attachments are processed.
                </p>

                {/* Dual Cards */}
                <div className="dual-action-cards">
                  {/* White Sign In Card */}
                  <a href="#login" className="card-signin-white">
                    <div className="signin-icon-blue">
                      <i className="fas fa-sign-in-alt" />
                    </div>
                    <div className="signin-text-content">
                      <h3 className="signin-heading">Sign In</h3>
                      <p className="signin-subtext">Access your dashboard</p>
                    </div>
                    <div className="arrow-circle-gray">
                      <i className="fas fa-arrow-right" />
                    </div>
                  </a>

                  {/* Blue Get Started Card */}
                  <a href="#register" className="card-getstarted-blue">
                    <div className="getstarted-icon-white">
                      <i className="fas fa-user-plus" />
                    </div>
                    <div className="getstarted-text-content">
                      <h3 className="getstarted-heading">Get Started</h3>
                      <p className="getstarted-subtext">Create free account</p>
                    </div>
                    <div className="arrow-circle-white">
                      <i className="fas fa-arrow-right" />
                    </div>
                  </a>
                </div>

                {/* Micro Trust Row */}
                <div className="showcase-trust-row">
                  <div className="showcase-trust-item">
                    <i className="fas fa-shield-alt" />
                    <span>Bank-Level Security</span>
                  </div>
                  <div className="showcase-trust-item">
                    <i className="fas fa-bolt" />
                    <span>Instant Processing</span>
                  </div>
                  <div className="showcase-trust-item">
                    <i className="fas fa-cloud" />
                    <span>Cloud Powered</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Premium 3D Smartphone Interface */}
              <div className="doc-podium-scene">
                {/* Modern 3D Smartphone Device Mockup (Clean Floating, No Hand) */}
                <div className="smartphone-showcase-device">
                  {/* Phone Speaker & Dynamic Island Camera */}
                  <div className="phone-island">
                    <div className="island-camera" />
                  </div>

                    {/* Phone Screen with Automatic Document Processing Simulation */}
                    <div className="phone-screen-inner">
                      {/* Top Status Bar */}
                      <div className="phone-status-bar">
                        <span className="phone-clock">9:41</span>
                        <div className="phone-status-icons">
                          <i className="fas fa-signal" />
                          <i className="fas fa-wifi" />
                          <i className="fas fa-battery-full" />
                        </div>
                      </div>

                      {/* App Header Inside Mobile with Interactive Screen Dots */}
                      <div className="phone-app-header">
                        <div className="phone-app-brand">
                          <i className="fas fa-layer-group" style={{ color: '#0062FF' }} />
                          <span>ADMS Mobile</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div className="phone-nav-dots">
                            <span className={`phone-dot ${mobileScreenTab === 0 ? 'active' : ''}`} onClick={() => setMobileScreenTab(0)} />
                            <span className={`phone-dot ${mobileScreenTab === 1 ? 'active' : ''}`} onClick={() => setMobileScreenTab(1)} />
                            <span className={`phone-dot ${mobileScreenTab === 2 ? 'active' : ''}`} onClick={() => setMobileScreenTab(2)} />
                          </div>
                          <span className="phone-live-indicator">
                            <span className="live-dot-pulse" />
                            AUTO
                          </span>
                        </div>
                      </div>

                      {/* DYNAMIC SCREEN CONTENT - CYCLES SMOOTHLY */}
                      <div className="phone-screen-body-scrollable">
                        {/* SCREEN 0: INGESTION SCAN & STREAM */}
                        {mobileScreenTab === 0 && (
                          <div className="phone-screen-tab-view tab-fade-in">
                            {/* Live Processing Card with Scanning Light Effect */}
                            <div className="phone-active-scan-card">
                              <div className="scan-laser-line" />
                              <div className="scan-card-top">
                                <span className="scan-doc-tag">PDF</span>
                                <span className="scan-percent-tag">99.4% AI Score</span>
                              </div>
                              <div className="scan-doc-title">Mortgage_NOA_2024.pdf</div>
                              <div className="scan-meta-sub">Extracted: $85,400 • John Doe</div>

                              {/* Animated Processing Step Bar */}
                              <div className="phone-progress-container">
                                <div className="phone-progress-bar-fill" />
                              </div>
                            </div>

                            {/* Auto Incoming Documents Stream */}
                            <div className="phone-incoming-stream">
                              <div className="stream-header-text">RECENTLY AUTO-PROCESSED</div>

                              <div className="stream-item-row stream-anim-1">
                                <div className="stream-icon-box" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                                  <i className="fas fa-check" />
                                </div>
                                <div className="stream-item-info">
                                  <span className="stream-name">Bank_Statement_Jan.pdf</span>
                                  <span className="stream-detail">Filed to Bank Statements</span>
                                </div>
                                <span className="stream-badge-ok">Done</span>
                              </div>

                              <div className="stream-item-row stream-anim-2">
                                <div className="stream-icon-box" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                                  <i className="fas fa-sync fa-spin" />
                                </div>
                                <div className="stream-item-info">
                                  <span className="stream-name">Tax_Return_T1_2023.pdf</span>
                                  <span className="stream-detail">Extracting Income Fields</span>
                                </div>
                                <span className="stream-badge-busy">Sync</span>
                              </div>

                              <div className="stream-item-row stream-anim-3">
                                <div className="stream-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
                                  <i className="fas fa-file-invoice" />
                                </div>
                                <div className="stream-item-info">
                                  <span className="stream-name">Driver_License_Front.jpg</span>
                                  <span className="stream-detail">Verified ID Credentials</span>
                                </div>
                                <span className="stream-badge-ok">Verified</span>
                              </div>

                              <div className="stream-item-row">
                                <div className="stream-icon-box" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                                  <i className="fas fa-file-contract" />
                                </div>
                                <div className="stream-item-info">
                                  <span className="stream-name">Paystub_Dec2025.pdf</span>
                                  <span className="stream-detail">Filed to Income Verification</span>
                                </div>
                                <span className="stream-badge-ok">Done</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SCREEN 1: AI COPILOT CHAT & VERIFICATION */}
                        {mobileScreenTab === 1 && (
                          <div className="phone-screen-tab-view tab-fade-in">
                            <div className="phone-ai-chat-header">
                              <span style={{ fontSize: '10px', fontWeight: '800', color: '#0F172A' }}>ADMS AI Copilot</span>
                              <span style={{ fontSize: '8px', color: '#10B981', fontWeight: '700' }}>● Active</span>
                            </div>

                            <div className="phone-chat-bubble ai">
                              <span>💡 Verified <b>NOA_2024.pdf</b> matching Line 15000: $94,200. Automatically routing to John Doe's mortgage file.</span>
                            </div>

                            <div className="phone-chat-bubble user">
                              <span>Looks good! Tag Sarah as co-signer.</span>
                            </div>

                            <div className="phone-chat-bubble ai">
                              <span>✅ Done! Client profiles updated &amp; synchronized with your Google Sheets.</span>
                            </div>

                            <div className="phone-chat-input-pill">
                              <span>Ask ADMS AI anything...</span>
                              <i className="fas fa-arrow-up" />
                            </div>
                          </div>
                        )}

                        {/* SCREEN 2: CLOUD VAULT FOLDERS */}
                        {mobileScreenTab === 2 && (
                          <div className="phone-screen-tab-view tab-fade-in">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontSize: '10px', fontWeight: '800', color: '#0F172A' }}>Smart Cloud Vault</span>
                              <span style={{ fontSize: '8px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 5px', borderRadius: '4px', fontWeight: '700' }}>1,420 Files</span>
                            </div>

                            <div className="phone-folders-grid-2">
                              <div className="phone-folder-card">
                                <i className="fas fa-folder" style={{ color: '#0062FF' }} />
                                <span className="phone-folder-title">Tax Documents</span>
                                <span className="phone-folder-count">342 files</span>
                              </div>

                              <div className="phone-folder-card">
                                <i className="fas fa-folder" style={{ color: '#10B981' }} />
                                <span className="phone-folder-title">Bank Statements</span>
                                <span className="phone-folder-count">512 files</span>
                              </div>

                              <div className="phone-folder-card">
                                <i className="fas fa-folder" style={{ color: '#8B5CF6' }} />
                                <span className="phone-folder-title">ID &amp; Licenses</span>
                                <span className="phone-folder-count">189 files</span>
                              </div>

                              <div className="phone-folder-card">
                                <i className="fas fa-folder" style={{ color: '#06B6D4' }} />
                                <span className="phone-folder-title">Client Contracts</span>
                                <span className="phone-folder-count">377 files</span>
                              </div>
                            </div>

                            <div className="phone-vault-storage-bar">
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', fontWeight: '700', color: '#475569', marginBottom: '3px' }}>
                                <span>Vault Storage</span>
                                <span>68% of 100 GB</span>
                              </div>
                              <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{ width: '68%', height: '100%', background: '#0062FF', borderRadius: '999px' }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Mobile Bottom Dock Bar */}
                      <div className="phone-bottom-dock">
                        <div className={`dock-item ${mobileScreenTab === 0 ? 'active' : ''}`} onClick={() => setMobileScreenTab(0)}>
                          <i className="fas fa-inbox" />
                          <span>Feed</span>
                        </div>
                        <div className={`dock-item ${mobileScreenTab === 1 ? 'active' : ''}`} onClick={() => setMobileScreenTab(1)}>
                          <i className="fas fa-robot" />
                          <span>AI</span>
                        </div>
                        <div className={`dock-item ${mobileScreenTab === 2 ? 'active' : ''}`} onClick={() => setMobileScreenTab(2)}>
                          <i className="fas fa-folder" />
                          <span>Vault</span>
                        </div>
                        <div className="dock-item" onClick={() => setMobileScreenTab(0)}>
                          <i className="fas fa-cog" />
                          <span>Setup</span>
                        </div>
                      </div>
                    </div>
                  </div>

                {/* Surrounding Floating 3D Badges (Emerge from Phone on First Scroll) */}
                <div className={`floating-badge badge-tax ${badgesTriggered ? 'triggered' : ''}`}>
                  <i className="fas fa-file-invoice" style={{ color: '#0062FF' }} />
                  <span>TAX</span>
                </div>

                <div className={`floating-badge badge-bank ${badgesTriggered ? 'triggered' : ''}`}>
                  <i className="fas fa-university" style={{ color: '#0062FF' }} />
                  <span>Bank</span>
                </div>

                <div className={`floating-badge badge-id ${badgesTriggered ? 'triggered' : ''}`}>
                  <i className="fas fa-id-card" style={{ color: '#0062FF' }} />
                  <span>ID</span>
                </div>

                <div className={`floating-badge badge-calc ${badgesTriggered ? 'triggered' : ''}`}>
                  <i className="fas fa-file-excel" style={{ color: '#0F9D58' }} />
                  <span>Google Sheets</span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================
          SECTION 3: FEATURES GRID
          ======================================================================== */}
          <section id="features" className="features-section-wrap">
            <div className="features-header-box">
              <div className="features-pill-tag">
                <i className="fas fa-sparkles" />
                <span>WHY CHOOSE ADMS</span>
              </div>

              <div className="streamline-heading-row">
                <div className="accent-bars-double">
                  <span className="bar-cyan" />
                  <span className="bar-blue" />
                </div>

                <h2 className="streamline-main-heading">
                  Everything you need to streamline
                  <span className="heading-blue-highlight">document management</span>
                </h2>

                <div className="accent-bars-double">
                  <span className="bar-cyan" />
                  <span className="bar-blue" />
                </div>
              </div>
            </div>

            <div className="features-cards-grid-6">
              <article className="feature-exact-card">
                <div className="card-icon-container">
                  <i className="fas fa-brain" />
                </div>
                <h3 className="feature-title-exact">AI-Powered Recognition</h3>
                <p className="feature-desc-exact">
                  Advanced machine learning identifies and categorizes 50+ document types with high accuracy.
                </p>
              </article>

              <article className="feature-exact-card">
                <div className="card-icon-container">
                  <img
                    src="/images/gmail-icon.png"
                    alt="Gmail"
                    style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  />
                </div>
                <h3 className="feature-title-exact">Email Integration</h3>
                <p className="feature-desc-exact">
                  Connect your Gmail and process incoming attachments automatically without manual sorting.
                </p>
              </article>

              <article className="feature-exact-card">
                <div className="card-icon-container">
                  <i className="fas fa-pencil-alt" />
                </div>
                <h3 className="feature-title-exact">Smart Renaming</h3>
                <p className="feature-desc-exact">
                  Files are renamed with custom naming rules using extracted dates, names, and categories.
                </p>
              </article>

              <article className="feature-exact-card">
                <div className="card-icon-container">
                  <i className="fas fa-folder-open" />
                </div>
                <h3 className="feature-title-exact">Auto Organization</h3>
                <p className="feature-desc-exact">
                  Documents are sorted into clean folder structures based on sender, type, and content.
                </p>
              </article>

              <article className="feature-exact-card">
                <div className="card-icon-container">
                  <i className="fas fa-lock" />
                </div>
                <h3 className="feature-title-exact">Enterprise Security</h3>
                <p className="feature-desc-exact">
                  Bank-level encryption, secure OAuth flows, and privacy-focused data handling.
                </p>
              </article>

              <article className="feature-exact-card">
                <div className="card-icon-container">
                  <i className="fas fa-chart-line" />
                </div>
                <h3 className="feature-title-exact">Analytics Dashboard</h3>
                <p className="feature-desc-exact">
                  Track processing stats, review logs, and monitor automation performance in real time.
                </p>
              </article>
            </div>
          </section>

          {/* ========================================================================
          SECTION 4: HOW ADMS WORKS - Dynamic Winding Pathway Track (1-4/6 Exact Replica)
          ======================================================================== */}
          <section id="how-it-works" className="how-it-works-section">
            <div className="process-header-box">
              <div className="process-pill-badge">
                <i className="fas fa-bolt" />
                <span>SIMPLE PROCESS</span>
              </div>

              <h2 className="how-it-works-heading">
                How <span className="how-adms-blue">ADMS</span> Works
              </h2>

              <p className="process-subtitle">
                Get started in minutes, not hours
              </p>
            </div>

            {/* Continuous Vertical Zig-Zag Drawing Pathway (Passing directly through the center of every box) */}
            <div className="vertical-zigzag-canvas">
              {/* SVG Continuous Curving Track that connects through the exact centers of every box */}
              <svg className="vertical-zigzag-svg" viewBox="0 0 800 1250" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="zigZagThemeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0062FF" />
                    <stop offset="25%" stopColor="#00D2FF" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="75%" stopColor="#00D2FF" />
                    <stop offset="100%" stopColor="#0062FF" />
                  </linearGradient>
                  <filter id="zigzagGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00D2FF" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Guide track line through centers (X: 195, 605, 195, 605, 195, 400) */}
                <path
                  d="M 195 80 
                     C 300 80, 500 200, 605 290
                     C 700 380, 100 480, 195 500
                     C 290 520, 500 640, 605 710
                     C 700 780, 100 880, 195 920
                     C 290 960, 400 1060, 400 1130"
                  stroke="rgba(219, 234, 254, 0.7)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="8 8"
                />

                {/* Animated Zig-Zag Drawing Line that passes through the exact center of each box */}
                <path
                  d="M 195 80 
                     C 300 80, 500 200, 605 290
                     C 700 380, 100 480, 195 500
                     C 290 520, 500 640, 605 710
                     C 700 780, 100 880, 195 920
                     C 290 960, 400 1060, 400 1130"
                  stroke="url(#zigZagThemeGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#zigzagGlow)"
                  style={{
                    strokeDasharray: 2400,
                    strokeDashoffset: Math.max(0, 2400 - scrollProgress * 3000),
                    transition: 'stroke-dashoffset 0.1s linear',
                  }}
                />

                {/* Glowing Connection Dots at the center of every node */}
                <circle cx="195" cy="80" r="7" fill={scrollProgress > 0.08 ? '#00D2FF' : '#CBD5E1'} />
                <circle cx="605" cy="290" r="7" fill={scrollProgress > 0.25 ? '#00D2FF' : '#CBD5E1'} />
                <circle cx="195" cy="500" r="7" fill={scrollProgress > 0.42 ? '#00D2FF' : '#CBD5E1'} />
                <circle cx="605" cy="710" r="7" fill={scrollProgress > 0.60 ? '#00D2FF' : '#CBD5E1'} />
                <circle cx="195" cy="920" r="7" fill={scrollProgress > 0.78 ? '#00D2FF' : '#CBD5E1'} />
                <circle cx="400" cy="1130" r="8" fill={scrollProgress > 0.92 ? '#10B981' : '#CBD5E1'} />
              </svg>

              {/* Step 01: Top Left */}
              <div className="zigzag-step-row align-left">
                <div className={`zigzag-node-card ${scrollProgress > 0.08 ? 'active-glow' : ''}`}>
                  <span className="zigzag-badge-pill">01</span>
                  <div className="zigzag-icon-box">
                    <i className="fas fa-brain" style={{ color: '#0062FF', fontSize: '26px' }} />
                  </div>
                  <div className="zigzag-text-wrap">
                    <h4 className="zigzag-title">Create Account</h4>
                    <p className="zigzag-desc">Sign up with your work email and set up your team profile in seconds.</p>
                  </div>
                </div>
              </div>

              {/* Step 02: Middle Right */}
              <div className="zigzag-step-row align-right">
                <div className={`zigzag-node-card ${scrollProgress > 0.25 ? 'active-glow' : ''}`}>
                  <span className="zigzag-badge-pill">02</span>
                  <div className="zigzag-icon-box">
                    <img
                      src="/images/gmail-icon.png"
                      alt="Gmail"
                      style={{ width: '34px', height: '34px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="zigzag-text-wrap">
                    <h4 className="zigzag-title">Connect Gmail</h4>
                    <p className="zigzag-desc">Securely link your inbox with Google OAuth for automated scanning.</p>
                  </div>
                </div>
              </div>

              {/* Step 03: Middle Left */}
              <div className="zigzag-step-row align-left">
                <div className={`zigzag-node-card ${scrollProgress > 0.42 ? 'active-glow' : ''}`}>
                  <span className="zigzag-badge-pill">03</span>
                  <div className="zigzag-icon-box">
                    <i className="fas fa-sliders-h" style={{ color: '#0062FF', fontSize: '26px' }} />
                  </div>
                  <div className="zigzag-text-wrap">
                    <h4 className="zigzag-title">Configure Rules</h4>
                    <p className="zigzag-desc">Set custom document types, folder names, and filing priorities.</p>
                  </div>
                </div>
              </div>

              {/* Step 04: Middle Right */}
              <div className="zigzag-step-row align-right">
                <div className={`zigzag-node-card ${scrollProgress > 0.60 ? 'active-glow' : ''}`}>
                  <span className="zigzag-badge-pill">04</span>
                  <div className="zigzag-icon-box">
                    <i className="fas fa-file-invoice-dollar" style={{ color: '#0062FF', fontSize: '26px' }} />
                  </div>
                  <div className="zigzag-text-wrap">
                    <h4 className="zigzag-title">Auto OCR Extraction</h4>
                    <p className="zigzag-desc">AI scans NOA, bank statements, and IDs extracting exact figures.</p>
                  </div>
                </div>
              </div>

              {/* Step 05: Middle Left */}
              <div className="zigzag-step-row align-left">
                <div className={`zigzag-node-card ${scrollProgress > 0.78 ? 'active-glow' : ''}`}>
                  <span className="zigzag-badge-pill">05</span>
                  <div className="zigzag-icon-box">
                    <i className="fas fa-bolt" style={{ color: '#0062FF', fontSize: '26px' }} />
                  </div>
                  <div className="zigzag-text-wrap">
                    <h4 className="zigzag-title">Automate Filing</h4>
                    <p className="zigzag-desc">Attachments are saved, renamed, and tagged in real-time cloud vaults.</p>
                  </div>
                </div>
              </div>

              {/* Step 06: Center Bottom Final */}
              <div className="zigzag-step-row align-center">
                <div className={`zigzag-node-card ${scrollProgress > 0.92 ? 'active-glow' : ''}`}>
                  <span className="zigzag-badge-pill">06</span>
                  <div className="zigzag-icon-box">
                    <i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '26px' }} />
                  </div>
                  <div className="zigzag-text-wrap">
                    <h4 className="zigzag-title">Complete &amp; In Sync</h4>
                    <p className="zigzag-desc">Review logs, sync Google Sheets, and export audit trails anytime.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================
          SECTION 5: HOW ADMS USES YOUR GOOGLE ACCOUNT DATA
          ======================================================================== */}
          <section id="data-use" className="google-data-use-section">
            <div className="google-data-pill-wrap">
              <div className="google-data-pill">
                <i className="fas fa-shield-alt" />
                <span>GOOGLE ACCOUNT DATA</span>
              </div>
            </div>

            <h2 className="google-data-title">
              How ADMS Uses Your <span className="google-highlight-blue">Google Account Data</span>
            </h2>

            <p className="google-data-intro">
              ADMS connects to Gmail via Google OAuth to automate document filing. Below is exactly what we request, why we request it, and how the data is used — in plain language.
            </p>

            {/* 1. Large Rounded Card: 3D Gmail Visual + Permissions */}
            <div className="permissions-card-container">
              <div className="permissions-card-layout">
                {/* Left 3D Gmail Scene */}
                <div className="gmail-3d-scene-wrap">
                  <div className="gmail-orbit-ring" />
                  <div className="gmail-podium-base" />
                  <div className="gmail-3d-card">
                    {/* Official Multi-color Gmail M */}
                    <img
                      src="/images/gmail-icon.png"
                      alt="Gmail"
                      className="gmail-logo-svg"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="gmail-link-badge">
                    <i className="fas fa-link" />
                  </div>
                </div>

                {/* Right Permissions List */}
                <div className="permissions-right-content">
                  <h3 className="permissions-card-heading">
                    Gmail permissions we request
                  </h3>

                  <div className="permission-rows-list">
                    <div className="permission-row-item">
                      <div className="scope-code-pill">
                        <i className="fas fa-eye" style={{ color: '#2563EB', marginRight: '6px' }} />
                        <span>gmail.readonly</span>
                      </div>
                      <p className="scope-purpose-desc">
                        Read incoming emails and download document attachments (PDF, JPG, PNG) so ADMS can identify, classify, and file them for you. ADMS only processes attachments — the body of personal emails is not stored.
                      </p>
                    </div>

                    <div className="permission-row-item">
                      <div className="scope-code-pill">
                        <i className="fas fa-pen" style={{ color: '#2563EB', marginRight: '6px' }} />
                        <span>gmail.modify</span>
                      </div>
                      <p className="scope-purpose-desc">
                        Apply a label (e.g. "ADMS Processed") to emails after their attachments are filed, so the same email is not processed twice. ADMS does not send, delete, or forward any messages.
                      </p>
                    </div>

                    <div className="permission-row-item">
                      <div className="scope-code-pill multi-line">
                        <i className="fas fa-user-circle" style={{ color: '#2563EB', marginRight: '6px', alignSelf: 'flex-start', marginTop: '2px' }} />
                        <div>
                          <div>userinfo.email /</div>
                          <div>userinfo.profile</div>
                        </div>
                      </div>
                      <p className="scope-purpose-desc">
                        Identify your Google account so we can link processed documents to the correct ADMS user. We store only your email address and display name.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Exact 4 Data Security Cards Grid with Soft Cyan/Blue Icon Pills */}
            <div className="data-cards-grid-4">
              <article className="data-feature-card-exact">
                <div className="data-card-icon-pill icon-cyan-pill">
                  <i className="fas fa-database" />
                </div>
                <h4 className="data-card-title-exact">What we store</h4>
                <p className="data-card-desc-exact">
                  Document attachments you receive, file metadata (sender, date, classification), and your account profile. Email bodies and non-document content are never persisted.
                </p>
              </article>

              <article className="data-feature-card-exact">
                <div className="data-card-icon-pill icon-cyan-pill">
                  <i className="fas fa-ban" />
                </div>
                <h4 className="data-card-title-exact">What we never do</h4>
                <p className="data-card-desc-exact">
                  We never sell your data, never share it with advertisers, never train AI models on your documents, and never read emails that don't contain document attachments.
                </p>
              </article>

              <article className="data-feature-card-exact">
                <div className="data-card-icon-pill icon-cyan-pill">
                  <i className="fas fa-user-cog" />
                </div>
                <h4 className="data-card-title-exact">Your control</h4>
                <p className="data-card-desc-exact">
                  You can disconnect Gmail at any time from your Account page or revoke access at myaccount.google.com. On request, all your data is permanently deleted within 30 days.
                </p>
              </article>

              <article className="data-feature-card-exact">
                <div className="data-card-icon-pill icon-cyan-pill">
                  <i className="fas fa-lock" />
                </div>
                <h4 className="data-card-title-exact">How we protect it</h4>
                <p className="data-card-desc-exact">
                  All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). OAuth tokens are stored encrypted and scoped to the minimum permissions needed for the features above.
                </p>
              </article>
            </div>
          </section>

          {/* ========================================================================
          SECTION 6: STATS BAR - Exact Values & Icons from Screenshot
          ======================================================================== */}
          <section className="stats-section-wrap">
            <div className="stats-pill-container">
              <div className="stat-box-item">
                <div className="stat-icon-wrap">
                  <i className="fas fa-file-alt" />
                </div>
                <div className="stat-info-right">
                  <span className="stat-number-blue">50+</span>
                  <span className="stat-label-muted">DOCUMENT TYPES</span>
                </div>
              </div>

              <div className="stats-divider-vertical" />

              <div className="stat-box-item">
                <div className="stat-icon-wrap">
                  <i className="fas fa-crosshairs" />
                </div>
                <div className="stat-info-right">
                  <span className="stat-number-blue">99%</span>
                  <span className="stat-label-muted">ACCURACY RATE</span>
                </div>
              </div>

              <div className="stats-divider-vertical" />

              <div className="stat-box-item">
                <div className="stat-icon-wrap">
                  <i className="fas fa-layer-group" />
                </div>
                <div className="stat-info-right">
                  <span className="stat-number-blue">1M+</span>
                  <span className="stat-label-muted">DOCUMENTS PROCESSED</span>
                </div>
              </div>

              <div className="stats-divider-vertical" />

              <div className="stat-box-item">
                <div className="stat-icon-wrap">
                  <i className="fas fa-clock" />
                </div>
                <div className="stat-info-right">
                  <span className="stat-number-blue">24/7</span>
                  <span className="stat-label-muted">AVAILABILITY</span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================
          SECTION 7: CTA BANNER
          ======================================================================== */}
          <section className="cta-banner-section">
            <div className="cta-banner-content">
              <h2 className="cta-banner-title">
                Ready to Transform Your Document<br />Workflow?
              </h2>

              <p className="cta-banner-subtext">
                Join thousands of professionals who trust ADMS for intelligent document management.
              </p>

              <div className="cta-banner-buttons">
                <a href="#register" className="btn-start-free-today">
                  <span>Start Free Today</span>
                  <i className="fas fa-arrow-right" />
                </a>

                <a href="#contact" className="btn-contact-team-pill">
                  <span>Contact Team</span>
                  <i className="fas fa-headset" />
                </a>
              </div>
            </div>
          </section>

        </>
      )}

      {/* ========================================================================
          SECTION 8: DARK LUXURY FOOTER (Screenshot Exact Replica)
          ======================================================================== */}
      <footer className="site-footer-dark">
        <div className="footer-container-inner">

          {/* Top 4 Columns */}
          <div className="footer-top-grid">

            {/* Column 1: Brand Info */}
            <div className="footer-brand-col">
              <a href="#home" onClick={(e) => navigateTo('home', e)} className="footer-logo-wrap">
                <img
                  src="/images/adms-logo-tight.png"
                  alt="ADMS"
                  className="footer-brand-img"
                />
              </a>

              <p className="footer-brand-desc">
                Advanced Document Management System powered by AI. ADMS is operated by AI Logic Tools and automates document filing for mortgage, accounting, and legal teams via secure Gmail integration.
              </p>

              <a href="#contact" className="footer-contact-link">
                <i className="fas fa-envelope" />
                <span>Contact support</span>
              </a>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links-list">
                <li><a href="#login">Login</a></li>
                <li><a href="#register">Register</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: Legal & Data Use */}
            <div>
              <h4 className="footer-col-title">Legal &amp; Data Use</h4>
              <ul className="footer-links-list">
                <li><a href="#privacy" onClick={(e) => navigateTo('privacy', e)}>Privacy Policy</a></li>
                <li><a href="#data-use" onClick={() => currentPage !== 'home' && setCurrentPage('home')}>Google Data Use</a></li>
                <li><a href="#terms" onClick={(e) => { navigateTo('privacy', e); setTimeout(() => { const el = document.getElementById('terms'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>Terms of Service</a></li>
                <li><a href="#account-termination" onClick={(e) => { navigateTo('privacy', e); setTimeout(() => { const el = document.getElementById('account-termination'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>Your Rights &amp; Deletion</a></li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div>
              <h4 className="footer-col-title">Support</h4>
              <ul className="footer-links-list">
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#user-guide">User Guide</a></li>
                <li><a href="#help-center">Help Center</a></li>
                <li><a href="#gmail-setup">Gmail Setup</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Compliance Badges */}
          <div className="footer-bottom-bar">
            <p className="footer-copyright-text">
              © 2026 ADMS - AI Logic Tools. All rights reserved.
            </p>

            <div className="footer-badges-group">
              <div className="compliance-badge-dark">
                <i className="fas fa-shield-alt" />
                <span>GDPR Compliant</span>
              </div>

              <div className="compliance-badge-dark">
                <i className="fas fa-lock" />
                <span>SSL Secured</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

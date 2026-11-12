/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  X
} from 'lucide-react';

// Foundation Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Container } from './components/common/Container';
import { SectionHeading } from './components/common/SectionHeading';

// Page Views: Critical landing page loaded synchronously, secondary routes code-split via React.lazy
import { HomePage } from './pages/HomePage';

const ServicesPage = React.lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const PackagesPage = React.lazy(() =>
  import('./pages/PackagesPage').then((m) => ({ default: m.PackagesPage }))
);
const AboutPage = React.lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ProcessPage = React.lazy(() =>
  import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage }))
);
const WorkPage = React.lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage }))
);
const InsightsPage = React.lazy(() =>
  import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage }))
);
const ContactPage = React.lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = React.lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsPage = React.lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const NotFoundPage = React.lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function PageLoadingFallback() {
  return (
    <div
      className="w-full min-h-[60vh] flex flex-col items-center justify-center py-24 animate-fade-in"
      role="status"
      aria-label="Loading page content"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#14141B] border border-[#D4AF37]/30 flex items-center justify-center shadow-lg shadow-[#D4AF37]/5 animate-pulse">
        <span className="font-heading font-extrabold text-[#D4AF37] text-base">A</span>
      </div>
      <span className="sr-only">Loading strategic page view...</span>
    </div>
  );
}

// SEO & Navigation Utilities
import { SEOHead } from './seo/SEOHead';
import { pathToRoute, routeToPath } from './utils/navigation';
import { SEO_PAGES } from './seo/seoConfig';

// Analytics
import { initGA4, trackPageView, trackStrategyCallClick } from './analytics/ga4';

// Data & Types
import { APPROVED_SERVICES, APPROVED_PACKAGES, FOUNDATION_FAQS } from './data/foundationData';
import { NavRoute, ServiceItem, PackageTier } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<NavRoute>(() => {
    if (typeof window !== 'undefined') {
      return pathToRoute(window.location.pathname);
    }
    return 'home';
  });
  const [selectedServiceSpec, setSelectedServiceSpec] = useState<ServiceItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [selectedInquiryService, setSelectedInquiryService] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initialize GA4 once on mount
  React.useEffect(() => {
    initGA4();
  }, []);

  // Track page_view on route change without duplicate tracking
  React.useEffect(() => {
    const page = SEO_PAGES[currentRoute] || SEO_PAGES.home;
    trackPageView(routeToPath(currentRoute), page.title);
  }, [currentRoute]);

  // Sync route on browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const targetRoute = pathToRoute(window.location.pathname);
      setCurrentRoute(targetRoute);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: NavRoute) => {
    setCurrentRoute(route);
    const targetPath = routeToPath(route);
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (route !== 'not-found') {
      showToast(`Navigated to ${route.toUpperCase()}`);
    }
  };

  const handleSelectPackage = (pkg: PackageTier) => {
    trackStrategyCallClick(`Select Package: ${pkg.systemName}`, 'packages_page');
    setSelectedPackage(pkg);
    handleNavigate('contact');
    showToast(`Selected Package: ${pkg.systemName}`);
  };

  const handleSelectServiceForInquiry = (serviceName: string) => {
    trackStrategyCallClick(`Inquire Service: ${serviceName}`, 'service_spec_modal');
    setSelectedInquiryService(serviceName);
    handleNavigate('contact');
    showToast(`Initiating inquiry for ${serviceName}`);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#E5E5E7] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Background ambient lighting with GPU layer containment */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden ambient-glow-layer">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1F1F24]/40 rounded-full blur-[140px]" />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#16161E] border border-[#D4AF37]/60 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#D4AF37] focus:text-black focus:font-bold focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-white focus:outline-none text-xs"
      >
        Skip to main content
      </a>

      {/* Dynamic Client-Side SEO Management */}
      <SEOHead route={currentRoute} />

      {/* 01. REUSABLE GLOBAL HEADER */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* ROUTED CONTENT */}
      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 focus:outline-none">
        <React.Suspense fallback={<PageLoadingFallback />}>
          {/* HOMEPAGE VIEW (Sections 02 to 11) */}
          {currentRoute === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenServiceSpec={(srv) => setSelectedServiceSpec(srv)}
              onSelectPackage={handleSelectPackage}
            />
          )}

          {/* SERVICES SUB-VIEW (10 Complete Structured Sections) */}
          {currentRoute === 'services' && (
            <ServicesPage
              onNavigate={handleNavigate}
              onSelectServiceForInquiry={handleSelectServiceForInquiry}
            />
          )}

          {/* PACKAGES SUB-VIEW (9 Complete Structured Sections) */}
          {currentRoute === 'packages' && (
            <PackagesPage
              onNavigate={handleNavigate}
              onSelectPackage={handleSelectPackage}
            />
          )}

          {/* PROCESS SUB-VIEW (8 Structured Stages) */}
          {currentRoute === 'process' && (
            <ProcessPage onNavigate={handleNavigate} />
          )}

          {/* WORK SUB-VIEW */}
          {currentRoute === 'work' && (
            <WorkPage onNavigate={handleNavigate} />
          )}

          {/* ABOUT SUB-VIEW (9 Complete Sections) */}
          {currentRoute === 'about' && (
            <AboutPage onNavigate={handleNavigate} />
          )}

          {/* INSIGHTS SUB-VIEW */}
          {currentRoute === 'insights' && (
            <InsightsPage onNavigate={handleNavigate} />
          )}

          {/* CONTACT EXPERIENCE */}
          {currentRoute === 'contact' && (
            <ContactPage
              onNavigate={handleNavigate}
              selectedPackage={selectedPackage}
              selectedInquiryService={selectedInquiryService}
              onClearPreselections={() => {
                setSelectedPackage(null);
                setSelectedInquiryService(null);
              }}
            />
          )}

          {/* LEGAL: PRIVACY POLICY FRAMEWORK */}
          {currentRoute === 'privacy' && (
            <PrivacyPolicyPage onNavigate={handleNavigate} />
          )}

          {/* LEGAL: TERMS & CONDITIONS FRAMEWORK */}
          {currentRoute === 'terms' && (
            <TermsPage onNavigate={handleNavigate} />
          )}

          {/* 404 NOT FOUND VIEW */}
          {currentRoute === 'not-found' && (
            <NotFoundPage onNavigate={handleNavigate} />
          )}
        </React.Suspense>
      </main>

      {/* TECHNICAL SPEC MODAL (Available globally for all 11 services) */}
      {selectedServiceSpec && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="spec-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSelectedServiceSpec(null);
          }}
        >
          <div className="matte-card p-6 sm:p-8 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative border border-[#D4AF37]/40 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedServiceSpec(null)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-[#181820] text-[#9E9EA8] hover:text-white cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              aria-label="Close specification modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="p-3 rounded-xl bg-[#1B1B24] border border-[#D4AF37]/30 text-[#D4AF37] shrink-0">
                <selectedServiceSpec.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D4AF37] tracking-wider block">
                  {selectedServiceSpec.category}
                </span>
                <h3 id="spec-modal-title" className="text-xl font-bold text-white font-heading">
                  {selectedServiceSpec.name}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A0A0AC] leading-relaxed mb-6">
              {selectedServiceSpec.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                <span className="text-[10px] uppercase font-semibold text-[#D4AF37] block mb-1">
                  Operational Architecture Role
                </span>
                <p className="text-xs text-[#C5C5D0]">{selectedServiceSpec.operationalRole}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#191111] border border-red-900/30">
                <span className="text-[10px] uppercase font-semibold text-red-400 block mb-1">
                  Common Industry Failure Point
                </span>
                <p className="text-xs text-[#D8B4B4]">{selectedServiceSpec.commonFailurePoint}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-white block mb-2 font-heading">
                  Technical Deliverables:
                </span>
                <div className="space-y-1.5">
                  {selectedServiceSpec.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#D0D0D8]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#202028] flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedServiceSpec(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs text-[#9E9EA8] hover:text-white cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              >
                Close Spec
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedServiceSpec(null);
                  handleNavigate('contact');
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:brightness-110 text-black font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none shadow-lg"
              >
                <span>Inquire About {selectedServiceSpec.name}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. REUSABLE GLOBAL FOOTER */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

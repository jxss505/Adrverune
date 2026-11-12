/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Monogram } from '../common/Monogram';
import { NavRoute } from '../../types';
import { routeToPath } from '../../utils/navigation';
import { trackStrategyCallClick } from '../../analytics/ga4';
import { prefetchRoute } from '../../utils/prefetch';

interface HeaderProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  className?: string;
}

export function Header({
  currentRoute,
  onNavigate,
  className = ''
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services (11)' },
    { id: 'packages', label: 'Packages' },
    { id: 'process', label: 'Our Process' },
    { id: 'work', label: 'Our Work' },
    { id: 'about', label: 'About Us' },
    { id: 'insights', label: 'Insights' }
  ];

  // Close mobile drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (route: NavRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md bg-[#0B0B0D]/90 border-b border-[#1A1A1F] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo Lockup with Geometric Monogram */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none focus-visible:rounded-lg p-1"
          aria-label="ADVERUNE - Return to Homepage"
        >
          <div className="p-1 rounded-lg border border-[#D4AF37]/25 bg-[#141418] group-hover:border-[#D4AF37]/60 transition-all shadow-sm shrink-0">
            <Monogram className="w-7 h-7 sm:w-8 sm:h-8" glow />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-bold tracking-widest text-[#F2F2F5] font-serif flex items-center gap-1.5">
              <span>ADVERUNE</span>
              <span className="text-[9px] sm:text-[10px] font-sans px-1.5 py-0.5 rounded tracking-normal border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 uppercase font-semibold">
                Agency
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A0A0AA] truncate">Digital Advertising & Growth Systems</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 bg-[#131317] border border-[#222228] p-1.5 rounded-full text-xs font-medium shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={routeToPath(link.id)}
              onMouseEnter={() => prefetchRoute(link.id)}
              onFocus={() => prefetchRoute(link.id)}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className={`
                px-3.5 py-1.5 rounded-full transition-all cursor-pointer inline-block whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none
                ${
                  currentRoute === link.id
                    ? 'bg-[#D4AF37] text-[#0B0B0D] font-bold shadow-md'
                    : 'text-[#A0A0A8] hover:text-white hover:bg-[#1A1A22]'
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="/contact"
            onMouseEnter={() => prefetchRoute('contact')}
            onFocus={() => prefetchRoute('contact')}
            onClick={(e) => {
              e.preventDefault();
              trackStrategyCallClick('Book Consultation', 'header');
              handleLinkClick('contact');
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37]/20 to-[#996515]/20 hover:from-[#D4AF37] hover:to-[#B8860B] hover:text-[#0B0B0D] text-[#FFF0BE] shadow-lg shadow-[#D4AF37]/5 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>

          {/* Mobile Menu Toggle Button (Strict 44px+ touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-[#141419] border border-[#22222A] text-[#9A9AA2] hover:text-white lg:hidden cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (When open) */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation Drawer"
          className="lg:hidden border-t border-[#1C1C24] bg-[#0E0E14] px-4 py-4 space-y-2 animate-fade-in shadow-2xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={routeToPath(link.id)}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className={`
                w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none
                ${
                  currentRoute === link.id
                    ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                    : 'bg-[#14141A] text-[#B0B0BA] border border-[#22222A] hover:text-white'
                }
              `}
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 opacity-70" aria-hidden="true" />
            </a>
          ))}
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              trackStrategyCallClick('Request Strategy Consultation', 'mobile_header');
              handleLinkClick('contact');
            }}
            className="w-full text-center py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFF0BE] via-[#D4AF37] to-[#B8860B] text-black font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer mt-3 block min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            Request Strategy Consultation
          </a>
        </nav>
      )}
    </header>
  );
}

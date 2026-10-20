'use client';

import React, { useState } from 'react';
import {
  Activity,
  Phone,
  ShieldCheck,
  CalendarCheck,
  Menu,
  X,
  Award,
  Sparkles,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToForm = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#00D40E] flex items-center justify-center shadow-md shadow-[#00D40E]/25 shrink-0">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
                MADDIE
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-white bg-[#00D40E] px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                HEALTH
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block -mt-1 hidden sm:block">
              NABL & ISO Accredited Diagnostics
            </span>
          </div>
        </div>

        {/* Center Trust Badges (Desktop / Large Laptop) */}
        <div className="hidden xl:flex items-center gap-5 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00D40E]" />
            <span>100% NABL Accredited Labs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D40E]" />
            <span>60-Min Home Sample Pickup</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D40E]" />
            <span>Reports in 12 Hours</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Call button: compact on mobile, full on tablet/desktop */}
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#00D40E] shrink-0" />
            <span className="hidden md:inline text-slate-500 font-normal">24x7:</span>
            <span className="hidden sm:inline">+91 98765 43210</span>
            <span className="sm:hidden text-[11px]">Call</span>
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={scrollToForm}
            className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-extrabold text-xs transition-all shadow-md shadow-[#00D40E]/20 cursor-pointer shrink-0"
          >
            <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">Book Home Visit</span>
            <span className="sm:hidden">Book</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-4">
            {/* Quick Navigation Links */}
            <div className="space-y-1">
              <button
                onClick={() => scrollToSection('package-details')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors text-left"
              >
                <span>84+ Tests Detailed Breakdown</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection('other-packages')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors text-left"
              >
                <span>Other Health Packages (Diabetes, Thyroid, Heart)</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors text-left"
              >
                <span>Fasting & Preparation FAQs</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Accreditations Ribbon */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Award className="w-4 h-4 text-[#00D40E]" />
                <span>NABL Accredited & ISO 9001 Certified Labs</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D40E]" />
                <span>60-Min Home Sample Pickup across Delhi NCR</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D40E]" />
                <span>Smart Digital Reports on WhatsApp in 12h</span>
              </div>
            </div>

            {/* Action buttons inside mobile drawer */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                href="tel:+919876543210"
                className="py-3 px-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#00D40E]" />
                <span>Call Helpline</span>
              </a>
              <button
                onClick={scrollToForm}
                className="py-3 px-3 rounded-xl bg-[#00D40E] text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#00D40E]/20"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Book @ ₹799</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

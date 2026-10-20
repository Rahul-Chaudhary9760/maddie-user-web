'use client';

import React from 'react';
import { Activity, Phone, ShieldCheck, CalendarCheck } from 'lucide-react';

export function Navbar() {
  const scrollToForm = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00D40E] flex items-center justify-center shadow-lg shadow-[#00D40E]/25">
            <Activity className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900">MADDIE</span>
              <span className="text-[10px] font-bold text-white bg-[#00D40E] px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                HEALTH
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium block -mt-1 hidden sm:block">
              NABL & ISO Accredited Diagnostics
            </span>
          </div>
        </div>

        {/* Center Trust Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-semibold">
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

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#00D40E]" />
            <span className="hidden sm:inline">24x7 Helpline:</span>
            <span>+91 98765 43210</span>
          </a>

          <button
            onClick={scrollToForm}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-extrabold text-xs transition-all shadow-md shadow-[#00D40E]/20 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Book Home Visit</span>
            <span className="sm:hidden">Book</span>
          </button>
        </div>
      </div>
    </header>
  );
}

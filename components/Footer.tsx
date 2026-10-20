'use client';

import React from 'react';
import { Activity, ShieldCheck, Award, Heart, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const scrollToForm = () => {
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00D40E] flex items-center justify-center text-black shadow-md shadow-[#00D40E]/20">
                <Activity className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">MADDIE</span>
                <span className="text-[10px] font-bold text-black bg-[#00D40E] px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  HEALTH
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Maddie Health is India’s fast-growing doorstep diagnostic platform providing NABL-certified preventive health checkups, transparent pricing, and 12-hour digital reports on WhatsApp.
            </p>

            {/* Accreditations */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-bold text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
                <Award className="w-3.5 h-3.5 text-[#00D40E]" />
                NABL Accredited
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00D40E]" />
                ISO 9001:2015
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                ICMR Guidelines
              </span>
            </div>
          </div>

          {/* Col 2: Popular Packages */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">
              Health Packages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={scrollToForm}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Smart Full Body Checkup (84 Tests)
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToForm}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Diabetes Care & HbA1c Screen
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToForm}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Complete Thyroid Function (T3, T4, TSH)
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToForm}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cardiac Heart & Lipid Screening
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToForm}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Women’s Wellness & Hormonal Profile
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToForm}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Senior Citizen Vital Care Package
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">
              24x7 Diagnostic Support
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00D40E] shrink-0" />
                <span>+91 98765 43210 (Toll Free Helpline)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00D40E] shrink-0" />
                <span>care@maddiehealth.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00D40E] shrink-0 mt-0.5" />
                <span>Diagnostic Central Hub, New Delhi NCR, India</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block">
                Operating Hours: 06:00 AM - 10:00 PM (All 7 Days)
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 space-y-3 text-[11px] text-slate-500 leading-relaxed">
          <p>
            * Disclaimer: All diagnostic pathology tests and health packages are performed by partner NABL / CAP accredited laboratories using standardized robotic analyzers. Reports are intended for preventive health screening purposes and not as a sole medical diagnosis. Please consult a registered medical doctor for treatment recommendations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 text-slate-500">
            <span>© 2026 Maddie Health Technologies Pvt. Ltd. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">NABL Certificate</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

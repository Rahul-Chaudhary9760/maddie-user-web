'use client';

import React from 'react';
import {
  ShieldCheck,
  Microscope,
  Stethoscope,
  Award,
  Sparkles,
  CheckCircle,
  Thermometer,
  Clock,
} from 'lucide-react';

export function KeyHighlights() {
  const features = [
    {
      icon: Microscope,
      title: 'Dual-Run Sample Verification',
      badge: '100% ACCURATE',
      desc: 'Every blood sample is processed twice on automated high-throughput clinical analyzers (Roche & Beckman Coulter) to guarantee zero analytical error.',
      points: [
        'Automated barcoded tracking',
        'Zero manual sample tampering',
        'Calibrated against global standards',
      ],
    },
    {
      icon: ShieldCheck,
      title: '100% Honest All-Inclusive Pricing',
      badge: 'NO HIDDEN CHARGES',
      desc: 'Transparent diagnostic pricing. You only pay for the selected test. Doorstep collection and doctor report review are always 100% free.',
      points: [
        'Free home sample collection (₹0)',
        'Free tele-doctor consultation (₹0)',
        'Pay after collection via UPI / Cash',
      ],
    },
    {
      icon: Thermometer,
      title: 'Temperature Controlled Cold-Chain',
      badge: 'SAMPLE INTEGRITY',
      desc: 'Preserved in specialized ice-gel insulated carrier containers maintained at strict 2°C - 8°C from your home to our NABL reference laboratory.',
      points: [
        'Prevents sample hemolysis',
        'Real-time temperature logging',
        'Ensures cellular stability',
      ],
    },
    {
      icon: Award,
      title: 'Certified & Vaccinated Phlebotomists',
      badge: 'SAFE & PAINLESS',
      desc: 'Trained DMLT phlebotomists with average 5+ years experience. Fresh BD Vacutainer® vacuum tubes unsealed right in front of you.',
      points: [
        'Single-use sterile sealed needles',
        'Virtually painless venipuncture',
        'Background-verified healthcare staff',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8FBE9] border border-[#00D40E]/30 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00B30C]" />
            The Maddie Health Standard
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why 50,000+ Patients Trust Maddie For Diagnostics
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            We combine hospital-grade diagnostic accuracy with doorstep convenience, transparent pricing, and instant digital reports.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00D40E]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8FBE9] group-hover:bg-[#00D40E] text-[#00B30C] group-hover:text-black flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[10px] tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#00B30C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5 text-[#00B30C] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

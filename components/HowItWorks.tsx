'use client';

import React from 'react';
import {
  CalendarCheck2,
  Syringe,
  Microscope,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: CalendarCheck2,
      title: 'Book Online in 30s',
      desc: 'Select your package, date, and preferred morning time slot. Zero advance payment required.',
    },
    {
      num: '02',
      icon: Syringe,
      title: 'Painless Doorstep Collection',
      desc: 'Certified DMLT phlebotomist arrives with sterile vacuum tubes and a cold-chain sample preservation box.',
    },
    {
      num: '03',
      icon: Microscope,
      title: 'NABL Robotic Testing',
      desc: 'Samples processed using dual-run automated analyzers with zero manual contact for 100% accuracy.',
    },
    {
      num: '04',
      icon: FileSpreadsheet,
      title: 'Report & Doctor Consultation',
      desc: 'Smart visual health report delivered on WhatsApp within 12 hours, followed by a free tele-doctor review.',
    },
  ];

  const scrollToForm = () => {
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00B30C]" />
            Fast & Hassle-Free
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Home Diagnostic Collection Works
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-base">
            From booking your slot to receiving certified medical reports — all in 4 simple steps.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex flex-col items-start group">
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8FBE9] group-hover:bg-[#00D40E] text-[#00B30C] group-hover:text-black flex items-center justify-center transition-colors shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="font-mono font-black text-3xl text-slate-200 group-hover:text-[#00D40E]/60 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {step.desc}
                </p>

                {/* Connecting Line for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-4 w-8 border-t-2 border-dashed border-slate-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA banner under steps */}
        <div className="mt-14 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-[#00B30C] shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              Need a test early tomorrow morning? Book now to secure your 06:00 AM - 08:00 AM fasting slot.
            </span>
          </div>
          <button
            onClick={scrollToForm}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Reserve Slot Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

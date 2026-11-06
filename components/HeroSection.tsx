'use client';

import React from 'react';
import { BookingForm } from './BookingForm';
import { HealthPackage } from '@/lib/data';
import {
  ShieldCheck,
  Zap,
  FileCheck2,
  Stethoscope,
  ThermometerSnowflake,
  CreditCard,
  Star,
  Check,
  Award,
} from 'lucide-react';

interface HeroSectionProps {
  onBookingSuccess: (data: any) => void;
  selectedPackage?: HealthPackage;
}

export function HeroSection({ onBookingSuccess, selectedPackage }: HeroSectionProps) {
  const USPs = [
    {
      icon: Zap,
      title: '60-Min Doorstep Pickup',
      desc: 'Certified phlebotomists arrive on-time with sealed sterile kits',
    },
    {
      icon: ShieldCheck,
      title: '100% NABL Accredited Labs',
      desc: 'Automated AI double-verification for 100% report accuracy',
    },
    {
      icon: FileCheck2,
      title: 'Smart Reports in 12 Hours',
      desc: 'Easy-to-understand visual health charts delivered on WhatsApp',
    },
    {
      icon: Stethoscope,
      title: 'Free Doctor Consultation',
      desc: 'Complimentary tele-review of your test report by senior doctor',
    },
    {
      icon: ThermometerSnowflake,
      title: 'Cold-Chain Sample Integrity',
      desc: 'Stored in ice gel packs maintaining 2°C - 8°C optimal temperature',
    },
    {
      icon: CreditCard,
      title: 'Pay After Sample Collection',
      desc: 'No advance payment needed • Pay via UPI or Cash at home',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E8FBE9]/50 via-white to-white pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Headlines & Value Propositions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Star Rating Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-slate-900">4.9 / 5</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600 font-semibold">50,000+ Happy Families Trust Us</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {selectedPackage?.name || 'Smart Full Body Health Checkup'} with{' '}
                <span className="text-[#00B30C] underline decoration-[#00D40E] decoration-4">
                  {selectedPackage?.testsCount ? `${selectedPackage.testsCount}+ Vital Tests` : '80+ Vital Tests'}
                </span>
              </h1>
              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                {selectedPackage?.description ||
                  'Comprehensive preventive screening covering Heart, Diabetes, Liver, Kidney, Thyroid & Blood counts. Free doorstep blood collection by certified phlebotomists.'}
              </p>
            </div>

            {/* High-Impact Price Banner Box */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00D40E] text-black font-extrabold text-[10px] uppercase tracking-wider">
                    {selectedPackage?.badge || 'SPECIAL DISCOUNT TODAY'}
                  </span>
                  <span className="text-xs text-slate-400">Special Promo</span>
                </div>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#00D40E]">
                    ₹{selectedPackage?.discountedPrice || 799}
                  </span>
                  {selectedPackage?.originalPrice && (
                    <span className="text-lg text-slate-400 line-through font-semibold">
                      ₹{selectedPackage.originalPrice}
                    </span>
                  )}
                  {selectedPackage?.originalPrice && selectedPackage?.discountedPrice && (
                    <span className="text-xs text-emerald-400 font-bold">
                      (Save ₹{selectedPackage.originalPrice - selectedPackage.discountedPrice})
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#00D40E]" />
                  <span>Free Home Collection + Free Doctor Report Review</span>
                </div>
              </div>

              <div className="shrink-0 p-3 rounded-2xl bg-slate-800 border border-slate-700/80 text-center sm:text-right">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                  🎁 BONUS TEST INCLUDED
                </div>
                <div className="text-xs font-extrabold text-white mt-0.5">
                  Free HbA1c (Sugar) + Iron Profile
                </div>
                <div className="text-[10px] text-slate-400">Worth ₹699 — Free with this package</div>
              </div>
            </div>

            {/* Value Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {USPs.map((usp, idx) => {
                const Icon = usp.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#E8FBE9] text-[#00B30C] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{usp.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{usp.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accreditation ribbon */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-bold border-t border-slate-200/80">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Award className="w-4 h-4 text-[#00B30C]" />
                NABL Accredited Laboratory
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#00B30C]" />
                ISO 9001:2015 Certified
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <Check className="w-4 h-4 text-[#00B30C]" />
                100% Automated Analyzers
              </span>
            </div>
          </div>

          {/* Right Column: High-Converting Booking Lead Form */}
          <div className="lg:col-span-5 sticky top-22">
            <BookingForm selectedPackage={selectedPackage} onSuccess={onBookingSuccess} />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { HEALTH_PACKAGES, HealthPackage } from '@/lib/data';
import {
  Check,
  Clock,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface PopularPackagesProps {
  onSelectPackage: (pkg: HealthPackage) => void;
}

export function PopularPackages({ onSelectPackage }: PopularPackagesProps) {
  // Display other packages (excluding the flagship full body which is the hero)
  const otherPackages = HEALTH_PACKAGES.filter((p) => p.id !== 'smart-full-body');

  const handleSelect = (pkg: HealthPackage) => {
    onSelectPackage(pkg);
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="other-packages" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00B30C]" />
            Targeted Preventive Screening
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Other Popular Diagnostic Health Packages
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-base">
            Targeted health checks for Diabetes, Thyroid, Heart, Women’s Wellness & Senior Care with free doorstep collection.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPackages.map((pkg) => {
            const savings = pkg.originalPrice - pkg.discountedPrice;
            const discountPct = Math.round((savings / pkg.originalPrice) * 100);

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00D40E]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[10px] tracking-wider uppercase">
                      {pkg.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">
                      {discountPct}% OFF
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#00B30C] transition-colors leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Meta pills: Report time & Fasting */}
                  <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] font-bold text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Reports in {pkg.reportTime}
                    </span>
                    {pkg.fastingRequired && (
                      <span className="flex items-center gap-1 text-amber-600">
                        <AlertCircle className="w-3.5 h-3.5" />
                        10-12h Fasting
                      </span>
                    )}
                  </div>

                  {/* Highlighted Tests */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      Includes {pkg.testsCount} Tests:
                    </span>
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#00B30C] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{pkg.discountedPrice}
                        </span>
                        <span className="text-sm text-slate-400 line-through font-semibold">
                          ₹{pkg.originalPrice}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-extrabold">
                        Save ₹{savings} • Free Home Pickup
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelect(pkg)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#00D40E] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:bg-[#00D40E] group-hover:text-black"
                  >
                    <span>Book Home Pickup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

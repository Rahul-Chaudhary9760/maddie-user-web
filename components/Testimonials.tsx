'use client';

import React from 'react';
import { TESTIMONIALS } from '@/lib/data';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00B30C]" />
            Verified Patient Feedback
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Trusted by 50,000+ Families Across India
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-base">
            Read what real patients and doctors say about our doorstep sample collection and rapid digital reports.
          </p>

          {/* Aggregate Rating Pill */}
          <div className="inline-flex items-center gap-4 mt-6 p-2.5 px-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <div className="text-xs text-slate-700 font-bold">
              <strong className="text-slate-900 font-black">4.9 / 5</strong> Based on 12,400+ Verified Patient Reviews
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-200" />
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-slate-900">{t.name}</h4>
                    {t.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#00B30C]" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block">{t.location}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

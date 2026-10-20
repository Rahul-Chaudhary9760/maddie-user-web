'use client';

import React, { useState } from 'react';
import { SMART_FULL_BODY_DETAILS } from '@/lib/data';
import {
  ChevronDown,
  ChevronUp,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface PackageDetailsAccordionProps {
  onBookNowClick?: () => void;
}

export function PackageDetailsAccordion({ onBookNowClick }: PackageDetailsAccordionProps) {
  // Open the first 3 categories by default
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const expandAll = () => {
    setOpenIndices(SMART_FULL_BODY_DETAILS.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndices([]);
  };

  const handleBookNow = () => {
    if (onBookNowClick) {
      onBookNowClick();
    } else {
      const el = document.getElementById('booking-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered by search query
  const filteredCategories = SMART_FULL_BODY_DETAILS.map((cat) => {
    const matchingItems = cat.items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      items: matchingItems,
      hasMatch: matchingItems.length > 0 || cat.title.toLowerCase().includes(searchQuery.toLowerCase()),
    };
  }).filter((cat) => (searchQuery ? cat.hasMatch : true));

  const totalTests = SMART_FULL_BODY_DETAILS.reduce(
    (sum, cat) => sum + cat.testsCount,
    0
  );

  return (
    <section id="package-details" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00B30C]" />
              Detailed Test Breakdown
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Smart Full Body Checkup:{' '}
              <span className="text-[#00B30C]">{totalTests}+ Vital Parameters</span>
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl">
              Every essential organ profiled in detail. Click any organ profile to inspect every specific biomarker tested with NABL-certified calibration.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={expandAll}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
            >
              Collapse All
            </button>
            <button
              onClick={handleBookNow}
              className="px-5 py-2 rounded-xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-extrabold text-xs uppercase tracking-wide transition-all shadow-md shadow-[#00D40E]/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book @ ₹799</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Parameter Filter */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search test (e.g. HbA1c, Cholesterol, Creatinine, TSH)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#00D40E] text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Categories Grid / Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((category, originalIdx) => {
            const isOpen = searchQuery ? true : openIndices.includes(originalIdx);

            return (
              <div
                key={originalIdx}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#00D40E]/50 bg-white shadow-md'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleCategory(originalIdx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {category.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold text-[#00B30C]">
                        {category.testsCount} Tests Included
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 ml-2">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {category.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2 rounded-xl bg-slate-50/80 hover:bg-[#E8FBE9]/50 transition-colors text-xs text-slate-800 font-medium"
                        >
                          <Check className="w-3.5 h-3.5 text-[#00B30C] shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Free Test Urgency Highlight Box at the bottom */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00D40E] text-black font-black flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-[#00D40E]/30">
              🎁
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00D40E] text-black font-extrabold text-[10px] uppercase tracking-wider">
                COMPLIMENTARY BONUS TEST
              </span>
              <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                Free HbA1c (3-Month Sugar) + Serum Iron Profile Included
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Standard market price ₹699 — Absolutely Free with this ₹799 health package.
              </p>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="px-7 py-3.5 rounded-2xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-black text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-[#00D40E]/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Claim Free HbA1c Offer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

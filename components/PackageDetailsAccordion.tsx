'use client';

import React, { useState, useMemo } from 'react';
import { SMART_FULL_BODY_DETAILS, PackageCategoryDetail } from '@/lib/data';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface PackageDetailsAccordionProps {
  onBookNowClick?: () => void;
}

export function PackageDetailsAccordion({ onBookNowClick }: PackageDetailsAccordionProps) {
  // Active selected category for laptop/desktop Master-Detail view
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  // Single-expand state for mobile/tablet accordion (only 1 open at a time)
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(0);

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  const totalTests = useMemo(() => {
    return SMART_FULL_BODY_DETAILS.reduce((sum, cat) => sum + cat.testsCount, 0);
  }, []);

  const handleBookNow = () => {
    if (onBookNowClick) {
      onBookNowClick();
    } else {
      const el = document.getElementById('booking-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter categories and their items based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        categories: SMART_FULL_BODY_DETAILS,
        totalMatches: totalTests,
      };
    }
    const q = searchQuery.toLowerCase();
    const filtered = SMART_FULL_BODY_DETAILS.map((cat) => {
      const matches = cat.items.filter((item) => item.toLowerCase().includes(q));
      const titleMatches = cat.title.toLowerCase().includes(q);
      return {
        ...cat,
        items: titleMatches && matches.length === 0 ? cat.items : matches,
        hasMatch: titleMatches || matches.length > 0,
      };
    }).filter((cat) => cat.hasMatch);

    const totalMatches = filtered.reduce((sum, cat) => sum + cat.items.length, 0);
    return { categories: filtered, totalMatches };
  }, [searchQuery, totalTests]);

  // Current category for Desktop Master-Detail view
  const currentDesktopCategory: PackageCategoryDetail = useMemo(() => {
    if (searchResults.categories.length === 0) {
      return SMART_FULL_BODY_DETAILS[0];
    }
    return searchResults.categories[activeTabIdx] || searchResults.categories[0];
  }, [searchResults, activeTabIdx]);

  // Toggle for mobile accordion (strict single-expand: only 1 open at a time)
  const handleMobileToggle = (idx: number) => {
    setMobileOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="package-details" className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 pb-6 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00B30C]" />
              Detailed Test Breakdown
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Smart Full Body Checkup:{' '}
              <span className="text-[#00B30C]">{totalTests}+ Vital Parameters</span>
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Every organ system thoroughly analyzed. Select any organ category to inspect every biomarker calibrated on NABL-certified automated analyzers.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleBookNow}
              className="px-5 py-2.5 rounded-xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-extrabold text-xs uppercase tracking-wide transition-all shadow-md shadow-[#00D40E]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Book @ ₹799</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Parameter Filter Bar */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveTabIdx(0);
                setMobileOpenIdx(0);
              }}
              placeholder="Search specific test (e.g. HbA1c, Cholesterol, Creatinine, SGPT)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#00D40E] text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-[11px] text-slate-500 mt-1.5 pl-1">
              Found {searchResults.totalMatches} test parameters matching "{searchQuery}"
            </p>
          )}
        </div>

        {/* ============================================================== */}
        {/* DESKTOP / LAPTOP VIEW (lg and up): MASTER-DETAIL TABBED LAYOUT */}
        {/* (Left: Organ Categories list • Right: Active Category Details) */}
        {/* ============================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Selectable Categories List */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-2.5">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                Select Organ Profile
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                {searchResults.categories.length} Profiles
              </span>
            </div>

            {searchResults.categories.map((category, idx) => {
              const isActive =
                currentDesktopCategory.title === category.title;

              return (
                <button
                  key={category.title}
                  type="button"
                  onClick={() => setActiveTabIdx(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                    isActive
                      ? 'border-[#00D40E] bg-[#E8FBE9]/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 rounded-xl bg-white border border-slate-100 shadow-2xs">
                      {category.icon}
                    </span>
                    <div>
                      <h3
                        className={`text-xs sm:text-sm font-extrabold leading-tight ${
                          isActive
                            ? 'text-slate-900'
                            : 'text-slate-700 group-hover:text-slate-900'
                        }`}
                      >
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-bold text-[#00B30C] mt-0.5 block">
                        {category.items.length} Tests
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#00D40E] animate-pulse" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Showcase: Detailed Parameters of Selected Category */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md">
              {/* Active Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl p-2 rounded-2xl bg-[#E8FBE9] border border-[#00D40E]/20">
                    {currentDesktopCategory.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {currentDesktopCategory.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00B30C] font-extrabold text-[11px]">
                        {currentDesktopCategory.items.length} Biomarkers Tested
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">• 100% NABL Accredited</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#00D40E] text-white hover:text-black font-extrabold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Book @ ₹799</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Parameters List Grid */}
              <div className="mt-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                  All Parameters Included in this Profile:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[520px] overflow-y-auto pr-1">
                  {currentDesktopCategory.items.map((param, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-[#E8FBE9]/50 hover:border-[#00D40E]/30 transition-colors flex items-start gap-2.5 text-xs text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00B30C] shrink-0 mt-0.5" />
                      <span className="leading-snug">{param}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Sample Assurance Box */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00B30C]" />
                  <span>Dual-Run verification on automated clinical analyzers</span>
                </div>
                <span className="font-semibold text-slate-700 hidden sm:inline">
                  Reports in 12 Hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE & TABLET VIEW (< lg): STRICT SINGLE-EXPAND ACCORDION   */}
        {/* (Only 1 item open at a time • Zero side-by-side stretching)    */}
        {/* ============================================================== */}
        <div className="lg:hidden space-y-3">
          {searchResults.categories.map((category, idx) => {
            const isOpen = mobileOpenIdx === idx;

            return (
              <div
                key={category.title}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#00D40E] bg-white shadow-md'
                    : 'border-slate-200 bg-slate-50/80 hover:bg-white'
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => handleMobileToggle(idx)}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-bold text-[#00B30C]">
                        {category.items.length} Tests Included
                      </span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 ml-2">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 animate-in fade-in duration-150">
                    <div className="space-y-2 mt-3">
                      {category.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 text-xs text-slate-800 font-medium"
                        >
                          <Check className="w-3.5 h-3.5 text-[#00B30C] shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleBookNow}
                      className="mt-4 w-full py-2.5 rounded-xl bg-[#00D40E] text-black font-extrabold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Book Smart Full Body @ ₹799</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Free Test Urgency Highlight Box at the bottom */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#00D40E] text-black font-black flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-[#00D40E]/30">
              🎁
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00D40E] text-black font-extrabold text-[10px] uppercase tracking-wider">
                COMPLIMENTARY BONUS TEST
              </span>
              <h4 className="text-base sm:text-xl font-black text-white mt-1">
                Free HbA1c (3-Month Sugar) + Serum Iron Profile Included
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Standard market price ₹699 — Absolutely Free with this ₹799 health package.
              </p>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-black text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-[#00D40E]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Claim Free HbA1c Offer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  ShieldCheck,
  CalendarCheck,
  Menu,
  X,
  Award,
  ChevronRight,
  User as UserIcon,
  LogOut,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Medie Health"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>

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
          {/* Call helpline: compact on mobile, full on tablet/desktop */}
          <a
            href="tel:+918979118660"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#00D40E] shrink-0" />
            <span className="hidden md:inline text-slate-500 font-normal">24x7:</span>
            <span>+91 89791 18660</span>
          </a>

          {/* User Auth: Desktop */}
          {isAuthenticated && user ? (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  {getInitials(user.name)}
                </div>
                <span className="max-w-[100px] truncate">Hi, {firstName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-100 shadow-xl py-2 text-xs z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-[#00D40E]" />
                      <span>My Bookings</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 text-xs font-bold transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>Sign In</span>
              </Link>
            </div>
          )}

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
            {/* User Profile Card or Auth Buttons in Drawer */}
            {isAuthenticated && user ? (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shrink-0">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/my-bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold"
                    title="My Bookings"
                  >
                    <Calendar className="w-4 h-4 text-[#00D40E]" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="p-2 rounded-xl bg-white border border-red-200 text-red-600 text-xs font-semibold"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pb-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#00D40E]" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Create Account</span>
                </Link>
              </div>
            )}

            {/* Quick Navigation Links */}
            <div className="space-y-1">
              {isAuthenticated && (
                <Link
                  href="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00D40E]" />
                    <span>My Bookings & Lab Reports</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              )}
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
                href="tel:+918979118660"
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

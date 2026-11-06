'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone, ArrowUp, Calendar } from 'lucide-react';
import { useTests } from '@/hooks/useTests';

export function FloatingContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { tests } = useTests();
  const mainPkg =
    tests.find(
      (t) =>
        t.id === 'full-body-smart' ||
        t.id === 'smart-full-body' ||
        t.category === 'Full Body'
    ) || tests[0];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('booking-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappLink =
    'https://api.whatsapp.com/send?phone=8979118660&text=Hello%20Medie%20Health%2C%20I%20want%20to%20inquire%20about%20the%20Smart%20Full%20Body%20Health%20Checkup%20%40%20%E2%82%B9799.';

  return (
    <>
      {/* Floating Buttons Desktop / Tablet (Right bottom) */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Floating Chat */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-xl shadow-[#25D366]/30 hover:bg-[#20ba59] transition-all hover:scale-105"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">WhatsApp Help</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-[#00B30C]">
              ₹{mainPkg?.discountedPrice || 799}
            </span>
            {mainPkg?.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{mainPkg.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-600 block -mt-0.5 truncate max-w-[200px]">
            {mainPkg?.name || 'Smart Full Body'} ({mainPkg?.testsCount || 80}+ Tests)
          </span>
        </div>

        <button
          onClick={scrollToForm}
          className="px-5 py-2.5 rounded-xl bg-[#00D40E] active:bg-[#00B30C] text-black font-black text-xs uppercase tracking-wide shadow-md shadow-[#00D40E]/25 flex items-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Now</span>
        </button>
      </div>
    </>
  );
}

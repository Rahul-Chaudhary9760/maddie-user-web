'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export function UrgencyBar() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left Announcement */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-[#00D40E] shrink-0 animate-ping" />
          <p className="text-[11px] sm:text-xs text-slate-200 truncate">
            <span className="hidden sm:inline">Special Promo:{' '}</span>
            <strong className="text-white font-extrabold underline decoration-[#00D40E] decoration-2">
              Free HbA1c Sugar Test & Iron Profile
            </strong>{' '}
            <span className="hidden md:inline">(worth ₹699) with Full Body Checkup!</span>
          </p>
        </div>

        {/* Right Countdown Timer */}
        <div className="flex items-center gap-1.5 shrink-0 bg-slate-800/90 px-2.5 py-1 rounded-full border border-slate-700/80">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00D40E]" />
          <span className="text-[10px] sm:text-[11px] text-slate-300 font-semibold uppercase tracking-wider hidden sm:inline">
            Ends in:
          </span>
          <div className="flex items-center font-mono font-bold text-[10px] sm:text-[11px] text-white space-x-1">
            <span className="bg-slate-950 px-1 py-0.5 rounded">{format(timeLeft.hours)}h</span>
            <span>:</span>
            <span className="bg-slate-950 px-1 py-0.5 rounded">{format(timeLeft.minutes)}m</span>
            <span>:</span>
            <span className="bg-slate-950 px-1 py-0.5 rounded text-[#00D40E]">{format(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

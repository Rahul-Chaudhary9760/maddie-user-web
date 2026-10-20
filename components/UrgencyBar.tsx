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
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00D40E] animate-ping" />
          <span className="font-medium text-slate-200">
            Special Promo:{' '}
            <strong className="text-white font-extrabold underline decoration-[#00D40E] decoration-2">
              Free HbA1c Sugar Test & Iron Profile
            </strong>{' '}
            included with Smart Full Body Checkup!
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          <Clock className="w-3.5 h-3.5 text-[#00D40E]" />
          <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">
            Offer Ends in:
          </span>
          <span className="font-mono font-bold text-white bg-slate-900 px-1.5 py-0.5 rounded text-[11px]">
            {format(timeLeft.hours)}h
          </span>
          :
          <span className="font-mono font-bold text-white bg-slate-900 px-1.5 py-0.5 rounded text-[11px]">
            {format(timeLeft.minutes)}m
          </span>
          :
          <span className="font-mono font-bold text-[#00D40E] bg-slate-900 px-1.5 py-0.5 rounded text-[11px]">
            {format(timeLeft.seconds)}s
          </span>
        </div>
      </div>
    </div>
  );
}

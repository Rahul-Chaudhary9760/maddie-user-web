'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, X, Calendar, Clock, MapPin, Phone, MessageSquare } from 'lucide-react';

interface BookingSuccessModalProps {
  bookingData: any;
  onClose: () => void;
}

export function BookingSuccessModal({
  bookingData,
  onClose,
}: BookingSuccessModalProps) {
  if (!bookingData) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Medie Health, I have booked a home collection appointment. My Reference ID is ${bookingData.bookingRef}. Patient: ${bookingData.patientName}.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start">
          <img src="/logo.png" alt="Medie Health" className="h-8 w-auto object-contain" />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            Appointment Requested
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Home Sample Pickup Scheduled!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            We have received your home collection request. Our operations dispatch team will contact you shortly.
          </p>
        </div>

        {/* Booking Reference Box */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
            <span className="text-slate-500 font-medium">Booking Reference:</span>
            <span className="font-mono font-extrabold text-[#00B30C] text-sm">
              #{bookingData.bookingRef}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Patient:</span>
            <span className="font-bold text-slate-800">{bookingData.patientName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Contact:</span>
            <span className="font-medium text-slate-800">+91 {bookingData.patientPhone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Health Package:</span>
            <span className="font-bold text-slate-900">{bookingData.packageName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Scheduled Visit:</span>
            <span className="font-semibold text-slate-800">
              {new Date(bookingData.appointmentDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              • {bookingData.timeSlot}
            </span>
          </div>

          {bookingData.address && (
            <div className="flex justify-between items-start">
              <span className="text-slate-500 shrink-0">Address:</span>
              <span className="font-semibold text-slate-800 text-right ml-3 text-[11px] leading-tight">
                {typeof bookingData.address === 'string'
                  ? bookingData.address
                  : [
                      bookingData.address.street,
                      bookingData.address.landmark,
                      bookingData.address.city,
                      bookingData.address.state,
                      bookingData.address.pincode,
                    ]
                      .filter(Boolean)
                      .join(', ')}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-slate-200/80">
            <span className="text-slate-500 font-bold">Total Amount to Pay @ Home:</span>
            <span className="font-black text-slate-900 text-base">
              ₹{bookingData.totalAmount}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/my-bookings"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs text-center"
          >
            <Calendar className="w-4 h-4 text-[#00D40E]" />
            <span>View My Bookings</span>
          </Link>

          <a
            href={`https://wa.me/8979118660?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20 text-center"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Track on WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { HEALTH_PACKAGES, HealthPackage } from '@/lib/data';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Star,
  Sparkles,
} from 'lucide-react';

interface BookingFormProps {
  selectedPackage?: HealthPackage;
  onSuccess: (bookingData: any) => void;
}

export function BookingForm({
  selectedPackage = HEALTH_PACKAGES[0],
  onSuccess,
}: BookingFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Delhi NCR');
  const [pincode, setPincode] = useState('110001');
  const [selectedPkgId, setSelectedPkgId] = useState(selectedPackage.id);
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setAppointmentDate(tomorrow.toISOString().split('T')[0]);
  }, []);
  const [timeSlot, setTimeSlot] = useState('07:00-08:00');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPackage?.id) {
      setSelectedPkgId(selectedPackage.id);
    }
  }, [selectedPackage]);

  const currentPkg =
    HEALTH_PACKAGES.find((p) => p.id === selectedPkgId) || selectedPackage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          pincode: pincode.trim(),
          packageId: currentPkg.id,
          packageName: currentPkg.name,
          price: currentPkg.discountedPrice,
          appointmentDate,
          timeSlot,
          address: address.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit booking.');
      }

      onSuccess(data.data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please call helpline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="booking-form"
      className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-2xl shadow-slate-200/50"
    >
      {/* Form Header */}
      <div className="pb-5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8FBE9] border border-[#00D40E]/40 text-[#00B30C] text-[11px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Doorstep Booking
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            🔥 10,480+ booked this week
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Book Home Sample Collection
        </h3>

        {/* Rating Trust Bar */}
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="font-extrabold text-slate-900">4.9 / 5</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">Over 50,000+ Happy Families</span>
        </div>
      </div>

      {error && (
        <div className="my-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
        {/* Name Field */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
            Patient Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-medium text-xs focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
            Mobile Number (For Report on WhatsApp) *
          </label>
          <div className="relative flex">
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs">
              +91
            </span>
            <input
              type="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="98765 43210"
              className="w-full pl-3.5 pr-4 py-3 rounded-r-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-medium text-xs focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Package Selector */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
            Selected Health Package *
          </label>
          <select
            value={selectedPkgId}
            onChange={(e) => setSelectedPkgId(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-bold text-xs focus:outline-none bg-white transition-colors"
          >
            {HEALTH_PACKAGES.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} ({pkg.testsCount} Tests) — ₹{pkg.discountedPrice}
              </option>
            ))}
          </select>
        </div>

        {/* City & Pincode Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
              City *
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Delhi NCR"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-medium text-xs focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
              Pincode *
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 110001"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-medium text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Date & Time Slot Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
              Collection Date *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full pl-9 pr-2 py-3 rounded-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-medium text-xs focus:outline-none bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
              Time Slot *
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full pl-9 pr-2 py-3 rounded-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-medium text-xs focus:outline-none bg-white"
              >
                <option value="06:00-07:00">06:00 AM - 07:00 AM</option>
                <option value="07:00-08:00">07:00 AM - 08:00 AM</option>
                <option value="08:00-09:00">08:00 AM - 09:00 AM</option>
                <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doorstep Address */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1.5">
            Doorstep Pickup Address & Landmark (Optional)
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Flat No., Building Name, Street & Landmark"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#00D40E] text-slate-900 font-medium text-xs focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* WhatsApp consent */}
        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="whatsapp"
            checked={whatsappConsent}
            onChange={(e) => setWhatsappConsent(e.target.checked)}
            className="w-4 h-4 rounded text-[#00D40E] focus:ring-[#00D40E] mt-0.5 accent-[#00D40E] cursor-pointer"
          />
          <label htmlFor="whatsapp" className="text-[11px] text-slate-500 cursor-pointer leading-tight">
            Send appointment confirmation, tracking link & digital report on WhatsApp.
          </label>
        </div>

        {/* Live Price Summary Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 font-semibold">{currentPkg.name}</span>
            <span className="text-slate-400 line-through">₹{currentPkg.originalPrice}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-700 font-bold">Doorstep Sample Collection:</span>
            <span className="text-emerald-700 font-extrabold uppercase">FREE (₹0)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-700 font-bold">Doctor Report Review:</span>
            <span className="text-emerald-700 font-extrabold uppercase">FREE (₹0)</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
            <span className="font-bold text-slate-900 text-sm">Total Payable:</span>
            <span className="font-black text-xl text-[#00B30C]">
              ₹{currentPkg.discountedPrice}
            </span>
          </div>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-[#00D40E] hover:bg-[#00B30C] text-black font-black text-sm uppercase tracking-wide transition-all shadow-xl shadow-[#00D40E]/25 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Book Home Collection (Pay Later)
            </>
          )}
        </button>

        {/* Trust Badges bottom */}
        <div className="text-center text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00D40E]" />
          <span>Zero Advance Payment • Pay Phlebotomist via UPI/Cash</span>
        </div>
      </form>
    </div>
  );
}

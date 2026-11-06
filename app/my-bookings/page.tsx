'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  User as UserIcon,
  Phone,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api, ApiError } from '@/lib/api';
import { UserBooking, ApiResponse } from '@/types/auth';

function MyBookingsContent() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<UserBooking | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get<ApiResponse<UserBooking[]>>('/bookings/my');
      setBookings(res.data || []);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch your bookings.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/login?redirect=/');
      } else {
        fetchBookings();
      }
    }
  }, [authLoading, isAuthenticated, router, fetchBookings]);

  const handleCancelBooking = async () => {
    if (!cancelModalBooking) return;
    setCancellingId(cancelModalBooking._id);
    try {
      await api.patch(`/bookings/${cancelModalBooking._id}/cancel`, {});
      setCancelModalBooking(null);
      await fetchBookings();
    } catch (err: unknown) {
      const msg = err instanceof ApiError ? err.message : 'Failed to cancel booking';
      alert(msg);
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status: UserBooking['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending Confirmation
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Confirmed
          </span>
        );
      case 'sample_collected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Sample Collected
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <XCircle className="w-3.5 h-3.5 text-slate-400" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  const formatAddress = (addr: UserBooking['address']) => {
    if (typeof addr === 'string') return addr;
    if (!addr) return 'Home Address';
    const parts = [addr.street, addr.landmark, addr.city, addr.state, addr.pincode].filter(Boolean);
    return parts.join(', ') || 'Home Address';
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  if (authLoading || (!isAuthenticated && isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#00D40E] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Loading your profile & bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Medie Health" className="h-7 sm:h-8 w-auto object-contain" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-xs text-slate-700">
              <UserIcon className="w-3.5 h-3.5 text-[#00D40E]" />
              <span className="font-semibold">{user?.name}</span>
            </div>
            <button
              onClick={() => logout()}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Bookings
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Track your upcoming sample collections and download digital lab reports.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookings}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/#booking-form"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00D40E] hover:bg-[#00B30C] text-slate-950 text-xs font-bold transition-all shadow-md shadow-[#00D40E]/20"
            >
              <span>Book New Test</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {(
            [
              { key: 'all', label: 'All Bookings' },
              { key: 'pending', label: 'Pending' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
              {tab.key === 'all' && bookings.length > 0 && ` (${bookings.length})`}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between gap-3 text-red-700 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchBookings}
              className="text-xs font-bold underline hover:text-red-900 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Bookings List or Empty State */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-white border border-slate-200 animate-pulse p-6"
              />
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4 text-[#00D40E]">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {filter === 'all' ? 'No bookings found' : `No ${filter} bookings`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              {filter === 'all'
                ? 'You have not booked any diagnostic health packages yet. Schedule a 60-min home visit today!'
                : `You do not have any bookings currently marked as ${filter}.`}
            </p>
            <Link
              href="/#booking-form"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00D40E] hover:bg-[#00B30C] text-black font-bold text-xs sm:text-sm shadow-md shadow-[#00D40E]/20"
            >
              <span>Explore 80+ Tests @ ₹799</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 sm:p-6 shadow-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[11px] font-mono text-slate-400">
                        ID: #{booking._id.slice(-6).toUpperCase()}
                      </span>
                      {getStatusBadge(booking.status)}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {booking.test?.name || 'Diagnostic Health Checkup'}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block">Total Amount</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      ₹{booking.totalAmount || booking.test?.price || 799}
                    </span>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Date</p>
                      <p className="text-slate-500">
                        {booking.appointmentDate
                          ? new Date(booking.appointmentDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Pending'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Time Slot</p>
                      <p className="text-slate-500">{booking.timeSlot || '07:00 - 08:00 AM'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <UserIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Patient</p>
                      <p className="text-slate-500">
                        {booking.patientName || user?.name}
                        {booking.patientPhone && ` • ${booking.patientPhone}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Pickup Address</p>
                      <p className="text-slate-500 line-clamp-1">{formatAddress(booking.address)}</p>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    Booked on{' '}
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Recently'}
                  </div>

                  <div className="flex items-center gap-2">
                    {booking.reportUrl && (
                      <a
                        href={booking.reportUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Download Lab Report</span>
                      </a>
                    )}

                    {booking.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => setCancelModalBooking(booking)}
                        className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel Booking
                      </button>
                    )}

                    <a
                      href="tel:+918979118660"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#00D40E]" />
                      <span>Helpline Support</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cancel Confirmation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-2">Cancel This Booking?</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to cancel the appointment for{' '}
              <strong>{cancelModalBooking.test?.name || 'this test'}</strong> scheduled for{' '}
              {cancelModalBooking.appointmentDate
                ? new Date(cancelModalBooking.appointmentDate).toLocaleDateString('en-IN')
                : 'your selected date'}
              ?
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancelModalBooking(null)}
                disabled={!!cancellingId}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={!!cancellingId}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer disabled:opacity-50"
              >
                {cancellingId ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 border-3 border-[#00D40E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}

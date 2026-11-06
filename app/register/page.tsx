'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/lib/api';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  general?: string;
};

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { register, isAuthenticated, isLoading: authLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  // If already logged in, redirect
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace(redirectUrl);
    }
  }, [authLoading, isAuthenticated, redirectUrl, router]);

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!name.trim()) {
      e.name = 'Full name required';
    } else if (name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      e.email = 'Email required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = 'Invalid email address';
    }

    if (!password) {
      e.password = 'Password required';
    } else if (password.length < 6) {
      e.password = 'Minimum 6 characters';
    }

    if (phone.trim() && !/^\+?[0-9]{10,13}$/.test(phone.replace(/\s/g, ''))) {
      e.phone = 'Invalid phone number (10-13 digits)';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await register(
        name.trim(),
        email.trim().toLowerCase(),
        password,
        phone.trim() || undefined
      );

      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.replace(redirectUrl);
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrors({ general: err.message });
      } else if (err instanceof Error) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    alert('Google authentication is configured in the mobile app. Please sign up with your email and name on web.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Decorative ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#00D40E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        {/* Left Side: Healthcare Brand Showcase (Desktop/Tablet) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-10 flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D40E]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo & Tagline */}
          <div className="relative z-10">
            <Link href="/" className="inline-block">
              <img
                src="/logo-white.png"
                alt="Medie Health"
                className="h-10 w-auto object-contain brightness-110"
              />
            </Link>
            <div className="mt-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Medie Health</span>
              </div>
              <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Create your account <br />
                <span className="text-[#00D40E]">in 30 seconds.</span>
              </h2>
              <p className="text-slate-300 text-xs xl:text-sm leading-relaxed pt-1">
                Unlock instant digital health records, priority doorstep lab slots, and complimentary doctor consultation with every checkup.
              </p>
            </div>
          </div>

          {/* Center Trust Highlights */}
          <div className="relative z-10 space-y-4 my-8">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#00D40E]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#00D40E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">NABL & ICMR Certified</p>
                <p className="text-[11px] text-slate-300">Dual verification by Senior Pathologists</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#00D40E]/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#00D40E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Zero Extra Sample Charges</p>
                <p className="text-[11px] text-slate-300">Free home collection for you & your family</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-[#00D40E]/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#00D40E]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">100% Encrypted & Private</p>
                <p className="text-[11px] text-slate-300">Your medical data is strictly confidential</p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#00D40E]" />
              <span>Delhi NCR Leading Health Network</span>
            </div>
            <span>© Medie Health</span>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          {/* Mobile Brand Logo */}
          <div className="flex lg:hidden justify-center mb-6">
            <Link href="/">
              <img
                src="/logo.png"
                alt="Medie Health"
                className="h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-normal">
              Access your health anytime, anywhere.
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800 text-xs sm:text-sm font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* General Error Banner */}
          {errors.general && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs sm:text-sm font-semibold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError('name');
                  }}
                  placeholder="Rahul Sharma"
                  autoComplete="name"
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm font-normal bg-slate-50 border ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#00D40E] focus:ring-[#00D40E]/20'
                  } focus:outline-none focus:ring-3 focus:bg-white transition-all`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs font-semibold text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError('email');
                  }}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm font-normal bg-slate-50 border ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#00D40E] focus:ring-[#00D40E]/20'
                  } focus:outline-none focus:ring-3 focus:bg-white transition-all`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs font-semibold text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number <span className="font-normal text-slate-400 text-[11px]">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearError('phone');
                  }}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-sm font-normal bg-slate-50 border ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#00D40E] focus:ring-[#00D40E]/20'
                  } focus:outline-none focus:ring-3 focus:bg-white transition-all`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs font-semibold text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError('password');
                  }}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl text-sm font-normal bg-slate-50 border ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#00D40E] focus:ring-[#00D40E]/20'
                  } focus:outline-none focus:ring-3 focus:bg-white transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs font-semibold text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#00D40E] hover:bg-[#00B30C] text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#00D40E]/25 hover:shadow-xl hover:shadow-[#00D40E]/30 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Creating your account...</span>
                </div>
              ) : (
                <>
                  <span>Sign up to Medie</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-center mt-5 text-xs sm:text-sm text-slate-600">
            <span>Already have an account? </span>
            <Link
              href={`/login${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="text-[#00D40E] hover:text-[#00B30C] font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium">or with</span>
            </div>
          </div>

          {/* Social Sign Up / In Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-2.5 sm:py-3 px-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          {/* Back to Home Link */}
          <div className="text-center mt-5">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              ← Back to Medie Health home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 border-3 border-[#00D40E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}

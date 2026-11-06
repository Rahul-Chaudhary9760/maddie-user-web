'use client';

import React, { useState, useEffect } from 'react';
import { HealthPackage } from '@/lib/data';
import { useTests } from '@/hooks/useTests';
import { UrgencyBar } from '@/components/UrgencyBar';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { KeyHighlights } from '@/components/KeyHighlights';
import { PackageDetailsAccordion } from '@/components/PackageDetailsAccordion';
import { PopularPackages } from '@/components/PopularPackages';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';
import { BookingSuccessModal } from '@/components/BookingSuccessModal';

export default function LandingPage() {
  const { tests } = useTests();
  const [selectedPackage, setSelectedPackage] = useState<HealthPackage | undefined>(
    undefined
  );
  const [bookingSuccessData, setBookingSuccessData] = useState<any | null>(null);

  useEffect(() => {
    if (tests.length > 0 && !selectedPackage) {
      const fullBody =
        tests.find(
          (t) =>
            t.id === 'full-body-smart' ||
            t.id === 'smart-full-body' ||
            t.category === 'Full Body'
        ) || tests[0];
      if (fullBody) setSelectedPackage(fullBody);
    }
  }, [tests, selectedPackage]);

  const handleSelectPackage = (pkg: HealthPackage) => {
    setSelectedPackage(pkg);
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#00D40E]/30 selection:text-black">
      {/* 1. Urgency Countdown Bar */}
      <UrgencyBar />

      {/* 2. Top Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* 3. Hero Section with Headline & Sticky Booking Lead Form */}
        <HeroSection
          selectedPackage={selectedPackage}
          onBookingSuccess={(data) => setBookingSuccessData(data)}
        />

        {/* 4. Key Highlights & Diagnostic Accreditations */}
        <KeyHighlights />

        {/* 5. 84+ Parameter Breakdown Accordion (Redcliffe-style test details) */}
        <PackageDetailsAccordion
          onBookNowClick={() => {
            const target = selectedPackage || tests[0];
            if (target) handleSelectPackage(target);
          }}
        />

        {/* 6. Popular Health Packages Carousel / Grid */}
        <PopularPackages onSelectPackage={handleSelectPackage} />

        {/* 7. How Doorstep Diagnostic Works */}
        <HowItWorks />

        {/* 8. Patient Social Proof & Testimonials */}
        <Testimonials />

        {/* 9. Diagnostic & Fasting FAQs */}
        <FaqSection />
      </main>

      {/* 10. Comprehensive Healthcare Footer */}
      <Footer />

      {/* 11. Floating WhatsApp & Mobile Sticky CTA */}
      <FloatingContact />

      {/* 12. Instant Booking Success Modal */}
      {bookingSuccessData && (
        <BookingSuccessModal
          bookingData={bookingSuccessData}
          onClose={() => setBookingSuccessData(null)}
        />
      )}
    </div>
  );
}

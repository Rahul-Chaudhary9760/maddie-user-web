import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Maddie Health — Smart Full Body Checkup @ ₹799 | 80+ Tests with Free Home Collection',
  description:
    'Book Smart Full Body Checkup online with Free Home Sample Collection. 80+ vital health tests including HbA1c, Thyroid, Lipid, Liver & Kidney profiles. 100% NABL Accredited Lab Reports in 12 hours.',
  keywords: [
    'full body checkup',
    'blood test at home',
    'hba1c test free',
    'thyroid profile test',
    'home sample collection',
    'maddie health labs',
    'diagnostic lab test near me',
  ],
  openGraph: {
    title: 'Smart Full Body Checkup @ ₹799 (80+ Tests) — Maddie Health',
    description:
      'Doorstep blood sample collection in 60 mins. Free HbA1c & Doctor Consultation included.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}

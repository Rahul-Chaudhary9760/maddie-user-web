# Maddie Health — Diagnostic Health Checkup & Lead Capture Web App

A high-converting diagnostic healthcare landing page and lead generation web application for **Maddie Health**, modeled after **Redcliffe Labs'** high-impact promotional landing page format (`https://redcliffelabs.com/cms-lp/free-hba1c-smart-full-body-checkup`) and adhering strictly to the **Maddie Emerald Green (`#00D40E`)** design system used across the Maddie ecosystem.

---

## 🌟 Highlights & Features

### 1. Urgency & Offer Banner (`components/UrgencyBar.tsx`)
- Live ticking countdown timer creating promotional urgency.
- Highlighting the complimentary **Free HbA1c (3-Month Sugar) + Serum Iron Profile** (worth ₹699) bundled with the flagship package.

### 2. Header & Trust Navbar (`components/Navbar.tsx`)
- Maddie Health brand logo with `#00D40E` Emerald accent badge.
- Trust accreditations: **100% NABL Accredited Labs**, **60-Min Home Pickup**, and **Reports in 12 Hours**.
- Direct 24x7 Helpline dialer (`+91 98765 43210`) and smooth scroll CTA to the booking form.

### 3. Hero Section & High-Converting Lead Form (`components/HeroSection.tsx` & `components/BookingForm.tsx`)
- **Headline**: *Smart Full Body Health Checkup with 84+ Vital Tests* @ **₹799** (Original ₹1,999 — Save ₹1,200).
- **Social Proof**: 4.9/5 Star rating from 50,000+ Happy Families.
- **Lead Capture Fields**:
  - Patient Full Name
  - 10-Digit Mobile Number
  - Package Selector (defaults to Smart Full Body, live updates with price calculation)
  - City & Pincode
  - Preferred Collection Date & Fasting Morning Time Slot (06:00-07:00, 07:00-08:00 AM, etc.)
  - Doorstep Address & Landmark
  - WhatsApp consent checkbox for digital report delivery
- **Live Transparent Pricing Summary**:
  - Test Package: ₹799
  - Doorstep Sample Collection: **FREE (₹0)**
  - Doctor Report Review: **FREE (₹0)**
  - Total Payable: **₹799** (Pay After Sample Collection via UPI/Cash).

### 4. 84+ Tests Breakdown Accordion (`components/PackageDetailsAccordion.tsx`)
- Detailed accordion displaying every biomarker tested across 8 medical profiles:
  - 🩸 **Complete Hemogram (CBC)** — 24 Tests (Hb, TLC, DLC, Platelet, PCV, MCV, ESR, etc.)
  - 🩺 **Diabetes Screen (Free HbA1c)** — 3 Tests (HbA1c 3-Month Sugar, eAG, Glucose)
  - ❤️ **Lipid Profile (Cardiac Screen)** — 8 Tests (Cholesterol, HDL, LDL, Triglycerides, VLDL, Ratios)
  - 🫁 **Liver Function Profile (LFT)** — 11 Tests (Bilirubin, SGOT, SGPT, ALP, Protein, Albumin, Globulin, GGT)
  - 🧬 **Kidney Function Profile (KFT)** — 6 Tests (Creatinine, BUN, Urea, Uric Acid, Ratios)
  - 🦋 **Thyroid Function Profile** — 3 Tests (T3, T4, TSH Ultrasensitive)
  - 🦴 **Bone & Electrolyte Health Profile** — 4 Tests (Calcium, Phosphorus, Sodium, Potassium)
  - 🧫 **Complete Urine Examination (CUE)** — 25 Tests (Microscopic, Protein, Sugar, Ketones, Casts, etc.)
- **Search & Filter**: Real-time parameter search bar to quickly check if a specific test is included.
- **Quick Controls**: "Expand All", "Collapse All", and "Book @ ₹799" CTA.

### 5. Other Diagnostic Packages Grid (`components/PopularPackages.tsx`)
- Targeted packages for specific health requirements:
  - **Diabetes Health Package** (16 Tests @ ₹499)
  - **Complete Thyroid Care** (3 Tests @ ₹399)
  - **Healthy Heart & Lipid Screening** (28 Tests @ ₹899)
  - **Women’s Wellness & Hormonal Screen** (68 Tests @ ₹999)
  - **Senior Citizen Vital Care Package** (92 Tests @ ₹1,299)
- Clicking *"Book Home Pickup"* automatically updates the booking form and smoothly scrolls to it.

### 6. Seamless 4-Step Journey (`components/HowItWorks.tsx`)
- **01. Book Online in 30s**: Fill details, zero advance payment.
- **02. Painless Doorstep Collection**: Certified DMLT phlebotomist arrives with sterile vacuum tubes and cold-chain sample box (2°C - 8°C).
- **03. NABL Robotic Testing**: Dual-run automated analyzers (Roche & Beckman Coulter) for 100% precision.
- **04. Report & Doctor Consultation**: Smart visual report on WhatsApp in 12 hours + free tele-doctor review.

### 7. Social Proof & Verified Testimonials (`components/Testimonials.tsx`)
- Real patient feedback with 5-star ratings from Delhi NCR, Gurgaon, Noida, and Jaipur.
- Highlighting punctual phlebotomist arrival, painless blood collection, and rapid digital report delivery.

### 8. Diagnostic & Fasting FAQs (`components/FaqSection.tsx`)
- Clean accordion answering common questions:
  - Fasting requirement (10-12 hours overnight fasting)
  - Report turnaround time (12-15 hours on WhatsApp & Email)
  - Doorstep payment modes (UPI / Cash / Card)
  - Safety & hygienic standards of phlebotomists
  - Complimentary doctor consultation details

### 9. Lead Processing API Endpoint (`app/api/leads/route.ts`)
- `POST /api/leads`: Captures visitor booking requests, validates contact parameters, and generates a tracking Reference ID (`#MD-XXXXXXXX`).
- Returns structured JSON response ready to interface with backend bookings or CRM queues.

### 10. Instant Booking Confirmation Modal (`components/BookingSuccessModal.tsx`)
- Celebratory modal displayed immediately upon booking.
- Shows unique Reference ID, scheduled date & time slot, payable amount, and direct WhatsApp tracking link.

### 11. Sticky Mobile CTA Bar & Floating WhatsApp (`components/FloatingContact.tsx`)
- Floating WhatsApp support trigger for instant patient queries.
- Mobile bottom navigation bar with package price & instant "Book Now" trigger.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Maddie design tokens (`#00D40E` Emerald Green)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: Next.js Server Route Handlers (`/api/leads`)

---

## 📁 Project Structure

```
maddie-user-web/
├── app/
│   ├── api/
│   │   └── leads/
│   │       └── route.ts          # Lead booking API endpoint (generates #MD-...)
│   ├── globals.css               # Design tokens & Emerald Green palette
│   ├── layout.tsx                # SEO meta tags, OpenGraph, Inter typography
│   └── page.tsx                  # Main assembled landing page
├── components/
│   ├── UrgencyBar.tsx            # Live countdown timer & bonus test urgency
│   ├── Navbar.tsx                # Brand header with NABL trust badges & helpline
│   ├── HeroSection.tsx           # Split 2-column layout (Headline, USPs, Form)
│   ├── BookingForm.tsx           # Lead capture form with live price calculation
│   ├── BookingSuccessModal.tsx   # Celebratory confirmation modal with Ref ID
│   ├── KeyHighlights.tsx         # 4 Trust cards (Dual-run verification, cold-chain)
│   ├── PackageDetailsAccordion.tsx # 84+ Parameter breakdown across 8 organ profiles
│   ├── PopularPackages.tsx       # Grid of other packages (Diabetes, Thyroid, Heart, etc.)
│   ├── HowItWorks.tsx            # 4-Step home sample collection flow
│   ├── Testimonials.tsx          # 4.9/5 Star verified patient reviews
│   ├── FaqSection.tsx            # Diagnostic & fasting accordion FAQs
│   ├── Footer.tsx                # Accreditations, helpline, legal disclaimers
│   └── FloatingContact.tsx       # Floating WhatsApp button & mobile sticky bottom CTA
├── lib/
│   └── data.ts                   # Packages catalog, 84-test breakdown, FAQs, testimonials
├── .env.local                    # API configuration
├── next.config.ts                # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create or verify `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://maddie-sv65.onrender.com/api/v1
```

### 3. Run Development Server
```bash
npm run dev
# or specify port:
npm run dev -- -p 3002
```
Open [http://localhost:3002](http://localhost:3002) in your browser.

### 4. Build for Production
```bash
npm run build
npm start -- -p 3002
```

---

## 📡 API Reference

### Create Booking Lead
- **URL**: `/api/leads`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body:
```json
{
  "name": "Amit Sharma",
  "phone": "9876543210",
  "packageId": "smart-full-body",
  "packageName": "Smart Full Body Health Checkup",
  "price": 799,
  "city": "Delhi NCR",
  "pincode": "110001",
  "appointmentDate": "2026-10-21",
  "timeSlot": "07:00-08:00",
  "address": "Flat 402, Green Park",
  "notes": "Please call before arriving"
}
```

#### Successful Response (`201 Created`):
```json
{
  "success": true,
  "message": "Home collection appointment booked successfully!",
  "data": {
    "bookingRef": "MD-93974558",
    "patientName": "Amit Sharma",
    "patientPhone": "9876543210",
    "city": "Delhi NCR",
    "pincode": "110001",
    "packageId": "smart-full-body",
    "packageName": "Smart Full Body Health Checkup",
    "totalAmount": 799,
    "appointmentDate": "2026-10-21",
    "timeSlot": "07:00-08:00",
    "address": "Flat 402, Green Park",
    "notes": "Please call before arriving",
    "status": "pending_confirmation",
    "createdAt": "2026-10-20T09:52:09.397Z"
  }
}
```

export interface HealthPackage {
  id: string;
  _id?: string;
  name: string;
  badge?: string;
  testsCount: number;
  originalPrice: number;
  discountedPrice: number;
  price?: number;
  popular?: boolean;
  category: string;
  description: string;
  fastingRequired: boolean;
  reportTime: string;
  highlights: string[];
  details?: PackageCategoryDetail[];
}

export interface PackageCategoryDetail {
  title: string;
  testsCount?: number;
  icon?: string;
  items: string[];
}

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Malhotra',
    location: 'South Delhi',
    rating: 5,
    date: '2 days ago',
    text:
      'Booked the Smart Full Body checkup for my parents. The phlebotomist reached sharp at 7:00 AM with a sealed kit and cold gel pack. Reports were received by 6:00 PM on WhatsApp. Excellent and professional service!',
    verified: true,
  },
  {
    id: 2,
    name: 'Pooja Kashyap',
    location: 'Gurgaon, Sector 54',
    rating: 5,
    date: '1 week ago',
    text:
      'The sample collection was completely painless. The free doctor consultation after the report was so helpful in explaining my vitamin and thyroid levels. Highly recommend Medie Health!',
    verified: true,
  },
  {
    id: 3,
    name: 'Dr. Vikram Saxena',
    location: 'Noida, Sector 62',
    rating: 5,
    date: '3 days ago',
    text:
      'As a physician, I was impressed by the NABL calibration and standard barcode scanning right at doorstep. 100% accurate results at almost one-third the hospital prices.',
    verified: true,
  },
  {
    id: 4,
    name: 'Sunita & Arvind Verma',
    location: 'Jaipur, Malviya Nagar',
    rating: 5,
    date: '5 days ago',
    text:
      'Getting HbA1c and full lipid profile done at home for just ₹799 without travelling to a crowded diagnostic center is a blessing for seniors. Thank you Medie!',
    verified: true,
  },
];

export const FAQS = [
  {
    q: 'Is fasting required for the Smart Full Body Health Checkup?',
    a:
      'Yes, 10 to 12 hours of overnight fasting is recommended for accurate blood glucose and lipid profile (cholesterol) results. You can drink plain water during the fasting period.',
  },
  {
    q: 'How soon will I receive my digital test reports?',
    a:
      'Smart Digital Reports are delivered within 12 to 15 hours directly on your WhatsApp and registered Email address. You can also view them anytime on the Medie mobile app.',
  },
  {
    q: 'How do I make the payment for the test?',
    a:
      'No advance payment is needed when booking online! You can pay comfortably at your doorstep after sample collection via UPI (GPay, PhonePe, Paytm), Credit/Debit Card, or Cash.',
  },
  {
    q: 'Are the phlebotomists certified and hygienic?',
    a:
      'Yes, 100% of our phlebotomists are DMLT certified, background verified, and fully vaccinated. They use fresh, single-use vacuum BD Vacutainer tubes opened right in front of you, along with temperature-controlled ice gel transport boxes.',
  },
  {
    q: 'Is doctor consultation included with the test?',
    a:
      'Yes! Every Smart Full Body Checkup includes a complimentary tele-consultation with a qualified doctor to explain your test report findings and provide actionable dietary & health advice.',
  },
];

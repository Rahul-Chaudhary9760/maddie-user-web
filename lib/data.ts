export interface HealthPackage {
  id: string;
  name: string;
  badge?: string;
  testsCount: number;
  originalPrice: number;
  discountedPrice: number;
  popular?: boolean;
  category: string;
  description: string;
  fastingRequired: boolean;
  reportTime: string;
  highlights: string[];
}

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'full-body-smart',
    name: 'Smart Full Body Health Checkup',
    badge: 'MOST POPULAR • 60% OFF',
    testsCount: 84,
    originalPrice: 1999,
    discountedPrice: 799,
    popular: true,
    category: 'Full Body',
    description:
      'Comprehensive preventive health checkup covering 84 vital parameters including Free HbA1c, Liver, Kidney, Thyroid, Heart, and Complete Blood Count.',
    fastingRequired: true,
    reportTime: '12-15 Hours',
    highlights: [
      'Free HbA1c & Fasting Glucose',
      'Liver & Kidney Function Profiles',
      'Complete Lipid Profile (Heart Risk)',
      'Thyroid Profile (T3, T4, TSH)',
      'Free Home Sample Collection',
      'Free Doctor Report Consultation',
    ],
  },
  {
    id: 'diabetes-comprehensive',
    name: 'Diabetes Care & HbA1c Profile',
    badge: 'SPECIAL CARE',
    testsCount: 15,
    originalPrice: 999,
    discountedPrice: 499,
    popular: false,
    category: 'Diabetes',
    description:
      'Evaluates 3-month average sugar control, fasting blood glucose, and early kidney damage markers.',
    fastingRequired: true,
    reportTime: '10-12 Hours',
    highlights: [
      'HbA1c (Glycosylated Hemoglobin)',
      'Fasting Blood Glucose',
      'Serum Creatinine & Urine Microalbumin',
      'Free Report Analysis by Doctor',
    ],
  },
  {
    id: 'thyroid-profile',
    name: 'Complete Thyroid Profile (T3, T4, TSH)',
    badge: 'BESTSELLER',
    testsCount: 3,
    originalPrice: 599,
    discountedPrice: 399,
    popular: false,
    category: 'Thyroid',
    description:
      'Precise hormonal assessment for hypo/hyper-thyroidism, fatigue, unexplained weight changes, and hair loss.',
    fastingRequired: false,
    reportTime: 'Same Day',
    highlights: [
      'Total Triiodothyronine (T3)',
      'Total Thyroxine (T4)',
      'Ultrasensitive TSH',
      'NABL Accredited Double Verification',
    ],
  },
  {
    id: 'cardiac-heart-screen',
    name: 'Healthy Heart & Lipid Screening',
    badge: 'CARDIO RISK',
    testsCount: 28,
    originalPrice: 1499,
    discountedPrice: 899,
    popular: false,
    category: 'Heart',
    description:
      'Full lipid fraction analysis, cholesterol ratios, and cardiac risk markers for preventive cardiology.',
    fastingRequired: true,
    reportTime: '12 Hours',
    highlights: [
      'Total Cholesterol & Triglycerides',
      'HDL (Good) & LDL (Bad) Cholesterol',
      'VLDL & Non-HDL Cholesterol Ratio',
      'High Sensitivity CRP (hs-CRP)',
    ],
  },
  {
    id: 'womens-wellness',
    name: 'Women’s Wellness & Hormonal Screen',
    badge: 'WOMEN CARE',
    testsCount: 68,
    originalPrice: 2499,
    discountedPrice: 999,
    popular: false,
    category: 'Women Health',
    description:
      'Specialized full body checkup designed for women, screening anemia, thyroid, calcium, vitamin D, and metabolic health.',
    fastingRequired: true,
    reportTime: '15 Hours',
    highlights: [
      'Serum Iron & Ferritin (Anemia)',
      'Calcium & Vitamin D3 Deficiency',
      'Complete Thyroid & Hormonal Screen',
      'CBC + LFT + KFT + Urine Analysis',
    ],
  },
  {
    id: 'senior-citizen',
    name: 'Senior Citizen Vital Care Package',
    badge: 'SENIOR CARE (60+)',
    testsCount: 92,
    originalPrice: 2999,
    discountedPrice: 1299,
    popular: false,
    category: 'Senior Health',
    description:
      'Advanced geriatric screening package covering joints, bone density markers, diabetes, heart, kidney, and liver.',
    fastingRequired: true,
    reportTime: '15-18 Hours',
    highlights: [
      'Rheumatoid Factor & Uric Acid',
      'Bone Health: Calcium & Alkaline Phosphatase',
      'Full Cardiac & Renal Risk Assessment',
      'Priority Home Pickup & Dedicated Support',
    ],
  },
];

export interface PackageCategoryDetail {
  title: string;
  testsCount: number;
  icon: string;
  items: string[];
}

export const SMART_FULL_BODY_DETAILS: PackageCategoryDetail[] = [
  {
    title: 'Complete Hemogram (CBC Profile)',
    testsCount: 24,
    icon: '🩸',
    items: [
      'Hemoglobin (Hb)',
      'Total Leucocyte Count (TLC / WBC)',
      'Differential Leucocyte Count (DLC)',
      'Neutrophils & Lymphocytes',
      'Monocytes, Eosinophils & Basophils',
      'Absolute Neutrophil / Lymphocyte Count',
      'Platelet Count',
      'Total RBC Count',
      'Packed Cell Volume (PCV / Hematocrit)',
      'Mean Corpuscular Volume (MCV)',
      'Mean Corpuscular Hemoglobin (MCH)',
      'Mean Corpuscular Hb Concentration (MCHC)',
      'Red Cell Distribution Width (RDW-CV & RDW-SD)',
      'Erythrocyte Sedimentation Rate (ESR)',
    ],
  },
  {
    title: 'Diabetes Screen (Free HbA1c Included)',
    testsCount: 3,
    icon: '🩺',
    items: [
      'HbA1c (Glycosylated Hemoglobin - 3 Month Average Sugar)',
      'Estimated Average Glucose (eAG)',
      'Blood Glucose (Fasting / Random)',
    ],
  },
  {
    title: 'Lipid Profile (Cardiac Risk Screen)',
    testsCount: 8,
    icon: '❤️',
    items: [
      'Total Cholesterol',
      'HDL Cholesterol (Good Cholesterol)',
      'LDL Cholesterol (Bad Cholesterol)',
      'Triglycerides',
      'VLDL Cholesterol',
      'Cholesterol / HDL Ratio',
      'LDL / HDL Ratio',
      'Non-HDL Cholesterol',
    ],
  },
  {
    title: 'Liver Function Profile (LFT)',
    testsCount: 11,
    icon: '🫁',
    items: [
      'Bilirubin Total',
      'Bilirubin Direct (Conjugated)',
      'Bilirubin Indirect (Unconjugated)',
      'SGOT / AST (Aspartate Aminotransferase)',
      'SGPT / ALT (Alanine Aminotransferase)',
      'Serum Alkaline Phosphatase (ALP)',
      'Total Serum Protein',
      'Serum Albumin',
      'Serum Globulin',
      'Albumin / Globulin (A/G) Ratio',
      'Gamma GT (GGT)',
    ],
  },
  {
    title: 'Kidney Function Profile (KFT / RFT)',
    testsCount: 6,
    icon: '🧬',
    items: [
      'Serum Creatinine',
      'Blood Urea Nitrogen (BUN)',
      'Serum Urea',
      'Serum Uric Acid',
      'BUN / Serum Creatinine Ratio',
      'Urea / Creatinine Ratio',
    ],
  },
  {
    title: 'Thyroid Function Profile',
    testsCount: 3,
    icon: '🦋',
    items: [
      'Total Triiodothyronine (T3)',
      'Total Thyroxine (T4)',
      'Thyroid Stimulating Hormone (TSH - Ultrasensitive)',
    ],
  },
  {
    title: 'Bone & Electrolyte Health Profile',
    testsCount: 4,
    icon: '🦴',
    items: [
      'Serum Calcium',
      'Serum Phosphorus',
      'Serum Sodium',
      'Serum Potassium',
    ],
  },
  {
    title: 'Complete Urine Examination (CUE / Routine)',
    testsCount: 25,
    icon: '🧫',
    items: [
      'Color & Appearance',
      'Specific Gravity & pH',
      'Urine Protein / Albumin',
      'Urine Glucose / Sugar',
      'Ketone Bodies',
      'Bile Salts & Bile Pigments',
      'Urobilinogen',
      'Pus Cells / Leucocytes',
      'Epithelial Cells',
      'Red Blood Cells (RBCs)',
      'Crystals & Casts',
      'Bacteria & Microscopic Examination',
    ],
  },
];

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

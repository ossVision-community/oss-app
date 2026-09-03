import { Department } from "./types";

export const DEPARTMENTS: Department[] = [
  {
    id: "planning-execution",
    name: "التخطيط والتنفيذ",
    description: "تنظيم العمليات وتنفيذ المبادرات",
    icon: "inventory_2",
  },
  {
    id: "tech-innovation",
    name: "الابتكار التقني",
    description: "بناء حلول تقنية عبر مشاريع مفتوحة المصدر",
    icon: "code",
  },
  {
    id: "media-design",
    name: "الإعلام والتصميم",
    description: "التواصل وصناعة المحتوى البصري",
    icon: "campaign",
  },
  {
    id: "public-relations",
    name: "العلاقات العامة",
    description: "بناء الشراكات الخارجية",
    icon: "handshake",
  },
  {
    id: "human-resource",
    name: "الموارد البشرية",
    description: "إدارة شؤون الأعضاء",
    icon: "groups",
  },
  {
    id: "member-development",
    name: "تطوير الأعضاء",
    description: "التدريب والتمكين المعرفي",
    icon: "trending_up",
  },
];

export const PROGRAMMING_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Dart",
  "HTML/CSS",
  "SQL",
  "Other",
];

export const UNIVERSITIES = [
  "جامعة الملك سعود",
  "جامعة الملك عبدالعزيز",
  "جامعة الملك فهد للبترول والمعادن",
  "جامعة الإمام محمد بن سعود الإسلامية",
  "جامعة الأميرة نورة بنت عبدالرحمن",
  "جامعة الملك خالد",
  "جامعة أم القرى",
  "جامعة الطائف",
  "جامعة القصيم",
  "جامعة حائل",
  "جامعة تبوك",
  "جامعة الجوف",
  "جامعة نجران",
  "جامعة جازان",
  "جامعة الباحة",
  "جامعة الحدود الشمالية",
  "جامعة شقراء",
  "جامعة المجمعة",
  "جامعة الأمير سطام بن عبدالعزيز",
  "جامعة دار العلوم",
  "جامعة اليمامة",
  "جامعة الأمير سلطان",
  "جامعة عفت",
  "أخرى",
];

/**
 * Link behind the "اكتشف رؤيتنا" button. Set NEXT_PUBLIC_VISION_PDF_URL in
 * .env to point it at a new file; the value below is used when it is unset,
 * so the button keeps working either way.
 */
export const VISION_PDF_URL =
  process.env.NEXT_PUBLIC_VISION_PDF_URL?.trim() ||
  "https://firebasestorage.googleapis.com/v0/b/oss-project-2bab0.firebasestorage.app/o/ref-OSS-Vision.pdf?alt=media&token=d9d2a40b-486b-45e3-bfcb-2f68bcc142ad";

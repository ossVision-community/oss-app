import { z } from "zod";

const optionalHttpUrl = z
  .string()
  .trim()
  .transform((value) => {
    if (value === "") return "";
    const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value);
    return hasScheme ? value : `https://${value}`;
  })
  .refine((value) => {
    if (value === "") return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, "الرابط غير صحيح")
  .refine((value) => {
    if (value === "") return true;
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "الرابط يجب أن يبدأ بـ http:// أو https://");

const optionalFirebaseStorageUrl = optionalHttpUrl.refine((value) => {
  if (value === "") return true;
  const hostname = new URL(value).hostname;
  return hostname === "firebasestorage.googleapis.com" || hostname === "storage.googleapis.com";
}, "رابط السيرة الذاتية غير صحيح");

export const joinFormSchema = z.object({
  // Personal Info
  fullNameAr: z
    .string()
    .trim()
    .min(3, "الاسم الثلاثي (عربي) يجب أن يكون 3 أحرف على الأقل")
    .max(120, "الاسم طويل جداً"),
  fullNameEn: z
    .string()
    .trim()
    .min(3, "الاسم الثلاثي (إنجليزي) يجب أن يكون 3 أحرف على الأقل")
    .max(120, "الاسم طويل جداً"),
  nationalId: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "رقم الهوية يجب أن يتكون من 10 أرقام"),
  dateOfBirth: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "تاريخ الميلاد غير صحيح"),
  universityId: z
    .string()
    .trim()
    .min(3, "الرجاء إدخال الرقم الجامعي")
    .max(30, "الرقم الجامعي طويل جداً"),
  personalEmail: z.string().trim().email("البريد الإلكتروني غير صحيح"),
  phoneNumber: z
    .string()
    .regex(/^(05|5)\d{8}$/, "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"),
  university: z.string().min(1, "الرجاء اختيار الجامعة"),
  college: z.string().trim().min(2, "الرجاء إدخال الكلية").max(120, "اسم الكلية طويل جداً"),
  specialization: z
    .string()
    .trim()
    .min(2, "الرجاء إدخال التخصص")
    .max(120, "اسم التخصص طويل جداً"),
  academicLevel: z
    .string()
    .trim()
    .min(1, "الرجاء اختيار المستوى الدراسي"),
  graduationYear: z
    .number()
    .int("سنة التخرج غير صحيحة")
    .min(1900, "سنة التخرج غير صحيحة")
    .max(2100, "سنة التخرج غير صحيحة"),

  // Technical Info
  githubProfile: optionalHttpUrl.optional(),
  linkedinProfile: optionalHttpUrl.optional(),
  portfolioUrl: optionalHttpUrl.optional(),

  // Interest & Motivation
  interestedDepartment: z
    .string()
    .min(1, "الرجاء اختيار قسم واحد"),
  joiningGoal: z
    .string()
    .trim()
    .min(20, "الرجاء كتابة 20 حرف على الأقل")
    .max(600, "النص طويل جداً"),
  skillsAndExperience: z
    .string()
    .trim()
    .min(20, "الرجاء كتابة 20 حرف على الأقل")
    .max(1200, "النص طويل جداً"),

  // Resume URL (will be set after file upload)
  resumeUrl: optionalFirebaseStorageUrl.optional(),
});

export type JoinFormData = z.infer<typeof joinFormSchema>;

export const partnerFormSchema = z.object({
  organizationName: z
    .string()
    .min(2, "الرجاء إدخال اسم الجهة")
    .max(120, "اسم الجهة طويل جداً"),
  contactName: z
    .string()
    .min(3, "الرجاء إدخال الاسم")
    .max(100, "الاسم طويل جداً"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phoneNumber: z
    .string()
    .regex(/^(05|5)\d{8}$/, "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"),
  website: optionalHttpUrl.optional(),
  partnershipType: z
    .string()
    .min(1, "الرجاء اختيار نوع الشراكة"),
  message: z
    .string()
    .min(30, "اكتب تفاصيل أكثر (30 حرف على الأقل)")
    .max(2000, "النص طويل جداً"),
});

export type PartnerFormData = z.infer<typeof partnerFormSchema>;

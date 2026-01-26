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
  fullName: z
    .string()
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .max(100, "الاسم طويل جداً"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phoneNumber: z
    .string()
    .regex(/^(05|5)\d{8}$/, "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"),
  university: z.string().min(1, "الرجاء اختيار الجامعة"),
  major: z.string().min(2, "الرجاء إدخال التخصص"),
  graduationYear: z
    .number()
    .min(1, "الرجاء اختيار المستوى الدراسي")
    .max(10, "الرجاء اختيار المستوى الدراسي"),

  // Technical Info
  githubProfile: optionalHttpUrl.optional(),
  linkedinProfile: optionalHttpUrl.optional(),
  portfolioUrl: optionalHttpUrl.optional(),

  // Interest & Motivation
  interestedDepartment: z
    .string()
    .min(1, "الرجاء اختيار قسم واحد"),
  motivation: z
    .string()
    .min(50, "الرجاء كتابة 50 حرف على الأقل")
    .max(1000, "النص طويل جداً"),
  previousExperience: z.string().optional(),

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

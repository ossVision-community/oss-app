import { z } from "zod";

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
  githubProfile: z
    .string()
    .url("الرابط غير صحيح")
    .optional()
    .or(z.literal("")),
  linkedinProfile: z
    .string()
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .url("الرابط غير صحيح")
    .optional()
    .or(z.literal("")),

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
  resumeUrl: z.string().optional(),
});

export type JoinFormData = z.infer<typeof joinFormSchema>;

"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { fetchRemoteConfig } from "@/lib/remoteConfigClient";
import { joinFormSchema, JoinFormData } from "@/lib/validations";

interface JoinFormProps {
  onSuccess: (applicationId: string) => void;
}

const SPECIALIZATIONS = [
  { value: "cs", label: "علوم حاسب" },
  { value: "is", label: "نظم معلومات" },
  { value: "ce", label: "هندسة حاسب" },
  { value: "swe", label: "هندسة برمجيات" },
  { value: "cyb", label: "أمن سيبراني" },
  { value: "other", label: "تخصص آخر" },
];

const LEVELS = [
  { value: "1", label: "1 - 2" },
  { value: "2", label: "3 - 4" },
  { value: "3", label: "5 - 6" },
  { value: "4", label: "7 - 8" },
  { value: "5", label: "9 - 10" },
  { value: "6", label: "خريج" },
];

const DEPARTMENTS = [
  { id: "technical", name: "الابتكار التقني", icon: "code" },
  { id: "design", name: "التصميم والاعلام", icon: "palette" },
  { id: "media", name: "التخطيط والتنفيذ", icon: "campaign" },
  { id: "events", name: "الموارد البشرية", icon: "event" },
  { id: "relations", name: "مبادرة تقدم الأعضاء", icon: "groups" },
];

export default function JoinForm({ onSuccess }: JoinFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [applicationEnabled, setApplicationEnabled] = useState<boolean | null>(null);
  const [pressedDisabledSubmit, setPressedDisabledSubmit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      interestedDepartment: "",
      graduationYear: 0,
    },
  });

  const selectedDepartment = watch("interestedDepartment") || "";

  useEffect(() => {
    let cancelled = false;
    fetchRemoteConfig(["applicationButton"])
      .then((configs) => {
        if (cancelled) return;
        setApplicationEnabled(Boolean(configs.applicationButton));
      })
      .catch(() => {
        if (cancelled) return;
        setApplicationEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onDisabledSubmitClick = (e: MouseEvent) => {
    e.preventDefault();
    setPressedDisabledSubmit(true);
    window.setTimeout(() => setPressedDisabledSubmit(false), 1800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("حجم الملف يجب أن يكون أقل من 2 ميجابايت");
        return;
      }
      const allowedTypes = [
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("نوع الملف غير مدعوم. الرجاء رفع ملف PDF فقط");
        return;
      }
      setResumeFile(file);
      setError(null);
    }
  };

  const uploadResume = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${timestamp}-${Math.random().toString(16).slice(2)}`;
    const fileName = `resumes/${id}.pdf`;
    const storageRef = ref(storage, fileName);

    setUploadProgress(10);
    await uploadBytes(storageRef, file, { contentType: "application/pdf" });
    setUploadProgress(80);

    const downloadUrl = await getDownloadURL(storageRef);
    setUploadProgress(100);

    return downloadUrl;
  };

  const onSubmit = async (data: JoinFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let resumeUrl = "";

      if (resumeFile) {
        resumeUrl = await uploadResume(resumeFile);
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          resumeUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "حدث خطأ في تقديم الطلب");
      }

      onSuccess(result.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const onFormError = () => {
    // Errors are displayed inline, no console logging needed
  };

  const submitButtonClass =
    "w-full h-14 bg-[#68539d] hover:bg-[#68539d]/90 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-[#68539d]/20 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-[#68539d]/5 p-8 border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base"
              placeholder="أدخل اسمك الثلاثي"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* University Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              الايميل  <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              dir="ltr"
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base text-right placeholder:text-right"
              placeholder="Your Email" // suugest placeholder for email
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              رقم الجوال <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("phoneNumber")}
              dir="ltr"
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base text-right"
              placeholder="05XXXXXXXX"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* University */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              الجامعة <span className="text-red-500">*</span>
            </label>
            <select
              {...register("university")}
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base appearance-none cursor-pointer"
            >
              <option value="">اختر الجامعة</option>
              <option value="جامعة الامام محمد بن سعود">جامعة الامام محمد بن سعود</option>
              <option value="اخرى">اخرى</option>
            </select>
            {errors.university && (
              <p className="text-red-500 text-sm">{errors.university.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specialization */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              التخصص <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("major")}
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base"
              placeholder="مثال: علوم حاسب"
            />
            {errors.major && (
              <p className="text-red-500 text-sm">{errors.major.message}</p>
            )}
          </div>

          {/* Level */}
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              المستوى الدراسي <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("graduationYear", { valueAsNumber: true })}
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base"
              placeholder="مثال: 5"
              min={1}
              max={10}
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-sm">{errors.graduationYear.message}</p>
            )}
          </div>
        </div>

        {/* Department Selection */}
        <div className="flex flex-col gap-4">
          <label className="text-[#0e0b77] font-bold text-base mr-1">
           اختر المسار الذي تقدر تضيف فيه وتطوّر نفسك<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DEPARTMENTS.map((dept) => (
              <label
                key={dept.id}
                className={`relative flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer hover:bg-[#68539d]/5 transition-all group ${
                  selectedDepartment === dept.id
                    ? "border-[#68539d] bg-[#68539d]/5"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  value={dept.id}
                  {...register("interestedDepartment")}
                />
                <span
                  className={`material-symbols-outlined group-hover:scale-110 transition-transform mb-1 ${
                    selectedDepartment === dept.id
                      ? "text-[#68539d]"
                      : "text-gray-400"
                  }`}
                >
                  {dept.icon}
                </span>
                <span
                  className={`text-sm font-medium ${
                    selectedDepartment === dept.id
                      ? "text-[#68539d]"
                      : "text-gray-600"
                  }`}
                >
                  {dept.name}
                </span>
              </label>
            ))}
          </div>
          {errors.interestedDepartment && (
            <p className="text-red-500 text-sm">{errors.interestedDepartment.message}</p>
          )}
        </div>

        {/* LinkedIn Link */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0e0b77] font-semibold text-sm mr-1 flex items-center gap-2">
            <svg className="h-4 w-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            رابط LinkedIn (اختياري)
          </label>
          <input
            type="url"
            {...register("linkedinProfile")}
            dir="ltr"
            className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base text-left"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        {/* CV Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0e0b77] font-semibold text-sm mr-1">
            السيرة الذاتية (اختياري)
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              resumeFile
                ? "border-[#68539d] bg-[#68539d]/5"
                : "border-gray-300 hover:border-[#68539d]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="material-symbols-outlined text-3xl text-gray-400 mb-2 block">
              cloud_upload
            </span>
            {resumeFile ? (
              <div>
                <p className="text-[#68539d] font-medium">{resumeFile.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 font-medium">
                  اضغط لرفع السيرة الذاتية
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PDF فقط (الحد الأقصى 2 ميجابايت)
                </p>
              </div>
            )}
          </div>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#68539d] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1 text-center">
                جاري رفع الملف... {uploadProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0e0b77] font-semibold text-sm mr-1">
            قولنا عن نفسك <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("motivation")}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none p-4 text-base resize-none"
            placeholder="اهتماماتك، خبراتك، أو ليش حاب تنضم لنا؟"
            rows={4}
          />
          {errors.motivation && (
            <p className="text-red-500 text-sm">{errors.motivation.message}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 space-y-4">
          {applicationEnabled === false && !isSubmitting ? (
            <div className="relative">
              <button
                type="button"
                onClick={onDisabledSubmitClick}
                aria-disabled="true"
                className={`${submitButtonClass} opacity-60 cursor-pointer ${
                  pressedDisabledSubmit ? "animate-[wiggle_350ms_ease-in-out_0ms_2]" : ""
                }`}
              >
                <span>أرسل طلبك</span>
                <span className="material-symbols-outlined group-hover:translate-x-[-4px] transition-transform">
                  send
                </span>
              </button>
              {pressedDisabledSubmit && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap rounded-2xl bg-white/95 border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-xl"
                  role="status"
                >
                  قريباً... باب الانضمام بيفتح
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 bg-white/95 border-b border-r border-slate-200 rotate-45" />
                </div>
              )}
              <style jsx>{`
                @keyframes wiggle {
                  0%,
                  100% {
                    transform: translateX(0);
                  }
                  25% {
                    transform: translateX(-3px);
                  }
                  50% {
                    transform: translateX(3px);
                  }
                  75% {
                    transform: translateX(-2px);
                  }
                }
              `}</style>
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || applicationEnabled === null}
              className={submitButtonClass}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  جاري تقديم الطلب...
                </>
              ) : applicationEnabled === null ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  جاري التحقق...
                </>
              ) : (
                <>
                  <span>أرسل طلبك</span>
                  <span className="material-symbols-outlined group-hover:translate-x-[-4px] transition-transform">
                    send
                  </span>
                </>
              )}
            </button>
          )}
         
        </div>
      </form>
    </div>
  );
}

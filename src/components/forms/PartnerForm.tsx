"use client";

import { type MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchRemoteConfig } from "@/lib/remoteConfigClient";
import { partnerFormSchema, PartnerFormData } from "@/lib/validations";

interface PartnerFormProps {
  onSuccess: (inquiryId: string) => void;
}

const PARTNERSHIP_TYPES = [
  { value: "sponsorship", label: "رعاية" },
  { value: "mentorship", label: "إرشاد وتوجيه" },
  { value: "workshops", label: "ورش ودورات" },
  { value: "projects", label: "مشاريع مشتركة" },
  { value: "other", label: "أخرى" },
];

export default function PartnerForm({ onSuccess }: PartnerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partnersEnabled, setPartnersEnabled] = useState<boolean | null>(null);
  const [pressedDisabledSubmit, setPressedDisabledSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      partnershipType: "",
    },
  });

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "حدث خطأ في إرسال الطلب");
      }

      onSuccess(result.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFormError = () => {
    // Errors are displayed inline
  };

  useEffect(() => {
    let cancelled = false;
    fetchRemoteConfig(["partnerButton"])
      .then((configs) => {
        if (cancelled) return;
        setPartnersEnabled(Boolean(configs.partnerButton));
      })
      .catch(() => {
        if (cancelled) return;
        setPartnersEnabled(false);
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

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-[#68539d]/5 p-8 border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              اسم الجهة <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("organizationName")}
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base"
              placeholder="مثال: شركة / كلية / جهة"
            />
            {errors.organizationName && (
              <p className="text-red-500 text-sm">{errors.organizationName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              اسم الشخص المسؤول <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("contactName")}
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base"
              placeholder="اكتب الاسم"
            />
            {errors.contactName && (
              <p className="text-red-500 text-sm">{errors.contactName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              dir="ltr"
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base text-right placeholder:text-right"
              placeholder="name@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">موقع الجهة</label>
            <input
              type="url"
              {...register("website")}
              dir="ltr"
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base text-right placeholder:text-right"
              placeholder="https://example.com"
            />
            {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#0e0b77] font-semibold text-sm mr-1">
              نوع الشراكة <span className="text-red-500">*</span>
            </label>
            <select
              {...register("partnershipType")}
              className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 text-base appearance-none cursor-pointer"
            >
              <option value="">اختر النوع</option>
              {PARTNERSHIP_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.partnershipType && (
              <p className="text-red-500 text-sm">{errors.partnershipType.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#0e0b77] font-semibold text-sm mr-1">
            كيف نقدر نتعاون؟ <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            {...register("message")}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none px-4 py-3 text-base resize-y"
            placeholder="اكتب فكرة الشراكة، الهدف، وأفضل طريقة للتواصل"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        {partnersEnabled === false && !isSubmitting ? (
          <div className="relative">
            <button
              type="button"
              onClick={onDisabledSubmitClick}
              aria-disabled="true"
              className={`relative overflow-hidden group w-full bg-gradient-to-r from-primary to-[#312e81] text-white py-3.5 rounded-xl font-bold transition-all hover:scale-[1.01] shadow-xl shadow-primary/30 opacity-70 cursor-pointer ${
                pressedDisabledSubmit ? "animate-[wiggle_350ms_ease-in-out_0ms_2]" : ""
              }`}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
              <span className="relative inline-flex items-center justify-center gap-2">
                <span className="material-icons-round text-xl">send</span>
                أرسل طلب الشراكة
              </span>
            </button>
            {pressedDisabledSubmit && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap rounded-2xl bg-white/95 border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-xl"
                role="status"
              >
                قريباً... باب الشراكات سيفتح
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
            disabled={isSubmitting || partnersEnabled === null}
            className="relative overflow-hidden group w-full bg-gradient-to-r from-primary to-[#312e81] text-white py-3.5 rounded-xl font-bold transition-all hover:scale-[1.01] shadow-xl shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
            <span className="relative inline-flex items-center justify-center gap-2">
              <span className="material-icons-round text-xl">send</span>
              {isSubmitting ? "جاري الإرسال..." : partnersEnabled === null ? "جاري التحقق..." : "أرسل طلب الشراكة"}
            </span>
          </button>
        )}

        <p className="text-xs text-slate-500 text-center">
          بإرسالك للطلب، أنت توافق على استخدامنا لمعلوماتك بهدف التواصل معك فقط.
        </p>
      </form>
    </div>
  );
}

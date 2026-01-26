"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PartnerForm from "@/components/forms/PartnerForm";

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>("");

  const handleSuccess = (id: string) => {
    setInquiryId(id);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f7f6f7] text-[#0e0b77] antialiased overflow-x-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#68539d]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-cyan-400/10 rounded-full blur-[80px]" />
      </div>

      <nav className="w-full p-4 md:p-6 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#68539d] font-medium hover:underline transition-all group"
        >
          <span className="material-symbols-outlined text-sm group-hover:translate-x-[4px] transition-transform">
            arrow_forward
          </span>
          <span>الرئيسية</span>
        </Link>
        <div className="flex items-center gap-3">
          <Image src="/oss-logo.png" alt="OSS Vision Logo" width={32} height={32} className="w-8 h-8 object-contain" />
        </div>
      </nav>

      <main className="w-full px-6 md:px-12 lg:px-16 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="w-full text-center py-14">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0e0b77] mb-4">
                شراكة جميلة! وصلنا طلبك
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                بنراجع التفاصيل ونتواصل معك قريباً.
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-sm max-w-md mx-auto mb-8 text-right">
                <h3 className="font-bold mb-2">معلومة سريعة:</h3>
                <p className="text-gray-600 text-sm">
                  رقم الطلب: <span className="font-mono">{inquiryId}</span>
                </p>
              </div>
              <Link
                href="/"
                className="bg-[#68539d] text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all inline-block"
              >
                العودة للرئيسية
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10 text-right">
                <div className="inline-flex items-center gap-2 bg-white border border-gray-100 text-[#68539d] px-4 py-2 rounded-full shadow-sm mb-4">
                  <span className="material-icons-round text-lg">handshake</span>
                  <span className="font-semibold">نفتح باب الشراكات</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-[#0e0b77] mb-4">
                  كن شريكاً معنا
                </h1>
                <p className="text-gray-500 text-lg">
                  خلّنا نبني أثر حقيقي معاً — اكتب تفاصيل بسيطة ونتواصل معك.
                </p>
              </div>

              <PartnerForm onSuccess={handleSuccess} />

              <div className="mt-8 flex justify-center gap-6 text-gray-400 text-sm">
                <Link className="hover:text-[#68539d] transition-colors" href="/privacy">
                  سياسة الخصوصية
                </Link>
                <span>•</span>
                <Link className="hover:text-[#68539d] transition-colors" href="/">
                  عن المجتمع
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}


"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import JoinForm from "@/components/forms/JoinForm";

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string>("");

  const handleSuccess = (id: string) => {
    setApplicationId(id);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f7f6f7] text-[#0e0b77] antialiased overflow-x-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#68539d]/20 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-cyan-400/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Top Navigation */}
      <nav className="w-full p-4 md:p-6 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#68539d] font-medium hover:underline transition-all group"
        >
          <span className="material-symbols-outlined text-sm group-hover:translate-x-[4px] transition-transform">arrow_forward</span>
          <span>الرئيسية</span>
        </Link>
        <div className="flex items-center gap-3">
         
          <img
            src="/oss-logo.png"
            alt="OSS Vision Logo"
            className="w-8 h-8 object-contain"
          />
        </div>
      </nav>

      <main className="flex min-h-[calc(100vh-70px)] w-full flex-col lg:flex-row-reverse">
        {/* Right Side: Motivational Panel (40%) - Shows first on mobile */}
        <section className="flex w-full lg:w-[40%] p-6 md:p-12 flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#f8f7fc] to-[#ebe8f4]">
          {/* Decorative Visuals */}
          <div className="absolute inset-0 opacity-20 pointer-events-none hidden lg:block">
            <div className="absolute top-1/4 left-1/4 text-[#68539d]">
              <span className="material-symbols-outlined text-6xl">terminal</span>
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-[#68539d]">
              <span className="material-symbols-outlined text-6xl">database</span>
            </div>
            <div className="absolute top-1/2 right-10 text-[#68539d]">
              <span className="material-symbols-outlined text-8xl opacity-50">account_tree</span>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <div className="bg-white border border-gray-200 p-6 md:p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0e0b77] mb-6 md:mb-8 text-center flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[#68539d]">auto_awesome</span>
                ليش تنضم؟
              </h3>

              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-[#68539d] rounded-full p-1 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <h4 className="text-[#0e0b77] font-semibold text-lg">تطوير المهارات</h4>
                    <p className="text-slate-600 text-sm">شارك في مبادرات ومهام واقعية تطوّر مهاراتك التقنية والعملية.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-cyan-500 rounded-full p-1 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <h4 className="text-[#0e0b77] font-semibold text-lg">بيئة محفزة</h4>
                    <p className="text-slate-600 text-sm">انضم لمجتمع طلابي يدعم التعلّم، التعاون، والنمو المستمر.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-[#68539d] rounded-full p-1 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <h4 className="text-[#0e0b77] font-semibold text-lg">بناء السيرة الذاتية</h4>
                    <p className="text-slate-600 text-sm">مساهماتك معنا تضيف قيمة حقيقية لمسارك الأكاديمي والمهني.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-12 text-center">
                <p className="text-slate-500 italic">&quot; رؤيتنا هي تمكين الطلاب وصناعة أثر حقيقي&quot;</p>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="size-8 bg-[#68539d]/10 rounded-full flex items-center justify-center">
                    <svg aria-hidden="true" className="w-5 h-5 fill-[#68539d]" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                  </div>
                  <div className="size-8 bg-[#68539d]/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#68539d] text-lg">code</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logos at bottom of panel */}
            <div className="mt-6 md:mt-8 flex justify-center items-center gap-4 md:gap-6">
              <Image
                src="/oss-logo.png"
                alt="OSS Vision Logo"
                width={50}
                height={50}
                className="object-contain w-10 h-10 md:w-[60px] md:h-[60px]"
              />
              <Image
                src="/dga-logo.png"
                alt="DGA Logo"
                width={100}
                height={50}
                className="object-contain w-20 md:w-[120px]"
              />
            </div>
          </div>
        </section>

        {/* Left Side: Registration Form (60%) */}
        <section className="flex flex-col flex-1 p-6 md:p-12 lg:p-16 lg:min-h-0">

          {submitted ? (
            /* Success Message */
            <div className="max-w-2xl mx-auto w-full text-center py-16">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0e0b77] mb-4">
                تم تقديم طلبك بنجاح! 🎉
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                شكراً لاهتمامك بالانضمام لمجتمع رؤية المصادر المفتوحة
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-sm max-w-md mx-auto mb-8">
                <h3 className="font-bold mb-3">الخطوات القادمة:</h3>
                <ul className="text-right text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-cyan-500 text-sm mt-1">check</span>
                    سيتم مراجعة طلبك من قبل الفريق
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-cyan-500 text-sm mt-1">check</span>
                    ستصلك رسالة على بريدك الإلكتروني بنتيجة المراجعة
                  </li>
                </ul>
              </div>
              <Link
                href="/"
                className="bg-[#68539d] text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all inline-block"
              >
                العودة للرئيسية
              </Link>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto w-full">
              {/* Header */}
              <div className="mb-10 text-right">
                <h1 className="text-4xl md:text-5xl font-black text-[#0e0b77] mb-4">سجّل معنا</h1>
                <p className="text-gray-500 text-lg">خطوة وحدة وتصير من الفريق </p>
              </div>

              {/* Registration Form */}
              <JoinForm onSuccess={handleSuccess} />

              {/* Footer Links */}
              <div className="mt-8 flex justify-center gap-6 text-gray-400 text-sm">
                <Link className="hover:text-[#68539d] transition-colors" href="/privacy">سياسة الخصوصية</Link>
                <span>•</span>
                <a className="hover:text-[#68539d] transition-colors" href="#">عن المجتمع</a>
                <span>•</span>
                <a className="hover:text-[#68539d] transition-colors" href="#">تواصل معنا</a>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

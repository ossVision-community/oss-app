"use client";

import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between flex-row-reverse">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/oss-logo.png"
              alt="OSS Vision Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-primary font-bold text-lg">OSS Vision</span>
          </Link>
          <Link
            href="/"
            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
            العودة للرئيسية
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl shadow-primary/5 p-8 md:p-12 border border-gray-100">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              سياسة الخصوصية
            </h1>
            <p className="text-gray-500">آخر تحديث: 2026/11/1</p>
          </div>

          {/* Introduction */}
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            نحن في OSS Vision Community نحترم خصوصية المستخدمين ونلتزم بحماية بياناتهم الشخصية. 
            توضّح هذه السياسة كيفية جمع المعلومات واستخدامها وحفظها والتعامل معها عند استخدامك 
            لموقعنا أو التقدّم بطلب الانضمام للمجتمع.
          </p>

          {/* Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">1</span>
                المعلومات التي نقوم بجمعها
              </h2>
              <p className="text-gray-700 mb-3">عند التقدّم بطلب الانضمام، قد نقوم بجمع المعلومات التالية:</p>
              <ul className="space-y-2 text-gray-600 pr-6">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  الاسم الكامل
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  البريد الجامعي
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  التخصص والمستوى الدراسي
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  المسار أو الإدارة التي ترغب بالانضمام لها
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  روابط اختيارية (مثل LinkedIn)
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  السيرة الذاتية (إن وُجدت)
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">check_circle</span>
                  أي معلومات إضافية تقوم بإدخالها طوعًا في نموذج التسجيل
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">2</span>
                كيفية استخدام المعلومات
              </h2>
              <p className="text-gray-700 mb-3">نستخدم المعلومات التي يتم جمعها للأغراض التالية فقط:</p>
              <ul className="space-y-2 text-gray-600 pr-6">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">arrow_back</span>
                  معالجة طلبات الانضمام للمجتمع
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">arrow_back</span>
                  التواصل مع المتقدّمين بخصوص حالة طلبهم
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">arrow_back</span>
                  تنظيم وإدارة شؤون الأعضاء المقبولين
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">arrow_back</span>
                  تحسين تجربة المستخدم وتطوير آليات القبول
                </li>
              </ul>
              <p className="text-gray-600 mt-3 bg-amber-50 p-3 rounded-lg border border-amber-200">
                <span className="material-symbols-outlined text-amber-600 text-sm ml-1">info</span>
                لا يتم استخدام المعلومات لأي أغراض تجارية أو تسويقية خارج نطاق المجتمع.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">3</span>
                حفظ وأمن المعلومات
              </h2>
              <p className="text-gray-700 leading-relaxed">
                نلتزم بحفظ جميع المعلومات في بيئة آمنة، ونتّخذ الإجراءات التنظيمية والتقنية المناسبة 
                لحمايتها من الوصول غير المصرّح به أو سوء الاستخدام.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                يقتصر الوصول إلى البيانات على الأشخاص المخوّلين فقط ضمن إدارة المجتمع، 
                وذلك بما يخدم أغراض المعالجة والتنظيم.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">4</span>
                مدة الاحتفاظ بالبيانات
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-600">how_to_reg</span>
                    في حال القبول
                  </h3>
                  <p className="text-green-700 text-sm">
                    يتم الاحتفاظ ببياناتك طوال فترة عضويتك معنا.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-600">schedule</span>
                    في حال عدم القبول
                  </h3>
                  <p className="text-gray-700 text-sm">
                    يتم الاحتفاظ ببيانات التسجيل لمدة لا تتجاوز 6 أشهر من تاريخ التقديم، ثم يتم حذفها بشكل آمن.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">5</span>
                مشاركة المعلومات مع أطراف أخرى
              </h2>
              <p className="text-gray-700 mb-3">
                لا نقوم ببيع أو تأجير أو مشاركة البيانات الشخصية مع أي أطراف خارجية، باستثناء الحالات التالية:
              </p>
              <ul className="space-y-2 text-gray-600 pr-6">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">gavel</span>
                  إذا كان ذلك مطلوبًا بموجب جهة رسمية أو التزام نظامي
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">verified_user</span>
                  أو بموافقة صريحة من صاحب البيانات
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">6</span>
                حقوق المستخدم
              </h2>
              <p className="text-gray-700 mb-3">يحق لك:</p>
              <ul className="space-y-2 text-gray-600 pr-6">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">visibility</span>
                  طلب الاطلاع على بياناتك الشخصية
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">edit</span>
                  طلب تصحيح أو تحديث معلوماتك
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1">delete</span>
                  طلب حذف بياناتك في حال عدم استمرار العلاقة
                </li>
              </ul>
              <p className="text-gray-600 mt-3">
                يمكنك التواصل معنا عبر القنوات المخصّصة لذلك لتنفيذ أي من هذه الطلبات.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">7</span>
                ملفات تعريف الارتباط (Cookies)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة الاستخدام وتحليل الأداء، 
                دون ربطها بمعلومات تعريف شخصية مباشرة.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">8</span>
                التعديلات على سياسة الخصوصية
              </h2>
              <p className="text-gray-700 leading-relaxed">
                نحتفظ بالحق في تحديث أو تعديل هذه السياسة عند الحاجة. 
                سيتم نشر أي تحديث على هذه الصفحة مع تعديل تاريخ آخر تحديث.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">9</span>
                التواصل معنا
              </h2>
              <p className="text-gray-700 mb-4">
                في حال وجود أي استفسار بخصوص سياسة الخصوصية أو كيفية التعامل مع البيانات، يمكن التواصل معنا عبر:
              </p>
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                <div>
                  <p className="text-sm text-gray-500">البريد الإلكتروني:</p>
                  <a href="mailto:info@ossvision.com" className="text-primary font-semibold hover:underline">
                    info@ossvision.com
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} OSS Vision Community. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}

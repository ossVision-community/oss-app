export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-surface-light py-20 px-4 sm:px-8 lg:px-24 rounded-t-[3rem] -mt-10 relative z-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-1 lg:order-2">
          <span className="text-secondary font-medium mb-2 block">من نحن</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e1b4b] mb-6 leading-snug">
            نسد الفجوة <br />
            بين الدراسة <br />
            والشغل الحقيقي
          </h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            الجامعة تعطيك الأساس، وإحنا نعطيك الخبرة. نشجع الطلاب على بناء حلول
            مفتوحة المصدر تخدم المجتمع التقني وتطور مهاراتهم العملية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-primary mb-4">
                <span className="material-icons-round">school</span>
              </div>
              <h3 className="text-xl font-bold mb-2">تعلّم</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
ورش عمل ولقاءات دورية مع خبراء في التقنية والمصادر المفتوحة              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center text-secondary mb-4">
                <span className="material-icons-round">hub</span>
              </div>
              <h3 className="text-xl font-bold mb-2">ساهم</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
مشاريع حقيقية تُضيف قيمة لسيرتك الذاتية، وتمنحك تجربة عمل جماعي واقعية              </p>
            </div>
          </div>
        </div>
        <div className="order-2 lg:order-1 relative">
          <div className="bg-[#0f172a] rounded-3xl p-6 shadow-2xl border border-slate-700 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-slate-500">
                OSS-VISION-PROJECT
              </span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
            </div>
            <div className="font-mono text-sm space-y-3" dir="ltr">
              <div className="text-blue-400"># Project structure init</div>
              <div className="flex items-center">
                <span className="text-purple-400 mr-2">git</span>
                <span className="text-slate-300">
                  checkout -b student-contribution
                </span>
              </div>
              <div className="text-slate-500 pl-4">...Loading core modules</div>
              <div className="text-green-400 flex items-center gap-2">
                <span className="material-icons-round text-sm">check</span>
                Learning path configured
              </div>
              <div className="text-green-400 flex items-center gap-2">
                <span className="material-icons-round text-sm">check</span>
                Team collaboration active
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-10">
              <svg
                fill="none"
                height="100"
                stroke="white"
                strokeWidth="1"
                viewBox="0 0 24 24"
                width="100"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
                <polyline points="19 18 13 12 19 6"></polyline>
              </svg>
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl -z-10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

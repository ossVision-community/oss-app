export default function Hero() {
  return (
    <header className="relative pt-12 pb-24 px-4 sm:px-8 lg:px-24 flex flex-col items-center text-center overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-20 right-10 lg:right-32 text-slate-200 pointer-events-none animate-bounce"
        style={{ animationDuration: "3s" }}
      >
        <svg
          className="transform rotate-45"
          fill="none"
          height="60"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="60"
        >
          <line x1="7" x2="17" y1="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 lg:left-32 text-slate-200 pointer-events-none animate-pulse">
        <svg
          fill="none"
          height="40"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="40"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>

    
      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#312e81] leading-tight mb-4"
        dir="ltr"
      >
        <span className="block hero-line">
          <span className="inline-flex items-baseline justify-center gap-3">
            <span>OSS</span>
           
          </span>
        </span>
        <span className="block hero-line hero-line-2">Vision community</span>
      </h1>
      <p className="text-secondary font-bold text-xl md:text-2xl mb-6">
نتعلّم . نساهم . نبني حلول 
      </p>
      <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
مجتمع تقني  يجمع الطلاب للمساهمة في مشاريع مفتوحة المصدر وبناء حلول حقيقية
      </p>
    </header>
  );
}

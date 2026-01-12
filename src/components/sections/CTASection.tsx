import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Faculty Card */}
        <div className="bg-[#fefbf6] p-10 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
           الشركاء
            </h3>
            <p className="text-slate-600 mb-8 max-w-sm">
نؤمن بالشراكات التي تجمع بين دعم المبادرات الطلابية وتحقيق أثر مجتمعي يعود بالنفع على الشركاء والمجتمع     </p>
            <Link
              className="inline-block bg-secondary text-white font-bold py-2.5 px-8 rounded-xl shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all"
              href="#"
            >
              كن شريكاً
            </Link>
          </div>
          <div className="absolute -bottom-10 -left-10 text-slate-200 opacity-50 group-hover:scale-105 transition-transform duration-500">
            <span className="material-icons-round" style={{ fontSize: "180px" }}>
              apartment
            </span>
          </div>
        </div>

        {/* Students Card */}
        <div className="bg-primary p-10 rounded-3xl text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">الطلاب</h3>
            <p className="text-indigo-100 mb-8 max-w-sm">
             كن جزءًا من مجتمع طلابي يعمل على مشاريع مفتوحة المصدر، ويحوّل التعلّم الجامعي إلى تجربة عملية حقيقية.
            </p>
            <Link
              className="inline-block bg-white text-primary font-bold py-2.5 px-8 rounded-xl shadow-lg hover:bg-slate-50 transition-all"
              href="#"
            >
              انضم لمساحتنا
            </Link>
          </div>
          <div className="absolute -bottom-10 -right-10 text-white opacity-10 group-hover:scale-105 transition-transform duration-500">
            <span className="material-icons-round" style={{ fontSize: "180px" }}>
              forum
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

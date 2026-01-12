import { DEPARTMENTS } from "@/lib/constants";

export default function OrganizationSection() {
  return (
    <section
      id="organization"
      className="py-24 px-4 sm:px-8 lg:px-24 bg-background-light"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b]">
          الهيكل التنظيمي للمجتمع
        </h2>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Leadership - Mobile */}
        <div className="md:hidden flex flex-col items-center gap-4 mb-12">
          {/* Leader at top */}
          <div className="bg-primary text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center w-full max-w-xs ring-4 ring-white z-10">
         
            <h3 className="text-xl font-bold">قائد المجتمع</h3>
          </div>
          
          {/* Connector line */}
          <div className="w-0.5 h-6 bg-slate-300"></div>
          
          {/* Second level - side by side */}
          <div className="flex gap-4 w-full justify-center">
            <div className="bg-primary/90 text-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center flex-1 max-w-[160px]">
              <h3 className="text-sm font-bold">مستشارو المجتمع</h3>
            </div>
            <div className="bg-primary/90 text-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center flex-1 max-w-[160px]">
              <h3 className="text-sm font-bold">قائد العمليات</h3>
            </div>
          </div>
          
          {/* Connector line to departments */}
          <div className="w-0.5 h-6 bg-slate-300"></div>
        </div>

        {/* Leadership - Desktop */}
        <div className="hidden md:flex flex-col items-center mb-12">
          {/* Leader at top */}
          <div className="bg-primary text-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center w-72 ring-4 ring-white z-10">
          
            <h3 className="text-xl font-bold">قائد المجتمع</h3>
          </div>
          
          {/* Connector - vertical line then horizontal split */}
          <div className="w-0.5 h-8 bg-slate-300"></div>
          <div className="flex items-start">
            <div className="w-40 h-0.5 bg-slate-300"></div>
            <div className="w-0.5 h-8 bg-slate-300 -mt-0.5"></div>
            <div className="w-40 h-0.5 bg-slate-300"></div>
          </div>
          
          {/* Second level - Consultant and Operations */}
          <div className="flex gap-20 -mt-0.5">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-slate-300"></div>
              <div className="bg-primary/90 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center w-52">
                <span className="material-icons-round text-2xl mb-2 text-cyan-300">
                  groups
                </span>
                <h3 className="text-lg font-bold">مستشارو المجتمع</h3>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-slate-300"></div>
              <div className="bg-primary/90 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center w-52">
                <span className="material-icons-round text-2xl mb-2 text-cyan-300">
                  settings
                </span>
                <h3 className="text-lg font-bold">قائد العمليات</h3>
              </div>
            </div>
          </div>
          
          {/* Connector to departments */}
          <div className="w-0.5 h-10 bg-slate-300 mt-4"></div>
        </div>

        {/* Departments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-all"
            >
              <div className="text-primary mb-3">
                <span className="material-icons-round text-3xl">{dept.icon}</span>
              </div>
              <h4 className="font-bold text-lg mb-1">{dept.name}</h4>
              <p className="text-xs text-slate-500">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

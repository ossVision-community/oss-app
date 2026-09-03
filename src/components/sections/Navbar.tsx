"use client";

import Link from "next/link";
import Image from "next/image";
import { REGISTRATION_ENABLED } from "@/lib/featureFlags";

export default function Navbar() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="w-full py-6 px-4 sm:px-8 lg:px-24 flex flex-row-reverse items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          alt="OSS Vision Logo"
          className="h-14 w-14 object-contain"
          src="/oss-logo.png"
          width={56}
          height={56}
        />
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a 
          className="hover:text-primary transition-colors cursor-pointer" 
          href="#about"
          onClick={(e) => scrollToSection(e, "about")}
        >
          من نحن
        </a>
        <a 
          className="hover:text-primary transition-colors cursor-pointer" 
          href="#organization"
          onClick={(e) => scrollToSection(e, "organization")}
        >
          الهيكل التنظيمي
        </a>
        <a 
          className="hover:text-primary transition-colors cursor-pointer" 
          href="#partners"
          onClick={(e) => scrollToSection(e, "partners")}
        >
          الشركاء
        </a>
      </div>
      {/* Hidden while registration is closed; see @/lib/featureFlags. */}
      {REGISTRATION_ENABLED && (
        <Link
          className="bg-primary hover:bg-opacity-90 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-primary/30"
          href="/join"
        >
          انضم إلينا
        </Link>
      )}
    </nav>
  );
}

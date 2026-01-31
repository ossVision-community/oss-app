import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="partners"
      className="bg-surface-light pt-16 pb-8 border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-slate-500 mb-6 font-medium">
          بدعم ورعاية هيئة الحكومة الرقمية وجامعة الإمام محمد بن سعود الإسلامية
        </p>
        <div className="flex justify-center gap-4 mb-16">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-32 h-32 flex items-center justify-center">
            <Image
              alt="Digital Government Authority Logo"
              src="/dga-logo.png"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-32 h-32 flex items-center justify-center">
            <Image
              alt="Imam University Logo"
              src="/uni-logo.png"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 order-2 md:order-1">
            <Image
              alt="OSS Vision Logo"
              className="h-8 w-8 object-contain"
              src="/oss-logo.png"
              width={32}
              height={32}
            />
            <p className="text-xs text-slate-400">
              تمكين الجيل القادم من المبدعين التقنيين
            </p>
          </div>

          <div className="flex gap-6 text-sm text-slate-500 order-3 md:order-2">
         
            <Link className="hover:text-primary" href="/privacy">
              سياسة الخصوصية
            </Link>
            <span className="text-slate-300">|</span>
            <span>© 2026 OSS Vision - جميع الحقوق محفوظة</span>
          </div>

          <div className="flex gap-4 order-1 md:order-3">
            {/* GitHub */}
            <Link
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors"
              href="https://github.com/ossVision-community"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </Link>
            {/* X (Twitter) */}
            <Link
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors"
              href="https://x.com/openv_imsiu1?s=21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors"
              href="https://www.linkedin.com/company/oss-vision/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </Link>
            {/* Telegram */}
            <Link
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary transition-colors"
              href="https://t.me/OpenVision_imsiu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.5 4.5L2.7 11.8c-.9.4-.9 1.2-.2 1.4l4.8 1.5 1.9 5.8c.2.5.4.6.8.6.3 0 .5-.1.8-.4l2.7-2.6 5.6 4.1c.6.4 1.1.2 1.3-.6l3.4-16.1c.2-1-.4-1.5-1.3-1.2zm-3 3.3l-9.4 8.5c-.3.3-.6.3-1 0l-3.8-2.4 14-6.1c.7-.3.9.1.2.6z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

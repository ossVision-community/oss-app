import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSS Vision - مجتمع رؤية ",
  description:
    "نجمع طلاب الحاسب اللي يبون يتعلمون ويساهمون في مشاريع حقيقية. انضم لأكبر تجمع للمساهمين في البرمجيات الحرة في جامعاتنا.",
  keywords: ["Open Source", "مصادر مفتوحة", "برمجة", "مجتمع طلابي", "تقنية"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="ar">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light text-slate-800 antialiased transition-colors duration-300" style={{ fontFamily: "'Tajawal', 'Noto Sans Arabic', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

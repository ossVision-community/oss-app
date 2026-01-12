import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import OrganizationSection from "@/components/sections/OrganizationSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <OrganizationSection />
      <CTASection />
      <Footer />
    </main>
  );
}

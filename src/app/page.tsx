import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import OrganizationSection from "@/components/sections/OrganizationSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import {
  REGISTER_HREF,
  REGISTRATION_ENABLED,
  USES_EXTERNAL_REGISTER_FORM,
} from "@/lib/siteConfig";

export default function Home() {
  return (
    <main>
      <Navbar
        showRegister={REGISTRATION_ENABLED}
        registerHref={REGISTER_HREF}
        registerIsExternal={USES_EXTERNAL_REGISTER_FORM}
      />
      <Hero />
      <AboutSection />
      <OrganizationSection />
      <CTASection />
      <Footer />
    </main>
  );
}

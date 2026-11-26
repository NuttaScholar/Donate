import SiteHeader from "../organisms/SiteHeader";
import HeroSection from "../organisms/HeroSection";
import AboutSection from "../organisms/AboutSection";
import DonateSection from "../organisms/DonateSection";
import SiteFooter from "../organisms/SiteFooter";
import SupportersSection from "../organisms/SupportersSection";

export default function HomeTemplate() {
  return (
    <div className="site">
      <SiteHeader />
      <main id="top">
        <HeroSection />
        <AboutSection />
        <DonateSection />
        <SupportersSection />
      </main>
      <SiteFooter />
    </div>
  );
}

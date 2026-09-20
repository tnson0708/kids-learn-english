import { HeroSection } from "@/components/home/hero-section";
import { CoreSubjectsSection } from "@/components/home/core-subjects-section";
import { FeatureBannersSection } from "@/components/home/feature-banners-section";
import { ParentCornerSection } from "@/components/home/parent-corner-section";
import { SiteFooter } from "@/components/home/site-footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#FFFDF9]">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8 space-y-12 w-full">
        <HeroSection />
        <CoreSubjectsSection />
        <FeatureBannersSection />
        <ParentCornerSection />
      </main>
      <SiteFooter />
    </div>
  );
}

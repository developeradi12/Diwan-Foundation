import OurMembers from "@/components/sections/our-member";
import CausesSection from "./causeSection";
import CTASection from "./ctaSection";
import FAQSection from "./faqSection";
import HeroAbout from "./heroabout";
import ImpactStatsSection from "./impactstatSection";
import MissionSection from "./missionSection";
import TeamSection from "./TeamSection";
import TestimonialsSection from "./testimonials";

export default function AboutPage() {
  return (
    <main>
      <HeroAbout />
      <MissionSection />
      <CausesSection />
      {/* <ImpactStatsSection /> */}
      {/* <TeamSection /> */}
      <OurMembers/>
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
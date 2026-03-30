import HeroServices from "./HeroServices";
import HowWeWorkSection from "./Howwework";
import ServicesCTA from "./servicecta";
import ServicesGrid from "./Servicesgrid";

export default function ServicesPage() {
  return (
    <main>
      <HeroServices />
      <ServicesGrid />
      <HowWeWorkSection />
      <ServicesCTA />
    </main>
  );
}
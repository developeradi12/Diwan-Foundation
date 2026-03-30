import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/about";
import ServicesSection from "@/components/sections/service";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import WhatWeDo from "@/components/sections/WhatWeDo";
import ScrollSection from "@/components/animations/scrollSection";
import DonateSection from "@/components/sections/Donate";
import TestimonialsSection from "@/components/sections/Testimonial";
import { Footer } from "@/components/sections/Footer";
import GallerySection from "@/components/sections/gallery";
import BlogSection from "@/components/sections/blogs";
import Image from "next/image";
import ShortsSlider from "@/components/sections/videoSection";
import OurMembers from "@/components/sections/our-member";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="">
        <ScrollSection>
          <AboutSection />
        </ScrollSection>
      </div>

      <ScrollSection>
        <ServicesSection />
      </ScrollSection>

      <ScrollSection>
        <WhyChooseUs />
      </ScrollSection>

      <ScrollSection>
         <OurMembers/>
      </ScrollSection>

      <ScrollSection>
        <DonateSection />
      </ScrollSection>

      <ScrollSection>
        <TestimonialsSection />
      </ScrollSection>

      <ScrollSection>
        <GallerySection />
      </ScrollSection>

      <ScrollSection>
        <ShortsSlider />
      </ScrollSection>

      <ScrollSection>
        <BlogSection />
      </ScrollSection>
      <Footer />
    </>
  );
}

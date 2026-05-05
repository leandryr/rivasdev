import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { WorkSection } from "@/components/work-section";
import { AboutSection } from "@/components/about-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { StackSection } from "@/components/stack-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { InstagramFeed } from "@/components/instagram-feed";
import { SiteFooter } from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SiteHeader />
      <main>
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <TestimonialsSection />
        <StackSection />
        <FaqSection />
        <ContactSection />
        <InstagramFeed />
      </main>
      <SiteFooter />
    </>
  );
}

import { BestSpirits } from "@/components/landing/BestSpirits";
import { CategoryCards } from "@/components/landing/CategoryCards";
import { ClientLogos } from "@/components/landing/ClientLogos";
import { EventsList } from "@/components/landing/EventsList";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { FeatureStrip } from "@/components/landing/FeatureStrip";
import { Hero } from "@/components/landing/Hero";
import { NaturalAuroma } from "@/components/landing/NaturalAuroma";
import { Newsletter } from "@/components/landing/Newsletter";
import { OurHistory } from "@/components/landing/OurHistory";
import { PhotoBand } from "@/components/landing/PhotoBand";
import { TeamGrid } from "@/components/landing/TeamGrid";
import { Testimonial } from "@/components/landing/Testimonial";
import { barrelsBand, vineyardBand } from "@/lib/landing-content";

// VIN ROUGE landing (Figma: Vin Rouge_WINE, node 203:53).
// Sections top-to-bottom as in the mockup; the catalog lives at /shop.
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <OurHistory />
      <CategoryCards />
      <PhotoBand
        image="/landing/barrels.png"
        alt="Weinfässer im Keller"
        title={barrelsBand.title}
        sub={barrelsBand.sub}
        imagePosition="object-bottom"
      />
      <BestSpirits />
      <Testimonial />
      <NaturalAuroma />
      <PhotoBand
        image="/landing/vineyard.jpg"
        alt="Unser Weinberg"
        title={vineyardBand.title}
        sub={vineyardBand.sub}
      />
      <TeamGrid />
      <FaqAccordion />
      <EventsList />
      <Newsletter />
      <ClientLogos />
    </>
  );
}

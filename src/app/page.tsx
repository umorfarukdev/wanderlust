import { Banner } from "@/components/layout/banner";
import { Features } from "@/components/layout/features";
import { Testimonials } from "@/components/layout/testimonials";
import { CallToAction } from "@/components/layout/cta";

export default function Home() {
  return (
    <>
      <main>
        <Banner />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
    </>
  );
}

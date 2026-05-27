"use client";

import Hero from "@/components/home/hero";
// import Demo from "@/components/home/demo";
import HowItWorks, { HowItWorksSection } from "@/components/home/how";
import CTA from "@/components/home/CTA";
import { GradientBackground1 } from "@/components/common/gradient";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <GradientBackground1 />
      <Hero />
      {/* <DemoSection /> */}
      <HowItWorks />
      {/* <HowItWorksSection /> */}
      {/* <Pricing /> */}
      {/* <PricingPage /> */}
      <CTA />
    </div>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { LandingHeader } from "@/components/landing/layout/LandingHeader";
import { LandingFooter } from "@/components/landing/layout/LandingFooter";
import { HeroSection } from "@/components/landing/sections/HeroSection";
import { StatsSection } from "@/components/landing/sections/StatsSection";
import { IntroductionSection } from "@/components/landing/sections/IntroductionSection";
import { FeaturesSection } from "@/components/landing/sections/FeaturesSection";
import { QuoteSection } from "@/components/landing/sections/QuoteSection";
import { CTASection } from "@/components/landing/sections/CTASection";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <LandingHeader />
      <main>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={fadeInUp}>
            <HeroSection />
          </motion.div>

          <StatsSection />

          <IntroductionSection />

          <FeaturesSection />

          <QuoteSection />

          <CTASection />
        </motion.div>
      </main>
      <LandingFooter />
    </div>
  );
}

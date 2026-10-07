"use client";
import {motion} from 'framer-motion';
import { useTransform, useScroll } from "motion/react";

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  return (
    <section className="w-full relative min-h-screen">
      {/* Sticky Background Image Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <motion.img
          style={{ filter }}
          alt="University Campus"
          className="w-full h-full object-cover"
          src="https://i.postimg.cc/zDFSqZGy/IMG-20210623-WA0006.jpg"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#00422b]/95 via-[#005236]/60 to-[#00422b]/40"></div>
      </div>

      {/* Hero Content Overlaid on top of Sticky Image */}
      <div className="relative z-10 -mt-[100vh] min-h-screen flex flex-col justify-center items-center text-center space-y-stack-md mx-auto px-margin-mobile md:px-gutter max-w-container-max py-section-gap-mobile md:py-section-gap">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-display-lg leading-tight text-on-primary max-w-4xl drop-shadow-md">
          EcoMonitor 
          <p>
          Global Campus Sustainability Dashboard
          </p>
        </h1>
        <p className="font-body-lg text-body-lg max-w-2xl text-on-primary/90 mx-auto drop-shadow">
          A digital platform for universities to manage, monitor, and improve
          their sustainability performance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-all shadow-[0px_4px_20px_rgba(0,108,73,0.2)] hover:shadow-[0px_10px_30px_rgba(0,108,73,0.3)] hover:-translate-y-1">
            Explore Platform
          </button>
          <button className="bg-transparent border-2 px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-surface-container-low/20 hover:text-on-primary transition-colors border-on-primary text-on-primary backdrop-blur-xs">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

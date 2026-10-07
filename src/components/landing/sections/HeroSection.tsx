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
          src="https://i.postimg.cc/1zyMGmtd/download.jpg"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#00422b]/95 via-[#005236]/60 to-[#00422b]/40"></div>
      </div>

      {/* Hero Content Overlaid on top of Sticky Image */}
      <div className="relative z-10 -mt-[100vh] min-h-screen flex flex-col justify-center items-center text-center mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-3 md:space-y-4 mb-6 md:mb-8"
        >
          <h1 className="font-headline-lg text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-on-primary max-w-5xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            EcoMonitor
          </h1>
          <p className="font-headline-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight text-on-primary/95 max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            Global Campus Sustainability Dashboard
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="font-body-lg text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl text-on-primary/90 mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] mb-8 md:mb-10 px-4"
        >
          A digital platform for universities to manage, monitor, and improve
          their sustainability performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4"
        >
          <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-base md:text-lg font-semibold hover:bg-on-primary-fixed-variant transition-all duration-300 shadow-[0px_4px_20px_rgba(0,108,73,0.3)] hover:shadow-[0px_10px_30px_rgba(0,108,73,0.4)] hover:-translate-y-1 active:translate-y-0">
            Explore Platform
          </button>
          <button className="bg-transparent border-2 px-8 py-4 rounded-lg font-label-md text-base md:text-lg font-semibold hover:bg-surface-container-low/20 hover:text-on-primary transition-all duration-300 border-on-primary text-on-primary backdrop-blur-sm hover:backdrop-blur-md">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}

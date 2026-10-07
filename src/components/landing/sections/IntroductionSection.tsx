"use client";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const fadeInUp: Variants = {
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

export function IntroductionSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32"
    >
      <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
        <motion.div className="flex flex-col space-y-6 md:space-y-8">
          <span className="font-label-md text-sm md:text-base text-primary tracking-[0.15em] uppercase font-semibold">
            SUSTAINABLE UNIVERSITIES
          </span>
          <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-[1.15] tracking-tight">
            Better Data.
            <br />
            Better Decisions.
            <br />A Better Campus.
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col space-y-6 md:space-y-8 lg:pl-12 border-l-0 lg:border-l-2 border-outline-variant/30">
          <p className="font-body-lg text-base md:text-lg lg:text-xl leading-relaxed text-on-surface-variant">
            Bring sustainability information together in one digital platform
            designed to help universities understand their performance and take
            meaningful action. Connect disparate data sources into a unified,
            actionable dashboard.
          </p>
          <a
            href="#"
            className="inline-flex items-center font-label-md text-base md:text-lg font-semibold text-primary hover:text-on-primary-fixed-variant transition-all duration-300 group"
          >
            Discover the Platform
            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

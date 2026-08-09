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
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap"
    >
      <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        <motion.div className="flex flex-col space-y-4">
          <span className="font-label-md text-label-md text-primary tracking-widest uppercase">
            SUSTAINABLE UNIVERSITIES
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
            Better Data.
            <br />
            Better Decisions.
            <br />A Better Campus.
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col space-y-6 lg:pl-12 border-l-0 lg:border-l border-outline-variant/30">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Bring sustainability information together in one digital platform
            designed to help universities understand their performance and take
            meaningful action. Connect disparate data sources into a unified,
            actionable dashboard.
          </p>
          <a
            href="#"
            className="inline-flex items-center font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors group"
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

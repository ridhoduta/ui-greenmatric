'use client';
import {motion} from 'framer-motion';
import {staggerContainer, fadeInUp} from '@/components/animate/animate';

export function CTASection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="bg-primary py-16 md:py-24 lg:py-32"
    >
      <motion.div variants={fadeInUp} className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center flex flex-col items-center">
        <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-primary mb-6 md:mb-8 leading-tight tracking-tight">
          Ready to Build a Better Campus?
        </h2>
        <p className="font-body-lg text-base md:text-lg lg:text-xl leading-relaxed text-on-primary/90 max-w-3xl mb-8 md:mb-10">
          Join the growing network of institutions committed to data-driven sustainability.
        </p>
        <button className="bg-on-primary text-primary px-8 py-4 rounded-lg font-label-md text-base md:text-lg font-semibold hover:bg-surface-container-low transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0">
          Get Started
        </button>
      </motion.div>
    </motion.section>
  );
}

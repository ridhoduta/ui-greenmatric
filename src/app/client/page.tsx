'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { LandingHeader } from '@/components/landing/layout/LandingHeader';
import { LandingFooter } from '@/components/landing/layout/LandingFooter';
import { PageHeader } from '@/components/landing/header';

export default function ClientPage() {
  const universities = [
    { name: 'Universitas Indonesia', country: 'Indonesia', code: 'UI' },
    { name: 'Wageningen University', country: 'Netherlands', code: 'WUR' },
    { name: 'University of California, Davis', country: 'United States', code: 'UCD' },
    { name: 'University of Nottingham', country: 'United Kingdom', code: 'UoN' },
    { name: 'Universidade de São Paulo', country: 'Brazil', code: 'USP' },
    { name: 'King Abdulaziz University', country: 'Saudi Arabia', code: 'KAU' },
    { name: 'University of Bologna', country: 'Italy', code: 'UNIBO' },
    { name: 'National Taiwan University', country: 'Taiwan', code: 'NTU' },
  ];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <LandingHeader />

      <main className="flex-1">
        {/* Page Header */}
        <motion.div initial="hidden" animate="show" variants={fadeInUp}>
          <PageHeader
            category="OUR COMMUNITY"
            title="Universities Moving Toward a Greener Future."
            description="Discover a growing community of universities working to create more sustainable, responsible, and future-ready campuses."
          >
            <Link
              href="#universities"
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-base md:text-lg font-semibold hover:bg-on-primary-fixed-variant transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Explore Our Community
            </Link>
          </PageHeader>
        </motion.div>

        {/* Section 1: Introduction */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInUp} className="lg:col-span-5 flex flex-col space-y-6 md:space-y-8">
              <span className="font-label-md text-sm md:text-base text-primary tracking-[0.15em] uppercase font-semibold">
                OUR CLIENTS
              </span>
              <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-tight tracking-tight">
                Built for University Communities.
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 lg:pl-12 border-l-0 lg:border-l-2 border-outline-variant/30">
              <p className="font-body-lg text-base md:text-lg lg:text-xl leading-relaxed text-on-surface-variant">
                Our platform is designed to support universities in organizing, monitoring, and communicating their sustainability efforts through a connected digital experience.
              </p>
              <p className="font-body-lg text-base md:text-lg lg:text-xl leading-relaxed text-on-surface-variant">
                From collecting information to monitoring progress, everything is brought together in one place to make sustainability management simpler and more transparent.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 2: University Showcase */}
        <section id="universities" className="bg-surface-bright py-16 md:py-24 lg:py-32 border-y border-outline-variant/20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
              <span className="font-label-md text-sm md:text-base text-primary tracking-[0.15em] uppercase font-semibold block mb-4 md:mb-6">
                OUR UNIVERSITIES
              </span>
              <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6 md:mb-8 leading-tight tracking-tight">
                A Community With a Shared Purpose.
              </h2>
              <p className="font-body-lg text-base md:text-lg lg:text-xl leading-relaxed text-on-surface-variant mb-3">
                Universities around the world are taking steps toward a more sustainable future.
              </p>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant/80">
                Explore the institutions that are part of this journey.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {universities.map((uni, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-3xl">account_balance</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                    {uni.name}
                  </h3>
                  <span className="font-label-md text-label-md text-outline uppercase tracking-wider">
                    {uni.country}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Section 3: Global Community */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="bg-primary/5 border-b border-outline-variant/20 py-16 md:py-24 lg:py-32"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
              <motion.div variants={fadeInUp} className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8">
                <span className="font-label-md text-sm md:text-base text-primary tracking-[0.15em] uppercase font-semibold">
                  GLOBAL COMMUNITY
                </span>
                <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-tight tracking-tight">
                  Connected by a Shared Purpose.
                </h2>
                <p className="font-body-lg text-base md:text-lg lg:text-xl leading-relaxed text-on-surface-variant">
                  Sustainability becomes more meaningful when universities learn from one another, share experiences, and move forward together.
                </p>
              </motion.div>

              <motion.div variants={staggerContainer} className="lg:col-span-6 grid grid-cols-2 gap-6 md:gap-8 text-center">
                <motion.div variants={fadeInUp} className="bg-surface-bright border border-outline-variant/30 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xs">
                  <span className="font-display-lg text-5xl md:text-6xl lg:text-7xl text-primary font-bold block">1,745</span>
                  <span className="font-headline-sm text-lg md:text-xl lg:text-2xl text-on-surface font-semibold mt-3 block">
                    Universities
                  </span>
                </motion.div>
                <motion.div variants={fadeInUp} className="bg-surface-bright border border-outline-variant/30 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xs">
                  <span className="font-display-lg text-5xl md:text-6xl lg:text-7xl text-primary font-bold block">105</span>
                  <span className="font-headline-sm text-lg md:text-xl lg:text-2xl text-on-surface font-semibold mt-3 block">
                    Countries
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Platform Experience */}


        {/* Section 6: CTA */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-primary text-on-primary py-16 md:py-24 lg:py-32"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center flex flex-col items-center">
            <span className="font-label-md text-sm md:text-base text-secondary-fixed tracking-[0.15em] uppercase font-semibold mb-4 md:mb-6">
              BE PART OF THE MOVEMENT
            </span>
            <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-primary mb-6 md:mb-8 leading-tight tracking-tight">
              Build a Better Campus, Together.
            </h2>
            <p className="font-body-lg text-base md:text-lg lg:text-xl leading-relaxed text-on-primary/90 max-w-3xl mb-8 md:mb-10">
              Discover how our platform can help your university manage, monitor, and improve its sustainability journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-on-primary text-primary px-8 py-4 rounded-lg font-label-md text-base md:text-lg font-semibold hover:bg-surface-container-low transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Contact Us
              </Link>
              <Link
                href="/ui-green-matric"
                className="bg-transparent border-2 border-on-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-base md:text-lg font-semibold hover:bg-on-primary/10 transition-all duration-300"
              >
                Explore the Platform
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      <LandingFooter />
    </div>
  );
}

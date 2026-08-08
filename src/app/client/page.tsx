'use client';

import Link from 'next/link';
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

  const steps = [
    {
      num: '01',
      title: 'ORGANIZE',
      desc: 'Bring sustainability information and documentation together in one structured digital environment.',
      icon: 'folder_open',
    },
    {
      num: '02',
      title: 'MONITOR',
      desc: "Follow your university's sustainability performance and track progress over time.",
      icon: 'insights',
    },
    {
      num: '03',
      title: 'IMPROVE',
      desc: 'Identify opportunities for improvement and turn sustainability data into meaningful action.',
      icon: 'trending_up',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <LandingHeader />

      <main className="flex-1">
        {/* Page Header */}
        <PageHeader
          category="OUR COMMUNITY"
          title="Universities Moving Toward a Greener Future."
          description="Discover a growing community of universities working to create more sustainable, responsible, and future-ready campuses."
        >
          <Link
            href="#universities"
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors"
          >
            Explore Our Community
          </Link>
        </PageHeader>

        {/* Section 1: Introduction */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
                OUR CLIENTS
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                Built for University Communities.
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col space-y-6 lg:pl-8 border-l-0 lg:border-l border-outline-variant/30">
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Our platform is designed to support universities in organizing, monitoring, and communicating their sustainability efforts through a connected digital experience.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                From collecting information to monitoring progress, everything is brought together in one place to make sustainability management simpler and more transparent.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: University Showcase */}
        <section id="universities" className="bg-surface-bright py-section-gap-mobile md:py-section-gap border-y border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold block mb-3">
                OUR UNIVERSITIES
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
                A Community With a Shared Purpose.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
                Universities around the world are taking steps toward a more sustainable future.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant/80">
                Explore the institutions that are part of this journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {universities.map((uni, idx) => (
                <div
                  key={idx}
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Global Community */}
        <section className="bg-primary/5 border-b border-outline-variant/20 py-section-gap-mobile md:py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col space-y-4">
                <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
                  GLOBAL COMMUNITY
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                  Connected by a Shared Purpose.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Sustainability becomes more meaningful when universities learn from one another, share experiences, and move forward together.
                </p>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-6 text-center">
                <div className="bg-surface-bright border border-outline-variant/30 rounded-2xl p-8 shadow-xs">
                  <span className="font-display-lg text-display-lg text-primary font-bold block">1,745</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-2 block">
                    Universities
                  </span>
                </div>
                <div className="bg-surface-bright border border-outline-variant/30 rounded-2xl p-8 shadow-xs">
                  <span className="font-display-lg text-display-lg text-primary font-bold block">105</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-2 block">
                    Countries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Platform Experience */}
        

        {/* Section 6: CTA */}
        <section className="bg-primary text-on-primary py-section-gap-mobile md:py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center flex flex-col items-center">
            <span className="font-label-md text-label-md text-secondary-fixed tracking-widest uppercase font-semibold mb-3">
              BE PART OF THE MOVEMENT
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary mb-6">
              Build a Better Campus, Together.
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mb-8">
              Discover how our platform can help your university manage, monitor, and improve its sustainability journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-on-primary text-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-lg hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                href="/ui-green-matric"
                className="bg-transparent border-2 border-on-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-on-primary/10 transition-colors"
              >
                Explore the Platform
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { LandingHeader } from '@/components/landing/layout/LandingHeader';
import { LandingFooter } from '@/components/landing/layout/LandingFooter';
import { PageHeader } from '@/components/landing/header';

export default function UIGreenMetricPage() {
  const purposes = [
    {
      num: '01',
      title: 'ACADEMIC DISCUSSION',
      desc: 'Contribute to the conversation about sustainability and greener higher education.',
      icon: 'school',
    },
    {
      num: '02',
      title: 'SOCIAL CHANGE',
      desc: 'Encourage universities to turn sustainability knowledge into meaningful action.',
      icon: 'groups',
    },
    {
      num: '03',
      title: 'SELF ASSESSMENT',
      desc: 'Help universities understand and evaluate their sustainability performance.',
      icon: 'fact_check',
    },
    {
      num: '04',
      title: 'PUBLIC AWARENESS',
      desc: 'Share information about university sustainability initiatives with the wider community.',
      icon: 'campaign',
    },
  ];

  const frameworks = [
    { num: '01', title: 'Setting & Infrastructure', percentage: 11, icon: 'nature_people' },
    { num: '02', title: 'Energy & Climate Change', percentage: 20, icon: 'bolt' },
    { num: '03', title: 'Waste', percentage: 17, icon: 'recycling' },
    { num: '04', title: 'Water', percentage: 11, icon: 'water_drop' },
    { num: '05', title: 'Transportation', percentage: 17, icon: 'directions_bus' },
    { num: '06', title: 'Education & Research', percentage: 13, icon: 'menu_book' },
    { num: '07', title: 'Governance & Digitalization', percentage: 11, icon: 'hub' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <LandingHeader />

      <main className="flex-1">
        {/* Page Header Banner */}
        <PageHeader
          category="ABOUT UI GREENMETRIC"
          title="Measuring Progress. Inspiring Sustainable Change."
          description="UI GreenMetric Sustainable University Rankings is a global initiative that encourages universities to measure, understand, and improve their sustainability efforts."
        />

        {/* Section 1: What is UI GreenMetric? */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
                ABOUT UI GREENMETRIC
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                What is UI GreenMetric?
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed pt-2">
                UI GreenMetric Sustainable University Rankings is a university sustainability ranking initiated by Universitas Indonesia in 2010.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                The ranking measures sustainability efforts and performance across universities around the world, while encouraging institutions to develop meaningful sustainability programs and actions.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-xs">
                <span className="font-display-lg text-display-lg text-primary font-bold">2010</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-2">
                  Initiated by Universitas Indonesia
                </span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Pioneering global academic sustainability metrics for over 15 years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Global Movement */}

        {/* Section 3: Purpose */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold block mb-3">
              THE PURPOSE
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
              Turning Sustainability Into Action.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              UI GreenMetric encourages universities to move beyond awareness and turn sustainability into measurable and meaningful action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {purposes.map((item) => (
              <div
                key={item.num}
                className="bg-surface-bright border border-outline-variant/20 rounded-xl p-8 hover:border-primary/40 hover:shadow-md transition-all flex items-start space-x-6"
              >
                <div className="w-14 h-14 rounded-lg bg-surface-container-low text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-label-md text-label-md text-primary font-bold">{item.num}</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.title}</h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: 2026 Direction */}

        {/* Section 5: The Framework */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold block mb-3">
              THE FRAMEWORK
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
              Seven Dimensions of Campus Sustainability.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              The 2026 framework evaluates university sustainability through seven major categories.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {frameworks.map((fw) => (
              <div
                key={fw.num}
                className="bg-surface-bright border border-outline-variant/20 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-2xl">{fw.icon}</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md text-outline font-bold mr-2">{fw.num}</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{fw.title}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 min-w-[200px]">
                  <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${fw.percentage * 4}%` }}
                    />
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold w-12 text-right">
                    {fw.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Closing Statement */}

        {/* Section 7: CTA */}
        <section className="bg-primary text-on-primary py-section-gap-mobile md:py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center flex flex-col items-center">
            <span className="font-label-md text-label-md text-secondary-fixed tracking-widest uppercase font-semibold mb-3">
              EXPLORE SUSTAINABLE CAMPUS PERFORMANCE
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary mb-6">
              Start Your Sustainability Journey.
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mb-8">
              Discover how a digital approach can help your university organize, monitor, and improve its sustainability efforts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/client"
                className="bg-on-primary text-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-lg hover:-translate-y-0.5"
              >
                Explore the Platform
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-on-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-on-primary/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

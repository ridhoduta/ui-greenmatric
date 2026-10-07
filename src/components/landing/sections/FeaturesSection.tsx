'use client';

import { FeatureCard } from '../cards/FeatureCard';

export function FeaturesSection() {
  const features = [
    {
      icon: 'dataset',
      title: 'Manage',
      description: 'Centralize campus sustainability metrics, from energy consumption to waste diversion, in a secure, structured repository designed for academic rigor.',
    },
    {
      icon: 'monitoring',
      title: 'Monitor',
      description: 'Track real-time progress against institutional goals with intuitive visualizations and automated alerts for anomalous consumption patterns.',
    },
    {
      icon: 'analytics',
      title: 'Analyze',
      description: 'Utilize advanced analytical tools to identify trends, forecast future performance, and benchmark against peer institutions globally.',
    },
    {
      icon: 'description',
      title: 'Report',
      description: 'Generate comprehensive, standardized reports aligned with international sustainability frameworks to communicate impact to stakeholders seamlessly.',
    },
  ];

  return (
    <section className="bg-surface-bright py-16 md:py-24 lg:py-32 border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <span className="font-label-md text-sm md:text-base text-primary tracking-[0.15em] uppercase block mb-4 md:mb-6 font-semibold">
            THE PLATFORM
          </span>
          <h2 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-tight tracking-tight">
            Everything in One Place.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              isLast={index >= features.length - 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

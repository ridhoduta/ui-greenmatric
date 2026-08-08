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
    <section className="bg-surface-bright py-section-gap-mobile md:py-section-gap border-y border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-stack-lg">
          <span className="font-label-md text-label-md text-primary tracking-widest uppercase block mb-4">
            THE PLATFORM
          </span>
          <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface">
            Everything in One Place.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-stack-lg">
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

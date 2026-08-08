'use client';

import { StatCard } from '../cards/StatCard';

export function StatsSection() {
  const stats = [
    {
      value: '1,745',
      label: 'Universities Participating',
      description: 'Global universities participating in the 2025 edition.',
    },
    {
      value: '105',
      label: 'Countries',
      description: 'Universities participating across countries worldwide.',
    },
    {
      value: '7',
      label: 'Assessment Categories',
      description: 'Seven sustainability areas evaluated in the 2026 framework.',
    },
    {
      value: '100%',
      label: 'Sustainability Focus',
      description: 'A comprehensive framework for evaluating university sustainability performance.',
    },
  ];

  return (
    <section className="bg-[#f0fdf4] border-y border-outline-variant/30 py-stack-lg">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-lg lg:gap-8 divide-y md:divide-y-0 lg:divide-x divide-outline-variant/20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

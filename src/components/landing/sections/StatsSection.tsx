'use client';

import { motion} from 'framer-motion';
import { StatCard } from '../cards/StatCard';
import {staggerContainer, fadeInUp} from '@/components/animate/animate';

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
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="bg-[#f0fdf4] border-y border-outline-variant/30 py-12 md:py-16 lg:py-20"
    >
      <motion.div variants={fadeInUp} className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 divide-y md:divide-y-0 lg:divide-x divide-outline-variant/20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

'use client';

import React from 'react';

export interface PageHeaderProps {
  /** Small category tag above title (e.g. "OPPORTUNITIES") */
  category?: string;
  /** Main page title (e.g. "Career & Internships") */
  title: string;
  /** Subtitle / slogan text below title */
  subtitle?: string;
  /** Detailed description paragraph */
  description?: string;
  /** Custom background image URL */
  bgImage?: string;
  /** Text alignment ('left' or 'center', defaults to 'left') */
  align?: 'left' | 'center';
  /** Optional action elements/buttons */
  children?: React.ReactNode;
  /** Additional container className */
  className?: string;
}

const DEFAULT_BG_IMAGE =
  'https://i.postimg.cc/zDFSqZGy/IMG-20210623-WA0006.jpg';

export function PageHeader({
  category,
  title,
  subtitle,
  description,
  bgImage = DEFAULT_BG_IMAGE,
  align = 'left',
  children,
  className = '',
}: PageHeaderProps) {
  const isCenter = align === 'center';

  return (
    <section className={`relative w-full min-h-90 md:min-h-110 flex items-center py-16 md:py-20 overflow-hidden bg-primary ${className}`}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Deep Green Tint Overlay matching UI GreenMetric theme */}
        <div className="absolute inset-0 bg-linear-to-r from-[#00422b]/95 via-[#005236]/85 to-[#00422b]/75" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <div className={`max-w-3xl flex flex-col ${isCenter ? 'items-center text-center mx-auto' : 'items-start text-left'}`}>
          {category && (
            <span className="font-label-md text-label-md uppercase tracking-widest text-[#6ffbbe] font-semibold mb-3">
              {category}
            </span>
          )}

          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg font-bold text-on-primary leading-tight mb-4 drop-shadow-sm">
            {title}
          </h1>

          {subtitle && (
            <p className="font-headline-sm text-headline-sm font-medium text-on-primary/95 mb-3 leading-snug">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="font-body-lg text-body-lg text-on-primary/85 leading-relaxed">
              {description}
            </p>
          )}

          {children && <div className="mt-6 flex gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export default PageHeader;

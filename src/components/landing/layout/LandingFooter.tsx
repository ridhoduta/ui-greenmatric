'use client';

import Link from 'next/link';

export function LandingFooter() {
  return (
    <footer className="w-full bg-foreground dark:bg-on-primary-fixed-variant">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg px-margin-mobile md:px-gutter py-section-gap-mobile md:py-stack-lg max-w-container-max mx-auto w-full">
        <div className="flex flex-col space-y-4">
          <span className="font-headline-sm text-headline-sm font-bold text-primary">
            UI GreenMetric
          </span>
          <p className="font-body-md text-body-md text-popover/80 max-w-xs">
            Empowering universities to lead the transition to a sustainable future through data and community.
          </p>
        </div>

        <div className="flex flex-col space-y-4 md:items-center">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/privacy"
              className="font-body-md text-body-md text-popover/80 hover:text-secondary-fixed hover:underline decoration-secondary-fixed/40 transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              href="/accessibility"
              className="font-body-md text-body-md text-popover/80 hover:text-secondary-fixed hover:underline decoration-secondary-fixed/40 transition-all"
            >
              Accessibility
            </Link>
            <Link
              href="/contact"
              className="font-body-md text-body-md text-popover/80 hover:text-secondary-fixed hover:underline decoration-secondary-fixed/40 transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/branding"
              className="font-body-md text-body-md text-popover/80 hover:text-secondary-fixed hover:underline decoration-secondary-fixed/40 transition-all"
            >
              Institutional Branding
            </Link>
            <Link
              href="/report"
              className="font-body-md text-body-md text-popover/80 hover:text-secondary-fixed hover:underline decoration-secondary-fixed/40 transition-all"
            >
              Annual Report
            </Link>
          </nav>
        </div>

        <div className="flex flex-col space-y-4 md:items-end text-left md:text-right">
          <a
            href="mailto:support@kampus.ac.id"
            className="font-body-md text-body-md text-popover/80 font-bold hover:underline decoration-secondary-fixed/40 transition-all"
          >
            support@kampus.ac.id
          </a>
          <p className="font-body-md text-body-md text-popover/80">
            © 2024 University Sustainability Office. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

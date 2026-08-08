'use client';

export function CTASection() {
  return (
    <section className="bg-primary py-section-gap-mobile md:py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center flex flex-col items-center">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary mb-6">
          Ready to Build a Better Campus?
        </h2>
        <p className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mb-8">
          Join the growing network of institutions committed to data-driven sustainability.
        </p>
        <button className="bg-on-primary text-primary px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
          Get Started
        </button>
      </div>
    </section>
  );
}

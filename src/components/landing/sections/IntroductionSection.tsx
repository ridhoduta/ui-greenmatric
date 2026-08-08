'use client';

export function IntroductionSection() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap-mobile md:py-section-gap">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        <div className="flex flex-col space-y-4">
          <span className="font-label-md text-label-md text-primary tracking-widest uppercase">
            SUSTAINABLE UNIVERSITIES
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
            Better Data.<br />
            Better Decisions.<br />
            A Better Campus.
          </h2>
        </div>

        <div className="flex flex-col space-y-6 lg:pl-12 border-l-0 lg:border-l border-outline-variant/30">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Bring sustainability information together in one digital platform designed to help universities understand their performance and take meaningful action. Connect disparate data sources into a unified, actionable dashboard.
          </p>
          <a
            href="#"
            className="inline-flex items-center font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors group"
          >
            Discover the Platform
            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

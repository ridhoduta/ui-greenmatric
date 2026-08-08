'use client';

export function QuoteSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt="An expansive aerial view of a sprawling university campus nestled in a lush, green valley"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLZcUwlYifbNwWK7v-_SGlb3HU-jPcfjQLs-VDA8YPh-apGNqVypJzwPYROGbK7uIBqxRS2lIf5pTbh2ssSxN36IlNP6jWJayDu2y-orDvsSIoJQ4uIRoXlsDbnG-Coo2jc952e3h8dVWh_3PglCMzuHFemsNkQwJvjoTqBHi9xhHBuY9sRJHGyMtE-U_xJ_CGO8m8mVRPnlJYkZXHjTs9wHL0OcWx8vs12SKTAFNkrh9jz7LNddQ"
        />
        <div className="absolute inset-0 bg-inverse-surface/60"></div>
      </div>

      <div className="relative z-10 text-center px-margin-mobile md:px-gutter max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="font-display-lg text-display-lg text-on-primary mb-6">
          "Every campus has the potential to become more sustainable."
        </h2>
        <p className="font-headline-sm text-headline-sm text-on-primary/80 font-normal tracking-wide">
          Measure. Understand. Improve.
        </p>
      </div>
    </section>
  );
}

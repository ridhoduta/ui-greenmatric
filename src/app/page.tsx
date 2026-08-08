import { LandingHeader } from '@/components/landing/layout/LandingHeader';
import { LandingFooter } from '@/components/landing/layout/LandingFooter';
import { HeroSection } from '@/components/landing/sections/HeroSection';
import { StatsSection } from '@/components/landing/sections/StatsSection';
import { IntroductionSection } from '@/components/landing/sections/IntroductionSection';
import { FeaturesSection } from '@/components/landing/sections/FeaturesSection';
import { QuoteSection } from '@/components/landing/sections/QuoteSection';
import { CTASection } from '@/components/landing/sections/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <IntroductionSection />
        <FeaturesSection />
        <QuoteSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}

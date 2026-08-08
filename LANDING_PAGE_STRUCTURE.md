# Landing Page Folder Structure

## Overview
This document describes the landing page structure created from the reference HTML file. The landing page consists of 4 main pages with reusable components.

## Folder Structure

```
src/
├── app/
│   ├── page.tsx                          # Home page (main landing page)
│   ├── ui-green-matric/
│   │   └── page.tsx                      # UI Green Matric page
│   ├── client/
│   │   └── page.tsx                      # Clients page
│   ├── contact/
│   │   └── page.tsx                      # Contact page
│   ├── layout.tsx                        # Root layout (includes Material Symbols font)
│   └── globals.css                       # Global styles with custom theme
│
└── components/
    └── landing/
        ├── layout/
        │   ├── LandingHeader.tsx         # Navigation header (reusable)
        │   └── LandingFooter.tsx         # Footer (reusable)
        │
        ├── sections/
        │   ├── HeroSection.tsx           # Hero banner with CTA
        │   ├── StatsSection.tsx          # Statistics/data strip
        │   ├── IntroductionSection.tsx   # Introduction content
        │   ├── FeaturesSection.tsx       # Platform features grid
        │   ├── QuoteSection.tsx          # Visual statement with quote
        │   └── CTASection.tsx            # Call-to-action section
        │
        └── cards/
            ├── StatCard.tsx              # Individual stat card
            └── FeatureCard.tsx           # Individual feature card
```

## Pages

### 1. Home (`/`)
- Full landing page with all sections
- Components used:
  - LandingHeader
  - HeroSection
  - StatsSection
  - IntroductionSection
  - FeaturesSection
  - QuoteSection
  - CTASection
  - LandingFooter

### 2. UI Green Matric (`/ui-green-matric`)
- Information about the sustainability ranking system
- Uses: LandingHeader, LandingFooter
- Placeholder content with grid layout

### 3. Clients (`/client`)
- Showcase of participating universities
- Uses: LandingHeader, LandingFooter
- Grid layout for client logos/cards

### 4. Contact (`/contact`)
- Contact form and information
- Uses: LandingHeader, LandingFooter
- Full contact form with validation-ready inputs

## Reusable Components

### Layout Components
1. **LandingHeader** - Navigation bar with:
   - Logo/brand
   - Desktop navigation menu
   - Mobile menu button
   - CTA button
   - Sticky positioning

2. **LandingFooter** - Footer with:
   - Brand information
   - Navigation links
   - Contact information
   - Copyright notice

### Section Components
1. **HeroSection** - Hero banner with background image, title, description, and CTA buttons
2. **StatsSection** - Statistics showcase with 4 stat cards
3. **IntroductionSection** - Two-column introduction layout
4. **FeaturesSection** - 4 features in responsive grid
5. **QuoteSection** - Full-width image with overlay and quote
6. **CTASection** - Final call-to-action with primary button

### Card Components
1. **StatCard** - Display individual statistics with value, label, and description
2. **FeatureCard** - Display individual features with icon, title, and description

## Custom Theme

The custom theme from the reference HTML has been integrated into `globals.css` using Tailwind v4's `@theme` directive:

### Colors
- Material Design 3 color palette
- Green primary color scheme (#006c49)
- Light and dark mode support
- Surface variants and container colors

### Spacing
- `stack-lg`: 48px
- `stack-md`: 24px
- `stack-sm`: 12px
- `gutter`: 32px
- `section-gap`: 120px (desktop), 64px (mobile)
- `container-max`: 1280px
- `margin-mobile`: 20px

### Typography
- Display: 64px
- Headline Large: 48px (desktop), 36px (mobile)
- Headline Medium: 32px
- Headline Small: 24px
- Body Large: 18px
- Body Medium: 16px
- Label Medium: 14px

### Fonts
- Primary: Inter (Google Fonts)
- Mono: JetBrains Mono
- Icons: Material Symbols Outlined

## Benefits of This Structure

1. **Reusability**: Components can be used across all landing pages
2. **Maintainability**: Each component has a single responsibility
3. **Scalability**: Easy to add new pages or sections
4. **Consistency**: Shared header and footer ensure uniform navigation
5. **Type Safety**: All components are TypeScript with proper props
6. **Theme Consistency**: Centralized theme configuration in globals.css

## Next Steps

To further develop the landing pages:

1. **Add actual content** to placeholder sections
2. **Integrate images** for client logos and other visuals
3. **Add form handling** for the contact form
4. **Implement mobile menu** functionality in LandingHeader
5. **Add animations** using the existing tw-animate-css
6. **Create more page-specific sections** as needed
7. **Add SEO metadata** for each page using Next.js metadata API
8. **Implement analytics** tracking for user interactions

## Usage Example

To create a new landing page using the same structure:

```tsx
import { LandingHeader } from '@/components/landing/layout/LandingHeader';
import { LandingFooter } from '@/components/landing/layout/LandingFooter';

export default function NewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        {/* Your page content here */}
      </main>
      <LandingFooter />
    </div>
  );
}
```

All pages share the same navigation and footer, ensuring a consistent user experience across the entire landing site.

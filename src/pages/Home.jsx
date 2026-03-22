import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSnapshot from '../components/home/ServicesSnapshot';
import CredibilitySection from '../components/home/CredibilitySection';
import CTABanner from '../components/home/CTABanner';
import SEO from '../components/shared/SEO';
import { pageSEO, organizationSchema } from '../lib/seo-config';

export default function Home() {
  return (
    <div>
      <SEO {...pageSEO.home} schema={organizationSchema} />
      <HeroSection />
      <ServicesSnapshot />
      <CredibilitySection />
      <CTABanner />
    </div>
  );
}
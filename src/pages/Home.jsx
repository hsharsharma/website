import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSnapshot from '../components/home/ServicesSnapshot';
import CredibilitySection from '../components/home/CredibilitySection';
import CTABanner from '../components/home/CTABanner';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSnapshot />
      <CredibilitySection />
      <CTABanner />
    </div>
  );
}
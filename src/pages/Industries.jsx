import React from 'react';
import { Calculator, Scale, Home as HomeIcon, Gem, Building2 } from 'lucide-react';
import SectionHeading from '../components/shared/SectionHeading';
import IndustrySection from '../components/industries/IndustrySection';
import CTABanner from '../components/home/CTABanner';
import SEO from '../components/shared/SEO';
import { pageSEO } from '../lib/seo-config';

const fivePillars = [
'CDD & KYC Implementation – Verify and onboard clients compliantly',
'Risk Assessment & Profiling – Evaluate and monitor client risk',
'Name Screening – PEP, sanctions, and adverse media checks',
'Transaction Monitoring – Identify and track suspicious activity',
'Reporting (SMR/TTR) – Submit compliant reports to AUSTRAC'];


const industries = [
{
  id: 'accountants',
  icon: Calculator,
  title: 'Accountants',
  intro: 'Practical AML consulting for accounting firms. Ensure Tranche 2 readiness with our KYC/CDD workflows, risk assessment, name screening, and reporting support.',
  highlights: fivePillars,
  ctaLabel: 'Download Accountants AML Guide'
},
{
  id: 'lawyers',
  icon: Scale,
  title: 'Lawyers',
  intro: 'AML compliance guidance for law firms, including trust account monitoring, KYC/CDD, name screening, and reporting obligations.',
  highlights: fivePillars,
  ctaLabel: 'Download Lawyers AML Guide'
},
{
  id: 'conveyancers',
  icon: HomeIcon,
  title: 'Conveyancers',
  intro: 'AML compliance for property transactions. Smooth KYC/CDD, risk assessment, name screening, and reporting for conveyancers.',
  highlights: fivePillars,
  ctaLabel: 'Download Conveyancers AML Guide',
  specialFeatures: ['Delayed CDD Workflows: Keep deals moving. Our platform manages AUSTRAC\'s "Delayed CDD" provisions, allowing you to proceed with time-sensitive property transactions legally while completing verification workflows within the permitted timeframes.']
},
{
  id: 'jewelers',
  icon: Gem,
  title: 'Jewelers & Bullion Dealers',
  intro: 'AML consulting for high-value goods, including KYC/CDD onboarding, name screening, and suspicious transaction monitoring.',
  highlights: fivePillars,
  ctaLabel: 'Download Jewellers & Bullion Guide'
},
{
  id: 'real-estate',
  icon: Building2,
  title: 'Real Estate Agents',
  intro: 'Lead AML provides AML consulting for real estate agents, ensuring smooth compliance with Tranche 2 reforms. From KYC/CDD onboarding to reporting, we help property professionals manage risks and stay audit-ready.',
  highlights: fivePillars,
  ctaLabel: 'Download Real Estate Agents AML Guide',
  specialFeatures: ['Delayed CDD Workflows: Keep deals moving with AUSTRAC\'s "Delayed CDD" provisions for time-sensitive property transactions while completing verification within permitted timeframes.']
}];


export default function Industries() {
  return (
    <div>
      <SEO {...pageSEO.industries} />
      <section className="bg-[#2D4059] pt-8 md:pt-20 pb-4 md:pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="Industries"
            title="AML Solutions Tailored to Your Industry"
            description="We understand that each profession has unique compliance requirements. Our industry-specific solutions ensure you meet Tranche 2 obligations with confidence." />

        </div>
      </section>

      <section className="bg-[#243452] pb-8 md:pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative">
          {industries.map((industry, index) =>
          <IndustrySection
            key={industry.id}
            {...industry}
            reversed={index % 2 !== 0} />

          )}
        </div>
      </section>

      <CTABanner />
    </div>);

}
import React from 'react';
import { Gem } from 'lucide-react';
import SectorPage from '../../components/sectors/SectorPage';

const config = {
  seo: {
    title: 'AML Compliance for Jewellers & Bullion | Lead AML',
    description: 'Protect your high-value transactions. Lead AML offers discreet, fast KYC and compliance software for Australian jewellers and precious metal dealers.',
    keywords: ['AML for jewellers', 'AML for bullion dealers', 'Tranche 2 jewellers', 'precious metals AML compliance', 'AUSTRAC jewellers', 'TTR reporting jewellers'],
    path: '/Sectors/Jewellers',
  },
  hero: {
    sectorName: 'Jewellers & Bullion Dealers',
    label: 'AML for Jewellers & Bullion',
    headline: 'AML Compliance for Jewellers & Precious Metal Dealers',
    subheadline: 'Protect your business from illicit funds. Lead AML provides simple, point-of-sale KYC tools and automated threshold reporting for high-value transactions.',
    guideLabel: 'Download Jewellers AML Guide',
    guideName: 'Jewellers & Bullion Dealers AML Compliance Guide',
    guideKey: 'jewelers_bullion',
  },
  obligationsSection: {
    title: 'The $10,000 Threshold: Know Your Obligations',
    intro: 'Dealers in precious metals, stones, and products are highly vulnerable to criminal exploitation because these items retain value and are easily transported. From 1 July 2026, your business must have an AML/CTF program in place if you accept $10,000 or more in physical currency (cash) or virtual assets for a purchase or sale.',
    bullets: [
      'This applies to a single transaction or several linked transactions — known as "structuring".',
      'Submit mandatory Threshold Transaction Reports (TTRs) to AUSTRAC for any cash dealings over $10,000.',
      'Conduct CDD on customers before completing high-value transactions.',
      'Screen customers against PEP, sanctions, and adverse media lists.',
      'Monitor for structuring — splitting payments to avoid the $10,000 threshold.',
      'File Suspicious Matter Reports (SMRs) for any unusual or suspicious activity.',
    ],
    highlight: {
      variant: 'amber',
      title: 'Structuring is Illegal',
      body: 'Structuring means splitting a transaction into smaller amounts to avoid the $10,000 TTR threshold. It is a serious criminal offence. Lead AML automatically detects structuring patterns across linked transactions.',
    },
  },
  risksSection: {
    title: 'Simple Compliance at the Point of Sale',
    intro: "You don't want compliance paperwork slowing down a major sale. Lead AML provides a streamlined platform tailored for high-value retail and bullion dealing — so your team can verify, screen, and report without disrupting the customer experience.",
  },
  howWeHelpSection: {
    title: 'How Lead AML Helps Your Business',
    intro: null,
    bullets: [
      'Structuring & Linked Transaction Alerts: Our platform monitors for customers attempting to split payments over several days to avoid the $10,000 reporting threshold.',
      'Automated TTR Reporting: Never miss a deadline. Our system helps you track and submit mandatory Threshold Transaction Reports (TTRs) to AUSTRAC for any cash dealings over $10,000.',
      'Fast Individual Onboarding: At the request of industry peak bodies, AUSTRAC\'s jeweller framework is streamlined for individual customers. Our mobile-friendly KYC tools verify identities in seconds right at the counter.',
      'Scrap Metal & Supply Chain Risk: We help you implement specific controls to mitigate the high risks associated with scrap metal dealers and counterfeit goods.',
    ],
  },
};

export default function JewellersSector() {
  return <SectorPage {...config} icon={Gem} />;
}

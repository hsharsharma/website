import React from 'react';
import { Home as HomeIcon } from 'lucide-react';
import SectorPage from '../../components/sectors/SectorPage';

const config = {
  seo: {
    title: 'AML Compliance for Conveyancers | Lead AML',
    description: "Don't let Tranche 2 red tape delay your property transfers. Lead AML provides fast KYC onboarding, Delayed CDD workflows, and automated risk profiling for conveyancing practices.",
    keywords: ['AML for conveyancers', 'conveyancer AML compliance', 'Tranche 2 conveyancers', 'AUSTRAC conveyancers', 'delayed CDD conveyancing', 'KYC property settlement'],
    path: '/Sectors/Conveyancers',
  },
  hero: {
    sectorName: 'Conveyancers',
    label: 'AML for Conveyancers',
    headline: 'AML Compliance for Conveyancers: Keep Your Settlements Moving',
    subheadline: "Don't let Tranche 2 red tape delay your property transfers. Lead AML provides fast KYC onboarding, Delayed CDD workflows, and automated risk profiling for conveyancing practices.",
    guideLabel: 'Download Conveyancers AML Guide',
    guideName: 'Conveyancers AML Compliance Guide',
    guideKey: 'conveyancers',
  },
  obligationsSection: {
    title: 'Real Estate Transfers Are Under the Spotlight',
    intro: 'From 1 July 2026, conveyancers must have a fully operational AML/CTF program in place before assisting in the planning or execution of any real estate transaction. Because high-value property transfers are a primary vehicle for laundering illicit funds, the regulatory scrutiny on settlement agents is intense.',
    bullets: [
      'Enrol with AUSTRAC and establish a compliant AML/CTF program before 1 July 2026.',
      'Conduct Customer Due Diligence (CDD) on all buyers, sellers, and counterparties.',
      'Apply enhanced due diligence for high-risk or unfinanced transactions.',
      'Manage Delayed CDD workflows for time-sensitive settlements.',
      'File Suspicious Matter Reports (SMRs) with full anti-tipping-off protections.',
      'Maintain all records securely for the mandatory 7-year period.',
    ],
    highlight: {
      variant: 'blue',
      title: 'Delayed CDD: Keep Deals Moving',
      body: "AUSTRAC allows conveyancers to delay full identity verification on counterparties in certain circumstances. Lead AML's platform automates these complex legal rules — so you stay compliant without stalling settlements.",
    },
  },
  risksSection: {
    title: 'The Lead AML Advantage for Conveyancers',
    intro: "AUSTRAC allows for specific operational exemptions to keep property transactions moving, but these must be strictly documented. Lead AML's software automates these complex rules — so you focus on settlements, not paperwork.",
  },
  howWeHelpSection: {
    title: 'Purpose-Built for Conveyancing Practices',
    intro: null,
    bullets: [
      'Delayed CDD Workflows: In fast-paced transactions, our platform legally manages "Delayed CDD", allowing you to delay full identity verification on counterparties until after contracts are exchanged (or before settlement), keeping deals on track.',
      'Third-Party Verification Arrangements: Work seamlessly with real estate agents. Our platform manages the required "Request to Verify Information" forms so you can legally rely on CDD collected by other reporting entities without duplicating effort.',
      'Targeted Risk Profiling: Automatically flag high-risk transactions, such as unfinanced purchases over $1.5 million, the use of physical cash over $50,000, or the use of virtual assets.',
      'Automated Name Screening: Instant PEP and adverse media checks for all parties on the property title.',
    ],
  },
};

export default function ConveyancersSector() {
  return <SectorPage {...config} icon={HomeIcon} />;
}

import React from 'react';
import { Building2 } from 'lucide-react';
import SectorPage from '../../components/sectors/SectorPage';

const config = {
  seo: {
    title: 'AML Compliance for Real Estate Agents | Lead AML',
    description: 'Tailored AUSTRAC Tranche 2 compliance software and consulting for Australian real estate agents. Verify buyers, sellers, and manage risk seamlessly.',
    keywords: ['AML for real estate agents', 'AML real estate Australia', 'Tranche 2 real estate', 'AUSTRAC real estate compliance', 'KYC real estate agents', 'delayed CDD real estate'],
    path: '/Sectors/RealEstate',
  },
  hero: {
    sectorName: 'Real Estate Agents',
    label: 'AML for Real Estate',
    headline: 'AML Compliance for Real Estate Agents: List and Sell with Confidence',
    subheadline: 'Tranche 2 is coming to the property market. Lead AML provides custom risk assessments, mobile KYC tools, and automated screening so your agents can focus on selling.',
    guideLabel: 'Download Real Estate AML Guide',
    guideName: 'Real Estate Agents AML Compliance Guide',
    guideKey: 'real_estate',
  },
  obligationsSection: {
    title: 'The Property Market is Changing: 1 July 2026',
    intro: 'Real estate is considered a "very high and stable" vulnerability for money laundering in Australia. From 1 July 2026, real estate agents and buyer\'s agents must be enrolled with AUSTRAC and have an active AML/CTF program in place before brokering the purchase, sale, or transfer of any property.',
    bullets: [
      'Your obligations cover both the buyer and the seller in every transaction.',
      'Enrol with AUSTRAC and have a compliant AML/CTF program before 1 July 2026.',
      'Conduct CDD on all vendors and purchasers before brokering any transaction.',
      'Apply enhanced due diligence for high-value, offshore, or trust-structured buyers.',
      'Manage Delayed CDD — including specific auction provisions up to 15 days post-exchange.',
      'Report suspicious transactions to AUSTRAC via SMRs.',
      'Maintain all records for the mandatory 7-year period.',
    ],
    highlight: {
      variant: 'blue',
      title: 'Auction-Ready Delayed CDD',
      body: "Don't let compliance kill an auction. AUSTRAC's Delayed CDD provision allows you to delay full counterparty verification until up to 15 days after the exchange of contracts. Lead AML manages this automatically.",
    },
  },
  risksSection: {
    title: "How Lead AML Streamlines Agency Operations",
    intro: "Implementing compliance manually using AUSTRAC's 80+ page starter kits is a massive burden that takes your agents away from listing and selling. Lead AML digitises the entire process — so your team spends time with clients, not paperwork.",
  },
  howWeHelpSection: {
    title: 'Built for Real Estate Agencies',
    intro: null,
    bullets: [
      'Mobile-Friendly Vendor & Buyer KYC: Fast, template-driven identity verification workflows that your salespeople can use on the go — at the property, in the office, or at auction.',
      'Auction-Ready Delayed CDD: Our platform manages AUSTRAC\'s "Delayed CDD" provisions, allowing you to delay full counterparty verification until up to 15 days after the exchange of contracts.',
      'Unpacking Trusts & Offshore Buyers: Automatically trace the Ultimate Beneficial Owners (UBOs) behind complex family trusts, self-managed super funds (SMSFs), and offshore shell companies purchasing real estate.',
      'Real-Time Risk Alerts: Instantly flag high-risk scenarios, such as unfinanced purchases over $1.5 million or attempts to pay deposits with large sums of physical cash.',
      'Audit-Ready Record Keeping: Ensure every ID check, PEP screen, and risk assessment is securely logged in the cloud for the mandatory 7-year period.',
    ],
  },
};

export default function RealEstateSector() {
  return <SectorPage {...config} icon={Building2} />;
}

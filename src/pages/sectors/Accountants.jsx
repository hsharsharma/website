import React from 'react';
import { Calculator } from 'lucide-react';
import SectorPage from '../../components/sectors/SectorPage';

const config = {
  seo: {
    title: 'AML Compliance for Accountants | Lead AML Australia',
    description: 'Streamline client onboarding and AUSTRAC reporting. Lead AML provides Tranche 2 compliance tools and consulting specifically for accounting firms.',
    keywords: ['AML for accountants', 'AML accountants Australia', 'Tranche 2 accountants', 'AUSTRAC accountants', 'accounting firm AML compliance', 'KYC for accountants'],
    path: '/Sectors/Accountants',
  },
  hero: {
    sectorName: 'Accountants',
    label: 'AML for Accountants',
    headline: 'AML Compliance for Accountants: Tranche 2 Ready',
    subheadline: 'Protect your practice from regulatory fines and reputational damage. Lead AML provides custom risk assessments, compliance programs, and automated KYC tools designed specifically for Australian accounting firms.',
    guideLabel: 'Download Accountants AML Guide',
    guideName: 'Accountants AML Compliance Guide',
    guideKey: 'accountants',
  },
  obligationsSection: {
    title: 'The 1 July 2026 Deadline: Are You Captured?',
    intro: 'From 1 July 2026, accountants providing specific "designated services" will be regulated under the expanded AML/CTF Act. AUSTRAC has identified the accounting sector as having a "high and stable vulnerability" to money laundering because criminals actively seek out financial expertise to distance themselves from illicit funds. You are legally required to comply if your practice assists clients with:',
    bullets: [
      'Creating or restructuring companies or trusts.',
      'Buying or selling a body corporate or legal arrangement.',
      'Managing client funds, accounts, or virtual assets.',
      'Providing a registered office or principal place of business.',
      'Acting as a nominee shareholder, director, or trustee.',
    ],
  },
  risksSection: {
    title: 'The Risks Your Practice Faces',
    intro: 'Criminals use professional services to create "effective anonymity". Your team must be trained to identify red flags such as complex ownership structures with no commercial logic, offshore shell companies, and "loan-back schemes" where illicit funds are disguised as legitimate loans.',
  },
  howWeHelpSection: {
    title: 'How Lead AML Helps Accounting Firms',
    intro: "Lead AML provides an automated, cloud-based platform and expert advisory services tailored for accounting firms:",
    bullets: [
      'Complex Entity Unpacking: Automate Customer Due Diligence (CDD) to easily trace and verify Ultimate Beneficial Owners (UBOs) across complex trust and company structures.',
      'Custom Risk Assessments: We build your program based on your exact services, correctly risk-scoring clients based on AUSTRAC methodologies.',
      'Automated Watchlist Screening: Instant, "fuzzy matching" background checks against global Sanctions and Politically Exposed Persons (PEP) lists.',
      'Audit-Ready Record Keeping: Secure, 7-year cloud storage of all CDD documents, SMRs, and risk assessments.',
    ],
  },
};

export default function AccountantsSector() {
  return <SectorPage {...config} icon={Calculator} />;
}

import React from 'react';
import { Scale } from 'lucide-react';
import SectorPage from '../../components/sectors/SectorPage';

const config = {
  seo: {
    title: 'AML/CTF Compliance for Law Firms | Lead AML',
    description: 'Secure AML software and expert advisory for Australian law firms. Meet your Tranche 2 obligations, conduct KYC, and protect your practice effortlessly.',
    keywords: ['AML for law firms', 'AML for lawyers', 'Tranche 2 lawyers', 'legal AML compliance', 'AUSTRAC lawyers', 'KYC for law firms'],
    path: '/Sectors/Lawyers',
  },
  hero: {
    sectorName: 'Lawyers & Legal Professionals',
    label: 'AML for Law Firms',
    headline: 'Streamlined AML Compliance for Australian Law Firms',
    subheadline: 'Navigate Tranche 2 obligations without compromising client confidentiality. Lead AML provides secure, tailored compliance frameworks and KYC tools for legal professionals.',
    guideLabel: 'Download Lawyers AML Guide',
    guideName: 'Lawyers AML Compliance Guide',
    guideKey: 'lawyers',
  },
  obligationsSection: {
    title: 'New Obligations for Legal Professionals',
    intro: 'From 1 July 2026, legal professionals will be captured under Tranche 2 of the AML/CTF Act if they provide specific designated services. The new laws mandate strict Customer Due Diligence (CDD) and reporting requirements, while still providing clear protections for information subject to Legal Professional Privilege (LPP). Your firm must enrol with AUSTRAC if you assist clients with:',
    bullets: [
      'Buying, selling, or transferring real estate or legal arrangements.',
      'Receiving, holding, or managing client property, including transit money on escrow.',
      'Organising equity or debt financing.',
      'Creating or restructuring companies or trusts.',
    ],
  },
  risksSection: {
    title: 'Secure Compliance Without Compromising Confidentiality',
    intro: 'Law firms cannot rely on generic, one-size-fits-all compliance templates. Lead AML combines decades of international regulatory expertise with secure technology — built with Legal Professional Privilege protections in mind so your obligations and your client relationships remain intact.',
  },
  howWeHelpSection: {
    title: 'How Lead AML Protects Your Firm',
    intro: null,
    bullets: [
      'Trust Account Monitoring: Monitor the flow of transit and escrow funds to identify suspicious anomalies before they become regulatory breaches.',
      'Frictionless Client Onboarding: Secure, template-driven identity verification workflows for individuals, body corporates, and complex trusts.',
      'Integrated PEP & Sanctions Checks: Automate your name screening against DFAT sanctions and PEP lists directly during your client intake process.',
      'Confidential Reporting: Expert guidance on filing Suspicious Matter Reports (SMRs) while navigating tipping-off prohibitions and maintaining LPP protections.',
    ],
  },
};

export default function LawyersSector() {
  return <SectorPage {...config} icon={Scale} />;
}

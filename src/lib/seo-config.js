const SITE_URL = 'https://leadaml.com.au';

// Organization schema — appears on every page
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Lead AML',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'Professional AML consulting and compliance tools for accountants, lawyers, conveyancers, jewelers, bullion dealers, and real estate agents in Australia.',
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: ['AML Compliance Consulting', 'KYC/CDD Implementation', 'AML Software', 'Tranche 2 Compliance'],
  knowsAbout: ['Anti-Money Laundering', 'AML/CTF Act', 'Tranche 2', 'AUSTRAC', 'KYC', 'CDD', 'Risk Assessment'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@leadaml.com.au',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
};

// FAQ schema for the FAQ page
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Tranche 2 AML compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Tranche 2 AML compliance refers to the expansion of Australia's Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) Act to capture specific professional services including accountants, lawyers, conveyancers, real estate agents, and dealers in precious metals and stones. The reforms take effect on 1 July 2026.",
      },
    },
    {
      '@type': 'Question',
      name: 'When does Tranche 2 officially come into effect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The new Tranche 2 AML/CTF laws will officially come into effect on 1 July 2026. The AUSTRAC enrolment window opens on 31 March 2026, and you must complete your enrolment by 29 July 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which professional services are captured under Tranche 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professionals including accountants, lawyers, conveyancers, real estate agents, jewelers, and bullion dealers who provide specific designated services are captured under Tranche 2 AML obligations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to re-onboard all my existing clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do not need to immediately conduct full CDD on pre-commencement customers. However, you must perform full CDD if they request a new designated service, if there is a material change increasing their risk profile, or if you need to file a Suspicious Matter Report.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do all industries need transaction monitoring?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all regulated entities must conduct ongoing customer due diligence including monitoring transactions for suspicious activity. Robust transaction monitoring is particularly critical for bullion dealers, jewellers, and professionals operating trust accounts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does Lead AML provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lead AML provides expert AML consulting to build your compliance program including risk assessments, policies, and staff training. We also provide a cloud-based compliance platform that automates KYC onboarding, risk scoring, name screening, transaction monitoring, and reporting.',
      },
    },
  ],
};

// Service schema for Services page
export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@type': 'ProfessionalService', name: 'Lead AML', url: SITE_URL },
  serviceType: 'AML Compliance Consulting',
  areaServed: { '@type': 'Country', name: 'Australia' },
  description: 'Comprehensive AML consulting services including KYC/CDD implementation, risk assessment, name screening, transaction monitoring, and AUSTRAC reporting for Australian professionals.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AML Compliance Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AML Consulting & Advisory Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Client Onboarding & KYC/CDD Implementation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Risk Assessment & Profiling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Name Screening (PEP, Sanctions, Adverse Media)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transaction Monitoring' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Suspicious Matter Reporting (SMR/TTR)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Staff Training & Personnel Due Diligence' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Audit-Ready Compliance Programs' } },
    ],
  },
};

// Breadcrumb schema generator
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// Per-page SEO configuration
export const pageSEO = {
  home: {
    title: 'AML Compliance Consulting & Software for Australian Professionals',
    description: 'Lead AML provides expert AML consulting, KYC/CDD implementation, and compliance software for accountants, lawyers, conveyancers, real estate agents, and jewelers. Get Tranche 2 ready before 1 July 2026.',
    keywords: [
      'AML compliance Australia', 'Tranche 2 AML', 'AML consulting', 'AML software',
      'AUSTRAC compliance', 'AML for accountants', 'AML for lawyers', 'AML for conveyancers',
      'AML for real estate agents', 'AML for jewelers', 'KYC CDD compliance',
      'anti-money laundering Australia', 'AML/CTF Act', 'Tranche 2 obligations',
    ],
    path: '/',
  },
  industries: {
    title: 'AML Solutions for Accountants, Lawyers, Conveyancers, Real Estate & Jewelers',
    description: 'Industry-specific AML compliance solutions for accountants, lawyers, conveyancers, jewelers, bullion dealers, and real estate agents. Meet Tranche 2 AML obligations with tailored KYC/CDD workflows.',
    keywords: [
      'AML for accountants', 'AML for lawyers', 'AML for conveyancers',
      'AML for real estate agents', 'AML for jewelers', 'AML for bullion dealers',
      'Tranche 2 AML accountants', 'Tranche 2 AML lawyers', 'Tranche 2 AML real estate',
      'Tranche 2 AML conveyancers', 'Tranche 2 AML jewelers',
      'AUSTRAC compliance accountants', 'AUSTRAC compliance lawyers',
      'KYC for accountants', 'CDD for lawyers', 'AML compliance Australia',
    ],
    path: '/Industries',
  },
  services: {
    title: 'AML Consulting Services – KYC, Risk Assessment, Compliance Programs',
    description: 'Comprehensive AML consulting services including KYC/CDD implementation, risk assessment, name screening, transaction monitoring, SMR/TTR reporting, staff training, and audit-ready compliance programs.',
    keywords: [
      'AML consulting services', 'KYC implementation', 'CDD compliance', 'AML risk assessment',
      'name screening PEP sanctions', 'transaction monitoring', 'SMR reporting', 'TTR reporting',
      'AML staff training', 'AML compliance program', 'AUSTRAC reporting',
      'AML audit ready', 'anti-money laundering services Australia',
    ],
    path: '/Services',
  },
  amlTool: {
    title: 'AML Compliance App – Cloud-Based KYC & Risk Management Platform',
    description: 'Cloud-based AML compliance app for automated client onboarding, KYC/CDD tracking, risk profiling, name screening, transaction monitoring, and AUSTRAC reporting. Built for Australian professionals.',
    keywords: [
      'AML compliance software', 'AML app', 'AML tool', 'KYC software', 'CDD software',
      'AML compliance platform', 'risk profiling dashboard', 'name screening tool',
      'transaction monitoring software', 'AUSTRAC reporting tool', 'AML cloud platform',
      'compliance automation', 'AML software Australia', 'AML compliance app',
    ],
    path: '/AMLTool',
  },
  resources: {
    title: 'Free AML Compliance Guides – Tranche 2 Industry Guides',
    description: 'Download free AML compliance guides for accountants, lawyers, conveyancers, jewelers, and real estate agents. Industry-specific Tranche 2 AML guides aligned with AUSTRAC requirements.',
    keywords: [
      'AML compliance guide', 'Tranche 2 AML guide', 'AML guide accountants',
      'AML guide lawyers', 'AML guide conveyancers', 'AML guide real estate',
      'AML guide jewelers bullion', 'free AML guide', 'AUSTRAC compliance guide',
      'AML/CTF compliance guide Australia', 'Tranche 2 compliance guide',
    ],
    path: '/Resources',
  },
  faqs: {
    title: 'AML Compliance FAQs – Tranche 2 Questions Answered',
    description: 'Answers to frequently asked questions about Tranche 2 AML compliance, AUSTRAC obligations, KYC/CDD requirements, and how Lead AML helps accountants, lawyers, and other professionals stay compliant.',
    keywords: [
      'Tranche 2 AML FAQ', 'AML compliance questions', 'AUSTRAC FAQ',
      'when does Tranche 2 start', 'AML obligations Australia',
      'KYC CDD FAQ', 'AML for professionals FAQ', 'Tranche 2 deadline',
    ],
    path: '/FAQs',
  },
  contact: {
    title: 'Book an AML Consultation – Get Tranche 2 Compliance Help',
    description: 'Schedule a free AML consultation with Lead AML experts. Get personalised guidance on Tranche 2 compliance, KYC/CDD implementation, and AML program setup for your business.',
    keywords: [
      'AML consultation', 'book AML demo', 'AML compliance help',
      'Tranche 2 consultation', 'AML expert Australia', 'AUSTRAC compliance help',
    ],
    path: '/Contact',
  },
};

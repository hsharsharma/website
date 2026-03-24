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
    title: 'Lead AML | Tranche 2 Compliance Software & Consulting',
    description: 'Get ready for July 1. Lead AML provides all-in-one AUSTRAC Tranche 2 compliance software, KYC tools, and expert consulting for Australian businesses.',
    keywords: [
      'AML compliance Australia', 'Tranche 2 AML', 'AML consulting', 'AML software',
      'AUSTRAC compliance', 'AML for accountants', 'AML for lawyers', 'AML for conveyancers',
      'AML for real estate agents', 'AML for jewelers', 'KYC CDD compliance',
      'anti-money laundering Australia', 'AML/CTF Act', 'Tranche 2 obligations',
    ],
    path: '/',
  },
  industries: {
    title: 'AML Compliance for Real Estate, Lawyers, Accountants & Jewellers | Lead AML',
    description: 'Tailored AUSTRAC Tranche 2 compliance software and consulting for Australian real estate agents, law firms, accounting firms, and jewellers. Verify clients, manage risk, and stay compliant.',
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
  industryRealEstate: {
    title: 'AML Compliance for Real Estate Agents | Lead AML',
    description: 'Tailored AUSTRAC Tranche 2 compliance software and consulting for Australian real estate agents. Verify buyers, sellers, and manage risk seamlessly.',
    keywords: [
      'AML for real estate agents', 'AML real estate Australia', 'Tranche 2 real estate',
      'AUSTRAC real estate compliance', 'KYC real estate agents', 'CDD real estate',
      'real estate AML software', 'real estate compliance Australia',
    ],
    path: '/Industries#real-estate',
  },
  industryLawyers: {
    title: 'AML/CTF Compliance for Law Firms | Lead AML',
    description: 'Secure AML software and expert advisory for Australian law firms. Meet your Tranche 2 obligations, conduct KYC, and protect your practice effortlessly.',
    keywords: [
      'AML for law firms', 'AML for lawyers', 'Tranche 2 lawyers', 'legal AML compliance',
      'AUSTRAC lawyers', 'KYC for law firms', 'AML/CTF law firms Australia',
      'lawyer compliance software', 'solicitor AML obligations',
    ],
    path: '/Industries#lawyers',
  },
  industryAccountants: {
    title: 'AML Compliance for Accountants | Lead AML Australia',
    description: 'Streamline client onboarding and AUSTRAC reporting. Lead AML provides Tranche 2 compliance tools and consulting specifically for accounting firms.',
    keywords: [
      'AML for accountants', 'AML accountants Australia', 'Tranche 2 accountants',
      'AUSTRAC accountants', 'accounting firm AML compliance', 'KYC for accountants',
      'CDD for accounting firms', 'accountant AML software', 'AML compliance accountants',
    ],
    path: '/Industries#accountants',
  },
  industryJewellers: {
    title: 'AML Compliance for Jewellers & Bullion | Lead AML',
    description: 'Protect your high-value transactions. Lead AML offers discreet, fast KYC and compliance software for Australian jewellers and precious metal dealers.',
    keywords: [
      'AML for jewellers', 'AML for bullion dealers', 'Tranche 2 jewellers',
      'precious metals AML compliance', 'AUSTRAC jewellers', 'KYC jewellers',
      'bullion dealer compliance', 'jeweller AML software Australia',
    ],
    path: '/Industries#jewellers',
  },
  services: {
    title: 'Tranche 2 AML Consulting & Advisory | Lead AML',
    description: 'Need help preparing for AUSTRAC Tranche 2? Our expert AML consultants help Australian businesses build compliant, audit-ready AML/CTF programs.',
    keywords: [
      'AML consulting services', 'KYC implementation', 'CDD compliance', 'AML risk assessment',
      'name screening PEP sanctions', 'transaction monitoring', 'SMR reporting', 'TTR reporting',
      'AML staff training', 'AML compliance program', 'AUSTRAC reporting',
      'AML audit ready', 'anti-money laundering services Australia',
    ],
    path: '/Services',
  },
  amlTool: {
    title: 'AML/CTF Compliance Software | Lead AML Platform',
    description: 'Automate your AUSTRAC Tranche 2 obligations. The Lead AML platform streamlines KYC, customer due diligence, and risk assessments in one secure dashboard.',
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

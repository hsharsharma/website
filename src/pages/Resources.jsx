import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Scale, Home as HomeIcon, Gem, Building2, BookOpen, FileText } from 'lucide-react';
import SectionHeading from '../components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import GuideRequestModal from '../components/shared/GuideRequestModal';
import SEO from '../components/shared/SEO';
import { pageSEO } from '../lib/seo-config';

const industryGuides = [
  { icon: Calculator, title: 'Accountants AML Guide', description: 'KYC/CDD, risk profiling, and SMR reporting for accounting firms navigating Tranche 2 obligations.', key: 'guide_accountants', guideKey: 'accountants', guideName: 'Accountants AML Guide' },
  { icon: Scale, title: 'Lawyers AML Guide', description: 'Trust account monitoring, client onboarding, and compliance frameworks for law firms.', key: 'guide_lawyers', guideKey: 'lawyers', guideName: 'Lawyers AML Guide' },
  { icon: HomeIcon, title: 'Conveyancers AML Guide', description: 'Property transaction compliance, risk assessment, and reporting workflows for conveyancers.', key: 'guide_conveyancers', guideKey: 'conveyancers', guideName: 'Conveyancers AML Guide' },
  { icon: Gem, title: 'Jewellers & Bullion AML Guide', description: 'High-value goods compliance, KYC verification, and suspicious transaction monitoring.', key: 'guide_jewelers', guideKey: 'jewelers_bullion', guideName: 'Jewellers & Bullion AML Guide' },
  { icon: Building2, title: 'Real Estate Agents AML Guide', description: 'Property transaction oversight, delayed CDD provisions, and AUSTRAC reporting for real estate professionals.', key: 'guide_real_estate', guideKey: 'real_estate', guideName: 'Real Estate Agents AML Guide' },
];

const outlineBtn = {
  base: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '9999px', border: '1.5px solid #2C3E5D', background: 'transparent',
    color: '#2C3E5D', padding: '0 2rem', height: '2.75rem', fontSize: '0.875rem',
    fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
  },
  hover: { background: '#2C3E5D', color: '#ffffff' },
};

function OutlineButton({ onClick, children, className = '' }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      style={{ ...outlineBtn.base, ...(hovered ? outlineBtn.hover : {}) }}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

export default function Resources() {
  const [pdfMap, setPdfMap] = useState({});
  const [modal, setModal] = useState(null); // { guideName, guideKey, downloadUrl }

  // PDF download URLs can be configured via Firebase Storage in the future.
  // pdfMap remains empty; the guide modal will open without a direct download link.

  const openModal = (guideName, guideKey) => {
    setModal({ guideName, guideKey });
  };

  return (
    <div>
      <SEO {...pageSEO.resources} />
      <section className="bg-gray-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            light
            as="h1"
            label="Resources"
            title="Free AML Guides for Your Industry"
            description="Download practical AML guides for accountants, lawyers, conveyancers, jewellers, bullion dealers, and real estate agents. Stay Tranche 2 ready and audit-ready."
          />
        </div>
      </section>

      <section className="hero-gradient pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* SECTION A: Complete AML Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <div className="rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-100/50 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[var(--brand-blue-light)] flex items-center justify-center">
                <FileText className="h-8 w-8 text-[var(--brand-blue)]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-teal)] mb-2">Complete Guide</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Barlow', 'Inter', sans-serif" }}>
                  Complete Tranche 2 AML Guide
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  A comprehensive overview of your AML obligations under Australia's Tranche 2 reforms. Suitable for all business types beginning their compliance journey.
                </p>
                <OutlineButton onClick={() => openModal('Complete Tranche 2 AML Guide', 'general')}>
                  Get the Complete AML Guide
                </OutlineButton>
              </div>
            </div>
          </motion.div>

          {/* SECTION B: Industry-Specific Guides */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8 max-w-5xl mx-auto">
              <BookOpen className="h-5 w-5 text-[var(--brand-blue)]" />
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Barlow', 'Inter', sans-serif" }}>
                Industry-Specific AML Guides
              </h2>
            </div>

            {/* 5 cards: use a centered flex-wrap layout so last row is centered */}
            <div className="flex flex-wrap justify-center gap-5 max-w-5xl mx-auto">
              {industryGuides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center mb-4">
                    <guide.icon className="h-5 w-5 text-[var(--brand-blue)]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                  <p className="text-sm text-[var(--brand-slate-light)] leading-relaxed mb-5 flex-1">{guide.description}</p>
                  <OutlineButton onClick={() => openModal(guide.guideName, guide.guideKey)} className="w-full">
                    Get Guide
                  </OutlineButton>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {modal && (
        <GuideRequestModal
          open={!!modal}
          onClose={() => setModal(null)}
          guideName={modal.guideName}
          guideKey={modal.guideKey}
          pageSource="Resources Page"
        />
      )}
    </div>
  );
}
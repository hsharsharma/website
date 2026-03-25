import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SectionHeading from '../components/shared/SectionHeading';
import FeatureGrid from '../components/tool/FeatureGrid';
import CTAButtons from '../components/shared/CTAButtons';
import CTABanner from '../components/home/CTABanner';
import SEO from '../components/shared/SEO';
import { pageSEO } from '../lib/seo-config';
export default function AMLTool() {
  return (
    <div>
      <SEO {...pageSEO.amlTool} />
      <section className="bg-gray-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            light
            as="h1"
            label="AML App"
            title="AML Compliance Made Simple"
            description="A cloud-based compliance platform designed for accountants, lawyers, conveyancers, jewelers, and bullion dealers. Automate your AML workflows and stay audit-ready."
          />
        </div>
      </section>

      <section className="hero-gradient pt-10 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-16">
            <Link to={createPageUrl('Contact')}>
              <img
                src="/aml-compliance-app-lead-aml.png"
                alt="Lead AML compliance app dashboard showing transaction monitoring, due diligence, namescreening, and AML document management"
                className="w-full rounded-2xl shadow-2xl shadow-gray-300/30 cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          <FeatureGrid />

        </div>
      </section>

      <CTABanner />
    </div>
  );
}
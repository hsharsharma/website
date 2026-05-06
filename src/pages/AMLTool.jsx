import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
            label="Lead AML App"
            title="AML Compliance Made Simple"
            description="A cloud-based compliance platform designed for accountants, lawyers, conveyancers, jewelers, and bullion dealers. Automate your AML workflows and stay audit-ready."
          />
        </div>
      </section>

      <section className="hero-gradient pt-10 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-8">
            <Link to={createPageUrl('Contact')}>
              <img
                src="/aml-compliance-app-lead-aml.png"
                alt="Lead AML compliance app dashboard showing transaction monitoring, due diligence, namescreening, and AML document management"
                className="w-full rounded-2xl shadow-2xl shadow-gray-300/30 cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Try it CTA */}
          <div className="max-w-5xl mx-auto mb-16 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 border border-gray-200 rounded-2xl px-7 py-5">
            <p className="text-[#2C3E5D] font-medium text-base">
              Try it — no obligation.{' '}
              <span className="text-gray-500 font-normal">Register and use.</span>
            </p>
            <a
              href="https://app.leadaml.com.au/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2C3E5D] text-white hover:bg-[#1e2d45] rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              Register Free <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <FeatureGrid />

        </div>
      </section>

      <CTABanner />
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/shared/SectionHeading';
import FeatureGrid from '../components/tool/FeatureGrid';
import CTAButtons from '../components/shared/CTAButtons';
import CTABanner from '../components/home/CTABanner';
import SEO from '../components/shared/SEO';
import { pageSEO } from '../lib/seo-config';
import { Monitor } from 'lucide-react';

export default function AMLTool() {
  return (
    <div>
      <SEO {...pageSEO.amlTool} />
      <section className="hero-gradient pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            as="h1"
            label="AML Tool"
            title="AML Compliance Made Simple"
            description="A cloud-based compliance platform designed for accountants, lawyers, conveyancers, jewelers, and bullion dealers. Automate your AML workflows and stay audit-ready."
          />

          {/* Tool Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl shadow-gray-300/30 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50" />
              <div className="text-center relative">
                <Monitor className="h-16 w-16 text-[var(--brand-blue)] mx-auto mb-4 opacity-60" />
                <p className="text-gray-400 text-sm">Interactive tool preview coming soon</p>
                <p className="text-gray-500 text-xs mt-1">Book a demo to see it in action</p>
              </div>
            </div>
          </motion.div>

          <FeatureGrid />

          <div className="flex justify-center mt-12">
            <CTAButtons />
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
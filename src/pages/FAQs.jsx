import React from 'react';
import SectionHeading from '../components/shared/SectionHeading';
import FAQAccordion from '../components/faqs/FAQAccordion';
import CTABanner from '../components/home/CTABanner';

export default function FAQs() {
  return (
    <div>
      <section className="hero-gradient pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            label="FAQs"
            title="Frequently Asked Questions"
            description="Answers to common questions about AML compliance, Tranche 2, and how Lead AML can help your business."
          />
          <FAQAccordion />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
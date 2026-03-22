import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Shield } from 'lucide-react';
import SectionHeading from '../components/shared/SectionHeading';
import DemoForm from '../components/contact/DemoForm';
import SEO from '../components/shared/SEO';
import { pageSEO } from '../lib/seo-config';

export default function Contact() {
  return (
    <div>
      <SEO {...pageSEO.contact} />
      <section className="hero-gradient pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            as="h1"
            label="Get Started"
            title="Schedule Your AML Consultation"
            description="Talk to our experts and see how Lead AML can simplify compliance for your business and meet Tranche 2 obligations."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-[var(--brand-teal)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Free Consultation</h3>
                  <p className="text-sm text-blue-200/80">30-minute no-obligation session with an AML expert to discuss your compliance needs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-[var(--brand-teal)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Tranche 2 Ready</h3>
                  <p className="text-sm text-blue-200/80">Get ahead of compliance requirements with practical, industry-specific guidance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-[var(--brand-teal)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Quick Response</h3>
                  <p className="text-sm text-blue-200/80">We'll get back to you within 24 hours to confirm your consultation time.</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-100/50 p-8 md:p-10">
                <DemoForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
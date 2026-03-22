import React from 'react';
import { motion } from 'framer-motion';
import CTAButtons from '../shared/CTAButtons';

export default function CTABanner() {
  return (
    <section className="py-10 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br from-[var(--brand-navy)] to-[#1a3a5c] p-7 md:p-16 overflow-hidden">

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Barlow', 'Inter', sans-serif" }}>
              Ready to Get Compliant?
            </h2>
            <p className="text-[#2D4059] mb-3 text-lg">Book a free 15-minute consultation or download a free industry guide to get started.

            </p>
            <p className="text-[#2D4059] mb-8 text-sm">Tranche 2 obligations take effect from 1 July 2026 — start your compliance journey today.</p>
            <CTAButtons className="justify-center" />
          </div>
        </motion.div>
      </div>
    </section>);

}
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Clock, Users, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: Globe, value: 'Global', label: 'International Expertise', desc: 'Serving clients across multiple jurisdictions' },
  { icon: Clock, value: 'Decades', label: 'Of AML Experience', desc: 'Deep expertise in AML/CTF compliance' },
  { icon: Users, value: 'Multinational', label: 'Financial Institutions', desc: 'Experience in major banks and regulators' },
  { icon: ShieldCheck, value: 'Tranche 2', label: 'Ready & Compliant', desc: 'Prepared for July 2026 obligations' },
];

export default function CredibilitySection() {
  return (
    <section className="py-24 bg-[#243452] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 bg-white/10 text-blue-200 border border-white/20">
            Why Lead AML
          </span>
          <p className="text-2xl md:text-3xl font-semibold text-white/90 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "'Barlow', 'Inter', sans-serif" }}>
            "Delivered by AML experts with{' '}
            <span className="text-[var(--brand-teal)]">decades of international experience</span>{' '}
            in multinational financial institutions."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--brand-teal)]/10 border border-[var(--brand-teal)]/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-[var(--brand-teal)]" />
              </div>
              <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-blue-200 mb-1">{stat.label}</p>
              <p className="text-xs text-blue-200/80">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
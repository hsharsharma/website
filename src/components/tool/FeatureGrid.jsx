import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, BarChart3, FileText, Bell, Cloud, CheckCircle2, Search, Activity, Users, Clock } from 'lucide-react';

const features = [
  { icon: UserCheck, title: 'Automated Client Onboarding', description: 'KYC/CDD tracking with guided workflows and document verification.' },
  { icon: Users, title: 'Pre-Commencement Client Management', description: 'Seamlessly manage existing clients. Only triggers new CDD workflows when legally required by a change in service or risk profile—saving time and protecting client relationships.' },
  { icon: Clock, title: 'Delayed CDD Workflows', description: "Keep deals moving. Manages AUSTRAC's \"Delayed CDD\" provisions for time-sensitive property transactions while completing verification within permitted timeframes." },
  { icon: BarChart3, title: 'Risk Profiling Dashboards', description: 'Visual risk assessment with alerts and real-time monitoring.' },
  { icon: Search, title: 'Name Screening', description: 'PEP, sanctions, and adverse media checks integrated into onboarding workflows.' },
  { icon: Activity, title: 'Transaction Monitoring', description: 'Identify and track suspicious transactions with automated alerts and templates.' },
  { icon: FileText, title: 'Secure Reporting (SMR/TTR)', description: 'Confidential SMR/TTR reporting with secure staff escalation workflows and anti-tipping-off protections.' },
  { icon: Bell, title: 'Compliance Reminders', description: 'Automated reminders for reviews, renewals, and reporting deadlines.' },
  { icon: Cloud, title: 'Secure Cloud Platform', description: 'Bank-grade security with encrypted data storage and access controls.' },
  { icon: CheckCircle2, title: 'Audit-Ready Records', description: '7-year compliant record keeping with full audit trail logging.' },
];

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;
  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-7 rounded-2xl bg-white border border-gray-100 transition-all duration-500 w-full sm:w-[calc(50%-12px)]"
      style={{ boxShadow: hovered ? '0 20px 40px rgba(74,144,226,0.1)' : 'none', borderColor: hovered ? 'rgba(74,144,226,0.2)' : '' }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
        style={{ background: hovered ? '#4A90E2' : '#E8F1FC' }}
      >
        <Icon className="h-5 w-5 transition-colors duration-300" style={{ color: hovered ? '#ffffff' : '#4A90E2' }} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1.5">{feature.title}</h3>
      <p className="text-sm text-[var(--brand-slate-light)] leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export default function FeatureGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
}

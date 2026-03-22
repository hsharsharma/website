import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, BarChart3, FileText, Bell, Cloud, CheckCircle2, Search, Activity, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: UserCheck,
    title: 'Automated Client Onboarding',
    description: 'KYC/CDD tracking with guided workflows and document verification.'
  },
  {
    icon: Users,
    title: 'Pre-Commencement Client Management',
    description: 'Seamlessly manage existing clients. Only triggers new CDD workflows when legally required by a change in service or risk profile—saving time and protecting client relationships.'
  },
  {
    icon: Clock,
    title: 'Delayed CDD Workflows',
    description: 'Keep deals moving. Manages AUSTRAC\'s "Delayed CDD" provisions for time-sensitive property transactions while completing verification within permitted timeframes.'
  },
  {
    icon: BarChart3,
    title: 'Risk Profiling Dashboards',
    description: 'Visual risk assessment with alerts and real-time monitoring.'
  },
  {
    icon: Search,
    title: 'Name Screening',
    description: 'PEP, sanctions, and adverse media checks integrated into onboarding workflows.'
  },
  {
    icon: Activity,
    title: 'Transaction Monitoring',
    description: 'Identify and track suspicious transactions with automated alerts and templates.'
  },
  {
    icon: FileText,
    title: 'Secure Reporting (SMR/TTR)',
    description: 'Confidential SMR/TTR reporting with secure staff escalation workflows and anti-tipping-off protections.'
  },
  {
    icon: Bell,
    title: 'Compliance Reminders',
    description: 'Automated reminders for reviews, renewals, and reporting deadlines.'
  },
  {
    icon: Cloud,
    title: 'Secure Cloud Platform',
    description: 'Bank-grade security with encrypted data storage and access controls.'
  },
  {
    icon: CheckCircle2,
    title: 'Audit-Ready Records',
    description: '7-year compliant record keeping with full audit trail logging.'
  },
];

export default function FeatureGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-[var(--brand-blue)]/20 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-500 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        >
          <div className="w-11 h-11 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center mb-4 group-hover:bg-[var(--brand-blue)] transition-colors duration-300">
            <feature.icon className="h-5 w-5 text-[var(--brand-blue)] group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1.5">{feature.title}</h3>
          <p className="text-sm text-[var(--brand-slate-light)] leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
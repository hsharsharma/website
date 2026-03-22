import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldAlert, Search, Activity, LayoutDashboard, Users, GraduationCap } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const services = [
  {
    icon: UserCheck,
    title: 'CDD & KYC Implementation',
    description: 'Automated and template-driven verification workflows for smooth, compliant client onboarding.',
    color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Profiling & Monitoring',
    description: 'Identify client and transaction risks with tailored dashboards and real-time monitoring alerts.',
    color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
  },
  {
    icon: Search,
    title: 'Name Screening',
    description: 'PEP, sanctions, and adverse media checks integrated into every client onboarding workflow.',
    color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
  },
  {
    icon: Activity,
    title: 'Transaction Monitoring',
    description: 'Real-time monitoring and reporting for bullion, real estate, and other high-risk industries.',
    color: 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white',
  },
  {
    icon: Users,
    title: 'Personnel Vetting & Training',
    description: 'Automated Personnel Due Diligence (PDD) checks and role-specific, scenario-based staff training modules.',
    color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
  },
  {
    icon: LayoutDashboard,
    title: 'AML Tool Integration',
    description: 'Compliance dashboard with reminders, SMR/TTR templates, and 7-year audit-ready record keeping.',
    color: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white',
  },
];

export default function ServicesSnapshot() {
  return (
    <section className="py-10 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Core Services"
          title="End-to-End AML Compliance"
          description="From client onboarding to personnel vetting and audit-ready record keeping — we cover every pillar of AML compliance for Tranche 2."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-400 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${service.color}`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Users, UserCheck, ShieldAlert, FileWarning, Plug, Archive, GraduationCap, CheckCircle2, Building } from 'lucide-react';
import SectionHeading from '../components/shared/SectionHeading';
import ServiceCard from '../components/services/ServiceCard';
import CTAButtons from '../components/shared/CTAButtons';
import CTABanner from '../components/home/CTABanner';
import SEO from '../components/shared/SEO';
import { pageSEO, servicesSchema } from '../lib/seo-config';

const services = [
{
  icon: Users,
  title: 'AML Consulting & Advisory Services',
  description: 'Tailored industry guidance to navigate AML/CTF obligations. We work alongside your team to build compliance frameworks that fit your business.'
},
{
  icon: UserCheck,
  title: 'Client Onboarding & KYC/CDD Implementation',
  description: 'Efficient workflows for customer identification, verification, and ongoing due diligence. Streamline your onboarding without compliance gaps.'
},
{
  icon: GraduationCap,
  title: 'Personnel Due Diligence (PDD) & Staff Training',
  description: 'Secure your frontline. Automated Personnel Due Diligence checks (including National Criminal History Checks) and role-specific, scenario-based staff training modules to ensure your team is compliant and confident.'
},
{
  icon: ShieldAlert,
  title: 'Risk Assessment & Profiling',
  description: 'Identify and mitigate client risks with structured risk assessment frameworks, profiling dashboards, and continuous monitoring alerts.'
},
{
  icon: FileWarning,
  title: 'Secure Reporting & Confidential Escalations',
  description: 'Secure, confidential SMR/TTR reporting. Empower staff to escalate suspicious matters to your Compliance Officer securely, protecting your business from accidental "tipping-off" offences and providing commercial scripts for safely offboarding high-risk clients.'
},
{
  icon: CheckCircle2,
  title: 'Independent AML Evaluations & Audits',
  description: 'AUSTRAC-mandated independent evaluations every three years. We ensure your AML/CTF program passes flawlessly and offer evaluations for businesses with existing programs.'
},
{
  icon: Building,
  title: 'Governance Frameworks & Leadership Support',
  description: 'Lead from the front. We provide the Governance Frameworks, Board Reporting templates, and Risk Appetite statements senior leaders need to protect their business and personal liability.'
},
{
  icon: Plug,
  title: 'AML App Integration',
  description: 'Compliance software designed for all industries. Automate onboarding, risk profiling, and reporting with our cloud-based platform.'
},
{
  icon: Archive,
  title: 'Audit-Ready Record Keeping',
  description: '7-year compliant records management. Every action logged, every document stored, ready for audit at any time.'
}];


export default function Services() {
  return (
    <div>
      <SEO {...pageSEO.services} schema={servicesSchema} />
      <section className="bg-[#2D4059] pt-8 md:pt-20 pb-10 md:pb-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            as="h1"
            label="Our Services"
            title="Trusted Tranche 2 Compliance"
            description="Lead AML offers comprehensive AML consulting services across industries in Australia. Our Tranche 2-ready solutions cover client onboarding, KYC/CDD, risk profiling, reporting, and audit-ready record keeping, ensuring your business stays compliant with AML/CTF laws." />


          <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-6xl mx-auto mb-8 md:mb-12">
            {services.map((service, index) =>
            <div key={service.title} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <ServiceCard {...service} index={index} />
            </div>
            )}
          </div>

        </div>
      </section>

      <CTABanner />
    </div>);

}
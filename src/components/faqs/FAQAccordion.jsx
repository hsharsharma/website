import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'By when do I need to start to stay compliant?',
    a: 'From 1st July 2026, all new Tranche 2 obligations take effect. It is important to begin preparing your AML compliance program well in advance to ensure you are ready by the deadline.'
  },
  {
    q: 'Are all industry professionals obligated?',
    a: 'No, only professionals providing designated services under AUSTRAC guidelines are required. This includes accountants, lawyers, conveyancers, real estate agents, jewelers, and bullion dealers who provide specific designated services.'
  },
  {
    q: 'What happens to existing clients?',
    a: 'AML obligations apply to new clients onboarding or when existing clients receive designated services again, or go through a material change. You do not need to retrospectively re-onboard all existing clients from scratch.'
  },
  {
    q: 'What is Tranche 2 AML compliance?',
    a: 'Tranche 2 reforms require specific AML measures including KYC/CDD, risk assessment, name screening, transaction monitoring, and reporting. It extends AML/CTF obligations to professional services sectors in Australia.'
  },
  {
    q: 'How does Lead AML help my business?',
    a: 'We provide expert AML consulting and a compliance tool to simplify KYC/CDD, risk profiling, transaction monitoring, and reporting obligations. Our industry-specific guidance ensures you are Tranche 2 ready and audit-ready.'
  },
  {
    q: 'Can I download a guide or book a demo?',
    a: 'Yes, each industry page provides a downloadable guide and demo booking options. Visit the Industries or Resources page to download your free guide, or click "Book a Demo" on any page.'
  },
  {
    q: 'Is transaction monitoring required for all industries?',
    a: 'Primarily for high-risk industries like jewelers and bullion dealers; it may be optional for others depending on your risk assessment outcome. Lead AML can help you determine your obligations based on your specific business activities.'
  },
  {
    q: 'Are the guides Tranche 2 compliant?',
    a: 'Yes, all downloadable guides are aligned with AUSTRAC Tranche 2 AML compliance standards and are regularly updated to reflect the latest regulatory requirements.'
  },
  {
    q: 'When does Tranche 2 officially come into effect?',
    a: 'The new Tranche 2 AML/CTF laws will officially come into effect on 1 July 2026. If your business is captured, you will need to enrol with AUSTRAC. The enrolment window opens on 31 March 2026, and you must complete your enrolment by 29 July 2026, or within 28 days of starting to provide a designated service. How Lead AML helps: Building a compliant AML program, assessing risks, and training staff takes significant time. Lead AML helps you start your preparations early so your business transitions smoothly into the 2026 requirements, keeping you fully compliant and safe from severe regulatory penalties.'
  },
  {
    q: 'Which professional services are captured under Tranche 2?',
    a: 'No, your business is only obligated to comply if you provide specific "designated services" under the legislation. For example, general business or tax advice is not captured. However, professionals like accountants, lawyers, and conveyancers are captured if they manage client funds, act as a nominee shareholder, buy or sell real estate on a client\'s behalf, or create complex legal arrangements like trusts and companies. How Lead AML helps: We offer expert consulting to assess your specific business operations, identify exactly which of your services trigger AML/CTF obligations, and build a framework that fits your specific needs.'
  },
  {
    q: 'Do I need to re-onboard all my existing clients?',
    a: 'You do not need to immediately conduct full Customer Due Diligence (CDD) on clients you were already providing a designated service to before 1 July 2026 (these are known as "pre-commencement customers"). However, you must perform full CDD if they request a new designated service, if there is a material change in your business relationship that increases their risk profile to medium or high, or if you need to file a Suspicious Matter Report (SMR). How Lead AML helps: Lead AML\'s cloud-based compliance tool securely manages your existing client data and simplifies the process of updating risk scores and running CDD workflows whenever a trigger event occurs.'
  },
  {
    q: 'What exactly is Tranche 2 AML compliance?',
    a: 'Tranche 2 AML compliance refers to the expansion of Australia\'s Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) Act to capture specific professional services. Criminals frequently exploit these sectors to launder illicit funds or distance themselves from illegal activities. The reforms will regulate real estate agents, lawyers, conveyancers, accountants, trust and company service providers, and dealers in precious metals and stones. How Lead AML helps: We specialise in Tranche 2 readiness. We provide practical, step-by-step guidance tailored for these newly regulated sectors, ensuring small and medium-sized businesses can meet their legal obligations efficiently.'
  },
  {
    q: 'What services does Lead AML provide?',
    a: 'Lead AML is your complete compliance partner, operating on the philosophy of "AML Done Right". We combine expert consulting with practical technology. First, we do the heavy lifting by creating your custom AML/CTF compliance program, complete with a formal risk assessment, policies, and staff training materials. Second, we provide a simple, affordable cloud-based compliance platform that automates your ongoing daily obligations—such as customer onboarding workflows, Know Your Customer (KYC) documentation, risk scoring, and automatic name screening against sanctions and PEP watchlists.'
  },
  {
    q: 'How can I access your guides and book a consultation?',
    a: 'Absolutely. You can easily download our industry-specific AML compliance guides (available for Accountants, Lawyers, Conveyancers, Real Estate, and Bullion/Jewellers) directly from our website to learn exactly how the laws apply to you and how to prepare. You can also easily book a free 15-minute consultation to discuss your obligations with our experts, or request a demo of our cloud-based AML compliance software.'
  },
  {
    q: 'Do all industries need transaction monitoring?',
    a: 'Yes, all regulated entities must conduct ongoing customer due diligence, which includes monitoring client transactions and behaviour for suspicious activity throughout the business relationship. However, robust transaction monitoring is particularly critical for businesses where high-value transactions regularly occur, such as bullion dealers, jewellers, and professionals operating trust accounts. Additionally, all industries must actively monitor for and report physical cash transactions or cross-border movements of $10,000 or more. How Lead AML helps: Our compliance platform includes built-in transaction monitoring support to help you identify red flags and seamlessly manage your reporting obligations, such as Threshold Transaction Reports (TTR) and Suspicious Matter Reports (SMR).'
  },
  {
    q: 'Are your guides up-to-date with Tranche 2 requirements?',
    a: 'Yes, our downloadable industry guides are designed specifically around the incoming Australian Tranche 2 regulatory framework. They break down the exact steps, risk assessments, and Customer Due Diligence (CDD) procedures small and medium businesses need to implement to be fully compliant ahead of the 1 July 2026 deadline.'
  },
];

export default function FAQAccordion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-100 rounded-xl px-6 data-[state=open]:shadow-lg data-[state=open]:shadow-gray-100/50 data-[state=open]:border-[var(--brand-blue)]/20 transition-all duration-300 bg-white"
          >
            <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-[var(--brand-slate-light)] leading-relaxed pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
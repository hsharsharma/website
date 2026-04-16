import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { Check, X, ArrowRight, Shield, Zap, Star, Users } from 'lucide-react';
import SEO from '../components/shared/SEO';
import ConsultationModal from '../components/home/ConsultationModal';

const plans = [
  {
    id: 'free',
    icon: Shield,
    name: 'Free',
    tagline: 'Try & Build',
    price: '$0',
    period: '',
    gst: '',
    description: 'Explore the platform before committing',
    badge: null,
    highlight: false,
    cta: 'Book a Demo',
    features: [
      { text: 'Basic risk assessment', included: true },
      { text: 'AML program preview', included: true },
      { text: '1 entity', included: true },
      { text: 'No export', included: false },
      { text: 'Automated KYC/KYB', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    id: 'starter',
    icon: Zap,
    name: 'Starter',
    tagline: 'DIY Compliance',
    price: '$49',
    period: '/month',
    gst: '+ GST',
    description: 'For small firms getting started',
    badge: 'Early Adopter Pricing',
    badgeColor: 'bg-amber-100 text-amber-800',
    highlight: false,
    cta: 'Get in Touch',
    features: [
      { text: 'AML program generation + export', included: true },
      { text: 'Full risk assessment & risk rating', included: true },
      { text: 'PEP & sanctions screening', included: true },
      { text: 'Up to 3 entities', included: true },
      { text: 'Industry-specific templates', included: true },
      { text: 'Email support (48–72 hr response)', included: true },
      { text: 'Automated KYC/KYB', included: false },
      { text: 'Multi-client scaling beyond 3 entities', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    id: 'growth',
    icon: Star,
    name: 'Growth',
    tagline: 'Complete Compliance System',
    price: '$119',
    period: '/month',
    gst: '+ GST',
    description: 'Built for ongoing compliance',
    badge: 'Most Popular',
    badgeColor: 'bg-white/20 text-white',
    highlight: true,
    cta: 'Book a Demo',
    subNote: 'Everything you need to operate and scale compliance',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Unlimited entities / clients', included: true },
      { text: 'Automated KYC/KYB integrations', included: true },
      { text: 'Discounted usage-based KYC/KYB pricing', included: true },
      { text: 'Multi-client workflow support', included: true },
      { text: 'Priority support (24 hr response)', included: true },
    ],
  },
  {
    id: 'pro',
    icon: Users,
    name: 'Pro',
    tagline: 'For Growing Firms & Teams',
    price: '$229',
    period: '/month',
    gst: '+ GST',
    description: 'For larger teams and expanding practices',
    badge: null,
    highlight: false,
    cta: 'Talk to Us',
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'Multi-user roles & permissions', included: true },
      { text: 'White-label reports', included: true },
      { text: 'Training modules', included: true },
      { text: 'Priority support (same business day)', included: true },
    ],
  },
];

const faqs = [
  { q: 'Are there setup costs?', a: 'No, there are no setup costs on any plan.' },
  { q: 'Is KYC/KYB included?', a: 'Available in Growth and above with discounted usage-based pricing.' },
  { q: 'Can I start for free?', a: 'Yes, through a guided demo and onboarding conversation.' },
];

function PlanCard({ plan, onDemo, index }) {
  const Icon = plan.icon;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const cardBase = plan.highlight
    ? 'relative bg-gradient-to-b from-[#1e2d45] to-[#2C3E5D] border-2 border-[#4A90E2]/40 shadow-2xl shadow-[#1e2d45]/40 scale-[1.02] z-10'
    : 'relative bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300';

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 24 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`rounded-2xl p-7 flex flex-col transition-all duration-300 ${cardBase}`}
    >
      {/* Badge */}
      {plan.badge && (
        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${plan.badgeColor}`}>
          {plan.badge}
        </span>
      )}
      {!plan.badge && <div className="h-7 mb-4" />}

      {/* Icon + Name */}
      <div className="flex items-center gap-3 mb-1">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-white/15' : 'bg-[#1e2d45]/8 bg-opacity-8'}`}
          style={{ background: plan.highlight ? 'rgba(255,255,255,0.12)' : 'rgba(30,45,69,0.07)' }}>
          <Icon className={`h-4.5 w-4.5 ${plan.highlight ? 'text-[#4A90E2]' : 'text-[#2C3E5D]'}`} style={{ width: '1.125rem', height: '1.125rem' }} />
        </div>
        <div>
          <p className={`font-bold text-base leading-none ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</p>
          <p className={`text-xs mt-0.5 ${plan.highlight ? 'text-blue-200/80' : 'text-gray-400'}`}>{plan.tagline}</p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-5 mb-1 flex items-end gap-1">
        <span className={`text-4xl font-bold tracking-tight ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
        {plan.period && <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-blue-200/70' : 'text-gray-400'}`}>{plan.period}</span>}
      </div>
      {plan.gst && <p className={`text-xs mb-1 ${plan.highlight ? 'text-blue-200/60' : 'text-gray-400'}`}>{plan.gst}</p>}
      <p className={`text-sm mb-6 ${plan.highlight ? 'text-blue-100/80' : 'text-gray-500'}`}>{plan.description}</p>

      {/* CTA */}
      <button
        onClick={onDemo}
        className={`w-full h-11 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 mb-6
          ${plan.highlight
            ? 'bg-white text-[#1e2d45] hover:bg-blue-50 shadow-md'
            : 'bg-[#2C3E5D] text-white hover:bg-[#1e2d45]'
          }`}
      >
        {plan.cta} <ArrowRight className="h-4 w-4" />
      </button>

      {/* Divider */}
      <div className={`border-t mb-5 ${plan.highlight ? 'border-white/10' : 'border-gray-100'}`} />

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {f.included
              ? <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-teal-400' : 'text-teal-500'}`} />
              : <X className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white/20' : 'text-gray-300'}`} />
            }
            <span className={`text-sm leading-snug ${
              f.included
                ? plan.highlight ? 'text-blue-50/90' : 'text-gray-700'
                : plan.highlight ? 'text-white/30 line-through decoration-white/20' : 'text-gray-300 line-through'
            }`}>{f.text}</span>
          </li>
        ))}
      </ul>

      {/* Sub-note */}
      {plan.subNote && (
        <p className="mt-5 text-xs text-blue-200/60 italic">{plan.subNote}</p>
      )}
    </motion.div>
  );
}

export default function Pricing() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div>
      <SEO
        title="Pricing – Lead AML | AML Compliance Software"
        description="Simple, transparent AML compliance software pricing for Australian businesses. No setup costs. Built for Tranche 2 obligations. Plans from $0."
        keywords={['AML software pricing', 'AML compliance cost Australia', 'Tranche 2 software pricing', 'AML platform plans']}
        path="/Pricing"
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-[#1e2d45] pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-block bg-[var(--brand-teal)]/20 text-zinc-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full border border-[var(--brand-teal)]/30 mb-5"
          >
            Platform Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
          >
            Simple, transparent pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-blue-100/80 mb-3"
          >
            No setup costs. No hidden fees.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-blue-100/60 max-w-xl mx-auto"
          >
            Avoid expensive setup fees and ongoing manual work. Lead AML helps you get compliant faster with software built for Australian Tranche 2 obligations.
          </motion.p>

          {/* Value pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mt-7"
          >
            {['$0 setup', 'Built for Tranche 2', 'Training included', 'Save vs. traditional consulting'].map(pill => (
              <span key={pill} className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-100/80">
                {pill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 pt-12 pb-16 md:pt-16 md:pb-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} onDemo={() => setDemoOpen(true)} index={i} />
            ))}
          </div>

          {/* Guided onboarding note */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-sm text-gray-400 mt-8"
          >
            We currently onboard clients through a guided demo to ensure the right fit and setup.{' '}
            <button onClick={() => setDemoOpen(true)} className="text-[#4A90E2] hover:underline font-medium">Book yours →</button>
          </motion.p>
        </div>
      </section>

      {/* ── Consulting Add-ons ────────────────────────────────────────── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#4A90E2] mb-3">Add-ons</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Consulting Add-ons</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">Need expert guidance alongside the platform? Our CAMS-certified consultants are available to support your program.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'AML Program Build',
                desc: 'Full AML/CTF program designed and documented by our consultants — tailored to your industry and AUSTRAC requirements.',
                note: 'One-time engagement',
                cta: 'Get in Touch',
              },
              {
                name: 'Independent Evaluation',
                desc: 'AUSTRAC-mandated independent evaluation of your existing AML/CTF program. Required every 3 years.',
                note: 'Annual / periodic',
                cta: 'Talk to Us',
              },
              {
                name: 'Ongoing Advisory',
                desc: 'Retainer-based advisory for complex matters, SMR guidance, staff training, and board-level reporting support.',
                note: 'Monthly retainer',
                cta: 'Book a Demo',
              },
            ].map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col"
              >
                <span className="text-xs font-medium text-gray-400 mb-2">{addon.note}</span>
                <h3 className="text-base font-bold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{addon.desc}</p>
                <button
                  onClick={() => setDemoOpen(true)}
                  className="w-full h-10 rounded-full border-2 border-[#2C3E5D] text-[#2C3E5D] font-semibold text-sm hover:bg-[#2C3E5D] hover:text-white transition-all duration-200"
                >
                  {addon.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Banner ─────────────────────────────────────────────── */}
      <section className="bg-[#2C3E5D] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/90 text-lg font-medium mb-2">Save thousands compared to traditional AML consulting setup fees.</p>
          <p className="text-blue-200/70 text-sm">Built specifically for Australian Tranche 2 requirements — not a generic compliance template.</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 md:py-16">
        <div className="max-w-2xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xl font-bold text-gray-900 text-center mb-8"
          >
            Common questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-xl border border-gray-100 px-6 py-4"
              >
                <p className="text-sm font-semibold text-gray-900 mb-1">{faq.q}</p>
                <p className="text-sm text-gray-500">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-sm text-gray-400 mt-8"
          >
            More questions?{' '}
            <Link to={createPageUrl('Contact')} className="text-[#4A90E2] hover:underline font-medium">
              Get in touch →
            </Link>
          </motion.p>
        </div>
      </section>

      <ConsultationModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

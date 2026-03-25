import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Calendar, AlertTriangle, Shield, ChevronRight } from 'lucide-react';
import SEO from '../shared/SEO';
import SectionHeading from '../shared/SectionHeading';
import GuideRequestModal from '../shared/GuideRequestModal';
import ConsultationModal from '../home/ConsultationModal';

const HERO_GRADIENT = { background: 'linear-gradient(160deg, #1e2d45 0%, #2C3E5D 40%, #3a5275 100%)' };

/* ─── Highlight / callout box ────────────────────────────────────────────── */
function HighlightBox({ title, body, variant = 'blue' }) {
  const styles = {
    blue: { wrap: 'bg-blue-50 border-blue-100', icon: <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />, title: 'text-blue-900', body: 'text-blue-800' },
    amber: { wrap: 'bg-amber-50 border-amber-100', icon: <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />, title: 'text-amber-900', body: 'text-amber-800' },
  };
  const s = styles[variant] || styles.blue;
  return (
    <div className={`rounded-2xl p-5 flex gap-3 border ${s.wrap}`}>
      {s.icon}
      <div>
        {title && <p className={`font-semibold text-sm mb-1 ${s.title}`}>{title}</p>}
        <p className={`text-sm leading-relaxed ${s.body}`}>{body}</p>
      </div>
    </div>
  );
}

/* ─── Obligations section (light bg + bullet grid) ─────────────────────── */
function ObligationsSection({ title, intro, bullets, highlight }) {
  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading light label="Your Obligations" title={title} description={intro} />
        {bullets && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto mb-6">
            {bullets.map((item, i) => {
              const hasColon = item.includes(':');
              const [bold, rest] = hasColon ? [item.split(':')[0], item.split(':').slice(1).join(':')] : [null, item];
              return (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    {bold ? <><strong className="text-gray-900">{bold}:</strong>{rest}</> : item}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {highlight && <div className="max-w-4xl mx-auto mt-4"><HighlightBox {...highlight} /></div>}
      </div>
    </section>
  );
}

/* ─── Risks / intro section (dark navy, text only) ───────────────────────── */
function RisksSection({ title, intro }) {
  return (
    <section className="py-10 md:py-16 bg-[#243452]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Key Context" title={title} description={intro} />
      </div>
    </section>
  );
}

/* ─── How We Help section (dark navy + white cards grid) ─────────────────── */
function HowWeHelpSection({ title, intro, bullets }) {
  return (
    <section className="py-10 md:py-20" style={HERO_GRADIENT}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="How We Help" title={title} description={intro} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {bullets.map((item, i) => {
            const hasColon = item.includes(':');
            const [bold, rest] = hasColon ? [item.split(':')[0], item.split(':').slice(1).join(':')] : [null, item];
            return (
              <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4A90E2] transition-colors duration-300">
                    <ChevronRight className="h-5 w-5 text-[#4A90E2] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    {bold
                      ? <><p className="font-bold text-gray-900 mb-1 text-sm">{bold}</p><p className="text-gray-500 text-sm leading-relaxed">{rest.trim()}</p></>
                      : <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SectorPage ─────────────────────────────────────────────────────────── */
export default function SectorPage({ seo, hero, obligationsSection, risksSection, howWeHelpSection, icon: Icon }) {
  const [guideOpen, setGuideOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <div>
      <SEO {...seo} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-16 md:pt-20 md:pb-24 relative overflow-hidden" style={HERO_GRADIENT}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-300 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/Industries" className="hover:text-white transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-white">{hero.sectorName}</span>
          </div>

          {/* Label pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            {Icon && <Icon className="h-4 w-4 text-white" />}
            <span className="text-xs font-semibold tracking-widest uppercase text-white">{hero.label}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5 max-w-3xl">
            {hero.headline}
          </h1>
          <p className="text-blue-100/90 text-base md:text-xl leading-relaxed mb-10 max-w-2xl">
            {hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setConsultOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-zinc-50 text-[#2D4059] font-semibold px-8 py-3 rounded-full hover:bg-white transition-colors shadow-lg text-sm md:text-base"
            >
              <Calendar className="h-4 w-4" />
              Book a Free Consultation
            </button>
            <button
              onClick={() => setGuideOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-zinc-50 text-[#2D4059] font-semibold px-8 py-3 rounded-full hover:bg-white transition-colors shadow-lg text-sm md:text-base"
            >
              <Download className="h-4 w-4" />
              {hero.guideLabel}
            </button>
          </div>
        </div>
      </section>

      {/* ── Obligations ─────────────────────────────────────────────────── */}
      {obligationsSection && <ObligationsSection {...obligationsSection} />}

      {/* ── Risks ──────────────────────────────────────────────────────── */}
      {risksSection && <RisksSection {...risksSection} />}

      {/* ── How We Help ─────────────────────────────────────────────────── */}
      {howWeHelpSection && <HowWeHelpSection {...howWeHelpSection} />}

      <GuideRequestModal
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
        guideName={hero.guideName}
        guideKey={hero.guideKey}
        pageSource={hero.sectorName}
      />
      <ConsultationModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}

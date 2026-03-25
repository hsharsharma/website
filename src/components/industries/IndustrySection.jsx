import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Download, CheckCircle2 } from 'lucide-react';

function DownloadButton({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={createPageUrl('Resources')}>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          borderRadius: '9999px',
          border: '1.5px solid #2C3E5D',
          background: hovered ? '#2C3E5D' : 'transparent',
          color: hovered ? '#ffffff' : '#2C3E5D',
          padding: '0 1.5rem', height: '2.75rem',
          fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        <Download style={{ width: '1rem', height: '1rem' }} />
        {label}
      </button>
    </Link>
  );
}

export default function IndustrySection({ id, icon: Icon, title, intro, highlights, ctaLabel, imageAlt, reversed = false, specialFeatures = [] }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <motion.div
      id={id}
      initial={isMobile ? false : { opacity: 0, scale: 0.97 }}
      whileInView={isMobile ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }} className="py-8 md:py-10">


      <div className="bg-white rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
        {/* Content */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-[var(--brand-blue-light)] flex items-center justify-center flex-shrink-0">
              <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-[var(--brand-blue)]" />
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-[var(--brand-slate-light)] leading-relaxed mb-6">{intro}</p>

          <ul className="space-y-3 mb-8">
            {highlights.map((item) =>
            <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--brand-teal)] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            )}
          </ul>

          {specialFeatures.length > 0 &&
          <div className="mb-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Industry-Specific Features:</h4>
              <ul className="space-y-2">
                {specialFeatures.map((feature, idx) =>
              <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--brand-blue)] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-xs">{feature}</span>
                  </li>
              )}
              </ul>
            </div>
          }

          <DownloadButton label={ctaLabel} />
        </div>

        {/* Visual — hidden on mobile, shown on lg+ */}
        <div className="hidden lg:block flex-1 w-full">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#2D4059]/5 to-[#243452]/10 flex items-center justify-center relative overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoNDQsNjIsOTMsMC4wOCkiLz48L3N2Zz4=')] opacity-50" />
            <Icon className="h-24 w-24 text-[#2C3E5D]/20" />
          </div>
        </div>
      </div>
    </motion.div>);

}
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
          borderRadius: '9999px', border: 'none',
          background: hovered ? '#3A7BD5' : '#4A90E2',
          color: '#ffffff', padding: '0 1.5rem', height: '3rem',
          fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
          transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(74,144,226,0.3)',
        }}
      >
        <Download style={{ width: '1rem', height: '1rem' }} />
        {label}
      </button>
    </Link>
  );
}

export default function IndustrySection({ id, icon: Icon, title, intro, highlights, ctaLabel, imageAlt, reversed = false, specialFeatures = [] }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }} className="bg-zinc-100 py-8 md:py-16 border-b border-gray-100 last:border-0">


      <div className="bg-slate-100 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
        {/* Content */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center flex-shrink-0">
              <Icon className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--brand-blue)]" />
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
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--brand-blue-light)] to-blue-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoNzQsMTQ0LDIyNiwwLjA4KSIvPjwvc3ZnPg==')] opacity-50" />
            <Icon className="h-24 w-24 text-[var(--brand-blue)]/20" />
          </div>
        </div>
      </div>
    </motion.div>);

}
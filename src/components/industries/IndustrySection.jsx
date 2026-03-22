import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle2 } from 'lucide-react';

export default function IndustrySection({ id, icon: Icon, title, intro, highlights, ctaLabel, imageAlt, reversed = false, specialFeatures = [] }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }} className="bg-zinc-100 py-8 md:py-16 border-b border-gray-100 last:border-0">


      <div className="bg-zinc-50 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
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

          <Link to={createPageUrl('Resources')}>
            <Button className="bg-[var(--brand-blue)] text-slate-500 px-6 py-2 text-sm font-semibold rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full md:w-auto hover:bg-[var(--brand-blue-dark)] transition-all duration-300 h-12 shadow-md shadow-blue-200/50">
              <Download className="mr-2 h-4 w-4" />
              {ctaLabel}
            </Button>
          </Link>
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
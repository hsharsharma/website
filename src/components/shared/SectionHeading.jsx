import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, center = true, light = false, as: Tag = 'h2' }) {
  const titleColor = light ? 'text-gray-900' : 'text-white';
  const descColor = light ? 'text-gray-500' : 'text-blue-100/90';
  const labelStyle = light
    ? 'bg-[var(--brand-blue-light)] text-[var(--brand-blue)] border-[var(--brand-blue)]/20'
    : 'bg-white/10 text-blue-200 border-white/20';

  return (
    <div className="mb-8 md:mb-12 mx-auto text-center max-w-3xl">
      {label && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border ${labelStyle}`}>
          {label}
        </span>
      )}
      <Tag className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${titleColor}`}>
        {title}
      </Tag>
      {description && (
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl mx-auto ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
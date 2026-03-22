import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, center = true, light = false, as: Tag = 'h2' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-zinc-50 mb-8 md:mb-12 mx-auto text-center max-w-3xl"
    >
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 bg-white/10 text-blue-200 border border-white/20">
          {label}
        </span>
      )}
      <Tag className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </Tag>
      {description && (
        <p className="text-blue-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
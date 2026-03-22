import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }} className="bg-slate-700 p-6 rounded-2xl group flex gap-5 border border-gray-100 hover:border-[var(--brand-blue)]/20 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-500 h-full">
      
      
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center group-hover:bg-[var(--brand-blue)] transition-colors duration-300">
        <Icon className="text-zinc-300 lucide lucide-users h-6 w-6 group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <h3 className="text-slate-50 mb-1.5 text-lg font-semibold">{title}</h3>
        <p className="text-slate-200 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>);

}
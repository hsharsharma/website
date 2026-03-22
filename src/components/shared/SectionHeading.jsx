import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }} className="text-zinc-50 mb-8 md:mb-12 mx-auto text-center max-w-3xl">


      




      

      
      



      
    </motion.div>);

}
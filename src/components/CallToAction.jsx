import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <motion.a
      href="tel:8977533213"
      className='text-md text-white max-w-lg mx-auto cursor-pointer underline'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      Call: 89775 33213
    </motion.a>
  );
};

export default CallToAction;

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OurStory = () => {
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={storyRef}
      initial={{ opacity: 0, y: 20 }}
      animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
      className="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 overflow-hidden"
    >
      <motion.h2 
        initial={{ x: -50, opacity: 0 }}
        animate={storyInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-2xl font-semibold text-guardian-darkGray mb-4"
      >
        Our Story
      </motion.h2>
      
      <motion.p
        initial={{ x: 50, opacity: 0 }}
        animate={storyInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-guardian-gray mb-4"
      >
        GarageGuardian was born from a simple observation: traditional garage access systems were complex and frustrating to use. We believed there had to be a better way.
      </motion.p>
      
      <motion.p
        initial={{ x: 50, opacity: 0 }}
        animate={storyInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-guardian-gray"
      >
        Founded in 2023, our team created a garage management system that combines sophisticated technology with a user-friendly interface to make parking seamless and stress-free.
      </motion.p>
    </motion.div>
  );
};

export default OurStory;

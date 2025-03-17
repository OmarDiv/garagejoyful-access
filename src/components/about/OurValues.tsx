
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Users, Zap } from 'lucide-react';
import ValueCard from './ValueCard';

const OurValues = () => {
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const values = [
    {
      icon: Shield,
      title: "Security",
      description: "We prioritize the safety of your vehicle and personal information."
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Every feature is designed with our users in mind for a pleasant experience."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously evolve our technology for modern parking challenges."
    }
  ];
  
  return (
    <div 
      ref={valuesRef}
      className="mb-12"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-semibold text-guardian-darkGray mb-6 text-center"
      >
        Our Values
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {values.map((value, index) => (
          <ValueCard 
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default OurValues;


import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Users, Zap } from 'lucide-react';

const AboutContent = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
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
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
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
    <div className="max-w-4xl mx-auto">
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
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-lg bg-guardian-blue/10 flex items-center justify-center mb-3">
                <value.icon className="h-5 w-5 text-guardian-blue" />
              </div>
              <h3 className="text-lg font-medium text-guardian-darkGray mb-2">{value.title}</h3>
              <p className="text-sm text-guardian-gray">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutContent;

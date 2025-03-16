
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Users, Zap, ThumbsUp, HeartHandshake, Trophy } from 'lucide-react';

const AboutContent = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const values = [
    {
      icon: Shield,
      title: "Security",
      description: "We prioritize the safety of your vehicle and personal information with state-of-the-art security measures."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature is designed with our users in mind, ensuring an intuitive and pleasant experience."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously evolve our technology to provide cutting-edge solutions for modern parking challenges."
    },
    {
      icon: HeartHandshake,
      title: "Reliability",
      description: "Our system is built for dependability, ensuring garage access is available whenever you need it."
    },
    {
      icon: ThumbsUp,
      title: "Simplicity",
      description: "We believe in making complex technology simple and accessible to everyone."
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from code quality to customer support."
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-guardian-darkGray mb-6"
        >
          About GarageGuardian
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-guardian-gray max-w-2xl mx-auto"
        >
          We're transforming garage management with technology that's both powerful and intuitive.
        </motion.p>
      </div>
      
      <motion.div
        ref={storyRef}
        initial={{ opacity: 0, y: 40 }}
        animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="mb-20 bg-guardian-lightGray rounded-2xl p-8 md:p-12 overflow-hidden relative"
      >
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={storyInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-guardian-darkGray mb-6">Our Story</h2>
        </motion.div>
        
        <div className="space-y-4 text-guardian-darkGray">
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={storyInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            GarageGuardian was born from a simple observation: traditional garage access systems were complex, unintuitive, and often frustrating to use. We believed there had to be a better way.
          </motion.p>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={storyInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Founded in 2023, our team of passionate engineers and designers set out to create a garage management system that would combine sophisticated technology with a user-friendly interface. We wanted to build something that would make the parking experience seamless and stress-free.
          </motion.p>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={storyInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            After months of development and testing, we launched GarageGuardian—a smart garage access system that prioritizes user experience without compromising on security or functionality. Today, we're proud to offer a solution that makes garage management effortless for both property managers and users.
          </motion.p>
        </div>
      </motion.div>
      
      <div 
        ref={valuesRef}
        className="mb-20"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold text-guardian-darkGray mb-8 text-center"
        >
          Our Values
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-guardian-blue/10 flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-guardian-blue" />
              </div>
              <h3 className="text-lg font-medium text-guardian-darkGray mb-2">{value.title}</h3>
              <p className="text-guardian-gray">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.div
        ref={teamRef}
        initial={{ opacity: 0, y: 40 }}
        animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold text-guardian-darkGray mb-6">Our Team</h2>
        <p className="text-guardian-gray mb-10 max-w-2xl mx-auto">
          GarageGuardian is built by a dedicated team of professionals who are passionate about creating technology that improves everyday experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((person, index) => (
            <motion.div 
              key={person}
              variants={cardVariants}
              initial="hidden"
              animate={teamInView ? {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.2,
                  duration: 0.5
                }
              } : "hidden"}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300"
            >
              <div className="h-48 bg-guardian-lightGray"></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-guardian-darkGray">Team Member {person}</h3>
                <p className="text-guardian-blue mb-2">Position Title</p>
                <p className="text-guardian-gray text-sm">
                  Passionate about creating intuitive user experiences and solving complex problems.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutContent;

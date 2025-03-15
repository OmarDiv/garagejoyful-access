
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckSquare, Lock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoverButton, setHoverButton] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
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
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 z-0 opacity-10">
        <svg 
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <pattern 
            id="hero-pattern" 
            width="10" 
            height="10" 
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(10)"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-purple-600" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center text-center"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl max-w-3xl mb-6"
          >
            Smart Garage Management 
            <span className="block text-purple-600 mt-2">Simplified</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
          >
            Experience the most intuitive garage access system with real-time parking status,
            secure reservations, and convenient entry for drivers.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <Link to="/garage">
              <Button 
                size="lg" 
                className="rounded-full px-6 py-6 text-base transition-all duration-300 bg-purple-600 hover:bg-purple-700"
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
              >
                Access Garage
                <motion.span
                  animate={{ x: hoverButton ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
          
          {/* Parking statistics */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-20"
          >
            {[
              {
                icon: CheckSquare,
                title: "Available Spots",
                count: "12",
                description: "Ready for immediate parking"
              },
              {
                icon: Lock,
                title: "Occupied Spots",
                count: "24",
                description: "Currently in use"
              },
              {
                icon: Clock,
                title: "Reserved Spots",
                count: "8",
                description: "Pre-booked for later use"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm border border-gray-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="text-2xl font-bold text-purple-600 my-2">{feature.count}</p>
                <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

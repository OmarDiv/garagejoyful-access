
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Lock, Clock } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-32 pb-16 md:pt-40 md:pb-24">
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
            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-guardian-blue" />
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
            <span className="block text-guardian-blue mt-2">Simplified</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
          >
            Experience the most intuitive garage access system with real-time parking status,
            secure reservations, and seamless entry.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="rounded-full px-6 py-6 text-base transition-all duration-300"
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
              >
                View Dashboard
                <motion.span
                  animate={{ x: hoverButton ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-6 py-6 text-base"
              >
                Create Account
              </Button>
            </Link>
          </motion.div>
          
          {/* Feature highlights - simplified */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-20"
          >
            {[
              {
                icon: Car,
                title: "Real-time Parking",
                description: "Monitor available spots in real-time"
              },
              {
                icon: Lock,
                title: "Secure Access",
                description: "Enter with personalized authentication"
              },
              {
                icon: Clock,
                title: "Easy Reservations",
                description: "Reserve your spot in advance"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm border border-gray-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-guardian-blue mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Lock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
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
    <section className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2">
          <svg 
            className="absolute left-0 h-full w-full stroke-gray-300" 
            fill="none" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            stroke-width="0.5"
            aria-hidden="true"
          >
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-blue-50 text-guardian-blue mb-6">
            <span>Introducing GarageGuardian</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl max-w-4xl mb-6"
          >
            Smart Garage Management 
            <span className="block text-guardian-blue">Simplified & Beautiful</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl"
          >
            Experience the most intuitive garage access system with real-time parking status, secure reservations, and seamless entry. All in one elegant interface.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          >
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="rounded-full px-6 py-6 text-base btn-hover-effect group"
              >
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
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
          
          {/* Feature highlights */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 md:mt-20"
          >
            {[
              {
                icon: Car,
                title: "Real-time Parking",
                description: "Monitor available parking spots in real-time with instant updates."
              },
              {
                icon: Lock,
                title: "Secure Access",
                description: "Enter your garage with secure, personalized authentication."
              },
              {
                icon: Clock,
                title: "Easy Reservations",
                description: "Reserve your spot in advance with just a few clicks."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-guardian-blue mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

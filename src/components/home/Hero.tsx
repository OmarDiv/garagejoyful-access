
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
  
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl max-w-2xl mb-4"
          >
            Smart Garage Management 
            <span className="block text-purple-600 mt-1">Simplified</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="mx-auto max-w-lg text-base text-gray-600"
          >
            Experience the most intuitive garage access system with real-time parking status,
            secure reservations, and convenient entry.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8"
          >
            <Link to="/garage">
              <Button 
                size="lg" 
                className="rounded-full px-6 py-6 text-base bg-purple-600 hover:bg-purple-700"
              >
                Access Garage
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

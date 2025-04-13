
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

const Hero = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1589634749000-1de0a4bdaf95?q=80&w=2073&auto=format&fit=crop";
    img.onload = () => setImagesLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6
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
    <section className="relative overflow-hidden bg-guardian-lightGray pt-16 md:pt-0">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-70 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={imagesLoaded ? "visible" : "hidden"}
            className="order-2 md:order-1"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-guardian-darkGray leading-tight"
            >
              Smart Parking <span className="text-indigo-600">Made Simple</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-guardian-gray max-w-lg"
            >
              Find and reserve the perfect parking spot in seconds. 
              No more circling the block or stressing about where to park.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link to="/dashboard">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg btn-hover-effect min-w-[160px]">
                  Find Parking
                </Button>
              </Link>
              
              {!isAuthenticated && (
                <Link to="/auth">
                  <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg btn-hover-effect min-w-[160px]">
                    Sign In
                  </Button>
                </Link>
              )}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-3xl font-bold text-indigo-600">100+</div>
                <div className="text-sm text-guardian-gray">Parking Spots</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <div className="text-sm text-guardian-gray">Availability</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-3xl font-bold text-indigo-600">1-Click</div>
                <div className="text-sm text-guardian-gray">Reservations</div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative">
              <motion.div
                initial={{ y: 10 }}
                animate={{ y: -10 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="rounded-2xl overflow-hidden shadow-2xl max-w-md relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1589634749000-1de0a4bdaf95?q=80&w=2073&auto=format&fit=crop" 
                  alt="Parking garage" 
                  className="w-full h-auto"
                  onLoad={() => setImagesLoaded(true)}
                />
              </motion.div>
              
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute top-0 -left-12 -rotate-6 bg-white p-4 rounded-lg shadow-lg z-20"
                >
                  <div className="text-sm font-medium text-guardian-blue">Available Now</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-xs text-guardian-gray">12 open spots</span>
                  </div>
                </motion.div>
              )}
              
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -bottom-8 -right-8 rotate-3 bg-indigo-100 p-4 rounded-lg shadow-lg z-20"
                >
                  <div className="text-sm font-medium text-indigo-800">Easy Access</div>
                  <div className="text-xs text-guardian-gray mt-1">
                    Scan QR code to enter
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,85.3C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

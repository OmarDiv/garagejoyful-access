
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroAnalytics from './HeroAnalytics';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';

const Hero = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const analytics = {
    totalVisitors: 15000,
    activeUsers: 250,
    totalReservations: 5000,
    satisfactionRate: 98
  };

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1589634749000-1de0a4bdaf95?q=80&w=2073&auto=format&fit=crop";
    img.onload = () => setImagesLoaded(true);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 md:pt-32 lg:pt-0">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-guardian-lightPurple/20 to-white opacity-90 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <svg className="h-full w-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(5)">
              <circle cx="1" cy="1" r="1" fill="currentColor" className="text-guardian-purple"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)"></rect>
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-guardian-purple/10 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-guardian-magenta/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 10,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:py-32 lg:py-40">
        <HeroAnalytics analytics={analytics} isInView={isInView} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <HeroContent isInView={isInView} />
          <HeroImage isInView={isInView} imagesLoaded={imagesLoaded} />
        </div>
      </div>
      
      <div className="relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white w-full">
          <path d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,85.3C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

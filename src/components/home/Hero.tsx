
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
    <section ref={ref} className="relative overflow-hidden bg-guardian-lightGray pt-16 md:pt-0">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-70 z-0"></div>
      
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

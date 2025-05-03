
import { motion, useScroll, useTransform } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import PageBackground from '@/components/ui/PageBackground';
import { useRef } from 'react';
import { ArrowDownIcon } from 'lucide-react';

const Index = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <PageBackground variant="home">
      <div ref={scrollRef} className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-grow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div style={{ opacity, scale }}>
              <Hero />
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="flex justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button 
              onClick={() => {
                document.getElementById('features-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className="flex flex-col items-center text-guardian-gray hover:text-guardian-purple transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm mb-2">Discover More</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-guardian-purple/10 rounded-full p-2"
              >
                <ArrowDownIcon className="text-guardian-purple" />
              </motion.div>
            </motion.button>
          </motion.div>
          
          <div id="features-section">
            <Features />
          </div>
          
          <Testimonials />
          <CTA />
        </main>
        
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Index;

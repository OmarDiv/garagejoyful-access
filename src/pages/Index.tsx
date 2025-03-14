
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;


import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import PageBackground from '@/components/ui/PageBackground';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  // Function to scroll to features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageBackground variant="home">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <NavBar />
        
        <main className="flex-grow">
          <Hero />
          
          {/* Quick actions for returning users */}
          {isAuthenticated && (
            <div className="bg-white py-6 border-b border-gray-100 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-guardian-darkGray">Welcome back, {user?.name}!</h3>
                    <p className="text-sm text-guardian-gray">Quick access to your parking tools</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/dashboard">
                      <Button variant="outline" size="sm" className="border-guardian-blue text-guardian-blue">
                        Find Parking
                      </Button>
                    </Link>
                    <Link to="/reservations">
                      <Button variant="outline" size="sm" className="border-guardian-blue text-guardian-blue">
                        My Reservations
                      </Button>
                    </Link>
                    <Link to="/garage">
                      <Button variant="default" size="sm" className="bg-guardian-blue">
                        Garage Access
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Scroll indicator */}
          <div className="flex justify-center pt-4 pb-8">
            <button 
              onClick={scrollToFeatures}
              className="flex flex-col items-center text-guardian-gray hover:text-guardian-blue transition-colors"
            >
              <span className="text-sm mb-2">Discover More</span>
              <ChevronDown className="animate-bounce" />
            </button>
          </div>
          
          <div id="features-section">
            <Features />
          </div>
          
          <Testimonials />
          <CTA />
        </main>
        
        <Footer />
      </motion.div>
    </PageBackground>
  );
};

export default Index;


import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import PageBackground from '@/components/ui/PageBackground';
import GarageEntry from '@/components/garage/GarageEntry';

const GarageAccess = () => {
  return (
    <PageBackground variant="garage">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <NavBar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">
                Garage Access
              </h1>
              <p className="text-guardian-gray">
                Enter your information to access the garage
              </p>
            </div>
            
            <GarageEntry />
          </div>
        </main>
        
        <Footer />
      </motion.div>
    </PageBackground>
  );
};

export default GarageAccess;

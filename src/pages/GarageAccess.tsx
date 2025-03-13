
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import GarageEntry from '@/components/garage/GarageEntry';

const GarageAccess = () => {
  return (
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
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Garage Access</h1>
            <p className="text-guardian-gray">Enter your credentials to access the garage</p>
          </div>
          
          <GarageEntry />
          
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-guardian-lightGray rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-medium text-guardian-darkGray mb-4">Access Instructions</h3>
              <ol className="space-y-4 list-decimal list-inside text-guardian-darkGray">
                <li>Ensure you have reserved a parking spot through the dashboard</li>
                <li>Enter your full name exactly as it appears in your profile</li>
                <li>Enter your license plate number for verification</li>
                <li>Click "Open Garage Door" and wait for confirmation</li>
                <li>Once access is granted, the garage door will open automatically</li>
                <li>Park in your designated spot only</li>
              </ol>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-guardian-gray">
                  For security purposes, all garage entries are logged and monitored. If you experience any issues, please contact our support team at <a href="mailto:support@garageguardian.com" className="text-guardian-blue">support@garageguardian.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default GarageAccess;

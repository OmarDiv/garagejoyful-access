
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import PageBackground from '@/components/ui/PageBackground';
import ReservationsHeader from '@/components/reservations/ReservationsHeader';
import ReservationsContainer from '@/components/reservations/ReservationsContainer';

const ReservationsHistory = () => {
  return (
    <PageBackground variant="dashboard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <NavBar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ReservationsHeader />
            <ReservationsContainer />
          </div>
        </main>
        
        <Footer />
      </motion.div>
    </PageBackground>
  );
};

export default ReservationsHistory;

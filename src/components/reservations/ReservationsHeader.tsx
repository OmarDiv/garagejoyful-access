
import { motion } from 'framer-motion';

const ReservationsHeader = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Reservation History</h1>
      <p className="text-guardian-gray">View and manage your parking reservations</p>
    </motion.div>
  );
};

export default ReservationsHeader;

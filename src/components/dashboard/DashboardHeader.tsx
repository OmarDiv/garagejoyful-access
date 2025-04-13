
import { motion } from 'framer-motion';

const DashboardHeader = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Find Available Parking</h1>
      <p className="text-guardian-gray">Select an available spot to make a reservation</p>
    </motion.div>
  );
};

export default DashboardHeader;

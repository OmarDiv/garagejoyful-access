
import { motion } from 'framer-motion';
import ParkingSpotGrid from './ParkingSpotGrid';
import ParkingInfo from './ParkingInfo';

interface ParkingContainerProps {
  onSelectSpot: (id: string) => void;
}

const ParkingContainer = ({ onSelectSpot }: ParkingContainerProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-guardian-darkGray mb-6">Parking Spots</h2>
        <ParkingSpotGrid onSelectSpot={onSelectSpot} />
      </motion.div>
      
      <ParkingInfo />
    </motion.div>
  );
};

export default ParkingContainer;


import { motion, AnimatePresence } from 'framer-motion';
import ParkingSpot from '@/components/ui/ParkingSpot';
import { ParkingSpotData } from './DashboardContent';

interface ParkingStatusProps {
  spots: ParkingSpotData[];
  onSelectSpot: (id: string) => void;
}

const ParkingStatus = ({ spots, onSelectSpot }: ParkingStatusProps) => {
  // Calculate totals
  const totalSpots = spots.length;
  const availableSpots = spots.filter(s => s.status === 'available').length;
  const reservedSpots = spots.filter(s => s.status === 'reserved').length;
  const occupiedSpots = spots.filter(s => s.status === 'occupied').length;
  
  const spotVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };
  
  return (
    <>
      {/* Parking Statistics Summary */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 mb-6"
      >
        <h3 className="text-lg font-medium text-guardian-darkGray mb-3">Parking Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex flex-col bg-blue-50 rounded-lg p-3 border border-blue-100">
            <span className="text-sm text-guardian-gray">Total Spots</span>
            <span className="text-2xl font-semibold text-guardian-darkGray">{totalSpots}</span>
          </div>
          <div className="flex flex-col bg-green-50 rounded-lg p-3 border border-green-100">
            <span className="text-sm text-guardian-gray">Available</span>
            <span className="text-2xl font-semibold text-guardian-green">{availableSpots}</span>
          </div>
          <div className="flex flex-col bg-blue-50 rounded-lg p-3 border border-blue-100">
            <span className="text-sm text-guardian-gray">Reserved</span>
            <span className="text-2xl font-semibold text-blue-500">{reservedSpots}</span>
          </div>
          <div className="flex flex-col bg-red-50 rounded-lg p-3 border border-red-100">
            <span className="text-sm text-guardian-gray">Occupied</span>
            <span className="text-2xl font-semibold text-guardian-red">{occupiedSpots}</span>
          </div>
        </div>
      </motion.div>
      
      {/* Parking Spots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {spots.map((spot, index) => (
            <motion.div
              key={spot.id}
              custom={index}
              variants={spotVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <ParkingSpot
                id={spot.id}
                status={spot.status}
                onClick={onSelectSpot}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ParkingStatus;

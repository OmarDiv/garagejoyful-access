
import { motion } from 'framer-motion';

interface ParkingInfoProps {
  itemVariants: any;
}

const ParkingInfo = ({ itemVariants }: ParkingInfoProps) => {
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

  return (
    <motion.div 
      variants={itemVariants}
      className="bg-guardian-lightGray/80 backdrop-blur-sm rounded-2xl p-6"
    >
      <h3 className="text-lg font-medium text-guardian-darkGray mb-4">Parking Information</h3>
      <motion.ul 
        className="space-y-2 text-guardian-gray"
        variants={containerVariants}
      >
        <motion.li variants={itemVariants} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-guardian-green"></span>
          <span>Available - Click to reserve</span>
        </motion.li>
        <motion.li variants={itemVariants} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-guardian-red"></span>
          <span>Occupied - Cannot be reserved</span>
        </motion.li>
        <motion.li variants={itemVariants} className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span>Reserved - Already booked</span>
        </motion.li>
      </motion.ul>
      
      <motion.div 
        variants={itemVariants}
        className="mt-6 pt-5 border-t border-gray-200"
      >
        <h4 className="text-md font-medium text-guardian-darkGray mb-2">Hours of Operation</h4>
        <motion.ul 
          className="space-y-1 text-guardian-gray"
          variants={containerVariants}
        >
          <motion.li variants={itemVariants} className="flex justify-between">
            <span>Monday - Friday:</span>
            <span className="font-medium text-guardian-darkGray">6:00 AM - 11:00 PM</span>
          </motion.li>
          <motion.li variants={itemVariants} className="flex justify-between">
            <span>Saturday:</span>
            <span className="font-medium text-guardian-darkGray">8:00 AM - 10:00 PM</span>
          </motion.li>
          <motion.li variants={itemVariants} className="flex justify-between">
            <span>Sunday:</span>
            <span className="font-medium text-guardian-darkGray">10:00 AM - 8:00 PM</span>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default ParkingInfo;

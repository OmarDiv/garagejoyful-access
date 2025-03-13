
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';

interface GarageEntryHeaderProps {
  spotId: string;
}

const GarageEntryHeader = ({ spotId }: GarageEntryHeaderProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-center mb-8"
    >
      <motion.div variants={itemVariants} className="flex justify-center mb-4">
        <div className="h-16 w-16 rounded-full bg-guardian-blue/10 flex items-center justify-center">
          <Key size={30} className="text-guardian-blue" />
        </div>
      </motion.div>
      
      <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-guardian-darkGray mb-2">
        Garage Access
      </motion.h2>
      
      <motion.p variants={itemVariants} className="text-guardian-gray">
        {spotId ? `Access your reserved spot #${spotId}` : 'Please verify your identity to enter the garage'}
      </motion.p>
    </motion.div>
  );
};

export default GarageEntryHeader;

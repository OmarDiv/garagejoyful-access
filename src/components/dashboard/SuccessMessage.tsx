
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  spotId: string;
}

const successVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};

const SuccessMessage = ({ spotId }: SuccessMessageProps) => {
  return (
    <motion.div 
      variants={successVariants}
      initial="hidden"
      animate="visible"
      className="p-8 text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-guardian-green/20 flex items-center justify-center">
          <CheckCircle size={30} className="text-guardian-green" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-guardian-darkGray mb-2">
        Reservation Successful!
      </h3>
      
      <p className="text-guardian-gray mb-6">
        You've reserved parking spot #{spotId}. Redirecting to garage access page...
      </p>
    </motion.div>
  );
};

export default SuccessMessage;

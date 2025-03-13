
import { motion } from 'framer-motion';
import { CheckCircle, Car } from 'lucide-react';
import { AccessFormValues } from './types';

interface AccessConfirmationProps {
  formValues: AccessFormValues;
  spotId: string;
}

const AccessConfirmation = ({ formValues, spotId }: AccessConfirmationProps) => {
  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <motion.div
      key="accessGranted"
      variants={successVariants}
      initial="hidden"
      animate="visible"
      className="bg-guardian-green/10 p-8 rounded-2xl border-2 border-guardian-green text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 rounded-full bg-guardian-green/20 flex items-center justify-center">
          <CheckCircle size={30} className="text-guardian-green" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-guardian-darkGray mb-2">
        Access Granted
      </h3>
      
      <p className="text-guardian-gray mb-6">
        The garage door is now opening. Please proceed to spot #{spotId || 'assigned'}!
      </p>
      
      <div className="p-4 bg-white rounded-xl border border-guardian-green/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Car size={24} className="text-guardian-darkGray" />
          <div className="text-left">
            <p className="font-medium text-guardian-darkGray">{formValues.fullName}</p>
            <p className="text-sm text-guardian-gray">{formValues.carPlate}</p>
          </div>
        </div>
        <span className="text-guardian-green text-sm px-3 py-1 bg-guardian-green/10 rounded-full">
          Verified
        </span>
      </div>
    </motion.div>
  );
};

export default AccessConfirmation;

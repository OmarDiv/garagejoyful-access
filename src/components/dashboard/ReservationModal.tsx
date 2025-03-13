
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, CalendarCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ReservationModalProps {
  spotId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ReservationModal = ({ spotId, isOpen, onClose, onConfirm }: ReservationModalProps) => {
  const [carPlate, setCarPlate] = useState('');
  const [duration, setDuration] = useState('2');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!carPlate.trim()) {
      toast({
        title: "License plate required",
        description: "Please enter your license plate number",
        variant: "destructive",
      });
      return;
    }
    
    onConfirm();
    toast({
      title: "Reservation Confirmed!",
      description: `You've reserved spot ${spotId} for ${duration} hours`,
    });
    
    // Reset form
    setCarPlate('');
    setDuration('2');
    onClose();
  };
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 pb-2 flex justify-between items-center border-b border-gray-100">
              <h3 className="text-xl font-semibold text-guardian-darkGray">Reserve Parking Spot</h3>
              <button 
                onClick={onClose} 
                className="text-guardian-gray hover:text-guardian-darkGray transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-blue-50 rounded-xl flex items-center text-guardian-blue gap-3">
                <Car size={20} />
                <p>You're reserving <strong>Spot {spotId}</strong></p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="carPlate" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      License Plate Number
                    </label>
                    <input
                      id="carPlate"
                      type="text"
                      value={carPlate}
                      onChange={(e) => setCarPlate(e.target.value)}
                      placeholder="Enter your license plate"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      Duration (hours)
                    </label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="4">4 hours</option>
                      <option value="8">8 hours</option>
                      <option value="24">24 hours</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button type="submit" className="w-full btn-hover-effect">
                    Confirm Reservation
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose} className="w-full">
                    Cancel
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-guardian-gray flex items-center justify-center gap-1">
                <Clock size={14} />
                <span>Reservations can be canceled up to 30 minutes before the scheduled time.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;

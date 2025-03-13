
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, User, Calendar, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface ReservationModalProps {
  spotId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ReservationModal = ({ spotId, isOpen, onClose, onConfirm }: ReservationModalProps) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [carModel, setCarModel] = useState('');
  const [duration, setDuration] = useState('2');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim() || !carPlate.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
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
    setFullName('');
    setEmail('');
    setPhone('');
    setCarPlate('');
    setCarModel('');
    setDuration('2');
    
    // Close modal and redirect to garage page
    onClose();
    setTimeout(() => {
      navigate('/garage');
    }, 1500);
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
                  {/* Personal Information */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      Full Name <span className="text-guardian-red">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                        <User size={16} />
                      </span>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      Email Address <span className="text-guardian-red">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                        <Mail size={16} />
                      </span>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                        <Phone size={16} />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Car Information */}
                  <div>
                    <label htmlFor="carPlate" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      License Plate Number <span className="text-guardian-red">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                        <Car size={16} />
                      </span>
                      <input
                        id="carPlate"
                        type="text"
                        value={carPlate}
                        onChange={(e) => setCarPlate(e.target.value)}
                        placeholder="Enter your license plate"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="carModel" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      Car Model
                    </label>
                    <input
                      id="carModel"
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="e.g. Toyota Camry, Honda Civic"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-guardian-darkGray mb-1">
                      Duration (hours)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                        <Calendar size={16} />
                      </span>
                      <select
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                      >
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="4">4 hours</option>
                        <option value="8">8 hours</option>
                        <option value="24">24 hours</option>
                      </select>
                    </div>
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
              
              <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-guardian-gray text-center">
                <p>Fields marked with <span className="text-guardian-red">*</span> are required</p>
                <p className="mt-1">By making a reservation, you agree to our Terms and Conditions</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;

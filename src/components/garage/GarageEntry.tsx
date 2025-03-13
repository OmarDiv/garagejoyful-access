
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, CheckCircle, Car, Mail, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AccessFormValues {
  fullName: string;
  email: string;
  phone: string;
  carPlate: string;
  carModel: string;
}

const GarageEntry = () => {
  const [formValues, setFormValues] = useState<AccessFormValues>({
    fullName: '',
    email: '',
    phone: '',
    carPlate: '',
    carModel: ''
  });
  const [spotId, setSpotId] = useState<string>('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Try to get data from sessionStorage
  useEffect(() => {
    const storedReservation = sessionStorage.getItem('reservation');
    const storedSpot = sessionStorage.getItem('reservationSpot');
    
    if (storedReservation) {
      try {
        const reservationData = JSON.parse(storedReservation);
        setFormValues(reservationData);
      } catch (error) {
        console.error('Failed to parse reservation data', error);
      }
    }
    
    if (storedSpot) {
      try {
        const spotData = JSON.parse(storedSpot);
        setSpotId(spotData.spotId);
      } catch (error) {
        console.error('Failed to parse spot data', error);
      }
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, carPlate } = formValues;
    
    if (!fullName.trim() || !email.trim() || !carPlate.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields to continue",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate verifying user credentials
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setAccessGranted(true);
      
      toast({
        title: "Access Granted!",
        description: `The garage door will open now. Please proceed to spot ${spotId || 'assigned'}.`,
      });
      
      // Reset after some time
      setTimeout(() => {
        setAccessGranted(false);
        setFormValues({ fullName: '', email: '', phone: '', carPlate: '', carModel: '' });
        sessionStorage.removeItem('reservation');
        sessionStorage.removeItem('reservationSpot');
      }, 10000);
    }, 2000);
  };
  
  // Animation variants
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
  
  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
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
      
      <AnimatePresence mode="wait">
        {!accessGranted ? (
          <motion.div
            key="accessForm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-guardian-darkGray mb-1">
                  Your Full Name <span className="text-guardian-red">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-guardian-gray">
                    <User size={16} />
                  </span>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formValues.fullName}
                    onChange={handleInputChange}
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
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
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
                    name="phone"
                    type="tel"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                  />
                </div>
              </div>
              
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
                    name="carPlate"
                    type="text"
                    value={formValues.carPlate}
                    onChange={handleInputChange}
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
                  name="carModel"
                  type="text"
                  value={formValues.carModel}
                  onChange={handleInputChange}
                  placeholder="e.g. Toyota Camry, Honda Civic"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-hover-effect mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Key size={18} />
                    Open Garage Door
                  </span>
                )}
              </Button>
            </form>
            
            <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-center text-guardian-gray">
              <p>Fields marked with <span className="text-guardian-red">*</span> are required</p>
            </div>
          </motion.div>
        ) : (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default GarageEntry;

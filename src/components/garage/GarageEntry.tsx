
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Lock, CheckCircle, Car, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AccessFormValues {
  name: string;
  carNumber: string;
}

const GarageEntry = () => {
  const [formValues, setFormValues] = useState<AccessFormValues>({
    name: '',
    carNumber: ''
  });
  const [accessGranted, setAccessGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, carNumber } = formValues;
    
    if (!name.trim() || !carNumber.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields to continue",
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
        description: "The garage door will open now. Please proceed.",
      });
      
      // Reset after some time
      setTimeout(() => {
        setAccessGranted(false);
        setFormValues({ name: '', carNumber: '' });
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
          Secure Garage Access
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-guardian-gray">
          Please verify your identity to enter the garage
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-guardian-darkGray mb-1">
                  Your Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="carNumber" className="block text-sm font-medium text-guardian-darkGray mb-1">
                  License Plate Number
                </label>
                <input
                  id="carNumber"
                  name="carNumber"
                  type="text"
                  value={formValues.carNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your license plate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-guardian-blue focus:border-transparent"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full btn-hover-effect"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock size={18} />
                    Open Garage Door
                  </span>
                )}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-center text-guardian-gray">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle size={16} />
                <span>For security purposes, please ensure your information is accurate.</span>
              </div>
              <p>Access logs are maintained for all garage entries.</p>
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
              The garage door is now opening. Please drive safely!
            </p>
            
            <div className="p-4 bg-white rounded-xl border border-guardian-green/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Car size={24} className="text-guardian-darkGray" />
                <div className="text-left">
                  <p className="font-medium text-guardian-darkGray">{formValues.name}</p>
                  <p className="text-sm text-guardian-gray">{formValues.carNumber}</p>
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

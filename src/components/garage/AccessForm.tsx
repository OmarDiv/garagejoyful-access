
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, User, Mail, Phone, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccessFormValues } from './types';

interface AccessFormProps {
  formValues: AccessFormValues;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  spotId: string;
}

const AccessForm = ({ formValues, onInputChange, onSubmit, isLoading, spotId }: AccessFormProps) => {
  // Animation variants
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
      key="accessForm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
    >
      <form onSubmit={onSubmit} className="space-y-4">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
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
  );
};

export default AccessForm;

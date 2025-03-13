
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { AccessFormValues } from './types';
import GarageEntryHeader from './GarageEntryHeader';
import AccessForm from './AccessForm';
import AccessConfirmation from './AccessConfirmation';

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
  
  return (
    <div className="max-w-md mx-auto">
      <GarageEntryHeader spotId={spotId} />
      
      <AnimatePresence mode="wait">
        {!accessGranted ? (
          <AccessForm 
            formValues={formValues}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            spotId={spotId}
          />
        ) : (
          <AccessConfirmation 
            formValues={formValues}
            spotId={spotId}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GarageEntry;

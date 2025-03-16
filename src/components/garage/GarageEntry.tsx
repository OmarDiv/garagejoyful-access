
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { AccessFormValues } from './types';
import GarageEntryHeader from './GarageEntryHeader';
import AccessForm from './AccessForm';
import AccessConfirmation from './AccessConfirmation';

// Define the SpotStatus type to match with Dashboard.tsx
type SpotStatus = 'available' | 'occupied' | 'reserved';

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
    const { carPlate, phone } = formValues;
    
    if (!carPlate.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your license plate number to continue",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate verifying user credentials
    setIsLoading(true);
    
    // Simulate API call to get user name based on license plate
    setTimeout(() => {
      // For demo purposes, generate a name based on the license plate
      const mockName = carPlate.toUpperCase().replace(/[0-9]/g, '') || 'User';
      setFormValues(prev => ({ ...prev, fullName: `${mockName} Driver` }));
      
      setIsLoading(false);
      setAccessGranted(true);
      
      // Update the spot status from reserved to occupied
      if (spotId) {
        const spots = JSON.parse(sessionStorage.getItem('parkingSpots') || '[]');
        const updatedSpots = spots.map((spot: any) => 
          spot.id === spotId ? { ...spot, status: 'occupied' as SpotStatus } : spot
        );
        sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
      }
      
      toast({
        title: "Access Granted!",
        description: `Welcome, ${mockName} Driver! The garage door will open now. Please proceed to spot ${spotId || 'assigned'}.`,
      });
      
      // Reset after some time
      setTimeout(() => {
        setAccessGranted(false);
        setFormValues({ fullName: '', email: '', phone: '', carPlate: '', carModel: '' });
        // Don't clear sessionStorage here as we want to maintain the occupied state
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

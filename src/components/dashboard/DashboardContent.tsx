
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ReservationModal from '@/components/dashboard/ReservationModal';
import ParkingStatus from '@/components/dashboard/ParkingStatus';
import ParkingInfo from '@/components/dashboard/ParkingInfo';
import { useToast } from '@/hooks/use-toast';

// Types
export type SpotStatus = 'available' | 'occupied' | 'reserved';

export interface ParkingSpotData {
  id: string;
  status: SpotStatus;
}

const DashboardContent = () => {
  const [spots, setSpots] = useState<ParkingSpotData[]>([]);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState('');
  const { toast } = useToast();
  
  // Load spots from sessionStorage on component mount
  useEffect(() => {
    const storedSpots = sessionStorage.getItem('parkingSpots');
    if (storedSpots) {
      try {
        const parsedSpots = JSON.parse(storedSpots);
        // Validate that all status values are of type SpotStatus
        const validatedSpots: ParkingSpotData[] = parsedSpots.map((spot: any) => ({
          id: spot.id,
          status: spot.status as SpotStatus
        }));
        setSpots(validatedSpots);
      } catch (error) {
        console.error('Failed to parse stored spots', error);
      }
    } else {
      // Initialize with some occupied and reserved spots for demo
      const demoSpots: ParkingSpotData[] = [
        { id: '1', status: 'available' },
        { id: '2', status: 'reserved' },
        { id: '3', status: 'occupied' },
        { id: '4', status: 'available' },
      ];
      setSpots(demoSpots);
      sessionStorage.setItem('parkingSpots', JSON.stringify(demoSpots));
    }
  }, []);
  
  // Save spots to sessionStorage whenever they change
  useEffect(() => {
    if (spots.length > 0) {
      sessionStorage.setItem('parkingSpots', JSON.stringify(spots));
    }
  }, [spots]);
  
  const handleOpenReservationModal = (id: string) => {
    // Check if spot is available
    const spot = spots.find(s => s.id === id);
    if (spot && spot.status !== 'available') {
      toast({
        title: "Spot unavailable",
        description: `Parking spot ${id} is already ${spot.status}.`,
        variant: "destructive",
      });
      return;
    }
    
    setSelectedSpotId(id);
    setIsReservationModalOpen(true);
  };
  
  const handleConfirmReservation = (formData: any) => {
    // Update spot status
    const updatedSpots: ParkingSpotData[] = spots.map(spot => 
      spot.id === selectedSpotId ? { ...spot, status: 'reserved' as SpotStatus } : spot
    );
    setSpots(updatedSpots);
    sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
    
    // Store reservation data in sessionStorage
    sessionStorage.setItem('reservationSpot', JSON.stringify({
      spotId: selectedSpotId,
      timestamp: new Date().toISOString()
    }));
    
    // Store user and car details for the garage access page
    sessionStorage.setItem('reservation', JSON.stringify(formData));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
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
    <>
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Find Available Parking</h1>
        <p className="text-guardian-gray">Select an available spot to make a reservation</p>
      </motion.div>
      
      {/* Dashboard Content */}
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-guardian-darkGray mb-6">Parking Spots</h2>
          
          <ParkingStatus 
            spots={spots}
            onSelectSpot={handleOpenReservationModal}
          />
        </motion.div>
        
        <ParkingInfo itemVariants={itemVariants} />
      </motion.div>
      
      {/* Reservation Modal */}
      <ReservationModal 
        spotId={selectedSpotId}
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onConfirm={handleConfirmReservation}
      />
    </>
  );
};

export default DashboardContent;

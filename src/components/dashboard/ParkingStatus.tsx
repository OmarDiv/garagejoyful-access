
import { useState } from 'react';
import { motion } from 'framer-motion';
import ParkingSpot from '@/components/ui/ParkingSpot';

// Types
type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpotData {
  id: string;
  status: SpotStatus;
}

interface ParkingStatusProps {
  onSelectSpot: (id: string) => void;
}

// Generate 4 parking spots
const generateMockSpots = (): ParkingSpotData[] => {
  return [
    { id: '1', status: 'available' },
    { id: '2', status: 'available' },
    { id: '3', status: 'available' },
    { id: '4', status: 'available' },
  ];
};

const ParkingStatus = ({ onSelectSpot }: ParkingStatusProps) => {
  const [spots, setSpots] = useState<ParkingSpotData[]>(generateMockSpots());
  
  // Handle spot selection
  const handleReserveSpot = (id: string) => {
    // Update local state
    setSpots(prev => 
      prev.map(spot => 
        spot.id === id ? { ...spot, status: 'reserved' } : spot
      )
    );
    
    // Call the parent handler to open the reservation modal
    onSelectSpot(id);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-guardian-darkGray mb-2">Parking Spots</h2>
        <p className="text-guardian-gray">Select an available spot to make a reservation</p>
      </div>
      
      {/* Parking Spots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {spots.map((spot) => (
          <ParkingSpot
            key={spot.id}
            id={spot.id}
            status={spot.status}
            onClick={handleReserveSpot}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ParkingStatus;

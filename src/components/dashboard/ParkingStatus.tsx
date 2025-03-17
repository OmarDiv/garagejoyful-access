
import { useState } from 'react';
import { motion } from 'framer-motion';
import ParkingSpot from '@/components/ui/ParkingSpot';
import { CheckCircle, Car, Calendar } from 'lucide-react';

// Types
type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpotData {
  id: string;
  status: SpotStatus;
}

interface ParkingStatusProps {
  onSelectSpot: (id: string) => void;
}

// Generate parking spots with some already occupied and reserved
const generateMockSpots = (): ParkingSpotData[] => {
  return [
    { id: '1', status: 'available' },
    { id: '2', status: 'reserved' },
    { id: '3', status: 'occupied' },
    { id: '4', status: 'available' },
  ];
};

const ParkingStatus = ({ onSelectSpot }: ParkingStatusProps) => {
  const [spots, setSpots] = useState<ParkingSpotData[]>(generateMockSpots());
  
  // Calculate totals
  const totalSpots = spots.length;
  const availableSpots = spots.filter(s => s.status === 'available').length;
  const reservedSpots = spots.filter(s => s.status === 'reserved').length;
  const occupiedSpots = spots.filter(s => s.status === 'occupied').length;
  
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
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-guardian-darkGray mb-2">Parking Spots</h2>
        <p className="text-guardian-gray">Select an available spot to make a reservation</p>
      </div>
      
      {/* Parking Statistics Summary */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 mb-6"
      >
        <h3 className="text-lg font-medium text-guardian-darkGray mb-3">Parking Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex flex-col bg-blue-50 rounded-lg p-3 border border-blue-100">
            <span className="text-sm text-guardian-gray">Total Spots</span>
            <span className="text-2xl font-semibold text-guardian-darkGray">{totalSpots}</span>
          </div>
          <div className="flex flex-col bg-green-50 rounded-lg p-3 border border-green-100">
            <span className="text-sm text-guardian-gray">Available</span>
            <span className="text-2xl font-semibold text-guardian-green">{availableSpots}</span>
          </div>
          <div className="flex flex-col bg-blue-50 rounded-lg p-3 border border-blue-100">
            <span className="text-sm text-guardian-gray">Reserved</span>
            <span className="text-2xl font-semibold text-blue-500">{reservedSpots}</span>
          </div>
          <div className="flex flex-col bg-red-50 rounded-lg p-3 border border-red-100">
            <span className="text-sm text-guardian-gray">Occupied</span>
            <span className="text-2xl font-semibold text-guardian-red">{occupiedSpots}</span>
          </div>
        </div>
      </motion.div>
      
      {/* Parking Spots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {spots.map((spot, index) => (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <ParkingSpot
              id={spot.id}
              status={spot.status}
              onClick={handleReserveSpot}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Simplified How It Works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-5"
      >
        <h3 className="text-lg font-medium text-guardian-darkGray mb-3">Quick Guide</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-guardian-blue/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-guardian-blue" />
            </div>
            <div>
              <h4 className="font-medium text-guardian-darkGray">Check Available Spaces</h4>
              <p className="text-sm text-guardian-gray">View real-time availability above</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-guardian-blue/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-guardian-blue" />
            </div>
            <div>
              <h4 className="font-medium text-guardian-darkGray">Reserve Your Spot</h4>
              <p className="text-sm text-guardian-gray">Click on an available spot to reserve it</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-guardian-blue/10 flex items-center justify-center">
              <Car className="w-4 h-4 text-guardian-blue" />
            </div>
            <div>
              <h4 className="font-medium text-guardian-darkGray">Access Garage</h4>
              <p className="text-sm text-guardian-gray">Use the Garage Access page when you arrive</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ParkingStatus;


import { useState } from 'react';
import { motion } from 'framer-motion';
import ParkingSpot from '@/components/ui/ParkingSpot';
import { CheckCircle } from 'lucide-react';

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

  // How it works steps
  const howItWorksSteps = [
    {
      title: "Check Available Spaces",
      description: "View real-time availability of parking spots"
    },
    {
      title: "Reserve Your Spot",
      description: "Select an available spot with a single click"
    },
    {
      title: "Enter Your Details",
      description: "Provide necessary information to secure your spot"
    },
    {
      title: "Access Your Reservation",
      description: "Use the Garage Access page with your details"
    },
    {
      title: "Welcome to Our Garage",
      description: "Park with ease in your reserved spot"
    }
  ];
  
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
      
      {/* Parking Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-guardian-green/10 rounded-xl p-4 border border-guardian-green/30">
          <h3 className="text-lg font-semibold text-guardian-darkGray">
            {spots.filter(s => s.status === 'available').length}
          </h3>
          <p className="text-sm text-guardian-gray">Available Spots</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-guardian-darkGray">
            {spots.filter(s => s.status === 'reserved').length}
          </h3>
          <p className="text-sm text-guardian-gray">Reserved Spots</p>
        </div>
        <div className="bg-guardian-red/10 rounded-xl p-4 border border-guardian-red/30">
          <h3 className="text-lg font-semibold text-guardian-darkGray">
            {spots.filter(s => s.status === 'occupied').length}
          </h3>
          <p className="text-sm text-guardian-gray">Occupied Spots</p>
        </div>
      </div>
      
      {/* Parking Spots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {spots.map((spot) => (
          <ParkingSpot
            key={spot.id}
            id={spot.id}
            status={spot.status}
            onClick={handleReserveSpot}
          />
        ))}
      </div>
      
      {/* How It Works Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mt-10">
        <h2 className="text-xl font-semibold text-guardian-darkGray mb-4">How It Works</h2>
        <div className="space-y-6">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-guardian-blue/10 flex items-center justify-center">
                <span className="text-guardian-blue font-medium">{index + 1}</span>
              </div>
              <div>
                <h3 className="font-medium text-guardian-darkGray">{step.title}</h3>
                <p className="text-sm text-guardian-gray">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ParkingStatus;

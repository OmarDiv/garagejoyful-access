
import { motion, AnimatePresence } from 'framer-motion';
import ParkingSpot from '@/components/ui/ParkingSpot';
import { useState, useEffect } from 'react';

// Types
type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpotData {
  id: string;
  status: SpotStatus;
}

interface ParkingSpotGridProps {
  onSelectSpot: (id: string) => void;
}

const ParkingSpotGrid = ({ onSelectSpot }: ParkingSpotGridProps) => {
  // Initial spots state
  const initialSpots: ParkingSpotData[] = [
    { id: '1', status: 'available' },
    { id: '2', status: 'available' },
    { id: '3', status: 'available' },
    { id: '4', status: 'available' },
  ];

  const [spots, setSpots] = useState<ParkingSpotData[]>(initialSpots);

  // Load spots from sessionStorage if available
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
    sessionStorage.setItem('parkingSpots', JSON.stringify(spots));
  }, [spots]);

  // Animation variants
  const spotVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <AnimatePresence>
        {spots.map((spot, index) => (
          <motion.div
            key={spot.id}
            custom={index}
            variants={spotVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <ParkingSpot
              id={spot.id}
              status={spot.status}
              onClick={onSelectSpot}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ParkingSpotGrid;

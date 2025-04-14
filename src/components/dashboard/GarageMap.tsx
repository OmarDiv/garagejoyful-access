
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpot {
  id: string;
  status: SpotStatus;
  position: {
    x: number;
    y: number;
  };
}

interface GarageMapProps {
  onSelectSpot: (id: string) => void;
}

const GarageMap = ({ onSelectSpot }: GarageMapProps) => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load spots from sessionStorage if available, or generate default layout
    const loadSpots = () => {
      setIsLoading(true);
      
      const storedSpots = sessionStorage.getItem('parkingSpots');
      if (storedSpots) {
        try {
          const parsedSpots = JSON.parse(storedSpots);
          
          // Add positions to the spots if they don't have them
          const spotsWithPositions = parsedSpots.map((spot: any, index: number) => ({
            ...spot,
            position: spot.position || getDefaultPosition(index, parsedSpots.length)
          }));
          
          setSpots(spotsWithPositions);
        } catch (error) {
          console.error('Failed to parse stored spots', error);
          setSpots(generateDefaultSpots());
        }
      } else {
        setSpots(generateDefaultSpots());
      }
      
      setIsLoading(false);
    };
    
    loadSpots();
  }, []);
  
  // Generate default positions in a grid layout
  const getDefaultPosition = (index: number, totalSpots: number) => {
    const cols = Math.ceil(Math.sqrt(totalSpots));
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    return {
      x: col * 110 + 20,
      y: row * 150 + 20
    };
  };

  // Generate default garage layout
  const generateDefaultSpots = (): ParkingSpot[] => {
    // Create a 2x2 grid of parking spots with predefined statuses
    const defaultSpots = [
      { id: '1', status: 'available' as SpotStatus, position: { x: 20, y: 20 } },
      { id: '2', status: 'reserved' as SpotStatus, position: { x: 140, y: 20 } },
      { id: '3', status: 'occupied' as SpotStatus, position: { x: 20, y: 180 } },
      { id: '4', status: 'available' as SpotStatus, position: { x: 140, y: 180 } },
    ];
    
    // Save to sessionStorage
    sessionStorage.setItem('parkingSpots', JSON.stringify(defaultSpots));
    
    return defaultSpots;
  };

  const getStatusIcon = (status: SpotStatus) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="text-guardian-green" />;
      case 'occupied':
        return <XCircle className="text-guardian-red" />;
      case 'reserved':
        return <AlertTriangle className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: SpotStatus) => {
    switch (status) {
      case 'available':
        return 'border-guardian-green bg-guardian-green/10 hover:bg-guardian-green/20';
      case 'occupied':
        return 'border-guardian-red bg-guardian-red/10';
      case 'reserved':
        return 'border-blue-500 bg-blue-500/10';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm mb-8"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-guardian-darkGray">Garage Map</h3>
        <p className="text-sm text-guardian-gray">Visual representation of parking spots</p>
      </div>

      <div className="relative w-full h-[380px] bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-guardian-gray">Loading garage map...</p>
          </div>
        ) : (
          <>
            {/* Garage entry */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-indigo-600 text-white text-xs flex items-center justify-center rounded-b-lg">
              Garage Entrance
            </div>
            
            {/* Render parking spots */}
            {spots.map((spot) => (
              <motion.div
                key={spot.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "absolute w-[100px] h-[140px] border-2 rounded-md p-2 cursor-pointer transition-colors",
                  getStatusColor(spot.status),
                  spot.status !== 'available' && 'cursor-not-allowed'
                )}
                style={{
                  left: `${spot.position.x}px`,
                  top: `${spot.position.y}px`,
                }}
                onClick={() => spot.status === 'available' && onSelectSpot(spot.id)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium bg-white/80 px-1.5 py-0.5 rounded text-guardian-darkGray">
                      Spot {spot.id}
                    </span>
                    {getStatusIcon(spot.status)}
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    {spot.status === 'occupied' && <Car size={36} className="text-guardian-red/50" />}
                    {spot.status === 'reserved' && <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-600 rounded-full">Reserved</div>}
                    {spot.status === 'available' && <div className="text-xs px-2 py-1 bg-guardian-green/20 text-guardian-green rounded-full">Available</div>}
                  </div>
                  
                  {spot.status === 'available' && (
                    <div className="mt-auto text-center">
                      <span className="text-xs text-guardian-darkGray hover:text-guardian-blue">
                        Click to reserve
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Driving lanes */}
            <div className="absolute top-1/2 left-0 w-full h-10 bg-gray-200 transform -translate-y-1/2"></div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GarageMap;

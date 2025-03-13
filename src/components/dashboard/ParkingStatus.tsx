
import { useState } from 'react';
import { motion } from 'framer-motion';
import ParkingSpot from '@/components/ui/ParkingSpot';
import { CirclePlus, Filter, SortAsc, LayoutGrid, LayoutList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types
type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpotData {
  id: string;
  status: SpotStatus;
}

// Mock data for parking spots
const generateMockSpots = (): ParkingSpotData[] => {
  const spots: ParkingSpotData[] = [];
  const statuses: SpotStatus[] = ['available', 'occupied', 'reserved'];
  
  for (let i = 1; i <= 12; i++) {
    const randomStatus = i <= 4 
      ? 'available' 
      : (i >= 10 ? 'reserved' : statuses[Math.floor(Math.random() * 3)]);
    
    spots.push({
      id: `A${i}`,
      status: randomStatus
    });
  }
  
  return spots;
};

const ParkingStatus = () => {
  const [spots, setSpots] = useState<ParkingSpotData[]>(generateMockSpots());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<SpotStatus | 'all'>('all');
  const { toast } = useToast();
  
  const handleReserveSpot = (id: string) => {
    setSpots(prev => 
      prev.map(spot => 
        spot.id === id ? { ...spot, status: 'reserved' } : spot
      )
    );
    
    toast({
      title: "Spot Reserved!",
      description: `You have successfully reserved parking spot ${id}`,
      duration: 3000,
    });
  };
  
  const filteredSpots = spots.filter(spot => 
    filter === 'all' ? true : spot.status === filter
  );
  
  const spotCounts = {
    all: spots.length,
    available: spots.filter(s => s.status === 'available').length,
    occupied: spots.filter(s => s.status === 'occupied').length,
    reserved: spots.filter(s => s.status === 'reserved').length,
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-guardian-darkGray">Parking Status</h2>
          <p className="text-guardian-gray mt-1">Real-time view of all parking spots</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Tabs */}
          <div className="flex p-1 rounded-lg bg-guardian-lightGray">
            {(["all", "available", "occupied", "reserved"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  filter === status
                    ? 'bg-white shadow-sm text-guardian-darkGray'
                    : 'text-guardian-gray hover:text-guardian-darkGray'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({spotCounts[status]})
              </button>
            ))}
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex p-1 rounded-lg bg-guardian-lightGray">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-guardian-darkGray'
                  : 'text-guardian-gray hover:text-guardian-darkGray'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-guardian-darkGray'
                  : 'text-guardian-gray hover:text-guardian-darkGray'
              }`}
              aria-label="List view"
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Parking Spots Grid */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
        : 'space-y-3'
      }>
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => (
            <ParkingSpot
              key={spot.id}
              id={spot.id}
              status={spot.status}
              onClick={handleReserveSpot}
              className={viewMode === 'list' ? 'flex justify-between items-center' : ''}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-guardian-lightGray rounded-xl">
            <p className="text-guardian-gray">No parking spots match your filter.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ParkingStatus;

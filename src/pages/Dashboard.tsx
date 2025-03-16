
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ParkingSpot from '@/components/ui/ParkingSpot';
import ReservationModal from '@/components/dashboard/ReservationModal';
import { useToast } from '@/hooks/use-toast';
import PageBackground from '@/components/ui/PageBackground';

// Types
type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpotData {
  id: string;
  status: SpotStatus;
}

const Dashboard = () => {
  // Only 4 parking spots (1, 2, 3, 4)
  const initialSpots: ParkingSpotData[] = [
    { id: '1', status: 'available' },
    { id: '2', status: 'available' },
    { id: '3', status: 'available' },
    { id: '4', status: 'available' },
  ];

  const [spots, setSpots] = useState<ParkingSpotData[]>(initialSpots);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState('');
  const { toast } = useToast();
  
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
  
  return (
    <PageBackground variant="dashboard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <NavBar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-semibold text-guardian-darkGray mb-2">Find Available Parking</h1>
              <p className="text-guardian-gray">Select an available spot to make a reservation</p>
            </div>
            
            {/* Simplified Dashboard Content */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-semibold text-guardian-darkGray mb-6">Parking Spots</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {spots.map((spot) => (
                    <ParkingSpot
                      key={spot.id}
                      id={spot.id}
                      status={spot.status}
                      onClick={handleOpenReservationModal}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-guardian-lightGray/80 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-medium text-guardian-darkGray mb-4">Parking Information</h3>
                <ul className="space-y-2 text-guardian-gray">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-guardian-green"></span>
                    <span>Available - Click to reserve</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-guardian-red"></span>
                    <span>Occupied - Cannot be reserved</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span>Reserved - Already booked</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <h4 className="text-md font-medium text-guardian-darkGray mb-2">Hours of Operation</h4>
                  <ul className="space-y-1 text-guardian-gray">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium text-guardian-darkGray">6:00 AM - 11:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium text-guardian-darkGray">8:00 AM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium text-guardian-darkGray">10:00 AM - 8:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
        
        {/* Reservation Modal */}
        <ReservationModal 
          spotId={selectedSpotId}
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          onConfirm={handleConfirmReservation}
        />
      </motion.div>
    </PageBackground>
  );
};

export default Dashboard;

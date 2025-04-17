
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ReservationModal from '@/components/dashboard/ReservationModal';
import { useToast } from '@/hooks/use-toast';
import PageBackground from '@/components/ui/PageBackground';
import { useAuth } from '@/hooks/auth';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ParkingContainer from '@/components/dashboard/ParkingContainer';

// New types for API integration
interface ParkingSpot {
  id: string;
  status: 'available' | 'occupied' | 'reserved';
  level: string;
  section: string;
}

interface ReservationData {
  spotId: string;
  fullName: string;
  email: string;
  phone: string;
  carPlate: string;
  carModel: string;
  timestamp: string;
  parkingSession: {
    reservationTime: string;
    timeToAccess: number;
  }
}

const Dashboard = () => {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState('');
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast: uiToast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Fetch parking spots from API
  useEffect(() => {
    // This will be replaced with actual API call to .NET backend
    const fetchParkingSpots = async () => {
      try {
        setIsLoading(true);
        
        // In the future, replace with actual API call:
        // const response = await fetch('https://your-dotnet-api.com/api/parking-spots');
        // const data = await response.json();
        
        // For now, use mock data from sessionStorage if available
        const storedSpots = sessionStorage.getItem('parkingSpots');
        if (storedSpots) {
          setParkingSpots(JSON.parse(storedSpots));
        } else {
          // Mock data if no stored data
          const mockSpots = [
            { id: '1', status: 'available', level: '1', section: 'A' },
            { id: '2', status: 'reserved', level: '1', section: 'A' },
            { id: '3', status: 'occupied', level: '1', section: 'A' },
            { id: '4', status: 'available', level: '1', section: 'A' },
          ];
          setParkingSpots(mockSpots);
          sessionStorage.setItem('parkingSpots', JSON.stringify(mockSpots));
        }
      } catch (error) {
        console.error('Error fetching parking spots:', error);
        uiToast({
          title: "Error",
          description: "Failed to load parking spots. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchParkingSpots();
  }, [uiToast]);
  
  const handleOpenReservationModal = (id: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to reserve a parking spot");
      navigate('/auth', { state: { from: { pathname: '/dashboard' } } });
      return;
    }
    
    setSelectedSpotId(id);
    setIsReservationModalOpen(true);
  };
  
  const handleConfirmReservation = async (formData: any) => {
    try {
      // Store reservation data with current time
      const reservationTime = new Date().toLocaleTimeString();
      
      const reservationData: ReservationData = {
        spotId: selectedSpotId,
        ...formData,
        timestamp: new Date().toISOString(),
        parkingSession: {
          reservationTime,
          timeToAccess: 15 // 15 minutes to access the gate
        }
      };
      
      // In the future, replace with actual API call:
      // await fetch('https://your-dotnet-api.com/api/reservations', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user?.token}` // Add auth token if needed
      //   },
      //   body: JSON.stringify(reservationData)
      // });
      
      // For now, store in sessionStorage
      sessionStorage.setItem('reservation', JSON.stringify(reservationData));
      sessionStorage.setItem('reservationSpot', JSON.stringify({
        spotId: selectedSpotId,
        timestamp: new Date().toISOString()
      }));
      
      // Update local parking spots state
      const updatedSpots = parkingSpots.map(spot => 
        spot.id === selectedSpotId ? { ...spot, status: 'reserved' } : spot
      );
      setParkingSpots(updatedSpots);
      sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
      
      toast.success("Reservation confirmed", {
        description: `Spot #${selectedSpotId} has been reserved successfully.`
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error("Failed to create reservation", {
        description: "Please try again later."
      });
    }
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
            <DashboardHeader />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {isLoading ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-guardian-gray">Loading parking spots...</p>
                </div>
              ) : (
                <ParkingContainer onSelectSpot={handleOpenReservationModal} />
              )}
            </motion.div>
          </div>
        </main>
        
        <Footer />
        
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

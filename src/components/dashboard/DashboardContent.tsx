
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReservationModal from '@/components/dashboard/ReservationModal';
import { useToast } from '@/hooks/use-toast';
import PageBackground from '@/components/ui/PageBackground';
import { useAuth } from '@/hooks/auth';
import { toast } from 'sonner';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ParkingContainer from '@/components/dashboard/ParkingContainer';
import { ParkingSpot } from '@/components/garage/types';
import api from '@/services/api';

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

const DashboardContent = () => {
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

        // For now, use mock data from sessionStorage if available
        const storedSpots = sessionStorage.getItem('parkingSpots');
        if (storedSpots) {
          const parsed = JSON.parse(storedSpots);
          // Ensure the data conforms to our ParkingSpot type
          const typedSpots: ParkingSpot[] = parsed.map((spot: any) => ({
            id: spot.id,
            // Ensure status is one of the allowed values, default to 'available' if not
            status: (spot.status === 'available' || spot.status === 'reserved' || spot.status === 'occupied')
              ? spot.status as ParkingSpot['status']
              : 'available',
            level: spot.level,
            section: spot.section
          }));
          setParkingSpots(typedSpots);
        } else {
          // Mock data if no stored data
          const mockSpots: ParkingSpot[] = [
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
      const reservationTime = new Date().toLocaleTimeString();
      const currentDate = new Date().toLocaleDateString();

      const reservationData: ReservationData = {
        spotId: selectedSpotId,
        ...formData,
        timestamp: new Date().toISOString(),
        parkingSession: {
          reservationTime,
          timeToAccess: 15 // 15 minutes to access the gate
        }
      };

      sessionStorage.setItem('reservation', JSON.stringify(reservationData));

      // Create a new reservation entry for the reservations page
      const reservationId = `res-${Date.now()}`;
      const newReservation = {
        id: reservationId,
        date: currentDate,
        time: reservationTime,
        spotId: selectedSpotId,
        status: 'pending', // Initial status is pending
        userId: user?.id || 'guest',
        carDetails: {
          make: formData.carMake || 'Not specified',
          model: formData.carModel,
          licensePlate: formData.carPlate
        },
        parkingSession: {
          reservationTime,
          timeToAccess: 15,
          startTime: ''
        },
        accessCode: `PARK-${Math.floor(1000 + Math.random() * 9000)}`
      };

      // Store the reservation in sessionStorage for the reservations page
      const storedReservations = sessionStorage.getItem('userReservations');
      let userReservations = storedReservations ? JSON.parse(storedReservations) : [];
      userReservations = [newReservation, ...userReservations];
      sessionStorage.setItem('userReservations', JSON.stringify(userReservations));

      // Update spot status in sessionStorage
      const updatedSpots = parkingSpots.map(spot =>
        spot.id === selectedSpotId ? { ...spot, status: 'reserved' as const } : spot
      );
      setParkingSpots(updatedSpots);
      sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));

      toast.success("Reservation confirmed", {
        description: `Spot #${selectedSpotId} has been reserved successfully.`
      });

      // Store active reservation ID for easy reference
      sessionStorage.setItem('activeReservationId', reservationId);
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error("Failed to create reservation", {
        description: "Please try again later."
      });
    }
  };

  return (
    <>
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



import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReservationCard from './ReservationCard';
import ReservationsEmptyState from './ReservationsEmptyState';
import { Reservation } from './types';
import { useAuth } from '@/hooks/useAuth';

const ReservationsContainer = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch reservations data (simulated) - modified to be user-specific
  useEffect(() => {
    if (!user) {
      setReservations([]);
      setIsLoading(false);
      return;
    }
    
    // This would be replaced with an actual API call filtering by user ID
    const mockReservations: Reservation[] = [
      {
        id: 'res-1',
        date: '2025-04-14',
        time: '10:00 AM - 12:00 PM',
        spotId: '2',
        status: 'active',
        userId: user.id,
        carDetails: {
          make: 'Toyota',
          model: 'Camry',
          licensePlate: 'ABC-1234'
        }
      },
      {
        id: 'res-2',
        date: '2025-04-10',
        time: '2:00 PM - 4:00 PM',
        spotId: '3',
        status: 'completed',
        userId: user.id,
        carDetails: {
          make: 'Honda',
          model: 'Civic',
          licensePlate: 'XYZ-5678'
        }
      },
      {
        id: 'res-3',
        date: '2025-04-05',
        time: '9:00 AM - 11:00 AM',
        spotId: '1',
        status: 'cancelled',
        userId: user.id,
        carDetails: {
          make: 'Tesla',
          model: 'Model 3',
          licensePlate: 'ELK-9012'
        }
      }
    ];

    // Simulate loading delay and filtering by user ID
    setTimeout(() => {
      // In a real app, this filtering would happen on the server
      const userReservations = mockReservations.filter(res => res.userId === user.id);
      setReservations(userReservations);
      setIsLoading(false);
    }, 1000);
  }, [user]);

  // Get reservations by status
  const getReservationsByStatus = (status: 'active' | 'completed' | 'cancelled') => {
    return reservations.filter(res => res.status === status);
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

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-guardian-gray">Loading your reservations...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p className="text-guardian-gray">Please sign in to view your reservations.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-guardian-blue">My Parking History</h3>
        <p className="text-sm text-guardian-gray mt-1">
          {user.name}'s reservation history and upcoming bookings
        </p>
      </div>
    
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            ) : (
              <ReservationsEmptyState />
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="active">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {getReservationsByStatus('active').length > 0 ? (
              getReservationsByStatus('active').map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            ) : (
              <ReservationsEmptyState status="active" />
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="completed">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {getReservationsByStatus('completed').length > 0 ? (
              getReservationsByStatus('completed').map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            ) : (
              <ReservationsEmptyState status="completed" />
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="cancelled">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {getReservationsByStatus('cancelled').length > 0 ? (
              getReservationsByStatus('cancelled').map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            ) : (
              <ReservationsEmptyState status="cancelled" />
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReservationsContainer;

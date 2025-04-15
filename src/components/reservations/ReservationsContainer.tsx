
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        date: '2025-04-18',
        time: '10:00 AM - 12:00 PM',
        spotId: '2',
        status: 'active',
        userId: user.id,
        carDetails: {
          make: 'Toyota',
          model: 'Camry',
          licensePlate: 'ABC-1234'
        },
        paymentDetails: {
          amount: 15,
          currency: 'USD',
          paid: true
        },
        duration: {
          hours: 2,
          minutes: 0
        },
        location: {
          level: '1',
          section: 'A'
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
        },
        paymentDetails: {
          amount: 12,
          currency: 'USD',
          paid: true
        },
        duration: {
          hours: 2,
          minutes: 0
        },
        location: {
          level: '2',
          section: 'B'
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
        },
        paymentDetails: {
          amount: 20,
          currency: 'USD',
          paid: false
        },
        duration: {
          hours: 2,
          minutes: 0
        },
        location: {
          level: '1',
          section: 'C'
        }
      },
      {
        id: 'res-4',
        date: '2025-04-25',
        time: '3:00 PM - 6:00 PM',
        spotId: '5',
        status: 'active',
        userId: user.id,
        carDetails: {
          make: 'Ford',
          model: 'Mustang',
          licensePlate: 'SPD-7890'
        },
        paymentDetails: {
          amount: 25,
          currency: 'USD',
          paid: true
        },
        duration: {
          hours: 3,
          minutes: 0
        },
        location: {
          level: '3',
          section: 'A'
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

  const getActiveReservationsCount = () => {
    return getReservationsByStatus('active').length;
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
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 bg-blue-50 p-4 rounded-lg"
      >
        <h3 className="text-lg font-medium text-guardian-blue">My Parking History</h3>
        <p className="text-sm text-guardian-gray mt-1">
          {user.name}'s reservation history and upcoming bookings
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active: {getActiveReservationsCount()}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Completed: {getReservationsByStatus('completed').length}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelled: {getReservationsByStatus('cancelled').length}
          </span>
        </div>
      </motion.div>
    
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="all">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
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
              exit={{ opacity: 0, y: 20 }}
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
              exit={{ opacity: 0, y: 20 }}
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
              exit={{ opacity: 0, y: 20 }}
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
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default ReservationsContainer;

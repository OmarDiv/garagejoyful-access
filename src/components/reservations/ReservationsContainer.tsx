
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth';
import { Reservation } from './types';
import ReservationStats from './ReservationStats';
import ReservationTabContent from './ReservationTabContent';
import ReservationsLoading from './ReservationsLoading';
import { getMockReservations } from './utils/mockData';

const ReservationsContainer = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setReservations([]);
      setIsLoading(false);
      return;
    }

    // Function to load reservations
    const loadReservations = () => {
      setIsLoading(true);
      const userReservations = getMockReservations(user.id)
        .sort((a, b) => {
          if (a.status === 'active') return -1;
          if (b.status === 'active') return 1;
          if (a.status === 'pending') return -1;
          if (b.status === 'pending') return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      setReservations(userReservations);
      setIsLoading(false);
    };

    // Initial load
    loadReservations();
    
    // Listen for storage events to update reservations when they change
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userReservations') {
        loadReservations();
      }
    };
    
    // Monitor for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Create an interval to check for sessionStorage updates (since storage event doesn't fire in same tab)
    const interval = setInterval(() => {
      const storedReservations = sessionStorage.getItem('userReservations');
      if (storedReservations) {
        try {
          const parsed = JSON.parse(storedReservations);
          const userReservations = parsed.filter((res: Reservation) => res.userId === user.id);
          
          // Only update if the data has changed
          if (JSON.stringify(userReservations) !== JSON.stringify(reservations)) {
            loadReservations();
          }
        } catch (error) {
          console.error('Error checking for reservation updates', error);
        }
      }
    }, 2000); // Check every 2 seconds
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  const getReservationsByStatus = (status: 'active' | 'completed' | 'cancelled' | 'pending') => {
    return reservations.filter(res => res.status === status);
  };

  if (isLoading) {
    return <ReservationsLoading />;
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
      <ReservationStats 
        reservations={reservations} 
        getReservationsByStatus={getReservationsByStatus}
      />
    
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="all">
            <ReservationTabContent reservations={reservations} />
          </TabsContent>
          
          <TabsContent value="pending">
            <ReservationTabContent 
              reservations={getReservationsByStatus('pending')} 
              status="pending" 
            />
          </TabsContent>

          <TabsContent value="active">
            <ReservationTabContent 
              reservations={getReservationsByStatus('active')} 
              status="active" 
            />
          </TabsContent>

          <TabsContent value="completed">
            <ReservationTabContent 
              reservations={getReservationsByStatus('completed')} 
              status="completed" 
            />
          </TabsContent>

          <TabsContent value="cancelled">
            <ReservationTabContent 
              reservations={getReservationsByStatus('cancelled')} 
              status="cancelled" 
            />
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default ReservationsContainer;

import { useState } from 'react';
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

const Dashboard = () => {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState('');
  const { toast: uiToast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleOpenReservationModal = (id: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to reserve a parking spot");
      navigate('/auth', { state: { from: { pathname: '/dashboard' } } });
      return;
    }
    
    setSelectedSpotId(id);
    setIsReservationModalOpen(true);
  };
  
  const handleConfirmReservation = (formData: any) => {
    sessionStorage.setItem('reservationSpot', JSON.stringify({
      spotId: selectedSpotId,
      timestamp: new Date().toISOString()
    }));
    
    sessionStorage.setItem('reservation', JSON.stringify(formData));
    
    const storedSpots = sessionStorage.getItem('parkingSpots');
    if (storedSpots) {
      try {
        const parsedSpots = JSON.parse(storedSpots);
        const updatedSpots = parsedSpots.map((spot: any) => 
          spot.id === selectedSpotId ? { ...spot, status: 'reserved' } : spot
        );
        sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
      } catch (error) {
        console.error('Failed to update spots', error);
      }
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
            <ParkingContainer onSelectSpot={handleOpenReservationModal} />
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

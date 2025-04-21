
import { motion } from 'framer-motion';
import { Calendar, Clock, LogOut, X as XIcon, DoorOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reservation } from './types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import StatusBadge from './StatusBadge';
import CarDetailsCard from './CarDetailsCard';
import ParkingSessionDetails from './ParkingSessionDetails';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [parkingStartTime, setParkingStartTime] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(
    reservation.status === 'pending' ? (reservation.parkingSession?.timeToAccess || 15) : 0
  );
  const [status, setStatus] = useState(reservation.status);

  // Timer for pending reservations
  useEffect(() => {
    let timer: number | undefined;
    if (status === 'pending' && !hasEntered && remainingTime > 0) {
      timer = window.setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            handleCancelReservation();
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 60000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, hasEntered, remainingTime]);

  const handleOpenGarage = () => {
    setStatus('active');
    const currentTime = new Date().toLocaleTimeString();
    setParkingStartTime(currentTime);
    setHasEntered(true);
    updateReservationStatus('active', currentTime);
    updateParkingSpotStatus('occupied');
    toast.success('Opening garage door...', {
      description: `Access code: ${reservation.accessCode || 'XXXX-XXXX'}`,
    });
  };

  const handleCancelReservation = () => {
    setStatus('cancelled');
    updateReservationStatus('cancelled');
    updateParkingSpotStatus('available');
    toast.info('Reservation cancelled', {
      description: 'Your reservation has been cancelled successfully',
    });
  };

  const handleEndParking = () => {
    const endTime = new Date().toLocaleTimeString();
    const duration = parkingStartTime ? calculateDuration(parkingStartTime, endTime) : 'N/A';
    setStatus('completed');
    updateReservationStatus('completed', parkingStartTime, endTime);
    updateParkingSpotStatus('available');
    toast.success('Parking session ended', {
      description: `Duration: ${duration}`,
    });
    setHasEntered(false);
    setParkingStartTime(null);
  };

  // Helper function to update reservation in sessionStorage
  const updateReservationStatus = (newStatus: string, startTime?: string, endTime?: string) => {
    const storedReservations = sessionStorage.getItem('userReservations');
    if (storedReservations) {
      const reservations = JSON.parse(storedReservations);
      const updatedReservations = reservations.map((res: any) => {
        if (res.id === reservation.id) {
          const updatedRes = { ...res, status: newStatus };
          if (startTime) {
            updatedRes.parkingSession = {
              ...updatedRes.parkingSession,
              startTime
            };
          }
          if (endTime) {
            updatedRes.parkingSession = {
              ...updatedRes.parkingSession,
              endTime
            };
          }
          return updatedRes;
        }
        return res;
      });
      sessionStorage.setItem('userReservations', JSON.stringify(updatedReservations));
    }
  };

  // Helper function to update parking spot status in sessionStorage
  const updateParkingSpotStatus = (newStatus: 'available' | 'occupied' | 'reserved') => {
    const storedSpots = sessionStorage.getItem('parkingSpots');
    if (storedSpots) {
      const spots = JSON.parse(storedSpots);
      const updatedSpots = spots.map((spot: any) => {
        if (spot.id === reservation.spotId) {
          return { ...spot, status: newStatus };
        }
        return spot;
      });
      sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
    }
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(`1970/01/01 ${start}`);
    const endDate = new Date(`1970/01/01 ${end}`);
    const diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card className={`mb-4 overflow-hidden hover:shadow-md transition-shadow ${
        status === 'active' ? 'border-green-200 bg-green-50/30' : 
        status === 'pending' ? 'border-yellow-200 bg-yellow-50/30' : ''
      }`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Parking Spot #{reservation.spotId}</CardTitle>
            <StatusBadge status={status} remainingTime={remainingTime} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-guardian-gray">
                <Calendar size={16} className="text-indigo-600" />
                <span>{reservation.date}</span>
              </div>
              <div className="flex items-center gap-2 text-guardian-gray">
                <Clock size={16} className="text-indigo-600" />
                <span>{reservation.time}</span>
              </div>

              <CarDetailsCard carDetails={reservation.carDetails} />

              {/* Parking session details - Show when active or expanded */}
              {(status === 'active' || hasEntered || isExpanded) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <ParkingSessionDetails
                    reservationTime={reservation.parkingSession?.reservationTime || reservation.time}
                    startTime={parkingStartTime}
                    hasEntered={hasEntered}
                  />
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2 justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>

            <div className="flex gap-2">
              {status === 'pending' && remainingTime > 0 && !hasEntered && (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleCancelReservation}
                  >
                    <XIcon className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button 
                    variant="default"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleOpenGarage}
                  >
                    <DoorOpen className="mr-1 h-4 w-4" />
                    Open Gate
                  </Button>
                </>
              )}
              {(status === 'active' || hasEntered) && !parkingStartTime && (
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleOpenGarage}
                >
                  <DoorOpen className="mr-1 h-4 w-4" />
                  Open Gate
                </Button>
              )}
              {hasEntered && parkingStartTime && (
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleEndParking}
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  End Parking
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReservationCard;

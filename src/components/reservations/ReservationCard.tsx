
import { motion } from 'framer-motion';
import { Calendar, Clock, Car, Timer, DoorOpen, LogOut, X as XIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reservation } from './types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
            // Time's up - automatically cancel reservation
            handleCancelReservation();
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute for demo - would be longer in production
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, hasEntered, remainingTime]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleOpenGarage = () => {
    // Update reservation status to active
    setStatus('active');
    const currentTime = new Date().toLocaleTimeString();
    setParkingStartTime(currentTime);
    setHasEntered(true);
    
    // Update in sessionStorage
    updateReservationStatus('active', currentTime);
    
    // Update parking spot status to occupied in sessionStorage
    updateParkingSpotStatus('occupied');
    
    toast.success('Opening garage door...', {
      description: `Access code: ${reservation.accessCode || 'XXXX-XXXX'}`,
    });
  };

  const handleCancelReservation = () => {
    // Update reservation status
    setStatus('cancelled');
    
    // Update in sessionStorage
    updateReservationStatus('cancelled');
    
    // Make the spot available again
    updateParkingSpotStatus('available');
    
    toast.info('Reservation cancelled', {
      description: 'Your reservation has been cancelled successfully',
    });
  };

  const handleEndParking = () => {
    const endTime = new Date().toLocaleTimeString();
    const duration = parkingStartTime ? calculateDuration(parkingStartTime, endTime) : 'N/A';
    
    // Update reservation status
    setStatus('completed');
    
    // Update in sessionStorage
    updateReservationStatus('completed', parkingStartTime, endTime);
    
    // Make the spot available again
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
          
          // Update parking session details if provided
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

  const getStatusBadge = () => {
    if (status === 'pending' && remainingTime > 0) {
      return (
        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-700">
          <Timer size={14} />
          <span>Pending ({remainingTime}m)</span>
        </span>
      );
    }
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
            {getStatusBadge()}
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
              
              {/* Car details */}
              <div className="p-3 bg-gray-50 rounded-lg mt-3">
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Car size={16} className="text-indigo-600" />
                  Vehicle Details
                </h4>
                <div className="text-sm space-y-1 text-guardian-gray">
                  <p>{reservation.carDetails.make} {reservation.carDetails.model}</p>
                  <p>License: {reservation.carDetails.licensePlate}</p>
                </div>
              </div>
              
              {/* Parking session details - Show when active or expanded */}
              {(status === 'active' || hasEntered || isExpanded) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 bg-blue-50 rounded-lg"
                >
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Timer size={16} className="text-blue-600" />
                    Parking Session
                  </h4>
                  <div className="text-sm space-y-1 text-guardian-gray">
                    <p>Reservation Time: {reservation.parkingSession?.reservationTime || reservation.time}</p>
                    {parkingStartTime && (
                      <p>Start Time: {parkingStartTime}</p>
                    )}
                    {hasEntered && (
                      <p>Status: <span className="text-green-600 font-medium">In Progress</span></p>
                    )}
                  </div>
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

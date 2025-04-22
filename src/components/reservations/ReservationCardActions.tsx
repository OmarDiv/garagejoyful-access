
import { DoorOpen, LogOut, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Reservation } from './types';
import { calculateDuration } from './reservationUtils';
import api from '@/services/api';

interface ReservationCardActionsProps {
  reservation: Reservation;
  status: Reservation['status'];
  hasEntered: boolean;
  parkingStartTime: string | null;
  remainingTime: number;
  setStatus: (status: Reservation['status']) => void;
  setHasEntered: (b: boolean) => void;
  setParkingStartTime: (t: string | null) => void;
  setRemainingTime: (t: number) => void;
  setIsExpanded: (v: boolean) => void;
  isExpanded: boolean;
}

const ReservationCardActions = ({
  reservation,
  status,
  hasEntered,
  parkingStartTime,
  remainingTime,
  setStatus,
  setHasEntered,
  setParkingStartTime,
  setRemainingTime,
  setIsExpanded,
  isExpanded,
}: ReservationCardActionsProps) => {
  // Helper: update in storage
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
    
    // Also call API to update spot status
    try {
      api.updateParkingSpotStatus(reservation.spotId, newStatus);
    } catch (error) {
      console.error('Failed to update parking spot status', error);
    }
  };

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
    updateReservationStatus('completed', parkingStartTime || undefined, endTime);
    updateParkingSpotStatus('available');
    toast.success('Parking session ended', {
      description: `Duration: ${duration}`,
    });
  };

  return (
    <div className="mt-4 flex gap-2 justify-between items-center">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="transition-all duration-300 hover:text-indigo-600"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </Button>

      <div className="flex gap-2">
        {status === 'pending' && remainingTime > 0 && !hasEntered && (
          <>
            <Button 
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 transition-all duration-300"
              onClick={handleCancelReservation}
            >
              <XIcon className="mr-1 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700 transition-all duration-300"
              onClick={handleOpenGarage}
            >
              <DoorOpen className="mr-1 h-4 w-4" />
              Open Gate
            </Button>
          </>
        )}
        {status === 'active' && !hasEntered && (
          <Button 
            variant="default"
            size="sm"
            className="bg-green-600 hover:bg-green-700 transition-all duration-300"
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
            className="bg-red-600 hover:bg-red-700 transition-all duration-300"
            onClick={handleEndParking}
          >
            <LogOut className="mr-1 h-4 w-4" />
            End Parking
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReservationCardActions;

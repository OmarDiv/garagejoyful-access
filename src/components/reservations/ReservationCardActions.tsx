
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
  updateReservationStatus: (newStatus: string, startTime?: string, endTime?: string) => void;
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
  updateReservationStatus,
}: ReservationCardActionsProps) => {
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
    const currentTime = new Date().toLocaleTimeString();
    setStatus('active');
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
    setHasEntered(false); // Reset hasEntered to ensure button won't show again
    updateReservationStatus('completed', parkingStartTime || undefined, endTime);
    updateParkingSpotStatus('available');
    
    toast.success('Parking session ended', {
      description: `Duration: ${duration}`,
    });
  };

  // This function determines which buttons to show based on current state
  const renderActionButtons = () => {
    if (status === 'completed' || status === 'cancelled') {
      // No action buttons for completed or cancelled reservations
      return null;
    }
    
    if (status === 'pending' && remainingTime > 0 && !hasEntered) {
      return (
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
      );
    }
    
    if (status === 'active' && !hasEntered) {
      return (
        <Button 
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 transition-all duration-300"
          onClick={handleOpenGarage}
        >
          <DoorOpen className="mr-1 h-4 w-4" />
          Open Gate
        </Button>
      );
    }
    
    if (status === 'active' && hasEntered && parkingStartTime) {
      return (
        <Button 
          variant="default"
          size="sm"
          className="bg-red-600 hover:bg-red-700 transition-all duration-300"
          onClick={handleEndParking}
        >
          <LogOut className="mr-1 h-4 w-4" />
          End Parking
        </Button>
      );
    }
    
    return null;
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
        {renderActionButtons()}
      </div>
    </div>
  );
};

export default ReservationCardActions;

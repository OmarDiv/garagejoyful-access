
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useReservationState } from './hooks/useReservationState';
import ReservationCardHeader from './ReservationCardHeader';
import ReservationCardDetails from './ReservationCardDetails';
import { Reservation } from './types';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { status, hasEntered, parkingStartTime, remainingTime, setState, updateReservationStatusInStorage } = useReservationState(reservation);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
      className="mb-4"
    >
      <Card className={`overflow-hidden hover:shadow-md transition-all duration-300 ${
        status === 'active' ? 'border-green-200 bg-green-50/30' : 
        status === 'pending' ? 'border-yellow-200 bg-yellow-50/30' : 
        status === 'completed' ? 'border-blue-200 bg-blue-50/30' : 
        status === 'cancelled' ? 'border-red-200 bg-red-50/30' : ''
      }`}>
        <ReservationCardHeader 
          spotId={reservation.spotId}
          status={status}
          remainingTime={remainingTime}
        />
        <ReservationCardDetails
          reservation={reservation}
          status={status}
          hasEntered={hasEntered}
          parkingStartTime={parkingStartTime}
          remainingTime={remainingTime}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          setState={setState}
          updateReservationStatusInStorage={updateReservationStatusInStorage}
        />
      </Card>
    </motion.div>
  );
};

export default ReservationCard;

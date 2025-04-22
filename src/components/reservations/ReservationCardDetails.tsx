
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import CarDetailsCard from './CarDetailsCard';
import ParkingSessionDetails from './ParkingSessionDetails';
import ReservationCardActions from './ReservationCardActions';
import { Reservation } from './types';

interface ReservationCardDetailsProps {
  reservation: Reservation;
  status: Reservation['status'];
  hasEntered: boolean;
  parkingStartTime: string | null;
  remainingTime: number;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  setState: (value: any) => void;
  updateReservationStatusInStorage: (newStatus: string, startTime?: string, endTime?: string) => void;
}

const ReservationCardDetails = ({
  reservation,
  status,
  hasEntered,
  parkingStartTime,
  remainingTime,
  isExpanded,
  setIsExpanded,
  setState,
  updateReservationStatusInStorage
}: ReservationCardDetailsProps) => {
  return (
    <CardContent>
      <motion.div className="grid grid-cols-1 gap-4">
        <div className="space-y-3">
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-guardian-gray"
          >
            <Calendar size={16} className="text-indigo-600" />
            <span>{reservation.date}</span>
          </motion.div>
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-guardian-gray"
          >
            <Clock size={16} className="text-indigo-600" />
            <span>{reservation.time}</span>
          </motion.div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CarDetailsCard carDetails={reservation.carDetails} />
          </motion.div>

          {(status === 'active' || hasEntered || isExpanded) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ParkingSessionDetails
                reservationTime={reservation.parkingSession?.reservationTime || reservation.time}
                startTime={parkingStartTime}
                hasEntered={hasEntered}
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      <ReservationCardActions
        reservation={reservation}
        status={status}
        hasEntered={hasEntered}
        parkingStartTime={parkingStartTime}
        remainingTime={remainingTime}
        setStatus={(newStatus) => setState(prev => ({ ...prev, status: newStatus }))}
        setHasEntered={(value) => setState(prev => ({ ...prev, hasEntered: value }))}
        setParkingStartTime={(value) => setState(prev => ({ ...prev, parkingStartTime: value }))}
        setRemainingTime={(value) => setState(prev => ({ ...prev, remainingTime: value }))}
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
        updateReservationStatus={updateReservationStatusInStorage}
      />
    </CardContent>
  );
};

export default ReservationCardDetails;

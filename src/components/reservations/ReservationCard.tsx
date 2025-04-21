
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import CarDetailsCard from './CarDetailsCard';
import ParkingSessionDetails from './ParkingSessionDetails';
import ReservationCardActions from './ReservationCardActions';
import { Reservation } from './types';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [parkingStartTime, setParkingStartTime] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(
    reservation.status === 'pending' ? (reservation.parkingSession?.timeToAccess ?? 15) : 0
  );
  const [status, setStatus] = useState(reservation.status);

  // Timer for pending reservations
  useEffect(() => {
    let timer: number | undefined;
    if (status === 'pending' && !hasEntered && remainingTime > 0) {
      timer = window.setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setStatus('cancelled');
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

          <ReservationCardActions
            reservation={reservation}
            status={status}
            hasEntered={hasEntered}
            parkingStartTime={parkingStartTime}
            remainingTime={remainingTime}
            setStatus={setStatus}
            setHasEntered={setHasEntered}
            setParkingStartTime={setParkingStartTime}
            setRemainingTime={setRemainingTime}
            setIsExpanded={setIsExpanded}
            isExpanded={isExpanded}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReservationCard;

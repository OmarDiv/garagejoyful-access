
import { motion } from 'framer-motion';
import { CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { Reservation } from './types';

interface ReservationCardHeaderProps {
  spotId: string;
  status: Reservation['status'];
  remainingTime: number;
}

const ReservationCardHeader = ({ spotId, status, remainingTime }: ReservationCardHeaderProps) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <CardTitle className="text-lg font-medium flex items-center">
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mr-2 bg-indigo-100 text-indigo-600 p-1 rounded-full flex items-center justify-center w-7 h-7 text-sm"
          >
            {spotId}
          </motion.span>
          Parking Spot #{spotId}
        </CardTitle>
        <StatusBadge status={status} remainingTime={remainingTime} />
      </div>
    </CardHeader>
  );
};

export default ReservationCardHeader;

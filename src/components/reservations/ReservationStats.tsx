
import { motion } from 'framer-motion';
import { Reservation } from './types';

interface ReservationStatsProps {
  reservations: Reservation[];
  getReservationsByStatus: (status: 'active' | 'completed' | 'cancelled') => Reservation[];
}

const ReservationStats = ({ reservations, getReservationsByStatus }: ReservationStatsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 bg-blue-50 p-4 rounded-lg"
    >
      <h3 className="text-lg font-medium text-guardian-blue">My Parking History</h3>
      <p className="text-sm text-guardian-gray mt-1">
        Reservation history and upcoming bookings
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active: {getReservationsByStatus('active').length}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Completed: {getReservationsByStatus('completed').length}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Cancelled: {getReservationsByStatus('cancelled').length}
        </span>
      </div>
    </motion.div>
  );
};

export default ReservationStats;

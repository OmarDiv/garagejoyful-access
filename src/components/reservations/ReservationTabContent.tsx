
import { motion } from 'framer-motion';
import { Reservation } from './types';
import ReservationCard from './ReservationCard';
import ReservationsEmptyState from './ReservationsEmptyState';

interface ReservationTabContentProps {
  reservations: Reservation[];
  status?: 'active' | 'completed' | 'cancelled' | 'pending';
}

const ReservationTabContent = ({ reservations, status }: ReservationTabContentProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20 }}
    >
      {reservations.length > 0 ? (
        reservations.map(reservation => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <ReservationsEmptyState status={status} />
      )}
    </motion.div>
  );
};

export default ReservationTabContent;

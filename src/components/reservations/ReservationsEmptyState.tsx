
import { motion } from 'framer-motion';
import { Calendar, AlertTriangle, ThumbsUp, Clock } from 'lucide-react';

interface ReservationsEmptyStateProps {
  status?: 'active' | 'completed' | 'cancelled' | 'pending';
}

const ReservationsEmptyState = ({ status }: ReservationsEmptyStateProps) => {
  let icon = <Calendar className="w-12 h-12 text-guardian-gray/50" />;
  let title = "No Reservations";
  let description = "You don't have any parking reservations yet.";

  if (status === 'active') {
    icon = <Clock className="w-12 h-12 text-blue-400" />;
    title = "No Active Reservations";
    description = "You don't have any active parking sessions at the moment.";
  } else if (status === 'completed') {
    icon = <ThumbsUp className="w-12 h-12 text-green-400" />;
    title = "No Completed Reservations";
    description = "You don't have any completed parking reservations yet.";
  } else if (status === 'cancelled') {
    icon = <AlertTriangle className="w-12 h-12 text-red-400" />;
    title = "No Cancelled Reservations";
    description = "You don't have any cancelled reservations.";
  } else if (status === 'pending') {
    icon = <Clock className="w-12 h-12 text-yellow-400" />;
    title = "No Pending Reservations";
    description = "You don't have any upcoming reservations waiting to be used.";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center p-10 rounded-lg bg-white shadow-sm border border-gray-100"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h3 className="mt-4 text-xl font-medium text-guardian-darkGray">{title}</h3>
      <p className="mt-2 text-guardian-gray">{description}</p>
    </motion.div>
  );
};

export default ReservationsEmptyState;


import { motion } from 'framer-motion';
import { CalendarX } from 'lucide-react';

interface ReservationsEmptyStateProps {
  status?: 'active' | 'completed' | 'cancelled' | 'pending';
}

const ReservationsEmptyState = ({ status }: ReservationsEmptyStateProps) => {
  const getMessage = () => {
    switch (status) {
      case 'active':
        return 'You have no active parking sessions';
      case 'completed':
        return 'You have no completed reservations';
      case 'cancelled':
        return 'You have no cancelled reservations';
      case 'pending':
        return 'You have no pending reservations';
      default:
        return 'You have no parking reservations';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 bg-slate-50 rounded-lg"
    >
      <div className="flex flex-col items-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <CalendarX className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">{getMessage()}</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          {status === 'pending' ? 
            'Book a parking spot to see your upcoming reservations here.' :
            'Your reservation history will appear here once you start using our parking service.'}
        </p>
      </div>
    </motion.div>
  );
};

export default ReservationsEmptyState;

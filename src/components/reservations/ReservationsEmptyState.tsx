
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CalendarX, Search, ArrowRight } from 'lucide-react';

interface ReservationsEmptyStateProps {
  status?: 'active' | 'completed' | 'cancelled';
}

const ReservationIcon = ({ status }: { status?: string }) => {
  if (!status || status === 'active') {
    return <Search className="w-12 h-12 text-indigo-400 mb-2" />;
  } else if (status === 'completed') {
    return <CalendarX className="w-12 h-12 text-blue-400 mb-2" />;
  } else {
    return <CalendarX className="w-12 h-12 text-red-400 mb-2" />;
  }
};

const ReservationsEmptyState = ({ status }: ReservationsEmptyStateProps) => {
  const getMessage = () => {
    if (!status) return "You don't have any reservations yet.";
    if (status === 'active') return "You don't have any active reservations.";
    if (status === 'completed') return "You don't have any completed reservations.";
    return "You don't have any cancelled reservations.";
  };

  const getDescription = () => {
    if (!status || status === 'active') {
      return "Book a parking spot to see your reservations here.";
    } else if (status === 'completed') {
      return "Once you complete a parking reservation, it will appear here.";
    } else {
      return "Any reservations you cancel will be listed here for your records.";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100"
    >
      <div className="flex justify-center mb-2">
        <ReservationIcon status={status} />
      </div>
      <h3 className="text-lg font-medium text-guardian-darkGray mb-1">{getMessage()}</h3>
      <p className="text-sm text-guardian-gray mb-6">{getDescription()}</p>
      
      {(!status || status === 'active') && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="gap-2" asChild>
            <Link to="/dashboard">
              Find Parking <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReservationsEmptyState;

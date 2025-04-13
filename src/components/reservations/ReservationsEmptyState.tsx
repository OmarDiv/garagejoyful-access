
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ReservationsEmptyStateProps {
  status?: 'active' | 'completed' | 'cancelled';
}

const ReservationsEmptyState = ({ status }: ReservationsEmptyStateProps) => {
  const getMessage = () => {
    if (!status) return "You don't have any reservations yet.";
    if (status === 'active') return "You don't have any active reservations.";
    if (status === 'completed') return "You don't have any completed reservations.";
    return "You don't have any cancelled reservations.";
  };

  return (
    <div className="text-center py-12">
      <p className="text-guardian-gray">{getMessage()}</p>
      {(!status || status === 'active') && (
        <Button className="mt-4" asChild>
          <Link to="/dashboard">Find Parking</Link>
        </Button>
      )}
    </div>
  );
};

export default ReservationsEmptyState;

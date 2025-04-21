
import React from 'react';
import { Timer } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  remainingTime?: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700';
    case 'completed': return 'bg-blue-100 text-blue-700';
    case 'cancelled': return 'bg-red-100 text-red-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, remainingTime }) => {
  if (status === 'pending' && remainingTime && remainingTime > 0) {
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium bg-yellow-100 text-yellow-700">
        <Timer size={14} />
        <span>Pending ({remainingTime}m)</span>
      </span>
    );
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;

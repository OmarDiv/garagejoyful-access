
import { useState } from 'react';
import { Check, X, AlertTriangle, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpotProps {
  id: string;
  status: SpotStatus;
  onClick?: (id: string) => void;
  className?: string;
}

const ParkingSpot = ({ id, status, onClick, className }: ParkingSpotProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusStyles = {
    available: {
      bgColor: 'bg-guardian-green/10',
      borderColor: 'border-guardian-green',
      textColor: 'text-guardian-green',
      icon: Check,
      label: 'Available'
    },
    occupied: {
      bgColor: 'bg-guardian-red/10',
      borderColor: 'border-guardian-red',
      textColor: 'text-guardian-red',
      icon: X,
      label: 'Occupied'
    },
    reserved: {
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-500',
      icon: AlertTriangle,
      label: 'Reserved'
    }
  };
  
  const currentStyle = statusStyles[status];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative rounded-xl p-4 border-2 transition-all duration-300',
        currentStyle.bgColor,
        currentStyle.borderColor,
        status === 'available' ? 'cursor-pointer' : 'cursor-default',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => status === 'available' && onClick && onClick(id)}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="font-semibold text-guardian-darkGray">Spot {id}</span>
        <currentStyle.icon 
          className={cn('w-5 h-5', currentStyle.textColor)}
        />
      </div>
      
      <div className="flex flex-col space-y-1">
        <span className={cn('text-sm font-medium', currentStyle.textColor)}>
          {currentStyle.label}
        </span>
      </div>
      
      {/* Car icon for occupied spots */}
      {status === 'occupied' && (
        <div className="absolute bottom-3 right-3">
          <Car className="w-6 h-6 text-guardian-gray/60" />
        </div>
      )}
      
      {/* Reserved indicator */}
      {status === 'reserved' && (
        <div className="absolute bottom-3 right-3 text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600">
          Reserved
        </div>
      )}
      
      {/* Hover effect for available spots */}
      {status === 'available' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          className="absolute inset-0 rounded-xl flex items-center justify-center bg-guardian-purple/10 transition-all duration-200"
        >
          <span className="text-guardian-purple font-medium text-sm">Click to Reserve</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ParkingSpot;

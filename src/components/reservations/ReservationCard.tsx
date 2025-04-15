import { motion } from 'framer-motion';
import { Calendar, Clock, Car, MapPin, CreditCard, Timer, DoorOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reservation } from './types';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleOpenGarage = () => {
    toast.success('Opening garage door...', {
      description: `Access code: ${reservation.accessCode || 'XXXX-XXXX'}`,
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card className={`mb-4 overflow-hidden hover:shadow-md transition-shadow ${reservation.status === 'active' ? 'border-green-200 bg-green-50/30' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Parking Spot #{reservation.spotId}</CardTitle>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(reservation.status)}`}>
              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-guardian-gray">
                <Calendar size={16} className="text-indigo-600" />
                <span>{reservation.date}</span>
              </div>
              <div className="flex items-center gap-2 text-guardian-gray">
                <Clock size={16} className="text-indigo-600" />
                <span>{reservation.time}</span>
              </div>
              {reservation.location && (
                <div className="flex items-center gap-2 text-guardian-gray">
                  <MapPin size={16} className="text-indigo-600" />
                  <span>Level {reservation.location.level}, Section {reservation.location.section}</span>
                </div>
              )}
              {reservation.duration && (
                <div className="flex items-center gap-2 text-guardian-gray">
                  <Timer size={16} className="text-indigo-600" />
                  <span>
                    {reservation.duration.hours} {reservation.duration.hours === 1 ? 'hour' : 'hours'} 
                    {reservation.duration.minutes > 0 ? ` ${reservation.duration.minutes} min` : ''}
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Car size={16} className="text-indigo-600" />
                  Vehicle Details
                </h4>
                <div className="text-sm space-y-1 text-guardian-gray">
                  <p>{reservation.carDetails.make} {reservation.carDetails.model}</p>
                  <p>License: {reservation.carDetails.licensePlate}</p>
                </div>
              </div>
              
              {reservation.paymentDetails && (
                <motion.div 
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-3 p-3 bg-blue-50 rounded-lg overflow-hidden ${!isExpanded && 'hidden'}`}
                >
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <CreditCard size={16} className="text-blue-600" />
                    Payment Details
                  </h4>
                  <div className="text-sm space-y-1 text-guardian-gray">
                    <p>Amount: {reservation.paymentDetails.currency} {reservation.paymentDetails.amount.toFixed(2)}</p>
                    <p>Status: {reservation.paymentDetails.paid ? 'Paid' : 'Pending'}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex gap-2 justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
            
            {reservation.status === 'active' && (
              <div className="flex gap-2">
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleOpenGarage}
                >
                  <DoorOpen className="mr-1 h-4 w-4" />
                  Open Garage
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReservationCard;

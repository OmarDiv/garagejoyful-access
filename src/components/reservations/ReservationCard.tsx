
import { motion } from 'framer-motion';
import { Calendar, Clock, Car, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reservation } from './types';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
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
              <div className="flex items-center gap-2 text-guardian-gray">
                <MapPin size={16} className="text-indigo-600" />
                <span>Main Garage, Level 1</span>
              </div>
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
            </div>
          </div>
          
          {reservation.status === 'active' && (
            <div className="mt-4 flex gap-2 justify-end">
              <Button variant="outline" size="sm">View Details</Button>
              <Button variant="destructive" size="sm">Cancel</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReservationCard;

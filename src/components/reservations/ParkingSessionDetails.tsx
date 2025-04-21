
import React from 'react';
import { Timer } from 'lucide-react';
import { Reservation } from './types';

interface ParkingSessionDetailsProps {
  reservationTime: string;
  startTime?: string | null;
  hasEntered: boolean;
}

const ParkingSessionDetails: React.FC<ParkingSessionDetailsProps> = ({
  reservationTime,
  startTime,
  hasEntered,
}) => (
  <div className="p-3 bg-blue-50 rounded-lg">
    <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
      <Timer size={16} className="text-blue-600" />
      Parking Session
    </h4>
    <div className="text-sm space-y-1 text-guardian-gray">
      <p>Reservation Time: {reservationTime}</p>
      {startTime && <p>Start Time: {startTime}</p>}
      {hasEntered && (
        <p>Status: <span className="text-green-600 font-medium">In Progress</span></p>
      )}
    </div>
  </div>
);

export default ParkingSessionDetails;

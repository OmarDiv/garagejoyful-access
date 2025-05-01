
import React from 'react';
import { Car } from 'lucide-react';
import { Reservation } from './types';

interface CarDetailsCardProps {
  carDetails: Reservation['carDetails'];
}

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({ carDetails }) => (
  <div className="p-3 bg-gray-50 rounded-lg mt-3">
    <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
      <Car size={16} className="text-indigo-600" />
      Vehicle Details
    </h4>
    <div className="text-sm space-y-1 text-guardian-gray">
      <p>Model: {carDetails.model}</p>
      <p>License: {carDetails.licensePlate}</p>
    </div>
  </div>
);

export default CarDetailsCard;

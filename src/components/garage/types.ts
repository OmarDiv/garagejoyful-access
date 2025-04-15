
export interface AccessFormValues {
  fullName: string;
  email: string;
  phone: string;
  carPlate: string;
  carModel: string;
  carMake?: string;
  arrivalTime?: string;
  specialInstructions?: string;
}

export interface ParkingSpot {
  id: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  level: string;
  section: string;
  type?: 'standard' | 'compact' | 'handicap' | 'electric';
  price?: {
    hourly: number;
    daily?: number;
  };
}

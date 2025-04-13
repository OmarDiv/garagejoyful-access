
export interface Reservation {
  id: string;
  date: string;
  time: string;
  spotId: string;
  status: 'active' | 'completed' | 'cancelled';
  carDetails: {
    make: string;
    model: string;
    licensePlate: string;
  };
}

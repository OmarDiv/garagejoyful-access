
export interface Reservation {
  id: string;
  date: string;
  time: string;
  spotId: string;
  status: 'active' | 'completed' | 'cancelled';
  userId: string;
  carDetails: {
    make: string;
    model: string;
    licensePlate: string;
  };
}

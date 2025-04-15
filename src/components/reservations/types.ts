
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
  paymentDetails?: {
    amount: number;
    currency: string;
    paid: boolean;
  };
  duration?: {
    hours: number;
    minutes: number;
  };
  location?: {
    level: string;
    section: string;
  };
}

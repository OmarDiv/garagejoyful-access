
export interface Reservation {
  id: string;
  date: string;
  time: string;
  spotId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
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
  accessCode?: string;
  parkingSession?: {
    startTime: string;
    endTime?: string;
    duration?: string;
    reservationTime: string;
    timeToAccess?: number; // Time in minutes to access the gate
  };
}

// Add new types for analytics
export interface SiteAnalytics {
  totalVisitors: number;
  activeUsers: number;
  totalReservations: number;
  satisfactionRate: number;
}

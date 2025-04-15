import { Reservation } from '../types';

export const getMockReservations = (userId: string): Reservation[] => [
  {
    id: 'res-1',
    date: '2025-04-18',
    time: '10:00 AM - 12:00 PM',
    spotId: '2',
    status: 'active',
    userId: userId,
    carDetails: {
      make: 'Toyota',
      model: 'Camry',
      licensePlate: 'ABC-1234'
    },
    paymentDetails: {
      amount: 15,
      currency: 'USD',
      paid: true
    },
    duration: {
      hours: 2,
      minutes: 0
    },
    location: {
      level: '1',
      section: 'A'
    },
    accessCode: 'PARK-2025'
  },
  {
    id: 'res-2',
    date: '2025-04-10',
    time: '2:00 PM - 4:00 PM',
    spotId: '3',
    status: 'completed',
    userId: userId,
    carDetails: {
      make: 'Honda',
      model: 'Civic',
      licensePlate: 'XYZ-5678'
    },
    paymentDetails: {
      amount: 12,
      currency: 'USD',
      paid: true
    },
    duration: {
      hours: 2,
      minutes: 0
    },
    location: {
      level: '2',
      section: 'B'
    }
  },
  {
    id: 'res-3',
    date: '2025-04-05',
    time: '9:00 AM - 11:00 AM',
    spotId: '1',
    status: 'cancelled',
    userId: userId,
    carDetails: {
      make: 'Tesla',
      model: 'Model 3',
      licensePlate: 'ELK-9012'
    },
    paymentDetails: {
      amount: 20,
      currency: 'USD',
      paid: false
    },
    duration: {
      hours: 2,
      minutes: 0
    },
    location: {
      level: '1',
      section: 'C'
    }
  },
  {
    id: 'res-4',
    date: '2025-04-25',
    time: '3:00 PM - 6:00 PM',
    spotId: '5',
    status: 'active',
    userId: userId,
    carDetails: {
      make: 'Ford',
      model: 'Mustang',
      licensePlate: 'SPD-7890'
    },
    paymentDetails: {
      amount: 25,
      currency: 'USD',
      paid: true
    },
    duration: {
      hours: 3,
      minutes: 0
    },
    location: {
      level: '3',
      section: 'A'
    }
  }
];

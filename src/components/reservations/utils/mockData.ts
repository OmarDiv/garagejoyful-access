
import { Reservation } from '../types';

// Get user reservations from sessionStorage
export const getMockReservations = (userId: string): Reservation[] => {
  // First check if we have reservations in sessionStorage
  const storedReservations = sessionStorage.getItem('userReservations');
  if (storedReservations) {
    try {
      const reservations = JSON.parse(storedReservations);
      return reservations.filter((res: Reservation) => res.userId === userId);
    } catch (error) {
      console.error('Error parsing stored reservations', error);
    }
  }
  
  // If no stored reservations or error parsing, return default mock data
  return defaultMockReservations(userId);
};

// Default mock reservations if none found in storage
const defaultMockReservations = (userId: string): Reservation[] => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  return [
    {
      id: '1',
      date: today.toLocaleDateString(),
      time: '10:30 AM',
      spotId: '2',
      status: 'active',
      userId: userId,
      carDetails: {
        make: 'Toyota',
        model: 'Camry',
        licensePlate: 'ABC-1234'
      },
      parkingSession: {
        startTime: '10:45 AM',
        reservationTime: '10:30 AM'
      },
      accessCode: 'PARK-1234'
    },
    {
      id: '2',
      date: yesterday.toLocaleDateString(),
      time: '3:15 PM',
      spotId: '5',
      status: 'completed',
      userId: userId,
      carDetails: {
        make: 'Honda',
        model: 'Civic',
        licensePlate: 'XYZ-5678'
      },
      parkingSession: {
        startTime: '3:20 PM',
        endTime: '5:45 PM',
        reservationTime: '3:15 PM'
      },
      accessCode: 'PARK-5678'
    },
    {
      id: '3',
      date: yesterday.toLocaleDateString(),
      time: '9:00 AM',
      spotId: '8',
      status: 'cancelled',
      userId: userId,
      carDetails: {
        make: 'Tesla',
        model: 'Model 3',
        licensePlate: 'EV-9012'
      },
      parkingSession: {
        reservationTime: '9:00 AM'
      },
      accessCode: 'PARK-9012'
    }
  ];
};


// This file will handle all API calls to the .NET backend

// Base URL for the .NET API - replace with your actual API URL when deployed
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.title || `Error: ${response.status}`);
    } catch (e) {
      throw new Error(`Network error: ${response.status}`);
    }
  }
  
  return response.json();
};

// Add authentication token to requests if user is logged in
const getAuthHeaders = () => {
  const token = sessionStorage.getItem('authToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Mock implementation for frontend-only development
const mockApi = {
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, accept any login
    const user = {
      id: '1',
      email,
      name: email.split('@')[0],
      phone: '123-456-7890'
    };
    
    // Store auth token in session storage
    sessionStorage.setItem('authToken', 'mock-token-12345');
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    
    return { user, token: 'mock-token-12345' };
  },
  
  updateProfile: async (userData: { phone?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const updatedUser = { ...currentUser, ...userData };
    
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return updatedUser;
  },
  
  changePassword: async (oldPassword: string, newPassword: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would validate the old password and update to the new one
    return { success: true, message: 'Password updated successfully' };
  },
  
  getParkingSpots: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get from session storage or use default
    const storedSpots = sessionStorage.getItem('parkingSpots');
    if (storedSpots) {
      return JSON.parse(storedSpots);
    }
    
    // Mock data
    const mockSpots = [
      { id: '1', status: 'available', level: '1', section: 'A' },
      { id: '2', status: 'reserved', level: '1', section: 'A' },
      { id: '3', status: 'occupied', level: '1', section: 'A' },
      { id: '4', status: 'available', level: '1', section: 'A' },
    ];
    
    sessionStorage.setItem('parkingSpots', JSON.stringify(mockSpots));
    return mockSpots;
  },
  
  createReservation: async (reservationData: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const reservationId = `res-${Date.now()}`;
    const newReservation = {
      id: reservationId,
      ...reservationData,
      status: 'pending',
      timestamp: new Date().toISOString(),
      accessCode: `PARK-${Math.floor(1000 + Math.random() * 9000)}`
    };
    
    // Store in session storage for frontend-only operation
    const storedReservations = sessionStorage.getItem('userReservations');
    let userReservations = storedReservations ? JSON.parse(storedReservations) : [];
    userReservations = [newReservation, ...userReservations];
    sessionStorage.setItem('userReservations', JSON.stringify(userReservations));
    
    // Update spot status
    const storedSpots = sessionStorage.getItem('parkingSpots');
    if (storedSpots) {
      const spots = JSON.parse(storedSpots);
      const updatedSpots = spots.map((spot: any) => 
        spot.id === reservationData.spotId ? { ...spot, status: 'reserved' } : spot
      );
      sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
    }
    
    return newReservation;
  },
  
  getUserReservations: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const storedReservations = sessionStorage.getItem('userReservations');
    return storedReservations ? JSON.parse(storedReservations) : [];
  },
  
  cancelReservation: async (reservationId: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update reservation status
    const storedReservations = sessionStorage.getItem('userReservations');
    if (storedReservations) {
      const reservations = JSON.parse(storedReservations);
      const updatedReservations = reservations.map((reservation: any) => {
        if (reservation.id === reservationId) {
          // Find the spot ID to update
          const spotId = reservation.spotId;
          
          // Update spot status
          const storedSpots = sessionStorage.getItem('parkingSpots');
          if (storedSpots) {
            const spots = JSON.parse(storedSpots);
            const updatedSpots = spots.map((spot: any) => 
              spot.id === spotId ? { ...spot, status: 'available' } : spot
            );
            sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
          }
          
          return { ...reservation, status: 'cancelled' };
        }
        return reservation;
      });
      
      sessionStorage.setItem('userReservations', JSON.stringify(updatedReservations));
    }
    
    return { success: true, message: 'Reservation cancelled successfully' };
  },

  updateReservationStatus: async (reservationId: string, status: string, startTime?: string, endTime?: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const storedReservations = sessionStorage.getItem('userReservations');
    if (storedReservations) {
      const reservations = JSON.parse(storedReservations);
      const updatedReservations = reservations.map((reservation: any) => {
        if (reservation.id === reservationId) {
          return { 
            ...reservation, 
            status,
            ...(startTime && { parkingSession: { ...reservation.parkingSession, startTime } }),
            ...(endTime && { parkingSession: { ...reservation.parkingSession, endTime } })
          };
        }
        return reservation;
      });
      
      sessionStorage.setItem('userReservations', JSON.stringify(updatedReservations));
    }
    
    return { success: true };
  },
  
  updateParkingSpotStatus: async (spotId: string, status: 'available' | 'occupied' | 'reserved') => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const storedSpots = sessionStorage.getItem('parkingSpots');
    if (storedSpots) {
      const spots = JSON.parse(storedSpots);
      const updatedSpots = spots.map((spot: any) => 
        spot.id === spotId ? { ...spot, status } : spot
      );
      sessionStorage.setItem('parkingSpots', JSON.stringify(updatedSpots));
    }
    
    return { success: true };
  }
};

// API functions (returns mock in development mode, would connect to real API in production)
export const api = mockApi;

export default api;

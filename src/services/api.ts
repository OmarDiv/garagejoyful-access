
// This file will handle all API calls to the .NET backend

// Base URL for the .NET API - replace with your actual API URL when deployed
const API_BASE_URL = 'https://your-dotnet-api.com/api';

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
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

// API functions
export const api = {
  // Parking spots
  getParkingSpots: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking-spots`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API error in getParkingSpots:', error);
      throw error;
    }
  },
  
  // Reservations
  createReservation: async (reservationData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reservationData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API error in createReservation:', error);
      throw error;
    }
  },
  
  getUserReservations: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/reservations`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API error in getUserReservations:', error);
      throw error;
    }
  },
  
  cancelReservation: async (reservationId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/cancel`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API error in cancelReservation:', error);
      throw error;
    }
  },
  
  startParking: async (reservationId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/start`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API error in startParking:', error);
      throw error;
    }
  },
  
  endParking: async (reservationId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/end`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API error in endParking:', error);
      throw error;
    }
  },
  
  // Added this function to update a parking spot status
  updateParkingSpotStatus: async (spotId: string, status: 'available' | 'occupied' | 'reserved') => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking-spots/${spotId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('API error in updateParkingSpotStatus:', error);
      throw error;
    }
  },
};

export default api;

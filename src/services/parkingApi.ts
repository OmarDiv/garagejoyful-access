
// Mock implementation for frontend-only development
export const parkingApi = {
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

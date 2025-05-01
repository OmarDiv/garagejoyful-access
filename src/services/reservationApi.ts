
// Mock implementation for frontend-only development
export const reservationApi = {
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
  }
};

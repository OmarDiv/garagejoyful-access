
import { useState, useEffect } from 'react';
import { Reservation } from '../types';

interface ReservationState {
  status: Reservation['status'];
  hasEntered: boolean;
  parkingStartTime: string | null;
  remainingTime: number;
}

export const useReservationState = (reservation: Reservation) => {
  const getInitialState = (): ReservationState => {
    const storedReservations = sessionStorage.getItem('userReservations');
    if (storedReservations) {
      const reservations = JSON.parse(storedReservations);
      const currentReservation = reservations.find((res: Reservation) => res.id === reservation.id);
      if (currentReservation) {
        return {
          status: currentReservation.status,
          hasEntered: currentReservation.status === 'completed' ? false : !!currentReservation.parkingSession?.startTime,
          parkingStartTime: currentReservation.parkingSession?.startTime || null,
          remainingTime: currentReservation.status === 'pending' 
            ? (currentReservation.parkingSession?.timeToAccess ?? 15) 
            : 0
        };
      }
    }
    
    return {
      status: reservation.status,
      hasEntered: reservation.status === 'completed' ? false : !!reservation.parkingSession?.startTime,
      parkingStartTime: reservation.parkingSession?.startTime || null,
      remainingTime: reservation.status === 'pending' 
        ? (reservation.parkingSession?.timeToAccess ?? 15) 
        : 0
    };
  };

  const initialState = getInitialState();
  const [state, setState] = useState<ReservationState>(initialState);

  useEffect(() => {
    let timer: number | undefined;
    if (state.status === 'pending' && !state.hasEntered && state.remainingTime > 0) {
      timer = window.setInterval(() => {
        setState(prev => {
          if (prev.remainingTime <= 1) {
            updateReservationStatusInStorage('cancelled');
            return {
              ...prev,
              status: 'cancelled',
              remainingTime: 0
            };
          }
          return {
            ...prev,
            remainingTime: prev.remainingTime - 1
          };
        });
      }, 60000); // Decrease every minute
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.status, state.hasEntered, state.remainingTime, reservation.id]);

  const updateReservationStatusInStorage = (
    newStatus: string,
    startTime?: string,
    endTime?: string
  ) => {
    const storedReservations = sessionStorage.getItem('userReservations');
    if (storedReservations) {
      const reservations = JSON.parse(storedReservations);
      const updatedReservations = reservations.map((res: any) => {
        if (res.id === reservation.id) {
          const updatedRes = { 
            ...res, 
            status: newStatus,
            completed: newStatus === 'completed' ? true : res.completed 
          };
          
          if (startTime) {
            updatedRes.parkingSession = {
              ...updatedRes.parkingSession,
              startTime
            };
          }
          if (endTime) {
            updatedRes.parkingSession = {
              ...updatedRes.parkingSession,
              endTime
            };
          }
          return updatedRes;
        }
        return res;
      });
      sessionStorage.setItem('userReservations', JSON.stringify(updatedReservations));
      window.dispatchEvent(new Event('storage'));
    }
  };

  return {
    ...state,
    setState,
    updateReservationStatusInStorage
  };
};

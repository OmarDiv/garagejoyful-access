
import { authApi } from './authApi';
import { parkingApi } from './parkingApi';
import { reservationApi } from './reservationApi';

// Combined API interface
export const api = {
  ...authApi,
  ...parkingApi,
  ...reservationApi
};

export default api;

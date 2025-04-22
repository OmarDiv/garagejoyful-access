
import { useAuthStore } from './authStore';

// Re-export the store as a hook for easier imports
export const useAuth = useAuthStore;

// Add proper type exports
export { User, AuthState } from './types';

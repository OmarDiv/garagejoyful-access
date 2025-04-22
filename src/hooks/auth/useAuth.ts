
import { useAuthStore } from './authStore';

// Re-export the store as a hook for easier imports
export const useAuth = useAuthStore;

// Add proper type exports with the 'export type' syntax
export type { User, AuthState } from './types';

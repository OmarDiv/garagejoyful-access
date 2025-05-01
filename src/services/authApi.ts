
import { User } from '@/hooks/auth/types';

// Mock implementation for frontend-only development
export const authApi = {
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
};

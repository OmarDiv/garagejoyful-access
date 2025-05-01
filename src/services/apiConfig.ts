
// Base URL for the .NET API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle fetch responses
export const handleResponse = async (response: Response) => {
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
export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('authToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

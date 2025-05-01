
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

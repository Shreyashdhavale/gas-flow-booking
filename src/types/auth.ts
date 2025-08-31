export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
import { create } from 'zustand';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'CLIENT';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('prd_user') || 'null'),
  accessToken: localStorage.getItem('prd_access_token'),
  setAuth: (user, token) => {
    localStorage.setItem('prd_user', JSON.stringify(user));
    localStorage.setItem('prd_access_token', token);
    set({ user, accessToken: token });
  },
  logout: () => {
    localStorage.removeItem('prd_user');
    localStorage.removeItem('prd_access_token');
    set({ user: null, accessToken: null });
  }
}));

import { create } from 'zustand';
import { User } from '../types/auth';
import { authService } from '../services/auth.service';

interface AuthState {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signInWithEmail: async (email, password) => {
    const data = await authService.signIn(email, password);
    if (data?.user) {
      set({ user: data.user });
    }
  },
  signUpWithEmail: async (email, password, name) => {
    const data = await authService.signUp(email, password, name);
    if (data?.user) {
      set({ user: data.user });
    }
  },
  signOut: async () => {
    await authService.signOut();
    set({ user: null });
  },
  initialize: async () => {
    const session = await authService.getSession();
    set({ 
      user: session?.user ?? null,
      loading: false 
    });
  },
}));
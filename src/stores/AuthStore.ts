import { IUser } from '@/types/user';
import { create } from 'zustand';

export type AuthState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  reset: () =>
    set({
      user: null,
    }),
}));

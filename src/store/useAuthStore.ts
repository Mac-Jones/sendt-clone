import { login, register } from '@/api';
import { ILogin, IRegister } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  loading: boolean;
  message: string | null;
  onLogin: (user: ILogin) => void;
  onRegister: (user: IRegister) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      loading: false,
      message: null,
      onLogin: async user => {
        set({ loading: true, message: null });
        // call the login service
        const response = await login(user);
        if (response.success) {
          set({ token: response.token, message: response.message });
        } else {
          set({ message: response.message });
        }

        // delay a bit to show the message in a loader
        setTimeout(() => set({ loading: false }), 1000);
      },
      onRegister: async user => {
        set({ loading: true, message: null });
        // call the register service
        const response = await register(user);
        if (response.success) {
          set({ token: response.token, message: response.message });
        } else {
          set({ message: response.message });
        }

        // delay a bit to show the message in a loader
        setTimeout(() => set({ loading: false }), 1000);
      },
      logout: () => set({ token: null, loading: false, message: null }),
    }),
    {
      partialize: state => ({ token: state.token }),
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

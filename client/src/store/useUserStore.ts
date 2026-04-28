import { create } from "zustand";

import { persist } from "zustand/middleware";
type User = {
  name: string;
  email: string;
  userType: "USER" | "CONTRIBUTOR";

};

type UserStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (state: boolean) => void;
};


export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      setUser: (user) => set({ user, isLoading: false }),
      clearUser: () => set({ user: null, isLoading: false }),
      setLoading: (state) => set({ isLoading: state }),
    }),
    {
      name: "user-storage",
    }
  )
);

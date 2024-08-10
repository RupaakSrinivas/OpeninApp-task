import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface AuthStore extends User {
  getUser: () => User;
  update: (_props: User) => void;
  login: (_props: User) => void;
  logout: () => void;
}

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      name: "",
      email: "",
      family_name: "",
      given_name: "",
      id: "",
      picture: "",
      verified_email: false,
      getUser: () => {
        return {
          name: get().name,
          email: get().email,
          family_name: get().family_name,
          given_name: get().given_name,
          id: get().id,
          picture: get().picture,
          verified_email: get().verified_email,
        };
      },
      update: (props: User) => {
        set({ ...props });
      },
      login: (props: User) => {
        set({ ...props });
      },
      logout: () => {
        set({
          name: "",
          email: "",
        });
        localStorage.clear();
      },
    }),
    {
      name: "authStore",
    }
  )
);

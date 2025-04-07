import { StateCreator } from "zustand";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: string;
  email: string;
  role: string;
  exp: number;
};

export type AuthSliceType = {
  token: string | null;
  isLogged: () => boolean;
  isAdmin: () => boolean;
};

export const authSlice: StateCreator<AuthSliceType> = (set, get) => ({
  token: localStorage.getItem("token") || null,

  isLogged: () => {
    const { token } = get();
    return token !== null;
  },

  isAdmin: () => {
    const { token } = get();
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role === "admin";
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  },
});

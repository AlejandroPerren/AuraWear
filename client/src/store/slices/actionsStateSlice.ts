import { StateCreator } from "zustand";

export type ActionsStateSliceType = {
    isLogin: boolean;
    setAuth: () => void;
}

export const actionsStateSlice: StateCreator<ActionsStateSliceType> = (set, get) => ({
    isLogin: true,

    setAuth: () => {
        const current = get().isLogin;
        set({ isLogin: !current });
    }
});

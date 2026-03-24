import {TOKEN_KEY} from "@/shared/libs/constants/auth/token";

export const tokenService = {
    get: () => {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch {
            return null;
        }
    },

    set: (token: string) => {
        try {
            localStorage.setItem(TOKEN_KEY, token);
        } catch {
            return null;
        }
    },

    remove: () => {
        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch {
            return null;
        }
    },
};

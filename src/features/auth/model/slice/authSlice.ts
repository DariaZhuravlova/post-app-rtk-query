import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },

        login: (state) => {
            state.isLoggedIn = true;
        },

        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const {reducer: authReducer, actions: authActions} = authSlice;

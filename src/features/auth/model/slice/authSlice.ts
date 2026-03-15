import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem("token"),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.removeItem("token");
        },
    },
});

export const {setIsLoggedIn, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;

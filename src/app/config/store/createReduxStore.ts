import {configureStore} from "@reduxjs/toolkit";
import {api} from "@/shared/api/api";
import {authReducer} from "@/features/auth/model/slice/authSlice";

export const createReduxStore = () =>
    configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    });

export type AppStore = ReturnType<typeof createReduxStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

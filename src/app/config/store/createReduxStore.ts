import { configureStore } from "@reduxjs/toolkit";
import {api} from "@/shared/api/api";

export const createReduxStore = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof createReduxStore.dispatch;

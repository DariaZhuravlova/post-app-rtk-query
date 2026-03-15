// redux
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {RootState} from "@/app/config/store/createReduxStore";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const prepareAuthHeaders = (
    headers: Headers,
    getState: () => unknown,
    authScheme: "bearer" | "raw",
) => {
    const {auth} = getState() as RootState;

    if (!auth.isLoggedIn) {
        return headers;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        return headers;
    }

    headers.set("Authorization", authScheme === "bearer" ? `Bearer ${token}` : token);

    return headers;
};

const bearerBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => prepareAuthHeaders(headers, getState, "bearer"),
});

const rawTokenBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => prepareAuthHeaders(headers, getState, "raw"),
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const token = localStorage.getItem("token");
    const result = await bearerBaseQuery(args, api, extraOptions);
    const status = typeof result.error?.status === "number" ? result.error.status : undefined;

    if (!token || !status || ![401, 403, 500].includes(status)) {
        return result;
    }

    const fallbackResult = await rawTokenBaseQuery(args, api, extraOptions);

    return fallbackResult.error ? result : fallbackResult;
};

export const api = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["POST", "USER"],
    endpoints: (_builder) => ({}),
});

import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {prepareAuthHeaders} from "./prepareAuthHeaders";
import {AUTH_SCHEMES} from "@/shared/libs/constants/auth/auth";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const bearerBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) =>
        prepareAuthHeaders(headers, getState, AUTH_SCHEMES.BEARER),
});

export const rawTokenBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) =>
        prepareAuthHeaders(headers, getState, AUTH_SCHEMES.RAW),
});

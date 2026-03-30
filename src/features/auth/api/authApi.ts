// api
import {api} from "@/shared/api/api";
import type {FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
// types
import type {
    RegisterUserRequest,
    RegisterUserResponse,
    LoginUserRequest,
    LoginUserResponse,
} from "@/features/auth/model/types/authAPItypes";
// slice
import {authActions} from "@/features/auth/model/slice/authSlice";
// storage
import {tokenService} from "@/shared/libs/storage/token";
// queryKeys
import {userQueryKeys} from "@/entities/user/model/queryKeys";

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // ===== REGISTER =====
        register: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),

        // ===== LOGIN =====
        login: builder.mutation<LoginUserResponse, LoginUserRequest>({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
            transformResponse: (response: LoginUserResponse, meta?: FetchBaseQueryMeta) => {
                const token =
                    response.token ?? meta?.response?.headers.get("authorization") ?? undefined;

                if (!response.ok || !token) {
                    throw new Error(response.message ?? "Login failed");
                }

                return {
                    ...response,
                    token,
                };
            },
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const {data} = await queryFulfilled;

                    if (!data.token) {
                        throw new Error("Missing auth token");
                    }

                    tokenService.set(data.token);
                    dispatch(authActions.setIsLoggedIn(true));
                } catch {
                    tokenService.remove();
                    dispatch(authActions.setIsLoggedIn(false));
                }
            },
            invalidatesTags: userQueryKeys.item("ME"),
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation} = authApi;

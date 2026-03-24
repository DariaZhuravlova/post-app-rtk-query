// api
import {api} from "@/shared/api/api";
// types
import type {
    GetProfileRequest,
    GetProfileResponse,
} from "@/entities/user/model/types/userAPItypes";

const userAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<GetProfileResponse, GetProfileRequest>({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            providesTags: [{type: "USER", id: "ME"}],
        }),
    }),
});

export const {useGetProfileQuery} = userAPI;

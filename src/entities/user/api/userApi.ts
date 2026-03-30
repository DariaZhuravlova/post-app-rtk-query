// api
import {api} from "@/shared/api/api";
// types
import type {GetProfileRequest, GetProfileResponse} from "@/entities/user/model/types/userAPItypes";

import {userQueryKeys} from "@/entities/user/model/queryKeys";

const userAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<GetProfileResponse, GetProfileRequest>({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            providesTags: () => userQueryKeys.item("ME"),
        }),
    }),
});

export const {useGetProfileQuery} = userAPI;

// redux
import {createApi} from "@reduxjs/toolkit/query/react";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";

import {bearerBaseQuery, rawTokenBaseQuery} from "@/shared/libs/utils/baseQueries";
import { tokenService } from "@/shared/libs/storage/token";
import {isRetryStatus} from "@/shared/libs/constants/auth/backend-status";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const token = tokenService.get();

    const result = await bearerBaseQuery(args, api, extraOptions);

    const status = typeof result.error?.status === "number" ? result.error.status : undefined;

   if (!token?.length || !isRetryStatus(status)) {
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

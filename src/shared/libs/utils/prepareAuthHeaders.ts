import type {RootState} from "@/app/config/store/createReduxStore";
import type {AuthScheme} from "@/shared/libs/constants/auth/auth";
import {AUTH_SCHEMES} from "@/shared/libs/constants/auth/auth";
import {tokenService} from "@/shared/libs/storage/token";

export const prepareAuthHeaders = (
    headers: Headers,
    getState: () => unknown,
    authScheme: AuthScheme,
) => {
    const {auth} = getState() as RootState;

    if (!auth.isLoggedIn) {
        return headers;
    }

    const token = tokenService.get();

    if (!token) {
        return headers;
    }

    headers.set("Authorization", authScheme === AUTH_SCHEMES.BEARER ? `Bearer ${token}` : token);

    return headers;
};

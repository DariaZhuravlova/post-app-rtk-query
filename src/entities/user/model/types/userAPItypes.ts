// types
import type {IUser} from "./user";

export type GetProfileRequest = void;

export interface GetProfileResponse {
    user: IUser;
    ok: boolean;
}

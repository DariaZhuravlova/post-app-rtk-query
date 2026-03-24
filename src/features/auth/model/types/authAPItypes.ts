// types
import type { IUser } from "@/entities/user/model/types/user";

export interface RegisterUserRequest {
    phone: string;
    password: string;
}

export interface RegisterUserResponse {
    ok: boolean;
    message: string;
}

export interface LoginUserRequest {
    phone: string;
    password: string;
}

export interface LoginUserResponse {
    user: IUser;
    ok: boolean;
    token?: string;
    message?: string;
}

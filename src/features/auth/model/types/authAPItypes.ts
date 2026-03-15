// types
import type { IUser } from "@/entities/user/model/types/user";

// ===== REGISTER =====
export interface RegisterUserRequest {
    phone: string;
    password: string;
}

export interface RegisterUserResponse {
    ok: boolean;
    message: string;
}

// ===== LOGIN =====
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

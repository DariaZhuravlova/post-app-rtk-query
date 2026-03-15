export interface IUser {
    _id: string;
    phone: string;
    role: UserRole;
}

export const USER_ROLES = {
    ADMIN: "admin",
    CUSTOMER: "customer",
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

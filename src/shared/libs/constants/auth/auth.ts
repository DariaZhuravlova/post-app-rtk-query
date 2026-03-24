export const AUTH_SCHEMES = {
    BEARER: "bearer",
    RAW: "raw",
} as const;

export type AuthScheme = (typeof AUTH_SCHEMES)[keyof typeof AUTH_SCHEMES];
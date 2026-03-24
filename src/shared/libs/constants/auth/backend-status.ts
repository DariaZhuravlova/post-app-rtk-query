export const BACKEND_STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_ERROR: 500,
} as const;

export type BackendStatusCode = (typeof BACKEND_STATUS)[keyof typeof BACKEND_STATUS];

export const RETRY_STATUSES = [
    BACKEND_STATUS.UNAUTHORIZED,
    BACKEND_STATUS.FORBIDDEN,
    BACKEND_STATUS.INTERNAL_ERROR,
] as const;

export const isRetryStatus = (status?: number): status is BackendStatusCode => {
    return !!status && RETRY_STATUSES.includes(status as BackendStatusCode);
};

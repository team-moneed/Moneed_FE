// 토큰 만료 기간 (밀리초)
export const TOKEN_EXPIRATION = {
    ACCESS_TOKEN: 10 * 1000, // 7일(초)
    REFRESH_TOKEN: 30 * 1000, // 30일(초)
} as const;

export const TOKEN_ERROR = {
    INVALID_TOKEN: 'Invalid token',
    USER_NOT_FOUND: 'User not found',
    EXPIRED_TOKEN: 'Expired token',
} as const;

export const STORAGE_KEY = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
} as const;

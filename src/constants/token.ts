// 토큰 만료 기간 (밀리초)
export const TOKEN_EXPIRATION = {
    ACCESS_TOKEN: 24 * 60 * 60 * 1000, // 24시간
    REFRESH_TOKEN: 30 * 24 * 60 * 60 * 1000, // 30일
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

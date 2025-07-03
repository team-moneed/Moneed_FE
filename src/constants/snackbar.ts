import { SnackbarConfig } from '@/types/snackbar';

export const REASON_CODES = {
    LOGGED_IN: 'logged_in',
    NO_SESSION: 'no_session',
    EXPIRED_SESSION: 'expired_session',
    LOGOUT: 'logout',
    LEAVE: 'leave',
};

export const REASONS: Record<string, SnackbarConfig> = {
    logged_in: { message: '이미 로그인 상태입니다.', variant: 'normal', position: 'top' },
    no_session: { message: '로그인이 필요합니다.', variant: 'caution', position: 'top' },
    expired_session: {
        message: '세션이 만료되었습니다. 다시 로그인해주세요.',
        variant: 'caution',
        position: 'top',
    },
    logout: { message: '로그아웃 되었습니다.', variant: 'action', position: 'top' },
    leave: { message: '탈퇴가 완료되었습니다.', variant: 'action', position: 'top' },
};

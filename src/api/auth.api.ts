import axios from 'axios';
import { http } from './client';

type KakaoTokenParams = {
    code: string;
    state?: string;
    provider: 'kakao';
};

type KakaoTokenResponse = {
    isExistingUser: boolean;
};

export const login = async ({ code, state, provider }: KakaoTokenParams) => {
    const res = await axios.post<KakaoTokenResponse>(
        `${process.env.NEXT_PUBLIC_MONEED_BASE_URL}/api/auth/${provider}/login`,
        { code, state },
    );
    return res.data;
};

export const logout = async ({ provider }: { provider: 'kakao' }) => {
    const res = await http.post(`/api/auth/${provider}/logout`);
    return res;
};

export const leave = async ({ provider }: { provider: 'kakao' }) => {
    const res = await http.post<{ ok: boolean; reason?: string }>(`/api/auth/${provider}/leave`);
    return res;
};
